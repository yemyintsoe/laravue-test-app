import './bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
// admin panel assets 
import('../admin-assets/assets/vendor/fonts/boxicons.css')
import('../admin-assets/assets/vendor/css/core.css')
import('../admin-assets/assets/vendor/css/theme-default.css')
import('../admin-assets/assets/css/demo.css')
import('../admin-assets/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css')
import('../admin-assets/assets/vendor/libs/apex-charts/apex-charts.css')
import('../admin-assets/assets/vendor/js/helpers.js')
import('../admin-assets/assets/js/config.js')

import { createApp } from 'vue';
import App from './App.vue'
import router from './router/index'

createApp(App)
.use(router)
.mount("#app")

// import 'bootstrap/dist/js/bootstrap.bundle.min.js'
// admin panel assets 
import('../admin-assets/assets/vendor/libs/jquery/jquery.js')
import('../admin-assets/assets/vendor/libs/popper/popper.js')
import('../admin-assets/assets/vendor/js/bootstrap.js')
import('../admin-assets/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js')
import('../admin-assets/assets/vendor/js/menu.js')
import('../admin-assets/assets/vendor/libs/apex-charts/apexcharts.js')
import('../admin-assets/assets/js/main.js')
import('../admin-assets/assets/js/dashboards-analytics.js')
import('https://buttons.github.io/buttons.js')