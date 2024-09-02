import type { JSX } from 'solid-js'
import { lazy } from 'solid-js'
import { isServer } from 'solid-js/web'

/** 增强lazy，可以在server直接加载lazy compont */
export async function lazyCom(fn: () => Promise<{ default: (...props: any[]) => JSX.Element }>) {
  if (isServer && import.meta.env.VITE__NOT_IN_SSRX) {
    return (await fn()).default
  }
  return lazy(fn)
}
