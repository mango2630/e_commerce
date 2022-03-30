// 登录 与 注册

import {reqGetCode, reqRegister, reqLogin, reqUserInfo,reqLogout} from '@/api'
import {setToken, getToken, removeToke} from '@/utils/token'

const state = {
    code: '',
    token: getToken(),
    userInfo: {}
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
            // localStorage.setItem('TOKEN', res.data.token);
            setToken(res.data.token)
            return "ok";
        } else {
            return Promise.reject(new Error("faile"));
        }
    },
    async getUserInfo({commit}){
        let res = await reqUserInfo();
        // console.log('user/index.js-----getUserinfo', res);
        // 进入Home之后派发请求
        if(res.code == 200){
            commit('GETUSERINFO', res.data);
            return 'ok';
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    async userLogout({commit}){
        let res = await reqLogout();
        if(res.code == 200){
            commit('USERLOGOUT')
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    }
}

const mutations = {
    GETCODE(state, value){
        state.code = value;
    },
    USERLOGIN(state, token){
        state.token = token
    },
    GETUSERINFO(state, data){
        state.userInfo = data;
    },
    USERLOGOUT(state){
        // 清楚本地数据
        state.token = {};
        state.userInfo = {};
        removeToke();
    }
}

const getters = {}

export default {
    state,
    actions,
    mutations,
    getters
}