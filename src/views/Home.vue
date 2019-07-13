<template>
  <div class="home w clearfix">
    <div class="left">
      <div class="slide-wrapper" v-if="sliderArr">
        <div class="loading-wrapper" v-if="sliderLoading">
          <PageLoading></PageLoading>
        </div>
        <Slider v-else :slideList="sliderArr"></Slider>
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
    <div class="right float_r">
      <div class="business">
        <Title content="商机" :isShowMore="true" :toRouter="{
            path: '/businessList',
            query: {
              id: firstBusinessId
            }
          }"></Title>
        <PageLoading v-if="businessLoading"></PageLoading>
        <div v-else>
          <BusinessItem v-for="item in businessArr" :msg="item" :key="item.id" :businessObj="businessObj"></BusinessItem>
          <NoMoreItem v-if="businessArr && businessArr.length === 0"></NoMoreItem>
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
import BusinessItem from '@/components/businessItem/index.vue'
import NoMoreItem from '@/components/nomoreItem/index.vue'
import PageLoading from '@/components/pageLoading/index.vue'

import { fetchSlider } from '@/api/slider.ts'
import { fetchNews } from '@/api/news.ts'
import { fetchBusiness, fetchBusinessType } from '@/api/business.ts'
import { thirdGetUid, login } from '@/api/login'
import { setToken,getToken } from '@/utils/auth.ts'
import { fetchUser } from '@/api/user.ts';
import { UserAdapt } from '@/common/adaptation.ts';
import { searchToParams } from '@/utils/utils.ts'

import { SliderAdapt, NewsAdapt, BusinessAdapt } from '@/common/adaptation.ts';
import axios from 'axios'
import storage from 'good-storage'
import {
  Mutation
} from 'vuex-class'

const USER = '__user__'
// const queryString = require('query-string');
const NEWSLIMIT = 11;

@Component({
  components: {
    Slider,
    NewsItem,
    Title,
    BusinessItem,
    NoMoreItem,
    PageLoading
  }
})
export default class Home extends Vue {
  @Mutation('SET_USER') setUser:any
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
  sliderLoading = true

  // 获取轮播图
  getSlider () {
    let obj = {
      page: 1,
      limit: 10,
      orderByField: 'crt_time',
      isAsc: 'desc'
    }
    this.sliderLoading = true;
    fetchSlider(obj).then(res => {
      this.sliderLoading = false;
      let arr = res.data.rows.map((item: any) => {
          return new SliderAdapt(item)
      });
      this.sliderArr = arr.filter((item:any) => {
        return item.netUrl
      })
      this.sliderArr.splice(5);
    }).catch(err => {
      this.sliderLoading = false;
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
      if (this.newsTotal > this.newsArr.length) {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
      }
    }).catch(() => {
      this.newsLoading = false;
    })
  }

  // 获取商机
  getBusiness () {
    let obj = {
      page: 1,
      limit: 11,
      orderByField: 'crt_time',
      isAsc: 'desc'
    }
    fetchBusiness(obj).then(res => {
      this.businessLoading = false;
      this.businessArr = res.data.rows.map((item: any) => {
          return new BusinessAdapt(item)
      });
    }).catch(() => {
      this.businessLoading = false;
    })
  }

  // 获取商机栏目
  getBusinessType () {
    let obj = {
      itemType: '2'
    }
    fetchBusinessType(obj).then(res => {
      this.firstBusinessId = res.data.itemsTree[0].id;
      // 将businessObj设置为{id: name}这种格式，方便商机列表显示类型
      res.data.itemsTree.forEach((item: any) => {
          this.$set(this.businessObj, item.id, item.code);
      });
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
    if (location.search && !getToken() ) {
      let parsed:any = searchToParams(location.search);
      // 此时说明是微信登录
      if (parsed.state === 'weixin') {
        // 通过thirdGetUid获取uid
        let code = parsed.code
        thirdGetUid(code).then((res:any)=> {
          // 通过login获取access_token
          let obj = {
            username: res.data,
            password: res.data,
            grant_type: 'password',
            auth_type: 'wechat',
          }
          login(obj).then((res:any) => {        
            setToken('Bearer ' + res['access_token']);
            this.$message.success('登录成功', 1);
            setTimeout(() => {
              // 获取用户信息
              fetchUser().then(res => {
                if (res.status === 200) {
                  let user = new UserAdapt(res.data)
                  // 保存到vuex里面
                  this.setUser(user);
                  // 保存到localStorage里面
                  storage.set(USER, user);
                }
              })
              this.$router.push('/');
            }, 1000)
          })
        })
      }
    }
  }

  created () {
    this.getSlider();
    this.getNews();
    this.getBusiness();
    this.getBusinessType();
    this.thirdLogin();
  }
}
</script>

<style lang="less" scoped>
@import '~@/style/util.less';

.home {
  position: relative;
  z-index: 0;
  padding-top: 15px;
  .left {
    .leftPart();
    .loading-wrapper {
      height: 353px;
      width: 818px;
      padding-top: 110px;
    }
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
