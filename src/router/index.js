import Vue from 'vue'
import VueRouter from 'vue-router'

// 使用插件
Vue.use(VueRouter);

let originPush = VueRouter.prototype.push;
VueRouter.prototype.push = function(location, resolve, reject){
    // console.log(this, location, resolve, reject);
    if(resolve && reject){
        // call || apply区别？？？
        originPush.call(this, location, resolve, reject)
    }else{
        originPush.call(this, location, ()=>{}, ()=>{})
    }
}

// console.log(VueRouter.prototype);

// 引入路由组件
import Home from '@/pages/Home/index.vue'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'

// 配置路由
export default new VueRouter({
    routes: [
        {
            path: '/home',
            component: Home,
            meta:{footerShow: true}
        },
        /* {
            path: '/search',
            component: Search,
            meta:{footerShow: true}
        }, */
        {//第一种：params参数
            name: 'search',
            path: '/search/:keyword',
            // path: '/search',
            component: Search,
            meta: {footerShow: true}
            // props
            /*  
                1. 布尔值写法：params
                2. 对象写法：额外的给路由组件传递一些props
                3. 函数写法：params参数、query参数，通过props传递给路由组件
                porps: ($route)=>{
                    return {
                        keyword: $route.params.keyword,
                        k: $route.query.k
                    }
                }
            */
        },
        {
            name: 'login',
            path: '/login',
            component: Login,
            meta:{footerShow: false}
        },
        {
            path: '/register',
            component: Register,
            meta: {footerShow: false}
        },
        // 重定向 ???
        {
            path: '*',
            component: Home
        }
    ]
})