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
