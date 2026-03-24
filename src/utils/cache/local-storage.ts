/** 获取 localStorage 中的值 */
export function getItem<T>(key: string): T | null {
  const value = localStorage.getItem(key)
  if (!value) return null
  try {
    return JSON.parse(value) as T
  } catch {
    return value as unknown as T
  }
}

/** 设置 localStorage 中的值 */
export function setItem(key: string, value: unknown): void {
  localStorage.setItem(key, JSON.stringify(value))
}

/** 删除 localStorage 中的值 */
export function removeItem(key: string): void {
  localStorage.removeItem(key)
}

/** 清空 localStorage */
export function clear(): void {
  localStorage.clear()
}
