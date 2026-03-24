import type { RouteRecordRaw } from 'vue-router'
import { DefaultLayout } from '@/layouts'

export const dynamicRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Root',
    component: DefaultLayout,
    redirect: '/dashboard',
    meta: { title: '首页' },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: {
          title: '仪表盘',
          icon: 'Monitor',
          affix: true,
        },
      },
    ],
  },
]
