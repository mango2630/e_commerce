import Mock from 'mockjs'

import banner from './banner.json'
import floor from './floor.json'

// webpack默认对外暴露的：图片、JSON数据格式
Mock.mock("/mock/banner", {
    code: 200,
    data: banner
})

Mock.mock("/mock/floor", {
    code: 200,
    data: floor
})