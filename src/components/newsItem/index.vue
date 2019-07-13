<template>
  <div class="wrapper clearfix">
    <router-link class="img-wrapper" :to="{path: `/newsDetail/${news.id}`}" target="_blank">
      <img v-if="news.netUrl" class="float_l left" v-lazy="news.netUrl" alt="易酒">
      <img v-else class="float_l left" src="@/assets/default.png" alt="易酒">
    </router-link>
    
    <div class="right">
      <router-link :to="{path: `/newsDetail/${news.id}`}" target="_blank">{{news.newsTitle}}</router-link>
      <div class="content">
        {{news.abstract}}
      </div>

      <p>
        <span>来自：{{news.author}}</span>
        <span><a-icon class="icon" type="clock-circle" />{{news.updTime}}</span>
        <span><a-icon class="icon" type="eye" />{{news.readCount}}</span>
      </p>

      <span v-if="isMain" class="mark">
        {{ news.tags }}
      </span>
    </div>
  </div>
</template>


<script lang="ts">
// import Vue from 'vue'
// import Component from 'vue-class-component';
import AppDownLoad from './component/app-download.vue'
import { Vue, Component, Prop } from 'vue-property-decorator'

interface Msg {
  id: string;
  newsTitle: string;
  author: string;
  netUrl: string;
  updTime: string;
  readCount: number;
  newsContext: string;
  abstract: string;
  tags?: string;
}

@Component({
})
export default class NewsItem extends Vue {
  @Prop(Object) readonly news?: Msg
  @Prop({
    type: Boolean,
    default: false
  }) readonly isMain?: boolean

  // msg = {
  //   id: '015f4d58a0c6469aa027717d2cab85b3',
  //   newsTitle: '第二届中国国际名酒文化节即将开幕，三大亮点抢先看！',
  //   author: '樊福祥',
  //   netUrl: 'http://yijiu-app.oss-cn-beijing.aliyuncs.com/yjapp/20181211/0a9bde264d6b4021a5ffceee93afcdd4.jpg',
  //   updTime: '2018-12-11 12:12:47',
  //   readCount: 10,
  // }
}
</script>

<style lang="less" scoped>
  // @import '~@/style/util.less';
  .showPoint {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  @hoverColor: #6ebdff;
  .wrapper {
    // height: 167px;
    text-align: left;
    padding: 20px 0;
    border-bottom: solid 1px #eee;
  }
  .left {
    width: 248px;
    height: 143px;
  }
  .right {
    position: relative;
    margin-left: 248px;
    padding-left: 10px;
    height: 143px;
    a {
      padding-top: 5px;
      display: block;
      font-size: 18px;
      color: #303030;
      line-height: 2;
      .showPoint();
      &:hover {
        color: @hoverColor;
      }
    }
    p {
      
      color: #a7a7a7;
      font-size: 12px;
      span {
        margin-right: 30px;
        .icon {
          margin-right: 3px;
        }
      }
    }
    .content {
      margin: 15px 0 40px 0;
      line-height: 1em;
      color: #787878;
      font-size: 13px;
      .showPoint();
    }
    .mark {
      position: absolute;
      right: 30px;
      bottom: -10px;
      font-size: 12px;
      color: #f63756;
    }
  }

</style>
