<script setup lang="tsx">
import Modal from "@/op/index.vue";

import useMount from "@/hooks/use-mount";
import {
  ElButton,
  ElMessage
} from "element-plus";

const dialogMount = useMount();

const handleConfirm = (): void => {
  ElMessage({
    message: "This is a message.",
    type: "info",
    plain: true
  });
};

const handleClick = (): void => {
  dialogMount(Modal, {
    visible: true,
    onClick: handleConfirm
  }, {
    default: <div>测试</div>
  });
};
</script>
<template>
  <div class="about">
    <h1>This is an about page</h1>

    <div
      v-directiveDraggable
      class="draggable"
    >
      directiveDraggable
    </div>

    <div v-conversion-time>
      1672531200
    </div>

    <div v-conversion-time>
      转换
    </div>

    <hr />

    <ElButton @click="handleClick">
      弹出框
    </ElButton>
  </div>
</template>

<style scoped>
.draggable {
  top: 10px;
  background-color: aqua;
  width: 200px;
  height: 100px;
}
</style>
