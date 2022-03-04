// 对axios进行二次封装
import axios from 'axios'

// 引入进度条
import nprogress from 'nprogress';
// 引入进度条样式
import 'nprogress/nprogress.css'
// console.log('@@', nprogress);


// 1. 利用axios对象的方法create, 创建于给axios实例
const requests = axios.create({
    // 配置对象
    // 基础路径，发请求的时候，路径当中会出现api
    baseURL: '/mock',
    // 代表请求超时时间
    timeout: 5000
});

// 2. 请求拦截器：在发请求之前，请求拦截器可以检测到
requests.interceptors.request.use((config)=>{
    // config: 配置对象
    // 对象里面有一个属性很重要，headers请求头

    nprogress.start()
    return config;
});

// 3. 响应拦截器
requests.interceptors.response.use((res)=>{
    // 成功的回调函数

    nprogress.done()
    return res.data
}, (error)=>{
    // 响应失败的回调函数
    return Promise.reject(new Error('fail'))
})

export default requests;
