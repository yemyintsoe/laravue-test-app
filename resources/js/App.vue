<template>
    <div class="container">
        <h4>Vue App</h4>
        <div>
            <router-link to="/" class="mx-2">Home</router-link>
            <router-link to="/about" class="mx-2">About</router-link>
            <router-link to="/contact" class="mx-2">Contact</router-link>
        </div>
        <div>
            <router-view></router-view>
        </div>
    </div>  
</template>
<style>
</style>