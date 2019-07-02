<template>
  <div class="item-wrapper change-user">
    <header><span @click="handleReturn" :class="isLoading?'disable':''"><a-icon type="left" />返回我的个人中心主页</span></header>
    <div class="img-wrapper">
      <p class="tip">个人信息完善</p>
      
      <!-- <img v-if="msg && msg.headImg" v-lazy="msg.headImg" alt="头像">
      <img v-else src="@/assets/mr.png" alt="头像"> -->
      <div class="upload-wrapper" @mouseleave.stop.prevent="showUpload = false" @mouseenter.stop.prevent="showUpload = true" >
        <a-upload
          name="avatar"
          listType="picture-card"
          class="avatar-uploader"
          :showUploadList="false"
          :beforeUpload="beforeUpload"
          :customRequest="customRequest"
          @change="handleChange"
        >
          <img class="head-img" v-if="imageUrl" :src="imageUrl" alt="头像" />
          <img class="head-img" v-else src="@/assets/mr.png" alt="头像">
          <div class="showUpload" v-show="showUpload">
              <a-icon :type="loading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">上传</div>
          </div>
        </a-upload>
      </div>


      <p class="edit-head-img">
        <span>点击更换头像</span>
      </p>
    </div>
    
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item label="昵称" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
        <a-input
          placeholder="请输入昵称" 
          v-decorator="[
            'name',
            { rules: [
              { required: true, message: '请输入昵称!'}, 
              {min: 2, message: '昵称在2-20位之间'},
              {max: 20, message: '昵称在2-20位之间'}] 
            }
          ]"
        />
      </a-form-item>

      <a-form-item label="性别" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
        <a-radio-group v-decorator="['sex']">
          <a-radio value="man">
            男
          </a-radio>
          <a-radio value="woman">
            女
          </a-radio>
          <a-radio value="unknown">
            保密
          </a-radio>
        </a-radio-group>
      </a-form-item>
    
      <a-form-item label="出生日期" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
        <a-date-picker
          v-decorator="['birthday', config]"
          show-time
          format="YYYY-MM-DD"
        />
      </a-form-item>

      <a-form-item label="职业" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
        <a-input
          placeholder="请输入职业" 
          v-decorator="[
            'userTitle',
            { rules: [
              {required: true, message: '请输入职业!'}, 
              {min: 2, message: '职业在2-20位之间'},
              {max: 20, message: '职业在2-20位之间'}] 
            }
          ]"
        />
      </a-form-item>

      <a-form-item label="地址" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
        <a-input
          placeholder="请输入地址" 
          v-decorator="[
            'address',
            { rules: [
              {required: true, message: '请输入地址!'}, 
              {min: 2, message: '地址在2-40位之间'},
              {max: 40, message: '地址在2-40位之间'}] 
            }
          ]"
        />
      </a-form-item>

      <a-form-item label="邮箱" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
        <a-input
          placeholder="请输入邮箱" 
          v-decorator="[
            'email',
            {
              rules: [{
                type: 'email', message: '无效邮箱!',
              }, {
                required: true, message: '请输入邮箱!',
              }]
            }
          ]"
        />
      </a-form-item>

      <a-form-item>
        <div class="save-wrapper">
          <a-button type="primary" html-type="submit" :loading="isLoading">
            保存
          </a-button>
        </div>
      </a-form-item>
    </a-form>
  </div>
</template>


<script lang="ts">
import { Vue, Component, Prop, Emit, Mixins } from 'vue-property-decorator'
import { updateUser, fetchUser } from '@/api/user'
import { UserAdapt } from '@/common/adaptation.ts';
import storage from 'good-storage'
import { upload } from '@/api/upload'
import MixinUser from '@/components/mixin/mixinUser.vue'

import {
  State,
  Getter,
  Action,
  Mutation,
  namespace
} from 'vuex-class'

var moment = require('moment');
const USER = '__user__'

function getBase64 (img:any, callback:any) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

@Component({
})
export default class ChangeUser extends Mixins(MixinUser) {
  @Mutation('SET_USER') setUser:any
  @Prop(Object) readonly msg!: any
  @Emit('handleReturn')
  handleReturn() {
  }

  config = {
    rules: [{ type: 'object', required: true, message: '请选择出生日期' }],
  }
  form:any = null;
  isLoading = false;
  loading = false;
  imageUrl = '';
  showUpload = false;
  typeArr = ['name', 'sex', 'birthday', 'userTitle', 'address', 'email']

  created () {
    this.form = this.$form.createForm(this);  
  }

