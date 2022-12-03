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

export const useTagStore = defineStore('tagStore', () => {
    const tags = ref([])

    const formInputs = reactive({
        name: ""
    });

    const editTagId = ref('')
    
    const getTags = async () => {
        try {
            const res = await axios.get('/api/tags');
            tags.value = res.data.tags
        } catch (err) {
            console.error(err);
        }
    }

    const storeTag = async () => {
        if(formInputs.name.trim() == '') {
            toast.error("a tag name field is required", {timeout: 2000});
            return;
        }
        try {
            const formData = new FormData();
            formData.append('name', formInputs.name)
            await axios.post('/api/tags', formData )
            toast.success("a tag is created successfully", {timeout: 2000});
            router.push({ name: 'tagIndex' })
        } catch (error) {
            if(error.response.status === 422) {
                toast.error(error.response.data.message, {timeout: 2000});
            }
            console.log(error)
        }
    }

    const getTag = async (id) => {
        if(id) {
            const res = await axios.get(`/api/tags/${parseInt(id)}`)
            formInputs.name = res.data.name
            editTagId.value = res.data.id
        }
    }

    const updateTag = async () => {
        try {
            const formData = new FormData();
            formData.append('name', formInputs.name)
            formData.append('_method', 'patch')
            await axios.post('/api/tags/'+ editTagId.value, formData )
            router.push({name: 'tagIndex'})
            toast.success("a tag is updated successfully", {timeout: 2000});
        } catch (error) {
            console.log(error)
        }
    }

    const deleteTag = async (id) => {
        try {
            await axios.delete(`/api/tags/${id}`);
            getTags()
            toast.success('a tag is deleted successfully', {timeout: 2000})
        } catch (err) {
            console.error(err);
        }
    }

    const resetForm = () => {
        formInputs.name = ''
    }
    const formSubmitAction = editTagId.id == '' ? storeTag : updateTag

    return {
        // states
        tags,
        formInputs,
        // actions
        getTags,
        storeTag,
        getTag,
        updateTag,
        deleteTag,
        resetForm,
        formSubmitAction,
    }
})