<template>
    <!-- Content -->
    <div class="container-xxl flex-grow-1 container-p-y">
        <!-- Basic Layout -->
        <div class="row">
        <div class="col-xl">
            <div class="card mb-4">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h5 class="mb-0">
                    <span v-if="props.id">Category Edit Form</span>
                    <span v-else>Category Creation Form</span>
                </h5>
                <div class="text-muted float-end">
                    <router-link :to="{name: 'categoryIndex'}" class="btn btn-secondary bg-secondary text-white"> Back </router-link>
                </div>
            </div>
            <div class="card-body">
                <form @submit.prevent="formSubmitAction">
                <div class="mb-3">
                    <label class="form-label" for="name">Name</label>
                    <div class="input-group">
                    <input type="text" v-model="formInputs.name" class="form-control" id="name" />
                    </div>
                </div>
                <div class="mb-3">
                    <label class="form-label" for="image">Image</label>
                    <div class="input-group">
                        <input type="file" @change="getFile" class="form-control" id="image" />
                    </div>
                    <div class="my-2">
                        <img :src="imagePreview" alt="" style="width: 100px; height: 100px; object-fit: cover;" v-if="isImagePreviewAble" class="border border-2 border-primary rounded">
                    </div>
                </div>
                <button class="btn btn-primary bg-primary text-white">Submit</button>
                </form>
            </div>
            </div>
        </div>
        </div>
    </div>
    <!-- / Content -->
</template>

<script setup>
    // functions import
    import { reactive, defineProps, onMounted, ref } from "vue";
    import { useRouter } from "vue-router";
    import { useToast } from "vue-toastification";
    // functions registration
    const toast = useToast();
    const router = useRouter()

    const props = defineProps({
        id: {
            type: String,
            required: true
        }
    })

    const formSubmitAction = props.id ? updateCategory : addCategory
    const imagePreview = ref('')
    const isImagePreviewAble = ref(false)
    const formInputs = reactive({
        name: "",
        image: ""
    });
    const getFile = (e) => {
        isImagePreviewAble.value = true
        const file = e.target.files[0];
        formInputs.image = file
        imagePreview.value = URL.createObjectURL(file);
    }

    // tag create
    async function addCategory() {
        if(formInputs.name.trim() == '') {
            toast.error("a category name field is required", {timeout: 2000});
            return;
        }
        if(!formInputs.image) {
            toast.error("a category image field is required", {timeout: 2000});
            return;
        }
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

    // category edit
    onMounted( async () => {
        if(props.id) {
            const res = await axios.get(`/api/categories/${parseInt(props.id)}`)
            formInputs.name = res.data.name
            isImagePreviewAble.value = true
            imagePreview.value = `/storage/images/${res.data.image}`
        }
    })
    
    // category update
    async function updateCategory() {
        try {
            const formData = new FormData()
            formData.append('name', formInputs.name)
            formData.append('image', formInputs.image)
            formData.append('_method', 'patch');
            await axios.post('/api/categories/' + props.id, formData)
            router.push({name: 'categoryIndex'})
            toast.success("a category is updated successfully", {timeout: 2000});
        } catch (error) {
            console.log(error)
        }
    }
</script>

<style>

</style>