import { cache } from '@solidjs/router'
import { GET, POST } from '../utils/ajax'

/** bing 每日壁纸 */
export function api404() {
  return POST('v/404', { msg: 'xxx' }).json()
}
/** bing 每日壁纸 */
export function bingBgByGet() {
  return GET('v2/bing', { format: 'json' }).json<BingRsq>()
}
/** bing 每日壁纸 */
export function Qrdecode() {
  return POST('v2/decode', { url: 'json' }).json<{ data: { url: string, text: string } }>()
}

let num = 0
export function apiTest() {
  return new Promise<{ a: number }>((resolve, reject) => {
    console.log('apiTest run', num)
    setTimeout(() => {
      if (num > 3)
        resolve({ a: num })
      else
        reject(new Error('eror'))
    }, 600)

    num += 1
  })
}
export const routerBing = cache(() => bingBgByGet(), bingBgByGet.name)

export interface BingRsq {
  url: string
  title: string
  date: string
  width: number
  height: number
  copyright: string
  copyrightlink: string
}
