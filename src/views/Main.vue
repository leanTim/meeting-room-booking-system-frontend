<template>
    <div id="index-container">
        <header class="header">
            <h1>会议室预定系统</h1>
            <router-link to="update_info">
                <el-icon size="30"><User /></el-icon>
            </router-link>
        </header>
        <main>
            <router-view></router-view>
        </main>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
#index-container{
    height: 100vh;
    width: 90vw;
    display: flex;
    flex-direction: column;
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
    height: calc(100% - 200px);
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>