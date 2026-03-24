import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import { ResultEnum } from '@/enums/httpEnum'
import type { ApiResponse } from './types'

export class RequestClient {
  private instance: AxiosInstance

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create({
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      ...config,
    })

    this.setupInterceptors()
  }

  /** 设置请求/响应拦截器 */
  private setupInterceptors() {
    // 请求拦截器：注入 Bearer Token
    this.instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('dt_token')
        if (token) {
          const parsedToken = JSON.parse(token)
          if (parsedToken) {
            config.headers.Authorization = `Bearer ${parsedToken}`
          }
        }
        return config
      },
      (error) => Promise.reject(error),
    )

    // 响应拦截器：统一处理业务状态码
    this.instance.interceptors.response.use(
      (response: AxiosResponse<ApiResponse>) => {
        const { code, message, data } = response.data
        if (code === ResultEnum.SUCCESS) {
          return data
        }
        if (code === ResultEnum.TOKEN_EXPIRED) {
          // Token 过期，清除登录状态并跳转登录页
          localStorage.removeItem('dt_token')
          window.location.href = '/login'
          return Promise.reject(new Error(message || 'Token 已过期'))
        }
        ElMessage.error(message || '请求失败')
        return Promise.reject(new Error(message || '请求失败'))
      },
      (error) => {
        const message = error.response?.data?.message || error.message || '网络错误'
        ElMessage.error(message)
        return Promise.reject(error)
      },
    )
  }

  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.get(url, config)
  }

  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.post(url, data, config)
  }

  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.put(url, data, config)
  }

  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.delete(url, config)
  }
}

export const request = new RequestClient({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})
