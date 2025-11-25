<script setup lang="ts">
import {
  reactive,
  ref,
  onMounted,
  onUnmounted,
  watch,
  nextTick
} from "vue";

interface IWaterfallItem {
  id?: string | number;
  src: string;
  height?: number;
  title?: string;
  description?: string;
  [key: string]: unknown;
}

const props = withDefaults(defineProps<{
  list: IWaterfallItem[];
  colWidth?: number;
  gap?: number;
}>(), {
  colWidth: 250,
  gap: 16
});

const containerRef = ref<HTMLDivElement | null>(null);

const itemRefs = ref<Map<string | number, HTMLDivElement>>(new Map());

const columns = reactive<Array<IWaterfallItem[]>>([]);

const columnHeights = ref<number[]>([]);

// 获取最短列的索引
const getShortestColumnIndex = (): number => {
  let minIndex = 0;

  let minHeight = columnHeights.value[0] || 0;

  for (let i = 1; i < columnHeights.value.length; i++) {
    const height = columnHeights.value[i] || 0;

    if (height < minHeight) {
      minHeight = height;
      minIndex = i;
    }
  }

  return minIndex;
};

// 更新列高度
const updateColumnHeights = (): void => {
  nextTick(() => {
    columns.forEach((col, colIndex) => {
      let totalHeight = 0;

      col.forEach(item => {
        const itemEl = itemRefs.value.get(item.id || "");

        if (itemEl) {
          totalHeight += itemEl.offsetHeight + props.gap;
        } else if (item.height) {
          totalHeight += item.height + props.gap;
        }
      });

      columnHeights.value[colIndex] = totalHeight;
    });
  });
};

// 瀑布流布局
const layout = (): void => {
  if (columns.length === 0) {
    return;
  }

  // 清空所有列
  columns.forEach(col => {
    col.splice(0, col.length);
  });
  columnHeights.value.fill(0);

  // 重新分配项目
  props.list.forEach(item => {
    const colIndex = getShortestColumnIndex();

    const col = columns[colIndex];

    if (col) {
      col.push(item);

      // 更新该列的高度（使用估算值）
      if (item.height && columnHeights.value[colIndex] !== undefined) {
        columnHeights.value[colIndex] += item.height + props.gap;
      }
    }
  });
};

// 计算列数
const calcColumns = (): void => {
  if (!containerRef.value) {
    return;
  }

  const width = containerRef.value.clientWidth;

  const colCount = Math.max(1, Math.floor((width + props.gap) / (props.colWidth + props.gap)));

  if (columns.length !== colCount) {
    columns.splice(0, columns.length);
    columnHeights.value = [];

    for (let i = 0; i < colCount; i++) {
      columns.push([]);
      columnHeights.value.push(0);
    }

    layout();
  }
};

// 图片加载完成
const handleImgLoad = (e: Event): void => {
  const target = e.target as HTMLImageElement;

  const {
    itemId
  } = target.dataset;

  if (!itemId) {
    return;
  }

  const item = props.list.find(i => String(i.id) === itemId);

  if (item) {

    // 计算图片高度
    const {
      naturalHeight,
      naturalWidth
    } = target;

    const imgHeight = naturalHeight / (naturalWidth / props.colWidth);

    // 估算文字区域高度
    let contentHeight = 0;

    if (item.title || item.description) {
      const titleHeight = item.title ? 20 : 0;

      const descLines = item.description ? Math.ceil((item.description as string).length / 30) : 0;

      const descHeight = descLines * 18;

      // padding + title + description
      contentHeight = 24 + titleHeight + descHeight;
    }

    // 保存总高度
    item.height = imgHeight + contentHeight;

    // 重新布局
    layout();
    updateColumnHeights();
  }
};

// 设置项目引用
const setItemRef = (el: HTMLDivElement | null, item: IWaterfallItem): void => {
  if (el && item.id !== undefined) {
    itemRefs.value.set(item.id, el);
  }
};

onMounted(() => {
  calcColumns();
  window.addEventListener("resize", calcColumns);
});

onUnmounted(() => {
  window.removeEventListener("resize", calcColumns);
});

watch(() => props.list, () => {
  calcColumns();
}, {
  deep: true
});
</script>

<template>
  <div
    ref="containerRef"
    class="waterfall"
  >
    <div
      v-for="(col, colIndex) in columns"
      :key="colIndex"
      class="waterfall-col"
    >
      <div
        v-for="item in col"
        :key="item.id"
        :ref="el => setItemRef(el as HTMLDivElement, item)"
        class="waterfall-item"
      >
        <img
          :src="item.src"
          :data-item-id="item.id"
          @load="handleImgLoad"
        />
        <div
          v-if="item.title || item.description"
          class="waterfall-item-content"
        >
          <div
            v-if="item.title"
            class="waterfall-item-title"
          >
            {{ item.title }}
          </div>
          <div
            v-if="item.description"
            class="waterfall-item-description"
          >
            {{ item.description }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.waterfall {
  display: flex;
  gap: v-bind("`${gap}px`");
}

.waterfall-col {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: v-bind("`${gap}px`");
}

.waterfall-item {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
  background: #fff;
  overflow: hidden;
}

.waterfall-item img {
  display: block;
  width: 100%;
}

.waterfall-item-content {
  padding: 12px;
}

.waterfall-item-title {
  margin-bottom: 4px;
  line-height: 1.4;
  font-size: 14px;
  font-weight: 600;
  color: #303133;
}

.waterfall-item-description {
  line-height: 1.5;
  font-size: 12px;
  color: #909399;
}
</style>
