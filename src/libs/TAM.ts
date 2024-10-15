// import { getAuthParamWithCache } from '@tencent/tmga-h5-sdk'
import { isServer } from 'solid-js/web'

// 监控上报
let aegis: any = (globalThis as any).$$tam_aegis

/** 等待`aegis`加载完成 */
function waitAegis() {
  if (isServer) {
    return false
  }
  if (aegis) {
    return true
  }
  return new Promise((resolve) => {
    const timer = setInterval(() => {
      aegis = (window as any).$$tam_aegis
      if (aegis) {
        resolve(true)
      }
    }, 64)
    setTimeout(() => {
      resolve(false)
      clearInterval(timer)
      // console.error('TAM aegis加载超时')
    }, 2000)
  })
}

/** https://aegis.woa.com/sdk/web.html#setconfig */
export async function setConfig(config: Record<string, any>) {
  if (await waitAegis()) {
    aegis.setConfig(config)
  }
}

/** 设置uin，即openid */
export async function setUin(uin: string) {
  if (await waitAegis()) {
    aegis.setConfig({ uin })
  }
}

/** 上报自定义事件 https://aegis.woa.com/sdk/web.html#reportevent */
export async function reportEvent(name: string, ext1?: string | Record<string, any>, ext2?: string | Record<string, any>, ext3?: string | Record<string, any>) {
  if (await waitAegis()) {
    aegis.reportEvent({ name, ext1, ext2, ext3 })
  }
}
/** 初始化 */
export async function init() {
  // const { bodyParam } = await getAuthParamWithCache()
  // await setUin(bodyParam.openid)
  aegis?.ready()

  // setTimeout(() => {
  //   // @ts-ignore
  //   if (window.error_$mna$_arr?.length) {
  //     // @ts-ignore
  //     window.error_$mna$_canset = false
  //     // @ts-ignore
  //     const arr = window.error_$mna$_arr

  //     reportEvent('htmlerror', JSON.stringify(arr))
  //   }
  // }, 1000)
}

export async function errorLog(err: any) {
  if (await waitAegis()) {
    aegis.error(err)
  }
}
