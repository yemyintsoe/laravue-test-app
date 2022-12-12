<template>
    <div class="container-xxl flex-grow-1 container-p-y">
    <!-- Basic Bootstrap Table -->
    <div class="card">
        <div class="card-header">
            <div class="d-flex justify-content-between">
                <h5 class="card-title">Assign Permissions</h5>
                <router-link :to="{name: 'roleIndex'}" class="btn btn-secondary">Back</router-link>
            </div>
        </div>
        <div class="card-body">
            <h5>
                Role : <span v-if="role">{{ role.role }} </span>
            </h5>
            <div class="table-responsive text-nowrap">
            <table class="table">
            <thead>
                <tr>
                    <th>Menu</th>
                    <th>Read</th>
                    <th>Write</th>
                    <th>Update</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody v-if="permissions.length" class="table-border-bottom-0">
                <tr v-for="(permission, i) in permissions" :key="i">
                    <td>{{ permission.menu }}</td>
                    <td>
                        <input type="checkbox" v-model="permission.read">
                    </td>
                    <td>
                        <input type="checkbox" v-model="permission.write">
                    </td>
                    <td>
                        <input type="checkbox" v-model="permission.update">
                    </td>
                    <td>
                        <input type="checkbox" v-model="permission.delete">
                    </td>
                </tr>
            </tbody>
           <tbody v-else>
            <tr><div class="p-3">No data found</div></tr>
           </tbody>
            </table>
            <button @click="roleStore.assignPermissions(role.id)" class="btn btn-primary bg-primary text-white mt-3">Save Changes</button>
        </div>
        </div>
    </div>
    <!--/ Basic Bootstrap Table -->
    </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { onMounted, onUnmounted } from "vue";
import { useRoleStore } from "../../stores/RoleStore";

const props = defineProps(['roleId'])

    const roleStore = useRoleStore()
    const { roles, role, permissions } = storeToRefs(roleStore)

    onMounted( () => {
        roleStore.fetchRoles()
        roleStore.fetchRole(props.roleId)
    })
    onUnmounted(() => {
    })
</script>

<style>

</style>