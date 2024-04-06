import request from '@/utils/request'
/**
 *
 * 公告管理
 *
 **/

// 修改
export const setAnnouncement = (params: any) => {
  return request({
    url: '/system/announcement',
    method: 'put',
    data: params 
  })
}
// 查询
export const getAnnouncement = () => {
  return request({
    url: `/system/announcement`,
    method: 'get'
  })
}
