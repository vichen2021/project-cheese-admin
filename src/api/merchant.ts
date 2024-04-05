import request from '@/utils/request'
/**
 *
 * 商户管理
 *
 **/
// 登录、
export const login = (data: any) =>
  request({
    'url': '/merchant/login',
    'method': 'post',
    data
  })

  // 登录、
export const login_sys = (data: any) =>
request({
  'url': '/systemUser/login',
  'method': 'post',
  data
})

  // 退出
 export const userLogout = (params: any) =>
 request({
   'url': `/merchant/logout`, // 授课老师接口
   'method': 'post',
   params
 })

export const getMerchantList = (params: any) => {
  return request({
    url: '/merchant/page',
    method: 'get',
    params
  })
}

// 修改---启用禁用接口
export const enableOrDisableMerchant = (params: any) => {
  return request({
    url: `/merchant/status/${params.status}`,
    method: 'post',
    params: { id:params.id }
  })
}

// 新增---添加商户
export const addMerchant = (params: any) => {
  return request({
    url: '/merchant',
    method: 'post',
    data: { ...params }
  })
}

// 修改---添加商户
export const editMerchant = (params: any) => {
  
  return request({
    url: '/merchant',
    method: 'put',
    data: { ...params }
  })
}
// 查询商户详情接口
export const getCurrentMerchantDetail = (params: any) => {
  return request({
    url: `/merchant/detail`,
    method: 'get'
  })
}

// 修改页面反查详情接口
export const queryMerchantById = (id: string | (string | null)[]) => {
  return request({
    url: `/merchant/${id}`,
    method: 'get'
  })
}
