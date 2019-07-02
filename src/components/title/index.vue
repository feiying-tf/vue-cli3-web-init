<template>
  <div class="wrapper" v-if="content">
    <h3>{{content}}</h3>
    <div class="more" v-if="isShowMore">
      <router-link :to="toRouter">查看更多</router-link>    
    </div>
  </div>
</template>


<script lang="ts">
// import Vue from 'vue'
// import Component from 'vue-class-component';
import AppDownLoad from './component/app-download.vue'
import { Vue, Component, Prop } from 'vue-property-decorator'

// interface Msg {
//   content: string;
//   isShowMore?: boolean;
//   toRouter?: any
// }

@Component({
})
export default class Title extends Vue {
  @Prop(String) readonly content!: string
  @Prop({default: false}) readonly isShowMore!: boolean
  @Prop(Object) readonly toRouter!: any

}
</script>

<style lang="less" scoped>
.wrapper {
  position: relative;
  padding-left: 40px;
  height: 50px;
  line-height: 50px;
  text-align: left;
  overflow: hidden;
  &::before {
    position: absolute;
    top: 15px;
    left: 20px;
    content: '';
    display: inline-block;
    width: 5px;
    height: 20px;
    background: #f63756;
  }
  h3 {
    display: inline-block;
    font-size: 20px;
    color: #303030;
    font-weight: 400;
  }
  .more {
    float: right;
    margin-right: 20px;
    margin-top: 10px;
    line-height: 1em;
    padding: 7px 10px;
    font-size: 15px;
    border: 1px solid #f63756;
    border-radius: 4px;
    float: right;
    a {
      color: #f63756!important;
    }
  }
}

</style>
