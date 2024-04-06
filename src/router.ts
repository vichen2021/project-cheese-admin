import Vue from "vue";
import Router from "vue-router";
import Layout from "@/layout/index.vue";
import Cookies from 'js-cookie'
import {
  getToken,
  setToken,
  removeToken,
  getStoreId,
  setStoreId,
  removeStoreId,
  setUserInfo,
  getUserInfo,
  removeUserInfo
} from "@/utils/cookies";
import store from "@/store";

Vue.use(Router);
// 获取用户权限
const userInfoCookie = Cookies.get('user_info');
let role = 'merchant'; // 默认商户权限
if (userInfoCookie) {
  const userInfo = JSON.parse(userInfoCookie);
  const userid = userInfo.id.toString();
  if (userid == 1) {
    role = 'super_manager';
  } else if (userid < 100) {
    role = 'manager';
  }
  console.log(role)
} else {
  console.log("user_info cookie is not found");
}

const router = new Router({
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/login",
      component: () =>
        import(/* webpackChunkName: "login" */ "@/views/login/index.vue"),
      meta: { title: "芝士外卖", hidden: true, notNeedAuth: true }
    },
    {
      path: "/404",
      component: () => import(/* webpackChunkName: "404" */ "@/views/404.vue"),
      meta: { title: "芝士外卖", hidden: true, notNeedAuth: true }
    },
    {
      path: "/",
      component: Layout,
      redirect: "/dashboard",
      // 权限菜单
      children: [
        {
          path: "dashboard",
          component: () =>
            import(/* webpackChunkName: "dashboard" */ "@/views/dashboard/index.vue"),
          name: "Dashboard",
          meta: {
            title: "工作台",
            icon: "dashboard",
            affix: true
          }
        },
        {
          path: "/statistics",
          component: () =>
            import(/* webpackChunkName: "shopTable" */ "@/views/statistics/index.vue"),
          meta: {
            title: "数据统计",
            icon: "icon-statistics",
            // hidden: role != 'merchant'
          }
        },
        {
          path: "/merchantDetail",
          component: () =>
            import(/* webpackChunkName: "shopTable" */ "@/views/merchantDetail/index.vue"),
          meta: {
            title: "店铺信息",
            icon: "icon-user",
            hidden: role != 'merchant'
          }
        },
        {
          path: "/merchantDetail/edit",
          component: () =>
            import(/* webpackChunkName: "dashboard" */ "@/views/merchantDetail/editMerchant.vue"),
          meta: {
            title: "更新店铺信息",
            hidden: true
          }
        },
        {
          path: "order",
          component: () =>
            import(/* webpackChunkName: "shopTable" */ "@/views/orderDetails/index.vue"),
          meta: {
            title: "订单管理",
            icon: "icon-order",
            hidden: role != 'merchant'
          }
        },
        {
          path: "setmeal",
          component: () =>
            import(/* webpackChunkName: "shopTable" */ "@/views/setmeal/index.vue"),
          meta: {
            title: "套餐管理",
            icon: "icon-combo",
            hidden: role != 'merchant'
          }
        },
        {
          path: "dish",
          component: () =>
            import(/* webpackChunkName: "shopTable" */ "@/views/dish/index.vue"),
          meta: {
            title: "菜品管理",
            icon: "icon-dish",
            hidden: role != 'merchant'
          }
        },
        {
          path: "/dish/add",
          component: () =>
            import(/* webpackChunkName: "shopTable" */ "@/views/dish/addDishtype.vue"),
          meta: {
            title: "添加菜品",
            hidden: true
          }
        },
        {
          path: "category",
          component: () =>
            import(/* webpackChunkName: "shopTable" */ "@/views/category/index.vue"),
          meta: {
            title: "分类管理",
            icon: "icon-category",
            hidden: role != 'merchant'
          }
        },
        {
          path: "merchant",
          component: () =>
            import(/* webpackChunkName: "shopTable" */ "@/views/merchant/index.vue"),
          meta: {
            title: "商户管理",
            icon: "icon-merchant",
            hidden: role === 'merchant'
          }
        },
        {
          path: "/merchant/add",
          component: () =>
            import(/* webpackChunkName: "dashboard" */ "@/views/merchant/addMerchant.vue"),
          meta: {
            title: "添加商户",
            hidden: true
          }
        },
        {
          path: "/setmeal/add",
          component: () =>
            import(/* webpackChunkName: "shopTable" */ "@/views/setmeal/addSetmeal.vue"),
          meta: {
            title: "添加套餐",
            hidden: true
          }
        },
        {
          path: "user",
          component: () =>
            import(/* webpackChunkName: "shopTable" */ "@/views/user/index.vue"),
          meta: {
            title: "学生管理",
            icon: "icon-user",
            hidden: role === 'merchant'
          }
        },
        {
          path: "rider",
          component: () =>
            import(/* webpackChunkName: "shopTable" */ "@/views/rider/index.vue"),
          meta: {
            title: "骑手管理",
            icon: "icon-order",
            hidden: role === 'merchant'
          }
        },
        {
          path: "/rider/add",
          component: () =>
            import(/* webpackChunkName: "dashboard" */ "@/views/rider/addRider.vue"),
          meta: {
            title: "添加配送员",
            hidden: true
          }
        },
        {
          path: "/user/add",
          component: () =>
            import(/* webpackChunkName: "dashboard" */ "@/views/user/addUser.vue"),
          meta: {
            title: "添加学生",
            hidden: true
          }
        },
        {
          path: "manager",
          component: () =>
            import(/* webpackChunkName: "shopTable" */ "@/views/manager/index.vue"),
          meta: {
            title: "管理员管理",
            icon: "icon-user",
            hidden: role !== 'super_manager'
          }
        },
        {
          path: "/manager/add",
          component: () =>
            import(/* webpackChunkName: "dashboard" */ "@/views/manager/addManager.vue"),
          meta: {
            title: "添加管理员",
            hidden: true
          }
        },
        {
          path: "announcement",
          component: () =>
            import(/* webpackChunkName: "shopTable" */ "@/views/announcement/index.vue"),
          meta: {
            title: "系统公告",
            icon: "icon-order",
            hidden: role === 'merchant'
          }
        },
        {
          path: "feedback",
          component: () =>
            import(/* webpackChunkName: "shopTable" */ "@/views/feedback/index.vue"),
          meta: {
            title: "处理学生反馈",
            icon: "icon-category",
            hidden: role === 'merchant'
          }
        },
      ]
    },
    {
      path: "*",
      redirect: "/404",
      meta: { hidden: true }
    }
  ]
});

export default router;
