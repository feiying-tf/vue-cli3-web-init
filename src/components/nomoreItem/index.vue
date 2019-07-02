<template>
  <div class="np-more">
    <p class="no-data">{{ desc }}<a-icon type="exclamation" /></p>
  </div>
</template>


<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component({
})
export default class NoMoreItem extends Vue {
   @Prop({ type: String, default: '暂无数据'}) readonly desc!: string
}
</script>

<style lang="less" scoped>
.np-more {
  text-align: center;
  .no-data {
    color: #999;
    padding: 20px 0;
  }
}

</style>
