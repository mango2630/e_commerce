import { reqCartList } from "@/api"

const state = {
    cartList: []
}

const actions = {
    async getCartList({commit}){
        let res = await reqCartList();
        console.log('cart data', res);
        if(res.code == 200){
            commit('GETCARTLIST', res.data)
        }
    }
}

const mutations = {
    GETCARTLIST(state, data){
        state.cartList = data[0].cartInfoList || [];
    }
}

const getters = {}

export default{
    state,
    actions,
    mutations,
    getters
}