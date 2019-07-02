<template>
  <div class="home w clearfix">
    <div class="left">
      <div class="slide-wrapper" v-if="sliderArr">
        <Slider :slideList="sliderArr"></Slider>
      </div>
      <div class="items-wrapper">
        <h3>最新文章</h3>
        <PageLoading v-if="newsLoading"></PageLoading>
        <div v-else>
          <NewsItem :isMain="true" class="item" v-for="item in newsArr" :key="item.id" :news="item"></NewsItem>
          <NoMoreItem v-if="newsArr && newsArr.length === 0"></NoMoreItem>
          <a-button 
            v-if="newsArr && newsArr.length" 
            :disabled="isDisabled" 
            class="more" 
            :loading="isLoading" 
            type="danger" 
            @click="handleLoadMore">点击加载更多</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Provide } from 'vue-property-decorator';
import Slider from '@/components/slider/index.vue'
import NewsItem from '@/components/newsItem/index.vue'
import Title from '@/components/title/index.vue'
import NoMoreItem from '@/components/nomoreItem/index.vue'
import PageLoading from '@/components/pageLoading/index.vue'

import { fetchSlider } from '@/api/slider.ts'
import { fetchNews } from '@/api/news.ts'
import { SliderAdapt, NewsAdapt } from '@/common/adaptation.ts';
import axios from 'axios'

const queryString = require('query-string');
const NEWSLIMIT = 5;

@Component({
  components: {
    Slider,
    NewsItem,
    Title,
    NoMoreItem,
    PageLoading
  }
})
export default class Home extends Vue {
  // 初始数据可以直接声明为实例的属性
  message: string = 'Hello!'
  isLoading: boolean = false;
  sliderArr: any = [];
  newsArr: any = [];
  businessArr: any = []; // 商机列表
  businessObj: any = {}; // 商机下的类型
  newsTotal = 0; // 记录最新文章的总数
  currentNewsPage = 1; // 记录当前文章的page
  firstBusinessId = ''; // 第一个商机类型的id
  isDisabled = false;
  newsLoading = true;
  businessLoading = true;

  // 获取轮播图
  getSlider () {
    let obj = {
      page: 1,
      limit: 10,
      orderByField: 'crt_time',
      isAsc: 'desc'
    }
    fetchSlider(obj).then(res => {
      let arr = res.data.rows.map((item: any) => {
          return new SliderAdapt(item)
      });
      this.sliderArr = arr.filter((item:any) => {
        return item.netUrl
      })
      console.log('这儿是sliderArr', this.sliderArr);
      this.sliderArr.splice(5);
    })
  }

  // 获取最新文章
  getNews () {
    let obj = {
      page: this.currentNewsPage,
      limit: NEWSLIMIT,
      orderByField: 'crt_time',
      isAsc: 'desc'
    }
    fetchNews(obj).then(res => {
      this.newsLoading = false;
      this.isLoading = false;
      this.newsTotal = res.data.total;
      let arr = res.data.rows.map((item: any) => {
          return new NewsAdapt(item)
      });
      this.newsArr.push(...arr);
      console.log('这儿是this.newsArr', this.newsArr);
      if (this.newsTotal > this.newsArr.length) {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
      }
    }).catch(() => {
      this.newsLoading = false;
    })
  }
  // 加载更多
  handleLoadMore () {
    if (this.newsTotal > this.newsArr.length) {
      this.currentNewsPage++;
      this.isLoading = true;
      this.getNews();
    }
  }

  // computed
  get computedMsg () {
    return 'username: ' + this.message
  }

  // 第三方登录
  thirdLogin () {
    if (location.search) {
      let parsed = queryString.parse(location.search);
      // 此时说明是微信登录
      if (parsed.state === 'weixin') {
        // 暂时先不处理
        
      }
    }
  }

  created () {
    this.getSlider();
    this.getNews();
    this.thirdLogin();
  }
}
</script>

<style lang="less" scoped>
@import '~@/style/util.less';
  .home {
    margin-top: 15px;
    position: relative;
    z-index: 0;
    padding-top: 5px;
    .left {
      .leftPart();
      .items-wrapper {
        h3 {
          text-align: left;
          font-size: 22px;
          font-weight: 400;
          line-height: 60px;
          padding-left: 25px;
          margin-bottom: 0;
        }
        .item:first-child {
          padding-top: 0;
        }
      }
      .more {
        margin-top: 20px;
      }
    }
    .right {
      .rightPart();
      .business {
        margin-bottom: 5px;
        background-color: #fafafa;
      }
      .course {
        img {
          width: 327px;
          height: 163px;
          border-radius: 8px;
          margin-top: 5px;
          margin-left: 17px;
        }
      }
    }
  }
</style>
