import type { PluginOption } from 'vite'
/* eslint-disable ts/ban-ts-comment */
// @ts-expect-error
import { dirname, resolve } from 'node:path'
// @ts-expect-error
import { fileURLToPath } from 'node:url'
import { ssrx } from '@ssrx/vite/plugin'
import dayjs from 'dayjs'
import unocss from 'unocss/vite'
import { defineConfig, loadEnv } from 'vite'
import solid from 'vite-plugin-solid'
import tsconfigPaths from 'vite-tsconfig-paths'

// @ts-expect-error
// eslint-disable-next-line node/prefer-global/process
const ENV = process.env

// @ts-expect-error
const __dirname = dirname(fileURLToPath(import.meta.url))
/** 是否流水线 */
const isCI = Boolean(ENV.BK_CI_BUILD_NO)
/** 构建版本号 */
const build_version = isCI ? `${ENV.BK_CI_MAJOR_VERSION}.${ENV.BK_CI_MINOR_VERSION}.${ENV.BK_CI_FIX_VERSION}-${ENV.BK_CI_BUILD_NO}` : 'unknown'

const isSSR = ENV.BUILD_TYPE_VSR === 'ssr'

export default defineConfig(async ({ command, mode, isSsrBuild }) => {
  const isBuild = command === 'build'
  const CDN_host = 'https://xxxxx.com' // TODO:使用实际域名
  const ProjectName = 'zzzzzzz' // TODO:使用实际项目

  return {
    base: isBuild && isCI ? `${CDN_host}/zzzz/web/H5-${mode}/${ProjectName}/${build_version}` : `/h/${ProjectName}/`, // CDN,
    define: {
      'import.meta.env.VITE_BUILD_TIME': JSON.stringify(dayjs().format('YYYY-MM-DD HH:mm:ss')),
      'import.meta.env.VITE_BUILD_V': JSON.stringify(isBuild ? build_version : '0.0.0-dev'),
      'import.meta.env.VITE__NOT_IN_SSRX': 'true',
      'import.meta.env.VITE__ProjectName': JSON.stringify(ProjectName),
    },
    plugins: [
      tsconfigPaths(),
      unocss(),
      solid({ ssr: isSSR }),
      isSSR && ssrx({
        routesFile: 'src/entry/routes-ssr.ts',
        clientEntry: 'src/entry/ssr-client.tsx',
        serverFile: 'src/entry/ssg.ts',
      }),

      isBuild && !isCI && (await import('rollup-plugin-visualizer').then(p => p.visualizer))(), // 包体积分析 - 按需开启
      isBuild && (await import('@vitejs/plugin-legacy').then(p => p.default))({ targets: 'android>=73, ios>=13.1,not ie>0', modernPolyfills: true, renderLegacyChunks: false }), // 低版本浏览器兼容 - 按需开启

    ],
    build: {
      target: isSsrBuild ? ['esnext'] : undefined, // ['chrome64', 'safari11.1'],
    },
    resolve: {
      // alias: {
      //   '~': resolve(__dirname, './src'),
      //   '@': resolve(__dirname, './src'),
      // },
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
