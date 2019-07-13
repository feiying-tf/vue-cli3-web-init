<template>
  <div class="wrapper center" :style="{background: !isSHowEdit?'#f0f4fb':'#fff'}">
    这儿是个人中心
  </div>
</template>


<script lang="ts">
import { Ref, Vue, Component, Prop, Watch, Mixins } from 'vue-property-decorator'

import {
  State,
  Getter,
  Action,
  Mutation,
  namespace
} from 'vuex-class'

let COLLECTLIMIT = 5;
let ORDERBYFIELD = 'crt_time';
let ISASC = 'desc';
let COLLTYPE = '11';

// 联系我们
@Component({
  components: {
  }
})
export default class Center extends Mixins()  {
  @Getter user:any
}
</script>

<style lang="less" scoped>
@import '~@/style/util.less';
.wrapper {
  margin-top: 15px;
  background: #f0f4fb;
  overflow: hidden;
}
</style>
