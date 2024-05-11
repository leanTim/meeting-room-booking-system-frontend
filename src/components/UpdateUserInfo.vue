<template>
    <div id="update-info-container">
        <el-form
            label-width="auto"
            min-width="400px"
            :model="userInfo"
            >

            <el-form-item 
                label="头像"
            >
                <HeadPicUpload
                    :headPic="userInfo.headPic"
                    @update-pic="updatePic"
                ></HeadPicUpload>
            </el-form-item>

            <el-form-item 
                label="昵称："   
            >
                <el-input 
                v-model="userInfo.nickName"
                ></el-input>
            </el-form-item>

            <el-form-item 
                label="邮箱："
            >
                <el-input 
                v-model="userInfo.email"
                disabled
                ></el-input>
            </el-form-item>

            <el-row :gutter="20">
                <el-col :span="17">
                <el-form-item 
                    label="验证码："
                >
                    <el-input
                    v-model="userInfo.captcha"
                    ></el-input>
                </el-form-item>
                </el-col>
                <el-col :span="4">
                <el-button 
                    type="primary"
                    @click="onGetCaptcha"
                >发送验证码</el-button>
                </el-col>
            </el-row>
            
            <el-form-item>
                <el-button 
                type="primary" 
                style="width: 100%;margin-top: 10px;"
                @click="onUpdateUserInfo(userInfo)"
                >确认修改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { getUserInfo, updateUserInfo } from '@/interface/interfaces';
import { ElMessage } from 'element-plus';
import { onMounted, reactive } from 'vue';
import HeadPicUpload from './HeadPicUpload.vue';


export interface updateUserInfoType {
    username: string
    nickName: string
    email: string
    headPic: string
    captcha: string
}

const userInfo: updateUserInfoType = reactive({
    username: '',
    nickName: '',
    email: '',
    headPic: '',
    captcha: ''
})

function onGetCaptcha () {
    userInfo.captcha = 'asd123'
}

const getInfo = async function () {
    const res = await getUserInfo()
    const data = res.data.data

    userInfo.username = data.username
    userInfo.nickName = data.nickName || ''
    userInfo.headPic = data.headPic || ''
    userInfo.email = data.email || ''
    // console.log(userInfo)
    return res
}

function updatePic(url: string) {
    console.log(url, '-------------url---------')
    userInfo.headPic = url
}

async function onUpdateUserInfo (data: updateUserInfoType) {
    const res = await updateUserInfo(data)
    
    // console.log(res)
    if(res.status ===200 || res.status === 201) {
        const {message: msg, data} = res.data

        if(msg === 'success') {
            ElMessage({
                type: 'success',
                message: '更新用户信息成功',
                duration: 2000
            }) 
        }else {
            ElMessage({
                type: 'error',
                message: data,
                duration: 2000
            })    
        }
    } else {
        ElMessage({
            type: 'error',
            message: '系统繁忙请稍后再试',
            duration: 2000
        })  
    }
}

onMounted(async () => {
    await getInfo()
})

</script>

<style scoped>
#update-info-container {
    width: 400px;
    margin: 0 auto;
    text-align: center;
}
</style>