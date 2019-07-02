<template>
  <div class="wrapper register">
    <div class="content">
      <div class="title">
        注册
      </div>
      <p class="welcome">欢迎您的使用</p>
      <div class="form-wrapper">
        <a-form
          id="components-form-demo-normal-login"
          :form="form"
          class="login-form"
          @submit="handleSubmit"
        >
          <a-input style="display: none"></a-input>
          <a-form-item>
            <a-input
              v-decorator="[
                'phoneNumber',
                { 
                  validateTrigger: [ 'blur'], 
                  rules: [{ validator: validatorPhone}]
                }
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
                'code',
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
          
          <a-form-item  v-bind="form.password">
            <a-input style="display: none"></a-input>
            <a-input
              class="code"
              v-decorator="[
                'password',
                { rules: [ 
                  { required: true, message: '请输入密码!'}, 
                  {min: 6, message: '密码为6-16位'},
                  {max: 16, message: '密码为6-16位'}],
                }
              ]"
              type="password"
              placeholder="请输入6位到~16位密码"
            >
            </a-input>
          </a-form-item>

          <a-form-item>
            <a-input style="display: none"></a-input>
            <a-input
              class="code"
              v-decorator="[
                'secPassword',
                { 
                  rules: [{ validator: validatorSecPassword}],
                  validateTrigger: [ 'blur'],
                }
              ]"
              type="password"
              placeholder="确认密码"
            >
            </a-input>
          </a-form-item>

          <a-form-item>
            <a-checkbox
              v-decorator="[
                'agreement', 
                { 
                  rules: [{ validator: validatorAgreement}],
                }
              ]"
            >
              同意<a target="_blank" href="http://www.yijiuapp.com/app/xy02-fftk.html">《用户协议》</a>
            </a-checkbox>
          </a-form-item>

          <a-form-item>
            <a-button type="primary" html-type="submit" class="login-form-button">
              注册
            </a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { validatePhone } from '@/utils/validate'
import { fecthCode, register } from '@/api/login'

@Component({
  filters: {
    showTime (value:number) {
      let time = '00' + value;
      return time.slice(-2);
    }
  }
})
export default class Login extends Vue {
  form:any = null;
  disabled = false;
  time = 60;
  timer:any;
  created (){
    this.form = this.$form.createForm(this);    
    this.form.setFieldsValue({
      name: '设置值'
    })
  }

  beforeDestroy () {
    clearInterval(this.timer);
  }

  // 进行注册
  handleSubmit () {
    this.form.validateFields((err:Error, values:any) => {
      if (err) {
        return;
      } else {
        let obj = {
          mobile: this.form.getFieldValue('phoneNumber'),
          password: this.form.getFieldValue('password'),
          code: this.form.getFieldValue('code'),
        }

        register(obj).then((res:any) => {
          try {
            this.time = 60;
            this.disabled = false;
            this.$message.success('注册成功，前往登录页', 2);
            setTimeout(() => {
              this.$router.push('/login');
            }, 2000)
          } catch (error) {
            console.log(error);
          }
        })
      }
    });
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
  // 验证再次输入密码
  validatorSecPassword (rule:any, value:any, callback:any) {
    if (!value) {
      callback('请确认密码');
    } else if ( this.form.getFieldValue('password') !== this.form.getFieldValue('secPassword') ) {
      callback('密码不匹配，请重新输入');
    } else {
      callback();
    }
  }
  validatorAgreement (rule:any, value:any, callback:any) {
    if (!value) {
      callback('请同意用户协议');
    } else {
      callback();
    }
  }

  // 获取验证码
  handleCode () {
    let _this = this;
    this.form.validateFields(['phoneNumber'], { force: true }, function (err:any, value:any) {
      if (err) {
        return
      } else {
        // 这儿是获取验证码
        let obj = {
          phone: _this.form.getFieldValue('phoneNumber'),
          type: '2' // 1 用户登录 2 注册验证码 3 找回密码
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
        line-height: 50px;
        border-bottom: 2px solid #e5e5e5;
        font-size: 20px;
        padding-right: 20px;
        // span {
        //   cursor: pointer;
        //   padding: 0 20px;
        //   display: inline-block;
        //   height: 50px;
        //   line-height: 50px;
        //   &.active {
        //     color: #f63756;
        //     border-bottom: 2px solid #f63756;
        //   }
        // }
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
      }
    }
  }

</style>
