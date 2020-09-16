<!-- 组件说明 -->
<template>
  <div class="AgentAuthentication">
    <van-nav-bar title="代理人信息认证" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <p class="reminder">应监管部门要求，代理人需要进行实名认证信息后才能进行保险展业活动，请务必真实填写，通过认证后可查看和享受平台产品推广佣金及其他优质服务</p>
    <div class="title">基本信息</div>
    <div class="essentialInformation">
      <div>
        <span>姓名</span>
        <input type="text" placeholder="请输入姓名" class="name" />
      </div>
      <div>
        <span>证件号码</span>
        <input type="text" placeholder="请输入身份证号" class="idcard" maxlength="18" />
      </div>
      <div>
        <span>手机号码</span>
        <input type="text" placeholder="请输入手机号码" class="phoneCode" maxlength="11" />
      </div>
      <div>
        <span>电子邮箱</span>
        <input type="text" placeholder="请输入电子邮箱" class="email" />
      </div>
      <div>
        <span>文化程度</span>
        <input
          type="text"
          class="Culture"
          code
          placeholder="请选择文化程度"
          @click="CultureShow = true"
          readonly
        />
        <i class="layui-icon layui-icon-right"></i>
      </div>
      <div>
        <span>民族</span>
        <input type="text" class="nation" placeholder="请输入民族" />
      </div>
      <div>
        <span>政治面貌</span>
        <input type="text" class="politicsStatus" placeholder="请输入政治面貌" />
      </div>
      <div>
        <span>代理人类型</span>
        <input
          type="text"
          @click="agentTypeShow = true"
          class="AgentType"
          code
          placeholder="请选择代理人类型"
          readonly
        />
        <i class="layui-icon layui-icon-right"></i>
      </div>
      <!-- <div class="personal">
        <span>公司名称</span>
        <input type="text" class="companyName" value="浙江环晟保险经纪有限公司" placeholder="请输入公司名称" />
      </div>
      <div class="personal">
        <span>所属部门</span>
        <input type="text" class="department" placeholder="请输入所属部门" />
      </div>
      <div class="personal">
        <span>所属子部门</span>
        <input type="text" class="subdivision" placeholder="请输入所属子部门" />
      </div> -->
      <div>
        <span>居住地区</span>
        <select
          style="width: 22%;"
          class="province"
          @change="Utils.querryCity('.province','.city','.county')"
        >
          <option value>省</option>
        </select>
        <select style="width: 22%;" class="city" @change="Utils.querryArea('.city','.county')">
          <option value>市</option>
        </select>
        <select style="width: 22%;" class="county">
          <option value>区</option>
        </select>
      </div>
      <div class="detailCity">
        <span>详细地址</span>
        <input class="detailedAddress" type="text" placeholder="请输入详细地址" />
      </div>
    </div>
    <div class="title">资料上传</div>
    <div class="uploading">
      <div>
        <div class="layui-upload-drag" id="My_photo">
          <!-- 可以增加自己的样式 -->
          <input
            id="inputImage"
            class="uploadFile"
            type="file"
            accept="image/*"
            style
            @change="CropImgUpload($event,'#uploadMyPhoto','#uploadMyPhoto img')"
          />
          <i
            class="layui-icon layui-icon-add-circle"
            style="color: rgb(215, 215, 215);font-size: 40px;"
          ></i>
          <p>点击上传</p>
          <div class="layui-hide uploadImg" id="uploadMyPhoto">
            <img src alt style="max-width: 196px" />
          </div>
        </div>
        <p>
          本人照片---
          <span style="color:rgb(90, 175, 284);" @click="LookSample()">查看范例</span>
        </p>
      </div>
      <div>
        <div class="layui-upload-drag" id="academic_certificate">
          <input
            id="inputImage"
            class="uploadFile"
            type="file"
            accept="image/*"
            style
            @change="updateImg($event,'#uploadAcademicCertificate')"
          />
          <i
            class="layui-icon layui-icon-add-circle"
            style="color: rgb(215, 215, 215);font-size: 40px;"
          ></i>
          <p>点击上传</p>
          <div class="layui-hide uploadImg" id="uploadAcademicCertificate">
            <img src alt style="max-width: 196px" />
          </div>
        </div>
        <p>
          学历证书正面---
          <span style="color:rgb(90, 175, 284);" @click="LookSample()">查看范例</span>
        </p>
      </div>
      <div>
        <div class="layui-upload-drag" id="IDcard_front">
          <input
            id="inputImage"
            class="uploadFile"
            type="file"
            accept="image/*"
            style
            @change="updateImg($event,'#uploadIDcardFront')"
          />
          <i
            class="layui-icon layui-icon-add-circle"
            style="color: rgb(215, 215, 215);font-size: 40px;"
          ></i>
          <p>点击上传</p>
          <div class="layui-hide uploadImg" id="uploadIDcardFront">
            <img src alt style="max-width: 196px" />
          </div>
        </div>
        <p>
          身份证正面---
          <span style="color:rgb(90, 175, 284);" @click="LookSample()">查看范例</span>
        </p>
      </div>
      <div>
        <div class="layui-upload-drag" id="IDcard_contrary">
          <input
            id="inputImage"
            class="uploadFile"
            type="file"
            accept="image/*"
            style
            @change="updateImg($event,'#uploadIDcardContrary')"
          />
          <i
            class="layui-icon layui-icon-add-circle"
            style="color: rgb(215, 215, 215);font-size: 40px;"
          ></i>
          <p>点击上传</p>
          <div class="layui-hide uploadImg" id="uploadIDcardContrary">
            <img src alt style="max-width: 196px" />
          </div>
        </div>
        <p>
          身份证反面---
          <span style="color:rgb(90, 175, 284);" @click="LookSample()">查看范例</span>
        </p>
      </div>
    </div>
    <div class="title">签字确认</div>
    <div class="signature">
      <div class="signatureContent" @click="signature()">
        <p>点击输入您的签名</p>
      </div>
      <!-- <input type="text" @click="signature()" placeholder="点击输入您的签名"> -->
      <label for="signature">
        <input type="checkbox" id="signature" style="vertical-align: middle;margin-top: -1px;" />
        <span>我确认信息真实无误且同意</span>
      </label>
      <p style="color: #008CFF;margin-top: 0.1rem;" class="clause">
        <span @click="showFile(agreementAddress)" class="agreementAddress">《保险经纪（代理)人协议》、</span>
        <span
          @click="showFile(letterOfUndertakingAddress)"
          class="letterOfUndertakingAddress"
        >《保险经纪从业人员合规承诺书》、</span>
        <span @click="showFile(letterOfAttorneyAddress)" class="letterOfAttorneyAddress">《个人授权委托书》</span>
      </p>
    </div>
    <div class="btn-groups">
      <button class="submit save-btn" @click="submit($event)">保存</button>
      <button class="submit" id="submitBtn" @click="submit($event)">提交</button>
    </div>
    <!-- 代理人类型 -->
    <van-action-sheet
      v-model="agentTypeShow"
      :actions="agentType"
      @select="agentTypeCallback"
      cancel-text="取消"
      title="请选择代理人类型"
    />
    <!-- 文化程度 -->
    <van-action-sheet
      v-model="CultureShow"
      :actions="Culture"
      @select="CultureCallback"
      cancel-text="取消"
      title="请选择文化程度"
    />
    <!-- 签名 -->
    <van-action-sheet
      v-model="signatureShow"
      position="bottom"
      :style="{ height: '410px' }"
      title="签名"
      :lazy-render="false"
    >
      <Canvas></Canvas>
    </van-action-sheet>
    <!-- 示例 -->
    <div class="example" style="display: none;">
      <img :src="IDcardDemo" alt style="width:100%;padding: 20px;box-sizing: border-box;" />
    </div>
  </div>
