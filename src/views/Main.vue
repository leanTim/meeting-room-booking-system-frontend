<template>
    <div id="index-container">
        <header class="header">
            <router-link to="/">
                <h1>会议室预定系统</h1>
            </router-link>
            <router-link to="update_info">
                <el-icon size="30"><User /></el-icon>
            </router-link>
        </header>
        <div class="main">
            <el-row>
                <el-col 
                    :span="6"
                    class="menu"
                >
                    <ManageMenu
                        :route-path="setDefaultActiveMenu"
                    ></ManageMenu>
                </el-col>
                <el-col 
                    :span="18"
                    class="content"
                >
                    <router-view 
                    ></router-view>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script setup lang="ts">
import ManageMenu from '@/components/ManageMenu.vue';
import { useRoute } from 'vue-router';

const route = useRoute()

const setDefaultActiveMenu = route.path
</script>

<style scoped>
#index-container{
    height: 100vh;
    width: 90vw;
}
#index-container .header {
    box-sizing: content-box;
    height: 80px;
    border-bottom: 1px solid #aaa;
    line-height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
}
#index-container h1{
    margin: 0;
}
main {
    width: 100%;
    height: 100%;
    padding: 20px 30px 20px 30px;
}
.el-col {
    padding-top: 20px;
}
.el-col-18 {
    overflow: auto;
}
</style>