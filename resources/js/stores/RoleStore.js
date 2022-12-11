import { defineStore } from "pinia";
import { ref } from "vue";

export const useRoleStore = defineStore('roleStore', () => {
    const roles = ref([])
    const role = ref(null)
    const permissions = ref([
        {
            menu: 'Tag',
            read: true,
            write: false,
            update: false,
            delete: false
        },
        {
            menu: 'Category',
            read: false,
            write: false,
            update: false,
            delete: false
        },
        {
            menu: 'User Management',
            read: false,
            write: false,
            update: false,
            delete: false
        },
    ])

    const fetchRoles = async () => {
     try {
        const res = await axios.get('/api/roles')
        roles.value = res.data.roles
     } catch (error) {
        console.log(error)
     }
    }
    const fetchRole = async (roleId) => {
     try {
        const res = await axios.get(`/api/roles/${roleId}`)
        role.value = res.data.role
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
        fetchRoles,
        fetchRole
    }
})