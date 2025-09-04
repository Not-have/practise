// 日期生成示例文件

// 生成30天的日期
function generateDays(startDate?: Date, format: 'MM/DD' | 'DD' | 'MM-DD' = 'MM/DD') {
  const days = []
  const baseDate = startDate || new Date()
  
  for (let i = 0; i < 30; i++) {
    const date = new Date(baseDate)
    date.setDate(baseDate.getDate() + i)
    
    let formattedDate = ''
    switch (format) {
      case 'MM/DD':
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        formattedDate = `${month}/${day}`
        break
      case 'DD':
        formattedDate = String(date.getDate()).padStart(2, '0')
        break
      case 'MM-DD':
        const month2 = String(date.getMonth() + 1).padStart(2, '0')
        const day2 = String(date.getDate()).padStart(2, '0')
        formattedDate = `${month2}-${day2}`
        break
    }
    days.push(formattedDate)
  }
  
  return days
}

// 示例用法：

// 1. 从今天开始，MM/DD格式
const todayMMDD = generateDays(new Date(), 'MM/DD')
console.log('今天开始 MM/DD 格式:', todayMMDD)

// 2. 从今天开始，只显示日期
const todayDD = generateDays(new Date(), 'DD')
console.log('今天开始 DD 格式:', todayDD)

// 3. 从今天开始，MM-DD格式
const todayMM_DD = generateDays(new Date(), 'MM-DD')
console.log('今天开始 MM-DD 格式:', todayMM_DD)

// 4. 从指定日期开始
const customDate = new Date('2024-01-01')
const customDays = generateDays(customDate, 'MM/DD')
console.log('从2024-01-01开始:', customDays)

// 5. 从下个月1号开始
const nextMonth = new Date()
nextMonth.setMonth(nextMonth.getMonth() + 1, 1)
const nextMonthDays = generateDays(nextMonth, 'MM/DD')
console.log('下个月1号开始:', nextMonthDays)

export { generateDays }
