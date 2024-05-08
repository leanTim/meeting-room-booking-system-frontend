<template>
  <div id="register-container">
    <h1>会议室预定系统</h1>
    <el-form
      label-width="auto"
      min-width="400px"
      :model="registerUser"
      >
      <el-form-item 
        label="用户名："
      >
        <el-input 
          v-model="registerUser.username"
        ></el-input>
      </el-form-item>

      <el-form-item 
        label="昵称："
      >
        <el-input 
          v-model="registerUser.nickname"
        ></el-input>
      </el-form-item>

      <el-form-item 
        label="密码："   
      >
        <el-input 
          v-model="registerUser.password"
          type="password"
          placeholder="请输入不小于6位的密码"
          show-password
        ></el-input>
      </el-form-item>

      <el-form-item 
        label="确认密码："
      >
        <el-input 
          v-model="registerUser.confirmPassword"
          type="password"
          show-password
        ></el-input>
      </el-form-item>

      <el-form-item 
        label="邮箱："
      >
        <el-input
          v-model="registerUser.email"
        ></el-input>
      </el-form-item>


      <el-row :gutter="20">
        <el-col :span="17">
          <el-form-item 
            label="验证码："
          >
            <el-input
              v-model="registerUser.captcha"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-button 
            type="primary"
            @click="sendCaptcha"
          >发送验证码</el-button>
        </el-col>
      </el-row>
      
      <el-row justify="end">
        <!-- <el-form-item> -->
          <el-col :span="10">
            <div class="links">已有账号？去 <a href="">登录</a></div>
          </el-col>
        <!-- </el-form-item> -->
      </el-row>
      <el-form-item>
        <el-button 
          type="primary" 
          style="width: 100%;margin-top: 10px;"
          @click="onRegister"
          >注册</el-button>
      </el-form-item>
      
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { registerCaptcha, register } from '@/interface/interfaces';
import router from '@/router';
import { ElMessage } from 'element-plus';
import { reactive, toRefs } from 'vue';

export interface registerUserType {
    username: string
    nickname: string
    password: string
    confirmPassword: string
    email: string
    captcha: string
}
const registerUser: registerUserType = reactive({
  username: '',
  password: '',
  confirmPassword: '',
  nickname: '',
  email: '',
  captcha: ''
})

const sendCaptcha =  () => {
  registerUser.captcha = 'asd123'
}

const onRegister = async () => {
  if(registerUser.password !== registerUser.confirmPassword) {
    return ElMessage({
      type: 'error',
      message: '两次密码不一致',
      duration: 2000
    })
  }
  const res = await register(registerUser)
  console.log(res)
  if(res.status === 200 || res.status === 201) {
    ElMessage({
      type: 'success',
      message: '注册成功'
    })
    setTimeout(() => {
      router.push('/login')
    }, 1500)
  } else {
    ElMessage({
      type: 'error',
      message: res.data.data || '系统繁忙请稍后再试'
    })
  }
}


</script>

<style scoped>
#register-container {
  width: 400px;
  margin: 0 auto;
  text-align: center;
}
</style>