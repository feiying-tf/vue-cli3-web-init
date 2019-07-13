<template>
  <footer>
    <div class="w foot clearfix">
      <div class="left">
        <p class="us">
          <router-link to="/aboutUs" target="_blank">关于我们</router-link>
          <router-link to="/aboutUs#contact" target="_blank">联系我们</router-link>
        </p>
        <p class="rights">
          Copyright2003-2019 All rights reserved  蜀ICP备11021853号-4  <img src="./guohui.png" alt=""> <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=51050402000237">川公网安备 51050402000237号</a>
        </p>
        <p>
          技术支持：易极科技集团有限公司
        </p>
      </div>
      <div class="right">
        <img src="./foot_logo.png" alt="易酒">
        <p>
          咨询热线欢迎您的来电<br/>
        </p>
        <p>
          028-83200222
        </p>
      </div>
    </div>
  </footer>
</template>


<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';

@Component({

})
export default class Header extends Vue {

}
</script>

<style lang="less" scoped>
footer {
  margin-top: 50px;
  background-color: #2d3237;
}
.foot {
  padding-top: 10px;
  height: 134px;
  font-size: 14px;
  color: #6b6e81;
  text-align: left;
  p {
    line-height: 22px;
    margin: 14px 0;
  }
  .left {
    margin-left: 40px;
    float: left;
  }
  .rights {
    a {
      margin-left: 5px;
      color: #6b6e81;
      display: inline-block;
      vertical-align: middle;
    }
  }
  .right {
    margin-right: 100px;
    float: right;
  }
  .us {
    a {
      color: #6b6e81;
      margin-right: 20px;
    }
    a:hover {
      color: #b2bae1;
    }
  }
}
</style>
