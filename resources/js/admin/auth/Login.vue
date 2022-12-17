<template>
    <!-- Login -->
    <div class="container">
        <div class="authentication-wrapper authentication-basic container-p-y">
        <div class="authentication-inner">
            <!-- Register -->
            <div class="card mx-auto" style="max-width: 500px">
            <div class="card-body">
                <!-- Logo -->
                <div class="app-brand justify-content-center my-5">
                <span class="app-brand-text demo text-body fw-bolder">Laravue Login</span>
                </div>
                <!-- /Logo -->
                <form @submit.prevent="appStore.singIn" class="mb-3">
                    <div class="mb-3">
                        <label for="email" class="form-label">Email</label>
                        <div class="input-group">
                        <input type="text" v-model="formInputs.email" class="form-control" id="email" autofocus />
                        </div>
                    </div>
                    <div class="mb-3 form-password-toggle">
                        <div class="d-flex justify-content-between">
                        <label class="form-label" for="password">Password</label>
                        </div>
                        <div class="input-group input-group-merge">
                        <input type="password" v-model="formInputs.password" id="password" class="form-control"/>
                        <span class="input-group-text cursor-pointer"><i class="bx bx-hide"></i></span>
                        </div>
                    </div>
                    <div class="mb-3">
                        <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="remember-me" />
                        <label class="form-check-label" for="remember-me"> Remember Me </label>
                        </div>
                    </div>
                    <div class="mb-3">
                        <button class="btn btn-primary bg-primary text-white d-grid w-100" type="submit">Sign in</button>
                    </div>
                </form>

                <p class="text-center">
                <span>New on our platform?</span>
                <a href="auth-register-basic.html">
                    <span> Create an account</span>
                </a>
                </p>
            </div>
            </div>
            <!-- /Register -->
        </div>
        </div>
    </div>
    <!-- / Login End -->
</template>
<script setup>
import { storeToRefs } from 'pinia';
import { useAppStore } from '../../stores/AppStore';

const appStore = useAppStore()

const { formInputs } = storeToRefs(appStore)
</script>