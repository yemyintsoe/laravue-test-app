import { defineStore } from "pinia";
import { onMounted, ref } from "vue";
import { useToast } from "vue-toastification";

const toast = useToast()

export const useCategoryStore = defineStore('categoryStore', () => {
    const loading = ref(true)
    const categories = ref([])

    const mountedTheComponent = onMounted(() => {
        fetchCategories()
    })
    // fetch categories
    async function fetchCategories() {
        try {
            const res = await axios.get('/api/categories');
            categories.value = res.data.categories
            loading.value = false
        } catch (err) {
            console.error(err)
        }
    }
    // delete category
    async function deleteCategory(id) {
        try {
            if(confirm('are you sure to delete?')) {
                await axios.delete(`/api/categories/${id}`);
                mountedTheComponent()
                toast.success('a category is deleted successfully', {timeout: 2000})
            }
        } catch (err) {
            console.error(err)
        }
    }


    return {
        // states
        loading,
        categories,
        // actions
        fetchCategories,
        deleteCategory
    }
})