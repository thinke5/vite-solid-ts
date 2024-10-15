import type { RouteDefinition } from '@solidjs/router'
import { isDEV, isRDM } from './config'
import { lazyCom, lazyKeepAlive } from './entry/ssr-utils'
import Page404 from './pages/404'

export async function ayncRouters() {
  const list: IAyncRoute[] = [
    {
      // async: true,
      insertStyleToHTML: true,
      path: '/',
      component: await lazyCom(() => import('./pages/demo/index')),
    },
    {
      path: '/demo',
      component: await lazyKeepAlive(() => import('./pages/demo/ssr')),
    },

    // -------------------------------------------------------------
    {
      path: '*p404',
      component: Page404,
    },
  ]
  if (isRDM || isDEV) {
    // 测试开关页面，正式环境不开启
    // list.push({
    //   path: '/devSetting',
    //   component: await lazyCom(() => import('./pages/devSetting/index')),
    // })
  }
  return list
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
