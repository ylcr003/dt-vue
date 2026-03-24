# DT-Vue Admin

一个基于 Vue 3 + Element Plus + TypeScript 构建的中后台管理系统模板，开箱即用。

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Vue | 3.x | 渐进式 JavaScript 框架 |
| Element Plus | 2.x | 基于 Vue 3 的组件库 |
| TypeScript | 5.x | JavaScript 超集 |
| Vite | 5.x | 下一代前端构建工具 |
| Vue Router | 4.x | 官方路由管理器 |
| Pinia | 2.x | Vue 状态管理库 |
| Axios | 1.x | HTTP 请求库 |
| UnoCSS | - | 原子化 CSS 引擎 |
| vue-i18n | 9.x | 国际化插件 |
| @vueuse/core | - | Vue 组合式工具库 |
| NProgress | - | 页面进度条 |
| dayjs | - | 轻量日期处理库 |

## 目录结构

```
dt-vue/
├── src/
│   ├── api/              # API 请求层
│   │   ├── core/         # Axios 封装
│   │   └── modules/      # API 模块
│   ├── assets/           # 静态资源
│   │   └── styles/       # 全局样式
│   ├── components/       # 公共组件
│   │   ├── base/         # 基础组件
│   │   ├── business/     # 业务组件
│   │   └── layout/       # 布局组件
│   ├── composables/      # 组合式函数
│   ├── directives/       # 自定义指令
│   ├── enums/            # 枚举定义
│   ├── layouts/          # 页面布局
│   ├── locales/          # 国际化
│   ├── plugins/          # 插件
│   ├── router/           # 路由配置
│   ├── stores/           # Pinia 状态
│   ├── types/            # TypeScript 类型
│   ├── utils/            # 工具函数
│   ├── views/            # 页面视图
│   ├── App.vue
│   ├── bootstrap.ts
│   └── main.ts
├── .env
├── .env.development
├── .env.production
├── index.html
├── package.json
├── tsconfig.json
├── uno.config.ts
└── vite.config.ts
```

## 功能模块

- 🔐 **权限系统** — 基于角色的路由权限 + `v-permission` 按钮级权限控制
- 📡 **请求封装** — Axios 类封装，支持 Bearer Token 注入、响应拦截、自动登出
- 📦 **状态管理** — 5 个 Pinia Store（auth/user/permission/app/tabs）+ 持久化
- 🎨 **布局系统** — 默认布局（侧边栏 + 顶栏 + 标签页）+ 空白布局
- 🌐 **国际化** — vue-i18n 中/英双语 + Element Plus 联动切换
- 🌙 **主题切换** — 暗色/亮色模式切换
- ⚡ **useCrud** — 通用 CRUD Composable，极简页面代码
- 📄 **示例页面** — 登录、Dashboard、用户管理（完整 CRUD）、角色管理、错误页

## 快速开始

```bash
# 克隆项目
git clone https://github.com/ylcr003/dt-vue.git
cd dt-vue

# 安装依赖（推荐使用 pnpm）
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 代码检查
pnpm lint

# 类型检查
pnpm typecheck
```

## 浏览器兼容性

支持所有现代浏览器（Chrome、Firefox、Safari、Edge），不支持 IE。

## License

[MIT](./LICENSE)
