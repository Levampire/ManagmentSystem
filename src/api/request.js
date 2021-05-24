import request from '@/utils/request'
// 干部考核
export function getCadreIndex(params) {
  return request({
    url: '/cadre-index',
    method: 'get',
    params
  })
}
export function leveldetail(params) {
  return request({
    url: '/level-detail',
    method: 'get',
    params
  })
}
// 领导班子考核
