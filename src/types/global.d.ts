// 通用键值对类型
type Recordable<T = any> = Record<string, T>

// 可为 null 的类型
type Nullable<T> = T | null

// 可为 undefined 的类型
type Optional<T> = T | undefined

// 可为 null 或 undefined 的类型
type Nullish<T> = T | null | undefined

// 数组或单个值
type MaybeArray<T> = T | T[]

// 异步函数类型
type AsyncFn<T = void> = () => Promise<T>
