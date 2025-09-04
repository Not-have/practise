import type { SpreadsheetSkeleton, UniverRenderingContext } from '@univerjs/preset-sheets-core'
import type { IScale } from '@univerjs/presets'
import { DEFAULT_FONTFACE_PLANE, FIX_ONE_PIXEL_BLUR_OFFSET, getColor, SheetExtension } from '@univerjs/preset-sheets-core'

const UNIQUE_KEY = 'RowHeaderCustomExtension'

// 员工ID列表 - 对应行号
const employeeIds = ['11', 'E001', 'E002', 'E003', 'E004', 'E005', 'E006', 'E007', 'E008', 'E009', 'E010']

export default class RowHeaderCustomExtension extends SheetExtension {
  uKey = UNIQUE_KEY

  // 设置更高的 zIndex 来覆盖默认的行头
  get zIndex() {
    return 100
  }

  draw(ctx: UniverRenderingContext, _parentScale: IScale, spreadsheetSkeleton: SpreadsheetSkeleton) {
    const { rowColumnSegment, rowHeaderWidth = 0 } = spreadsheetSkeleton
    const { startRow, endRow } = rowColumnSegment

    if (!spreadsheetSkeleton) {
      return
    }

    const { rowHeightAccumulation } = spreadsheetSkeleton

    if (!rowHeightAccumulation) {
      return
    }

    ctx.translateWithPrecisionRatio(FIX_ONE_PIXEL_BLUR_OFFSET, FIX_ONE_PIXEL_BLUR_OFFSET)

    let preRowPosition = 0
    const rowHeightAccumulationLength = rowHeightAccumulation.length
    
    for (let r = startRow - 1; r <= endRow; r++) {
      if (r < 0 || r > rowHeightAccumulationLength - 1) {
        continue
      }

      const rowEndPosition = rowHeightAccumulation[r]
      if (preRowPosition === rowEndPosition) {
        // Skip hidden rows
        continue
      }

      const rowHeight = rowEndPosition - preRowPosition
      const middleRowPos = preRowPosition + rowHeight / 2
      
      // 绘制背景覆盖默认的行头数字
      ctx.fillStyle = getColor([248, 249, 250])
      ctx.fillRect(0, preRowPosition, rowHeaderWidth, rowHeight)
      
      // 绘制边框
      ctx.strokeStyle = getColor([217, 217, 217])
      ctx.lineWidth = 1
      ctx.strokeRect(0, preRowPosition, rowHeaderWidth, rowHeight)
      
      // 绘制员工ID
      if (employeeIds[r]) {
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.font = `12px ${DEFAULT_FONTFACE_PLANE}`
        ctx.fillStyle = getColor([0, 0, 0])
        ctx.fillText(employeeIds[r], rowHeaderWidth / 2, middleRowPos)
      }
      
      preRowPosition = rowEndPosition
    }
  }
}
