<template>
  <div class="wrapper">
    <Title content="最新商机"></Title>
    <PageLoading v-if="pageLoading"></PageLoading>
    <div v-else>
      <router-link v-for="item in newsArr" :key="item.id" :to="{path: `/businessDetail/${item.id}`}" :target="isOpenInNew?'_blank':'_self'">
        <div class="img-wrapper" v-if="item.imgPath">
          <img v-lazy="item.imgPath" alt="易酒">
        </div>
        <img v-else src="@/assets/default.png" alt="易酒">
        <p class="content">{{item.title}}</p>
      </router-link>
      <NoMoreItem v-if="newsArr.length === 0"></NoMoreItem>
    </div>
  </div>
</template>


<script lang="ts">
// import Vue from 'vue'
// import Component from 'vue-class-component';
import AppDownLoad from './component/app-download.vue'
import Title from '@/components/title/index.vue'
import NoMoreItem from '@/components/nomoreItem/index.vue'
import PageLoading from '@/components/pageLoading/index.vue'
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { LastBusinessProxyAdapt } from '@/common/adaptation.ts';
import { Getter } from 'vuex-class'
import { fetchNews } from '@/api/news.ts'
import { fetchBusiness } from '@/api/business.ts'

interface NewsItem {
  id: string;
  imgPath: string;
  title: string;
}

function getDefaultProps () {
  return [{
    id: '1234',
    imgPath: 'http://yijiu-app.oss-cn-beijing.aliyuncs.com/yjapp/20190604/b8d3a7d0016f4a9d8430fa1cb284686b.png',
    title: '<茅台>抓好有机肥生产项目建设 建西南地区一流企业 用心用力助推循环产投公司进一步发展'
  }, {
    id: '2341',
    imgPath: 'http://yijiu-app.oss-cn-beijing.aliyuncs.com/yjapp/20190604/ed76707e1b644b29a0a38419033920f5.jpg',
    title: '每天喝多少葡萄酒才算是适量？'
  }]
}


@Component({
  components: {
    Title,
    NoMoreItem,
    PageLoading
  }
})

export default class LastBusinessProxy extends Vue {
  // @Prop({type: Array, default: getDefaultProps}) readonly newsArr!: Array<NewsItem>
  @Prop({default: true}) readonly isOpenInNew!: boolean
  @Getter newsType:any
  @Watch ('newsType') // 当复制当前链接到新窗口的时候，created里面的逻辑就不会执行，会执行这儿的watch
  function (value:any) {
    this.getHeadLines();
  }
  newsArr:Array<NewsItem> = []
  pageLoading = true;

  getHeadLines () {
    // let obj = {
    //   itemsId: <string>this.newsType[0].id,
    //   page: 1,
    //   limit: 7,
    //   orderByField: 'crt_time',
    //   isAsc: 'desc',
    // }
    let obj = {
      page: 1,
      limit: 7,
      orderByField: 'crt_time',
      isAsc: 'desc'
    }
    fetchBusiness(obj).then(res => {
      this.pageLoading = false;
      this.newsArr = res.data.rows.map((item: any) => {
        return new LastBusinessProxyAdapt(item)
      })
    }).catch(() => {
      this.pageLoading = false;
    });
  }

  created () {
    // 如果存在this.newsType
    if (this.newsType) {
      this.getHeadLines();
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/style/util.less';
.wrapper {
  text-align: left;
  padding-bottom: 10px;
  overflow: hidden;
  width: 348px;
  background: #F0F0F0;
  a {
    display: block;
    width: 280px;
    margin: 0 auto;
    margin-top: 10px;
    img {
      width: 280px;
    }
    p {
      margin-left: 20px;
      .limitTwoLines();
      text-align: justify;
      margin-top: 5px;
      font-size: 14px;
      line-height: 1.8;
      color: #303030;
    }
  }
  .img-wrapper {
    width: 280px;
    height: 160px;
    overflow: hidden;
    img {
      width: 280px;
    }
  }
}
</style>
