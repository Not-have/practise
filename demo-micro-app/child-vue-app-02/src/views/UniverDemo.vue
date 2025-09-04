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

import ColumnHeaderCustomExtension from './extensions/column-header.extension'

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

  console.log(univerAPI)
  
  univerAPI.createWorkbook({
    name: "My first workbook",
    // sheetOrder: ['sheet1', 'sheet2'],
    // sheets: {
    //   sheet1: {
    //     name: "Sheet1",
    //     rowCount: 100,
    //     columnCount: 20,
    //     defaultRowHeight: 30, // 设置默认行高为30像素
    //     defaultColumnWidth: 100, // 设置默认列宽
    //     rowHeader: {
    //       width: 46,
    //     },
    //     columnHeader: {
    //       height: 20,
    //     },
    //     cellData: {
    //       // 可以在这里设置特定单元格的数据
    //     },
    //     rowData: {
    //       // 可以在这里设置特定行的行高
    //       // 0: { h: 40 }, // 第1行高度为40像素
    //       // 1: { h: 50 }, // 第2行高度为50像素
    //     }
    //   }
    // }
  });

  univerAPI.addEvent(univerAPI.Event.LifeCycleChanged, ({ stage }) => {
    if (stage === univerAPI.Enum.LifecycleStages.Rendered) {
      const unitId = univerAPI.getActiveWorkbook()?.getId()

      console.log(unitId)
      if (!unitId) {
        return
      }

      univerAPI.registerSheetColumnHeaderExtension(unitId, new ColumnHeaderCustomExtension())
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
