import axios, { type AxiosRequestConfig } from "axios";
import type { registerUserType } from '../views/RegisterView.vue';
import type { updatePasswordUserType } from '../views/UpdatePassword.vue';
import type { updateUserInfoType } from '../components/UpdateUserInfo.vue';


const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001/',
    timeout: 3000
})


axiosInstance.interceptors.request.use((config) => {
    const assessToken = localStorage.getItem('access_token')

    if(assessToken) {
        config.headers.Authorization = 'Bearer ' + assessToken
    }
    return config
})

interface PendingTask {
    config: AxiosRequestConfig,
    resolve: Function
}

axiosInstance.interceptors.response.use(
    (response) => {
        return response
    },
    async (error) => {
        // 如果请求没有发送成功额，error是没有response属性的
        if(!error.response) {
            return Promise.reject(error);
        }
        let {data, config} = error.response

        if(data.code === 401 && !config.url.includes('/user/refresh')) {
            const res = await refreshToken()

            if(res.status === 200) {
                return await axiosInstance(config)
            } else {
                alert(' 登录过期，请重新登录')
                return Promise.reject(res.data)
            }
        } else {
            return error.response
        }
    }
)

async function refreshToken() {
    const res = await axiosInstance.get('/user/refresh', {
        params: {
            refreshToken: localStorage.getItem('refresh_token')
        }
    })
    localStorage.setItem('access_token', res.data.data.access_token || '')
    localStorage.setItem('refresh_token', res.data.data.refresh_token || '')

    return res
}

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

export async function updatePassword(updatePasswordUser: updatePasswordUserType) {
    return await axiosInstance.post('/user/update_password', updatePasswordUser)
}

export async function getUserInfo() {
    return await axiosInstance.get('/user/info')
}

export async function updateUserInfo(data: updateUserInfoType) {
    return await axiosInstance.post('/user/update', data)
}

export async function getUserList(username:string, nickName: string, email: string, pageNo: number, pageSize: number) {
    return await axiosInstance.get('/user/list', {
        params: {
            username,
            nickName,
            email,
            pageNo,
            pageSize
        }
    })
}

export async function freezeUser(id: number) {
    return await axiosInstance.get('/user/freeze', {
        params: {
            id
        }
    })
}