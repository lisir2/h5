// import Mock from 'mockjs'

// const Random = Mock.Random

// // 登录
// Mock.mock('/api/login', 'post', (option) => {
//   let { username, password } = JSON.parse(option.body)
//   return (username === 'admin' && password === 'admin')
// })
// // 用户数据
// const userData = () => {
//   let users = []
//   for (let i = 0; i < 10; i++) {
//     let user = {
//       'id': i + 1,
//       'date': Random.date('yyyy-MM-dd'),
//       'name': Random.cname(),
//       'address': Mock.mock('@county(true)'),
//       'phone': Mock.mock(/^1[0-9]{10}$/),
//       'status': Random.integer(0, 1)
//     }
//     users.push(user)
//   }
//   return users
// }
// //轮播图数据
// const advData = () => {
//     let advs = {
//         data:[
//             {
//                 url: "https://www.zgbxjj.com/hsFileData/attachment/adv/201908011530357029.png",
//                 key1: "https://www.zgbxjj.com/wabc",
//                 goodsId:"405"
//             },
//             {
//                 url: "https://www.zgbxjj.com/hsFileData/attachment/adv/201907181819334832.png",
//                 key1: "https://www.zgbxjj.com/product_class",
//                 goodsId:"246"
//             },
//             {
//                 url: "https://www.zgbxjj.com/hsFileData/attachment/adv/201907261522208324.png",
//                 key1: "https://www.zgbxjj.com/wabc/wabc_mine.html",
//                 goodsId:"427"
//             }
//         ]
//     }
    
