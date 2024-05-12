<template>
    <div id="user-manage-container">
        <el-form :inline="true" :model="formInline" class="user-serach-form">
            <el-form-item label="用户名：">
                <el-input v-model="formInline.username" placeholder="根据用户名查询" clearable />
            </el-form-item>
            <el-form-item label="昵称：">
                <el-input v-model="formInline.nickName" placeholder="根据昵称查询" clearable />
            </el-form-item>
            <el-form-item label="邮箱：">
                <el-input v-model="formInline.email" placeholder="根据邮箱查询" clearable />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="users" style="width: 100%">
            <el-table-column prop="username" label="用户名"/>
            <el-table-column prop="nickName" label="昵称"/>
            <el-table-column prop="headPic" label="头像">
                <template #default="scope">
                    <el-image
                        :src="'http://localhost:3001/'+scope.row.headPic"
                        style="width: 30px;"
                        :preview-src-list="['http://localhost:3001/'+scope.row.headPic]"
                        :preview-teleported="true"
                        lazy
                    >
                        <template #error>
                            <div class="image-slot">
                                <el-icon><Picture /></el-icon>
                            </div>
                        </template>
                    </el-image>
                </template> 
            </el-table-column>
            <el-table-column prop="email" label="邮箱" />
            <el-table-column prop="isFrozen" label="状态">
                <template #default="scope">
                    {{scope.row.isFrozen ? '已冻结' : '正常'}}
                </template>
            </el-table-column>
            <el-table-column prop="id" fixed="right" label="操作" width="120">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="onFreezeUser(scope.row.id)">
                        冻结
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination 
            hide-on-single-page 
            background 
            layout="prev, pager, next" 
            :total="total" 
            @current-change="onCurrentChange"
        />
    </div>
</template>

<script setup lang="ts">
import { freezeUser, getUserList } from '@/interface/interfaces';
import { Picture } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { onBeforeMount, onMounted, reactive, ref } from 'vue'
const PAGESIZE = 10
const PAGENO = ref(1)

let users = ref([])
let total = ref(1)

interface SearchUser {
    id: number
    username: string 
    nickName: string
    email: string
    isFrozen: boolean
    pageNo: number
    pageSize:number
}

const formInline: SearchUser= reactive({
    id: 0,
    username: '',
    nickName: '',
    email: '',
    isFrozen: false,
    pageNo: PAGENO,
    pageSize: PAGESIZE,
})

async function onCurrentChange(val: number) {
    formInline.pageNo = val
    await searchUser(formInline)
}

async function onFreezeUser(id:number) {
    const res = await freezeUser(id)

    if(res.status === 200 || res.status === 201) {
        ElMessage.success('冻结用户成功')
        // 重新搜索触发页面数据刷新
        searchUser(formInline)
    }else {
        ElMessage.error(res.data.data || '系统繁忙，请稍后再试')
    }
}

const searchUser = async function(value: SearchUser) {
    const res =  await getUserList(value.username, value.nickName, value.email, value.pageNo, value.pageSize)
    const { data } = res.data
    if(res.status === 200 || res.status === 201) {
        users.value = data.users
        total.value = data.totalCount
    } else {
        ElMessage.error(data || '系统繁忙，请稍后再试')
    }
    return res
}

onBeforeMount(async () => {
    await searchUser(formInline)
})

onMounted(async () => {
})

const onSubmit = () => {
    searchUser(formInline)
}
const handleClick = () => {
    console.log('click')
}


</script>

<style scoped>
.user-serach-form .el-input {
    --el-input-width: 160px;
}
.el-pagination {
    margin-top: 10px;
}
</style>