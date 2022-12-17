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

export const useBlogStore = defineStore('blogStore', () => {
    const blogs = ref([])

    // image preview
    const imagePreview = ref('')
    const isImagePreviewAble = ref(false)
 

    const formInputs = reactive({
        title: '',
        post: '',
        post_excerpt: '',
        meta_description: '',
        image: '',
    });

    // get image
    const getImageFile = (e) => {
        isImagePreviewAble.value = true
        const file = e.target.files[0];
        formInputs.image = file
        imagePreview.value = URL.createObjectURL(file);
    }
    
    const fetchBlogs = async () => {
        try {
            const res = await axios.get('/api/blogs');
            blogs.value = res.data.blogs
        } catch (err) {
            console.error(err);
        }
    }

    const storeBlog = async () => {
        if(formInputs.title.trim() == '') {
            toast.error("blog title field is required", {timeout: 2000});
            return;
        }
        if(formInputs.post.trim() == '') {
            toast.error("blog post field is required", {timeout: 2000});
            return;
        }
        if(formInputs.post_excerpt.trim() == '') {
            toast.error("blog post_excerpt field is required", {timeout: 2000});
            return;
        }
        if(formInputs.meta_description.trim() == '') {
            toast.error("blog meta_description field is required", {timeout: 2000});
            return;
        }
        if(!formInputs.image) {
            toast.error("blog image field is required", {timeout: 2000});
            return;
        }
        try {
            const formData = new FormData();
            formData.append('title', formInputs.title)
            formData.append('post', formInputs.post)
            formData.append('post_excerpt', formInputs.post_excerpt)
            formData.append('meta_description', formInputs.meta_description)
            formData.append('image', formInputs.image)

            await axios.post('/api/blogs', formData )
            toast.success("a blog is created successfully", {timeout: 2000});
            router.push({ name: 'blogIndex' })
        } catch (error) {
            if(error.response.status === 422) {
                toast.error(error.response.data.message, {timeout: 2000});
            }
            console.log(error)
        }
    }

    const destroyBlog = async (id) => {
        try {
            if(confirm('are you sure to delete?')) {
                await axios.delete(`/api/blogs/${id}`);
                fetchBlogs()
                toast.success('a blog is deleted successfully', {timeout: 2000})
            }
        } catch (err) {
            console.error(err);
        }
    }

    const resetForm = () => {
        formInputs.title = ''
        formInputs.post = ''
        formInputs.post_excerpt = ''
        formInputs.meta_description = ''
        formInputs.image = ''
        isImagePreviewAble.value = false
        imagePreview.value = ''
    }

    return {
        // states
        blogs,
        formInputs,
        imagePreview,
        isImagePreviewAble,
        // actions
        getImageFile,
        fetchBlogs,
        storeBlog,
        destroyBlog,
        resetForm
    }
})