<template>
  <div class="company">
    <img v-if="msg.userHeaderImg" v-lazy="msg.userHeaderImg" alt="易酒">
    <img v-else src="@/assets/mr.png" alt="易酒">
    <span class="name">{{msg.crtUserName}}</span>
    <span v-if="msg.crtUserAuthState === '10'">
      <!-- <a-icon class="icon" :component="MessageSvg" /> -->
      <img class="mark" src="./mark.png" alt="">已认证
    </span>
    <span class="time">{{msg.updTime}}</span>
  </div>
</template>


<script lang="ts">
import AppDownLoad from './component/app-download.vue'
import { Vue, Component, Prop } from 'vue-property-decorator'
// import MessageSvg from '@/assets/icon/renzheng.svg'

interface Msg {
  id?: string;
  title?: string; // 商机title
  userHeaderImg?: string; // 用户头像
  crtUserName?: string; // 联系人
  updTime?: string; // 更新时间
  [prop:string]: any;
}

@Component({
})
export default class BaseMsg extends Vue {
  @Prop(Object) readonly msg!: Msg
  // MessageSvg = MessageSvg;
}
</script>

<style lang="less" scoped>
@import '~@/style/util.less';
@hoverColor: #6ebdff;
  .company {
    margin: 10px 0;
    height: 40px;
    line-height: 40px;
    img {
      vertical-align: middle;
      margin-right: 10px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    span {
      font-size: 14px;
      color: #BBBBBB;
    }
    .name {
      margin-right: 6px;
    }
    .icon {
      margin-right: 5px;
      font-size: 14px;
      color: #bfbfbf;
    }
    .time {
      margin-left: 20px;
    }
    .mark {
      margin-right: 5px;
      width: 17px;
      height: 13px;
    }
  }
</style>
