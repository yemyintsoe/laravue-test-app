import { createPinia, defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import { useToast } from "vue-toastification";
import { markRaw } from "vue";
import router from "../router";
import axios from "axios";

const pinia = createPinia()
pinia.use(({store}) => {
    store.router = markRaw(router)
})
const toast = useToast();

export const useUserStore = defineStore('userStore', () => {
    // states 
    const menus = ref([])
    const isLoggedIn = ref(true)
    const authUser = ref('')
    const loading = ref(true)
    const users = ref([])
    const roles = ref([])

    const formInputs = reactive({
        name: "",
        email: "",
        password: "",
        role_id: "",
    });

    // getters
    const writePermission = computed(() => {
        return isPermitted('write')
    })

    // actions 
    const isPermitted = (action) => {
        let permissions = JSON.parse(authUser.value.role.permissions)
        for (let p of permissions) {
            console.log(p['write'])
        }
    }
    const fetchUsers = async () => {
        try {
            const res = await axios.get('/api/users');
            users.value = res.data.users
            loading.value = false
        } catch (err) {
            console.error(err);
        }
    }

    const fetchRoles = async () => {
        try {
            const res = await axios.get('/api/roles');
            roles.value = res.data.roles
        } catch (err) {
            console.error(err);
        }
    }

    const storeUser = async () => {
        if(formInputs.name.trim() == '') toast.error("the name field is required", {timeout: 2000});
        if(formInputs.email.trim() == '') toast.error("the email field is required", {timeout: 2000});
        if(formInputs.password.trim() == '') toast.error("the password field is required", {timeout: 2000});
        if(formInputs.role_id == '') return toast.error("the role field is required", {timeout: 2000});
        try {
            const formData = new FormData();
            formData.append('name', formInputs.name)
            formData.append('email', formInputs.email)
            formData.append('password', formInputs.password)
            formData.append('role_id', formInputs.role_id)
            await axios.post('/api/users', formData )
            toast.success("a user is created successfully", {timeout: 2000});
            router.push({ name: 'userIndex' })
        } catch (error) {
            if(error.response.status === 422) {
                toast.error(error.response.data.message, {timeout: 2000});
            }
            console.log(error)
        }
    }

    // const fetchUser = async (id) => {
    //     if(id) {
    //         const res = await axios.get(`/api/users/${parseInt(id)}`)
    //         formInputs.name = res.data.name
    //         formInputs.email = res.data.email
    //         formInputs.role_id = res.data.role_id
    //         userEditId.value = res.data.id
    //     }
    // }

    // const updateUser = async () => {
    //     try {
    //         const formData = new FormData();
    //         formData.append('name', formInputs.name)
    //         formData.append('email', formInputs.email)
    //         formData.append('role_id', formInputs.role_id)
    //         formData.append('_method', 'patch')
    //         await axios.post('/api/users/'+ userEditId.value, formData )
    //         router.push({name: 'userIndex'})
    //         toast.success("a user is updated successfully", {timeout: 2000});
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // const deleteUser = async (id) => {
    //     try {
    //         await axios.delete(`/api/users/${id}`);
    //         getTags()
    //         toast.success('a user is deleted successfully', {timeout: 2000})
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }

    const deleteUser = async (id) => {
        try {
            await axios.delete(`/api/users/${id}`)
            fetchUsers()
            toast.success('a user is deleted successfully', {timeout: 2000})
        } catch (error) {
            console.log(error)
        }
    }

    const resetForm = () => {
        formInputs.name = ''
        formInputs.email = ''
        formInputs.password = ''
        formInputs.role_id = ''
    }
    // const formSubmitAction = () => {
    //     userEditId.value == '' ? storeUser() : updateUser()
    // }

    const singIn = async () => {
        if(formInputs.email.trim() == '') toast.error("the email field is required", {timeout: 2000});
        if(formInputs.password.trim() == '') return toast.error("the password field is required", {timeout: 2000});
        try {
            const formData = new FormData();
            formData.append('email', formInputs.email)
            formData.append('password', formInputs.password)
            const res = await axios.post('/api/users/sign-in', formData )
            if(res.data.status === 'fail') {
                toast.error("signed in fail", {timeout: 2000})
                return
            }
            toast.success("signed in successfully", {timeout: 2000})
            authUser.value = res.data.user
            isLoggedIn.value = true
            router.push({ name: 'dashboard' })
        } catch (error) {
            if(error.response.status === 422) {
                toast.error(error.response.data.message, {timeout: 2000})
            }
            console.log(error)
        }
    }

    const fetchAuthUser = async () => {
        const res = await axios.get("/api/users/auth/user")
        authUser.value = res.data.authUser
        menus.value = JSON.parse(res.data.authUser.role.permissions)
        console.log(writePermission.value)
    }

    return {
        // states
        menus,
        isLoggedIn,
        authUser,
        loading,
        users,
        roles,
        formInputs,
        writePermission,
        // userEditId,
        // actions
        fetchUsers,
        fetchRoles,
        storeUser,
        // fetchUser,
        // updateUser,
        deleteUser,
        resetForm,
        // formSubmitAction,
        singIn,
        fetchAuthUser
    }
})