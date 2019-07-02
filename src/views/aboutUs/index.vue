<template>
  <div class="wrapper w">
    这儿是关于我们
  </div>
</template>


<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

// 关于我们
@Component({
  components: {
  }
})
export default class AboutUs extends Vue {
  mounted () {
    let contact = this.$el.querySelector('#contact');
    if (this.$route.fullPath.includes('contact')) {
      window.scroll(0, 2000)
    }
  }
}
</script>

<style lang="less" scoped>
  .wrapper {
    margin-top: 15px;
    p {
      text-align: justify;
      margin-bottom: 1em;
      line-height: 1.5em;
    }
  }
</style>
