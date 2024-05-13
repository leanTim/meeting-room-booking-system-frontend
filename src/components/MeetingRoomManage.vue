<template>
    <div>
        <el-form :inline="true" :model="searchFrom" class="user-serach-form">
            <el-row>
                <el-col :span="11">
                    <el-form-item label="会议室名称：">
                        <el-input v-model="searchFrom.name" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="会议室容量：">
                        <el-input v-model="searchFrom.capacity" clearable />
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="11">
                    <el-form-item label="会议室位置：">
                        <el-input v-model="searchFrom.location" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="会议室设备：">
                        <el-input v-model="searchFrom.equipment" clearable />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item>
                <el-button type="primary" @click="onSearchRooms">搜索会议室</el-button>
                <el-button type="primary" @click="dialogVisible = true">添加会议室</el-button>
            </el-form-item>
        </el-form>
        <el-dialog
            v-model="dialogVisible"
            align-center
            title="添加会议室"
            width="500"
            :before-close="handleClose"
        >
            <template #footer>
                <el-form
                    :model="createRoomForm"
                    label-position="top"
                >
                    <el-form-item label="会议室名称：">
                        <el-input v-model="createRoomForm.name" />
                    </el-form-item>
                    <el-form-item label="位置：">
                        <el-input v-model="createRoomForm.location" />
                    </el-form-item>
                    <el-form-item label="容纳人数：">
                        <el-input v-model="createRoomForm.capacity" />
                    </el-form-item>
                    <el-form-item label="设备：">
                        <el-input v-model="createRoomForm.equipment" />
                    </el-form-item>
                    <el-form-item label="描述：">
                        <el-input v-model="createRoomForm.description" />
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="dialogVisible = false">取消</el-button>
                        <el-button type="primary" @click="onCreateMeetingRoom(createRoomForm)">
                    添加
                    </el-button>
                    </el-form-item>
                </el-form>
            </template>
        </el-dialog>
        <el-table :data="meetRooms" style="width: 100%">
            <el-table-column prop="name" label="名称" width="80" />
            <el-table-column prop="capacity" label="容纳人数" width="80" />
            <el-table-column prop="location" label="位置" width="80" />
            <el-table-column prop="equipment" label="设备" width="80" />
            <el-table-column prop="description" label="描述" width="80" />
            <el-table-column prop="createTime" label="添加时间" />
            <el-table-column prop="updateTime" label="上次更新时间" />
            <el-table-column prop="isBooked" label="预定状态" width="60" />
            <el-table-column prop="id" fixed="right" label="操作" width="120">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="onDeleteRoom(scope.row.id)">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination 
            hide-on-single-page
            background
            layout="prev, pager, next" 
            :page-size="5"
            :total="total" 
            @current-change="onCurrentChange"
        />
    </div>
</template>
<script setup lang="ts">
import { createMeetingRoom, deleteMeetingroom, getMeetingRoomList } from '@/interface/interfaces';
import { ElMessage, ElMessageBox } from 'element-plus';
import { onBeforeMount, reactive, ref } from 'vue';

const total = ref(1) // 分页器页数
const meetRooms = ref([])
const dialogVisible = ref(false)

interface SearchRoom {
    name: string,
    capacity: number | undefined
    equipment: string
    location: string
    pageNo: number
    pageSize: number
}

export interface CreateRoom {
    name: string
    location: string
    capacity: number | undefined
    description: string,
    equipment: string
}

const searchFrom: SearchRoom = reactive({
    name: '',
    capacity: undefined,
    location: '',
    equipment: '',
    pageNo: 1,
    pageSize: 5
})



const createRoomForm: CreateRoom = reactive({
    name: '',
    location: '',
    capacity: undefined,
    description: '',
    equipment: ''
})

async function getRooms(value:SearchRoom) {
    const res = await getMeetingRoomList(value.pageNo, value.pageSize, value.capacity, value.name, value.equipment)
    const {data} = res.data

    if(res.status === 200 || res.status === 201) {
        meetRooms.value = data.meetingRooms
        total.value = data.totalCount
    } else {
        ElMessage.error(data || '系统繁忙，请稍后再试')

    }
    return res
}
const handleClose = (done: () => void) => {
    ElMessageBox.confirm('确定要关闭吗？', 'cofirm', {
    distinguishCancelAndClose: false,
    confirmButtonText: '确定',
    cancelButtonText: '取消',
})
    .then(() => {
        done()
    })
    .catch(() => {
    // catch error
    })
}

async function onCreateMeetingRoom(val: CreateRoom) {
    const res = await createMeetingRoom(val)

    if(res.status === 200 || res.status === 201) {
        ElMessage.success('会议室创建成功')
        dialogVisible.value = false
        getRooms(searchFrom)
    } else {
        ElMessage.error(res.data.data)
    }
    return res
}

async function onSearchRooms() {
    getRooms(searchFrom)
}

async function onCurrentChange(val: number) {
    searchFrom.pageNo = val
    await getRooms(searchFrom)
}

async function onDeleteRoom(id: number) {
    try{
        await deleteMeetingroom(id)
        ElMessage.success('删除成功')
    }catch(e) {
        console.log(e)
        ElMessage.error('删除失败')
    }
    getRooms(searchFrom)
}

onBeforeMount(async () => {
    await getRooms(searchFrom)
})

</script>

<style scoped>
</style>