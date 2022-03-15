<template>
    <div>
        <!-- 三级联动全局组件：三级联动已经注册为全局组件，因此不需要引入 -->
        <TypeNav></TypeNav>
        <ListContainer></ListContainer>
        <Recommend></Recommend>
        <Rank></Rank>
        <Like></Like>
        <!-- 父子组件通信 -->
        <Floor 
            v-for="item in floorList" 
            :key="item.id"
            :list="item"></Floor>
        <Brand></Brand>

        <!-- <button @click="add" >点我+1</button>
        {{count}}
        <button>点我-1</button> -->
    </div>
</template>

<script>

import ListContainer from '@/pages/Home/ListContainer'
import Recommend from '@/pages/Home/Recommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'

import {mapState} from 'vuex'

export default {
    name: 'Home',
    components: {
        ListContainer,
        Recommend,
        Rank,
        Like,
        Floor,
        Brand
    },
    computed: {
        ...mapState({
            floorList: state =>{
                return  state.home.floorList
            }
        }),
    },
    methods: {
        add(){
            // 派发action
            this.$store.dispatch('add')
        }
    },
    mounted(){
        // 获取floor组件的数据
        this.$store.dispatch('getFloorList')

        // 获取用户信息在首页展示
        this.$store.dispatch('getUserInfo')
    }
}
</script>

<style>

</style>