<template>
<div class="type-nav">
    <!-- 事件委托 -->
    <div class="container" 
    @mouseleave="leaveShow"
    @mouseenter="enterShow" >
        <h2 class="all">全部商品分类</h2>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
            <!-- 三级联动 -->
            <transition name="sort" >
                <div class="sort" v-show="show" >
                    <div class="all-sort-list2" @click="goSearch">
                        <div class="item" 
                            v-for="(item1, index) in categoryList" 
                            :key="item1.categoryId">

                            <h3 @mouseenter="changeIndex(index)"
                            :class="{cur: currentIndex == index}">
                                <!-- 一级分类 -->
                                <a 
                                :data-categoryId1="item1.categoryId"
                                :data-categoryName="item1.categoryName" >{{item1.categoryName}}</a>
                            </h3>

                            <div class="item-list clearfix"
                                :style="{display:currentIndex === index ? 'block' : 'none'}">
                                <div class="subitem" 
                                    v-for="item2 in item1.categoryChild" 
                                    :key="item2.categoryId">
                                    <dl class="fore">
                                        <dt>
                                            <!-- 二级 -->
                                            <a 
                                            :data-categoryId2="item2.categoryId"
                                            :data-categoryName="item2.categoryName" >{{item2.categoryName}}</a>
                                        </dt>
                                        <dd>
                                            <!-- 三级 -->
                                            <em v-for="item3 in item2.categoryChild" 
                                                :key="item3.categoryId">
                                                <a 
                                                :data-categoryId3="item3.categoryId"
                                                :data-categoryName="item3.categoryName" >{{item3.categoryName}}</a>
                                            </em>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
    </div>
</div>
</template>

<script>
import {mapState} from 'vuex'

// import _ from 'lodash'
// 最好按需引入
import throttle from 'lodash/throttle'

export default {
    name: 'TypeNav',
    data(){
        return {
            // 存储用户鼠标移上哪一个一级分类
            currentIndex: -1,
            show: true
        }
    },
    mounted(){
        if(this.$route.path == '/search'){
            this.show = false;
        }
    },
    computed:{
        ...mapState({
            categoryList: (state)=>{
                return state.home.categoryList
            }
        })
    },
    methods: {
        // console.log(index);
        // 防抖 loadash _.debounce
        // 与节流 loadash _.throttle
        /*  changeIndex(index){
            this.currentIndex = index;
        }, */
        changeIndex: throttle(function(index){
            this.currentIndex = index;
        }, 50),
        goSearch(event){
            // 声明式导航，会出现卡顿现象
            // 解决方案：编程式导航 + 事件委派

            // 自定义属性 data-categoryname,其余节点无
            console.log(event.target, event.target.dataset);
            // 拥有categoryname 就一定为a标签。
            let {categoryname, categoryid1, categoryid2, categoryid3} = event.target.dataset;

            if(categoryname){
                let location = {name: 'search'};
                let query = {categoryName: categoryname};

                if(categoryid1){
                    query.categoryId1 = categoryid1;
                }else if(categoryid2){
                    query.categoryId2 = categoryid2;
                }else{
                    query.categoryId3 = categoryid3;
                }

                // 整理参数 ?????
                location.query = query;
                // console.log(location);
                // this.$router.push(location)

                //  如果路由跳转带有 params参数，也要传过去
                if(this.$route.params){
                    location.params = this.$route.params;
                    this.$router.push(location);
                }
            }
        },
        enterShow(){
            this.show = true;
        },
        leaveShow(){
            this.currentIndex = -1;
            if(this.$route.path != '/home'){
                this.show = false;
            }
        }
    }
}
</script>

<style scoped lang="less">
.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            z-index: 999;

            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 30px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                        }
                    }

                    .item-list {
                        display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }

                    &:hover {
                        .item-list {
                            display: block;
                        }
                    }
                }

                .cur{
                    background: skyblue;
                }
            }
        }

        // 过渡动画的样式
        .sort-enter{
            height: 0px;
        }
        .sort-enter-to{
            height: 460px;
        }
        .sort-enter-active{
            transition: all .5s linear;
        }
    }
}
</style>