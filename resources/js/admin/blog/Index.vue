<template>
    <div class="container-xxl flex-grow-1 container-p-y">
    <!-- Basic Bootstrap Table -->
    <div class="card">
        <div class="card-header">
            <div class="d-flex justify-content-between">
                <h5 class="card-title">Blogs</h5>
                <router-link to="/admin/blogs/create" class="btn btn-primary bg-primary text-white">
                    Add New
                </router-link>
            </div>
        </div>
        <div class="table-responsive">
            <table class="table">
            <thead>
                <tr>
                    <th>No</th>
                    <th>image</th>
                    <th>Title</th>
                    <th>Post</th>
                    <th>user</th>
                    <th>view</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody class="table-border-bottom-0" v-if="blogs.length">
                <tr v-for="(blog, i) in blogs" :key="i">
                    <td>{{ blog.id }}</td>
                    <td>
                        <img :src="`/storage/blog-images/${blog.image}`" alt="" style="width: 100px; height: 100px; object-fit: cover" class="rounded">
                    </td>
                    <td>{{ blog.title }}</td>
                    <td style="max-width: 400px;">{{ blog.post }}</td>
                    <td>{{ blog.user.name }}</td>
                    <td>{{ blog.view }}</td>
                    <td>
                        <div class="dropdown">
                        <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                            <i class="bx bx-dots-vertical-rounded"></i>
                        </button>
                        <div class="dropdown-menu">
                            <router-link to="" class="dropdown-item">
                                <i class="bx bx-edit-alt me-1"></i> Edit
                            </router-link>
                            <a class="dropdown-item" href="javascript:void(0);" @click="blogStore.destroyBlog(blog.id)"><i class="bx bx-trash me-1"></i> Delete</a>
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
import { useBlogStore } from "../../stores/BlogStore";

    const blogStore = useBlogStore()
    const { blogs } = storeToRefs(blogStore)

    onMounted( () => {
        blogStore.fetchBlogs()
    })
</script>

<style>

</style>