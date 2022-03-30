# 一、准备工作

## 1. 项目的其他配置

- 项目运行起来，让浏览器自动打开：

  ~~~ json
  -- package.json
  "scripts": {
      "serve": "vue-cli-service serve --open",
      "build": "vue-cli-service build",
      "lint": "vue-cli-service lint"
  },
  ~~~

- 关闭语法检测 lintOnSave

  ~~~ js
  // vue.config.js
  module.exports = {
      lintOnSave: false,
  }
  ~~~

- src文件夹配置别名。

  ~~~ json
  // jsconfig.json
  {
      "compilerOptions": {
          "baseUrl": "./",
          "paths": {
              "@/*":[
                  "src/*"
              ]
          }
      },
      "exclude": [
          "node_modules",
          "dist"
      ]
  }
  ~~~



## 2. 项目路由分析：

- 上中下结构：头部Header + 内容 Content + 页脚 Footer
- 路由组件：
  - Home
  - Login / Register 13700000000 | 111111
  - Search /  Detail / addCartSuccess / ShopCart / Trade / OrderId / PaySuccess
  - Center / MyOrder
- 非路由组件：
  - Header
  - Footer [在首页、搜索页]

# 二、组件开发

## 1. Header & Footer

1. 开发流程：

   - 书写静态页面
   - 拆分组件
   - 获取服务器的数据动态展示
   - 完成相应的动态业务逻辑

2. less 安装 & vue-router 安装

   ~~~ shell
   npm install --save less less-loader@5
   npm install --save vue-router
   ~~~

