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
  </div>
</template>

<style scoped>
.draggable {
  width: 200px;
  height: 100px;
  background-color: aqua;
}
</style>
