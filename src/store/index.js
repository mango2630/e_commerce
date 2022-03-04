import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

// 引入小仓库
import home from './home'
import search from './search';

// 对外暴露store类的实例
export default new Vuex.Store({
    // 实现模块化开发
    modules: {
        home, 
        search
    }
})