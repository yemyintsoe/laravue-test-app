<template>
    <!-- Content -->
    <div class="container-xxl flex-grow-1 container-p-y">
        <!-- Basic Layout -->
        <div class="row">
        <div class="col-xl">
            <div class="card mb-4">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h5 class="mb-0">
                    <span v-if="props.id">User Edit Form</span>
                    <span v-else>User Creation Form</span>
                </h5>
                <div class="text-muted float-end">
                    <router-link :to="{name: 'userIndex'}" class="btn btn-secondary bg-secondary text-white"> Back </router-link>
                </div>
            </div>
            <div class="card-body">
                <form @submit.prevent="userStore.storeUser">
                <div class="mb-3">
                    <label class="form-label" for="name">Name</label>
                    <div class="input-group">
                    <input type="text" v-model="formInputs.name" class="form-control" id="name" />
                    </div>
                </div>
                <div class="mb-3">
                    <label class="form-label" for="email">Email</label>
                    <div class="input-group">
                    <input type="text" v-model="formInputs.email" class="form-control" id="email" />
                    </div>
                </div>
                <div class="mb-3">
                    <label class="form-label" for="password">Password</label>
                    <div class="input-group">
                    <input type="text" v-model="formInputs.password" class="form-control" id="password" />
                    </div>
                </div>
                <div class="mb-3">
                    <label class="form-label" for="role">Role</label>
                    <div class="input-group">
                    <select id="role" v-model="formInputs.role_id" class="form-control">
                        <option value="">Select Role</option>
                        <option :value="role.id" v-for="(role, i) in roles" :key="i">
                        {{ role.role }}
                        </option>
                    </select>
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
import { onMounted } from "vue";

import { useUserStore } from "../../stores/UserStore";
import { storeToRefs } from "pinia";
    
    const props = defineProps({
        id: {
            type: String,
            required: true
        }
    })
    // functions registration
    const userStore = useUserStore()
    const { roles, formInputs } = storeToRefs(userStore)
    
    onMounted( () => {
        userStore.fetchRoles()
        // if(props.id) {
        //     userStore.editUser(props.id)
        // } else {
        //     userStore.resetForm()
        // }
        userStore.resetForm()
    })
</script>

<style>

</style>