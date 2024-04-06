import request from '@/utils/request'
/**
 *
 * 商户管理
 *
 **/
// 登录、
export const login = (data: any) =>
  request({
    'url': '/manager/login',
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
   'url': `/manager/logout`, //  
   'method': 'post',
   params
 })

export const getManagerList = (params: any) => {
  return request({
    url: '/manager/page',
    method: 'get',
    params
  })
}

// 修改---启用禁用接口
export const enableOrDisableManager = (params: any) => {
  return request({
    url: `/manager/status/${params.status}`,
    method: 'post',
    params: { id:params.id }
  })
}

// 新增---添加商户
export const addManager = (params: any) => {
  return request({
    url: '/manager',
    method: 'post',
    data: { ...params }
  })
}

// 修改---添加商户
export const editManager = (params: any) => {
  
  return request({
    url: '/manager',
    method: 'put',
    data: { ...params }
  })
}
// 查询商户详情接口
export const getCurrentManagerDetail = (params: any) => {
  return request({
    url: `/manager/detail`,
    method: 'get'
  })
}

// 修改页面反查详情接口
export const queryManagerById = (id: string | (string | null)[]) => {
  return request({
    url: `/manager/${id}`,
    method: 'get'
  })
}
