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
// category
const BlogIndex = () => import('../admin/blog/Index.vue')
const BlogCreateEdit = () => import('../admin/blog/CreateEdit.vue')
// user
const UserIndex = () => import('../admin/user/Index.vue')
const UserCreateEdit = () => import('../admin/user/CreateEdit.vue')
// role
const RoleIndex = () => import('../admin/role/Index.vue')
const PermissionAssign = () => import('../admin/role/PermissionAssign.vue')

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
    // blog
    {
      path: '/admin/blogs',
      name: 'blogIndex',
      component: BlogIndex
    },
    {
      path: '/admin/blogs/create',
      name: 'blogCreate',
      component: BlogCreateEdit
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
    // role
    {
      path: '/admin/roles',
      name: 'roleIndex',
      component: RoleIndex
    },
    {
      path: '/admin/roles/:roleId/assign-permissions',
      name: 'permissionAssign',
      component: PermissionAssign,
      props: true
    },
    
  ];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router

