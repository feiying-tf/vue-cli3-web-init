<template>
  <div class="wrapper login">
    <div class="content">
      <div class="title">
        <span class="tab1" :class="currentTab==='tab1'?'active':''" @click="handleTab('tab1')">
          短信登录
        </span>
        <span class="tab2" :class="currentTab==='tab2'?'active':''" @click="handleTab('tab2')">
          账号登录
        </span>
      </div>
      <p class="welcome">欢迎您的使用</p>
      <div class="form-wrapper" v-show="currentTab==='tab1'" key="1">
        <a-form
          id="components-form-demo-normal-login"
          :form="form_message"
          class="login-form"
          @submit="handleSubmitByMesssage"
        >
        <a-input style="display: none"></a-input>
          <a-form-item>
            <a-input
              v-decorator="[
                'phoneNumber',
                { 
                  validateTrigger: [ 'blur'], 
                  rules: [{ validator: validatorPhone}] }
              ]"
              placeholder="手机号"
            >
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input
              class="code"
              v-decorator="[
                'password',
                { rules: [{ required: true, message: '请输入验证码!'}, {max: 6, message: '验证码只能是6位'}] }
              ]"
              type="text"
              placeholder="请输入6位验证码"
            >
            </a-input>
            <button class="getcode" @click.stop.prevent="handleCode" :disabled="disabled">
              <span v-if="!disabled">获取验证码</span>
              <span v-else>重新发送{{time | showTime}}</span>
            </button>
          </a-form-item>
          
          <a-form-item>
            <a-button type="primary" html-type="submit" class="login-form-button">
              登录
            </a-button>
          </a-form-item>
        </a-form>
        <div class="register-wrapper">
          <router-link class="register" to="/register">极速注册</router-link>
        </div>
        <p class="line">
        </p>
        <div class="third">
          <!-- <a-icon class="icon" type="qq" /> -->
          <a-icon class="icon" type="wechat" @click="handleLoginByWechat"/>
        </div>
      </div>

      <div class="form-wrapper" v-show="currentTab==='tab2'" key="2">
        <a-form
          id="login-form"
          :form="form_account"
          class="login-form"
          @submit="handleSubmitByAccount"
        >
          <a-form-item>
            <a-input
              v-decorator="[
                'phoneNumber',
                { 
                  validateTrigger: [ 'blur'], 
                  rules: [{ validator: validatorPhone}] }
              ]"
              placeholder="手机号"
            >
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input style="display: none"></a-input>
              <a-input
                class="code"
                v-decorator="[
                  'password',
                  { rules: [{ required: true, message: '请输入密码!'}] }
                ]"
                type="password"
                placeholder="请输入密码"
              >
            </a-input>
          </a-form-item>
          
          <a-form-item>
            <a-button type="primary" html-type="submit" class="login-form-button">
              登录
            </a-button>
          </a-form-item>
        </a-form>
        <div class="register-wrapper">
          <router-link class="register" to="/register">极速注册</router-link>
        </div>
        <p class="line">
        </p>
        <div class="third">
          <!-- <a-icon class="icon" type="qq" /> -->
          <a-icon class="icon" type="wechat" @click="handleLoginByWechat" />
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { validatePhone } from '@/utils/validate'
import { fecthCode, register, login } from '@/api/login'
import { setToken } from '@/utils/auth.ts'
import { fetchUser } from '@/api/user.ts';
import { UserAdapt } from '@/common/adaptation.ts';

import {
  State,
  Getter,
  Action,
  Mutation,
  namespace
} from 'vuex-class'
import storage from 'good-storage'

const USER = '__user__'
// interface Form {
//   phoneNumber: number | string | null
//   code: number | string | null
// }

