import request from '@/utils/request.ts'

// 我的收藏

interface Collect {
  page: number;
  limit: number;
  orderByField: string;
  isAsc: string;
  collType: string;
}

export function fecthBusinessCollect(obj:Collect) {
  return request({
    url: '/api/1ec08564dcc344018d6aaa910068f0f0/app/appBusinessOpportunity/selectMyAppUserCollections',
    method: 'get',
    params: obj
  })
}

export function fetchNewsCollect(obj:Collect) {
  return request({
    url: '/api/1ec08564dcc344018d6aaa910068f0f0/app/appNews/selectMyAppUserCollections',
    method: 'get',
    params: obj
  })
}

interface DeleteObj {
  objectId: string;
  collType: string;
  objectType: string;
}
export function deleteCollect(obj:DeleteObj) {
  return request({
    url: '/api/1ec08564dcc344018d6aaa910068f0f0/app/appRes/collection',
    method: 'get',
    params: obj
  })
}

