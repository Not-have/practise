<script setup lang="tsx">
import {
  EUiType,
  configProviderProps
} from "@/components/config-provider";

const {
  type
} = configProviderProps();

const el = () => {
  if(type === EUiType.ELEMENT) {
    return <el-button>element-plus</el-button>;
  }

  return <a-button>@arco-design/web-vue</a-button>;

};

</script>

<template>
  <div class="about">
    about

    <el />
  </div>
</template>