// 登录
@Component({
  filters: {
    showTime (value:number) {
      let time = '00' + value;
      return time.slice(-2);
    }
  }
})
export default class Login extends Vue {
  @Mutation('SET_USER') setUser:any
  currentTab = 'tab1';
  form_message:any = null;
  form_account:any = null;
  disabled = false;
  time = 60;
  timer:any;
  created (){
    this.form_message = this.$form.createForm(this);     
    this.form_account = this.$form.createForm(this);     
  }
  handleSubmitByMesssage (e:any) {
    e.preventDefault();
    this.form_message.validateFields((err:Error, values:any) => {
      if (err) {
        return;
      } else {
        let obj = {
          username: this.form_message.getFieldValue('phoneNumber'),
          password: this.form_message.getFieldValue('password'),
          grant_type: 'password',
          auth_type: 'sms',
        }

        login(obj).then((res:any) => {
          this.time = 60;
          this.disabled = false;
          
          setToken('Bearer ' + res['access_token']);
          this.$message.success('登录成功，准备前往首页', 1);
          setTimeout(() => {
            // 获取用户信息
            fetchUser().then(res => {
              if (res.status === 200) {
                let user = new UserAdapt(res.data)
                // 保存到vuex里面
                this.setUser(user);
                // 保存到localStorage里面
                storage.set(USER, user);
              }
            })
            this.$router.push('/');
          }, 1000)
        })
      }
    });
  }
  handleSubmitByAccount (e:any) {
    e.preventDefault();
    this.form_account.validateFields((err:Error, values:any) => {
      if (err) {
        // return;
      } else {
        let obj = {
          username: this.form_account.getFieldValue('phoneNumber'),
          password: this.form_account.getFieldValue('password'),
          grant_type: 'password',
        }
        login(obj).then((res:any) => {
          try {
            setToken('Bearer ' + res['access_token']);
            // 这儿获取用户的信息，然后保存到storage和vuex里面  
            this.$message.success('登录成功，准备前往首页', 1);
            setTimeout(() => {
              // 获取用户信息
              fetchUser().then(res => {
                if (res.status === 200) {
                  let user = new UserAdapt(res.data)
                  // 保存到vuex里面
                  this.setUser(user);
                  // 保存到localStorage里面
                  storage.set(USER, user);
                }
              })
              this.$router.push('/');
            }, 1000)
          } catch (error) {
            console.log(error);
          }
        })
      }
    });
  }
  // 这儿是点击tab
  handleTab (tab:string) {
    this.currentTab = tab;
  }
  // 这儿是验证手机号
  validatorPhone (rule:any, value:any, callback:any) {
    if (!value) {
      callback('请输入手机号');
    } else if (!validatePhone(value)) {
      callback('请输入正确的手机号');
    } else {
      callback();
    }
  }
  // 获取验证码
  handleCode () {
    let _this = this;
    this.form_message.validateFields(['phoneNumber'], { force: true }, function (err:any, value:any) {
      if (err) {
        return
      } else {
        // _this.disabled = true;
        // _this.timer = setInterval(_this.calcuTime, 1000);
        let obj = {
          phone: _this.form_message.getFieldValue('phoneNumber'),
          type: '1' // 1 用户登录 2 注册验证码 3 找回密码
        }
        // 这儿是获取验证码
        fecthCode(obj).then(res => {
          _this.disabled = true;
          _this.timer = setInterval(_this.calcuTime, 1000);
        });
      }
    });
  }
  calcuTime () {
    if (this.time === 0) {
      clearInterval(this.timer);
      this.disabled = false;
      this.time = 60;
    }
    this.time--
  }
  handleLoginByQQ(){
    window.open('https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=[YOUR_APPID]&redirect_uri=[YOUR_REDIRECT_URI]&scope=[THE_SCOPE]', '_self')
  }
  handleLoginByWechat () {
    window.open(`https://open.weixin.qq.com/connect/qrconnect?appid=${process.env.VUE_APP_WEIXIN_APP_ID}&redirect_uri=http://www.yijiuapp.com&response_type=code&scope=snsapi_login&state=weixin#wechat_redirect`)
  }
}
</script>

<style lang="less" scoped>
@hoverColor: #6ebdff;
  .wrapper  {
    margin-top: 20px;
    background: #f1f4fb;
    overflow: hidden;
    height: 590px;
    .content {
      margin: 0 auto;
      margin-top: 20px;
      padding-bottom: 10px;
      width: 460px;
      border-radius: 4px;
      background: #fff;
      .title {
        text-align: center;
        height: 50px;
        border-bottom: 2px solid #e5e5e5;
        font-size: 20px;
        padding-right: 20px;
        span {
          cursor: pointer;
          padding: 0 20px;
          display: inline-block;
          height: 50px;
          line-height: 50px;
          &.active {
            color: #f63756;
            border-bottom: 2px solid #f63756;
          }
        }
      }
      .welcome {
        margin-top: 10px;
        height: 30px;
        line-height: 30px;
      }
      .form-wrapper {
        margin: 0 auto;
        text-align: left;
        width: 370px;
        .getcode {
          position: absolute;
          right: 6px;
          top: -5.5px;
          width: 100px;
          height: 30px;
          border-radius: 3px;
          font-size: 14px;
          color: #FFFFFF;
          line-height: 30px;
          text-align: center;
          cursor: pointer;
          border: none;
          outline-style: none;
          background: #f63756;
          &:active {
            // background-color: ;
            box-shadow: 0 0 0 1px rgba(238, 67, 67, .3);
          }
          &[disabled] {
            background-color: #b5b5b5;
            cursor: not-allowed;
          }
          &[disabled]:active {
            box-shadow: 0 0 0 0 transparent;
          }
        }
        .register-wrapper {
          margin-bottom: 10px;
          height: 30px;
          line-height: 30px;
          text-align: left;
          a {
            color: #303030;
            &:hover {
              color: @hoverColor;
            }
          }
        }
        .line {
          position: relative;
          border-top: solid 1px #eee;
          &::after {
            position: absolute;
            top: -11px;
            left: 50%;
            transform: translateX(-50%);
            content: '第三方登录';
            padding: 0 5px;
            color: #aaa;
            background-color: #fff;
          }
        }
        .third {
          .icon {
            margin-right: 20px;
            cursor: pointer;
            color: #b5b9bc;
            font-size: 25px;
            &:hover {
              color: @hoverColor;
            }
          }
        }
      }
    }
  }

</style>
