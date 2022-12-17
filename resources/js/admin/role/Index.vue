<template>
    <div class="container-xxl flex-grow-1 container-p-y">
    <!-- Basic Bootstrap Table -->
    <div class="card">
        <div class="card-header">
            <div class="d-flex justify-content-between">
                <h5 class="card-title">Roles</h5>
            </div>
        </div>
        <div class="table-responsive text-nowrap">
            <table class="table">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody v-if="roles.length" class="table-border-bottom-0">
                <tr v-for="(role, i) in roles" :key="i">
                    <td>{{ role.id }}</td>
                    <td>{{ role.role }}</td>
                    <td>
                        <div class="dropdown">
                        <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                            <i class="bx bx-dots-vertical-rounded"></i>
                        </button>
                        <div class="dropdown-menu">
                            <router-link :to="{name: 'permissionAssign', params: {roleId: role.id}}" class="dropdown-item">
                                <i class="bx bx-edit-alt me-1"></i> Assign Permissions
                            </router-link>
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
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { useRoleStore } from "../../stores/RoleStore";
import { useAppStore } from "../../stores/AppStore";

    const roleStore = useRoleStore()
    const { roles } = storeToRefs(roleStore)

    const appStore = useAppStore()
    const { writePermission } = storeToRefs(appStore)

    onMounted( () => {
        roleStore.fetchRoles()
    })
</script>

<style>

</style>