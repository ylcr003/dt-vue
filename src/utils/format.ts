import dayjs from 'dayjs'

/**
 * 格式化日期
 * @param date 日期值
 * @param format 格式字符串，默认 YYYY-MM-DD HH:mm:ss
 */
export function formatDate(
  date: string | number | Date | dayjs.Dayjs | null | undefined,
  format = 'YYYY-MM-DD HH:mm:ss',
): string {
  if (!date) return ''
  return dayjs(date).format(format)
}

/**
 * 格式化金额（保留两位小数，千分位分隔）
 * @param amount 金额数值
 * @param currency 货币符号，默认 ¥
 */
export function formatMoney(amount: number | string, currency = '¥'): string {
  const num = parseFloat(String(amount))
  if (isNaN(num)) return `${currency}0.00`
  return `${currency}${num.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}
