<script setup lang="ts">
import {
  reactive,
  ref,
  onMounted,
  onUnmounted,
  watch
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

const columns = reactive<Array<IWaterfallItem[]>>([]);

// 计算列总高度（通过图片高度）
const colHeight = (col: IWaterfallItem[]): number => col.reduce((sum, item) => sum + (item.height || 0), 0);

// 瀑布流核心布局
const layout = (): void => {
  if (columns.length === 0) {
    return;
  }

  // 清空
  columns.forEach(col => {
    col.splice(0, col.length);
  });

  props.list.forEach(item => {

    // 找最短列
    const [
      firstCol
    ] = columns;

    let minCol = firstCol;

    if (!minCol) {
      return;
    }

    for (let i = 1; i < columns.length; i++) {
      const col = columns[i];

      if (col && colHeight(col) < colHeight(minCol)) {
        minCol = col;
      }
    }

    minCol.push(item);
  });
};

// 计算列数
const calcColumns = (): void => {
  if (!containerRef.value) {
    return;
  }

  const width = containerRef.value.clientWidth;

  const colCount = Math.max(1, Math.floor(width / props.colWidth));

  if (columns.length !== colCount) {
    columns.splice(0, columns.length);

    for (let i = 0; i < colCount; i++) {
      columns.push([]);
    }

    layout();
  }
};

// 图片加载完成后记录图片高度并重新布局
const handleImgLoad = (e: Event): void => {
  const target = e.target as HTMLImageElement;

  const {
    src
  } = target;

  const item = props.list.find(i => i.src === src);

  if (item) {
    item.height = target.naturalHeight / (target.naturalWidth / props.colWidth);
    layout();
  }
};

onMounted(() => {
  calcColumns();
  window.addEventListener("resize", calcColumns);
});

onUnmounted(() => {
  window.removeEventListener("resize", calcColumns);
});

watch(() => props.list, layout, {
  deep: true
});
</script>

<template>
  <div
    ref="containerRef"
    class="waterfall"
  >
    <div
      v-for="(col, index) in columns"
      :key="index"
      class="waterfall-col"
    >
      <div
        v-for="item in col"
        :key="item.id"
        class="waterfall-item"
      >
        <img
          :src="item.src"
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
