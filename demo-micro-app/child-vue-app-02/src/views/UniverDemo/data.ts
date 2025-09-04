import type { IWorkbookData } from '@univerjs/presets'

export const WORKBOOK_DATA: Partial<IWorkbookData> = {
  id: 'workbook-01',
  name: '示例工作簿',
  sheetOrder: [
    'sheet-01',
    'sheet-02',
    'sheet-03',
  ],
  sheets: {
    'sheet-01': {
      id: 'sheet-01',
      name: '员工信息',
      rowCount: 100,
      columnCount: 20,
      defaultRowHeight: 30,
      defaultColumnWidth: 100,
      rowHeader: {
        width: 46,
      },
      columnHeader: {
        height: 20,
      },
      cellData: {
        0: {
          0: { v: '员工ID' },
          1: { v: '姓名' },
          2: { v: '部门' },
          3: { v: '职位' },
          4: { v: '入职日期' },
          5: { v: '薪资' }
        },
        1: {
          0: { v: 'E001' },
          1: { v: '张三' },
          2: { v: '技术部' },
          3: { v: '前端工程师' },
          4: { v: '2023-01-15' },
          5: { v: 15000 }
        },
        2: {
          0: { v: 'E002' },
          1: { v: '李四' },
          2: { v: '设计部' },
          3: { v: 'UI设计师' },
          4: { v: '2023-03-20' },
          5: { v: 12000 }
        }
      }
    },
    'sheet-02': {
      id: 'sheet-02',
      name: '产品清单',
      rowCount: 50,
      columnCount: 15,
      defaultRowHeight: 25,
      defaultColumnWidth: 80,
      cellData: {
        0: {
          0: { v: '产品ID' },
          1: { v: '产品名称' },
          2: { v: '价格' },
          3: { v: '库存' },
          4: { v: '分类' }
        },
        1: {
          0: { v: 'P001' },
          1: { v: '笔记本电脑' },
          2: { v: 5999 },
          3: { v: 50 },
          4: { v: '电子产品' }
        }
      }
    },
    'sheet-03': {
      id: 'sheet-03',
      name: '销售数据',
      rowCount: 200,
      columnCount: 10,
      defaultRowHeight: 25,
      defaultColumnWidth: 90,
      cellData: {
        0: {
          0: { v: '日期' },
          1: { v: '产品' },
          2: { v: '数量' },
          3: { v: '单价' },
          4: { v: '总价' }
        }
      }
    }
  }
}