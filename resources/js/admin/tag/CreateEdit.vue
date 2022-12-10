<template>
    <!-- Content -->
    <div class="container-xxl flex-grow-1 container-p-y">
        <!-- Basic Layout -->
        <div class="row">
        <div class="col-xl">
            <div class="card mb-4">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h5 class="mb-0">
                    <span v-if="props.id">Tag Edit Form</span>
                    <span v-else>Tag Creation Form</span>
                </h5>
                <div class="text-muted float-end">
                    <router-link to="/admin/tags" class="btn btn-secondary bg-secondary text-white"> Back </router-link>
                </div>
            </div>
            <div class="card-body">
                <form @submit.prevent="tagStore.formSubmitAction">
                <div class="mb-3">
                    <label class="form-label" for="newName">Name</label>
                    <div class="input-group">
                    <input type="text" v-model="formInputs.name" class="form-control" id="newName" />
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
import { storeToRefs } from "pinia";
import { useTagStore } from "../../stores/TagStore";

    const tagStore = useTagStore()
    const { tags, formInputs, tagEditId } = storeToRefs(tagStore)

    const props = defineProps({
        id: {
            type: String,
            required: true
        }
    })
    
    onMounted( () => {
        if(props.id) {
            tagStore.fetchTag(props.id)
        } else {
            tagStore.resetForm()
        }
    })
    onUnmounted(() => {
        tagEditId.value = ''
    })
</script>

<style>

</style>