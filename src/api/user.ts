import request from '@/utils/request.ts'

export function fetchUser() {
  return request({
    url: '/api/1ec08564dcc344018d6aaa910068f0f0/app/appUser/info',
    method: 'get',
  })
}

interface User {
  id: string;
  name?: string;
  birthday?: string;
  address?: string;
  email?: string;
  sex?: string;
  description?: string;
  headImg?: string;
  attr1?: string;
  userTitle?: string;
  info?:any;
}
export function updateUser(obj:User) {
  if (obj.headImg) {
    obj.attr1 = obj.headImg;
    delete obj.headImg;
  }
  // 保存职称
  if (obj.userTitle) {
    obj.info = {};
    obj.info.userTitle = obj.userTitle;
    delete obj.userTitle;
  }
  return request({
    url: '/api/1ec08564dcc344018d6aaa910068f0f0/app/appUser/modifyUser',
    method: 'post',
    data: obj
  })
}

