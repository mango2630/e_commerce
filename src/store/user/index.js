// 登录 与 注册

import {reqGetCode, reqRegister,reqLogin} from '@/api'

const state = {
    code: '',
    token: ''
}

const actions = {
    // 获取验证码
    async getCode({commit}, phone){
        let res = await reqGetCode(phone);
        if(res.code == 200){
            commit('GETCODE', res.data)
        }
    },
    // 用户注册
    async userRegister({commit}, data){
        let res = await reqRegister(data);
        if(res.code == 200){
            return 'ok'
        }
    },
    // 用户登录
    async userLogin({ commit }, data) {
        /* 
        name: "19407010204"
        nickName: "19407010204"
        token: "20bebc4fa83740bf83f9cd2cb1efeb32"
        userId: 17193
        */
        let res = await reqLogin(data);
        //服务器下发token，用户唯一标识符(uuid)
        //将来经常通过带token找服务器要用户信息进行展示
        if (res.code == 200) {
             //用户已经登录成功且获取到token
            commit("USERLOGIN", res.data.token);
            //持久化存储token
            // setToken(result.data.token);
            return "ok";
        } else {
            return Promise.reject(new Error("faile"));
        }
    },

}

const mutations = {
    GETCODE(state, value){
        state.code = value;
    },
    USERLOGIN(state, token){
        state.token = token
    }
}

const getters = {}

export default {
    state,
    actions,
    mutations,
    getters
}