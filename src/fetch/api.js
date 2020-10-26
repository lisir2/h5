import axios from 'axios';
import qs from 'qs';
import router from '../router/router'
import { Toast } from 'vant';

const apiBaseUrl = process.env.NODE_ENV === 'production' ? '' : '/api'

// axios 配置
axios.defaults.timeout = 60000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = '';

// POST传参序列化
axios.interceptors.request.use((config) => {
  // config.headers['Content-Type'] != "multipart/form-data" 上传文件不用使用stringify格式化参数
  if (config.method === 'post' && config.headers['Content-Type'] != "multipart/form-data") {
    config.data = qs.stringify(config.data);
  }
  //   if (store.state.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
  //     config.headers.Authorization = `${store.state.token}`
  //   }
  //   if (store.state.appKey) {
  //     config.headers.appKey = `${store.state.appKey}`
  //   }
  return config
}, (error) => {
  // _.toast('错误的传参', 'fail')
  return Promise.reject(error)
})

// 返回状态判断
axios.interceptors.response.use((res) => {
  if (res.headers['content-type'] === 'images/jpeg') {
    return res
  }
  return res
}, (error) => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        // 返回 401 清除token信息并跳转到登录页面
        store.commit(types.LOGOUT)
        router.replace({
          path: 'login',
          query: {
            redirect: router.currentRoute.fullPath
          }
        })
        break
      case 500:
        Toast(error.response.data.message)
        // router.replace({
        //   path: 'error',
        //   query: {
        //     redirect: router.currentRoute.fullPath
        //   }
        // })
        break
    }
  }
  // _.toast('网络异常', 'fail')
  return Promise.reject(error)
})

