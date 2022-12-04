import { createRouter, createWebHistory } from "vue-router";

// const Index = () => import('../Index.vue')
const Login = () => import('../admin/auth/Login.vue')
const Dashboard = () => import('../admin/Dashboard.vue')
// tag
const TagIndex = () => import('../admin/tag/Index.vue')
const TagCreateEdit = () => import('../admin/tag/CreateEdit.vue')
// category
const CategoryIndex = () => import('../admin/category/Index.vue')
const CategoryCreateEdit = () => import('../admin/category/CreateEdit.vue')
// user
const UserIndex = () => import('../admin/user/Index.vue')
const UserCreateEdit = () => import('../admin/user/CreateEdit.vue')

const routes = [
    // {
    //   path: '/',
    //   name: 'index',
    //   component: Index
    // },
    {
      path: '/admin/login',
      name: 'login',
      component: Login
    },
    {
      path: '/admin/dashboard',
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
    // user
    {
      path: '/admin/users',
      name: 'userIndex',
      component: UserIndex
    },
    {
      path: '/admin/users/create',
      name: 'userCreate',
      component: UserCreateEdit
    },
    {
      path: '/admin/users/:id',
      name: 'userEdit',
      component: UserCreateEdit,
      props: true,
    },
    
  ];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router

