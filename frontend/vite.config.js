    import { defineConfig } from 'vite'
    import react from '@vitejs/plugin-react'

    export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
        host: true,
        // Hapus proxy di production, karena kita akan menggunakan environment variable
        proxy: process.env.NODE_ENV === 'development' ? {
        '/api': {
            target: 'http://localhost:5000',
            changeOrigin: true
        }
        } : undefined
    },
    build: {
        outDir: 'dist',
        sourcemap: false, // Disable sourcemap di production untuk security
        minify: 'terser', // Minify code untuk performance
        terserOptions: {
        compress: {
            drop_console: true, // Hapus console.log di production
        }
        }
    },
    preview: {
        port: 3000,
        host: true
    }
    })