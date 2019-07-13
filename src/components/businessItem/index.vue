<template>
  <div class="wrapper clearfix">
    <div class="company clearfix">
      <img v-if="msg.img" v-lazy="msg.img" alt="易酒">
      <img v-else src="@/assets/mr.png" alt="易酒">
      <div class="desc">
        <p>{{msg.crtUserName}}</p>
        <p class="time">{{msg.crtTime}}</p>
      </div>
      
    </div>
    
    <p class="title">
      <router-link :to="{
        path: `/businessDetail/${msg.id}`
      }">{{msg.title}}</router-link>
    </p>
    <p class="type">{{ businessObj[msg.itemsId] }}</p>
  </div>
</template>


<script lang="ts">
// import Vue from 'vue'
// import Component from 'vue-class-component';
import AppDownLoad from './component/app-download.vue'
import { Vue, Component, Prop } from 'vue-property-decorator'

interface Msg {
  id: string;
  itemsId: string;
  title: string;
  contactsName: string;
  crtUserName: string;
  img: string;
  crtTime:string;
  type: string; // 0是招商信息 1是招聘求职
}

interface BusinessObj {
  [type: string]: string
}
@Component({
})
export default class BusinessItem extends Vue {
  @Prop(Object) readonly msg!: Msg
  @Prop(Object) readonly businessObj!: BusinessObj
  // @Prop(String) readonly content!: string
}
</script>

<style lang="less" scoped>
// @import '~@/style/util.less';
.limitTwoLines {
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /*3表示只显示3行*/
  /* autoprefixer: ignore next */
  -webkit-box-orient: vertical;
  /* autoprefixer: on */
}
@hoverColor: #6ebdff;
  .wrapper {
    padding: 0 0 10px 20px;
    border-bottom: solid 1px #efefef;
    text-align: left;
    .company {
      padding-top: 15px;
      overflow: hidden;
      img {
        float: left;
        width: 53px;
        height: 53px;
        border-radius: 50%;
      }
      .desc {
        // padding-top: 10px;
        overflow: hidden;
        margin-left: 63px;
        font-size: 16px;
        color: #303030;
        p {
          margin-top: 8px;
          line-height: 1em;
          margin-bottom: 0;
        }
        .time {
          font-size: 12px;
          color: #777;
        }
      }
    }
    .title {
      padding-left: 20px;
      margin: 10px 10px 10px 0;
      line-height: 1.5em;
      font-size: 14px;
      text-align: justify;
      .limitTwoLines();
      a {
        color: #777777;
      }
      &:hover {
        a {
          color: @hoverColor;
        }
      }
    }
    .type {
      padding-left: 20px;
      font-size: 12px;
      line-height: 1em;
      color: #f63756;
      margin-bottom: 0!important;
      display: inline-block;
    }
  }

</style>
