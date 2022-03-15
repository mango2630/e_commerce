import {reqAddressInfo, reqOrderInfo} from '@/api'

const state = {
    address: [],
    order: {}
}

const actions = {
    // 获取用户地址信息
    async getUserAddress({commit}){
        let res = await reqAddressInfo()

        if(res.code == 200){
            // console.log(res.data);
            commit('GETUSERADDRESS', res.data)
            return 'ok'
        }
    },
    // 获取商品清单数据
    async getOrderInfo({commit}){
        let res = await reqOrderInfo()

        if(res.code == 200){
            // console.log(res.data);
            commit('GETORDERINFO', res.data)
            return 'ok'
        }
    }
}

const mutations = {
    GETUSERADDRESS(state, info){
        state.address = info
    },
    GETORDERINFO(state, info){
        state.order = info
    }
}

export default{
    state,
    actions,
    mutations
}

/* 
137000000000
111111
*/