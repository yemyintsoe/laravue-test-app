<template>
    <div class="container-xxl flex-grow-1 container-p-y">
    <!-- Basic Bootstrap Table -->
    <div class="card">
        <div class="card-header">
            <div class="d-flex justify-content-between">
                <h5 class="card-title">Tags</h5>
                <router-link to="/admin/tags/create" v-if="writePermission" class="btn btn-primary bg-primary text-white">
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
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody v-if="tags.length" class="table-border-bottom-0">
                <tr v-for="(tag, i) in tags" :key="i">
                    <td>{{ tag.id }}</td>
                    <td>{{ tag.name }}</td>
                    <td>
                        <div class="dropdown">
                        <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                            <i class="bx bx-dots-vertical-rounded"></i>
                        </button>
                        <div class="dropdown-menu">
                            <router-link :to="{name: 'tagEdit', params: {id: tag.id}}" class="dropdown-item">
                                <i class="bx bx-edit-alt me-1"></i> Edit
                            </router-link>
                            <a class="dropdown-item" href="javascript:void(0);" @click="tagStore.deleteTag(tag.id)"><i class="bx bx-trash me-1"></i> Delete</a>
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
import { useTagStore } from "../../stores/TagStore";
import { useAppStore } from "../../stores/AppStore";

    const tagStore = useTagStore()
    const { tags } = storeToRefs(tagStore)

    const appStore = useAppStore()
    const { writePermission } = storeToRefs(appStore)

    onMounted( () => {
        tagStore.fetchTags()
    })
</script>

<style>

</style>