//     return advs
// }
// //分类九宫格
// const girdData=()=>{
//     let classfiy = {
//         data:[
//             {
//                 name: "保险特卖",
//                 icon:"assets/images/home/home-icon1.png",
//                 path: "https://www.zgbxjj.com/wabc/wx_classification.html?tit=hz"
//             },
//             {
//                 name: "私人订制",
//                 icon:"https://www.zgbxjj.com/wabc/img/dzbx.png",
//                 path: "https://www.zgbxjj.com/wabc/zhinengPush.html"
//             },
//             {
//                 name: "旅游保险",
//                 icon:"https://www.zgbxjj.com/wabc/img/travel.png",
//                 path: "https://www.zgbxjj.com/wabc"
//             },
//             {
//                 name: "财产保险",
//                 icon:"https://www.zgbxjj.com/wabc/img/caichan.png",
//                 path: "https://www.zgbxjj.com/wabc"
//             },
//             {
//                 name: "车辆保险",
//                 icon:"https://www.zgbxjj.com/wabc/img/carbx.png",
//                 path: "https://www.zgbxjj.com/wabc"
//             },
//             {
//                 name: "理财保险",
//                 icon:"https://www.zgbxjj.com/wabc/img/ccbx.png",
//                 path: "https://www.zgbxjj.com/wabc"
//             },
//             {
//                 name: "行业保险",
//                 icon:"https://www.zgbxjj.com/wabc/img/hybx.png",
//                 path: "https://www.zgbxjj.com/wabc"
//             },
//             {
//                 name: "全部产品",
//                 icon:"https://www.zgbxjj.com/wabc/img/qbcp.png",
//                 path: "https://www.zgbxjj.com/wabc"
//             },
//         ]
//     }
//     return classfiy
// }
// // 精品热卖
// const hotSell=()=>{
//     let hotlist={
//         data:[
//             {
//               "name":"华安万贯家庭财产保险（基础版）",
//               "imgUrl":"https://www.zgbxjj.com/showImage?imgId=/attachement/goods/20190414214029/201904142140293103.jpg",
//               "companyName":"华安保险",
//               "discript":"人人买得起，个个有保障,人人买得起，个个有保障,人人买得起，个个有保障人人买得起，个个有保障人人买得起，个个有保障",
//               "price":"16.00",
//               "goodsId":"325",
//               "selltotal":"1245"
//             },
//             // {
//             //     "name":"平安驾乘人员意外险平安驾乘人员意外险",
//             //     "imgUrl":"https://www.zgbxjj.com/showImage?imgId=/attachement/goods/20190719143619/201907191436195236.png",
//             //     "companyName":"中国平安",
//             //     "discript":"人人买得起，个个有保障",
//             //     "price":"20.00",
//             //     "goodsId":"325",
//             //     "selltotal":"95631"
//             // },
//             // {
//             //     "name":"华安万贯家庭财产保险（基础版）",
//             //     "imgUrl":"https://www.zgbxjj.com/showImage?imgId=/attachement/goods/20190628160600/201906281606008767.jpg",
//             //     "companyName":"华安保险",
//             //     "discript":"人人买得起，个个有保障",
//             //     "price":"40.00",
//             //     "goodsId":"325",
//             //     "selltotal":"95631"
//             // }
//         ]
//     }
//     return hotlist
// }
// //产品列表
// const productData=()=>{
//     let productlist={
//         data:[
//             {
//               "name":"华安万贯家庭财产保险（基础版）",
//               "imgUrl":"https://www.zgbxjj.com/showImage?imgId=/attachement/goods/20190414214029/201904142140293103.jpg",
//               "companyName":"华安保险",
//               "discript":"人人买得起，个个有保障",
//               "price":"16.00",
//               "goodsId":"325",
//               "selltotal":"1245"
//             },
//             // {
//             //     "name":"环晟平安电瓶车综合保险",
//             //     "imgUrl":"https://www.zgbxjj.com/showImage?imgId=/attachement/goods/20190719143619/201907191436195236.png",
//             //     "companyName":"中国平安",
//             //     "discript":"人人买得起，个个有保障",
//             //     "price":"20",
//             //     "goodsId":"325",
//             //     "selltotal":"95631"
//             // },
//             // {
//             //     "name":"华安万贯家庭财产保险（基础版）",
//             //     "imgUrl":"https://www.zgbxjj.com/showImage?imgId=/attachement/goods/20190628160600/201906281606008767.jpg",
//             //     "companyName":"华安保险",
//             //     "discript":"人人买得起，个个有保障",
//             //     "price":"40",
//             //     "goodsId":"325",
//             //     "selltotal":"95631"
//             // },
//             // {
//             //     "name":"安享一生癌症医疗险（2017版）",
//             //     "imgUrl":"https://www.zgbxjj.com/showImage?imgId=/attachement/goods/20190415092702/201904150927028362.jpg",
//             //     "companyName":"安心互联网保险",
//             //     "discript":"人人买得起，个个有保障",
//             //     "price":"50",
//             //     "goodsId":"325",
//             //     "selltotal":"95631"
//             // },
//             // {
//             //     "name":"安诚护驾保-驾驶人责任综合保险",
//             //     "imgUrl":"https://www.zgbxjj.com/showImage?imgId=/attachement/goods/20190416125006/201904161250064329.jpg",
//             //     "companyName":"安诚保险",
//             //     "discript":"人人买得起，个个有保障",
//             //     "price":"3",
//             //     "goodsId":"325",
//             //     "selltotal":"95631"
//             //   }

//         ]
//     }
//     return productlist
// }
// //常见问题列表
// const commonWt=()=>{
//     let questionList={
//         data:[
//             {
//                 "main":"本产品可以保障80中重大疾病，具体请查看保险条款对80种重大疾病的释义。",
//                 "other":"本产品投保时不需要到医院体检的，但是需要如是告知，满足健康告知要求方可投保。",
//             },
//             {
//                 "main":"本产品是否有犹豫期",
//                 "other":"本产品为长期产品，有犹豫期，以电子保单的出发日为客户签收日，之后有15天犹豫期。",
//             },
//             {
//                 "main":"如果已有社保，那还有必要买重疾险吗",
//                 "other":"与社保报销医疗费的方式不同，重疾险是一个专门重疾的保障，一但确诊为保险责任范围内的疾病，立即赔付，无需提供任何发票。虽然社保覆盖率在逐渐提高，但又在提供基础治疗，不少治疗重疾的药物都不在医保范围内，且价格十分昂贵，所有准备一份重疾保险，可以优先减轻经济压力。",
//             }
//         ]
//     }
//     return questionList
// }
// Mock.mock('/api/classfiy', girdData)
// Mock.mock('/api/users', userData)
// Mock.mock('/api/advs', advData)
// Mock.mock('/api/productlist', productData)
// Mock.mock('/api/hotlist', hotSell)
// Mock.mock('/api/questionList',commonWt)