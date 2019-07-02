import request from '@/utils/request.ts'

interface Obj {
  itemsId?: string;
  page: number;
  limit: number;
  orderByField: string;
  isAsc: string;
}
export function fetchNews(obj:Obj) {
  return request({
    url: '/api/1ec08564dcc344018d6aaa910068f0f0/app/appNews/page',
    method: 'get',
    params: obj
  })
}

// 新闻栏目
interface ObjType {
  itemType: string
}
export function fetchNewsType(obj:ObjType) {
  return request({
    url: '/api/1ec08564dcc344018d6aaa910068f0f0/app/appRes/item',
    method: 'get',
    params: obj
  })
}

// 新闻详情
export function fetchNewsDetail(id: string) {
  return request({
    url: `/api/1ec08564dcc344018d6aaa910068f0f0/app/appNews/${id}`,
    method: 'get',
  })
}