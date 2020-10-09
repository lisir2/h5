<!-- 组件说明 个险保单详情-->
<template>
  <div class="personalDetail">
    <van-nav-bar title="详情" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <div class="mainBox">
      <p class="productName">{{goodName}}</p>
      <!-- 基本信息 -->
      <div class="essentInfo">
        <van-cell title="基本信息" :icon="titleIcon1" />
        <ul>
          <li v-for="(item , index ) in BaseData" :key="index">
            <span class="list_01">{{item[0]}}</span>
            <span class="list_02">{{item[1]}}</span>
          </li>
        </ul>
      </div>
      <!-- 投保人信息 -->
      <div
        class="holderInfo"
        v-for="(item,index) in policyDetailView.policyViewHolderVoList"
        :key="index+100"
      >
        <van-cell title="投保人信息" :icon="titleIcon2" />
        <ul>
          <li v-for="(item, index) in HolerDataSort" :key="index">
            <span class="list_01">{{item[0]}}</span>
            <span class="list_02">{{item[1]}}</span>
          </li>
        </ul>
      </div>
      <!-- 被保险人信息 -->
      <div class="inserdInfo" v-for="(InsurdItem,index0) in InsurdData" :key="index0">
        <van-cell :title='"被保险人信息" + (InsurdData.length <= 1 ? "" : index0+1)' :icon="titleIcon3" />
        <ul>
          <li v-for="(item,index) in InsurdItem" :key="index">
            <span class="list_01">{{item[0]}}</span>
            <span class="list_02">{{item[1]}}</span>
            <input
              v-if="item[0] == '保单号' && item[1] != ''"
              type="button"
              value="保单下载"
              class="lookPolicy"
              @click="DownLoadPolicy(item[1],index0)"
            />
            <!-- <input v-if="item[0] == '批单号' && item[1] != ''" type="button" value="下载批单" class="DownloadOrder" @click="DownloadOrder(item[1],index0)">
            <router-link v-if="item[0] == '批单号' && item[1] != ''" :to="{path:'/weiXiuGuaranteeSlip',query:{endorseNo:item[1]}}"><input v-if="item[0] == '批单号' && item[1] != ''" type="button" value="查看详情" class="viewDetails"></router-link>-->
          </li>
        </ul>
      </div>
      <div>
        <!-- 其他信息 -->
        <div class="otherInfo" v-if="Object.keys(subjectData).length>0">
          <van-cell title="其他信息" :icon="titleIcon4" />
          <ul>
            <li v-for="(items,index) in subjectData" :key="index">
              <span class="list_01">{{items[0]}}</span>
              <span class="list_02">{{items[1]}}</span>
            </li>
          </ul>
        </div>
      </div>
      <!-- 受益人信息 -->
      <div class="otherInfo" v-if="BeneficiaryList.length > 0">
        <div v-for="(item,index) in BeneficiaryList" :key="index">
          <van-cell title="受益人信息" :icon="titleIcon5" />
          <ul >
            <li v-for="(temp,index1) in item" :key="index1">
              <span class="list_01">{{temp.key}}</span>
              <span class="list_02">{{temp.value}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="otherInfo" v-else>
        <van-cell title="受益人信息" :icon="titleIcon5" />
        <ul>
          <li>
            <span class="list_01">受益人</span>
            <span class="list_02">法定受益人</span>
          </li>
        </ul>
      </div>
      <!-- 保障责任 -->
      <!-- <div class="otherInfo">
                <van-cell title="保障责任" :icon="titleIcon6" />
                <ul>
                    <li>
                        <span>意外身故及伤残</span>
                        <span class="right_01">1万元</span>
                    </li>
                    <li>
                        <span>一般医疗保险金</span>
                        <span class="right_01">100万元</span>
                    </li>
                </ul>
      </div>-->
      <div>
        <van-cell title="条款和告知" />
        <div class="clause">
          <router-link :to="{name:'productTerms',query: {productName:goodName,planId:planId}}">《产品条款》</router-link>
          <a
            v-for="(item,index) in newClauseList"
            :key="index+1000"
            href="javascript:void(0)"
            @click="ProviewImg(link+item.termFilePath)"
          >《{{item.termName}}》</a>
        </div>
      </div>
    </div>
    <!-- 下载批单 -->
    <form
      action="https://www.zgbxjj.com/openapi/Order/weiXiuEndorseNoPrinting"
      class="weiXiuEndorseNoPrinting"
      method="post"
    >
      <input type="text" name="params" :value="params" />
    </form>
    <!-- 图片条款弹出框 -->
    <van-popup v-model="clauseShow" :style="{ width:'100%',height: '100%'}"  closeable close-icon="close">
        <div :style="{ width:'100%',height: '100%',overflow:'scroll'}">
        <van-image :src="clausePath" :style="{ width:'100%'}">
            <template v-slot:loading>
                <van-loading type="spinner" size="20" />
            </template>
        </van-image>
        </div>
    </van-popup>
  </div>
</template>

<script>
import $ from "jquery";
import api from "../fetch/api";
export default {
  components: {},
  data() {
    return {
      titleIcon1: require("../assets/images/others/personal1.png"),
      titleIcon2: require("../assets/images/others/personal2.png"),
      titleIcon3: require("../assets/images/others/personal3.png"),
      titleIcon4: require("../assets/images/others/personal4.png"),
      titleIcon5: require("../assets/images/others/personal5.png"),
      titleIcon6: require("../assets/images/others/personal6.png"),
      orderNo: "",
      goodName:'', //产品名称
      policyDetailView: "", //保单详情
      clause: "", //条款
      newClauseList: [], //最终使用的条款
      inserdList: "", //被保险人列表
      inserdInfo: "", //修改数据之后的被保险人信息
      link: this.$store.state.JumpPath, //页面跳转路径
      MapRelationShip: [], //中英文映射关系
      BaseData: [], //基础信息
      HolerData: {}, //最后要用的投保人对象，数据格式{'投保人姓名':'苗云页'}
      HolerDataSort: [], //最后要用的投保人对象，数据格式[[0:"姓名",1:"李明"],[0:"性别",1:"男"]] ,已经排序
      InsurdData: [], //最后要用的被保险人对象
      subjectData: {}, //最后要用的标的对象
      BeneficiaryList:[], // 受益人映射数据
      productId: "", //产品id
      planId: "", //计划id
      params: "", // 批单下载参数
      bankCode: this.$store.state.bankCode, // 银行类型
      brandId: "",  // 品牌id
      catId: "",  // 分类id
      typeId: "", // 类型id
      clauseShow: false, // 条款
      clausePath: '', //条款地址
    };
  },
  computed: {},
  mounted() {
    this.orderNo = this.$route.query.orderNo;
    var userId = this.getCookie("ZB_JUSER_Mid");
    var that = this;
    var args = this.sign({ orderNo: this.orderNo });
    var otherArr = [];
    var inserdArr = [];

    //获取保单详情
    api.details(args).then(res => {
      that.policyDetailView = res.data;
      that.goodName = res.data.goodName;
      that.inserdList = res.data.policyViewInsuredVoList;
      that.clause = res.data.policyViewTermsVoList;
      that.productId = res.data.goodId;
      that.planId = res.data.planId;

      //条款处理
      let data = res.data.policyViewTermsVoList;
      data.forEach(element => {
        let obj = {}; //开始组装对象
        if (element.termType == "3") {
          return;
        } else {
          obj["termName"] = element.termName;
          obj["termType"] = element.termType;
          obj["termFilePath"] = element.termFilePath;
        }

        //开始判断数组中有无该对象，有的话就不放进去
        let tag = that.newClauseList.find(item => {
          if (item.termType == obj.termType) {
            return true;
          } else {
            return false;
          }
        });

        //判断这个组装的对象到底要不要放到newClauseList里面
        if (!tag) {
          that.newClauseList.push(obj);
        }
      });

      var args1 = this.sign({
        productId: res.data.goodId,
        planId: res.data.planId
      });
      //获取产品对应的投保配置页面配置
      api.getSetPolicy(args1).then(res => {
        that.MapRelationShip = res.data.prodPolicyInputs;
        //开始映射基础信息
        let baseInfo = [
          ["订单号", that.policyDetailView.orderNo],
          ["起保日期", that.timestampToTime(that.policyDetailView.startTime)],
          ["结束日期", that.timestampToTime(that.policyDetailView.endTime)],
          ["支付时间", that.timestampToTime(that.policyDetailView.payTime)],
          ["合计保费", that.policyDetailView.policySumPrice],
          ["投保份数", that.policyDetailView.policyNum],
          ["投保时间",that.timestampToTime(that.policyDetailView.insuredTime)]
        ];

        that.BaseData = baseInfo;
        

        // 多多宝解析分类库数据
        if(this.policyDetailView.goodName == '合众多多宝终身重大疾病保险'){
          that.DDB_GuaranteeSlip(that.policyDetailView.policyViewHolderVoList[0],that.policyDetailView.policyViewInsuredVoList,that.BasicDataMapping)
        }else{
          // 保单详情页面 基本数据key值映射
          that.BasicDataMapping();
        }
      });
    });
  },
  methods: {
    // 保单详情页面 基本数据key值映射
    BasicDataMapping(){
      console.log("基本数据key值映射");
      //开始映射处理投保人信息
        let HolderObj = this.policyDetailView.policyViewHolderVoList[0];
        for (var key in HolderObj) {
          let keyNameAndSort = this.getColNameByArr(key); //得到每一个投保人对象英文键，对应的对象

          if (keyNameAndSort) {
            if (key == "holderBirth") {
              try {
                HolderObj[key] = HolderObj[key].split(" ")[0];
              } catch (error) {}
            }
            // 投保人信息value值有的时候 进行渲染
            if (HolderObj[key]) {
              this.HolerData[keyNameAndSort.sort] = [
                keyNameAndSort.name,
                HolderObj[key]
              ];
            }
          }
          //找到投保人对象里面的elseJson
          if (key == "elseJson") {
            if (!HolderObj[key]) {
              //防止elseJson为空字符串，以下解析的时候报错
              HolderObj[key] = "{}";
            }
            let elseJsonObj = JSON.parse(HolderObj[key]); //得到elseJson字符串,然后转化为对象
            for (let key in elseJsonObj) {
              let keyNameAndSort = this.getColNameByArr(key); //映射投保人elseJson对象英文键，对应的中文健
              if (keyNameAndSort) {
                this.HolerData[keyNameAndSort.sort] = [
                  keyNameAndSort.name,
                  elseJsonObj[key]
                ];
              }
            }
          }
        }
        //投保人对象进行排序
        this.HolerDataSort = Object.keys(this.HolerData).sort((a, b) => b - a).map(item=>{
          return [this.HolerData[item][0],this.HolerData[item][1]]
        });

        /**
         * 开始映射被保险人信息
         */
        let insurdArr = this.policyDetailView.policyViewInsuredVoList;
        insurdArr.forEach((item, index) => {
          if (this.policyDetailView.goodName =="浙江省汽车维修企业员工团体意外伤害保险" || this.policyDetailView.goodName == "环晟-平安家政服务综合保险") {
            delete item.linkManName; //删除经办人姓名字段
          }

          let insurdObj = {}; //被保险人对象
          let objSort = []; //被保险人对象,已经排序
          let subjectjson = item.subjectJson ? item.subjectJson : "{}";
          let subData = JSON.parse(subjectjson);  //被保险人里面的subjectJson就是其他信息
          let subObj = {}; //标的信息对象(添加排序序号，后台进行排序)
          for (var key in item) {
            let keyNameAndSort = this.getColNameByArr(key); //得到每一个被保险人对象英文键，对应的中文和排序
            if (keyNameAndSort) {
              // 截取被保险人出生日期
              if (key == "insuredBirth") {
                try {
                  item[key] = item[key].split(" ")[0];
                } catch (error) {}
              }
              if(item[key]){
                insurdObj[keyNameAndSort.sort] = [keyNameAndSort.name, item[key]];
              }
            }

            //保单号特殊处理, 这里100是排序,保单号要排到最后面
            if (key == "extPolicyNo" && item[key]) {
              insurdObj["100"] = ["保单号", item[key]];
            }

            for (var key in subData) {
              let keyNameAndSort = this.getColNameByArr(key); //得到每一个被保险人subjectJson对象英文键，对应的中文健
              if (keyNameAndSort) {
                subObj[keyNameAndSort.sort] = [
                  keyNameAndSort.name,
                  subData[key]
                ];
              }
            }
            //家政特殊处理,将标的信息合并到被保险人信息里面展示，家政的标的信息不单独展示
            if (this.policyDetailView.goodName == "环晟-平安家政服务综合保险") {
              Object.assign(insurdObj, subObj);
              subObj = {};
            }
          }
          //被保险人开始排序
          objSort = Object.keys(insurdObj).sort((a, b)=> b - a).map(item=>{
            return [insurdObj[item][0],insurdObj[item][1]]
          });
          this.InsurdData.push(objSort);

          //其他信息排序
          this.subjectData = Object.keys(subObj).sort((a, b)=> b - a).map(item=>{
            return [subObj[item][0],subObj[item][1]]
          });
        });

        /**
         * 开始映射受益人信息
         */
        let BeneficiaryArr = this.policyDetailView.policyViewBeneficiaryVoList;
        BeneficiaryArr.forEach((item,index)=>{
          // 单个受益人数组
          let BeneficiaryObj = {};
          for (var key in item) {
            // 单独处理受益人比例
            if(key == 'beneficiaryRate'){
              item[key] = item[key] * 100 + '%';
            }
            let keyNameAndSort = this.getColNameByArr(key); //得到每一个被保险人subjectJson对象英文键，对应的中文健
              if (keyNameAndSort) {
                BeneficiaryObj[keyNameAndSort.sort] = [
                  keyNameAndSort.name,
                  item[key]
                ];
              }
          }
          let sortBeneficiary = Object.keys(BeneficiaryObj).sort().map(key => {
            return {
              key: BeneficiaryObj[key][0],
              value: BeneficiaryObj[key][1]
            }
          });
          // 所有受益人
          this.BeneficiaryList.push(sortBeneficiary);
        });
    },
    // 多多宝保单特别处理
    DDB_GuaranteeSlip(holderInfo,inserdInfo,callback){
      var mappingComplete = {
        signingBank:false,  // 投保人银行是否映射完毕
        workTypeCode:false,  // 被保人职业是否映射完毕
      }

      this.getProductDetails(()=>{
        for (var key in holderInfo) {
          if (key == "bankCode") {
            holderInfo[key] = this.bankCode[holderInfo[key]];
          } else if(key == "signingBank"){
            //   获取签约银行
            this.getProfession(
              holderInfo[key],
              "省市区库"
            ).then(res=>{
              console.log("多多宝省市区分类库数据映射");
              mappingComplete.signingBank = true;
              holderInfo['signingBank'] = res[0].ext2 + " " + res[0].ext4 + " " + res[0].ext6;
              if(mappingComplete.signingBank && mappingComplete.workTypeCode){
                callback();
              }
            });
          }
        }


        for (var key in inserdInfo[0]) {
          if(key == "workTypeCode"){
            //   获取被保人职业
            this.getProfession(
              inserdInfo[0][key],
              "职业分类库"
            ).then(res=>{
              console.log("多多宝职业分类库数据映射");
              mappingComplete.workTypeCode = true;
              inserdInfo[0]['workTypeCode'] = res[0].ext1 + " " + res[0].ext3 + " " + res[0].ext5;
              if(mappingComplete.signingBank && mappingComplete.workTypeCode){
                callback();
              }
            });
          }
        }
      });
    },
    // 获取产品详情，取brandId，catId，typeId 用来映射中文职业、省市区
    getProductDetails(callback){
      var args = this.sign({
        productId: this.productId
      });
      api.getDetail(args).then(res => {
        if(res.code == 20000){
          this.brandId = res.data.prodGoods.brandId;  // 品牌id
          this.catId = res.data.prodGoods.catId; // 分类id
          this.typeId = res.data.prodGoods.typeId; // 类型id
          callback();
        }
      })
    },
    // 通过职业编码获取职业内容
    async getProfession(jobCode, classLibraries) {
      let params = {
        brandId: this.brandId,
        catId: this.catId,
        typeId: this.typeId,
        templateName: classLibraries,
        code: $.trim(jobCode)
      };

      let result = '';
      
      await api.queryByCode(this.sign(params)).then(res => {
        if (res.code == 20000) {
          result = res.data;
        }
      });
      
      return result;
    },
    // 映射中文
    getColNameByArr(colcode) {
      //传入一个英文键，返回一个中文键
      let subjectList = this.MapRelationShip;
      let obj = {}; //数组里面的一个对象
      subjectList.forEach((item, index) => {
        if (item.colcode == colcode) {
          obj.name = item.colname;
          obj.sort = item.sort;
        }
      });
      if (!(JSON.stringify(obj) == "{}")) {
        return obj;
      }
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    ProviewImg(url) {
      this.clauseShow = true; // 条款
      this.clausePath = url; //条款地址
    },
    // 保单下载
    DownLoadPolicy(policyNumber, index0) {
      //在data属性中找到下载的地址
      let policyUrl = this.inserdList[index0].policyUrl;
      if (policyNumber) {
        //如果有保单号
        if (policyUrl == "") {
          layer.open({
            area: ["70%"],
            content: "请前往PC下载保单"
          });
        } else {
          layer.open({
            area: ["70%"],
            content:
              '<p>请点击<a href="' +
              policyUrl +
              '" style="color:#008cff;">' +
              policyUrl +
              "<a>前往下载保单</p>"
          });
        }
      }

      // var args = this.sign({"orderNo":policyNumber});  //PG1000000524879425
      // this.$axios.post('/brg/openapi/h5/personalCenter/linkDownloadPolicy',args)
      // api.linkDownloadPolicy(args)
      //   .then(res=>{
      //   var response = res;
      //   if(response.code == 20000 && response.type == 'url'){
      //     layer.open({
      //       content:'请点击<a href="'+response.data+'" style="color:#008cff;">'+ response.data +'<a>前往下载保单'
      //     });
      //   }else if(response.code == 20001){
      //     this.Toast(response.message);
      //   }else{
      //     const blob = new Blob([res.data])
      //     const fileName = '保单.pdf';
      //     if ('download' in document.createElement('a')) { // 非IE下载
      //       const elink = document.createElement('a')
      //       elink.download = fileName
      //       elink.style.display = 'none'
      //       elink.href = URL.createObjectURL(blob);
      //       document.body.appendChild(elink);
      //       elink.click()
      //       URL.revokeObjectURL(elink.href); // 释放URL 对象
      //       document.body.removeChild(elink);
      //     } else { // IE10+下载
      //       navigator.msSaveBlob(blob, fileName)
      //     }
      //   }
      // })
    },
    // 批单下载
    DownloadOrder(Order, index) {
      this.params = JSON.stringify({
        policyNo: this.inserdList[index].extPolicyNo,
        endorseNo: Order,
        documentType: "3"
      });
      this.$nextTick(function() {
        $(".weiXiuEndorseNoPrinting").submit();
      });
    }
  }
};
</script>

<style lang='scss' scoped>
.personalDetail {
  background: #fff;
  .inserdInfo {
    position: relative;
  }
  .productName {
    margin: 32px;
    font-size: 32px;
    color: #333;
    font-weight: bold;
  }
  .blank10 {
    height: 20px;
    background: #f7f7f7;
  }
  div {
    .van-cell {
      margin-bottom: 20px;
      padding-bottom: 20px;
      .van-icon {
        font-size: 42px;
        .van-icon__image {
          width: 38px;
          height: 38px;
        }
      }
      .van-cell__title {
        span {
          font-size: 32px;
          color: #333;
          font-weight: 600;
        }
      }
      .van-cell__left-icon {
        line-height: 44px;
      }
    }
    ul {
      overflow: hidden;
      li {
        min-height: 70px;
        margin: 0 30px 10px;
        color: #333;
        display: flex;
        .list_01 {
          width: 30%;
          display: inline-block;
        }
        .list_02 {
          width: 70%;
          display: inline-block;
        }
        .right_01 {
          float: right;
        }
        .lookPolicy {
          width: 120px;
          height: 40px;
          display: block;
          background: #008cff;
          line-height: 40px;
          color: #fff;
          font-size: 24px;
          position: absolute;
          right: 30px;
          top: 28px;
        }
        .DownloadOrder {
          width: 120px;
          height: 40px;
          display: block;
          background: #008cff;
          line-height: 40px;
          color: #fff;
          font-size: 24px;
          position: absolute;
          // right: 30px;
          right: 160px;
          top: 28px;
        }
        .viewDetails {
          width: 120px;
          height: 40px;
          display: block;
          background: #008cff;
          line-height: 40px;
          color: #fff;
          font-size: 24px;
          position: absolute;
          right: 30px;
          text-align: center;
        }
      }
    }
  }
}
.clause {
  padding: 0 20px 20px;
  a {
    color: #008cff;
  }
}
</style>