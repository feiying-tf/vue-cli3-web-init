<template>
  <div class="wrapper w clearfix">
    <h1 class="float_l">
      <router-link to="/">产品名全国酒类咨询商务平台</router-link>
    </h1>
    <ul class="float_l">
      <li>
        <router-link to="/businessList" target="_blank">替换</router-link>
      </li>
    </ul>
    <div class="float_r right">
      <div class="app-dowload-enter" @mouseenter="handleMouseEnter('download')" @mouseleave="handleMouseLeave('download')">
        <!-- <router-link to="/download">
          <a-icon class="icon" type="mobile" />
          APP下载
        </router-link> -->
        <a-icon class="icon" type="mobile" />
        <span>APP下载</span>
        <transition name="show">
          <AppDownLoad v-show="showDownloadCode"></AppDownLoad>
        </transition>
      </div>
      <div class="wechat"  @mouseenter="handleMouseEnter('wechat')" @mouseleave="handleMouseLeave('wechat')">
        <a-icon class="icon-wechat" type="wechat" />
        <span style="font-size: 14px;">关注</span>
        <transition name="show">
          <img v-show="showWechat" src="./component/weixin_ewm.jpg" alt="产品名">
        </transition>
      </div>
      <router-link v-if="!showCenter" to="/login">登录</router-link>
      <router-link v-if="!showCenter" to="/register">注册</router-link>
      <div v-if="showCenter" class="user-center" @mouseenter="showCenterItem=true" @mouseleave="showCenterItem=false">
        <router-link :to="{path: '/center', query: {type: 'comment'}}">
          <img class="head-img" v-if="user && user.headImg" :src="user.headImg" alt="个人中心">
          <img class="head-img" v-else src="@/assets/mr.png" alt="个人中心">

          <a-icon type="caret-down" class="center-icon" />
        </router-link>
        <ul class="center-item" v-show="showCenterItem">
          <li> <router-link :to="{path: '/center', query: {type: 'comment'}}" target="_blank">个人中心</router-link> </li>
          <li><a @click.stop.prevent="logout" href="#">退出登录</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import AppDownLoad from './component/app-download.vue'
import { fetchNewsType } from '@/api/news.ts';
import { getToken, removeToken } from '@/utils/auth';
import storage from 'good-storage'

// import { mapMutations } from 'vuex';
import {
  State,
  Getter,
  Action,
  Mutation,
  namespace
} from 'vuex-class'

interface Item {
  id: string;
  code: string;
}

@Component({
  components: {
    AppDownLoad
  }
})
export default class Header extends Vue {
  @Mutation('SET_NEWSTYPE') setNewsType:any
  @Getter user:any

  @Watch ('user') // 当复制当前链接到新窗口的时候，created里面的逻辑就不会执行，会执行这儿的watch
  function (value:any) {
    if (value) {
      this.showCenter = true;
    } else {
      this.showCenter = false;
    }
  }

  showItems = false;
  showDownloadCode = false;
  showWechat = false;
  showCenterItem = false;
  showCenter = false;
  itemList: Array<Item> = [];
  userImg = '';

  created () {
    this.getNewsType();
    if (getToken()) {
      this.showCenter = true;
    } else {
      this.showCenter = false;
    }
  }

  mounted () {
    
  }

  // 获取新闻栏目列表
  getNewsType () {
    let obj = {
      itemType: '1'
    }
    fetchNewsType(obj).then(res => {
      // 将文创踢出来
      this.itemList =  res.data.itemsTree.filter((item:any) => {
        return item.code !== '文创'
      })
      this.setNewsType(this.itemList);
    })
  }

  handleMouseEnter (type: string):void {
    if (type === 'items') {
      this.showItems = true;
    } else if (type === 'download') {
      this.showDownloadCode = true;
    } else if (type === 'wechat') {
      this.showWechat = true;
    }
  }

  handleMouseLeave(type: string):void {
    if (type === 'items') {
      this.showItems = false;
    } else if (type === 'download') {
      this.showDownloadCode = false;
    } else if (type === 'wechat') {
      this.showWechat = false;
    }
  }

  logout () {
    let _this = this;
    this.$confirm({
      title: '确认退出登录吗?',
      content: '退出登录后将在一秒钟后跳往首页',
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            removeToken();
            storage.clear();
            _this.$router.push('/');
            location.reload();
          }, 1000);
        }).catch(() => console.log('Oops errors!'));
      },
      onCancel() {},
    });
  }
}
</script>

