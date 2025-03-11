import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import Components from "unplugin-vue-components/vite"
import RadixVueResolver from "radix-vue/resolver"

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), Components({
    dts : true,
    resolvers : [
      RadixVueResolver()
    ]
  }), tailwindcss()],
})
