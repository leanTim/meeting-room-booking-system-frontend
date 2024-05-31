<template>
    <div ref="container" class="infinite-list-container" style="overflow: auto; height: 100vh;background-color: pink;">
        <div class="infinite-list-phantom" :style="{ height: listHeight + 'px' }"></div>
        <div class="infinite-list" :style="{ transform: getTransform }">
            <div class="item" ref="itemRefs" v-for="item, index in visibleListData" :key="index" :id="item.id + ''"><span
                    style="color: red;">{{ item.id }}</span>
                {{ item.content }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, onMounted, onUpdated, ref } from 'vue';
import { faker } from '@faker-js/faker'

// 不固定长度的虚拟列表
// 列表数据
let listDataA = new Array(100)
for (let i = 0; i < listDataA.length; i++) {
    listDataA[i] = {
        id: i,
        content: faker.lorem.sentences()
    }
}
const listData = ref(listDataA)
// 可视区域开始渲染的索引
const start = ref(0)
// 结束的索引
const end = ref(0)
// 偏移量
const startOffset = ref(0)
// 可视区域高度
const screenHeight = ref()
//
const scrollTop = ref()
const container = ref<HTMLElement>()

// 先预设一个高度，把容器撑起来，等渲染以后，再把真实的高度，offsettop等保存到positions里面
const estimatedItemSize = ref(50)
//保存item的高度、 索引、顶部偏移量，底部偏移量
const positions = ref<Array<any>>([])
const itemRefs = ref<Array<HTMLElement>>([])
const transformVal = ref('')


function initPositions() {
    listData.value.forEach((item, index) => {
        positions.value.push(
            {
                index,
                height: estimatedItemSize.value,
                top: estimatedItemSize.value * index,
                bottom: estimatedItemSize.value * (index + 1)
            }
        )
    })
}
// 通过已经滚动的高度计算此时渲染列表的第一个元素是什么
function getStartIndex(scrollTop = 0) {
    let item = positions.value.find(i => i && i.bottom > scrollTop)
    return item.index
    // return binarySearch(positions.value, scrollTop)
}

function binarySearch(list: any[], value: number) {
    let start = 0
    let end = list.length - 1
    let tempIndex = 0

    while (start < end) {
        let midIndex = parseInt((start + end) / 2 + '')
        let midValue = positions.value[midIndex].bottom

        if (midValue === value) {
            return midIndex + 1
        } else if (midValue < value) {
            start = midIndex + 1
        } else if (midValue > value) {
            if (tempIndex === null || tempIndex > midIndex) {
                tempIndex = midIndex
            }
            end = end - 1
        }
    }
    return tempIndex
}

function setStartOffset() {
    startOffset.value =
        start.value >= 1 ? positions.value[start.value - 1].bottom : 0
    transformVal.value = `translate3d(0, ${startOffset.value}px, 0)`
}

// 
const listHeight = computed(() => {
    return positions.value[positions.value.length - 1].bottom
})

// 视窗内能看见的item数量
// 1先根据预设的item高度算出可视范围内可以渲染几条数据
const visibleCount = computed(() => {
    return Math.ceil(screenHeight.value / estimatedItemSize.value)
})
// 通过控制y方向的transform使列表在视窗内
const getTransform = computed(() => {
    return `translate3d(0, ${startOffset.value}px, 0)`
})

// 可视范围内渲染的列表数据
// 2 取出可视范围内渲染列表需要的数据
const visibleListData = computed(() => {
    return listData.value.slice(start.value, end.value)
})
onBeforeMount(() => {
    // 3. 初始化item的位置信息
    initPositions()
})
onMounted(() => {
    // 
    screenHeight.value = container.value?.clientHeight
    end.value = start.value + visibleCount.value
    container.value?.addEventListener('scroll', scrollEvent, true)
})
onUpdated(() => {
    // 4. 此时第一批的数据渲染完成，触发updated钩子
    // 计算出每个item的真实高度跟位置等信息，替换掉原来的通过预设高度初始化的信息
    itemRefs.value.map((node) => {
        let rect = node.getBoundingClientRect()
        let height = rect.height
        let index = Number(node.id)
        let oldHeight = positions.value[index].height
        let oldBottom = positions.value[index].bottom
        let dVlaue = oldHeight - height

        if (dVlaue) {
            positions.value[index].bottom = oldBottom - dVlaue
            positions.value[index].height = height

            for (let k = index + 1; k < positions.value.length; k++) {
                positions.value[k].top = positions.value[k - 1].bottom
                positions.value[k].bottom = positions.value[k].bottom - dVlaue
            }
        }
    })
})

// 5. 监听滚动事件
function scrollEvent() {
    scrollTop.value = container.value?.scrollTop
    // 6. 通过滚动的高度算出此时应该渲染第几个元素
    start.value = getStartIndex(scrollTop.value)

    end.value = start.value + visibleCount.value
    //7. 设置偏移量使渲染的列表始终在视窗内
    if (start.value >= 1) {
        startOffset.value = positions.value[start.value - 1].bottom
    } else {
        startOffset.value = 0
    }
}
</script>

<style scoped>
.infinite-list-container {
    height: 100%;
    overflow: auto;
    position: relative;
    -webkit-overflow-scrolling: touch;
}

.infinite-list-phantom {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    z-index: -1;
}

.infinite-list {
    left: 0;
    right: 0;
    top: 0;
    position: absolute;
    text-align: center;
}

.item {
    padding: 10px;
    color: #555;
    box-sizing: border-box;
    border-bottom: 1px solid #999;
}
</style>