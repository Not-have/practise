<script lang="ts" setup>
import { ref } from 'vue';
import { Ref, UnwrapRef } from 'vue';
interface IObj {
  age: string;
}

const obj: Ref<UnwrapRef<IObj>> = ref({
  age: ''
});
</script>
<template>
  <view>
    请求
    <view>
      {{ obj?.age }}
    </view>
  </view>
</template>

<style scoped lang="scss"></style>
