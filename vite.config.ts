import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

import UnoCSS from 'unocss/vite'

import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')

  return {
    base: './', //打包路径
    plugins: [vue(), UnoCSS(), vueDevTools()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          // 可在此处配置全局 SCSS 变量
          additionalData: `@import "@/styles/variables.scss";`,
        },
      },
    },
    build: {
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
    server: {
      port: 8080, //启动端口
      host: '127.0.0.1', // 监听地址
      hmr: {
        host: '127.0.0.1',
        port: 8080,
      },
      open: false, // 完成后自动打开
      // https: true, // 设置 https
      // 设置 https 代理
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL,
          changeOrigin: true,
          ws: true,
          secure: false, // https 需要设置 true
          rewrite: (path: string) => path.replace(/^\/api/, ''),
        },
      },
    },
  }
})
