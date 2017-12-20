/**
 * Created by Administrator on 2017/11/15.
 */

//请求接口的地方有 （说明方式为  所在组件 + 所请求字段 + 字段一些说明 ）

//1. Home  great 招呼字段  （首页将两个按钮存进了localStorage，btnindex为1代表我要点餐按钮   2为历史订单按钮）
//2.orderList orderList 所有订单的编号和时间   （订单请求需做分页懒加载）      以手机号作为区分的id号  (LocalStorage  存储)
//3.orderMain   点餐的详情页（各种套餐和单点的页面）{
//   接口需要拿到的数据：
// a.轮播图的图片  （数据类型如lblist字段）
// b.总的数据 orderMain （数据类型如orderMain字段，数组类型，每一个对象里面包含一个type和detail,type为左边点餐菜单栏的字段，detail为每没个菜单栏下对应的具体菜品，数组类型）
//
//
//
// }


//改进   (1)整体加一个titlebar 实现返回   （2）orderList订单列表页卡片右边加上箭头

//订单详情页orderDetail 需要加上懒加载


//2.Order 所有订单  每项为一个订单   flag   1为正在制作  2为历史纪录 （以day为单位的时间戳）



/*
*   fooditem:{
 "img": "../../static/food.jpg",
 "name": "千叶豆腐",
 "price": "18",
 "flag": "1"
 }
* */
