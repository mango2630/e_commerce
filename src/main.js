import Vue from 'vue'
import App from './App.vue'


// 三级联动组件 --- 全局组件
import TypeNav from '@/components/TypeNav'
import Carouse from '@/components/Carouse'
import Pagination from '@/components/Pagination'

// (全局组件名字，哪一个组件)
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carouse.name, Carouse)
Vue.component(Pagination.name, Pagination)

// 引入路由
import router from '@/router'
// 引入仓库
import store from '@/store'
// 引入mock数据
import '@/mock/mockServe'
// 引入swiper样式
import 'swiper/css/swiper.css'

// test
// import {reqCategoryList} from '@/api/index'
// reqCategoryList();

const vm = new Vue({
  render: h => h(App),
  // 全局事件总线$bus配置
  beforeCreate(){
    Vue.prototype.$bus = this;
  },
  // 注册路由
  router,
  // 注册仓库: 组件实例身上会多一个属性 $store
  store
}).$mount('#app')

console.log('@@', vm);
