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
import { WORKBOOK_DATA } from "./data";

import ColumnHeaderCustomExtension from "./extensions/column-header.extension";
import RowHeaderCustomExtension from "./extensions/row-header.extension";

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
    ],
  });

  // console.log('当前冻结状态：', worksheet.getFreeze())

  // 使用外部数据创建工作簿
  univerAPI.createWorkbook(WORKBOOK_DATA);

  const workbook = univerAPI.getActiveWorkbook()!;
  const permission = workbook?.getPermission();
  if (permission) {
    const unitId = workbook.getId();
    const subUnitId = workbook.getActiveSheet().getSheetId();
    const worksheetEditPermission =
      permission.permissionPointsDefinition.WorksheetEditPermission;

    permission
      .addWorksheetBasePermission(unitId, subUnitId)
      .then((permissionId) => {
        permission.sheetRuleChangedAfterAuth$.subscribe(
          (currentPermissionId) => {
            if (currentPermissionId === permissionId) {
              permission.setWorksheetPermissionPoint(
                unitId,
                subUnitId,
                worksheetEditPermission,
                false
              );
            }
          }
        );
      });
  }

  univerAPI.addEvent(univerAPI.Event.LifeCycleChanged, async ({ stage }) => {
    if (stage === univerAPI.Enum.LifecycleStages.Rendered) {
      const unitId = univerAPI.getActiveWorkbook()?.getId();

      if (!unitId) {
        return;
      }

      univerAPI.registerSheetColumnHeaderExtension(
        unitId,
        new ColumnHeaderCustomExtension()
      );

      // 注册行头扩展
      univerAPI.registerSheetRowHeaderExtension(
        unitId,
        new RowHeaderCustomExtension()
      );
    }
  });
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
  /* 禁用用户选择 */
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

/* 全局样式：禁用表格编辑 */
:deep(.univer-cell) {
  pointer-events: none !important;
}

:deep(.univer-cell-input) {
  display: none !important;
}

:deep(.univer-cell-editor) {
  display: none !important;
}

/* 禁用右键菜单 */
:deep(.univer-context-menu) {
  display: none !important;
}

/* 禁用工具栏编辑按钮 */
:deep(.univer-toolbar-edit) {
  pointer-events: none !important;
  opacity: 0.5;
}

/* 禁用单元格选择 */
:deep(.univer-cell-selected) {
  pointer-events: none !important;
}

/* 禁用拖拽功能 */
:deep(.univer-drag-handle) {
  display: none !important;
}
</style>
