
import requests from "./request";
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