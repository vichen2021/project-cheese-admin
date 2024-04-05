import request from '@/utils/request'
// 修改密码
export const editPassword = (data: any) =>
  request({
    'url': '/merchant/editPassword',
    'method': 'put',
    data
  })
  // 获取营业状态
  export const getStatus = () =>
  request({
    'url': `/shop/status`,
    'method': 'get'
  })
    // 设置营业状态
    export const setStatus = (data:any) =>
    request({
      'url': `/shop/`+data,
      'method': 'put',
      'data':data
    })


  // 查询用户列表接口
export const getUserPage = (params: any) => {
  return request({
    url: '/user/page',
    method: 'get',
    params
  });
};

// 删除当前列的接口
export const deleUser = (ids: string) => {
  return request({
    url: '/user',
    method: 'delete',
    params: { id:ids }
  });
};

// 修改接口
export const editUser = (params: any) => {
  return request({
    url: '/user',
    method: 'put',
    data: { ...params }
  });
};

// 新增接口
export const addUser = (params: any) => {
  return request({
    url: '/user',
    method: 'post',
    data: { ...params }
  });
};

// 修改---启用禁用接口
export const enableOrDisableUser = (params: any) => {
  return request({
    url: `/user/status/${params.status}`,
    method: 'post',
    params: { id:params.id }
  })
}


// 修改页面反查详情接口
export const queryUserById = (id: string | (string | null)[]) => {
  return request({
    url: `/user/${id}`,
    method: 'get'
  })
};