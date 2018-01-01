/**
 * Created by Administrator on 2017/11/15.
 */

//请求接口的地方有 （说明方式为  所在组件 + 所请求字段 + 字段一些说明 ）

//1. Home  greet 招呼字段 hascard 商家是否投放了卡券字段 boolean性 （首页将两个按钮存进了localStorage，btnindex为1代表我要点餐按钮   2为历史订单按钮）
//2.orderList orderList 所有订单的编号和时间   （订单请求需做分页懒加载）      以手机号作为区分的id号  (LocalStorage  存储)
//3.orderMain   点餐的详情页（各种套餐和单点的页面）{
//   接口需要拿到的数据：
// a.轮播图的图片  （数据类型如lblist字段）
// b.总的数据 orderMain （数据类型如orderMain字段，数组类型，每一个对象里面包含一个type和detail,type为左边点餐菜单栏的字段，detail为每没个菜单栏下对应的具体菜品，数组类型）
//
//4.goforPay接口需要拉取我的优惠券接口，优惠券的信息为  // 后端过滤掉不可用的卡券，返回给前端，前端根据消费额，过滤掉不可用的卡券
// 注意goforPay在mounted时先获取localStorage中的订单编号信息，因为从历史订单页面也可跳转到该页面，若有时（代表从历史订单页面过来），根据订单编号请求订单详情字段，数据如
// findbyordernum所示。
// （{
//      cardId ,优惠券的ID
//      value,  优惠券的面值
//      limit,  优惠券的使用条件，即消费满limit后即可使用
// }）
// }
// 5.orderList组件在mounted中请求查看历史订单接口 ，其中
//6.cardCenter组件中，在mounted中请求卡券接口，




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
