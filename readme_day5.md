### 1. search模块开发
1. 先静态页面 + 静态组件拆分
2. 发请求 API
3. vuex
4. 组件获取仓库数据，动态展示数据

### 2. 面包屑
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

### 3. 处理排序（销量、价格...）
order: "1:desc"

1. 类名active问题。
~~~ html
 <li class="active">
      <a href="#">综合</a>
  </li>
  <li>
      <a href="#">价格⬆</a>
  </li>
~~~
通过 order 属性值判断，谁应该有类名。

2. 谁应该有箭头。

### 4. 分页

分页、轮播图。

1. 分页器展示，需要哪些数据？
   - 一共多少条数据 total
   - 当前是第几夜 pageNo
   - 每一页展示多少条数据 pageSize
   - 分页器连续的页码数：5|7（好看）continues
   - total 一共多少页
2. 连续页码的起始数据、结束数据。
3. v-for Array|number|object|string
4. 注意问题：
  - start end ...
  - start end data
5. 分页器添加类名


### 5. 产品的详情页
1. 静态组件（注册路由组件）
2. 发请求
3. vuex
4. 动态显示

---
1. 属性：点谁谁高亮！！
---

当点击商品的图片的时候，跳转到详情页，并且路由跳转带商品id。
params传参。


#### 5.1 问题
1. 如何控制滚轮开始在顶端？
   - vue-router 的 滚动行为。
   - [scroll Behavior](https://v3.router.vuejs.org/guide/advanced/scroll-behavior.html#async-scrolling)
2. getters undefined问题


#### 5.2 ZOOM放大镜
1. porps三种写法？？
2. undefined .... skuImageList..
3. swiper 使用
4. 点谁谁加 边框
5. offsetX ......
6. 练习！！！！！

干的事：
1. 传参请求
2. 放大镜图片、轮播图图片
3. 属性展示

#### 5.3 ImageList 
1. $nextTick
  - 在修改数据之后立即使用这个方法。

2. 兄弟传参
   zoome 与 ImageList 之间传递Image
   - Pubsub
   - 自定义事件（子给父）
   - 全局事件总线（兄弟）

3. Swiper

### 加入购物车

1. 加入购物车按钮
   - 路由跳转之前发请求
   - 成功路由跳转与参数传递
   - 浏览器存储共呢个：HTML5新增；本地存储和会话存储。
     - 本地存储：持久化的 （5M）。
     - 会话存储：并非持久化。
     - 存储的为：字符串。

2. 购物车
3. nanoid uuid 临时游客身份
   uuidv4()
   utils --- 放工具
   if(store.state.detail.uuid_token){
        config.headers.userTempId = store.state.detail.uuid_token;
    }
4. 修改产品个数
5. 删除购物车产品
---

1. 删除选中的全部商品
2. 全选状态

### 登录 注册
1. 静态组件
2. 

