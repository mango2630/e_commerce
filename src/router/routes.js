// 引入路由组件
import Home from '@/pages/Home/index.vue'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'


export default [
    {
        path: '/shopcart',
        component: ShopCart,
        name: 'shopcart',
        meta: {isShow: true}
    },
    {
        path: '/addcartsuccess',
        component: AddCartSuccess,
        name: 'addcartsuccess',
        meta: {isShow: true}
    },
    {
        path: '/detail/:skuId',
        component: Detail,
        meta: {footerShow: true}
    },
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