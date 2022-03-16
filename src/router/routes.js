// 引入路由组件
// import Home from '@/pages/Home/index.vue'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center' // 个人中心
import MyOrder from '@/pages/Center/MyOrder'
import GroupOrder from '@/pages/Center/GroupOrder'

// 路由懒加载
const Home =  () => import('@/pages/Home')

export default [
    {
        path: '/center',
        component: Center,
        name: 'center',
        meta: {isShow: true},
        children: [
            {
                path: 'myorder',
                component: MyOrder
            },
            {
                path: 'grouporder',
                component: GroupOrder
            },
            {
                path: '/center',
                redirect: '/center/myorder'
            }
        ]
    },
    {
        path: '/paysuccess',
        component: PaySuccess,
        name: 'paysuccess',
        meta: {isShow: true}
    },
    {
        path: '/pay',
        component: Pay,
        name: 'pay',
        meta: {isShow: true},
        beforeEnter: (to, from, next) => {
            console.log('##frompath', from.path);
            // 必须来自 trade
            if(from.path == '/trade'){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        path: '/trade',
        component: Trade,
        name: 'trade',
        meta: {isShow: true},
        beforeEnter: (to, from, next) => {
            // ...
            if(from.path == '/shopcart'){
                next()
            }else{
                next(false)
            }
        }
    },
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