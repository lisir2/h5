<!-- 组件说明 投保页面多个受益人组件-->
<template>
  <div class="BeneficiaryData">
    <p class="policyTitle">
      <van-icon
        :name="titleIcon2"
        slot="left"
        size="18px"
        style="vertical-align:middle;margin-top:-3px"
      />
      <span>受益人信息</span>
    </p>
    <ul>
      <li>
        <span class="list_01">受益人类型</span>
        <span class="list_02">
          <input
            type="text"
            placeholder="请选择受益人类型"
            id="BeneficiaryTye"
            @click="BeneficiaryTye=true"
            value="法定受益人"
            readonly
          />
          <van-icon name="arrow" />
        </span>
      </li>
    </ul>
    <ul v-for="(item,index) in beneficiaryList" :key="item[0].key">
      <div class="BeneficiaryInput">
        <p class="policyTitle">
          <span>受益人信息</span>
          <van-icon
            v-if="index != 0"
            name="delete"
            size="20px"
            style="float:right;line-height:40px;margin-right:20px;"
            @click="delInsured(index)"
          />
        </p>
        <div v-for="(items,num) in item" :key="num" :parentName="items.colcode">
          <li
            v-if="num != 0 && items.colcode != 'beneficiaryType' && items.colcode != 'beneficiaryNum'"
          >
            <span class="list_01">{{items.colname}}</span>
            <span class="list_02" v-if="items.colcode == 'beneficiaryName'">
              <input type="text" :id="'beneficiaryName'+index" :placeholder="items.value" />
            </span>
            <span class="list_02" v-else-if="items.colcode == 'beneficiaryCertificateType'">
              <input
                type="text"
                :id="items.colcode+index"
                placeholder="请选择证件类型"
                @click="BeneficiaryCert = true;OperatingBeneficiary = index"
                :ref="items.colcode"
                readonly
              />
              <van-icon name="arrow" />
            </span>
            <span class="list_02" v-else-if="items.colcode == 'beneficiaryCertificateNo'">
              <input
                type="text"
                :placeholder="items.value"
                :id="items.colcode+index"
                maxlength="18"
                @keyup="getMoreInfoInserd(index)"
              />
            </span>
            <span class="list_02" v-else-if="items.colcode == 'beneficiaryBirth'">
              <input type="text" :placeholder="items.value" :id="'beneficiaryBirth'+index" />
            </span>
            <span class="list_02" v-else-if="items.colcode == 'beneficiaryRate'">
              <input
                type="text"
                :id="items.colcode+index"
                style="width:1rem"
                :placeholder="items.value"
                class="number"
                v-once
                :value="maxbeneficiaryNum == 1 ? 100 : ''"
                :readonly="maxbeneficiaryNum == 1 ? true : false"
              />%
            </span>
            <span class="list_02" v-else-if="items.colcode == 'beneficiaryRelationship'">
              <input
                type="text"
                placeholder="请输入与被保人关系"
                :id="items.colcode+index"
                @click="RelationshipInsured_show=true;OperatingBeneficiary = index"
                :name="items.colcode"
                :ref="items.colcode"
                readonly
              />
              <van-icon name="arrow" />
            </span>
            <span class="list_02" v-else-if="items.colcode == 'beneficiaryCertType'">
              <input
                type="text"
                placeholder="请输入证件有效期"
                :id="items.colcode+index"
                @click="validityCertificate_show=true;OperatingBeneficiary = index"
                :name="items.colcode"
                :ref="items.colcode"
                readonly
              />
              <van-icon name="arrow" />
            </span>
            <span
              class="list_02"
              v-else-if="items.colcode == 'beneficiaryCertificateStartdate' || items.colcode == 'beneficiaryCertificateValidate'"
            >
              <input
                type="text"
                :id="items.colcode + index"
                :placeholder="items.value"
                :ref="items.colcode"
                readonly
                @click="dateTimeType(items.colcode,index)"
              />
              <van-icon name="arrow" />
            </span>
            <span class="list_02" v-else>
              <input type="text" :placeholder="items.value" :id="items.colcode+index" />
            </span>
          </li>
        </div>
      </div>
    </ul>

    <!-- 添加受益人按钮 -->
    <div
      class="addBeneficiary"
      style="text-align:center;margin:10px auto;display: none;"
      @click="addBeneficiary(true)"
    >
      <van-icon
        style="vertical-align: middle;margin-top:0px;"
        name="add-o"
        size="20px"
      />
      <span style="display:inline-block;">添加受益人</span>
    </div>

    <div>
      <!-- 受益人类型 -->
      <van-action-sheet
        title="请选择受益人类型"
        v-model="BeneficiaryTye"
        :actions="BeneficiaryTye_data"
        @select="BeneficiaryTye_onSelect"
        cancel-text="取消"
      />

      <!-- 受益人证件类型 -->
      <van-action-sheet
        title="请选择受益人证件类型"
        v-model="BeneficiaryCert"
        :actions="beneficiaryCertificateType"
        @select="BeneficiaryTyeCert_Select"
        cancel-text="取消"
      />

      <!-- 受益人与被保人关系 -->
      <van-action-sheet
        v-model="RelationshipInsured_show"
        :actions="RelationshipInsured"
        cancel-text="取消"
        @select="selectRelationshipInsured"
        title="请选择证件类型"
      />

      <!-- 受益人证件有效期 -->
      <van-action-sheet
        title="请选择受益人证件有效期"
        v-model="validityCertificate_show"
        :actions="validityCertificate"
        @select="BeneficiaryCert_Select"
        cancel-text="取消"
      />

      <!-- 受益人证件有效期 -->
      <van-popup v-model="dateTimeShow" :style="{ width: '80%' }">
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          title="选择年月日"
          :min-date="minDate"
          :max-date="maxDate"
          @cancel="dateTimeShow = false"
          @confirm="dateTimeConfirm"
        />
      </van-popup>
    </div>
  </div>
