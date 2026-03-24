import type { Directive, DirectiveBinding } from 'vue'
import { useUserStore } from '@/stores/modules/user'

/** v-permission 指令：根据权限控制元素显示 */
const permissionDirective: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding<string | string[]>) {
    const userStore = useUserStore()
    const { value } = binding

    if (!value) return

    const requiredPermissions = Array.isArray(value) ? value : [value]
    const hasPermission = requiredPermissions.some((permission) =>
      userStore.permissions.includes(permission),
    )

    if (!hasPermission) {
      el.parentNode?.removeChild(el)
    }
  },
}

export { permissionDirective }
