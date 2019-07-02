<template>
  <div class="wrapper">
    <div class="content">
      <img src="@/assets/404.png" alt="404">
      <p>抱歉！您所访问的页面不存在</p>
      <router-link to="/">请点击这里返回首页</router-link>
    </div>
  </div>
</template>


<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

// 404
@Component({
})
export default class Wrong extends Vue {
  
}
</script>

<style lang="less" scoped>
@hoverColor: #6ebdff;
.wrapper {
  z-index: 100;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  background-color: #fff;
  .content {
    width: 400px;
    height: 200px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    img {
      line-height: 1em;
    }
    p {
      font-size: 16px;
      line-height: 1em;
      margin: 40px 0;
      color: #909090;
    }
    a {
      line-height: 1em;
      color: @hoverColor;
      font-size: 14px;
      &:hover {
        border-bottom: solid 1px @hoverColor;
      }
    }
  }

}

</style>
