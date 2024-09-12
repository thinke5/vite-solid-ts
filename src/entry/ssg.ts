/* eslint-disable no-console */
/* eslint-disable node/prefer-global/process */
/* eslint-disable ts/ban-ts-comment */
// @ts-ignore
import fs from 'node:fs/promises'
// @ts-ignore
import path from 'node:path'
import { renderToString, renderToStringAsync } from 'solid-js/web'
import { RouteBasePah } from '../config'
import { ayncRouters } from '../routes'
import { render } from './ssr-server'
import type { IAyncRoute } from '../routes'

/** 按路由预渲染html */
export default async function server() {
  async function routePreRander(r: IAyncRoute[], pPath = '') {
    for (const v of r) {
      const htmlPath = path.resolve(`${RouteBasePah}/`, `./${pPath}`, String(v.path).replace(/^(\/)/, ''))

      if (v.children) {
        await routePreRander(v.children as any, htmlPath)
      }
      else {
        const { app } = await render(new Request(`https://test.com${htmlPath}`), v)
        const randerFn = v.async ? renderToStringAsync : renderToString
        let html = `<!doctype html>${await randerFn(app)}`
        // fix bug  solidjs修复后可删除
        html = html.replaceAll('"_$HY.r', '";_$HY.r')
        // 写入
        const htmlFsPath = path.resolve('./dist/public', `.${htmlPath}/index.html`)
        await fs.mkdir(path.dirname(htmlFsPath), { recursive: true })
        await fs.writeFile(htmlFsPath, html)

        console.log(`prerander ok : ${htmlFsPath}`)
      }
    }
  }
  await routePreRander(await ayncRouters())
  console.log('end')
  // @ts-ignore
  process.exit(0) // 主动关闭执行
}
server()
