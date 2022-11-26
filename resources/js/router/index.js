import { createRouter, createWebHistory } from "vue-router";

import Home from '../components/Home.vue'
import About from '../components/About.vue'
import Contact from '../components/Contact.vue'

// admin 
import Dashboard from '../admin/Dashboard.vue'
const TagIndex = () => import('../admin/tag/Index.vue')
const TagCreate = () => import('../admin/tag/CreateEdit.vue')

const routes = [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/contact', component: Contact },

    { path: '/admin', component: Dashboard },
    { path: '/admin/tags', component: TagIndex },
    { path: '/admin/tags/create', component: TagCreate },
  ];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router

