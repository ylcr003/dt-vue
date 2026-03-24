import type { RouteRecordRaw } from 'vue-router'
import { BlankLayout } from '@/layouts'

/** 核心路由（不需要权限判断） */
export const coreRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: BlankLayout,
    meta: { title: '登录', hidden: true },
    children: [
      {
        path: '',
        name: 'LoginPage',
        component: () => import('@/views/_core/login/index.vue'),
      },
    ],
  },
  {
    path: '/redirect',
    component: BlankLayout,
    meta: { hidden: true },
    children: [
      {
        path: ':path(.*)',
        name: 'Redirect',
        component: () => import('@/views/_core/redirect/index.vue'),
      },
    ],
  },
  {
    path: '/403',
    name: '403',
    component: () => import('@/views/_core/fallback/403.vue'),
    meta: { title: '403', hidden: true },
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/_core/fallback/404.vue'),
    meta: { title: '404', hidden: true },
  },
  {
    path: '/500',
    name: '500',
    component: () => import('@/views/_core/fallback/500.vue'),
    meta: { title: '500', hidden: true },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },
]
