import { createPinia, defineStore } from "pinia";
import { reactive, ref } from "vue";
import { useToast } from "vue-toastification";
import { markRaw } from "vue";
import router from "../router";

const pinia = createPinia()
pinia.use(({store}) => {
    store.router = markRaw(router)
})
const toast = useToast();

export const useUserStore = defineStore('userStore', () => {
    const isLoggedIn = ref(true)
    const authUser = ref('')
    const loading = ref(true)
    const users = ref([])

    const formInputs = reactive({
        name: "",
        email: "",
        password: "",
        role: "",
    });

    const editUserId = ref('')
    
    const getUsers = async () => {
        try {
            const res = await axios.get('/api/users');
            users.value = res.data.users
            loading.value = false
        } catch (err) {
            console.error(err);
        }
    }

    const storeUser = async () => {
        if(formInputs.name.trim() == '') toast.error("the name field is required", {timeout: 2000});
        if(formInputs.email.trim() == '') toast.error("the email field is required", {timeout: 2000});
        if(formInputs.password.trim() == '') toast.error("the password field is required", {timeout: 2000});
        if(formInputs.role.trim() == '') return toast.error("the role field is required", {timeout: 2000});
        try {
            const formData = new FormData();
            formData.append('name', formInputs.name)
            formData.append('email', formInputs.email)
            formData.append('password', formInputs.password)
            formData.append('role', formInputs.role)
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

    const getUser = async (id) => {
        if(id) {
            const res = await axios.get(`/api/users/${parseInt(id)}`)
            formInputs.name = res.data.name
            formInputs.emial = res.data.emial
            formInputs.role = res.data.role
            editUserId.value = res.data.id
        }
    }

    const updateUser = async () => {
        try {
            const formData = new FormData();
            formData.append('name', formInputs.name)
            formData.append('email', formInputs.email)
            formData.append('role', formInputs.role)
            formData.append('_method', 'patch')
            await axios.post('/api/users/'+ editUserId.value, formData )
            router.push({name: 'userIndex'})
            toast.success("a user is updated successfully", {timeout: 2000});
        } catch (error) {
            console.log(error)
        }
    }

    const deleteUser = async (id) => {
        try {
            await axios.delete(`/api/users/${id}`);
            getTags()
            toast.success('a user is deleted successfully', {timeout: 2000})
        } catch (err) {
            console.error(err);
        }
    }

    const resetForm = () => {
        formInputs.name = ''
        formInputs.email = ''
        formInputs.password = ''
        formInputs.role = ''
    }
    const formSubmitAction = () => {
        editUserId.value == '' ? storeUser() : updateUser()
    }

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

    const getAuthUser = async () => {
        const res = await axios.get("/api/users/auth/user")
        authUser.value = res.data.authUser
    }

    return {
        // states
        isLoggedIn,
        authUser,
        loading,
        users,
        formInputs,
        editUserId,
        // actions
        storeUser,
        getUsers,
        getUser,
        updateUser,
        deleteUser,
        resetForm,
        formSubmitAction,
        singIn,
        getAuthUser
    }
})