import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from "@/api"

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
    },
    async deleteCartListBySkuId({commit}, skuId){
        let res = await reqDeleteCartById(skuId);

        if(res == 200){
            return 'OK'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 修改某个产品的状态
    async updateCheckedById({commit}, {skuId, isChecked}){
        let res = await reqUpdateCheckedById(skuId, isChecked);
        console.log('checked++', res);
        if(res.code === 200){
            console.log('ischecked-----');
            return 'ok'
        }else{
            return Promise(new Error('faile'))
        }
    },
    // 删除全部勾选的产品
    deleteAllCheckedCart(context){
        let promiseAll = []
        console.log(context);
        console.log(context.state.cartList);
        context.state.cartList.forEach(cart => {
            console.log(cart);
            if(cart.isChecked == 1){
                let promise = context.dispatch('deleteCartListBySkuId', cart.skuId)
                promiseAll.push(promise)
            }
        })
        console.log(Promise.all(promiseAll));
        return Promise.all(promiseAll)
    },
    // 修改所有产品的状态
    updateAllCartChecked(context, type){
        context.state.cartList.forEach(cart => {
            context.dispatch('updateCheckedById', {
                skuId: cart.skuId,
                isChecked: type
            })
        })
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