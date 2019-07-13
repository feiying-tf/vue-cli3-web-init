<template>
  <div class="wrapper">
    <div class="content">
      <div class="img-wrapper w">
        <img class="phone" src="./img/phone.png" alt="">
        <img class="text" src="./img/text.png" alt="">
        <a :href="iosUrl" class="ios-wrapper" target="_blank">
          <img class="ios" src="./img/ios.png" alt="">
        </a>
        <a :href="androidUrl" class="android-wrapper" target="_blank">
          <img class="android" src="./img/android.png" alt="">
        </a>
        <img class="appcode" src="./img/appcode.png" alt="">
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
})
export default class DownLoad extends Vue {
  iosUrl = process.env.VUE_APP_DOWNLOAD_IOS
  androidUrl = process.env.VUE_APP_DOWNLOAD_ANDROID
}
</script>

<style lang="less" scoped>
@hoverColor: #6ebdff;
.position (@left, @top) {
  position: absolute;
  left: @left;
  top: @top;
}
.wrapper {
  .content {
    height: 622px;
    background: url('./img/bg.png') no-repeat center center;
    .img-wrapper {
      position: relative;
      .phone {
        .position(10px, 50px);
      }
      .text {
        .position(620px, 140px);
      }
      .ios-wrapper, .android-wrapper {
        cursor: pointer;
      }
      .ios-wrapper {
        .position(610px, 370px);
      }
      .android-wrapper {
        .position(740px, 370px);
      }
      .appcode {
        .position(940px, 370px);
        width: 87px;
      }
    }
  }
}

</style>
