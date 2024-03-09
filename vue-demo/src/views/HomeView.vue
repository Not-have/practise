<template>
    <div class="home">
        <a-button @click="isRectangleIntersect">查询</a-button>
        {{ position }}
        <div class="test" @mousedown="sourceMouseDown">
            <div class="box" :style="{
            width: position?.width + 'px',
            height: position?.height + 'px',
            top: position?.top + 'px',
            left: position?.left + 'px'
        }"></div>
            <a-checkbox-group v-model="selectData" class="checkbox">
                <a-checkbox v-for="item in list" :key="item" :label="item" :value="item">Option {{ item }}</a-checkbox>
            </a-checkbox-group>
        </div>
    </div>
</template>
<style scoped>
.home,
.test {
    height: 100%;
    width: 100%;
}
</style>

<script setup lang="jsx">
import { onMounted, ref } from "vue";

const isPress = ref(false);
const startPos = ref({ current: null });
const position = ref(null);
const selectData = ref([]);
const list = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

// 鼠标按下，开始框选
function sourceMouseDown(e) {
    isPress.value = true;
    startPos.value.current = { top: e.pageY, left: e.pageX };
    position.value = { top: e.pageY, left: e.pageX, width: 0, height: 0 };
    //  console.log({ top: e.pageY, left: e.pageX, width: 1, height: 1 });
    // 解决误选择文本情况
    window.getSelection()?.removeAllRanges();
}

// 鼠标移动，移动框选
function mousemove(e) {
    if (!isPress.value) return;
    let left = startPos.value.current?.left;
    let top = startPos.value.current?.top;
    const width = Math.abs(e.clientX - startPos.value.current?.left);
    const height = Math.abs(e.clientY - startPos.value.current?.top);
    // 当后面位置小于前面位置的时候，需要把框的坐标设置为后面的位置
    if (e.clientX < startPos.value.current?.left) {
        left = e.clientX;
    }
    if (e.clientY < startPos.value.current?.top) {
        top = e.clientY;
    }
    position.value = { top, left, width, height };
    isRectangleIntersect();
    const arr = [];
    selectData.value = [];
    document
        .querySelectorAll(".arco-checkbox-group .arco-checkbox")
        .forEach((node, index) => {
            if (
                collide(
                    {
                        x: position.value.left,
                        y: position.value.top,
                        width: position.value.width,
                        height: position.value.height,
                    },
                    node.getBoundingClientRect()
                )
            ) {
                const label = +node.getAttribute("label");
                arr.push(label);
                selectData.value = arr;
            }
        });
    window.getSelection()?.removeAllRanges();
    //console.log({ top, left, width, height });
}

function collide(rect1, rect2) {
    // 获取矩形1的左上角和右下角坐标
    const x1 = rect1.x;
    const y1 = rect1.y;
    const x2 = rect1.x + rect1.width;
    const y2 = rect1.y + rect1.height;

    // 获取矩形2的左上角和右下角坐标
    const x3 = rect2.x;
    const y3 = rect2.y;
    const x4 = rect2.x + rect2.width;
    const y4 = rect2.y + rect2.height;

    // 如果 `rect1` 的左上角在 `rect2` 的右下方（即 `x1 < x4` 和 `y1 < y4`），并且 `rect1` 的右下角在 `rect2` 的左上方（即 `x2 > x3` 和 `y2 > y3`），那么这意味着两个矩形相交，函数返回 `true`。
    // 否则，函数返回 `false`，表示两个矩形不相交。
    //console.log(x1 < x4 && x2 > x3 && y1 < y4 && y2 > y3);
    return x1 < x4 && x2 > x3 && y1 < y4 && y2 > y3;
}

function isRectangleIntersect() {
    const sourceDom = document.querySelector(`.test`);
    const divInfo = sourceDom.getBoundingClientRect();
    const lt1 = divInfo.top;
    const rt1 = divInfo.left + divInfo.width;
    const rb1 = divInfo.top + divInfo.height;
    const lb1 = divInfo.left;
    const lt2 = position.value.top;
    const rt2 = position.value.left + position.value.width;
    const rb2 = position.value.top + position.value.height;
    const lb2 = position.value.left;
    if (lt1 > lt2) {
        // position.value.top = divInfo.top;
        console.log("走了1");
        //  position.value.height = divInfo.bottom - position.value.top;
    }
    if (lb1 > lb2) {
        console.log("走了2", divInfo);
        // position.value.left = divInfo.left;
        //position.value.width = position.value.left - divInfo.left;
    }
    if (rt1 < rt2) {
        position.value.width = divInfo.right - divInfo.left;
    }
    if (rb1 < rb2) {
        console.log("走了4");
        position.value.height = divInfo.bottom - position.value.top;
    }
}

function mouseup() {
    if (!isPress.value) return;
    startPos.value.current = null;
    /*   position.value = null;
      isPress.value = false;*/
    // 为了重新渲染一下
    // setPosition(prev => ({ ...prev }));

    //   onSelectEnd && onSelectEnd();
}

onMounted(() => {
    // 这三个都是添加在document
    document.addEventListener("scroll", scroll);
    document.addEventListener("mousemove", mousemove);
    document.addEventListener("mouseup", mouseup);
});
</script>