</template>
<script>
import Canvas from "./Canvas";
import api from "@/fetch/api";
export default {
  name: "AgentAuthentication",
  components: {
    Canvas
  },
  data() {
    return {
      agentTypeShow: false,
      agentType: [
        // { name: "员工", code: "personalstaff" },
        { name: "互联网代理人", code: "personalconcurrentbusiness" }
      ],
      CultureShow: false,
      Culture: [
        { name: "高中", code: "5" },
        { name: "大专", code: "1" },
        { name: "本科", code: "2" },
        { name: "研究生", code: "3" },
        { name: "研究生以上", code: "4" }
      ],
      signatureShow: false,
      IDcardDemo: require("@/assets/images/agent/IDcardDemo.png"),
      agreementAddress: "agent.pdf", //代理人协议
      letterOfUndertakingAddress: "commitment.pdf", //承诺书
      letterOfAttorneyAddress: "entrust.pdf" //委托书
    };
  },
  computed: {},
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    // 代理人类型回调
    agentTypeCallback(item) {
      this.agentTypeShow = false;
      $(".AgentType").val(item.name);
      $(".AgentType").attr("code", item.code);
      if (item.name == "员工") {
        $(".personal").show();
      } else {
        $(".personal").hide();
      }
    },
    // 文化回调
    CultureCallback(item) {
      this.CultureShow = false;
      $(".Culture").val(item.name);
      $(".Culture").attr("code", item.code);
    },
    // 证件上传示范
    LookSample() {
      layer.open({
        type: 1,
        title: "示范",
        shadeClose: true,
        anim: 2,
        shade: 0.8,
        area: "100%",
        offset: "b",
        content: $(".example"), //iframe的url
        end: function(index, layero) {
          $(".example").hide();
        }
      });
    },
    // 剪切上传图片
    CropImgUpload(event, id, img) {
      var that = this;
      $(id).removeClass("layui-hide");
      this.clip(
        event,
        {
          resultObj: $(img)[0],
          aspectRatio: 1
        },
        event.target.files[0].name,
        false
      );
    },
    // fromdate上传图片，不需要剪切
    updateImg(event, id) {
      var that = this;
      var formData = new FormData();
      var upLoadImg = this.$store.state.upLoadImg;
      formData.append("file", event.target.files[0]);
      $.ajax({
        url: upLoadImg + "/openapi/common/upload",
        type: "POST",
        data: formData,
        timeout: 10000, //超时时间设置，单位毫秒
        async: true,
        cache: false,
        contentType: false,
        processData: false,
        success: function(res) {
          // 成功回调
          if (res.code == 20000) {
            $(id)
              .removeClass("layui-hide")
              .find("img")
              .attr("src", upLoadImg + res.data.filePath);
            that.Toast("成功");
          }
        }
      });
    },
    // 弹出canvas进行签名
    signature() {
      var params = {
        shopName: $(".name").val(), //代理人姓名
        phoneNo: $(".phoneCode").val(), //手机号
        province: $(".province option:checked").html(), //省名称
        cityName: $(".city option:checked").html(), //市名称
        areaName: $(".county option:checked").html(), //区名称
        cardNo: $(".idcard").val(), //证件号
        detailedAddress: $(".detailedAddress").val() //详细地址
      };

      if (params.shopName == "") {
        this.Toast("请输入姓名");
      } else if (this.Utils.isIdCard(params.cardNo) == false) {
        this.Toast("请输入正确的证件号码");
      } else if (this.Utils.isPhoneNumber(params.phoneNo) == false) {
        this.Toast("请输入正确的手机号");
      } else if (params.province == "省") {
        this.Toast("请选择省");
      } else if (params.cityName == "市") {
        this.Toast("请选择市");
      } else if (params.areaName == "区") {
        this.Toast("请选择区");
      } else if (params.detailedAddress == "") {
        this.Toast("请输入详细地址");
      } else {
        this.signatureShow = true;
      }
    },

    // 获取签名之后的pdf文件
    signPdf() {
      var params = {
        agentName: $(".name").val(), //代理人姓名
        phoneNo: $(".phoneCode").val(), //手机号
        province: $(".province option:checked").html(), //省名称
        cityName: $(".city option:checked").html(), //市名称
        areaName: $(".county option:checked").html(), //区名称
        cardNo: $(".idcard").val(), //证件号
        handSignatureUrl:
          $(".signatureContent img").length != 0
            ? $(".signatureContent img").attr("src")
            : "", //签名照片
        detailedAddress: $(".detailedAddress").val() //详细地址
      };

      api.agentSigningAgreement(this.sign(params)).then(res => {
        if (res.code == 20000) {
          this.agreementAddress = res.data.agreementAddress; //代理人协议 签名之后的pdf
          this.letterOfUndertakingAddress = res.data.letterOfUndertakingAddress; //承诺书 签名之后的pdf
          this.letterOfAttorneyAddress = res.data.letterOfAttorneyAddress; //委托书 签名之后的pdf
          this.signatureShow = false;
          this.Toast(res.message);
        } else {
          this.Toast(res.message);
        }
      });
    },

    // 提交信息
    submit(ele) {
      var params = {
        operationType: "", // 操作类型（authentication认证；preservation保存），传空默认为认证
        mId: this.getCookie("ZB_JUSER_Mid"), //微信id
        agentName: $(".name").val(), //代理人姓名
        cardNo: $(".idcard").val(), //证件号
        phoneNo: $(".phoneCode").val(), //手机号
        emailNo: $(".email").val(), //邮箱
        provinceName: $(".province option:checked").html(), //省id
        provinceId: $(".province").val(), //省id
        cityName: $(".city option:checked").html(), //市id
        cityId: $(".city").val(), //市id
        areaName: $(".county option:checked").html(), //省id
        areaId: $(".county").val(), //区id
        education: $(".Culture").attr("code"), //文化程度
        nation: $(".nation").val(), //民族
        politicalVisage: $(".politicsStatus").val(), //政治面貌
        categoryName: $(".AgentType").val(), //代理人类型
        categoryCode: $(".AgentType").attr("code"), //代理人类型code
        detailedAddress: $(".detailedAddress").val(), //详细地址
        proxyImg: $("#uploadMyPhoto img").attr("src"), //本人照片
        diplomaImg: $("#uploadAcademicCertificate img").attr("src"), //学历证书
        positiveImg: $("#uploadIDcardFront img").attr("src"), //身份证正面
        oppositeImg: $("#uploadIDcardContrary img").attr("src"), //身份证反面
        handSignatureUrl:
          $(".signatureContent img").length != 0
            ? $(".signatureContent img").attr("src")
            : "", //签名照片
        agreementAddress: this.agreementAddress, // 代理人协议地址，
        letterOfUndertakingAddress: this.letterOfUndertakingAddress, // 保险经纪从业人员合规承诺书地址，
        letterOfAttorneyAddress: this.letterOfAttorneyAddress, // 个人授权委托书地址
        isChecked: "1" //是否同意协议
      };

      console.log(params);

      var isValidPass = true;
      if ($(ele.target).hasClass("save-btn")) {
        // 保存按钮
        params.operationType = "preservation";
        isValidPass = true; // 点完提交，再点保存，保存默认校验通过
      } else {
        params.operationType = "authentication"; // 认证提交按钮
        isValidPass = this.checkAgentAuthenticationInfo(params);
      }

      // 判断代理人为员工时传 公司名称、所属部门、所属子部门
      if (params.category_code == "personalstaff") {
        params.companyName = $(".companyName").val(); //公司名称
        params.department = $(".department").val(); //所属部门
        params.childDepartment = $(".subdivision").val(); //所属子部门
      }

      if (isValidPass) {
        // 通过校验，才发请求，保存信息时，默认校验通过
        api.agentInformationAuthentication(this.sign(params)).then(res => {
          if (res.code == 20000) {
            if (params.operationType == "authentication") {
              // 认证提交操作
              this.$router.push("/AgentApplication");
            } else {
              layer.alert("保存成功！");
            }
          } else if(res.code == 20001){
            this.Toast(res.message);
          }else {
            this.Toast(res.errorMsg);
          }
        });
      }
    },

    // 信息认证校验
    checkAgentAuthenticationInfo(params) {
      // 校验参数
      if (params.agentName == "") {
        this.Toast("请输入姓名");
        return false;
      } else if (this.Utils.isIdCard(params.cardNo) == false) {
        this.Toast("请输入正确的身份证号");
        return false;
      } else if (this.Utils.GetAge(params.cardNo) >= 18 ? false : true) {
        this.Toast("年龄需要大于18岁");
        return false;
      } else if (this.Utils.isPhoneNumber(params.phoneNo) == false) {
        this.Toast("请输入正确的手机号");
        return false;
      } else if (this.Utils.isEmail(params.emailNo) == false) {
        this.Toast("请输入正确的邮箱");
        return false;
      } else if (params.education == "") {
        this.Toast("请选择文化程度");
        return false;
      } else if (params.nation == "") {
        this.Toast("请填写民族");
        return false;
      } else if (params.politicalVisage == "") {
        this.Toast("请填写政治面貌");
        return false;
      } else if (params.categoryCode == "") {
        this.Toast("请选择代理人类型");
        return false;
      } else if (
        $(".companyName").val() == "" &&
        params.categoryCode == "personalstaff"
      ) {
        //代理人类型为员工的话判断公司名称
        this.Toast("请填写公司名称");
        return false;
      } else if (
        $(".department").val() == "" &&
        params.categoryCode == "personalstaff"
      ) {
        //代理人类型为员工的话判断所属部门
        this.Toast("请填写所属部门");
        return false;
      } else if (
        $(".subdivision").val() == "" &&
        params.categoryCode == "personalstaff"
      ) {
        //代理人类型为员工的话判断属子部门
        this.Toast("请填写所属子部门");
        return false;
      } else if (params.provinceId == "") {
        this.Toast("请选择省");
        return false;
      } else if (params.cityId == "") {
        this.Toast("请选择市");
        return false;
      } else if (params.areaId == "") {
        this.Toast("请选择区或县");
        return false;
        detailedAddress;
      } else if (params.detailedAddress == "") {
        this.Toast("请输入详细地址");
        return false;
      } else if (params.proxyImg == "") {
        this.Toast("请选择本人照片");
        return false;
        // } else if (params.diplomaImg == '') {
        //     this.Toast('请选择学历证书');
        //     return false;
      } else if (params.positiveImg == "") {
        this.Toast("请选择身份证正面");
        return false;
      } else if (params.oppositeImg == "") {
        this.Toast("请选择身份证反面");
        return false;
      } else if (params.handSignatureUrl == "") {
        this.Toast("请签名");
        return false;
      } else if ($("#signature").prop("checked") == false) {
        this.Toast("请同意以下协议");
        return false;
      }

      return true;
    },
    // pdf在线预览
    showFile(url) {
      layer.open({
        type: 1,
        title: "信息(点击“+”号放大查看条款)",
        area: ["100%", "100%"], //宽高
        content:
          "<iframe src='./static/pdf/web/viewer.html?file=" +
          url +
          "' style='width:100%;height:100%'></iframe>"
      });
    }
  },
  mounted() {
    var that = this;

    // 用户进入页面判断是否登录
    var memberid = this.getCookie("ZB_JUSER_Mid");
    if (memberid == "") {
      this.$router.push("/loginRegister");
    } else {
      // 默认加载省联动
      this.Utils.queryProvince($(".province"), $(".city"), $(".county"));

      // 获取个人信息
      var params = this.sign({ mId: memberid });
      // 信息回显
      api.getCertificationInformation(params).then(result => {
        // 默认渲染注册手机号码
        $(".phoneCode").val(
          result.data.phoneNo ? result.data.phoneNo : result.data.uName
        ); //手机号
        // 注册完成 和 审核失败进行数据回显
        /**
         * 审核状态
         * 0未审核（微信用户注册成新用户的时候）
         * 1待审核（微信用户回答完代理人考试题目，完善资料后）
         * 2审核通过（后台对代理人的资料进行审核通过）
         * 3审核不通过（后台对代理人的资料进行审核不通过）
         */
        if (
          result.data.auditStatus == 2 ||
          result.data.auditStatus == 3 ||
          result.data.auditStatus == 0
        ) {
          $(".name").val(result.data.agentName); //代理人姓名
          $(".idcard").val(result.data.cardNo); //证件号
          $(".phoneCode").val(result.data.phoneNo); //手机号
          $(".email").val(result.data.emailNo); //邮箱
          // 省市区回显
          that.Utils.queryProvince(
            $(".province"),
            $(".city"),
            $(".county"),
            function() {
              $(".province")
                .find("option[value='" + result.data.provinceId + "']")
                .attr("selected", true);
              that.Utils.querryCity(
                parseInt(result.data.provinceId),
                $(".city"),
                $(".county"),
                function() {
                  $(".city")
                    .find("option[value='" + result.data.cityId + "']")
                    .attr("selected", true);
                  that.Utils.querryArea(
                    parseInt(result.data.cityId),
                    $(".county"),
                    function() {
                      $(".county")
                        .find("option[value='" + result.data.areaId + "']")
                        .attr("selected", true);
                    }
                  );
                }
              );
            }
          );
          let education = result.data.education;
          if (
            education != 1 &&
            education != 2 &&
            education != 3 &&
            education != 4 &&
            education != 5
          ) {
            education = "";
          }

          try {
            $(".Culture").val(
              this.Culture.filter(function(res) {
                return education == res.code;
              })[0].name
            ); //文化程度
            $(".Culture").attr(
              "code",
              this.Culture.filter(function(res) {
                return education == res.code;
              })[0].code
            ); //文化程度code
            $(".nation").val(result.data.nation); //民族
            $(".politicsStatus").val(result.data.politicalVisage); //政治面貌
            $(".AgentType").val(
              this.agentType.filter(function(res) {
                return result.data.applyCategoryCode == res.code;
              })[0].name
            ); //代理人类型
            $(".AgentType").attr(
              "code",
              this.agentType.filter(function(res) {
                return result.data.applyCategoryCode == res.code;
              })[0].code
            ); //代理人类型code
            // 判断代理人为员工时传 公司名称、所属部门、所属子部门
            if (result.data.applyCategoryCode == "personalstaff") {
              $(".personal").show();
              $(".companyName").val(result.data.companyName); //公司名称
              $(".department").val(result.data.department); //所属部门
              $(".subdivision").val(result.data.childDepartment); //所属子部门
            }
            $(".detailedAddress").val(result.data.detailedAddress); //详细地址
            layui.$("#uploadMyPhoto").removeClass("layui-hide");
            $("#uploadMyPhoto img").attr("src", result.data.proxyImg); //本人照片
            layui.$("#uploadAcademicCertificate").removeClass("layui-hide");
            $("#uploadAcademicCertificate img").attr(
              "src",
              result.data.diplomaImg
            ); //学历证书
            layui.$("#uploadIDcardFront").removeClass("layui-hide");
            $("#uploadIDcardFront img").attr("src", result.data.positiveImg); //身份证正面
            layui.$("#uploadIDcardContrary").removeClass("layui-hide");
            $("#uploadIDcardContrary img").attr("src", result.data.oppositeImg); //身份证反面
          } catch (error) {}
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.reminder {
  padding: 20px 25px;
  color: #e81919;
  font-size: 25px;
}

.title {
  line-height: 100px;
  background-color: #f7f7f7;
  padding-left: 30px;
  color: black;
  font-size: 30px;
  font-weight: 550;
}

.essentialInformation > div {
  margin: 0 30px;
  height: 100px;
  border-bottom: solid 1px #f1f1f1;
}

.essentialInformation span {
  width: 25%;
  display: inline-block;
  font-size: 26px;
  line-height: 100px;
}

.essentialInformation input,
.essentialInformation select {
  width: 65%;
  height: 70px;
  margin: 0;
  border: 0;
  padding: 6px;
}

.essentialInformation input {
  padding: 15px;
}

.uploading {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  text-align: center;
  margin-bottom: 40px;
}

.uploading > div {
  width: 45%;
  margin-top: 20px;
}

.layui-upload-drag {
  width: 100%;
  height: 250px;
  margin-bottom: 20px;
}

.signature {
  padding: 30px 24px;
}

.btn-groups {
  display: flex;
  width: 94%;
  margin: 0 auto;
}

.submit {
  width: 46%;
  display: inline-block;
  margin: auto;
  background-color: #f99a31;
  line-height: 70px;
  border: 0;
  color: white;
  margin-bottom: 60px;
  border-radius: 35px;
}

.submit.save-btn {
  color: #000;
  background: transparent;
  border: 2px solid #ddd;
}

.signatureContent {
  width: 100%;
  min-height: 250px;
  border: dashed 2px rgb(215, 215, 215);
  line-height: 80px;
  /* text-indent: 1em; */
  margin-bottom: 20px;
}

.signatureContent p {
  text-indent: 1em;
}

.signatureContent img {
  width: 100%;
  vertical-align: middle;
  box-sizing: border-box;
  border: solid 14px white;
}

.uploadImg {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.uploadFile {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 10;
}

.uploadImg img {
  width: 100%;
  height: 100%;
}

.personal {
  display: none;
}

.UpFile {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 30;
  top: 0;
  left: 0;
  opacity: 0;
}
</style>