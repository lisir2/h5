import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {   //要设置的全局访问的state对象
        orderSysSource: "HS_test", // 可回溯渠道来源 正式:HS_formal 测试:HS_test
        healthAssort: '',//是否有健康告知 2:无 0:总体 1:逐一
        // 由于接口返回图片都是相对路径，本地调试会展示不出来，正式和测试的图片服务器地址又不一样，所以
        baseImagePath: 'https://test.zgbxjj.com',  // 默认图片路径，
        bannerImagePath: 'https://test.zgbxjj.com/hsFileData',  // banner图路径
        JumpPath:'https://test.zgbxjj.com',  //弹出pdf文件路径
        upLoadImg: 'https://test.zgbxjj.com',  //上传图片路径
        appid: 'wx09f6d091df15b1f8', //测试:wx09f6d091df15b1f8    正式:wxec19abc8795c0014
        productDetail:{},  //产品详情
        toRouter:'', //将要去的路由
        fromRouter:'', //来自哪个路由
        VConsole: false, //是否开启手机端 VConsole 测试打印 (如果要开启vconsole，就把index.html 可回溯的js注释掉，因为可回溯不支持vconsole)
        // 多多宝签约银行
        bankCode: {
            1002: "中国工商银行",
            1003: "中国农业银行",
            1004: "中国银行",
            1005: "中国建设银行",
            1006: "交通银行",
            1007: "上海银行",
            1008: "北京银行",
            1009: "中国光大银行",
            1010: "兴业银行",
            1014: "招商银行",
            1015: "广东发展银行",
            1018: "华夏银行",
            1119: "宁波银行",
            2001: "中国邮政储蓄银行"
        },
    },
    getters:{   //实时监听state值的变化(最新状态)
        
    },
    mutations:{
        // 产品是否有健康告知
        healthAssort(state,value){
            state.healthAssort = value;
        },
        // 产品详情接口数据
        setProductDetail(state, value){
            state.productDetail = value;
        },
        // 将要去的路由
        toRouter(state, value){
            state.toRouter = value;
        },
        // 来自哪个路由
        fromRouter(state, value) {
            state.fromRouter = value;
        },
    },
    actions: {//自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
        
    }
});
export default store;