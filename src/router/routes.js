/**
 * Created by Administrator on 2017/11/14.
 */


export default [
  {
    path: '/',  //*
    name: 'Home',
    component : resolve => require.ensure([], () => resolve(require('@/pages/Home.vue')), 'Home')
  },
  {
    path: '/orderMain',
    name: 'order',
    component : resolve => require.ensure([], () => resolve(require('@/pages/orderMain.vue')), 'orderMain')
  },
  {
    path: '/orderlist', //*  订单列表页
    name: 'orderlist',
    component : resolve => require.ensure([], () => resolve(require('@/pages/orderList.vue')), 'orderList')
  },
  {
    path: '/goforPay', //*  订单详情页
    name: 'goforPay',
    component : resolve => require.ensure([], () => resolve(require('@/pages/goforPay.vue')), 'goforPay')
  },
  {
    path: '/cardCenter', //*  订单详情页
    name: 'cardCenter',
    component : resolve => require.ensure([], () => resolve(require('@/pages/cardCenter.vue')), 'cardCenter')
  }
]
