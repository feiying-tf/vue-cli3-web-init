import request from '@/utils/request.ts'

export function upload(file:any) {
  return request({
    url: '/api/tool/oss/upload',
    method: 'post',
    data: file
  })
}