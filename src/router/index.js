import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/cadreResult',
    name: 'cadreResult',
    meta: { title: '查看考核结果', icon: 'el-icon-s-management'},
    children: [
      {
        path: 'cadreResult',
        name: 'cadreResult',
        component: () => import('@/views/resultCheck/cadreResult/index'),
        meta: { title: '干部考核结果  ', icon: 'el-icon-s-order' }
      },
      {
        path: 'cadreDetail',
        name: 'cadreDetail',
        hidden: true,
        component: () => import('@/views/resultCheck/detail/cadreDetail'),
        meta: { title: '干部考核结果详情' }
      },
      {
        path: 'cadreDailyDetail',
        name: 'cadreDailyDetail',
        hidden: true,
        component: () => import('@/views/resultCheck/detail/cadreDailyDetail'),
        meta: { title: '干部日常考核结果详情' }
      },
      {
        path: 'leadingGroupDetail',
        name: 'leadingGroupDetail',
        hidden: true,
        component: () => import('@/views/resultCheck/detail/leadingGroupDetail'),
        meta: { title: '领导班子考核结果详情' }
      },
      {
        path: 'leadingGroup',
        name: 'leadingGroup',
        component: () => import('@/views/resultCheck/leadingGroup/index'),
        meta: { title: '领导班子考核结果', icon: 'table' }
      }
    ]
  },
  {
    path: '/chart',
    component: Layout,
    redirect: '/chart/cadreChart',
    name: 'cadreChart',
    meta: { title: '统计表格查看', icon: 'el-icon-s-marketing' },
    children: [
      {
        path: 'cadreChart',
        name: 'cadreChart',
        component: () => import('@/views/chart/cadre.vue'),
        meta: { title: '干部考核统计  ', icon: 'el-icon-s-data' }
      },
      {
        path: 'leadingGroupChart',
        name: 'leadingGroupChart',
        component: () => import('@/views/chart/leadingGroup'),
        meta: { title: '领导班子统计', icon: 'el-icon-s-data' }
      }
    ]
  },
  {
    path: '/infoMaintain',
    component: Layout,
    redirect: '/infoMaintain/cadreInfo',
    name: 'infoMaintain',
    meta: { title: '考核信息维护', icon: 'el-icon-medal-1' },
    children: [
      {
        path: 'cadreInfo',
        name: 'cadreInfo',
        component: () => import('@/views/infoManage/cadreInfo/index'),
        meta: { title: '干部信息维护', icon: 'el-icon-trophy' }
      },
      {
        path: 'leadingGroupInfo',
        name: 'leadingGroupInfo',
        component: () => import('@/views/infoManage/leadingGroupInfo/index'),
        meta: { title: '领导班子信息维护', icon: 'el-icon-medal' }
      },
      {
        path: 'daily',
        name: 'daily',
        component: () => import('@/views/infoManage/daily/index.vue'),
        redirect: '/infoMaintain/daily/annualCadre',
        meta: { title: '日常考核维护', icon: 'form' },
        children: [
          {
            path: 'dailyCadre',
            name: 'dailyCadre',
            component: () => import('@/views/infoManage/daily/cadre/index.vue'),
            meta: { title: '干部日常考核' }
          },
          {
            path: 'dailyCadreDetail',
            name: 'dailyCadreDetail',
            hidden: true,
            component: () => import('@/views/infoManage/daily/cadre/detail.vue'),
            meta: { title: '干部日常考核项目详情' }
          },
          {
            path: 'dailyLeader',
            name: 'dailyLeader',
            component: () => import('@/views/infoManage/daily/leadingGroup/index.vue'),
            meta: { title: '领导班子日常考核' }
          },
          {
            path: 'dailyLeaderDetail',
            name: 'dailyLeaderDetail',
            hidden: true,
            component: () => import('@/views/infoManage/daily/leadingGroup/detail.vue'),
            meta: { title: '领导班子日常考核项目详情' }
          }
        ]
      },
      {
        path: 'annual',
        name: 'annual',
        component: () => import('@/views/infoManage/annual'),
        redirect: '/annual/annualCadre',
        meta: { title: '年度考核维护', icon: 'el-icon-s-claim' },
        children: [
          {
            path: 'annualCadre',
            name: 'annualCadre',
            component: () => import('@/views/infoManage/annual/cadre'),
            meta: { title: '干部年度考核' }
          },
          {
            path: 'annualCadreDetail',
            name: 'annualCadreDetail',
            hidden: true,
            component: () => import('@/views/infoManage/annual/cadre/detail.vue'),
            meta: { title: '干部年度考核项目详情' }
          },
          {
            path: 'annualLeader',
            name: 'annualLeader',
            component: () => import('@/views/infoManage/annual/leadingGroup'),
            meta: { title: '领导班子年度考核' }
          },
          {
            path: 'dailyLeaderDetail',
            name: 'dailyLeaderDetail',
            hidden: true,
            component: () => import('@/views/infoManage/daily/leadingGroup/detail.vue'),
            meta: { title: '领导班子日常考核项目详情' }
          },
          {
            path: 'annualLeaderDetail',
            name: 'annualLeaderDetail',
            hidden: true,
            component: () => import('@/views/infoManage/annual/leadingGroup/detail.vue'),
            meta: { title: '领导班子年度考核项目详情' }
          }
        ]
      }

    ]
  },
  {
    path: '/userCtrl',
    component: Layout,
    children: [
      {
        path: 'userCtrl',
        name: 'userCtrl',
        component: () => import('@/views/userCtrl/index.vue'),
        meta: { title: '账号管理', icon: 'el-icon-user-solid' }
      }
    ]
  },
  // 404重定向必须放在路由最终
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
