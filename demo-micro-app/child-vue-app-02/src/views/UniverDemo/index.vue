<template>
  <div id="univer"></div>
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
import { UniverSheetsCustomMenuPlugin } from "./plugin";

/*
import { CustomMenuController } from './plugin/custom-menu.controller';

// 处理右键菜单事件
const handleContextMenu = (event: MouseEvent) => {
  event.preventDefault()
  event.stopPropagation()
  
  // 获取选中的数据
  getSelectedData()
}

// 获取选中的数据
const getSelectedData = () => {
  // 这里需要访问 univerAPI，我们需要将其保存到全局变量
  if ((window as any).univerAPI) {
    const workbook = (window as any).univerAPI.getActiveWorkbook()
    if (workbook) {
      const worksheet = workbook.getActiveSheet()
      if (worksheet) {
        // 获取当前选择范围
        const selection = worksheet.getSelection()
        console.log('当前选择范围:', selection)
      
      }
    }
  }
}
*/

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
        sheets: {
          protectedRangeShadow: false,
        },
        contextMenu: false,
      }),
    ]
  });

  // 使用外部数据创建工作簿
  univerAPI.createWorkbook(WORKBOOK_DATA);

  // 修改右键菜单的简单方法
  const univerContainer = document.getElementById("univer");
  if (univerContainer) {
    // 监听右键菜单事件
    univerContainer.addEventListener("contextmenu", (event) => {
      event.preventDefault();

      // 创建自定义右键菜单
      createCustomContextMenu(event.clientX, event.clientY);
    });
  }

  // 创建自定义右键菜单
  const createCustomContextMenu = (x: number, y: number) => {
    // 移除已存在的菜单
    const existingMenu = document.getElementById("custom-context-menu");
    if (existingMenu) {
      existingMenu.remove();
    }

    // 创建菜单容器
    const menu = document.createElement("div");
    menu.id = "custom-context-menu";
    menu.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      background: white;
      border: 1px solid #ddd;
      border-radius: 4px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      z-index: 10000;
      min-width: 150px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    `;

    // 菜单项
    const menuItems = [
      { icon: "📋", text: "复制", action: () => console.log("复制操作") },
      { icon: "📄", text: "粘贴", action: () => console.log("粘贴操作") },
      { icon: "✂️", text: "剪切", action: () => console.log("剪切操作") },
    ];

    menuItems.forEach((item, index) => {
      const menuItem = document.createElement("div");
      menuItem.style.cssText = `
        padding: 8px 12px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 14px;
        color: #333;
        border-bottom: ${
          index < menuItems.length - 1 ? "1px solid #f0f0f0" : "none"
        };
      `;

      menuItem.innerHTML = `
        <span>${item.icon}</span>
        <span>${item.text}</span>
      `;

      menuItem.addEventListener("mouseenter", () => {
        menuItem.style.backgroundColor = "#f5f5f5";
      });

      menuItem.addEventListener("mouseleave", () => {
        menuItem.style.backgroundColor = "transparent";
      });

      menuItem.addEventListener("click", () => {
        item.action();
        // menu.remove();
      });

      menu.appendChild(menuItem);
    });

    document.body.appendChild(menu);

    // 点击其他地方关闭菜单
    const closeMenu = (e: MouseEvent) => {
      if (!menu.contains(e.target as Node)) {
        menu.remove();
        document.removeEventListener("click", closeMenu);
      }
    };

    document.addEventListener("click", closeMenu);
  };

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
            console.log("无权限操作被拦截:", currentPermissionId);

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

    permission.setPermissionDialogVisible(false);
  }

  univerAPI.addEvent(univerAPI.Event.LifeCycleChanged, ({ stage }) => {
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

  univerAPI.addEvent(univerAPI.Event.CommandExecuted, (params) => {
    // console.log('CommandExecuted', params)
  });

  univerAPI.addEvent(univerAPI.Event.BeforeUndo, (params) => {
    console.log("BeforeUndo", params);
  });

  univerAPI.addEvent(univerAPI.Event.BeforeRedo, (params) => {
    console.log("BeforeRedo", params);
  });
  univerAPI.addEvent(univerAPI.Event.Undo, (params) => {
    console.log("Undo", params);
  });
  univerAPI.addEvent(univerAPI.Event.Redo, (params) => {
    console.log("Redo", params);
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
</style>
