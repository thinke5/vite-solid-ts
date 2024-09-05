import { createStore } from 'solid-js/store'
import { createEffect } from 'solid-js'

const appDevConfigLSKey = 'appDevConfig'

const ver = '1.0'
// 增加配置需要修改上面👆的版本，否则 不生效
let lsData = {
  vconsole: false,
  solidQueryDevtools: false,
  pageSpy: {
    enable: false,
    btn: false,
    offline: true,
  },
}

try {
  const lsStr = localStorage.getItem(appDevConfigLSKey)
  if (lsStr) {
    const res = JSON.parse(lsStr)
    if (res?.data && res?.ver === ver && typeof res.data === 'object') {
      lsData = res.data
    }
  }
}
catch (error) { }

export const [appDevConfig, setAppDevConfig] = createStore(lsData)

createEffect(() => {
  localStorage.setItem(appDevConfigLSKey, JSON.stringify({ ver, data: appDevConfig }))
})
