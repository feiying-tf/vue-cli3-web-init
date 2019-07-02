import request from '@/utils/request.ts'

// 商机列表
interface Obj {
  page: number,
  limit: number,
  orderByField: string,
  isAsc: string
}
// 获取新闻评论
export function fetchNewsComment(obj:Obj) {
  return request({
    url: '/api/1ec08564dcc344018d6aaa910068f0f0/app/appNews/selectMyAppUserComment',
    method: 'get',
    params: obj
  })
}

// 获取商机评论
export function fetchBusinessComment(obj:Obj) {
  return request({
    url: '/api/1ec08564dcc344018d6aaa910068f0f0/app/appBusinessOpportunity/selectMyAppUserComment',
    method: 'get',
    params: obj
  })
}
