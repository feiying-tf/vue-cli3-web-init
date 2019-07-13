<template>
  <a-locale-provider :locale="locale">
    <div id="app">
      <header>
        <Header></Header>
      </header>
      <div class="router-wrapper">
        <router-view/>
      </div>
      <Footer></Footer>
    </div>
  </a-locale-provider>
</template>

<script lang="ts">
import Header from '@/components/header/index.vue';
import Footer from '@/components/footer/index.vue'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import { Component, Vue, Watch } from 'vue-property-decorator';
@Component({
  components: {
    Header,
    Footer
  }
})
export default class Home extends Vue {
  locale = zhCN
}
</script>

<style lang="less" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-width: 1200px;
  header {
    position: relative;
    z-index: 10;
    border-bottom: solid 1px #F0F0F0;
  }
}
.router-wrapper {
  min-height: calc(100vh - 257px);
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
