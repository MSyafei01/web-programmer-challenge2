    import { defineConfig } from 'vite'
    import react from '@vitejs/plugin-react'

    export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
        host: true,
        proxy: process.env.NODE_ENV === 'development' ? {
        '/api': {
            target: 'http://localhost:5000',
            changeOrigin: true
        }
        } : undefined
    },
    build: {
        outDir: 'dist',
        sourcemap: false,
        minify: 'terser',
        terserOptions: {
        compress: {
            drop_console: true,
        }
        }
    },
    preview: {
        port: 3000,
        host: true
    },
    // Tambahan untuk Vercel SPA routing
    define: {
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }
    })