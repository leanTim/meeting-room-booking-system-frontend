<template>
  <div id="login-container">
    <h1>会议室预定系统</h1>
    <el-form :model="LoginUser" label-width="auto" style="max-width: 400px">
      <el-form-item label="用户名：">
        <el-input 
          v-model="LoginUser.username"
          placeholder="请输入用户名"
          >
        </el-input>
      </el-form-item>
      <el-form-item label="密码：">
        <el-input 
          v-model="LoginUser.password"
          type="password"
          placeholder="请输入不小于6位的密码"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item>
        <div class="links">
          <a href="">创建账号</a>
          <a href="">忘记密码</a>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button  
          class="btn"
          type="primary"
          @click="onSubmit"
        >登录</el-button>
      </el-form-item>
    </el-form>
    
  </div>
</template>

<script setup lang="ts">
import { login } from '@/interface/interfaces';
import { ElMessage } from 'element-plus';
import { reactive } from 'vue';


const LoginUser = reactive({
  username: '',
  password: ''
})

const onSubmit = async function () {
  const res = await login(LoginUser.username, LoginUser.password)
  
  const {code, message, data} = res.data
  
  if(res.status ===201 || res.status === 200) {
    ElMessage({
      type: 'success',
      message: '登录成功',
      duration: 2000
    })

    localStorage.setItem('access_token', data.accessToken)
    localStorage.setItem('refresh_token', data.refreshToken)
    localStorage.setItem('userInfo', data.userInfo)
  } else {
    ElMessage({
    type: 'error',
    message: data?? '系统繁忙，请稍后再试',
    duration: 2000
  })
  }
}
</script>

<style scoped>
#login-container {
  width: 400px;
  margin: 0 auto;
  text-align: center;
}
.links  {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn {
  /* width: 100%; */
  margin: 0 auto;
}

</style>