<template>
  <div class="loadingWrapper" :style="isMainPage?'padding: 200px 0 100px 0':'padding: 50px 0;'">
    <a-spin size="large" class="page-loading"/>
  </div>
</template>


<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

@Component({
  components: {
  }
})

export default class Channel extends Vue {
  @Prop({type: Boolean, default: false}) readonly isMainPage!: boolean
}
</script>

<style lang="less" scoped>
.loadingWrapper {
  
  text-align: center;
}
</style>