3. Footer组件显示与隐藏：

   - v-show：只是操作样式
   - v-if: 频繁操作DOM，消耗性能
   - 在Home Search 等组件 显示 Footer组件
   - 在Login Register 隐藏

   ---

   - [路由元信息](https://v3.router.vuejs.org/guide/advanced/meta.html)

     ~~~ vue
     // App.vue
     <Footer v-show='$route.meta.footerShow != false' ></Footer>
     ~~~

     ~~~  js
     // routes.js
     {
         path: '/home',
         component: Home,
         meta:{footerShow: true}
     },
     ~~~

     

## 2. 问题：

1. 编程式路由跳转到当前路由（参数不变），多次执行会抛出NavigationDuplicated的警告错误？

   >最新的vue-router引入promise。

   解决问题：

   ~~~ js
   this.$router.push({
       name: 'search',
       params: {
           keyword: this.keyword,
       },
       query: {
           k: this.keyword.toUpperCase()
       },
   
   },()=>{},()=>{})
   ~~~

   ~~~ js
   let originPush = VueRouter.prototype.push;
   VueRouter.prototype.push = function(location, resolve, reject){
       // console.log(this, location, resolve, reject);
       if(resolve && reject){
           // call || apply区别？？？
           originPush.call(this, location, resolve, reject)
       }else{
           originPush.call(this, location, ()=>{}, ()=>{})
       }
   }
   ~~~

---

## 3. Home 组件

### 3.1 三级联动组件

- 拆分为全局组件

  ~~~ js
  // main.js
  // 三级联动组件 --- 全局组件
  import TypeNav from '@/components/TypeNav'
  // (全局组件名字，哪一个组件)
  Vue.component(TypeNav.name, TypeNav)
  ~~~

- Home / Search / Detail

### 3.2 axios 请求

~~~ shell
npm i axios
~~~

1. 为什么需要进行二次封装aixos?

   > 请求拦截器、响应拦截器

   ~~~ js
   // requestAjax.js
   // 对axios进行二次封装
   import axios from 'axios'
   
   // 1. 利用axios对象的方法create, 创建于给axios实例
   const requests = axios.create({
       // 配置对象
       // 基础路径，发请求的时候，路径当中会出现api
       baseURL: '/api',
       // 代表请求超时时间
       timeout: 5000
   });
   
   // 2. 请求拦截器：在发请求之前，请求拦截器可以检测到
   requests.interceptors.request.use((config)=>{
       // config: 配置对象
       // 对象里面有一个属性很重要，headers请求头
       return config;
   });
   
   // 3. 响应拦截器
   requests.interceptors.response.use((res)=>{
       // 成功的回调函数
       return res.data;
   }, (error)=>{
       // 响应失败的回调函数
       return Promise.reject(new Error('fail'))
   })
   
   export default requests;
   ~~~

2. 接口统一管理

---

### 3.3 nprogress进度条使用

~~~ shell
npm i nprogress
~~~

~~~ js
// 引入进度条
import nprogress from 'nprogress';
// 引入进度条样式
import 'nprogress/nprogress.css'

nprogress.start()；// request
nprogress.done(); // response
~~~

---

### 3.4 VUEX

~~~ shell
npm i vuex
~~~

1. TypeNav 展示数据
2. 完成以及分类动态添加颜色
3. 通过js控制二三级商品分类的显示与隐藏 

   > 路由元信息 meta [isShow].

### 3.5 防抖与节流

- lodash 插件

~~~ js
// TypeNav.js
import throttle from 'lodash/throttle'
changeIndex: throttle(function(index){
    this.currentIndex = index;
}, 50),
~~~

---

### 3.6 ListContainer & Rank & Recommend

- 轮播图

- swiper 插件

- 最完美解决轮播图方案：watch + nextTick。

  - nextTick：一种生命周期函数。

  - **在下次DOM==更新循环结束之后==执行延迟回调。**

  - **在==修改数据之后==立即使用这个方法，获取更新后的DOM。**

  - Vue.nextTick

  - this.$nextTick

### 3.7 Like & Floor & Brand

- 图片划上去放大！

  ~~~ less
  img {
      width: 142px;
      height: 142px;
      transition: all 400ms;
  
      &:hover {
          opacity: 0.8;
          transform: scale(1.1)
      }
  }
  ~~~

### 3.8 Mock.js 数据



## 4. 面试题

### 4.1 $nextTick()

- 将回调推迟到下一个 DOM 更新周期之后执行。

- 在更改了一些数据以等待 DOM 更新后立即使用它。

### 4.2 组件通信

#### 1. props / $emit

- 父组件通过`props`的方式向子组件传递数据.

  > 总结: 
  >
  > - prop 只可以从上一级组件传递到下一级组件（父子组件），即所谓的单向数据流。
  > - 而且 prop 只读，不可被修改，所有修改都会失效并警告。

- 而通过`$emit` 子组件可以向父组件通信。

  `$emit`绑定一个自定义事件, 当这个语句被执行时, 就会将参数arg传递给父组件,父组件通过v-on监听并接收参数。

~~~ vue
// 父组件中
<template>
<div class="section">
    <com-article :articles="articleList" @onEmitIndex="onEmitIndex"></com-article>
    <p>{{currentIndex}}</p>
    </div>
</template>

<script>
    import comArticle from './test/article.vue'
    export default {
        name: 'HelloWorld',
        components: { comArticle },
        data() {
            return {
                currentIndex: -1,
                articleList: ['红楼梦', '西游记', '三国演义']
            }
        },
        methods: {
            onEmitIndex(idx) {
                this.currentIndex = idx
            }
        }
    }
</script>

~~~

~~~ vue
<template>
<div>
    <div v-for="(item, index) in articles" :key="index" @click="emitIndex(index)">{{item}}</div>
    </div>
</template>

<script>
    export default {
        props: ['articles'],
        methods: {
            emitIndex(index) {
                this.$emit('onEmitIndex', index)
            }
        }
    }
</script>

~~~

---

#### 2. `$children` / `$parent`

要注意边界情况，如在`#app`上拿`$parent`得到的是`new Vue()`的实例，在这实例上再拿`$parent`得到的是`undefined`，而在最底层的子组件拿`$children`是个空数组。也要注意得到`$parent`和`$children`的值不一样，`$children` 的值是数组，而`$parent`是个对象

---

#### 3. provide / inject

组件中通过`provide`来提供变量, 然后再子组件中通过`inject`来注入变量。

~~~ js
// A.vue
export default {
    name: "A",
    provide: {
        for: "demo"
    },
}
~~~

~~~ js
// B.vue
export default {
    name: "B",
    inject: ['for'],
    data() {
        return {
            demo: this.for
        }
    }
}
~~~

---

#### 4. ref / refs

`ref`：如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就指向组件实例，可以通过实例直接调用组件的方法或访问数据。

~~~ js
// 子组件 A.vue
export default {
    data () {
        return {
            name: 'Vue.js'
        }
    },
    methods: {
        sayHello () {
            console.log('hello')
        }
    }
}
~~~

~~~ vue
// 父组件 app.vue

<template>
	<component-a ref="comA"></component-a>
</template>
<script>
    export default {
        mounted () {
            const comA = this.$refs.comA;
            console.log(comA.name);  // Vue.js
            comA.sayHello();  // hello
        }
    }
</script>
~~~

---

#### 5. eventBus

`eventBus` 又称为事件总线，在vue中可以使用它来作为沟通桥梁的概念, 就像是所有组件共用相同的事件中心，可以向该中心注册发送事件或接收事件， 所以组件都可以通知其他组件。

eventBus也有不方便之处, 当项目较大,就容易造成难以维护的灾难。

---

1. 首先需要创建一个事件总线并将其导出, 以便其他模块可以使用或者监听它.

   ~~~ js
   // event-bus.js
   
   import Vue from 'vue'
   export const EventBus = new Vue()
   ~~~

2. 发送事件。

   ~~~ vue
   <template>
   <div>
       <show-num-com></show-num-com>
       <addition-num-com></addition-num-com>
       </div>
   </template>
   
   <script>
       import showNumCom from './showNum.vue'
       import additionNumCom from './additionNum.vue'
       export default {
           components: { showNumCom, additionNumCom }
       }
   </script>
   ~~~

   ~~~ vue
   // addtionNum.vue 中发送事件
   <template>
   <div>
       <button @click="additionHandle">+加法器</button>    
       </div>
   </template>
   
   <script>
       import {EventBus} from './event-bus.js'
       console.log(EventBus)
       export default {
           data(){
               return{
                   num:1
               }
           },
           methods:{
               additionHandle(){
                   EventBus.$emit('addition', {
                       num:this.num++
                   })
               }
           }
       }
   </script>
   
   ~~~

3. 接收事件。

   ~~~ vue
   // showNum.vue 中接收事件
   
   <template>
   <div>计算和: {{count}}</div>
   </template>
   
   <script>
       import { EventBus } from './event-bus.js'
       export default {
           data() {
               return {
                   count: 0
               }
           },
           mounted() {
               EventBus.$on('addition', param => {
                   this.count = this.count + param.num;
               })
           }
       }
   </script>
   
   ~~~

4. 移出事件监听者。

   ~~~ js
   import { eventBus } from 'event-bus.js'
   EventBus.$off('addition', {})
   ~~~

---

#### 6. vuex

#### 7. localStorage / sessionStorage

#### 8. $$attrs / $listeners

- 隔代关系。

~~~vue
// app.vue
// index.vue

<template>
<div>
    <child-com1
                :name="name"
                :age="age"
                :gender="gender"
                :height="height"
                title="程序员成长指北"
                ></child-com1>
    </div>
</template>
<script>
    const childCom1 = () => import("./childCom1.vue");
    export default {
        components: { childCom1 },
        data() {
            return {
                name: "zhang",
                age: "18",
                gender: "女",
                height: "158"
            };
        }
    };
</script>

~~~

~~~ vue
// childCom1.vue

<template class="border">
<div>
    <p>name: {{ name}}</p>
    <p>childCom1的$attrs: {{ $attrs }}</p>
    <child-com2 v-bind="$attrs"></child-com2>
    </div>
</template>
<script>
    const childCom2 = () => import("./childCom2.vue");
    export default {
        components: {
            childCom2
        },
        inheritAttrs: false, // 可以关闭自动挂载到组件根元素上的没有在props声明的属性
        props: {
            name: String // name作为props属性绑定
        },
        created() {
            console.log(this.$attrs);
            // { "age": "18", "gender": "女", "height": "158", "title": "程序员成长指北" }
        }
    };
</script>
~~~

~~~ vue
// childCom2.vue

<template>
<div class="border">
    <p>age: {{ age}}</p>
    <p>childCom2: {{ $attrs }}</p>
    </div>
</template>
<script>

    export default {
        inheritAttrs: false,
        props: {
            age: String
        },
        created() {
            console.log(this.$attrs); 
            // { "gender": "女", "height": "158", "title": "程序员成长指北" }
        }
    };
</script>
~~~

---

## 5. Search 组件

1. 先静态页面 + 静态组件拆分

2. 发请求 API

3. vuex

4. 组件获取仓库数据，动态展示数据

----

### 5.1 面包屑导航

- 动态开发面包屑中的分类名

- 动态开发面包屑中的关键字
  - 兄弟组件通信
  - props: 父子
  - 自定义事件：子父
  - 插槽：父子
  - Pubsub-js 
  - 全局事件组件 √

  - 全局事件组件
  - 配置全局事件总线

- SearchSelector 组件。

---

### 5.2 处理排序

处理 综合 & 价格 排序。

通过计算属性处理。

### 5.3 分页

1. 分页器展示，需要哪些数据？
   - 一共多少条数据 total
   - 当前是第几页 pageNo
   - 每一页展示多少条数据 pageSize
   - 分页器连续的页码数：**5**|7（好看）continues
   - totalPage 一共多少页

2. 连续页码的起始数据、结束数据。

3. v-for Array|number|object|string

4. 注意问题：
   - start end ...
   - start end data

5. 分页器添加类名

---

## 6. Detail 组件

### 6.1 ZOOM放大镜



## 7. login & register



