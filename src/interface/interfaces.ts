import axios from "axios";
import type { registerUserType } from '../views/RegisterView.vue';
import type { UpdatePasswordUserType } from '../views/UpdatePassword.vue';


const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001/',
    timeout: 3000
})

axiosInstance.interceptors.response.use(
    (response) => {
        return response
    },
    async (error) => {
        return error.response
    }
)

export async function login(username: string, password: string) {
    return await axiosInstance.post('/user/login', {
        username,
        password
    })
}

export async function register(registerUserInfo: registerUserType) {
    return await axiosInstance.post('/user/register', registerUserInfo)
}

export async function registerCaptcha (email: string) {
    return await axiosInstance.get('user/register-captcha',{
        params: {
            address: email
        }
    })
}

export async function updatePassword(updatePasswordUser:UpdatePasswordUserType) {
    return await axiosInstance.post('/user/update_password', updatePasswordUser)
}
