import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [
        vue(),
        laravel({
            input: [
                'resources/css/app.css',
                'resources/js/app.js',

                'resources/admin-assets/assets/vendor/fonts/boxicons.css',
                'resources/admin-assets/assets/vendor/css/core.css',
                'resources/admin-assets/assets/vendor/css/theme-default.css',
                'resources/admin-assets/assets/css/demo.css',
                'resources/admin-assets/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css',
                'resources/admin-assets/assets/vendor/libs/apex-charts/apex-charts.css',

                'resources/admin-assets/assets/vendor/js/helpers.js',
                'resources/admin-assets/assets/js/config.js',

                'resources/admin-assets/assets/vendor/libs/jquery/jquery.js',
                'resources/admin-assets/assets/vendor/libs/popper/popper.js',
                'resources/admin-assets/assets/vendor/js/bootstrap.js',
                'resources/admin-assets/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js',
                'resources/admin-assets/assets/vendor/js/menu.js',
                'resources/admin-assets/assets/vendor/libs/apex-charts/apexcharts.js',
                'resources/admin-assets/assets/js/main.js',
                'resources/admin-assets/assets/js/dashboards-analytics.js',
            ],
            refresh: true
        }),
    ],
});
