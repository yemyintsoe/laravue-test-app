<template>
    <!-- Content -->
    <div class="container-xxl flex-grow-1 container-p-y">
        <!-- Basic Layout -->
        <div class="row">
        <div class="col-xl">
            <div class="card mb-4">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h5 class="mb-0">
                    <span v-if="props.id">Tag Edit Form</span>
                    <span v-else>Tag Creation Form</span>
                </h5>
                <div class="text-muted float-end">
                    <router-link to="/admin/tags" class="btn btn-danger"> Back </router-link>
                </div>
            </div>
            <div class="card-body">
                <form @submit.prevent="formSubmitAction">
                <div class="mb-3">
                    <label class="form-label" for="newName">Name</label>
                    <div class="input-group">
                    <input type="text" v-model="formData.name" class="form-control" id="newName" />
                    </div>
                </div>
                <button class="btn btn-danger">Submit</button>
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
    import { reactive, ref, defineProps, onMounted } from "vue";
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
    const formSubmitAction = props.id ? updateTag : addTag
    const formData = reactive({
        name: ""
    });

    // tag create
    async function addTag() {
        if(formData.name.trim() == '') {
            toast.error("a tag name field is required", {timeout: 2000});
            return;
        }
        try {
            await axios.post('/api/tags', formData )
            toast.success("a tag is created successfully", {timeout: 2000});
            router.push('/admin/tags')
        } catch (error) {
            if(error.response.status === 422) {
                toast.error(error.response.data.message, {timeout: 2000});
            }
            console.log(error)
        }
    }

    // tag edit
    onMounted( async () => {
        if(props.id) {
            const res = await axios.get(`/api/tags/${parseInt(props.id)}`)
            formData.name = res.data.name
        }
    })
    
    // tag update
    async function updateTag() {
        try {
            await axios.put('/api/tags/'+props.id, formData )
            router.push('/admin/tags')
            toast.success("a tag is updated successfully", {timeout: 2000});
        } catch (error) {
            console.log(error)
        }
    }
</script>

<style>

</style>