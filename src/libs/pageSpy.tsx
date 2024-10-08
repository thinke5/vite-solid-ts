import { isServer } from 'solid-js/web'
import { loadJS } from '~/utils'
import { appDevConfig } from './appDevConfig'

/**
 * 调试 & 回放工具
 * @link https://github.com/HuolalaTech/page-spy
 */
export default function PageSpy() {
  if (isServer) {
    return null
  }
  if (appDevConfig.pageSpy.enable) {
    const host = 'http://e.thinke.vip:26848' // 测试使用
    Promise.all([
      loadJS(`${host}/page-spy/index.min.js`),
      loadJS(`${host}/plugin/data-harbor/index.min.js`),
      loadJS(`${host}/plugin/rrweb/index.min.js`),
    ]).then(() => {
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-ignore
      const w: any = window
      w.$harbor = new w.DataHarborPlugin()
      w.$rrweb = new w.RRWebPlugin()
      w.PageSpy.registerPlugin(w.$harbor)
      w.PageSpy.registerPlugin(w.$rrweb)
      // start https://github.com/HuolalaTech/page-spy/tree/main/packages/page-spy-browser
      w.$pageSpy = new w.PageSpy({
        // project: '',
        // title: '',
        autoRender: appDevConfig.pageSpy.btn,
        offline: appDevConfig.pageSpy.offline,
      })
    })
  }

  return null
};
