import wmlPreset from '@thinke/unocss-wml-preset'
import { defineConfig, presetMini, transformerVariantGroup } from 'unocss'

export default defineConfig({
  presets: [
    presetMini(), // base
    wmlPreset({
      autoRem: {
        pcCompatible: true,
        designWidth: 375,
        expectFontSize: 16,
      },
    }), // 预设 & 移动rem兼容 && pc适配
  ],
  transformers: [
    transformerVariantGroup(), // text-(16 red)
  ],
})
