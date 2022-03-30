import Vue from 'vue'
import App from './App.vue'

import { Button, MessageBox } from 'element-ui';

// 三级联动组件 --- 全局组件
import TypeNav from '@/components/TypeNav'
import Carouse from '@/components/Carouse'
import Pagination from '@/components/Pagination'

// (全局组件名字，哪一个组件)
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carouse.name, Carouse)
Vue.component(Pagination.name, Pagination)


// 引入 element-ui 框架
// 第一种注册
Vue.component(Button.name, Button);
// 第二种注册
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;


// 引入路由
import router from '@/router'
// 引入仓库
import store from '@/store'
// 引入mock数据
import '@/mock/mockServe'
// 引入swiper样式
import 'swiper/css/swiper.css'


// 统一接口api文件夹里面全部请求函数
import * as API from '@/api'
import VueLazyload from 'vue-lazyload'
import atm from '@/assets/images/lazyimg.jpg'

Vue.use(VueLazyload, {
  // preLoad: 1.3,
  // error: atm,
  loading: atm,
  // attempt: 1
})

console.log(API);

// test
// import {reqCategoryList} from '@/api/index'
// reqCategoryList();

// 引入自定义插件
// import myPlugin from '@/plugins/myPlugin';
// Vue.use(myPlugin, {

// })

// 引入表单验证！！！！！
import '@/plugins/validate';

const vm = new Vue({
  render: h => h(App),
  // 全局事件总线$bus配置
  beforeCreate(){
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  // 注册路由
  router,
  // 注册仓库: 组件实例身上会多一个属性 $store
  store
}).$mount('#app')

console.log('@@', vm);
