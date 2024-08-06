/* eslint-disable ts/ban-ts-comment */
// @ts-expect-error
import { dirname, resolve } from 'node:path'
// @ts-expect-error
import { fileURLToPath } from 'node:url'
import unocss from 'unocss/vite'
import type { PluginOption } from 'vite'
import { defineConfig, loadEnv } from 'vite'
import solid from 'vite-plugin-solid'
import dayjs from 'dayjs'

// @ts-expect-error
// eslint-disable-next-line node/prefer-global/process
const ENV = process.env

// @ts-expect-error
const __dirname = dirname(fileURLToPath(import.meta.url))
/** 是否流水线 */
const isCI = Boolean(ENV.BK_CI_BUILD_NO)
/** 构建版本号 */
const build_version = `${ENV.BK_CI_MAJOR_VERSION}.${ENV.BK_CI_MINOR_VERSION}.${ENV.BK_CI_FIX_VERSION}-${ENV.BK_CI_BUILD_NO}`

export default defineConfig(async ({ command, mode }) => {
  const isBuild = command === 'build'
  const CDN_host = 'https://xxxxx.com'

  return {
    base: isBuild && isCI ? `${CDN_host}/zzzzzzz/H5-${mode}/yyyyyyyyy/${build_version}/` : './', // CDN,
    define: {
      'import.meta.env.VITE_BUILD_TIME': JSON.stringify(dayjs().format('YYYY-MM-DD HH:mm:ss')),
      'import.meta.env.VITE_BUILD_V': JSON.stringify(isBuild ? build_version : '0.0.0-dev'),
    },
    plugins: [
      unocss(),
      solid(),
      // isBuild && (await import('vite-plugin-singlefile').then(p => p.viteSingleFile))({ useRecommendedBuildConfig: false, inlinePattern: ['assets/index-*.css'] }), // 将css提取到html内 - 按需开启
      // isBuild && (await import('unplugin-inject-preload/vite').then(p => p.default))({ files: [{ outputMatch: /\.(m?js|css)$/, attributes: { crossorigin: true } }], injectTo: 'head' }), // 预加载，文件较多的可能负提升，使用时请详细测试 - 按需开启
      // isBuild && isCI && vite_plugin_dns_prefetch(['https://xxxxx.com']), // DNS 加速 - 按需填写域名，一般只用填api的域名 如：['https://xxxxx.com']
      // isBuild && !isCI && (await import('rollup-plugin-visualizer').then(p => p.visualizer))(), // 包体积分析 - 按需开启
      // isBuild && (await import('@vitejs/plugin-legacy').then(p => p.default))({ targets: '>0.1%, chrome>=64,android>=64, ios>=11.1,not ie>0' }), // 低版本浏览器兼容 - 按需开启
      mode === 'rdm' && isCI && vite_plugin_vconsole(), // vConsole - 按需开启

    ],
    build: {
      target: ['chrome64', 'safari11.1'],
    },
    resolve: {
      alias: {
        '~': resolve(__dirname, './src'),
        '@': resolve(__dirname, './src'),
      },
    },
    server: {
      port: 8864,
      open: true,
      // host:"0.0.0.0", // 允许所有的ip访问

      proxy: {
        '/tenapi': {
          target: 'https://tenapi.cn',
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/tenapi/, ''),
        },
      },
    },
  }
})

/** 移动端调试 @link https://github.com/Tencent/vConsole */
function vite_plugin_vconsole() {
  return {
    name: 'add-vConsole',
    apply: 'build',
    transformIndexHtml(html) {
      return html.replace('<!-- vConsole -->', `<script src="https://unpkg.com/vconsole@latest/dist/vconsole.min.js"></script><script> var vConsole = new window.VConsole(); </script>`)
    },
  } as PluginOption
}

/**
 * DNS-prefetch 尝试在请求资源之前解析域名, 仅对跨源域上的 DNS 查找有效
 * @link https://developer.mozilla.org/zh-CN/docs/Web/Performance/dns-prefetch
 */
function vite_plugin_dns_prefetch(hosts: string[]) {
  if (hosts.length === 0) {
    return null
  }
  return {
    name: 'vite_plugin_dns_prefetch',
    apply: 'build',
    transformIndexHtml(html) {
      return html.replace('<head>', `<head>${hosts.map(h => `<link rel="preconnect" href="${h}" crossorigin />\n<link rel="dns-prefetch" href="${h}"/>`).join('\n')}`)
    },
  } as PluginOption
}
