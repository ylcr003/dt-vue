/** 获取 sessionStorage 中的值 */
export function getItem<T>(key: string): T | null {
  const value = sessionStorage.getItem(key)
  if (!value) return null
  try {
    return JSON.parse(value) as T
  } catch {
    return value as unknown as T
  }
}

/** 设置 sessionStorage 中的值 */
export function setItem(key: string, value: unknown): void {
  sessionStorage.setItem(key, JSON.stringify(value))
}

/** 删除 sessionStorage 中的值 */
export function removeItem(key: string): void {
  sessionStorage.removeItem(key)
}

/** 清空 sessionStorage */
export function clear(): void {
  sessionStorage.clear()
}
