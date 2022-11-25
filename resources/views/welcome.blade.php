<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>LaraVue</title>
        @vite('resources/css/app.css')
        <!-- admin assets  -->
        @vite('resources/admin-assets/assets/vendor/fonts/boxicons.css')
        @vite('resources/admin-assets/assets/vendor/css/core.css')
        @vite('resources/admin-assets/assets/vendor/css/theme-default.css')
        @vite('resources/admin-assets/assets/css/demo.css')
        @vite('resources/admin-assets/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css')
        @vite('resources/admin-assets/assets/vendor/libs/apex-charts/apex-charts.css')

        @vite('resources/admin-assets/assets/vendor/js/helpers.js')
        @vite('resources/admin-assets/assets/js/config.js')
    </head>
    <body>
        <div id="app"></div>
        @vite('resources/js/app.js')
         <!-- admin assets  -->
        @vite('resources/admin-assets/assets/vendor/libs/jquery/jquery.js')
        @vite('resources/admin-assets/assets/vendor/libs/popper/popper.js')
        @vite('resources/admin-assets/assets/vendor/js/bootstrap.js')
        @vite('resources/admin-assets/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js')
        @vite('resources/admin-assets/assets/vendor/js/menu.js')
        @vite('resources/admin-assets/assets/vendor/libs/apex-charts/apexcharts.js')
        @vite('resources/admin-assets/assets/js/main.js')
        @vite('resources/admin-assets/assets/js/dashboards-analytics.js')
         <!-- Place this tag in your head or just before your close body tag. -->
        <script async defer src="https://buttons.github.io/buttons.js"></script>
    </body>
</html>
