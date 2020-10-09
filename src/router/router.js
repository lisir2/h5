import Vue from 'vue'
import Router from 'vue-router'

// const Home = () => import(/* webpackChunkName: "Home" */ '@/page/official/home');
// const Classlist = () => import(/* webpackChunkName: "Classlist" */ '@/page/official/classlist');
// const Mine = () => import(/* webpackChunkName: "Mine" */ '@/page/official/mine');
// const Study = () => import(/* webpackChunkName: "Study" */ '@/page/official/Study.vue');

const Home = () => import('@/page/official/home');
const Classlist = () => import('@/page/official/classlist');
const Mine = () => import('@/page/official/mine');
const Study = () => import('@/page/official/Study');
const Productdetail = () => import('@/page/official/productdetail');
const LoginRegister = () => import('@/page/official/loginRegister');
const LoginMain = () => import('@/page/official/loginMain');
const RegisterMain = () => import('@/page/official/registerMain');
const RegisterSuccess = () => import('@/components/registerSuccess');
const QuickLogin = () => import('@/components/quickLogin');
const ForgetWord = () => import('@/components/forgetWord');
const ResetPassword = () => import('@/components/resetPassword');
const ResetSuccess = () => import('@/components/resetSuccess');
const BindUser = () => import('@/page/official/bindUser');
const CommonProblem = () => import('@/components/commonProblem');
const IntimateService = () => import('@/components/intimateService');
const ArticleDetail = () => import('@/components/articleDetail');
const ProductTerms = () => import('@/components/productTerms');
const PaySuccess = () => import('@/components/paySuccess');
const HealthInform = () => import('@/components/healthInform');
const MyEvaluation = () => import('@/components/myEvaluation');
const PersonalData = () => import('@/components/personalData');
const PersonalPolicy = () => import('@/components/personalPolicy');
const VehiclePolicy = () => import('@/components/vehiclePolicy');
const IndustryPolicy = () => import('@/components/industryPolicy');
const PolicyInquiry = () => import('@/components/policyInquiry');
const ActivityZone = () => import('@/components/activityZone');
const PersonalDetail = () => import('@/components/personalDetail');
const MyAssets = () => import('@/components/myAssets');
const BankInformation = () => import('@/components/bankInformation');
const SetUp = () => import('@/components/setUp');
const policyPreview = () => import('@/page/official/policyPreview');
const insuranceHuaAn = () => import('@/page/official/huaAn/insuranceHuaAn');
const TopContacts = () => import('@/components/topContacts');
const AddContacts = () => import('@/components/addContacts');
const IndexArticle = () => import('@/components/indexArticle');
const CommentList = () => import('@/components/CommentList');
const ProfessionalQualifications = () => import('@/components/ProfessionalQualifications');
const insurancePingAn = () => import('@/page/official/pingAn/insurancePingAn');
const insuranceZiJin = () => import('@/page/official/ziJin/insuranceZiJin');
const insuranceAnlian = () => import('@/page/official/anlian/insuranceAnlian');
const insuranceAnXin = () => import('@/page/official/anxin/insuranceAnXin');
const insuranceDaJiaBao = () => import('@/page/official/daJiaBao/insuranceDaJiaBao');
const insuranceRenBao = () => import('@/page/official/renBao/insuranceRenBao');
const insurancePingAnQiXiu = () => import('@/page/official/pingAn/insurancePingAnQiXiu');
const insurancePingAnKaoShi = () => import('@/page/official/pingAn/insurancePingAnKaoShi');
const insuranceLiBao = () => import('@/page/official/liBao/insuranceLiBao');
const insuranceJiaZheng = () => import('@/page/official/pingAn/insuranceJiaZheng');
const insuranceJiaCheng = () => import('@/page/official/pingAn/insuranceJiaCheng');
const industryJiaCheng = () => import('@/page/official/pingAn/industryJiaCheng');
const industryJiaChengPreview = () => import('@/page/official/pingAn/industryJiaChengPreview');
const insuranceZhongAn = () => import('@/page/official/zhongAn/insuranceZhongAn');
const insuranceTianAn = () => import('@/page/official/tianAn/insuranceTianAn');
const healthInformZhongAn = () => import('@/page/official/zhongAn/healthInformZhongAn');
const insuranceDDB = () => import('@/page/official/heZhong/insuranceDDB');
const ClaimsService = () => import('@/components/ClaimsService');
const chat = () => import('@/page/official/chat');
const serviceCenter = () => import('@/components/serviceCenter');
const companyIntroduction = () => import('@/components/companyIntroduction');
const record = () => import('@/components/record');
const CustomizedInsurance = () => import('@/components/CustomizedInsurance');
const InsuranceSale = () => import('@/components/InsuranceSale');
const Customize = () => import('@/components/Customize');
const CustomizeMessage = () => import('@/components/CustomizeMessage');
const QualificationLicence = () => import('@/components/QualificationLicence');
const contactUs = () => import('@/components/contactUs');
const editContacts = () => import('@/components/editContacts');
const billingDetails = () => import('@/components//billingDetails');
const DetailedInstructions = () => import('@/components/DetailedInstructions');
const alterName = () => import('@/components/alterName');
const PersonalTailor = () => import('@/components/PersonalTailor');
const WithdrawalInformation = () => import('@/components/WithdrawalInformation');
const paymentFailure = () => import('@/page/official/paymentFailure');
const identityAuthentication = () => import('@/page/official/identityAuthentication');
const cashOut = () => import('@/components/cashOut');//提现
const IndustryClass = () => import('@/page/official/IndustryClass');//行业保险
const IndustryList = () => import('@/page/official/IndustryList');//行业列表
const zhonganAppSuccess = () => import('@/page/official/zhongAn/zhonganAppSuccess');
const notFound = () => import('@/page/official/notFound');
const zhongAnFamilyProview = () => import('@/page/official/zhongAn/zhongAnFamilyProview');//众安预览页面
const historyPolicy = () => import('@/components/historyPolicy');//历史保单
const carHistoryPolicy = () => import('@/components/historyPolicy/carHistoryPolicy');//车险历史保单
const industryHistoryPolicy = () => import('@/components/historyPolicy/industryHistoryPolicy');//行业险历史保单
const personalHistoryPolicy = () => import('@/components/historyPolicy/personalHistoryPolicy');//个险历史保单
const personnalpolicyDetail = () => import('@/components/historyPolicy/personnalpolicyDetail');//个险保单历史保单详情
const qixiuDetails = () => import('@/components/historyPolicy/qixiuDetails');//汽修历史详情页面
const oldPeopleDetails = () => import('@/components/historyPolicy/oldPeopleDetails');//老年人历史保单详情页面    
const anXinCarDetail = () => import('@/components/historyPolicy/anXinCarDetail');//安心车险历史保单详情页面    anXinCarDetail
const weiXiuGuaranteeSlip = () => import('@/components/weiXiuGuaranteeSlip');//维修批单详情
const BeneficiaryData = () => import('@/components/base/BeneficiaryData');//投保配置页面---受益人信息基础组件
const MultipleInsured = () => import('@/components/base/MultipleInsured');//投保配置页面---多个被保险人基础组件
const CommonProvinces = () => import('@/components/base/CommonProvinces');//公用省市区组件
const BeneficiaryPreview = () => import('@/page/official/tianAn/BeneficiaryPreview');//保单预览页面---受益人预览基础组件
const TianAnPayState = () => import('@/page/official/pingAn/TianAnPayState');//保单预览页面---受益人预览基础组件
const FreeInsurance = () => import('@/page/official/activity/FreeInsurance');//免费领取保险组件
const GetSuccess = () => import('@/components/GetSuccess');//免费领取保险组件
const WithdrawalInstructions = () => import('@/components/WithdrawalInstructions');//提现说明
const withdrawDepositResule = () => import('@/components/withdrawDepositResule');//提现结果
const Provinces = () => import('@/page/official/heZhong/Provinces');//省市区库
const Profession = () => import('@/page/official/heZhong/Profession');//职业分类库
const bankList = () => import('@/page/official/heZhong/bankList');//职业分类库
const IdCardIdentification = () => import('@/components/base/IdCardIdentification');//身份证识别