</template>

<script>
export default {
  name: "BeneficiaryData",
  components: {},
  data() {
    return {
      titleIcon2: require("@/assets/images/others/personal2.png"),
      BeneficiaryCert: false, //受益人证件类型
      BeneficiaryInput: false, //受益人信息输入框展示、默认不展示、选择指定受益人的时候展示
      BeneficiaryTye_data: [],
      BeneficiaryTye: false, //受益人类型弹出框，默认不展示出来
      beneficiaryList: [], //受益人数组
      beneficiaryNum: 0, //当前受益人个数
      maxbeneficiaryNum: 1, //最大受益人个数
      key: 1, //每个被保险人渲染 绑定的key值  删除的时候问题
      BeneficiaryTyeCertIndex: "", //选择受益人证件类型下标
      RelationshipInsured_show: false, //受益人与被保人关系展示
      RelationshipInsured: [], //受益人与被保人关系配置JSON数据
      beneficiaryCertificateType: [], //受益人身份证类型配置JSON数据
      validityCertificate_show: false, //受益人证件有效期 展示
      validityCertificate: [], //受益人证件有效期JSON
      OperatingBeneficiary: "", //当前操作第几个受益人
      dateTimeShow: false, //日期控件显示隐藏
      currentDate: new Date(), //当前选择日期
      minDate: new Date(new Date().setFullYear(new Date().getFullYear() - 100)), // 日期控件最小范围
      maxDate: new Date(new Date().setFullYear(new Date().getFullYear() + 100)), // 日期控件最大范围
      activityDateTimeDom: "" //当前选中的证件有效日期DOM
    };
  },
  computed: {},
  props: ["syrArr"],
  mounted() {},
  watch: {
    syrArr() {
      this.syrArr.forEach(element => {
        if (element.colcode == "beneficiaryType") {
          this.BeneficiaryTye_data = element.value;
        } else if (element.colcode == "beneficiaryNum") {
          this.maxbeneficiaryNum = element.value;
        } else if (element.colcode == "beneficiaryRelationship") {
          this.RelationshipInsured = element.value;
        } else if (element.colcode == "beneficiaryCertificateType") {
          this.beneficiaryCertificateType = element.value;
        } else if (element.colcode == "beneficiaryCertType") {
          this.validityCertificate = element.value;
        }
      });
    }
  },
  methods: {
    // 选择日期类型
    dateTimeType(colcode, index) {
      this.dateTimeShow = true;
      this.activityDateTimeDom = this.$refs[colcode][index];
      if (this.$refs[colcode][index].value != "") {
        this.currentDate = new Date(this.$refs[colcode][index].value);
      }
    },
    // 证件有效期日期选择回调
    dateTimeConfirm(date) {
      this.dateTimeShow = false;
      this.activityDateTimeDom.value = this.timestampToTime(date, true);
    },
    // 受益人证件类型选择回调
    BeneficiaryTyeCert_Select(item) {
      this.BeneficiaryCert = false;
      this.$refs.beneficiaryCertificateType[this.OperatingBeneficiary].value =
        item.value;
    },
    // 选择受益人类型回调
    BeneficiaryTye_onSelect(item) {
      this.BeneficiaryTye = false;
      $("#BeneficiaryTye").val(item.name);
      if (item.name == "指定受益人") {
        this.addBeneficiary(false);
      } else if (item.name == "法定受益人") {
        // 清除受益人
        this.beneficiaryList = [];
        this.beneficiaryNum = 0;
        // 添加受益人按钮隐藏
        $(".addBeneficiary").css("display", "none");
      }
    },
    // 受益人证件有效期选择回调
    BeneficiaryCert_Select(item) {
      this.validityCertificate_show = false;
      this.$refs.beneficiaryCertType[this.OperatingBeneficiary].value =
        item.value;
      if (item.value == "长期有效") {
        $('div[parentName="beneficiaryCertificateStartdate"]')
          .eq(this.OperatingBeneficiary)
          .hide();
        $('div[parentName="beneficiaryCertificateValidate"]')
          .eq(this.OperatingBeneficiary)
          .hide();
      } else if (item.value == "短期有效") {
        $('div[parentName="beneficiaryCertificateStartdate"]')
          .eq(this.OperatingBeneficiary)
          .show();
        $('div[parentName="beneficiaryCertificateValidate"]')
          .eq(this.OperatingBeneficiary)
          .show();
      }
    },
    // 点击添加受益人
    addBeneficiary(status) {
      if ((status == false && this.beneficiaryNum == 0) || status == true) {
        // v-for循环需要绑定一个key值 进行生成key值，key值不会重复（如果用下标在删除的时候会有问题）
        var key = this.key++;
        var Beneficiary = JSON.parse(JSON.stringify(this.syrArr));
        // 在每个受益人数组前面加上key
        Beneficiary.unshift({
          key: key
        });
        this.beneficiaryList.push(Beneficiary);
        this.beneficiaryNum++;
        var BeneficiaryId = "#beneficiaryBirth" + (this.beneficiaryNum - 1);
        this.$nextTick(function() {
          layui.use("laydate", function() {
            let laydate = layui.laydate;
            laydate.render({
              elem: BeneficiaryId,
              type: "date"
            });
          });
        });
      }

      // 受益人最多1个
      if (this.beneficiaryNum >= this.maxbeneficiaryNum) {
        $(".addBeneficiary").css("display", "none");
      } else {
        $(".addBeneficiary").css("display", "block");
      }
    },
    // 删除被保险人
    delInsured(index) {
      var that = this;
      layer.confirm(
        "确定要删除吗",
        {
          btn: ["确定", "取消"] //按钮
        },
        function() {
          that.beneficiaryList.splice(index, 1);
          layer.msg("删除成功", { icon: 1 });
          that.beneficiaryNum--;
          // 受益人最多三个
          if (this.beneficiaryNum >= this.maxbeneficiaryNum) {
            $(".addBeneficiary").css("display", "none");
          } else {
            $(".addBeneficiary").css("display", "block");
          }
        },
        function(index) {
          layer.close(index);
        }
      );
    },
    //根据输入的身份证号来自动渲染、出生日期和性别
    getMoreInfoInserd(index) {
      if ($("#beneficiaryCertificateType" + index).val() == "身份证") {
        var idVal = $("#beneficiaryCertificateNo" + index).val();
        var tBirth_y = idVal.substring(6, 10);
        var tBirth_m = idVal.substring(10, 12);
        var tBirth_d = idVal.substring(12, 14);
        var tBirth = tBirth_y + "-" + tBirth_m + "-" + tBirth_d;
        $("#beneficiaryBirth" + index).val(tBirth);
      }
    },
    // 受益人与被保人关系选择回调
    selectRelationshipInsured(data) {
      this.RelationshipInsured_show = false;
      this.$refs.beneficiaryRelationship[this.OperatingBeneficiary].value =
        data.value;
    }
  }
};
</script>

<style lang='scss' >
</style>