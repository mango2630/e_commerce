import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'
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


// 配置路由
let router = new VueRouter({
    routes,
    scrollBehavior (to, from, savedPosition) {
        // 滚轮！
        // return desired position
        return {y:0}
    }
})

router.beforeEach( async (to, from, next)=>{
    // console.log(to, from);
    console.log(store);
    let userInfo = store.state.user.userInfo.name;

    let token = store.state.user.token;
    if(token){
        // 用户登陆了，不能去login
        if(to.path == '/login'){
            next('/home')
        }else{
            if(userInfo){
                next(); // 用户还在
            }else{
                // 用户不在
                // 派发action，让仓库存储用户信息
                try{
                    await store.dispatch('getUserInfo');
                    next();
                }catch (error){
                    // token 失效，获取不到用户信息，重新登陆
    
                    // do：清除token;重新登陆。
                    await store.dispatch('userLogout');
                    next('/login')
                }
            }
        }
    }else{
        next();
    }
    
})

export default router;