<template>
    <div>
      <Header></Header>
      <!-- 路由组件出口地方 -->
      <router-view ></router-view>

      <!-- way1 -->
      <!-- <Footer v-show='$route.path== "/home" || $route.path == "/search"' ></Footer> -->

      <!-- way2 -->
      <Footer v-show='$route.meta.footerShow != false' ></Footer>
    </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  mounted(){
    // 通知vuex发请求，获取数据，存储与仓库当中
    this.$store.dispatch('categoryList');
  }
}
</script>

<style>

</style>