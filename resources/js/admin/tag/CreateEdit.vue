<template>
    <!-- Content -->
    <div class="container-xxl flex-grow-1 container-p-y">
        <!-- Basic Layout -->
        <div class="row">
        <div class="col-xl">
            <div class="card mb-4">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h5 class="mb-0">Tag Creation Form</h5>
                <div class="text-muted float-end">
                    <router-link to="/admin/tags" class="btn btn-danger"> Back </router-link>
                </div>
            </div>
            <div class="card-body">
                <form @submit.prevent="addTag">
                <div class="mb-3">
                    <label class="form-label" for="newName">Name</label>
                    <div class="input-group">
                    <input type="text" v-model="formData.name" class="form-control" id="newName" />
                    </div>
                </div>
                <button class="btn btn-danger">Send</button>
                </form>
            </div>
            </div>
        </div>
        </div>
    </div>
    <!-- / Content -->
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
    const router = useRouter()
    const formData = reactive({
        name: ''
    });
    async function addTag() {
        try {
            const addTag = await axios.post('/api/tags', formData )
            if(addTag.status === 201) {
                formData.name = ''
                router.push('/admin/tags')
            }
        } catch (error) {
            console.log(error)
        }
    }
</script>

<style>

</style>