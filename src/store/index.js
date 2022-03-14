import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

// 引入小仓库
import home from './home'
import search from './search';
import detail from './detail';
import shopCart from './shopCart';
import user from './user'

// 对外暴露store类的实例
export default new Vuex.Store({
    // 实现模块化开发
    modules: {
        home, 
        search,
        detail,
        shopCart,
        user
    }
})