<template>
  <div class="app-download">
    <img class="code" src="./appcode.png" alt="易酒">
    <div class="right">
      <p>
        扫一扫下载App
      </p>
      <a :href="iosUrl" target="_blank">
        <img class="ios" src="./app_download_applink.png" alt="">
      </a>
      
      <a :href="androidUrl" target="_blank">
        <img class="android" src="./app_download_android.png" alt="">
      </a>
    </div>
  </div>
</template>


<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';

@Component
export default class Header extends Vue {
  iosUrl = process.env.VUE_APP_DOWNLOAD_IOS
  androidUrl = process.env.VUE_APP_DOWNLOAD_ANDROID
}
</script>

<style lang="less" scoped>
  .app-download {
    width: 315px;
    padding: 17px 0;
    overflow: hidden;
    background-color: #f7f5f5;
    .code {
      float: left;
      margin-left: 17px;
      width: 116px;
      height: 116px;
    }
    .right {
      float: left;
      margin-left: 26px;
      p {
        margin-top: 5px;
        color: #666;
        font-size: 14px;
        line-height: 1em;
      }
      img {
        display: block;
        margin-top: 10px;
        height: 35px;
      }
    }
  }
</style>