//代理人子路由拆分
import agent from './agent.js'
// 文章路由
import article from './article.js'

Vue.use(Router)


let routes = [
  {
    path: '/',
    name: 'footMenu',
    component: resolve => require(['@/components/footMenu.vue'], resolve),
    // redirect:'/home',
    children:[
      // 首页页面
      {
        path: '/',
        name: 'home',
        component: Home,
        meta: {
          title: '保险经纪网',
          allowShare: true
        }
      },
      // 分类页面
      {
        path: '/classlist',
        name: 'classlist',
        component: Classlist
      },
      // 我的页面
      {
        path: '/mine',
        name: 'mine',
        component: Mine,
      },
      // 学习页面
      {
        path: '/study',
        name: 'Study',
        component: Study
      }
    ]
  },
  {
    path: '/chat',
    name: 'chat',
    component: chat
  }, 
  //产品详情页
  {
    path: '/productdetail',
    name: 'productdetail',
    component: Productdetail,
    meta: {
      title: '产品详情',
      allowShare: true
    }
  },
  // 登录注册主页面
  {
    path: '/loginRegister',
    name: 'loginRegister',
    component: LoginRegister
  },
  // 密码登录
  {
    path: '/loginMain',
    name: 'loginMain',
    component: LoginMain
  },
  // 短信登陆
  {
    path: '/quickLogin',
    name: 'quickLogin',
    component: QuickLogin
  },
  // 忘记密码
  {
    path: '/forgetWord',
    name: 'forgetWord',
    component: ForgetWord
  },
  // 重置密码
  {
    path: '/resetPassword',
    name: 'resetPassword',
    component: ResetPassword
  },
  // 重置成功
  {
    path: '/resetSuccess',
    name: 'resetSuccess',
    component: ResetSuccess
  },
  // 注册页面
  {
    path: '/registerMain',
    name: 'registerMain',
    component: RegisterMain
  },
  // 注册成功
  {
    path: '/registerSuccess',
    name: 'registerSuccess',
    component: RegisterSuccess
  },
  //微信中打开H5页面
  {
    path: '/binduser',
    name: 'bindUser',
    component: BindUser
  },
  // 常见问题
  {
    path: '/commonProblem',
    name: 'commonProblem',
    component: CommonProblem
  },
  //产品详情贴心服务
  {
    path: '/intimateService',
    name: 'intimateService',
    component: IntimateService
  },
  //商品详情查看文章
  {
    path: '/articleDetail',
    name: 'articleDetail',
    component: ArticleDetail
  },
  {
    path: '/indexArticle',
    name: 'indexArticle',
    component: IndexArticle
  },
  //产品条款
  {
    path: '/productTerms',
    name: 'productTerms',
    component: ProductTerms
  },
  //支付成功
  {
    path: '/paySuccess',
    name: 'paySuccess',
    component: PaySuccess
  },
  //健康告知统一回答
  {
    path: '/healthInform',
    name: 'healthInform',
    component: HealthInform
  },
  {
    path: '/healthInformZhongAn',
    name: 'healthInformZhongAn',
    component: healthInformZhongAn
  },
  //我的评价
  {
    path: '/myEvaluation',
    name: 'myEvaluation',
    component: MyEvaluation
  },
  //个人资料
  {
    path: '/personalData',
    name: 'personalData',
    component: PersonalData
  },
  // 个人保单、团险保单、车险保单
  {
    path: '/personalPolicy',
    name: 'personalPolicy',
    component: PersonalPolicy
  },
  {
    path: '/industryPolicy',
    name: 'industryPolicy',
    component: IndustryPolicy
  },
  {
    path: '/vehiclePolicy',
    name: 'vehiclePolicy',
    component: VehiclePolicy
  },
  //保单详情
  {
    path: '/personalDetail',
    name: 'personalDetail',
    component: PersonalDetail
  },
  //保单管理
  {
    path: '/policyInquiry',
    name: 'policyInquiry',
    component: PolicyInquiry
  },
  // 保单管理记录
  {
    path: '/record',
    name: 'record',
    component: record
  },
  //活动专区
  {
    path: '/activityZone',
    name: 'activityZone',
    component: ActivityZone
  },
  //设置
  {
    path: '/setUp',
    name: 'setUp',
    component: SetUp
  },
  //我的资产
  {
    path: '/myAssets',
    name: 'myAssets',
    component: MyAssets
  },
  //完善银行账户信息
  {
    path: '/bankInformation',
    name: 'bankInformation',
    component: BankInformation
  },
  //预览页面
  {
    path: '/policyPreview',
    name: 'policyPreview',
    component: policyPreview,
    meta: {
      allowShare: true
    }
  },
  //通用配置投保页面
  {
    path: '/insuranceHuaAn',
    name: 'insuranceHuaAn',
    component: insuranceHuaAn
  },
  //常用联系人
  {
    path: '/topContacts',
    name: 'topContacts',
    component: TopContacts
  },
  // 添加常用联系人
  {
    path: '/addContacts',
    name: 'addContacts',
    component: AddContacts
  },
  // 编辑常用联系人
  {
    path: '/editContacts',
    name: 'editContacts',
    component: editContacts
  },
  // 用户评论
  {
    path: '/CommentList',
    name: 'CommentList',
    component: CommentList
  },
  // 执业
  {
    path: '/ProfessionalQualifications',
    name: 'ProfessionalQualifications',
    component: ProfessionalQualifications
  },
  //平安保险公司产品
  {// 平安畅游九州境内旅行保险
    path: '/insurancePingAn',
    name: 'insurancePingAn',
    component: insurancePingAn
  },
  {//紫金保险公司
    path: '/insuranceZiJin',
    name: 'insuranceZiJin',
    component: insuranceZiJin
  }
  ,
  {//家政
    path: '/insuranceJiaZheng',
    name: 'insuranceJiaZheng',
    component: insuranceJiaZheng
  },
  {//安心-安享一生癌症医疗险
    path: '/insuranceAnXin',
    name: 'insuranceAnXin',
    component: insuranceAnXin
  }
  ,
  {//利宝
    path: '/insuranceLiBao',
    name: 'insuranceLiBao',
    component: insuranceLiBao
  },
  {//安联财险
    path: '/insuranceAnlian',
    name: 'insuranceAnlian',
    component: insuranceAnlian
  },
  {// 大家保险
    path: '/insuranceDaJiaBao',
    name: 'insuranceDaJiaBao',
    component: insuranceDaJiaBao
  },
  {//人保财险
    path: '/insuranceRenBao',
    name: 'insuranceRenBao',
    component: insuranceRenBao
  },
  {//众安保险
    path: '/insuranceZhongAn',
    name: 'insuranceZhongAn',
    component: insuranceZhongAn
  },
  {//众安家庭版智能核保之后的页面
    path: '/zhonganAppSuccess',
    name: 'zhonganAppSuccess',
    component: zhonganAppSuccess
  },
  {//众安预览页面
    path: '/zhongAnFamilyProview',
    name: 'zhongAnFamilyProview',
    component: zhongAnFamilyProview
  },
  // 行业性项目 平安汽修
  {
    path: '/insurancePingAnQiXiu',
    name: 'insurancePingAnQiXiu',
    component: insurancePingAnQiXiu
  },
  // 行业性项目 平安驾驶人考试
  {
    path: '/insurancePingAnKaoShi',
    name: 'insurancePingAnKaoShi',
    component: insurancePingAnKaoShi
  },
  // 理赔服务页面
  {
    path: '/ClaimsService',
    name: 'ClaimsService',
    component: ClaimsService
  },
  // 客服中心
  {
    path: '/serviceCenter',
    name: 'serviceCenter',
    component: serviceCenter
  },
  {
    path: '/companyIntroduction',
    name: 'companyIntroduction',
    component: companyIntroduction
  },
  // 保险特卖
  {
    path: '/InsuranceSale',
    name: 'InsuranceSale',
    component: InsuranceSale
  },
  // 首页 定制保险
  {
    path: '/CustomizedInsurance',
    name: 'CustomizedInsurance',
    component: CustomizedInsurance
  },
  // 首页 私人定制 
  {
    path: '/Customize',
    name: 'Customize',
    component: Customize,
  },
  // 私人定制详情
  {
    path: '/CustomizeMessage',
    name: 'CustomizeMessage',
    component: CustomizeMessage,
  },
  // 资质牌照
  {
    path: '/QualificationLicence',
    name: 'QualificationLicence',
    component: QualificationLicence,
  },
  // 联系我们 
  {
    path: '/contactUs',
    name: 'contactUs',
    component: contactUs,
  },
  // 修改昵称
  {
    path: '/alterName',
    name: 'alterName',
    component: alterName,
  },
  // 智能核保
  {
    path: '/PersonalTailor',
    name: 'PersonalTailor',
    component: PersonalTailor,
  },
  // 个人资料 提现信息
  {
    path: '/WithdrawalInformation',
    name: 'WithdrawalInformation',
    component: WithdrawalInformation,
  },
  //提现
  {
    path: '/cashOut',
    name: 'cashOut',
    component: cashOut,
  },
  // 提现明细
  {
    path: '/billingDetails',
    name: 'billingDetails',
    component: billingDetails,
  },
  // 明细说明
  {
    path: '/DetailedInstructions',
    name: 'DetailedInstructions',
    component: DetailedInstructions,
  },
  // 支付失败
  {
    path: '/paymentFailure',
    name: 'paymentFailure',
    component: paymentFailure,
  },
  // 实名认证
  {
    path: '/identityAuthentication',
    name: 'identityAuthentication',
    component: identityAuthentication,
  },
  // 行业保险分类
  {
    path: '/IndustryClass',
    name: 'IndustryClass',
    component: IndustryClass,
  },
  // 行业保险列表
  {
    path: '/IndustryList',
    name: 'IndustryList',
    component: IndustryList,
  },
  {
    path: '/historyPolicy',
    name: 'historyPolicy',
    component: historyPolicy,
    redirect: '/personalHistoryPolicy',
    children: [
      // 个险历史保单
      {
        path: '/personalHistoryPolicy',
        name: 'personalHistoryPolicy',
        component: personalHistoryPolicy,
      },
      // 行业历史保单
      {
        path: '/historyPolicy/industryHistoryPolicy',
        name: 'industryHistoryPolicy',
        component: industryHistoryPolicy,
      },
      // 车险历史保单
      {
        path: '/historyPolicy/carHistoryPolicy',
        name: 'carHistoryPolicy',
        component: carHistoryPolicy,
      }
    ]
  },
  {
    path: '/personnalpolicyDetail',
    name: 'personnalpolicyDetail',
    component: personnalpolicyDetail,
  },
  {
    path: '/qixiuDetails',
    name: 'qixiuDetails',
    component: qixiuDetails,
  },
  // 自己平台购买平安驾乘
  {
    path: '/insuranceJiaCheng',
    name: 'insuranceJiaCheng',
    component: insuranceJiaCheng,
  },
  // 渠道过来的平安驾乘订单
  {
    path: '/industryJiaCheng',
    name: 'industryJiaCheng',
    component: industryJiaCheng,
  },
  // 渠道平安驾乘预览页面
  {
    path: '/industryJiaChengPreview',
    name: 'industryJiaChengPreview',
    component: industryJiaChengPreview,
  },
  {
    path: '/oldPeopleDetails',
    name: 'oldPeopleDetails',
    component: oldPeopleDetails,
  },
  {
    path: '/anXinCarDetail',
    name: 'anXinCarDetail',
    component: anXinCarDetail,
  },
  {
    path: '/insuranceTianAn',
    name: 'insuranceTianAn',
    component: insuranceTianAn,
  },
  {
    path: '/notFound',
    name: 'notFound',
    component: notFound,
  }, 
  {
    path: '/weiXiuGuaranteeSlip',
    name: 'weiXiuGuaranteeSlip',
    component: weiXiuGuaranteeSlip,
  },
  // 合众多多宝
  {
    path: '/insuranceDDB',
    name: 'insuranceDDB',
    component: insuranceDDB,
  }
  , 
  // 受益人基础组件
  {
    path: '/BeneficiaryData',
    name: 'BeneficiaryData',
    component: BeneficiaryData,
  },
  // 多个被保险人基础组件
  {
    path: '/MultipleInsured',
    name: 'MultipleInsured',
    component: MultipleInsured,
  },
  // 公用省市区组件
  {
    path: '/CommonProvinces',
    name: 'CommonProvinces',
    component: CommonProvinces,
  },
  // 身份证识别
  {
    path: '/IdCardIdentification',
    name: 'IdCardIdentification',
    component: IdCardIdentification,
  },
  // 保单预览页面---受益人基础组件
  {
    path: '/BeneficiaryPreview',
    name: 'BeneficiaryPreview',
    component: BeneficiaryPreview,
  },
  // 中间组件，浏览器微信支付时取消，获取不到支付状态，跳转一个中间组件查询支付状态
  {
    path: '/TianAnPayState',
    name: 'TianAnPayState',
    component: TianAnPayState,
  },
  // 免费领取保险公共组件
  {
    path: '/FreeInsurance',
    name: 'FreeInsurance',
    component: FreeInsurance,
    meta: {
      allowShare: true
    }
  },
  // 领取成功页面
  {
    path: '/GetSuccess',
    name: 'GetSuccess',
    component: GetSuccess,
  },
  // 提现说明
  {
    path: '/WithdrawalInstructions',
    name: 'WithdrawalInstructions',
    component: WithdrawalInstructions,
  },
  {
    path: '/withdrawDepositResule',
    name: 'withdrawDepositResule',
    component: withdrawDepositResule,
  },
  // 省市区库
  {
    path: '/Provinces',
    name: 'Provinces',
    component: Provinces,
  },
  // 职业分类库
  {
    path: '/Profession',
    name: 'Profession',
    component: Profession,
  },
  // 多多宝预览页面
  {
    path: '/DDBPreview',
    name: 'DDBPreview',
    component: resolve => require(['@/page/official/heZhong/DDBPreview'], resolve),
  },
  {
    path: '/bankList',
    name: 'bankList',
    component: bankList,
  },
  {
    path: '/myCard',
    name: 'myCard',
    component: resolve => require(['@/components/myCard'], resolve)
  }
  // {
  // 	path: '*', 
  //   component: Home
  // }
]

routes = routes.concat(agent, article); //合并代理人路由,文章路由

const router = new Router({
  mode:'history',
  base:'hsfront',  //正式 测试
  routes,
  // 滚动行为，切换组件滚动条置顶
  // scrollBehavior 方法接收 to 和 from 路由对象。第三个参数 savedPosition 当且仅当 popstate 导航 (通过浏览器的 前进/后退 按钮触发) 时才可用
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

export default router