  show () {
    setTimeout(() => {
      let keys = Object.keys(this.msg);
      keys.forEach(key => {
        if (this.typeArr.indexOf(key) > -1 && key !== 'birthday' ) {
          this.form.setFieldsValue({
            [key]: this.msg[key]
          })
        }
      })
      if (this.msg.birthday) {
        this.form.setFieldsValue({
          birthday: moment( this.msg.birthday, 'YYYY-MM-DD')
        })
      }
      this.imageUrl = this.msg.headImg;
    }, 20)
  }

  // 对发送数据进行处理
  changeToSend () {
    interface Obj {
      id: string;
      [prop: string]:any
    }
    let obj:Obj = {
      id: this.msg.id
    }
    let formObj = this.form.getFieldsValue();
    let keys = Object.keys(formObj);
    keys.forEach(key => {
      // 由于birthday返回的是moment对象，所有先处理非对象的情况
      if (typeof formObj[key] !== 'object' && formObj[key].trim() !== this.msg[key]) {
        obj[key] = formObj[key].trim();
      }
    })
    let birthday = moment(formObj.birthday).format('YYYY-MM-DD hh:mm:ss');
    if ( birthday !== this.msg.birthday) {
      obj.birthday = birthday;
    }
    return obj;
  }

  handleSubmit () {
    let that = this;
    this.form.validateFields((err:Error, values:any) => {
      if (err) {
        return;
      } else {
        // 获取表单里面所有的数据，然后分别与this.msg对应的属性进行比较
        let obj = that.changeToSend();
        this.isLoading = true;

        updateUser(obj).then(res => {
          this.$message.success('保存成功', 1);
          this.isLoading = false;
          // 修改成功，那么再次获取一次用户信息然后进行保存
          fetchUser().then(res => {
            if (res.status === 200) {
              let user = new UserAdapt(res.data)
              // 保存到vuex里面
              // this.setUser(user);
              // // 保存到localStorage里面
              // storage.set(USER, user);
              this.saveUser(user);
            }
          })
        }).catch(err => {
          this.isLoading = false;
        })
      }
    });
  }

  customRequest (data:any) {
    const formData = new FormData();
    formData.append('file', data.file);
    this.loading = true
    upload(formData).then((res:any) => {
      this.$message.success('保存成功', 1);
      this.loading = false;
      this.imageUrl = res.data;
      // 保存到vuex里面

      let obj = JSON.parse(JSON.stringify(this.msg));
      obj.headImg = res.data;
      // 通过接口保存头像
      let userObj = {
        id: this.msg.id,
        attr1: res.data,
      }
      updateUser(userObj);
      this.saveUser(obj);
    }).catch(err => {
      this.loading = false;
    })
  }

  handleChange (info:any) {
    // if (info.file.status === 'uploading') {
    //   this.loading = true
    //   return
    // }
    // if (info.file.status === 'done') {
    //   // Get this url from response in real world.
    //   getBase64(info.file.originFileObj, (imageUrl:any) => {
    //     this.imageUrl = imageUrl
    //     this.loading = false
    //   })
    // }
  }

  beforeUpload (file:any) {
    const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJPG) {
      this.$message.error('只只支持jpg、png格式的图片')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      this.$message.error('图片必须小于2M')
    }
    return isJPG && isLt2M
  }
}
</script>

<style lang="less" scoped>
@import '~@/style/util.less';
@hoverColor: #6ebdff;
.item-wrapper {
  text-align: left;
  header {
    span {
      cursor: pointer;
      color: #bbb;
      &:hover {
        color: #aaa;
      }
      &.disable {
        cursor: not-allowed;
        color: #ccc;
      }
    }
  }
  .img-wrapper {
    margin-top: 30px;
    text-align: center;
    .tip {
      margin-bottom: 30px;
      color: #333;
    }
    img {
      width: 80px;
      height: 80px;
    }
    .edit-head-img {
      font-size: 12px;
      margin-top: 20px;
      color: #333;
      span {
        // cursor: pointer;
      }
    }
  }
  .save-wrapper {
    text-align: center;
  }
  .showUpload {
    padding-top: 18px;
    position: absolute;
    border-radius: 50%;
    width: 80px;
    height: 80px;
    left: 0;
    top: 0;
    color: #ccc;
    background: rgba(0, 0, 0, .3);
  }
  .head-img {
    border-radius: 50%;
  }
  .upload-wrapper {
    width: 80px;
    height: 80px;
    margin: 0 auto;
  }
}

</style>
