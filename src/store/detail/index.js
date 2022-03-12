import {reqGoodsInfo, reqAddOrUpdateShopCart} from '@/api/index'
import {getUUID} from '@/utils/uuid_token'
const state = {
    goodInfo: {},
    uuid_token: getUUID()
}

const actions = {
    async getGoodsInfo({commit}, skuId){
        let res = await reqGoodsInfo(skuId);
        if(res.code == 200){
            console.log('detail return data', res.data);
            commit('GETGOODSINFO', res.data)
        }
    },

    // 将产品加入到购物车中
    async addOrUpdateShopCart({commit}, {skuId, skuNum}){
        let res = await reqAddOrUpdateShopCart(skuId, skuNum)
        if(res.code == 200){
            return 'OK'
        }else {
            return Promise.reject(new Error('faile'));
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