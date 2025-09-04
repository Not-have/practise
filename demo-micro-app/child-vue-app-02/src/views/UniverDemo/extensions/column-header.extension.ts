import type { SpreadsheetSkeleton, UniverRenderingContext } from '@univerjs/preset-sheets-core'
import type { IScale } from '@univerjs/presets'
import { DEFAULT_FONTFACE_PLANE, FIX_ONE_PIXEL_BLUR_OFFSET, getColor, SheetExtension } from '@univerjs/preset-sheets-core'
import { getDaysOfMonth } from '../utils'

const UNIQUE_KEY = 'ColumnHeaderCustomExtension'


// 调试：打印生成的日期
const dayTitles = getDaysOfMonth(2025, 9)

export default class ColumnHeaderCustomExtension extends SheetExtension {
  uKey = UNIQUE_KEY

  // 设置更高的 zIndex 来覆盖默认的列头
  get zIndex() {
    return 100
  }

  draw(ctx: UniverRenderingContext, _parentScale: IScale, spreadsheetSkeleton: SpreadsheetSkeleton) {

    const { rowColumnSegment, columnHeaderHeight = 0 } = spreadsheetSkeleton
    const { startColumn, endColumn } = rowColumnSegment

    if (!spreadsheetSkeleton) {
      return
    }

    const { rowHeightAccumulation, columnTotalWidth, columnWidthAccumulation, rowTotalHeight }
            = spreadsheetSkeleton

    if (
      !rowHeightAccumulation
      || !columnWidthAccumulation
      || columnTotalWidth === undefined
      || rowTotalHeight === undefined
    ) {
      return
    }
    ctx.translateWithPrecisionRatio(FIX_ONE_PIXEL_BLUR_OFFSET, FIX_ONE_PIXEL_BLUR_OFFSET)

    let preColumnPosition = 0
    const columnWidthAccumulationLength = columnWidthAccumulation.length
    
    for (let c = startColumn - 1; c <= endColumn; c++) {
      if (c < 0 || c > columnWidthAccumulationLength - 1) {
        continue
      }

      const columnEndPosition = columnWidthAccumulation[c]
      if (preColumnPosition === columnEndPosition) {
        // Skip hidden columns
        continue
      }

      const columnWidth = columnEndPosition - preColumnPosition
      const middleCellPos = preColumnPosition + columnWidth / 2
      
      // 绘制背景覆盖默认的列头字母
      ctx.fillStyle = getColor([248, 249, 250])
      ctx.fillRect(preColumnPosition, 0, columnWidth, columnHeaderHeight)
      
      // 绘制边框
      ctx.strokeStyle = getColor([217, 217, 217])
      ctx.lineWidth = 1
      ctx.strokeRect(preColumnPosition, 0, columnWidth, columnHeaderHeight)
      
      // 绘制日期标题
      if (dayTitles[c]) {
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.font = `12px ${DEFAULT_FONTFACE_PLANE}`
        ctx.fillStyle = getColor([64, 64, 64])
        ctx.fillText(dayTitles[c].toString(), middleCellPos, columnHeaderHeight / 2)
      }
      
      preColumnPosition = columnEndPosition
    }
  }
}
