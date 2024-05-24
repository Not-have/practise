<script lang="ts" setup>
import { dataDemo, dataDemoList } from './fetch';
import { useService } from '@/hooks';

const { data } = useService(dataDemo);
const { data: list } = useService(dataDemoList);
</script>
<template>
  <view>
    请求
    <view>
      {{ data?.title }}

      {{ list?.length }}
    </view>
  </view>
</template>

<style scoped lang="scss"></style>
