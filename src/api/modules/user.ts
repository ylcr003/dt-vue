import { request } from '../core/request'
import type { PageParams, PageResult } from '../core/types'

export interface UserItem {
  id: string | number
  username: string
  nickname: string
  email: string
  phone: string
  status: 0 | 1
  createTime: string
}

export interface CreateUserParams {
  username: string
  nickname: string
  email: string
  phone: string
  password: string
  status: 0 | 1
}

export interface UpdateUserParams extends Partial<CreateUserParams> {
  id: string | number
}

/** 获取用户列表 */
export function getUserListApi(params: PageParams) {
  return request.get<PageResult<UserItem>>('/system/user/list', { params })
}

/** 创建用户 */
export function createUserApi(data: CreateUserParams) {
  return request.post<UserItem>('/system/user', data)
}

/** 更新用户 */
export function updateUserApi(data: UpdateUserParams) {
  return request.put<UserItem>(`/system/user/${data.id}`, data)
}

/** 删除用户 */
export function deleteUserApi(id: string | number) {
  return request.delete(`/system/user/${id}`)
}
