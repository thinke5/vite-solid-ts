import { isServer } from 'solid-js/web'
import { appDevConfig } from './appDevConfig'

/**
 * 手机网页的前端开发者调试面板。
 * @link https://github.com/Tencent/vConsole
 */
export default function VConsole() {
  if (isServer) { // TODO: 增加配置以开启
    return null
  }
  if (appDevConfig.vconsole) {
    const vconsoleJs = document.createElement('script')
    vconsoleJs.src = 'https://unpkg.com/vconsole@latest/dist/vconsole.min.js'
    vconsoleJs.onload = () => {
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-ignore
      const vConsole = new window.VConsole()
    }

    document.querySelector('head')?.appendChild(vconsoleJs)
  }

  return null
};
