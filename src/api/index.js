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