<template>
  <div class="wrapper w clearfix">
    <div class="left">
      <router-view :key="currentRouter"></router-view>
    </div>
    <div class="right">
      <HeadlineArticle :isOpenInNew="false"></HeadlineArticle>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import HeadlineArticle from '@/components/headlineArticle/index.vue';
import { navObj } from '@/common/common.ts';
import { Getter } from 'vuex-class'
import { fetchNews } from '@/api/news.ts'
import { NewsAdapt } from '@/common/adaptation.ts';

// 列表内容
@Component({
  components: {
    HeadlineArticle
  }
})
export default class BusinessItem extends Vue {

  @Watch('$route')
  routerWatch(to: any, from: any) {
    this.currentRouter = to.fullPath;
    window.scrollTo(0, 0);
  }

  navObj = navObj; 
  isLoading: boolean = false;
  pageLoading: boolean = true;
  currentRouter = ''
}
</script>

<style lang="less" scoped>
@import '~@/style/util.less';
.wrapper {
  .left {
    .leftPart();
    margin-top: 28px;
  }
  .right {
    .rightPart();
    margin-top: 28px;
  }
}

</style>
