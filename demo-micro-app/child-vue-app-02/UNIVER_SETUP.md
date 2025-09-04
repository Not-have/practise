# UniverJS 设置指南

## 1. 安装依赖

```bash
npm install @univerjs/presets @univerjs/preset-sheets-core
```

## 2. 基本配置

### 2.1 创建 Univer 实例

```typescript
import {
  createUniver,
  defaultTheme,
  LocaleType,
  merge,
} from "@univerjs/presets";
import { UniverSheetsCorePreset } from "@univerjs/preset-sheets-core";
import UniverPresetSheetsCoreZhCN from "@univerjs/preset-sheets-core/locales/zh-CN";

const { univerAPI } = createUniver({
  locale: LocaleType.ZH_CN,
  locales: {
    zhCN: merge({}, UniverPresetSheetsCoreZhCN),
  },
  theme: defaultTheme,
  presets: [
    UniverSheetsCorePreset({
      container: "univer", // DOM 容器 ID
    }),
  ]
});
```

### 2.2 创建工作簿

```typescript
const workbookData = {
  id: 'workbook-01',
  name: '我的工作簿',
  sheetOrder: ['sheet1', 'sheet2'],
  sheets: {
    sheet1: {
      id: 'sheet1',
      name: 'Sheet1',
      rowCount: 100,
      columnCount: 20,
      defaultRowHeight: 30,
      defaultColumnWidth: 100,
      cellData: {
        0: {
          0: { v: '姓名' },
          1: { v: '年龄' },
          2: { v: '城市' }
        },
        1: {
          0: { v: '张三' },
          1: { v: 25 },
          2: { v: '北京' }
        }
      }
    }
  }
};

univerAPI.createWorkbook(workbookData);
```

## 3. 高级功能

### 3.1 自定义扩展

```typescript
import { SheetExtension } from '@univerjs/preset-sheets-core';

class CustomExtension extends SheetExtension {
  uKey = 'CustomExtension';
  
  get zIndex() {
    return 11;
  }
  
  draw(ctx, parentScale, spreadsheetSkeleton) {
    // 自定义绘制逻辑
  }
}

// 注册扩展
univerAPI.addEvent(univerAPI.Event.LifeCycleChanged, ({ stage }) => {
  if (stage === univerAPI.Enum.LifecycleStages.Rendered) {
    const unitId = univerAPI.getActiveWorkbook()?.getId();
    if (unitId) {
      univerAPI.registerSheetColumnHeaderExtension(unitId, new CustomExtension());
    }
  }
});
```

### 3.2 事件监听

```typescript
// 监听单元格选择变化
univerAPI.addEvent(univerAPI.Event.SelectionChanged, (selection) => {
  console.log('选择变化:', selection);
});

// 监听单元格值变化
univerAPI.addEvent(univerAPI.Event.CellValueChanged, (cellValue) => {
  console.log('单元格值变化:', cellValue);
});
```

### 3.3 获取和设置数据

```typescript
// 获取当前工作簿
const workbook = univerAPI.getActiveWorkbook();

// 获取当前工作表
const worksheet = workbook?.getActiveSheet();

// 获取单元格值
const cellValue = worksheet?.getCellValue(0, 0);

// 设置单元格值
worksheet?.setCellValue(0, 0, '新值');

// 获取选择范围
const selection = univerAPI.getSelection();
```

## 4. 样式配置

### 4.1 导入样式

```typescript
import "@univerjs/presets/lib/styles/preset-sheets-core.css";
```

### 4.2 自定义样式

```css
#univer {
  background-color: #f0f0f0;
  width: 100%;
  height: 100%;
  border: 1px solid #ddd;
}
```

## 5. 常用配置选项

### 5.1 工作表配置

```typescript
{
  rowCount: 100,           // 行数
  columnCount: 20,         // 列数
  defaultRowHeight: 30,    // 默认行高
  defaultColumnWidth: 100, // 默认列宽
  rowHeader: {
    width: 46,             // 行标题宽度
  },
  columnHeader: {
    height: 20,            // 列标题高度
  },
  cellData: {              // 单元格数据
    [rowIndex]: {
      [columnIndex]: { v: value }
    }
  },
  rowData: {               // 行数据（行高等）
    [rowIndex]: { h: height }
  },
  columnData: {            // 列数据（列宽等）
    [columnIndex]: { w: width }
  }
}
```

### 5.2 主题配置

```typescript
import { defaultTheme } from "@univerjs/presets";

// 自定义主题
const customTheme = {
  ...defaultTheme,
  color: {
    ...defaultTheme.color,
    primary: '#1890ff',
    success: '#52c41a',
    warning: '#faad14',
    error: '#f5222d',
  }
};
```

## 6. 最佳实践

1. **性能优化**：
   - 对于大数据量，使用虚拟滚动
   - 避免频繁的 DOM 操作
   - 合理使用事件监听

2. **数据管理**：
   - 将数据与视图分离
   - 使用状态管理工具（如 Pinia）
   - 实现数据的持久化

3. **用户体验**：
   - 提供加载状态
   - 实现撤销/重做功能
   - 添加键盘快捷键支持

4. **扩展开发**：
   - 遵循 UniverJS 的扩展规范
   - 合理使用 zIndex
   - 注意性能影响

## 7. 常见问题

### Q: 如何实现多语言支持？
A: 在创建 Univer 实例时配置 locales 参数，并导入对应的语言包。

### Q: 如何自定义工具栏？
A: 可以通过注册自定义扩展来实现工具栏的自定义。

### Q: 如何处理大数据量？
A: 使用虚拟滚动和分页加载，避免一次性渲染所有数据。

### Q: 如何实现协作编辑？
A: 需要集成 UniverJS 的协作功能，通常需要后端支持。

