import request from '@/utils/request.ts'

// 商机列表
interface Obj {
  itemsId?: string,
  page: number,
  limit: number,
  orderByField: string,
  isAsc: string
}
export function fetchBusiness(obj:Obj) {
  return request({
    url: '/api/1ec08564dcc344018d6aaa910068f0f0/app/appBusinessOpportunity/page',
    method: 'get',
    params: obj
  })
}

// 商机栏目
interface ObjType {
  itemType: string
}
export function fetchBusinessType(obj:ObjType) {
  return request({
    url: '/api/1ec08564dcc344018d6aaa910068f0f0/app/appRes/item',
    method: 'get',
    params: obj
  })
}
