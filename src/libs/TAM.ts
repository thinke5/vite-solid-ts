// 监控上报
let aegis: any = (window as any).$$tam_aegis

/** 等待`aegis`加载完成 */
function waitAegis() {
  if (aegis) {
    return (true)
  }
  return new Promise((resolve) => {
    setInterval(() => {
      aegis = (window as any).$$tam_aegis
      if (aegis) {
        resolve(true)
      }
    }, 64)
    setTimeout(() => {
      resolve(false)
    }, 2000)
  })
}

/** https://aegis.woa.com/sdk/web.html#setconfig */
export async function setConfig(config: Record<string, any>) {
  if (await waitAegis()) {
    aegis.setConfig(config)
  }
}

/** 上报自定义事件 https://aegis.woa.com/sdk/web.html#reportevent */
export async function reportEvent(name: string, ext1?: Record<string, any>, ext2?: Record<string, any>, ext3?: Record<string, any>) {
  if (await waitAegis()) {
    aegis.reportEvent({ name, ext1, ext2, ext3 })
  }
}
