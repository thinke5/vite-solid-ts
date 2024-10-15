import type { AssetHtmlTag } from '@ssrx/vite/runtime'
/* eslint-disable ts/ban-ts-comment */
// @ts-ignore
import fs from 'node:fs'
// @ts-ignore
import path from 'node:path'
import { Dynamic, isServer } from 'solid-js/web'

let base = import.meta.env.BASE_URL
switch (base) {
  case '/':
    base = ''
    break
  case './':
    base = '.'
    break
}

/**  渲染资源tag */
export function renderAssets(assets: AssetHtmlTag[], insertStyleToHTML = false) {
  return assets.map((asset) => {
    if (isServer && insertStyleToHTML && asset.tag === 'link' && asset.attrs?.rel === 'stylesheet') {
      const styleCode = fs.readFileSync(path.resolve('./dist/public', `.${asset.attrs?.href}`)).toString()
      return <style innerHTML={styleCode}></style>
    }
    // 添加base前缀
    if (asset.tag === 'link' && asset.attrs?.href) {
      asset.attrs.href = base + asset.attrs.href
    }
    if (asset.tag === 'script' && asset.attrs?.src) {
      asset.attrs.src = base + asset.attrs.src
    }
    return <Dynamic $ServerOnly={!['link'].includes(asset.tag)} component={asset.tag} {...asset.attrs} />
  })
}

/** legacy-polyfills */
export async function renderPolyfillAssets() {
  const client_manifest = fs.readFileSync(path.resolve('./dist/client-manifest.json')).toString()
  const manifest = JSON.parse(client_manifest)
  return <script $ServerOnly type="text/javascript" src={`${base}/${manifest['vite/legacy-polyfills'].file}`}></script>
}
