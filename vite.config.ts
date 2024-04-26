import unocss from 'unocss/vite'
import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

export default defineConfig(async ({ command }) => {
  const isBuild = command === 'build'
  return {
    base: !isBuild ? './' : '', // CDN

    plugins: [
      unocss(),
      solid(),
      isBuild && (await import('rollup-plugin-visualizer').then(p => p.visualizer))(), // 包体积分析 - 按需开启
      // isBuild && (await import('@vitejs/plugin-legacy').then(p => p.default))({ targets: '>0.1%, chrome>=64,android>=64, ios>=11.1,not ie>0' }), // 低版本浏览器兼容 - 按需开启
    ],
    build: {
      target: ['chrome64', 'safari11.1'],
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
