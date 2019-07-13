<template>
  <div class="slide">
    <a-carousel arrows>
      <div
        slot="prevArrow"
        class="custom-slick-arrow"
        style="left: 10px;zIndex: 1"
      >
        <a-icon type="left" />
      </div>
      <div
        slot="nextArrow"
        class="custom-slick-arrow"
        style="right: 10px"
      >
        <a-icon type="right" />
      </div>
      <!-- <div class="img-wrapper"><h3>1</h3></div>
      <div class="img-wrapper"><h3>2</h3></div>
      <div class="img-wrapper"><h3>3</h3></div>
      <div class="img-wrapper"><h3>4</h3></div> -->
      <div class="img-wrapper" @click.stop.prevent="handleSlider(item.id)" v-for="item in slideList" :key="item.id" :style="{background: `url(${item.netUrl}) no-repeat`, backgroundSize: '818px 353px'}">
        <!-- <img :src="item.netUrl" alt="易酒"> -->
        <p class="title">
          {{item.newsTitle}}
        </p>
      </div>
    </a-carousel>
  </div>
</template>


<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

interface Item {
  id: string;
  newsTitle: string;
  content: string;
}
@Component({

})
export default class Slider extends Vue {
  @Prop(Array) readonly slideList!: Array<Item>

  handleSlider (id:string) {
    this.$router.push(`/newsDetail/${id}`)
    
  }
}
</script>

<style lang="less" scoped>
@import '~@/style/util.less';
  .ant-carousel {
    width: 818px;
    height: 353px;
    .slick-slide {
      position: relative;
      text-align: center;
      height: 160px;
      line-height: 160px;
      background: #364d79;
      overflow: hidden;
    }
  }
  .ant-carousel {
    .custom-slick-arrow {
      width: 35px;
      height: 35px;
      line-height: 35px;
      border-radius: 50%;
      font-size: 20px;
      color: #fff;
      background-color: rgba(31,45,61,.2);
      opacity: 0.3;
    }
    .custom-slick-arrow:before {
      display: none;
    }
    .custom-slick-arrow:hover {
      color: #fff;
      opacity: .5;
      background-color: rgba(31,45,61,.3);
    }
    .slick-slide  h3 {
      color: #fff;
    }
    .slick-slide img {
      height: 353px;
      width: 818px;
    }
    .slick-slide .title {
      padding: 0 15px;
      margin-bottom: 0;
      text-align: left;
      position: absolute;
      width: 100%;
      z-index: 100;
      left: 0;
      bottom: 0px;
      font-size: 18px;
      height: 50px;
      line-height: 50px;
      color: #fff;
      .showPoint();
      // overflow: hidden;
      // white-space: nowrap;
      // text-overflow: ellipsis;
      background: rgba(0, 0, 0, 0.6);
    }
  }
  .img-wrapper {
    position: relative;
    cursor: pointer;
    height: 353px;
    width: 818px;
  }
</style>
