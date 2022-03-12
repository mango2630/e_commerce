import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
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
export default new VueRouter({
    routes,
    scrollBehavior (to, from, savedPosition) {
        // 滚轮！
        // return desired position
        return {y:0}
    }
})