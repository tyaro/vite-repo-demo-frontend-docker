import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  server:{
    port:3000,
    host:true,
  },
  build: {
    // root (= ./src) から見た相対パスで指定
    emptyOutDir: true,
    rollupOptions:{
      manualChunks: {
        vendor: ['react', 'react-router-dom','react-dom'],
        material:['@mui/material'],
        datagrid:['@mui/x-data-grid'],
        icons:['@mui/icons-material'],
      }
    }}
  
})
