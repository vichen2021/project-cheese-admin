import request from '@/utils/request'
/**
 *
 * 公告管理
 *
 **/

// 删除
export const deleteFeedback = (params: any) => {
  return request({
    url: `/system/feedback/`+params,
    method: 'delete',
  })
}
// 查询
export const getFeedbacks = () => {
  return request({
    url: `/system/feedbacks`,
    method: 'get'
  })
}
