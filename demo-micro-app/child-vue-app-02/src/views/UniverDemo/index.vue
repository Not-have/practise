<template>
  <div id="univer">11</div>
</template>
<script setup lang="ts">
import { onMounted, nextTick } from "vue";

import {
  createUniver,
  defaultTheme,
  LocaleType,
  merge,
} from "@univerjs/presets";
import { UniverSheetsCorePreset } from "@univerjs/preset-sheets-core";
import UniverPresetSheetsCoreZhCN from "@univerjs/preset-sheets-core/locales/zh-CN";

import "@univerjs/presets/lib/styles/preset-sheets-core.css";
import { WORKBOOK_DATA } from './data'

import ColumnHeaderCustomExtension from './extensions/column-header.extension'
import RowHeaderCustomExtension from './extensions/row-header.extension'

const createUniverDemo = () => {
  const { univerAPI } = createUniver({
    locale: LocaleType.ZH_CN,
    locales: {
      zhCN: merge({}, UniverPresetSheetsCoreZhCN),
    },
    theme: defaultTheme,
    presets: [
      UniverSheetsCorePreset({
        container: "univer",
      }),
    ]
  });
  
  // 使用外部数据创建工作簿
  univerAPI.createWorkbook(WORKBOOK_DATA);

  univerAPI.addEvent(univerAPI.Event.LifeCycleChanged, ({ stage }) => {
    if (stage === univerAPI.Enum.LifecycleStages.Rendered) {
      const unitId = univerAPI.getActiveWorkbook()?.getId()

      console.log(unitId)
      if (!unitId) {
        return
      }

      univerAPI.registerSheetColumnHeaderExtension(unitId, new ColumnHeaderCustomExtension())
      
      // 注册行头扩展
      univerAPI.registerSheetRowHeaderExtension(unitId, new RowHeaderCustomExtension())
    }
  })

};
onMounted(() => {
  nextTick(() => {
    createUniverDemo();
  });
});
</script>

<style scoped>
#univer {
  background-color: #f0f0f0;
  width: 100%;
  height: 100%;
}
</style>
