<template>
  <div class="wrapper w clearfix">
    <div class="left">
      <router-view :key="currentRouter"></router-view>
    </div>
    <div class="right">
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { Getter } from 'vuex-class'
import { fetchNews } from '@/api/news.ts'
import { NewsAdapt } from '@/common/adaptation.ts';

// 列表内容
@Component({
  components: {
  }
})
export default class newsDetail extends Vue {

  @Watch('$route')
  routerWatch(to: any, from: any) {
    this.currentRouter = to.fullPath;
    window.scrollTo(0, 0);
  }

  isLoading: boolean = false;
  pageLoading: boolean = true;
  currentRouter = ''
}
</script>

<style lang="less" scoped>
@import '~@/style/util.less';
.wrapper {
  margin-top: 15px;
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
