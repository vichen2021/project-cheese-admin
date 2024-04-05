import request from '@/utils/request';
/**
 *
 * 分类管理
 *
 **/

// 查询分类列表接口
export const getRiderPage = (params: any) => {
  return request({
    url: '/rider/page',
    method: 'get',
    params
  });
};

// 删除当前列的接口
export const deleRider = (ids: string) => {
  return request({
    url: '/rider',
    method: 'delete',
    params: { id:ids }
  });
};

// 修改接口
export const editRider = (params: any) => {
  return request({
    url: '/rider',
    method: 'put',
    data: { ...params }
  });
};

// 新增接口
export const addRider = (params: any) => {
  return request({
    url: '/rider',
    method: 'post',
    data: { ...params }
  });
};

// 修改---启用禁用接口
export const enableOrDisableRider = (params: any) => {
  return request({
    url: `/rider/status/${params.status}`,
    method: 'post',
    params: { id:params.id }
  })
};

// 修改页面反查详情接口
export const queryRiderById = (id: string | (string | null)[]) => {
  return request({
    url: `/rider/${id}`,
    method: 'get'
  })
};