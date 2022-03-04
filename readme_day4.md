### 1. 开发Search模块中TypeNav商品分类菜单（过渡动画效果）
1. Search组件 TypeNav 显示与隐藏
2. Home组件 TypeNav 一直显示
3. Search 的 TypeNav 过渡动画
    > 过渡动画 transition

### 2. 三级分类商品列表进行优化
~~~ js
// TypeNav.vue
// 缓存组件
mounted(){
    // 通知vuex发请求，获取数据，存储与仓库当中
    this.$store.dispatch('categoryList');
}
~~~
> 问题：每次都会发请求，性能不好。

解决：放在App.vue里边。

### 3. 合并参数 [params & query]
- Header.vue
- TypeNav.vue

### 4. mock.js模拟数据

- 开发 ListContainer组件 与 Floor组件。
- [mockjs](http://mockjs.com/)
- swiper 插件 【重难点！】
  1. 引包（CSS | JS）
  2. 页面中结构要有
  3. new Swiper() 
  ~~~ shell
  npm install swiper@5
  ~~~
- 最完美解决轮播图方案：watch + nextTick。
  - nextTick：一种生命周期函数。
  - 在下次DOM更新循环结束之后执行延迟回调。
  - 在[修改数据之后]立即使用这个方法，获取更新后的DOM。
  - Vue.nextTick
  - this.$nextTick
  
- 获取DOM：
  - 以前：document.xxx
  - now: ref

### 5. 组件通信的方式？
1. props
2. 自定义事件 @on @emit
3. 全局事件总线 $bus
4. pubsubJS
5. slot 
6. vuex

### 6. search模块开发
1. 先静态页面 + 静态组件拆分
2. 发请求 API
3. vuex
4. 组件获取仓库数据，动态展示数据



