import './bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/app.css'
// admin panel assets 
import('../admin-assets/assets/vendor/fonts/boxicons.css')
import('../admin-assets/assets/vendor/css/core.css')
import('../admin-assets/assets/vendor/css/theme-default.css')
import('../admin-assets/assets/css/demo.css')
import('../admin-assets/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css')
import('../admin-assets/assets/vendor/js/helpers.js')
import('../admin-assets/assets/js/config.js')

// toast
import  Toast  from 'vue-toastification';
import "vue-toastification/dist/index.css";
// pinia
import { createPinia } from 'pinia';
// vue
import { createApp } from 'vue';
import App from './App.vue'
import router from './router/index'

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.use(Toast)
app.mount("#app")

// createApp(App)
// .use(router)
// .use(createPinia())
// .use(Toast)
// .mount("#app")

// import 'bootstrap/dist/js/bootstrap.bundle.min.js'
// admin panel assets 
import('../admin-assets/assets/vendor/libs/jquery/jquery.js')
import('../admin-assets/assets/vendor/libs/popper/popper.js')
import('../admin-assets/assets/vendor/js/bootstrap.js')
import('../admin-assets/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js')
import('../admin-assets/assets/vendor/js/menu.js')
import('../admin-assets/assets/js/main.js')
import('https://buttons.github.io/buttons.js')