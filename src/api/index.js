import requests from "./requestAjax";
import mockRequests from './mockAjax'

// 三级联动接口
// /api/product/getBaseCategoryList GET 无参数
export const reqCategoryList = () => {
    // 发请求
    return requests({
        url: '/product/getBaseCategoryList',
        method: 'GET'
    })
}

// 获取banner
export const reqGetBannerList = () => {
    return mockRequests({
        url: '/banner',
        method: 'GET'
    })
}

// 获取floor数据
export const reqFloorList = () => mockRequests.get('/floor')

// 获取搜索模块数据 /api/list post
export const reqGetSearchInfo = (params) => {
    return requests({
        url: '/list',
        method: 'POST',
        data: params
    })
}

// 获取商品详情信息 /api/item/{skuId} get
export const reqGoodsInfo = (skuId) => {
    return requests({
        url: `/item/${skuId}`,
        method: 'GET'
    })
}

// 将产品加入到购物车中
// api/cart/addToCart/{skuId}/{skuNum} POST
export const reqAddOrUpdateShopCart = (skuId, skuNum)=>{
    return requests({
        url: `/cart/addToCart/${skuId}/${skuNum}`,
        method: 'POST'
    })
}

// 获取购物车列表数据接口
// /cart/cartList get
export const reqCartList = () => {
    return requests({
        url: '/cart/cartList',
        method: 'GET'
    })
}

// 删除购物车产品的接口
// /api/cart/deleteCart/{skuId} delete
export const reqDeleteCartById = (skuId) => {
    return requests({
        url: `/cart/deleteCart/${skuId}`,
        method: 'DELETE'
    })
}

// 修改产品的选中状态
export const reqUpdateCheckedById = (skuId, isChecked)=>{
    return requests({
        url: `/cart/checkCart/${skuId}/${isChecked}`,
        method: 'GET'
    })
}

//获取验证码
//URL:/api/user/passport/sendCode/{phone}  method:get
export const reqGetCode = (phone) => {
    return requests({
        url: `/user/passport/sendCode/${phone}`,
        method: 'GET'
    })
}

// 用户注册
// /user/passport/register post
export const reqRegister = (data) => {
    return requests({
        url: '/user/passport/register',
        data,
        method: 'POST'
    })
}

// 用户登录
// /user/passport/login post
export const reqLogin = (data) => {
    return requests({
        url: '/user/passport/login',
        data,
        method: 'POST'
    })
}

// 获取用户信息 带token
// /user/passport/auth/getUserInfo method:get
export const reqUserInfo = () => {
    return requests({
        url: '/user/passport/auth/getUserInfo',
        method: 'GET'
    })
}

// 退出登录
export const reqLogout = ()=>{
    return requests({
        url: '/user/passport/logout',
        method: 'GET'
    })
}

// 获取用户地址信息
export const reqAddressInfo = () => {
    return requests({
        url: '/user/userAddress/auth/findUserAddressList',
        method: 'GET'
    })
}

// 获取商品清单
export const reqOrderInfo = () => {
    return requests({
        url: '/order/auth/trade',
        method: 'GET'
    })
}

// 提交订单
export const reqSubmitOrder = (tradeNo, data) => {
    return requests({
        url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
        data,
        method: 'POST'
    })
}

// 获取订单支付信息
export const reqPayInfo = (orderId) => {
    return requests({
        url: `/payment/weixin/createNative/${orderId}`,
        method: 'GET'
    })
}