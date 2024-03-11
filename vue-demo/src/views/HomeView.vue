<template>
    <div class="home">
        <button @click="handleError">触发 error</button>
    </div>
</template>
<style scoped>

</style>

<script setup lang="ts">
function handleError() {
    // reload();
    // throw new Error('请求错误！');
    // 异步错误（Promise 拒绝）
    new Promise((resolve, reject) => {
        reject('1111');
    }).catch
  
  // 注释掉下一行，以确保全局未捕获 Promise 拒绝
  // promise.catch(error => {});
  
  // 在稍后的时间点触发 Promise 拒绝
}
</script>