<style lang="less" scoped>
@import '~@/style/util.less';

// variable
@hoverColor: #00bcd4;
@headerHeight: 72px;
@headerColor: #303030;
// mixin
.picPosition {
  position: absolute;
  left: -20px;
}

.wrapper {
  height: 72px;
  h1 {
    // display: inline;
    margin-right: 10px;
    // width: 180px;
    // height: @headerHeight;
    a {
      display: inline-block;
      vertical-align: top;
      width: 180px;
      height: @headerHeight;
      font-size: 0;
      background: url('./header_logo.png') no-repeat;
    }
  }
  ul {
    .items-icon {
      margin-left: 5px;
      font-size: 12px;
      color: gray;
    }
    li {
      font-family: microsoft yahei;
      display: inline-block;
      vertical-align: middle;
      font-size: 16px;
      color: @headerColor;
      height: @headerHeight;
      
      &:hover {
        color: @hoverColor;
        .items-icon {
          margin-left: 5px;
          font-size: 12px;
          color: @hoverColor;
        }
        a {
          display: inline-block;
          color: @hoverColor;
        }
      }
      &:first-child {
        text-align: center;
        // line-height: @headerHeight;
        span {
          cursor: pointer;
          padding: 0 20px;
          display: inline-block;
          line-height: @headerHeight;
        }
      }
    }
    li > a {
      padding: 0 30px;
      display: inline-block;
      line-height: @headerHeight;
      color: @headerColor;
    }

    .items-wrapper {
      position: relative;
      section {
        padding: 10px 0;
        position: absolute;
        z-index: 100;
        width: 200px;
        top: @headerHeight;
        left: -60px;
        box-shadow: 0 0 1px 2px rgba(100, 100, 100, .1);
        background-color: #fff;
        a {
          line-height: 1em;
          display: inline-block;
          font-size: 16px;
          width: 93px;
          padding: 10px 0;
          color: @headerColor;
          &:hover {
            color: @hoverColor;
          }
          &.router-link-exact-active {
            color: @hoverColor;
            pointer-events: none;
          }
        }
      }
    }
    .show-enter, .show-leave-to {
      opacity: 0;
    }
    .show-enter-active, .show-leave-active {
      transition: opacity .2s;
    }
    .show-enter-to, .show-leave {
      opacity: 1;
    }
    
  }
  .right {
    margin-right: 120px;
    a {
      font-size: 14px;
      display: inline-block;
      color: #303030;
      line-height: @headerHeight;
      &:hover {
        color: @hoverColor;
      }
    }
    & > a {
      margin-left: 15px;
    }
    & > span {
      margin-left: 15px;
    }
    .icon,.icon-wechat {
      font-size: 16px;
    }
    .icon-wechat {
      font-size: 18px;
    }
    .app-dowload-enter {
      position: relative;
      line-height: @headerHeight;
      display: inline-block;
      .app-download {
        .picPosition();
        top: @headerHeight;
      }
    }
  }
  .wechat {
    margin-left: 15px;
    display: inline-block;
    position: relative;
    span {
      margin-left: 3px;
    }
    img {
      .picPosition();
      top: 25px;
      width: 100px;      
    }
  }
  .user-center  {
    margin-left: 20px;
    height: 73px;
    position: relative;
    display: inline-block;
    img {
      cursor: pointer;
      width: 40px;
      height: 40px;
      border-radius: solid 50% 20px;
    }
    .center-icon {
      margin-left: 5px;
      color: #bbb;
    }
    ul {
      padding: 5px 0;
      position: absolute;
      top: 70px;
      left: 20px;
      transform: translateX(-50%);
      width: 120px;
      background-color: #fff;
      box-shadow: 0 0 4px rgba(0, 0, 0, .3);
      li {
        cursor: pointer;
        text-align: center;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        color: #333;
        a {
          line-height: 40px;
          padding: 0;
          font-size: 16px;
          color: #333;
        }
        &:hover {
          color: @hoverColor;
          a {
            color: @hoverColor;
          }
        }
      }
    }
  }
  .head-img {
    border-radius: 50%;
    vertical-align: middle;
  }
}

</style>
