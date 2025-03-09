import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindscss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindscss()
  ],
  server : {
    proxy : {
      '/api' : {
        target : "http://localhost:9000",
        changeOrigin : true,
        secure : false
      }
    }
  }
})
