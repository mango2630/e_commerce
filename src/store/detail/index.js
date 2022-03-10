import {reqGoodsInfo} from '@/api/index'

const state = {
    goodInfo: {}
}

const actions = {
    async getGoodsInfo({commit}, skuId){
        let res = await reqGoodsInfo(skuId);
        if(res.code == 200){
            console.log('detail return data', res.data);
            commit('GETGOODSINFO', res.data)
        }
    }
}

const mutations = {
    GETGOODSINFO(state, goodInfo){
        state.goodInfo = goodInfo;
    }
}

const getters = {
    categoryView(state){
        // 服务器数据没回来前，初始状态为空对象！
        return state.goodInfo.categoryView || {};
    },
    skuInfo(state){
        return state.goodInfo.skuInfo || {};
    },
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList || [];
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}