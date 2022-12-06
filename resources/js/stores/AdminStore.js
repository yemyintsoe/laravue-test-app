import { createPinia, defineStore } from "pinia";
import { reactive, ref } from "vue";
import { useToast } from "vue-toastification";
import { markRaw } from "vue";
import router from "../router";

const pinia = createPinia()
pinia.use(({store}) => {
    store.router = markRaw(router)
})
const toast = useToast();

export const useAdminStore = defineStore('adminStore', () => {

    return {}
})