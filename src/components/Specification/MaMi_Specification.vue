<!-- 组件说明 多多宝 特殊规格渲染-->
<template>
  <div class="MaMi_Specification">
    <div v-for="(item,i) in prodPlanList_second" :key="item.id" :name="item.attrName">
      <div v-if="item.isDisplay == 0" class="specification_box">
        <div class="quota">
          <span class="borderA"></span>
          <p class="titleA">{{item.attrName}}</p>
        </div>
        <div class="quotaList">
          <!-- 投保人日期规格 -->
          <div v-if="item.attrName == '投保人年龄'" class="dateTime">
            <button
              type="text"
              :name="item.planAttrValList[0].id"
              @click="dateTime(item.planAttrValList[0].attrValue,'holderAge')"
              :date="item.planAttrValList[0].attrValue"
            >{{holderBirthDate}}</button>
            <van-icon name="notes-o" size="20" />
          </div>
          <!-- 投保人日期规格 -->
          <!-- 被保人日期规格 -->
          <div v-else-if="item.attrName == '被保人年龄'" class="dateTime">
            <button
              type="text"
              :name="item.planAttrValList[0].id"
              @click="dateTime(item.planAttrValList[0].attrValue,'insuredAge')"
              :date="item.planAttrValList[0].attrValue"
            >{{insuredBirthDate}}</button>
            <van-icon name="notes-o" size="20" />
          </div>
          <!-- 被保人日期规格 -->
          <div v-else>
            <van-button
              size="small"
              v-for="(part,j) in item.planAttrValList"
              :key="part.id"
              :name="part.id"
              :class="(j == 0 ? 'on' : '')"
              @click="tap($event,i,j)"
            >{{part.attrValue}}</van-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 日期控件 -->
    <van-popup v-model="dateTimeShow" position="bottom" get-container="body" :duration="0" @opened="Popup_success($event)" :overlay-style="{zIndex:'5500'}">
      <van-datetime-picker
        type="date"
        v-model="currentDate"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="dateTimeShow = false"
        @confirm="timeConfirm"
      />
    </van-popup>
    <slot></slot>
  </div>
</template>

