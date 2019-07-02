<template>
  <div class="wrapper center" :style="{background: !isSHowEdit?'#f0f4fb':'#fff'}">
    <div class="content w" v-show="!isSHowEdit">
      <div class="left">
        <img v-if="user && user.headImg" :src="user.headImg" alt="头像">
        <img v-else src="@/assets/mr.png" alt="头像">

        <div class="name">{{user && user.name}}</div>
        <!-- <p class="desc">{{user.description || '暂无相关介绍'}}</p> -->
        <input @focus="handleFocus" v-model="desc" :class="showDescBtn?'waitEdit':''" placeholder="暂无相关介绍" class="desc-input" type="text">
        <div class="edit-input">
          <p v-show="showDescBtn">
            <span @click="handleSave">保存</span><span @click="handleCancel">取消</span>
          </p>
        </div>
      </div>
      <div class="right">
        <div class="fix">
          <span @click="handleFix">
            <a-icon type="form" /> 修改资料
          </span>
        </div>
        <ul>
          <li>昵称：<span>{{(user && user.name) || '未填写'}}</span></li>
          <li>性别：<span>{{(user && user.sex==='man')?'男':(user.sex==='woman'?'女':'其他')}}</span></li>
          <li>职业：<span>{{(user && user.userTitle) || '未填写'}}</span></li>
          <li>生日：<span>{{(user && user.birthday) || '未填写'}}</span></li>
          <li>邮箱：<span>{{(user && user.email) || '未填写'}}</span></li>
          <li>地址：<span>{{(user && user.address) || '未填写'}}</span></li>
        </ul>
      </div>
    </div>
    <ChangeUser @handleReturn="handleReturn" ref="change" :msg="user" v-show="isSHowEdit" class="w"></ChangeUser>
  </div>
</template>


<script lang="ts">
import { Ref, Vue, Component, Prop, Watch, Mixins } from 'vue-property-decorator'
import ChangeUser from './component/changeUser.vue'
import { updateUser } from '@/api/user'
import MixinUser from '@/components/mixin/mixinUser.vue'
import NoMoreItem from '@/components/nomoreItem/index.vue'
import PageLoading from '@/components/pageLoading/index.vue'

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
    ChangeUser,
    NoMoreItem,
    PageLoading
  }
})
export default class Center extends Mixins(MixinUser)  {
  @Getter user:any

  @Ref('change') readonly change!: ChangeUser

  @Watch('$route')
  routerWatch(to: any, from: any) {
    this.currentItem = <string>to.$route.query.type;
  }
  @Watch('user')
  function(value:any) {
    this.desc = value.description;
  }

  currentItem = 'comment';
  isSHowEdit = false;
  desc = '';
  showDescBtn= false; // 编辑介绍的按钮
  collectTab = 'news'

  created () {
    this.currentItem = <string>this.$route.query.type;
    this.desc = this.user && this.user.description;
  }

  // 修改资料
  handleFix () {
    this.isSHowEdit = true;
    this.change.show();
  }
  // 返回
  handleReturn () {
    this.isSHowEdit = false;
  }
  // 编辑介绍
  handleFocus () {
    this.showDescBtn = true;
  }
  // 保存
  handleSave () {
    let description = this.desc.trim()
    let obj = {
      id: this.user.id,
      description: description,
    }
    updateUser(obj).then(res => {
      if (res.status === 200) {
        this.showDescBtn = false;
        let user = {
          ...this.user,
          description: description,
        }
        this.saveUser(user);
      }
    })
  }
  // 取消编辑
  handleCancel () {
    this.desc = this.user.description;
    this.showDescBtn = false;
  }
}
</script>

<style lang="less" scoped>
@import '~@/style/util.less';
.wrapper {
  margin-top: 15px;
  background: #f0f4fb;
  overflow: hidden;
  .content {
    margin-top: 25px;
    height: 350px;
    background-color: #fff;
    display: flex;
    .left {
      padding-top: 30px;
      height: 350px;
      flex: 0 0 270px;
      text-align: center;
      border-right: solid 1px #f0f0f0;
      img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
      }
      .name {
        font-size: 16px;
        line-height: 30px;
        color: #303030;
      }
      .desc {
        line-height: 30px;
        .showPoint();
        font-size: 12px;
        color: #909090;
      }
      .mvp, .business {
        margin: 0 auto;
        margin-top: 10px;
        display: block;
        color: #fff;
        width: 150px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        background-color: #854325;
      }
      .business {
        margin-top: 20px;
        background-color: #0084ff;
      }
      .desc-input {
        margin: 10px 0 5px 0;
        text-align: center;
        padding: 0 10px;
        border: none;
        outline-style: none;
        font-size: 12px;
        color: #909090;
        border-bottom: solid 1px #fff;
        &.waitEdit {
          border-bottom: solid 1px #eee;
        }
      }
      .edit-input {
        height: 20px;
        margin-bottom: 10px;
        color: #909090;
        font-size: 12px;
        span {
          margin: 0 5px;
          cursor: pointer;
          &:hover {
            color: #666;
          }
        }
      }
    }
    .right {
      margin-left: 100px;
      padding: 25px 60px 0 0; 
      flex: 1;
      .fix {
        text-align: right;
        color: #f63756;
        font-size: 16px;
        span {
          cursor: pointer;
        }
      }
      ul {
        margin-top: 20px;
        li {
          margin-right: 30px;
          padding-left: 20px;
          text-align: left;
          display: inline-block;
          position: relative;
          width: 40%;
          height: 50px;
          line-height: 50px;
          .showPoint();
          &::before {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: 0;
            content: '';
            // display: inline-block;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background-color: #909090;
          }
          span {
            color: #909090;
          }
        }
      }
    }
  }
  .view-wrapper {
    // margin: 25px 0;
    margin-top: 25px;
    margin-bottom: 25px;
    display: flex;
    background-color: #fafafa;
    .left {
      flex: 0 0 270px;
      li {
        position: relative;
        cursor: pointer;
        height: 60px;
        line-height: 60px;
        text-align: center;
        color: #303030;
        border-bottom: solid 1px #f5f5f5;
        &.active {
          background: #fff;
        }
        &.active::before {
          position: absolute;
          content: '';
          top: 0;
          left: 0;
          width: 2px;
          height: 60px;
          background-color: #f63756;
        }
      }
    }
    .right {
      padding: 20px 30px 10px;
      flex: 1;
      background: #fff;
      overflow: hidden;
      .page {
        margin-top: 10px;
      }
      .no-data {
        color: #999;
        margin: 20px 0;
      }
    }
  }
}
</style>
