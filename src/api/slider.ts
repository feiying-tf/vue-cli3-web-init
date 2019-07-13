import request from '@/utils/request.ts'

interface Obj {
  page: number,
  limit: number,
  orderByField: string,
  isAsc: string
}
export function fetchSlider(obj:Obj) {
  return request({
    url: '/api/1ec08564dcc344018d6aaa910068f0f0/app/appNews/page',
    method: 'get',
    params: obj
  })
}