import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    css: {
        postcss: './postcss.config.js', // Esto conecta PostCSS (incluyendo Tailwind CSS)
    },
    server: {
        host: '0.0.0.0',
        port: 5173,
        strictPort: true,
        watch: {
            usePolling: true,
        },
        proxy: {
            '/api': {
                target: 'https://two024-11-tpi.onrender.com', // Backend URL para desarrollo
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''), // Opcional
            },
        },
    },
    resolve: {
        alias: {
            '@': '/src', // Alias para rutas absolutas
        },
    },
    build: {
        outDir: 'build', // Cambiado de 'build' a 'build'
        sourcemap: true,
    },
});