/* eslint-disable no-console */
import { hydrate, render } from 'solid-js/web'
import { ayncRouters } from '../routes'
import { HTML } from './html'
// import { loadDevutollsByLocalStorage } from 'sdk';

(async () => {
  // await loadDevutollsByLocalStorage() // 加载调试相关代码
  const routes = await ayncRouters()

  try {
    console.log('client hydrate')
    hydrate(() => <HTML routes={routes} />, document)
  }
  catch (error) {
    console.log('hydrate error: \n', error)
    console.log('client render')
    render(() => <HTML routes={routes} />, document)
  }
})()
