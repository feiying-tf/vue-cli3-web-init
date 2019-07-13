import request from '@/utils/request.ts'

interface Code {
  phone: string;
  type: string; // 1 用户登录 2 注册验证码 3 找回密码
}
export function fecthCode(obj:Code) {
  return request({
    url: '/api/1ec08564dcc344018d6aaa910068f0f0/app/appMsg/sendCode',
    method: 'post',
    params: obj
  })
}


interface Register {
  mobile: string; // 手机
  password: string; // 密码
  code: string; // 验证码
}
export function register(obj:Register) {
  return request({
    url: '/api/1ec08564dcc344018d6aaa910068f0f0/app/appUser/register',
    method: 'post',
    params: obj
  })
}


interface Login {
  username: string; // 手机
  password: string; // 密码
  grant_type: string; // 验证码
  auth_type?: string; // 如果为空，则表示密码登录，sms 验证码登录 vcode 用户名密码验证码登录 wechat 微信登录 qq QQ登录
 }
export function login(obj:Login) {
  return request({
    url: '/api/1ec08564dcc344018d6aaa910068f0f0/app/oauth/token',
    method: 'post',
    params: obj
  })
}

export function thirdGetUid(id:string) {
  let obj = {
    code: id
  }
  return request({
    url: '/api/1ec08564dcc344018d6aaa910068f0f0/app/thirdAuthUser/yijiu/webWeixinAuth',
    method: 'get',
    params: obj
  })
}