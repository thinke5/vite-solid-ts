import { createStore } from 'solid-js/store'
import { createEffect } from 'solid-js'

const appDevConfigLSKey = 'appDevConfig'

let lsData = {
  vconsole: false,
  solidQueryDevtools: false,
}

try {
  const lsStr = localStorage.getItem(appDevConfigLSKey)
  if (lsStr) {
    const res = JSON.parse(lsStr)
    if (res?.data && typeof res.data === 'object') {
      lsData = res.data
    }
  }
}
catch (error) { }

export const [appDevConfig, setAppDevConfig] = createStore(lsData)

createEffect(() => {
  localStorage.setItem(appDevConfigLSKey, JSON.stringify({ data: appDevConfig }))
})
