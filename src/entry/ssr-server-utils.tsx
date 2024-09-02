/* eslint-disable ts/ban-ts-comment */
// @ts-ignore
import fs from 'node:fs'
// @ts-ignore
import path from 'node:path'
import type { AssetHtmlTag } from '@ssrx/vite/runtime'
import { Dynamic, isServer } from 'solid-js/web'

/**  渲染资源tag */
export function renderAssets(assets: AssetHtmlTag[], insertStyleToHTML = false) {
  return assets.map((a) => {
    if (isServer && insertStyleToHTML && a.tag === 'link' && a.attrs?.rel === 'stylesheet') {
      const styleCode = fs.readFileSync(path.resolve('./dist/public', `.${a.attrs?.href}`)).toString()
      return <style innerHTML={styleCode}></style>
    }
    return <Dynamic $ServerOnly={!['link'].includes(a.tag)} component={a.tag} {...a.attrs} />
  })
}
