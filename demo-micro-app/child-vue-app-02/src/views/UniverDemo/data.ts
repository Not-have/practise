import type { IWorkbookData } from '@univerjs/presets'
import { getDaysOfMonth } from './utils'



// 调试：打印生成的日期
const dayTitles = getDaysOfMonth(2025, 9)
const columnCount = dayTitles.length // 根据日期数量自动设置列数

export const WORKBOOK_DATA: Partial<IWorkbookData> = {
  id: 'workbook-01',
  name: '示例工作簿',
  sheetOrder: [
    'sheet-01'
  ],
  sheets: {
    'sheet-01': {
      id: 'sheet-01',
      name: '员工信息',
      rowCount: 100,
      columnCount: columnCount, // 使用动态生成的列数
      defaultRowHeight: 80,
      defaultColumnWidth: 100,
      rowHeader: {
        width: 60,
      },
      columnHeader: {
        height: 40,
      },
      cellData: {
        0: {
          0: { v: '张三', custom: { name: '张三' , id: '1234567890'} },
          1: { v: '技术部' },
          2: { v: '前端工程师' },
          3: { v: '2023-01-15' },
          4: { v: 15000 }
        },
        1: {
          0: { v: '李四' },
          1: { v: '设计部' },
          2: { v: 'UI设计师' },
          3: { v: '2023-03-20' },
          4: { v: 12000 }
        }
      }
    }
  }
}