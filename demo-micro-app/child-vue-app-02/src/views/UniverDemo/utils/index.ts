export function getDaysOfMonth(year: number, month: number): number[] {
  // 注意：JavaScript 的 month 从 0 开始，0=一月，11=十二月
  // 所以这里 month+1，然后 day=0，可以得到这个月的最后一天
  const daysInMonth = new Date(year, month, 0).getDate();

  // 生成 [1,...,daysInMonth]
  return Array.from({ length: daysInMonth }, (_, i) => i + 1);
}
