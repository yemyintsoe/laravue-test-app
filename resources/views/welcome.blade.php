<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>LaraVue</title>
        @vite('resources/css/app.css')
    </head>
    <body>
        <h6 class="text-danger text-center">Laravel App</h6>
        <div id="app"></div>
        @vite('resources/js/app.js')
    </body>
</html>
