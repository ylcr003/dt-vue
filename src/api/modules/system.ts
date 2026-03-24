import { request } from '../core/request'

export interface RoleItem {
  id: string | number
  name: string
  code: string
  description: string
  status: 0 | 1
}

export interface MenuItem {
  id: string | number
  parentId: string | number | null
  name: string
  path: string
  icon: string
  sort: number
  type: 'menu' | 'button'
}

export interface DictItem {
  label: string
  value: string | number
  disabled?: boolean
}

/** 获取角色列表 */
export function getRoleListApi() {
  return request.get<RoleItem[]>('/system/role/list')
}

/** 获取菜单列表 */
export function getMenuListApi() {
  return request.get<MenuItem[]>('/system/menu/list')
}

/** 根据字典类型获取字典项 */
export function getDictListApi(dictType: string) {
  return request.get<DictItem[]>('/system/dict/list', { params: { dictType } })
}
