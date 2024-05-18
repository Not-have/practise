<script lang="ts" setup>
import { dataDemo } from './fetch';
import { useService } from '@/hooks';

const { data } = useService(dataDemo);
console.log(data);
</script>
<template>
  <view>
    请求
    <view>
      {{ data }}
    </view>
  </view>
</template>

<style scoped lang="scss"></style>
