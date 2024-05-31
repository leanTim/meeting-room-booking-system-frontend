<template>
    <div ref="container" 
        class="infinite-list-container"
        style="overflow: auto; height: 100vh;background-color: pink;"
    >
        <div class="infinite-list-phantom" :style="{height: listHeight + 'px'}"></div>
        <div class="infinite-list" :style="{transform: getTransform}">
            <div 
                class="item"
                v-for="item, index in visibleListData"
                :key="index"
                :style="{
                    height: itemSize + 'px',
                    lineHeight: itemSize + 'px',
                }"
            >{{ item }}</div>
        </div>
    </div>
    <!-- <div>
        <h1>booking manage</h1>
    </div> -->
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

 // 每个列表元素的高度
 const itemSize = ref(50)
 // 列表数据
 let listDataA = new Array(100)
 for(let i = 0; i < listDataA.length; i++) {
    listDataA[i] = i + 1
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
 const scrollTop = ref()
 const container = ref<HTMLElement>()

const listHeight = computed(() => {
    return listData.value.length * itemSize.value
})

const visibleCount = computed(() => {
    return Math.ceil(screenHeight.value / itemSize.value)
})

const getTransform = computed(() => {
    return `translate3d(0, ${startOffset.value}px, 0)`
})

const visibleListData = computed(() => {
    return listData.value.slice(start.value, Math.min(end.value, listData.value.length))
})

onMounted(() => {
    screenHeight.value = container.value?.clientHeight
    end.value = start.value + visibleCount.value
    container.value?.addEventListener('scroll', scrollEvent, true)
})

function scrollEvent() {
    scrollTop.value = container.value?.scrollTop
    start.value = Math.floor(scrollTop.value / itemSize.value)
    end.value = start.value + visibleCount.value

    startOffset.value = scrollTop.value - (scrollTop.value % itemSize.value)
  
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