<script>
import api from "@/fetch/api";
import $ from "jquery";
export default {
  components: {},
  name:'MaMi_Specification',
  data() {
    return {
      minDate: new Date(1910, 0, 1), //最小日期
      maxDate: new Date(), //最大日期
      currentDate: "", //当前日期
      dateTimeShow: false, //日期控件显示隐藏
      holderBirthDate: this.timestampToTime(new Date(), true), //投保人出生日期
      insuredBirthDate: this.timestampToTime(new Date(), true), //被保险人出生日期
      priceResult: "", // 价格
      basicSumInsured: [], //基本保额 规格值数组
      DeadlinePayment: [], //缴费期限 规格值数组
      InsuredPersonExemption: [], //投保人豁免 规格值数组
      lengthProtection:[], //保障期限 规格值数组
      isGoBuy:true,  // 价格试算（如果成功可以投保，失败不可以投保）是否可以投保
    };
  },
  props: ["prodPlanList_second", "planId"],
  mounted() {
    this.$nextTick(function() {
      this.insuredBirthDate = this.timestampToTime(
        this.splitStringGetTime(
          $('div[name="被保人年龄"] button').attr("date"),
          false
        ).maxDate,
        true
      );
      this.holderBirthDate = this.timestampToTime(
        this.splitStringGetTime(
          $('div[name="投保人年龄"] button').attr("date"),
          false
        ).maxDate,
        true
      );

      this.prodPlanList_second.forEach(ele => {
        // 获取基本保额数据
        if (ele.attrName == "基本保额") {
          this.basicSumInsured = ele.planAttrValList;
        }

        // 获取缴费期限数据
        if (ele.attrName == "缴费期限") {
          this.DeadlinePayment = ele.planAttrValList;
        }

        // 投保人豁免
        if (ele.attrName == "投保人豁免") {
          this.InsuredPersonExemption = ele.planAttrValList;
        }

        // 保障期限
        if(ele.attrName == "保障期限"){
          this.lengthProtection = ele.planAttrValList;
        }
      });

      // 根据被保人年龄展示 基本保额  status:是否进行价格试算
      this.renderBasicSumInsured(
        this.Utils.getFullAge(this.insuredBirthDate),
        false
      );

      // 根据投保人年龄展示 缴费期限
      this.renderDeadlinePayment(
        this.Utils.getFullAge(this.holderBirthDate),
        false
      );
    });
  },
  methods: {
    // 日期选择
    dateTime(date, attrName) {
      this.dateTimeName = attrName;
      var time = this.splitStringGetTime(date);
      this.dateTimeShow = true;
      this.minDate = time.minDate;
      this.maxDate = time.maxDate;
    },
    // 截取字符串获取投保人年龄或被保人年龄 最大范围 和 最小范围
    splitStringGetTime(date, boole) {
      var maxAge = date.split("-")[0];
      var minAge = date.split("-")[1];

      // 截取第一个范围包含“天”字，承保年龄就是（**天-**岁）
      if (maxAge.indexOf("天") != -1) {
        maxAge = new Date(
          new Date().setDate(
            new Date().getDate() - maxAge.replace(/[^0-9]/gi, "")
          )
        );
        // 截取第一个范围包含“周岁”字，承保年龄就是（**岁-**岁）
      } else if (maxAge.indexOf("周岁") != -1) {
        maxAge = new Date(
          new Date().setFullYear(
            new Date().getFullYear() - maxAge.replace(/[^0-9]/gi, "")
          )
        );
      }

      // 截取第二个范围包含“天”字，承保年龄就是（**-**天）
      if (minAge.indexOf("天") != -1) {
        minAge = new Date(
          new Date().setDate(
            new Date().getDate() - minAge.replace(/[^0-9]/gi, "")
          )
        );
        // 截取第二个范围包含“周岁”字，承保年龄就是（**-**岁）
      } else if (minAge.indexOf("周岁") != -1) {
        minAge = new Date(
          new Date().setFullYear(
            new Date().getFullYear() - minAge.replace(/[^0-9]/gi, "")
          )
        );
      }

      // 日历控件弹出默认展示时间
      if (boole == false) {
        this.currentDate = maxAge;
      } else if (this.dateTimeName == "holderAge") {
        this.currentDate = new Date(this.holderBirthDate);
      } else if (this.dateTimeName == "insuredAge") {
        this.currentDate = new Date(this.insuredBirthDate);
      }

      return {
        minDate: minAge,
        maxDate: maxAge
      };
    },
    // 立即投保
    goBuy() {
      var that = this;
      if(this.isGoBuy){
        // 判断是否登录
        if(this.getCookie("ZB_JUSER_Mid")){
          var params = this.sign({ 
            "goodId": this.getQueryString('productId'), 
            "source": "1", 
            "activityCode": "", 
            "invitationCode": this.getQueryString('invitationCode'),
            "shareLinks": this.getQueryString("shareMid"),
            "memberId": this.getCookie("ZB_JUSER_Mid")
          });

          var tempToast = this.Toast.loading({
            message: "加载中",
            duration: 0,
            forbidClick: true,
            loadingType: "spinner"
          });

          // CPS接口请求
          api.appAddCpsApiPolicy(params).then(res=>{
            if(res.code == 20000){
              tempToast.clear();
              location.href = res.data;
            }else{
              tempToast.clear();
              this.Toast(res.message);
            }
          })
        }else{
          // 弹出
          this.$emit('popupLogin', true);
        }
      }
    },
    tap(event, i, j) {
      var that = this;
      if (event) {
        var specificationBox = $(event.target)
          .parent()
          .find("button");
        // 删除一个规格模块下所有按钮的样式
        specificationBox.removeClass("on");
        // 选中按钮添加样式
        $(event.target).addClass("on");
        this.$forceUpdate();

        // 根据缴费期限 渲染保障期限
        if($(event.target).parents('div[name="缴费期限"]').length == 1){
          this.PaymentRelevanceProtectionLength($(event.target).attr('name'));
        }
      }
      //   价格试算
      this.PricesTrial();
    },
    // 价格试算
    PricesTrial() {
      var that = this;
      // 获取规格id，进行价格试算
      this.$nextTick(function() {
        var args = this.sign({
          planId: that.planId,
          guaranteePeriod: $('div[name="保障期限"] .on').text(),
          insuredBirth: $('div[name="被保人年龄"] button').text(),
          insuredSex: $('div[name="被保人性别"] .on').text(),
          guaranteeLimit: $('div[name="基本保额"] .on').text(),
          paymentPeriod: $('div[name="缴费期限"] .on').text(),
          policyHolderExemption: $('div[name="投保人豁免"] .on').text(),
          holderBirth: $('div[name="投保人年龄"] button').text(),
          holderSex: $('div[name="投保人性别"] .on').text()
        });

        // 价格接口
        api.longTermInsurancePriceCalculation(args).then(res => {
          if (res.code == 20000) {
            that.priceResult = res.data.totalPrice;
            that.$emit("Prices", res.data.totalPrice);
            that.isGoBuy = true;
            $('.MaMi_Specification .gobuy').css({
              backgroundColor: "#f9912e",
            });
          } else {
            that.priceResult = res.data.totalPrice;
            that.$emit("Prices", res.data.totalPrice);
            that.Toast(res.message);
            that.isGoBuy = false;
            $('.MaMi_Specification .gobuy').css({
              backgroundColor: "#cecece",
            });
          }
        });
      });
    },
    // 时间控件选择回调
    timeConfirm(val) {
      if (this.dateTimeName == "holderAge") {
        this.holderBirthDate = this.timestampToTime(val, true); //投保人年龄
        this.renderDeadlinePayment(
          this.Utils.getFullAge(this.holderBirthDate),
          true
        );
      } else if (this.dateTimeName == "insuredAge") {
        this.insuredBirthDate = this.timestampToTime(val, true); //被保险人年龄
        this.renderBasicSumInsured(
          this.Utils.getFullAge(this.insuredBirthDate),
          true
        );
      }
      this.dateTimeShow = false;
    },
    // 根据被保人年龄展示 基本保额  status:是否进行价格试算
    renderBasicSumInsured(age, status) {
      this.basicSumInsured.forEach((ele, index) => {
        if (!(ele.insuredMinRange <= age && ele.insuredMaxRange >= age)) {
          $('button[name="' + ele.id + '"]').addClass("specificationHide");
        } else {
          $('button[name="' + ele.id + '"]').removeClass("specificationHide");
        }
      });
      // 如果当前选中的规格被隐藏就去默认展示第一个规格
      if ($('div[name="基本保额"] button').hasClass("on specificationHide")) {
        $('div[name="基本保额"] button').removeClass("on");
        for (var i = 0; i < $('div[name="基本保额"] button').length; i++) {
          if (!$('div[name="基本保额"] button').eq(i).hasClass("specificationHide")) {
            $('div[name="基本保额"] button').eq(i).addClass("on");
            return false;
          }
      }
      }
      // 价格试算
      if (status) {
        this.PricesTrial();
      }
    },
    // 根据投保人年龄展示 缴费期限  age:年龄, status:是否价格试算,personTypep:关联类型
    renderDeadlinePayment(age, status) {
      // 根据投保人年龄范围，渲染规格
      this.DeadlinePayment.forEach((ele, index) => {
        if (!(ele.minRange <= age && ele.maxRange >= age)) {
          $('button[name="' + ele.id + '"]').addClass("specificationHide");
        } else {
          $('button[name="' + ele.id + '"]').removeClass("specificationHide");
        }
      });

      // 如果当前选中的规格被隐藏就去默认展示第一个规格
      if ($('div[name="缴费期限"] button').hasClass("on specificationHide")) {
        $('div[name="缴费期限"] button').removeClass("on");
        for (var i = 0; i < $('div[name="缴费期限"] button').length; i++) {
          if (!$('div[name="缴费期限"] button').eq(i).hasClass("specificationHide")) {
            $('div[name="缴费期限"] button').eq(i).addClass("on");
            return false;
          }
        }
      }

      // 复星联合妈咪宝贝这款产品，投保人年龄大于50周岁不能附加豁免险
      if(age > 50){
          this.InsuredPersonExemption.forEach((ele, i) => {
              if (ele.attrValue == '投保') {
                  $('button[name="' + ele.id + '"]').addClass('specificationHide');
              } else {
                  $('button[name="' + ele.id + '"]').removeClass('specificationHide');
              }
          })

          // 如果当前选中的规格被隐藏就去默认展示第一个规格
          if ($('div[name="投保人豁免"] button').hasClass('on specificationHide')) {
              $('div[name="投保人豁免"] button').removeClass('on');
              for (var i = 0; i < $('div[name="投保人豁免"] button').length; i++) {
                  if (!$('div[name="投保人豁免"] button').eq(i).hasClass('specificationHide')) {
                      $('div[name="投保人豁免"] button').eq(i).addClass('on');
                      return false;
                  }
              }
          }
      } else {
          this.InsuredPersonExemption.forEach((ele, i) => {
              $('button[name="' + ele.id + '"]').removeClass('specificationHide');
          })
      }
    
      // 价格试算
      if (status) {
        this.PricesTrial();
      }
    },
    // 根据缴费期限展示 保障期限
    PaymentRelevanceProtectionLength(name){
        this.DeadlinePayment.forEach((ele) => {
            if (name == ele.id) {
                // 配置规格分隔
                var specification = ele.guaranteePeriod.split(',');
                // 循环保障期限
                this.lengthProtection.forEach((temp) => {
                    var isshow = false;
                    // 判断要展示那些规格
                    specification.forEach((item) => {
                        // 符合条件展示
                        if (temp.attrValue == item) {
                            isshow = true;
                        }
                    })

                    if (isshow) {
                        $('button[name="' + temp.id + '"]').removeClass('specificationHide');
                    } else {
                        $('button[name="' + temp.id + '"]').addClass('specificationHide');
                    }

                    // 如果当前选中的规格被隐藏就去默认展示第一个规格
                    if ($('div[name="保障期限"] button').hasClass('on specificationHide')) {
                        $('div[name="保障期限"] button').removeClass('on');
                        for (var i = 0; i < $('div[name="保障期限"] button').length; i++) {
                            if (!$('div[name="保障期限"] button').eq(i).hasClass('specificationHide')) {
                                $('div[name="保障期限"] button').eq(i).addClass('on');
                                return false;
                            }
                        }
                    }
                })
            }
        })
    },
    // 弹出成功回调
    Popup_success(event){
      $(event).css('zIndex',999999);
    }
  }
};
</script>

<style lang="scss" scoped>
.specificationHide {
  display: none;
}
</style>