import axios from "axios";
import { createPinia, defineStore } from "pinia";
import { ref } from "vue";
import { useToast } from "vue-toastification";
import router from "../router";

const toast = useToast();
const pinia = createPinia()

pinia.use(({store}) => {
    store.router = markRaw(router)
})


export const useRoleStore = defineStore('roleStore', () => {
    // states 
    const roles = ref([])
    const role = ref(null)
    const permissions = ref([])
    
    // actions 
    const defaultPermissions = () => {
        return [
            {
                menu: 'Dashboard',
                read: false,
                write: false,
                update: false,
                delete: false,
                name: 'dashboard'
            },
            {
                menu: 'Tag',
                read: false,
                write: false,
                update: false,
                delete: false,
                name: 'tags'
            },
            {
                menu: 'Category',
                read: false,
                write: false,
                update: false,
                delete: false,
                name: 'categories'
            },
            {
                menu: 'User',
                read: false,
                write: false,
                update: false,
                delete: false,
                name: 'users'
            },
            {
                menu: 'Role',
                read: false,
                write: false,
                update: false,
                delete: false,
                name: 'roles'
            },
        ]
    }
    const fetchRoles = async () => {
     try {
        const res = await axios.get('/api/roles')
        roles.value = res.data.roles
        // console.log(router.currentRoute.value.path)
     } catch (error) {
        console.log(error)
     }
    }
    const fetchRole = async (roleId) => {
     try {
        const res = await axios.get(`/api/roles/${parseInt(roleId)}`)
        role.value = res.data.role
        if(role.value.permissions == null) {
            permissions.value = defaultPermissions()
        }else{
            permissions.value = JSON.parse(role.value.permissions)
        }
     } catch (error) {
        console.log(error)
     }
    }

    const assignPermissions = async (roleId) => {
        try {
            const res = await axios.put(`/api/roles/${roleId}`, {
                permissions: JSON.stringify(permissions.value)
            })
            if(res.status === 200) {
                toast.success("permissions are assigned successfully", {timeout: 2000});
            }
        } catch (error) {
            console.log(error)
        }
    }

    return {
        // states
        roles,
        role,
        permissions,
        // actions
        defaultPermissions,
        fetchRoles,
        fetchRole,
        assignPermissions
    }
})