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
    path: '/order/:userID',
    name: 'order',
    component : resolve => require.ensure([], () => resolve(require('@/pages/order.vue')), 'order')
  },
  {
    path: '/orderlist/:userID', //*  订单列表页
    name: 'orderlist',
    component : resolve => require.ensure([], () => resolve(require('@/pages/orderList.vue')), 'orderList')
  },
  {
    path: '/orderDetail/:sernum', //*  订单详情页
    name: 'orderDetail',
    component : resolve => require.ensure([], () => resolve(require('@/pages/orderDetail.vue')), 'orderDetail')
  },

]
