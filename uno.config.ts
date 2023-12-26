import { defineConfig, presetUno, transformerVariantGroup } from 'unocss';
import wmlPreset from '@tencent/unocss-wml-preset';

export default defineConfig({
  presets: [
    presetUno(), // base
    wmlPreset(), // 预设 & 移动rem兼容 && pc适配
  ],
  transformers: [
    transformerVariantGroup(), // text-(16 red)
  ],
});
