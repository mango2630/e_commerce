// search模块的小仓库
import {reqGetSearchInfo} from '@/api'

// state: 仓库存储数据的地方
const state = {
    searchList: {}
};

// actions: 处理action,书写自己的业务逻辑，处理异步
const actions = {
    // 书写业务逻辑，但是不能修改state
    
    // 获取search模块数据
    async getSearchList(context, params={}){
        // console.log('context', context);
        let res = await reqGetSearchInfo(params)
        console.log('=====', res);
        if(res.code === 200){
            context.commit("GETSEARCHLIST", res.data)
        }
    }
};

// mutations：修改state的唯一手段
const mutations = {
    GETSEARCHLIST(state, value){
        state.searchList = value;
    }
};

// getters: 计算属性，简化仓库数据
const getters = {
    goodsList(state){
        // state: 当前仓库中的stata
        // NOTICE: {}--> undefined ,error
        return state.searchList.goodsList || [];
    },
    attrsList(state){
        return state.searchList.attrsList || [];
    },
    trademarkList(state){
        return state.searchList.trademarkList || [];
    }
}


export default {
    state,
    mutations,
    actions,
    getters
}