export function post(url, params, headers) {
  return new Promise((resolve, reject) => {
    axios.post(apiBaseUrl + url, params, headers)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export function get(url, params) {
  return new Promise((resolve, reject) => {
    console.log(apiBaseUrl + url + "?" + params);
    axios.get(apiBaseUrl + url + "?" + params)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export default {
  getLogin (params) {
    return post('/openapi/h5/user/login',params);
  },
  // 获取验证码
  getphoneCode (params) {
    return post('/openapi/h5/user/sendSMSVerification',params);
  },
  checkCode(params){
    return post('/openapi/h5/user/checkPhoneValid',params);
  },
  resetWord(params){
    return post('/openapi/h5/user/resetpwd',params);
  },
  getRegister(params){
    return post('/openapi/h5/user/register',params);
  },
  quickLogin(params){
    return post('/openapi/h5/user/h5QuickLogin',params);
  },
  getAdvcode(params){
    return post('/openapi/h5/index/getAdvByCode',params);
  },
  getBanner(params){
    return post('/openapi/h5/index/getadvlistbycid',params);
  },
  getArticle(params){
    return post('/openapi/h5/index/getBArticleByCateVal',params);
  },
  // 首页文章
  getArticleDetail(params){
    return post('/openapi/h5/index/getInsuranceClassroom',params);
  },
  getOPenid(){
    var url=encodeURIComponent(encodeURIComponent(location.href))
    return get('/openapi/wechat/auth/authorize?returnUrl='+url);
  },
  // 投保接口
  getNextload(params){
    return post('/openapi/Order/appHuaAnAddpolicy',params);
  },
  //预览接口
  getProview(params){
    return post('/openapi/Order/appPreviewpolicy',params);
  },
  //支付接口
  gePolicyPay(params){
    return post('/openapi/Order/appPaypolicy',params);
  },
  // 老年人支付
  wxH5OldOrderPay(params) {
    return post('/openapi/pay/wxH5OldOrderPay', params);
  },
  //产品详情
  getDetail(params){
    return post('/openapi/h5/product/details',params);
  },
  //获取产品条款
  getTerms(params){
    return post('/openapi/h5/product/terms',params);
  },
  //查询保险公司电话
  getCompanyTel(params){
    return post('/openapi/h5/product/getInsuranceCompany',params);
  },
  //保费试算
  getCalculation(params){
    return post('/openapi/h5/product/priceCalculation',params);
  },
  //常见问题及产品详情页中间部分文章
  getDetailArt(params){
    return post('/openapi/h5/product/prodProblem',params);
  },
  //前台获取投保页面配置
  getSetPolicy(params){
    return post('/openapi/h5/product/getProductPolicyInput',params);
  },
  getclassList(params){
    return post('/openapi/h5/product/getProdGoodsClassTags',params);
  },
  getGoodList(params){
    return post('/openapi/h5/product/getProdGoodsList',params);
  },
  // 车牌号校验
  Electromobile(params) {
    return post('/openapi/Order/checkElectromobile', params);
  },
  // 核保
  getAppAddpolicy(params) {
    return post('/openapi/Order/appAddpolicy', params);
  },
  // 获取投保声明条款
  getProdPolicyDown(params) {
    return post('/openapi/h5/product/terms', params);
  },
  // 核保
  appPreviewpolicy(params) {
    return post('/openapi/Order/appPreviewpolicy', params);
  },
  classfiy(params) {
    return post('/classfiy', params);
  },
  //保单列表
  policyList(params) {
    return post('/openapi/h5/policyDetailView/policyList', params);
  },
  //保单详情
  details(params) {
    return post('/openapi/h5/policyDetailView/details', params);
  },
  // 职业分类联动公共请求
  getOccupationList(params){
    return post('/openapi/basicData/getBaseClass', params);
  },
  // 安联省市联动公共请求
  getAnLianArea(params){
    return post('/openapi/basicData/getAnLianArea', params);
  },
  // 安联职业三级联动
  getJobByAnLian(params) {
    return post('/openapi/basicData/getJobByAnLian', params);
  },
  // 获取定制保险预约人数
  getAppointmentCount(params) {
    return post('/openapi/h5/index/getAppointmentCount', params);
  },
  // 获取定制保险 提交预约
  addAppointment(params) {
    return post('/openapi/h5/index/addAppointment', params);
  },
  // 我的 活动专区
  queryZHenAiBaoActivityOrder(params) {
    return post('/openapi/h5/activity/queryZHenAiBaoActivityOrder', params);
  },
  // 资质牌照、公司简介、联系我们通过广告位功能来读取内容接口
  getAdContent(params) {
    return post('/openapi/h5/index/getAdContent', params);
  },
  // 添加常用联系人
  insertOrUpdateFrequentContacts(params) {
    return post('/openapi/h5/personalCenter/insertOrUpdateFrequentContacts', params);
  },
  // 常用联系人查询
  queryFrequentContactsList(params) {
    return post('/openapi/h5/personalCenter/queryFrequentContactsList', params);
  },
  // 保单管理
  queryPolicy(params){
    return post('/openapi/h5/personalCenter/queryPolicy', params);
  },
  // 健康告知内容接口
  healthNote(params){
    return post('/openapi/h5/product/healthNote', params);
  },
  // 紫金职业分类
  getZiJinJob(params) {
    return post('/openapi/basicData/getZiJinJob', params);
  },
  // 获取个人资料接口
  queryPersonalInfo(params) {
    return post('/openapi/h5/personalCenter/queryPersonalInfo', params);
  },
  // 修改用户头像 
  updatePersonalImgAndInfo(params){
    return post('/openapi/h5/personalCenter/updatePersonalImgAndInfo', params);
  },
  // 家政职业分类接口
  pingAnJobAll(params) {
    return post('/openapi/lianLian/pingAnJobAll', params);
  },
  // 公共上传图片接口
  upload(params){
    return post('/openapi/common/upload', params);
  },
  // 私人定制 获取用户问题 和 答题内容
  getZnProblemAndZnAnswer(params){
    return post('/openapi/h5/personalCenter/getZnProblemAndZnAnswer', params);
  },
  // 私人定制 答题接口
  insertCustomerNewProblemAndAnswer(params) {
    return post('/openapi/h5/personalCenter/insertCustomerNewProblemAndAnswer', params);
  },
  // 获取私人定制方案   获取用户回答问题
getZnCustomerPlan(params) {
    return post('/openapi/h5/personalCenter/getZnCustomerPlan', params);
  },
  // 保单下载
  linkDownloadPolicy(params) {
    return post('/openapi/h5/personalCenter/linkDownloadPolicy', params);
  },
  // 修改实名认证信息 
  identityAuthentication(params){
    return post('/openapi/h5/personalCenter/identityAuthentication', params);
  },
  // 众安价格试算 
  zhongAnHealthPrice(params) {
    return post('/openapi/Order/zhongAnHealthPrice', params);
  },
  // 众安智能核保
  IntelligentUnderwriting(params){
    return post('/openapi/SmartUnderwriting/createFamilyQuestionnaireId', params);
  },
  // 众安智能核保结果
  smartUnderwritingAccept(params) {
    return post('/openapi/SmartUnderwriting/smartUnderwritingAccept', params);
  },
  // 众安责任除外接口
  exceptAccept(params){
    return post('/openapi/SmartUnderwriting/exceptAccept', params);
  },
  // 众安预览接口 
  zhongAnPreviewpolicy(params){
    return post('/openapi/SmartUnderwriting/appPreviewpolicy', params);
  },
  // 众安核保
  zhongAnappAddpolicy(params) {
    return post('/openapi/SmartUnderwriting/appAddpolicy', params);
  },
  // 家政省市区
  jiazhengProvinceCityArea(params){
    return post('/openapi/Order/jiazhengProvinceCityArea', params);
  },
  // 保险公司信息
  getInsuranceCompany(params) {
    return post('/openapi/h5/product/getInsuranceCompany', params);
  },
  // 批单下载 
  weiXiuEndorseNoPrinting(params){
    return post('/openapi/Order/weiXiuEndorseNoPrinting', params);
  },
  // 批单详情
  weiXiuEndorseNoDetail(params) {
    return post('/openapi/Order/weiXiuEndorseNoDetail', params);
  },
  // 人人巴士
  renrenData(params) {
    return post('/openapi/Order/renrenData', params);
  },
  // 人人巴士预览接口
  renrenPreviewData(params){
    return post('/openapi/Order/renrenPreviewData', params);
  },
    // 人人巴士投保接口
  renrenInsureData(params) {
    return post('/openapi/Order/renrenInsureData', params);
  },
  // 支付宝支付接口（如：人人巴士、大家保产品）
  ZFBalipay(params) {
    return post('/openapi/pay/alipay', params);
  },
  // 微信支付接口 (如：人人巴士、大家保产品人人巴士)
  wxOrderPay(params) {
    return post('/openapi/pay/wxOrderPay', params);
  },
  // 人人巴士自己平台支付宝支付接口 
  alipayJC(params) {
    return post('/openapi/pay/alipayJC', params);
  },
  // 人人巴士自己平台微信支付接口 
  wxOrderPayJC(params) {
    return post('/openapi/pay/wxOrderPayJC', params);
  },
  // 天安产品微信支付状态查询
  TianAnPayState(params) {
    return post('/openapi/pay/getOrderPaymentStatus', params);
  },
  // 代理人考试获取题目
  getExamination(params){
    return post('/openapi/h5/agent/getExamination', params);
  },
  // 上传代理人考试结果
  updateProxyExamination(params) {
    return post('/openapi/h5/agent/updateProxyExamination', params);
  },
  // 考试答题解析
  getAnswerAnalysis(params) {
    return post('/openapi/h5/agent/getAnswerAnalysis', params);
  },
  // 获取省数据
  querryProvince(params) {
    return post('/zbjj/config/querryProvince', params);
  },
  // 获取市数据
  querryCityByPro(params) {
    return get('/zbjj/config/querryCityByPro', qs.stringify(params));
  },
  // 获取区数据
  querryAreaByCity(params) {
    return get('/zbjj/config/querryAreaByCity', qs.stringify(params));
  },
  // 签名接口 
  agentSigningAgreement(params) {
    return post('/openapi/h5/agent/agentSigningAgreement', params);
  },
  // 代理人信息认证接口
  agentInformationAuthentication(params) {
    return post('/openapi/h5/agent/agentInformationAuthentication', params);
  },
  // 代理人状态接口查询
  getAgentAuditInformation(params) {
    return post('/openapi/h5/agent/getAgentAuditInformation', params);
  },
  // 代理人认证信息回显
  getCertificationInformation(params) {
    return post('/openapi/h5/agent/getCertificationInformation', params);
  },
  // 免费领取保险 获取领取数量
  getReceiveDetails(params) {
    return post('/openapi/h5/activity/getReceiveDetails', params);
  },
  // 免费领取保险接口
  freeCollection(params) {
    return post('/openapi/h5/activity/freeCollection', params);
  },
  // 手动授权
  userInfo(params) {
    return get('/openapi/wechat/auth/userInfo', qs.stringify(params));
  },
  // 多多宝重疾险价格试算接口
  longTermInsurancePriceCalculation(params) {
    return post('/openapi/h5/product/longTermInsurancePriceCalculation', params);
  },
  // 多多宝预览接口 
  duoduoyulan(params){
    return post('/openapi/Order/duoduoyulan', params);
  },
  // 合众承保 
  heZhongChengBao(params) {
    return post('/openapi/Order/heZhongChengBao', params);
  },
  // 查询签约手机号 
  signingQuery(params) {
    return post('/openapi/Order/signingQuery', params);
  },
  // 获取签约手机验证码
  signingApply(params) {
    return post('/openapi/Order/signingApply', params);
  },
  // 签约银行卡
  signingConfirm(params) {
    return post('/openapi/Order/signingConfirm', params);
  },
  // 根据类库编号获取详细内容 
  queryByCode(params){
    return post('/openapi/basicData/queryByCode', params);
  },
  // 提现接口
  myAssetsWithdrawalApplication(params){
    return post('/openapi/h5/agent/myAssetsWithdrawalApplication', params);
  },
  // 确定提现 
  withdrawalConfirm(params) {
    return post('/openapi/h5/agent/withdrawalConfirm', params);
  },
  // 类库
  Classlib(params) {
    return post('/openapi/basicData/getBaseClass', params);
  },
  // 保存规格
  orderMiddlePolicy(params) {
    return post('/openapi/Order/orderMiddlePolicy', params);
  },
  // 获取保存规格
  orderMiddlePolicySelect(params) {
    return post('/openapi/Order/orderMiddlePolicySelect', params);
  },
  // 完善提现信息接口地址：
  perfectAccountInformation(params) {
    return post('/openapi/h5/agent/perfectAccountInformation', params);
  },
  // 公共省市区接口
  getPingAnArea(params){
    return post('/openapi/basicData/getPingAnArea', params);
  },
  // 我的团队 
  queryMyTeam(params) {
    return post('/openapi/h5/agent/queryMyTeam', params);
  },
  // CPS 接口
  appAddCpsApiPolicy(params) {
    return post('/openapi/Order/appAddCpsApiPolicy', params);
  },
  // 文章列表接口
  study(params) {
    return post('/openapi/classroom/study', params);
  },
  // 文章详情
  studyClassroomDetail(params) {
    return post('/openapi/classroom/studyClassroomDetail', params);
  },
  // 文章阅读数加一 
  classroomRead(params) {
    return post('/openapi/classroom/classroomRead', params);
  },
  // 获取评论
  frontLeaveMessageSelect(params) {
    return post('/openapi/classroom/frontLeaveMessageSelect', params);
  },
  // 文章点赞接口 
  leaveMessageLike(params) {
    return post('/openapi/classroom/leaveMessageLike', params);
  },
  // 发布留言
  leaveMessageContent(params) {
    return post('/openapi/classroom/leaveMessageContent', params);
  },
  // 文章在看点赞 
  classroomLike(params) {
    return post('/openapi/classroom/classroomLike', params);
  },
  // 提现结果
  selectWithdrawalResults(params) {
    return post('/openapi/h5/agent/selectWithdrawalResults', params);
  },
  // 收入明细  
  queryIncomeDetails(params) {
    return post('/openapi/h5/agent/queryIncomeDetails', params);
  },
  // 支出明细  
  queryWithdrawalDetails(params) {
    return post('/openapi/h5/agent/queryWithdrawalDetails', params);
  },
  // 代理人邀请注册 
  checkRegister(params) {
    return post('/openapi/h5/agent/checkRegister', params);
  },
  // 查询客户保单 
  selectCustomerOrder(params) {
    return post('/openapi/h5/agent/selectCustomerOrder', params);
  },
  // 用户名片
  myCardSelect(params) {
    return post('/openapi/classroom/myCardSelect', params);
  },
  // 代理人注册接口
  agentInvitationToRegister(params) {
    return post('/openapi/h5/agent/agentInvitationToRegister', params);
  },
  // 佣金开关
  agentDisplaySettings(params){
    return post('/openapi/h5/agent/agentDisplaySettings', params);
  },
  // 通过memberId 获取 微商城的 userId
  getUserId(params) {
    return post('/openapi/classroom/getUserId', params);
  },
  // 修改用户名片信息  
  myCardUpdate(params){
    return post('/openapi/classroom/myCardUpdate', params);
  },
  // 文章投诉接口
  complaintSubmit(params){
    return post('/openapi/classroom/complaintSubmit', params);
  },
  // 识别身份证
  idCardUpload(params){
    return post('/openapi/h5/personalCenter/idCardUpload', params,{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  // 被保人确认订单接口  
  insuredConfirmInsuranceInformation(params){
    return post('/openapi/Order/insuredConfirmInsuranceInformation', params);
  },
  // 授权登录 关联账号并登陆
  weChatBindingPhone(params){
    return post('/openapi/h5/user/weChatBindingPhone', params);
  },
  // 授权登录 绑定未注册的账号
  weChatBindingUnregisteredPhone(params){
    return post('/openapi/h5/user/weChatBindingUnregisteredPhone', params);
  }
}
