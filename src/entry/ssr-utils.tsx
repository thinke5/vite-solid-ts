import { lazy } from 'solid-js'
import { isServer } from 'solid-js/web'
import type { JSX } from 'solid-js'
import { KeepAlive } from '~/libs/keepAlive'

/** 增强lazy，可以在server直接加载lazy compont */
export async function lazyCom(fn: () => Promise<{ default: (...props: any[]) => JSX.Element }>) {
  if (isServer && import.meta.env.VITE__NOT_IN_SSRX) {
    return (await fn()).default
  }
  return lazy(fn)
}
/** KeepAlive 并 异步的 页面 */
export async function lazyKeepAlive(fn: () => Promise<{ default: (...props: any[]) => JSX.Element }>) {
  const Comp = await lazyCom(fn)
  const fnKey = Math.random().toString(32)
  return () => <KeepAlive id={fnKey}><Comp /></KeepAlive>
}
