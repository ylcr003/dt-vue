import { request } from '../core/request'

export interface LoginParams {
  username: string
  password: string
}

export interface LoginResult {
  token: string
  userId: string | number
}

export interface UserInfo {
  id: string | number
  username: string
  nickname: string
  email: string
  avatar: string
  roles: string[]
  permissions: string[]
}

/** 用户登录 */
export function loginApi(params: LoginParams) {
  return request.post<LoginResult>('/auth/login', params)
}

/** 用户退出登录 */
export function logoutApi() {
  return request.post('/auth/logout')
}

/** 获取当前用户信息 */
export function getUserInfoApi() {
  return request.get<UserInfo>('/auth/user-info')
}
