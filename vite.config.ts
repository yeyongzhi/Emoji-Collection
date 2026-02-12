import path from 'node:path'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  server: {
    port: 3000,
  },
  base: process.env.NODE_ENV === "production" ? "/emoji-collection/" : "./",
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
