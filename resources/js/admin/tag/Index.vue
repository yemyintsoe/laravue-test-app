<template>
    <div class="container-xxl flex-grow-1 container-p-y">
    <!-- Basic Bootstrap Table -->
    <div class="card">
        <div class="card-header">
            <div class="d-flex justify-content-between">
                <h5 class="card-title">Tags</h5>
                <router-link to="/admin/tags/create" class="btn btn-danger">
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
            <tbody class="table-border-bottom-0">
                <tr v-for="(tag, i) in tags" :key="i">
                    <td>{{ tag.id }}</td>
                    <td>{{ tag.name }}</td>
                    <td>
                        <div class="dropdown">
                        <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                            <i class="bx bx-dots-vertical-rounded"></i>
                        </button>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" href="javascript:void(0);"><i class="bx bx-edit-alt me-1"></i> Edit</a>
                            <a class="dropdown-item" href="javascript:void(0);" @click="deleteTag(tag.id)"><i class="bx bx-trash me-1"></i> Delete</a>
                        </div>
                        </div>
                    </td>
                </tr>
            </tbody>
            </table>
        </div>
    </div>
    <!--/ Basic Bootstrap Table -->
    </div>
</template>

<script setup>
    import { onMounted, onUpdated, ref } from "vue";
    import { useRouter } from "vue-router";

    const router = useRouter()

    const tags = ref([])

    const onMountedThisComponent = onMounted( async () => {
        try {
            const res = await axios.get('/api/tags');
            tags.value = res.data.tags
        } catch (err) {
            console.error(err);
        }
    })

    async function deleteTag(id) {
        try {
            const res = await axios.delete(`/api/tags/${id}`);
            if(res.status === 200) {
                onMountedThisComponent()
            }
        } catch (err) {
            console.error(err);
        }
    }
</script>

<style>

</style>