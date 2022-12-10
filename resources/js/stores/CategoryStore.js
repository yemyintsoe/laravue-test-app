import { createPinia, defineStore, PiniaVuePlugin } from "pinia";
import { reactive, ref } from "vue";
import { useToast } from "vue-toastification";
import { markRaw } from "vue";
import router from "../router";
const pinia = createPinia()

pinia.use(({store}) => {
    store.router= markRaw(router)
})

const toast = useToast()

export const useCategoryStore = defineStore('categoryStore', () => {
    const loading = ref(true)
    const categories = ref([])

    // image preview
    const imagePreview = ref('')
    const isImagePreviewAble = ref(false)

    // form inputs
    const formInputs = reactive({
        name: "",
        image: ""
    });
    // edit id
    const categoryEditId = ref('')

    // index
    const fetchCategories = async () => {
        try {
            const res = await axios.get('/api/categories');
            categories.value = res.data.categories
            loading.value = false
        } catch (err) {
            console.error(err)
        }
    }
    // get image
    const getImageFile = (e) => {
        isImagePreviewAble.value = true
        const file = e.target.files[0];
        formInputs.image = file
        imagePreview.value = URL.createObjectURL(file);
    }
    // store
    const storeCategory = async () => {
        if(formInputs.name.trim() == '')
            toast.error("a category name field is required", {timeout: 2000});
        if(!formInputs.image)
           return toast.error("a category image field is required", {timeout: 2000});
        try {
            const formData = new FormData()
            formData.append('name', formInputs.name)
            formData.append('image', formInputs.image)
            await axios.post('/api/categories', formData)
            toast.success("a category is created successfully", {timeout: 2000});
            router.push({name: 'categoryIndex'})
        } catch (error) {
            toast.error(error.response.data.message, {timeout: 2000});
            console.log(error)
        }
    }
    // show
    const fetchCategory = async (id) => {
       if(id) {
            const res = await axios.get(`/api/categories/${parseInt(id)}`)
            formInputs.name = res.data.name
            isImagePreviewAble.value = true
            imagePreview.value = `/storage/images/${res.data.image}`
            categoryEditId.value = res.data.id
       }
    }

    // update
    const updateCategory = async () => {
        try {
            const formData = new FormData()
            formData.append('name', formInputs.name)
            formData.append('image', formInputs.image)
            formData.append('_method', 'patch');
            await axios.post('/api/categories/' + categoryEditId.value, formData)
            router.push({name: 'categoryIndex'})
            toast.success("a category is updated successfully", {timeout: 2000});
        } catch (error) {
            console.log(error)
        }
    }

    // destroy
    const deleteCategory = async (id) => {
        try {
            if(confirm('are you sure to delete?')) {
                await axios.delete(`/api/categories/${id}`);
                fetchCategories()
                toast.success('a category is deleted successfully', {timeout: 2000})
            }
        } catch (err) {
            console.error(err)
        }
    }
    // reset the form
    const resetForm = () => {
        formInputs.name = ''
        formInputs.image = ''
        isImagePreviewAble.value = false
        imagePreview.value = ''
    }
    const formSubmitAction = () => {
        categoryEditId.value == '' ? storeCategory() : updateCategory()
    }

    return {
        // states
        loading,
        categories,
        imagePreview,
        isImagePreviewAble,
        formInputs,
        categoryEditId,
        // actions
        fetchCategories,
        getImageFile,
        storeCategory,
        fetchCategory,
        updateCategory,
        deleteCategory,
        resetForm,
        formSubmitAction,
    }
})