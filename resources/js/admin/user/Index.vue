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
                <router-link :to="{name: 'userCreate'}" class="btn btn-primary bg-primary text-white">
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
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody v-if="users.length" class="table-border-bottom-0">
                <tr v-for="(user, i) in users" :key="i">
                    <td>{{ user.id }}</td>
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.role }}</td>                    
                    <td>
                        <div class="dropdown">
                        <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                            <i class="bx bx-dots-vertical-rounded"></i>
                        </button>
                        <div class="dropdown-menu">
                            <router-link to="" class="dropdown-item">
                                <i class="bx bx-edit-alt me-1"></i> Edit
                            </router-link>
                            <a class="dropdown-item" href="javascript:void(0);"><i class="bx bx-trash me-1"></i> Delete</a>
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
import { onMounted, onUnmounted } from "vue";
import { useUserStore } from "../../stores/UserStore";
import { storeToRefs } from "pinia";

    const userStore = useUserStore()
    const { loading, users } = storeToRefs(userStore)

    onMounted( () => {
        userStore.fetchUsers()
    })
    onUnmounted(() => {
        loading.value = false
    })
</script>

<style>

</style>