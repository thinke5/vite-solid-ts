import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import unocss from 'unocss/vite';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(({ command }) => {
  const isBuild = command === 'build';
  return {
    base: './',
    plugins: [solid(), unocss(), isBuild && visualizer()],
  };
});
