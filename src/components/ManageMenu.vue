<template>
    <el-menu 
        class="el-menu-vertical-demo" 
        :collapse="isCollapse" 
        router
        :default-active="props.routePath.substring(1)"
    >
        <el-menu-item index="update_info">
            <el-icon><UserFilled /></el-icon>
            个人信息
        </el-menu-item>
        <el-menu-item index="meeting_room_manage">
            <el-icon><Menu /></el-icon>
            会议室管理
        </el-menu-item>
        <el-menu-item index="booking_manage">
            <el-icon><Operation /></el-icon>
            预定管理
        </el-menu-item>
        <el-menu-item index="user_manage">
            <el-icon><Filter /></el-icon>
            用户管理
        </el-menu-item>
        <el-menu-item index="statistics">
            <el-icon><setting /></el-icon>
            统计
        </el-menu-item>
    </el-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const props = defineProps(['routePath'])

const isCollapse = ref(false)
</script>

<style>
.is-active a {
    color: inherit;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}
</style>
