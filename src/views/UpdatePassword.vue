<template>
  <div id="update-password-container">
    <h1>修改密码</h1>
    <el-form
      label-width="auto"
      min-width="400px"
      :model="updatePasswordUser"
      >

      <el-form-item 
        label="用户名："
      >
        <el-input 
          v-model="updatePasswordUser.username"
        ></el-input>
      </el-form-item>
      <el-form-item 
        label="邮箱："
      >
        <el-input 
          v-model="updatePasswordUser.email"
        ></el-input>
      </el-form-item>

      <el-row :gutter="20">
        <el-col :span="17">
          <el-form-item 
            label="验证码："
          >
            <el-input
              v-model="updatePasswordUser.captcha"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-button 
            type="primary"
            @click="onSendUpdatePasswordCaptcha"
          >发送验证码</el-button>
        </el-col>
      </el-row>

      <el-form-item 
        label="密码："   
      >
        <el-input 
          v-model="updatePasswordUser.password"
          type="password"
          placeholder="请输入不小于6位的密码"
          show-password
        ></el-input>
      </el-form-item>

      <el-form-item 
        label="确认密码："
      >
        <el-input 
          v-model="updatePasswordUser.confirmPassword"
          type="password"
          show-password
        ></el-input>
      </el-form-item>
      
      <el-form-item>
        <el-button 
          type="primary" 
          style="width: 100%;margin-top: 10px;"
          @click="onUpdatePassword(updatePasswordUser)"
          >确认修改</el-button>
      </el-form-item>
    </el-form>
  </div>
  
</template>

<script setup lang="ts">
import { updatePassword } from '@/interface/interfaces';
import router from '@/router';
import { ElMessage } from 'element-plus';
import { reactive } from 'vue';

export interface updatePasswordUserType {
  username: string
  email: string
  captcha: string
  password: string
  confirmPassword: string
}

const updatePasswordUser: updatePasswordUserType = reactive({
  username: '',
  email: '',
  captcha: '',
  password: '',
  confirmPassword: ''
})

const onUpdatePassword = async (value: updatePasswordUserType) => {
  if(updatePasswordUser.password !== updatePasswordUser.confirmPassword) {
    return ElMessage({
      type: 'error',
      message: '两次密码不一致',
      duration: 2000
    })
  }

  const res = await updatePassword(value)

  const {message: msg, data} = res.data

  if(res.status === 200 || res.status === 201) {
    ElMessage({
      type: 'success',
      message: '密码修改成功',
      duration: 2000
    })

    setTimeout(() => {
      router.push('/login')
    }, 1500)
  }else {
    ElMessage({
      type: 'error',
      message: data || '系统繁忙请稍后再试',
      duration: 2000
    })
  }
}

const onSendUpdatePasswordCaptcha = () => {
  updatePasswordUser.captcha = 'asd123'
}

</script>

<style scoped>
#update-password-container {
  width: 400px;
  margin: 0 auto;
  text-align: center;
}
</style>