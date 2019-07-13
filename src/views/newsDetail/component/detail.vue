<template>
  <div class="detail course-detail">
    <share :config="config" v-if="showShare"></share>
    <a-spin v-if="pageLoading" size="large" class="page-loading"/>
    <div v-else class="main">
      <div class="head">
        <h3 class="title">
          {{detail.newsTitle}}
        </h3>
        <p class="author">{{detail.author}}</p>
        <p class="msg">
          <time>{{detail.updTime}}</time> <span class="read">阅读{{detail.readCount}}</span> <span class="repeat">评论{{detail.repCount}}</span>
        </p>
      </div>
      <div class="content">
        <div v-html="detail.newsContext">
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { Getter } from 'vuex-class'
import { fetchNewsDetail } from '@/api/news.ts'
import { NewsDetailAdapt } from '@/common/adaptation.ts';

interface Detail {
  newsTitle?: string
}
// 列表内容
@Component({
})
export default class BusinessItem extends Vue {
  @Watch('$route')
  routerWatch(to: any, from: any) {
    // this.getDetail();
  }
  config = {
    url: '',
    sites: [
      'weibo',
      // 'qq',
      'wechat',
      'qzone',
    ],
    wechatQrcodeTitle: '微信扫一扫',
    wechatQrcodeHelper: '',
    source              : '', // 来源（QQ空间会用到）, 默认读取head标签：<meta name="site" content="http://overtrue" />
    title               : '', // 标题，默认读取 document.title 或者 <meta name="title" content="share.js" />
    description         : '', // 描述, 默认读取head标签：<meta name="description" content="PHP弱类型的实现原理分析" />
    // image               : '这儿是image', // 图片, 默认取网页中第一个img标
  }
  detail:Detail = {}
  pageLoading: boolean = true; // 
  currenId = ''; // 当前类型的id
  showShare = false;

  created () {
    this.getDetail();
  }
  getDetail () {
    fetchNewsDetail(this.$route.params.id).then(res => {
      this.pageLoading = false;
      this.detail = new NewsDetailAdapt(res.data);
      this.config.source = <string>this.detail.newsTitle;
      this.config.title = <string>this.detail.newsTitle;
      this.config.url = <string>location.href;
      this.showShare = true;
    })
  }
}
</script>

<style lang="less" scoped>
@import '~@/style/util.less';
.detail {
  padding: 0 40px;
  .page-loading {
    .pageLoading();
  }
  .main {
    text-align: left;
    .head {
      margin-bottom: 30px;
      .title {
        width: 100%;
        font-size: 28px;
        line-height: 1.5em;
        padding-left: 30px;
        color: #333333;
      }
      .author {
        margin: 35px 0 30px 0;
        line-height: 1em;
        font-size: 14px;
        color: #303030;
        padding-left: 30px;
      }
      .msg {
        overflow: hidden;
        margin-top: 20px;
        font-size: 14px;
        color: #BBBBBB;
        padding-left: 30px;
        // float: left;
        span {
          padding-left: 30px;
        }
      }

    }
    .content {
      overflow: hidden;
      text-indent: 2em;
      text-align: justify;
      color: #444;
      font-size: 16px;
      line-height: 2;
    }
  }
}

</style>
