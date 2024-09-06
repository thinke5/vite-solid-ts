import { isServer } from 'solid-js/web'
import { appDevConfig } from './appDevConfig'
import { loadJS } from '~/utils'

/**
 * 手机网页的前端开发者调试面板。
 * @link https://github.com/Tencent/vConsole
 */
export default function VConsole() {
  if (isServer) { // TODO: 增加配置以开启
    return null
  }
  if (appDevConfig.vconsole) {
    loadJS('https://unpkg.com/vconsole@latest/dist/vconsole.min.js', () => {
      // eslint-disable-next-line ts/ban-ts-comment
    // @ts-ignore
      const _vConsole = new window.VConsole()
    })
  }

  return null
};
