<template>
    <div class="container-xxl flex-grow-1 container-p-y">
    <!-- loader  -->
    <div v-if="loading" class="text-center">
        <div class="spinner-border spinner-border-lg text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
    <!-- loader end  -->
    <!-- Basic Bootstrap Table -->
    <div v-else class="card">
        <div class="card-header">
            <div class="d-flex justify-content-between">
                <h5 class="card-title">Categories</h5>
                <router-link :to="{name: 'categoryCreate'}" class="btn btn-primary  bg-primary text-white">
                    Add New
                </router-link>
            </div>
        </div>
        <div class="table-responsive text-nowrap">
            <table class="table">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody v-if="categories.length" class="table-border-bottom-0">
                <tr v-for="(category, i) in categories" :key="i">
                    <td>{{ category.id }}</td>
                    <td>{{ category.name }}</td>
                    <td>
                        <img :src="`/storage/images/${category.image}`" alt="" style="width: 100px; height: 100px; object-fit: cover" class="border border-2 border-primary rounded">
                    </td>
                    <td>
                        <div class="dropdown">
                        <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                            <i class="bx bx-dots-vertical-rounded"></i>
                        </button>
                        <div class="dropdown-menu">
                            <router-link :to="{name: 'categoryEdit', params: {id: category.id}}" class="dropdown-item">
                                <i class="bx bx-edit-alt me-1"></i> Edit
                            </router-link>
                            <a class="dropdown-item" href="javascript:void(0);" @click="deleteCategory(category.id)"><i class="bx bx-trash me-1"></i> Delete</a>
                        </div>
                        </div>
                    </td>
                </tr>
            </tbody>
           <tbody v-else>
            <tr><div class="p-3">No data found</div></tr>
           </tbody>
            </table>
        </div>
    </div>
    <!--/ Basic Bootstrap Table -->
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useToast } from "vue-toastification";
    const toast = useToast();

    const loading = ref(true)
    const categories = ref([])
    const mountedTheComponent = onMounted( async () => {
        try {
            const res = await axios.get('/api/categories');
            categories.value = res.data.categories
            loading.value = false
        } catch (err) {
            console.error(err);
        }
    })

    async function deleteCategory(id) {
        try {
            if(confirm('are you sure to delete?')) {
                await axios.delete(`/api/categories/${id}`);
                mountedTheComponent()
                toast.success('a category is deleted successfully', {timeout: 2000})
            }
        } catch (err) {
            console.error(err);
        }
    }
</script>

<style>

</style>