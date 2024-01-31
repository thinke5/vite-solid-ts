import { visualizer } from 'rollup-plugin-visualizer';
import unocss from 'unocss/vite';
import imagemin from 'unplugin-imagemin/vite';
import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

export default defineConfig(({ command }) => {
  const isBuild = command === 'build';
  return {
    base: './',
    plugins: [
      unocss(),
      solid(),
      isBuild && visualizer(),
      imagemin({
        mode: 'squoosh',
        beforeBundle: true, // 打开可压缩 被vite内联的图片
        cache: true,
        compress: {
          jpg: { quality: 75 },
          jpeg: { quality: 75 },
          png: { quality: 75 },
        },
      }),
    ],
    build: {
      target: ['chrome64', 'safari11.1'],
    },
    server: {
      port: 8864,
      // host:"0.0.0.0",
    },
  };
});
