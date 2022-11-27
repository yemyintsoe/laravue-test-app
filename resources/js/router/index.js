import { createRouter, createWebHistory } from "vue-router";

const Home = () => import('../components/Home.vue')
const About = () => import('../components/About.vue')
const Contact = () => import('../components/Contact.vue')
// admin 
const Dashboard = () => import('../admin/Dashboard.vue')
// tag
const TagIndex = () => import('../admin/tag/Index.vue')
const TagCreateEdit = () => import('../admin/tag/CreateEdit.vue')
// category
const CategoryIndex = () => import('../admin/category/Index.vue')
const CategoryCreateEdit = () => import('../admin/category/CreateEdit.vue')

const routes = [
    { 
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact
    },
    {
      path: '/admin',
      name: 'dashboard',
      component: Dashboard
    },
    // tag
    {
      path: '/admin/tags',
      name: 'tagIndex',
      component: TagIndex
    },
    {
      path: '/admin/tags/create',
      name: 'tagCreate',
      component: TagCreateEdit
    },
    {
      path: '/admin/tags/:id',
      name: 'tagEdit',
      component: TagCreateEdit,
      props: true,
    },
    // category
    {
      path: '/admin/categories',
      name: 'categoryIndex',
      component: CategoryIndex
    },
    {
      path: '/admin/categories/create',
      name: 'categoryCreate',
      component: CategoryCreateEdit
    },
    {
      path: '/admin/categories/:id',
      name: 'categoryEdit',
      component: CategoryCreateEdit,
      props: true,
    },
  ];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router

