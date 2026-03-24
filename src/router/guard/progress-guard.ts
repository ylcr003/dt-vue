import type { Router } from 'vue-router'
import { NProgress } from '@/plugins/nprogress'

/** 进度条守卫 */
export function setupProgressGuard(router: Router) {
  router.beforeEach(() => {
    NProgress.start()
  })

  router.afterEach(() => {
    NProgress.done()
  })
}
