/* eslint-disable ts/ban-ts-comment */
// @ts-expect-error
import { dirname, resolve } from 'node:path'
// @ts-expect-error
import { fileURLToPath } from 'node:url'
import unocss from 'unocss/vite'
import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import dayjs from 'dayjs'

// @ts-expect-error
const __dirname = dirname(fileURLToPath(import.meta.url))
// @ts-expect-error
// eslint-disable-next-line node/prefer-global/process
const build_version = `${process.env.BK_CI_MAJOR_VERSION}.${process.env.BK_CI_MINOR_VERSION}.${process.env.BK_CI_FIX_VERSION}-${process.env.BK_CI_BUILD_NO}`

export default defineConfig(async ({ command, mode }) => {
  const isBuild = command === 'build'
  return {
    base: !isBuild ? './' : `https://xxxxx.com/zzzzzzz/H5-${mode}/yyyyyyyyy/${build_version}/`, // CDN,
    define: {
      'import.meta.env.VITE_BUILD_TIME': JSON.stringify(dayjs().format('YYYY-MM-DD HH:mm:ss')),
      'import.meta.env.VITE_BUILD_V': JSON.stringify(isBuild ? build_version : '0.0.0-dev'),
    },
    plugins: [
      unocss(),
      solid(),
      // isBuild && (await import('rollup-plugin-visualizer').then(p => p.visualizer))(), // 包体积分析 - 按需开启
      // isBuild && (await import('@vitejs/plugin-legacy').then(p => p.default))({ targets: '>0.1%, chrome>=64,android>=64, ios>=11.1,not ie>0' }), // 低版本浏览器兼容 - 按需开启
      // --
      // (mode === 'rdm' && isBuild) && {
      //   name: 'add-vConsole',
      //   transformIndexHtml(html) {
      //     return html.replace('<!-- vConsole -->', `<script src="https://unpkg.com/vconsole@latest/dist/vconsole.min.js"></script><script> var vConsole = new window.VConsole(); </script>`)
      //   },
      // },
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
      // host:"0.0.0.0",
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
