<template>
  <div class="wrapper" v-if="itemList.length">
    <Title content="频道"></Title>
    <PageLoading v-if="pageLoading"></PageLoading>
    <div v-else>
      <router-link v-for="(item, index) in itemList" :key="index" :to="{path:`/contentList/${item.id}`}">
        {{item.code}}
      </router-link>
      <NoMoreItem v-if="itemList.length === 0"></NoMoreItem>
    </div>
  </div>
</template>


<script lang="ts">
import AppDownLoad from './component/app-download.vue'
import Title from '@/components/title/index.vue'
import { Vue, Component, Prop } from 'vue-property-decorator'
import { navObj } from '@/common/common.ts';
import NoMoreItem from '@/components/nomoreItem/index.vue'
import PageLoading from '@/components/pageLoading/index.vue'
import {
  Getter,
} from 'vuex-class'

interface Item {
  name: string;
  type: string;
}

@Component({
  components: {
    Title,
    NoMoreItem,
    PageLoading
  }
})
export default class Channel extends Vue {
  @Prop(String) readonly content!: string
  @Prop({default: false}) readonly isShowMore!: boolean
  @Prop(String) readonly toRouter!: string

  @Getter newsType:any

  get itemList () {
    this.pageLoading = false;
    return this.newsType;
  }
  pageLoading = true;
  // itemList: Array<Item> = [
  //   { name: navObj['headlines'], type: 'headlines' },
  //   { name: navObj['activity'], type: 'activity' },
  //   { name: navObj['marketing'], type: 'marketing' },
  //   { name: navObj['judge'], type: 'judge' },
  //   { name: navObj['supervise'], type: 'supervise' },
  //   { name: navObj['culture'], type: 'culture' },
  //   { name: navObj['company'], type: 'company' },
  //   { name: navObj['thigh'], type: 'thigh' },
  //   { name: navObj['data'], type: 'data' },
  //   { name: navObj['wiki'], type: 'wiki' },
  //   { name: navObj['industry'], type: 'industry' },
  //   { name: navObj['report'], type: 'report' },
  //   { name: navObj['technology'], type: 'technology' },
  //   { name: navObj['bigshot'], type: 'bigshot' },
  // ]
}
</script>

<style lang="less" scoped>
.wrapper {
  padding-bottom: 10px;
  overflow: hidden;
  width: 348px;
  background: #F0F0F0;
  a {
    float: left;
    font-size: 16px;
    color: #f63756;
    // float: left;
    padding-left: 30px;
    line-height: 60px;
    &:hover {
      font-weight: 700;
    }
    &.router-link-exact-active {
      font-weight: 700;
      pointer-events: none;
    }
  }
}
</style>
