import { reqCategoryList, reqGetBannerList, reqFloorList } from "@/api";

// state: 仓库存储数据的地方
const state = {
    categoryList: [],
    bannerList: [],
    floorList: []
};

// actions: 处理action,书写自己的业务逻辑，处理异步
const actions = {
    async categoryList({commit}){ // 解构赋值：context.commit
        let res = await reqCategoryList();
        if(res.code === 200){
            commit('CATEGORYLIST', res.data)
        }
    },
    // 获取首页轮播图的数据
    async getBannerList({commit}){
        let res = await reqGetBannerList();
        // console.log(res);
        if(res.code === 200){
            commit('GETBANNERLIST', res.data)
        }
    },
    async getFloorList({commit}){
        let res = await reqFloorList();
        console.log('++', res.data);
        if(res.code === 200){
            commit('GETFLOORLIST', res.data)
        }
    }
};

// mutations：修改state的唯一手段
const mutations = {
    CATEGORYLIST(state, value){
        state.categoryList = value
    },
    GETBANNERLIST(state, value){
        state.bannerList = value;
    },
    GETFLOORLIST(state, value){
        state.floorList = value;
    },
};

// getters: 计算属性，简化仓库数据
const getters = {}


export default {
    state,
    mutations,
    actions,
    getters
}