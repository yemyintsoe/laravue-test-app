<template>
    <!-- Content -->
    <div class="container-xxl flex-grow-1 container-p-y">
        <!-- Basic Layout -->
        <div class="row">
        <div class="col-xl">
            <div class="card mb-4">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h5 class="mb-0">
                    <span>Blog Creation Form</span>
                </h5>
                <div class="text-muted float-end">
                    <router-link :to="{name: 'blogIndex'}" class="btn btn-secondary bg-secondary text-white"> Back </router-link>
                </div>
            </div>
            <div class="card-body">
                <form @submit.prevent="blogStore.storeBlog">
                <div class="mb-3">
                    <label class="form-label" for="title">Title</label>
                    <div class="input-group">
                    <input type="text" v-model="formInputs.title" class="form-control" id="title" />
                    </div>
                </div>
                <div class="mb-3">
                    <label class="form-label" for="post">Post</label>
                    <div class="input-group">
                        <textarea v-model="formInputs.post" id="" rows="10" class="form-control"></textarea>
                    </div>
                </div>
                <div class="mb-3">
                    <label class="form-label" for="post_excerpt">post_excerpt</label>
                    <div class="input-group">
                    <input type="text" v-model="formInputs.post_excerpt" class="form-control" id="post_excerpt" />
                    </div>
                </div>
                <div class="mb-3">
                    <label class="form-label" for="meta_description">meta_description</label>
                    <div class="input-group">
                        <textarea v-model="formInputs.meta_description" id="" rows="3" class="form-control"></textarea>
                    </div>
                </div>
                <div class="mb-3">
                    <label class="form-label" for="image">Image</label>
                    <div class="input-group">
                        <input type="file" @change="blogStore.getImageFile" class="form-control" id="image" />
                    </div>
                    <div class="my-2">
                        <img :src="imagePreview" alt="" style="width: 100px; height: 100px; object-fit: cover;" v-if="isImagePreviewAble" class="border border-2 border-primary rounded">
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
import { defineProps, onMounted, onUnmounted } from "vue";

import { useBlogStore } from "../../stores/BlogStore";
import { storeToRefs } from "pinia";
    
    const props = defineProps({
        
    })
    // functions registration
    const blogStore = useBlogStore()
    const { imagePreview, isImagePreviewAble, formInputs } = storeToRefs(blogStore)
    
    onMounted( () => {
    })
    onUnmounted(() => {
        blogStore.resetForm()
    })
</script>

<style>

</style>