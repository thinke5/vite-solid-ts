import type { RouteDefinition } from '@solidjs/router'
import { lazyCom, lazyKeepAlive } from './entry/ssr-utils'
import Page404 from './pages/404'

export async function ayncRouters() {
  return [
    {
      // async: true,
      insertStyleToHTML: true,
      path: '/',
      component: await lazyKeepAlive(() => import('./pages/demo/index')),
    },
    {
      path: '/demo',
      component: await lazyKeepAlive(() => import('./pages/demo/ssr')),
    },
    {
      path: '/demo2',
      component: await lazyKeepAlive(() => import('./pages/demo/ssr')),
    },
    {
      path: '/devSetting',
      component: await lazyCom(() => import('./pages/devSetting/index')),
    },
    // -------------------------------------------------------------
    {
      path: '*p404',
      component: Page404,
    },
  ] satisfies IAyncRoute[]
}

export interface IAyncRoute extends RouteDefinition {
  /** 打开会尝试加载 `Suspense` 的异步内容，包括异步组件、请求 @default false */
  async?: boolean
  /**
   * 打开会将css直接嵌入HTML
   *
   * ⚠️注意：这可能会影响html的加载速度
   * @default false
   */
  insertStyleToHTML?: boolean
}
