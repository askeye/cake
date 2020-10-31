import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    // 首页
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    // 蛋糕列表
    path: '/cake/:id',
    name: 'Cake',
    component: () => import('../views/Cake.vue'),
  },
  {
    // 注册
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    // 登录
    path: '/sign',
    name: 'Sign',
    component: () => import('../views/Sign.vue'),
    redirect: '/sign/phone',
    children: [{
      path: 'phone',
      component: () => import('../components/Phone.vue'),
    }, {

      path: 'password',
      component: () => import('../components/Password.vue'),
    }]
  },
  {
    // 精选食材详情页
    path: '/fdetail/:id',
    name: 'Food_detail',
    component: () => import('../views/Food_detail.vue'),
  },
  {
    // 商品详情页
    path: '/detail/:id',
    name: 'detail',
    component: () => import('../views/Detail.vue'),
  },
  {
    // 购物车页面
    path: '/cart',
    name: 'cart',
    component: () => import('../views/Cart.vue'),
  },
  {
    // 首页banner页面
    path: '/banner/:id',
    name: 'banner',
    component: () => import('../views/Banner.vue'),
  },
  {
    // 送全国
    path: '/send',
    name: 'send',
    component: () => import('../views/Send.vue'),
  },
  {
    // 个人中心
    path: '/center',
    name: 'center',
    component: () => import('../views/Center.vue'),
    meta: { requiresAuth: true }
  }, {
    // 忘记密码
    path: '/forget',
    name: 'forget',
    component: () => import('../views/Forget.vue'),
    meta: { requiresAuth: true }
  }, {
    // 收货地址
    path: '/address/:id',
    name: 'address',
    component: () => import('../views/Address.vue'),
    meta: { requiresAuth: true }
  }, {
    // 地址列表
    path: '/list_address',
    name: 'list_address',
    component: () => import('../views/List_address.vue'),
    meta: { requiresAuth: true }
  }, {
    // 订单中心
    path: '/order',
    name: 'order',
    component: () => import('../views/Order.vue'),
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  routes,
})

router.beforeEach((to, from, next) => {
  document.documentElement.scrollTop = 0
  if (to.meta.requiresAuth) {
    if (!localStorage.getItem('user')) {
      next({
        path: '/sign'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
