<!-- 组件说明 多个被保险人抽离组件-->
<template>
  <div class="MultipleInsured">
    <!-- 被保险人和标的信息 -->
    <div class="allInserd">
      <div class="inserdAndOther">
        <!-- 被保险人板块 -->
        <div>
          <!-- 遍历生成被保险人模块 -->
          <div v-for="(items,index) in inserdConfigList" :key="items[0].key" class="inserdConfig">
            <div class="inserdPolicy">
              <!-- index下标小于1的话,该产品没有被保险人 -->
              <p class="policyTitle" v-if="items.length > 1">
                <van-icon
                  :name="titleIcon4"
                  slot="left"
                  size="18px"
                  style="vertical-align:middle;margin-top:-3px"
                />
                <span>被保险人信息</span>
                <van-icon
                  v-if="index != 0"
                  name="delete"
                  size="20px"
                  style="float:right;line-height:40px;margin-right:20px;"
                  @click="delInsured(index)"
                />
              </p>
              <ul>
                <li v-for="item in items" :key="item.id">
                  <span class="list_01">{{item.colname}}</span>
                  <span class="list_02">
                    <!-- 被保险人姓名 -->
                    <div v-if="item.colcode === 'insuredName'">
                      <input
                        type="text"
                        :name="item.colcode"
                        placeholder="请填写被保险人姓名"
                        :ref="item.colcode"
                        :class="'insuredName' + index"
                      />
                      <img src="../../assets/images/person.png" alt @click="contacts('bbr',index)" />
                    </div>
                    <!-- 被保险人性别 -->
                    <div v-else-if="item.colcode === 'insuredSex'">
                      <form class="layui-form" action="javascript:void;">
                        <div class="layui-input-inline insuredSex" :name="item.colcode">
                          <input
                            type="radio"
                            name="sex"
                            v-for="(radioItem,index) in item.value"
                            :key="radioItem.name"
                            :value="radioItem.value"
                            :title="radioItem.name"
                            :checked="index == 0 ? 'checked' :''"
                            :ref="item.colcode"
                          />
                        </div>
                      </form>
                    </div>
                    <!-- 被保险人证件类型 -->
                    <div v-else-if="item.colcode === 'insuredCertificateType'">
                      <input
                        type="text"
                        placeholder="请选择证件类型"
                        @select="TypeSelect_inserd"
                        @click="ChooseType_inserd(index)"
                        :name="item.colcode"
                        :id="'insuredCertificateType'+index"
                        readonly
                        :ref="item.colcode"
                      />
                      <van-icon name="arrow" />
                    </div>
                    <!-- 被保险人证件号 -->
                    <div v-else-if="item.colcode === 'insuredCertificateNo'">
                      <input
                        type="text"
                        :name="item.colcode"
                        :class="'insuredCertificateNo'+index"
                        placeholder="请填写被保险人证件号码"
                        @keyup="getMoreInfoInserd(index)"
                        maxlength="18"
                        :ref="item.colcode"
                      />
                    </div>
                    <!-- 被保险人出生日期 -->
                    <div v-else-if="item.colcode === 'insuredBirth'">
                      <input
                        type="text"
                        placeholder="请选择出生日期"
                        :id="'insuredBirth'+index"
                        :name="item.colcode"
                        readonly
                        :ref="item.colcode"
                        :class="'insuredBirth'+index"
                      />
                    </div>
                    <!-- 与投保人关系 -->
                    <div v-else-if="item.colcode === 'insuredRelationship'">
                      <van-action-sheet
                        v-model="insuredRelationship"
                        :actions="item.value"
                        @select="holderSelect_Relationship"
                        cancel-text="取消"
                        title="与投保人关系"
                      />
                      <input
                        type="text"
                        placeholder="与投保人关系"
                        @select="holderSelect_Relationship"
                        @click="showSelect_Relationship(index)"
                        :id="'insuredRelationship'+index"
                        :name="item.colcode"
                        readonly
                        :ref="item.colcode"
                      />
                      <van-icon name="arrow" />
                      <!-- <input type="text" :placeholder="item.value" :name="item.colcode"> -->
                    </div>
                    <div v-else-if="item.colcode === 'insuredPhone'">
                      <input
                        type="text"
                        :placeholder="item.value"
                        :name="item.colcode"
                        :ref="item.colcode"
                        :class="'insuredPhone' + index"
                      />
                    </div>
                    <!--学校名称-->
                    <div v-else-if="item.colcode === 'schoolName'">
                      <input
                        type="text"
                        :placeholder="item.value"
                        :name="item.colcode"
                        :ref="item.colcode"
                        :class="'schoolName' + index"
                      />
                    </div>

                    <!--班级名称-->
                    <div v-else-if="item.colcode === 'className'">
                      <input
                        type="text"
                        :placeholder="item.value"
                        :name="item.colcode"
                        :ref="item.colcode"
                        :class="'className' + index"
                      />
                    </div>
                    <!-- 家政职业分类 -->
                    <div v-else-if="item.colcode === 'jobName'" class="occupationClass">
                      <input
                        type="text"
                        @click="ShowOccupation(index)"
                        :name="item.colcode"
                        :placeholder="item.value"
                        readonly
                        :id="'occupationClass'+index"
                        :ref="item.colcode"
                      />
                      <!-- v-model="OccupationVal" -->
                    </div>
                    <div v-else>
                      <input type="text" placeholder :name="item.colcode" :ref="item.colcode" />
                    </div>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 添加被保险人按钮 -->
    <div v-if="this.insuredNum_Max > this.insuredNum">
      <div style="text-align:center;margin:10px auto;" @click="addInserd()">
        <van-icon
          style="vertical-align: middle;margin-top:0px;margin-left: 22px;"
          name="add-o"
          size="20px"
        />
        <span style="display:inline-block;">添加被保险人</span>
      </div>
    </div>
    <!-- 省市区 -->
    <van-popup v-model="areaShow" position="bottom">
      <van-area
        :area-list="areaList"
        @confirm="confirm"
        @cancel="areaShow = false;"
        :item-height="35"
      />
    </van-popup>
    <!-- 弹出遮罩层 -->
    <van-popup
      v-model="loadingShow"
      :lock-scroll="false"
      style="background-color: transparent;"
      :close-on-click-overlay="false"
    >
      <!-- 加载动画 -->
      <van-loading size="24px" vertical color="#1989fa">数据加载中...</van-loading>
    </van-popup>
    <!-- 被保险人证件类型 -->
    <van-popup v-model="insuredCertificateType" position="bottom">
      <van-picker
        show-toolbar
        title="证件类型"
        :columns="holderCertificateTypeData"
        @cancel="insuredCertificateType = false"
        @confirm="i_onConfirm"
      />
    </van-popup>
    <!-- 家政职业分类弹出 -->
    <van-action-sheet
      v-model="showOccupation"
      title="选择职业分类"
      @select="onSelectOccupation"
      cancel-text="取消"
      :actions="occupationActions"
      position="bottom"
      :style="{ height: '30%' }"
    ></van-action-sheet>
    <!-- 家政职业分类弹出 -->
    <!-- <van-action-sheet v-model="showOccupation" position="bottom" :style="{ height: '80%' }" title="选择职业分类">
        <div class="jiaZhengOccupation">
            <ul class="Occupation_one" v-for="(item,index) in OccupationData" :key="index">
                <li>{{item.remark}}</li>
                <div>
                    <div v-for="(items,index) in item.listZero" :key="index">
                        <p class="listZero" @click="childShow($event,'.listZero')">{{items.remark}}<van-icon name="arrow" style="float:right;"/></p>
                        <div class="showOccupationalName" name="listZeroContent" v-show="false" v-for="(content,index) in items.listOne" :key="index">
                            <p class="listOne" @click="childShow($event,'.listOne')">{{content.remark}}<van-icon name="arrow" style="float:right;"/></p>
                            <div class="showOccupationalName" name="listOneContent" v-show="false">
                              <p v-for="(lastContent,index) in content.listTwo" :key="index" @click="selectOccupationVal(lastContent.code,lastContent.remark,lastContent.jobType)">{{lastContent.remark}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </ul>
        </div>
    </van-action-sheet>-->
  </div>
</template>

<script>
//import x from ''
import area from "../../../static/js/area";
import api from "../../fetch/api";
import $ from "jquery";
import { isIdCard, isPhoneNumber, isEmail } from "../../util/validate";
// 弹出常用联系人
import popupContacts from "../../components/popupContacts";
export default {
  name: "MultipleInsured",
  components: {
    popupContacts
  },
  data() {
    return {
      titleIcon4: require("@/assets/images/others/personal4.png"),
      //证件类型数据
      holderCertificateTypeData: [
        "身份证",
        "护照",
        "军人证件",
        "返乡证",
        "港澳身份证",
        "士兵证",
        "港澳居民来往内地身份证",
        "台湾居民来往内地身份证",
        "组织机构代码证",
        "统一社会信用代码",
        "其他"
      ],
      loadingShow: false, //加载动画是否显示
      //三级联动
      areaList: area, //三级联动所有数据
      areaShow: false, //三级联动是否显示
      holderArray: "", //投保人配置信息(需要让用户填写的信息)
      inserdArray: "", //存放单个被保险人基本配置信息
      inserdConfigList: [], //所有被保险人信息
      //被保险人区域
      insuredCertificateType: false, //被保险人证件类型控件显示隐藏
      insuredRelationship: false, //被保险人关系类型控件显示隐藏
      //底部信息 标的信息
      currInserSelect: "", //当前选择第几个被保险人（下标）
      insuredNum: 1, //投保人个数
      insuredNum_Max: 0, //被保险人上限个数
      key: 1, //每个被保险人渲染 绑定的key值  删除的时候问题
      inserdArr: "",
      showContacts: false, //常用联系人弹窗是否显示
      person: "", //选择常用联系人的是投保人，还是被保险人
      inserdIndex: "", //选择第几个被保险人常用联系人
      showOccupation: false, //家政职业分类是否显示
      // 家政职业分类
      occupationActions: [
        { name: "保姆（全日制）", value: "4501100011", type: "1" },
        { name: "家政服务业（小时工）", value: "4501100022", type: "2" },
        { name: "干部休养所工作人员", value: "4702020012", type: "2" },
        { name: "护理机构服务人员", value: "4702020022", type: "2" },
        { name: "精神康复服务人员", value: "4702020032", type: "2" },
        { name: "老年人、残疾人养护服务人员", value: "4702020042", type: "2" },
        { name: "孤残儿童收养和庇护服务人员", value: "4702020052", type: "2" },
        { name: "社会看护与帮助服务人员", value: "4702020062", type: "2" },
        { name: "搬运工人、装卸工人", value: "3706020015", type: "5" }
      ],
      SelectIndex: "", //家政选择第几个职业分类的下标
      OccupationData: "" //家政职业全部JSON数据
    };
  },
  //  接收父组件传值 inserdList:被保人列表  holderList：投保人列表（用于选择关系本人时获取投保人信息渲染被保人）
  props: ["inserdList", "holderList", "insuredNumMax"],
  watch: {
    //   子组件接收到被保险人信息之后渲染被保险人
    inserdList: function(val) {
      this.inserdArray = JSON.parse(JSON.stringify(val));
      var key = ++this.key;
      //   自定义key值，被保险人绑定key值，以防删除时数据发生错位
      this.inserdArray.unshift({
        key: key
      });
      // inserdConfigList用来存放所有被保险人
      this.inserdConfigList.push(this.inserdArray);
      // 被保险人个数
      this.insuredNum = this.inserdConfigList.length;
      // 默认渲染第一个被保险人出生日期控件
      this.$nextTick(function() {
        layui.use(["laydate", "form"], function() {
          var laydate = layui.laydate;
          var form = layui.form;
          // 默认第一个被保险人出生日期
          laydate.render({
            elem: "#insuredBirth0",
            max: new Date().setDate(new Date().getDate()),
            done: value => {
              $("#insuredBirth0").val(value);
            }
          });
          form.render();
        });
      });
      this.$parent.changePrice(this.insuredNum); //默认调用父组件的价格试算
    },
    holderList: function(val) {
      this.holderArray = val;
    },
    insuredNumMax: function(val) {
      this.insuredNum_Max = val;
    }
  },
  mounted() {
    // 获取家政平安职业数据
    // var args1 = this.sign({ args1 });
    // api.pingAnJobAll(args1).then(res => {
    //   this.OccupationData = res.list;
    //   console.log(this.OccupationData)
    // });
  },
  methods: {
    // 家政职业分类选择回调
    onSelectOccupation(item) {
      console.log(item);
      $("#occupationClass" + this.SelectIndex).val(item.name);
      $("#occupationClass" + this.SelectIndex).attr("code", item.value);
      $("#occupationClass" + this.SelectIndex).attr("jobType", item.type);
      this.showOccupation = false;
    },
    // 家政显示职业分类选择
    ShowOccupation(index) {
      this.SelectIndex = index;
      this.showOccupation = true;
    },
    // 家政职业分类二级选择显示隐藏
    childShow(event, element) {
      if (
        $(event.target)
          .next($(".showOccupationalName"))
          .attr("class") == "showOccupationalName"
      ) {
        // 所有同层级的职业分类关闭
        if (element == ".listZero") {
          $("div[name=listZeroContent]").removeClass("OccupationalName");
        } else {
          $("div[name=listOneContent]").removeClass("OccupationalName");
        }
        // 当前点击的职业分类内容展开
        $(event.target)
          .parent("div")
          .children("div")
          .addClass("OccupationalName");
        // 所有同级职业分类三角关闭
        $(element)
          .children($(".van-icon"))
          .css("transform", "rotate(0deg)");
        // 当前点击的职业分类三角展开
        $(event.target)
          .children($(".van-icon"))
          .css("transform", "rotate(90deg)");
      } else {
        $(event.target)
          .parent("div")
          .children("div")
          .removeClass("OccupationalName");
        $(event.target)
          .children($(".van-icon"))
          .css("transform", "rotate(0deg)");
      }
    },
    // 家政职业分类三级选择获取内容和code
    selectOccupationVal(code, remark, jobType) {
      var that = this;
      $("#occupationClass" + that.SelectIndex).val(remark);
      $("#occupationClass" + that.SelectIndex).attr("code", code);
      $("#occupationClass" + that.SelectIndex).attr("jobType", jobType);
      this.showOccupation = false;
    },
    // 选择常用联系人
    ChildContacts(res) {
      // 调用父组件的常用联系人
      this.$parent.ChildContacts(res);
    },
    // 常用联系人
    contacts(person, index) {
      // 选择常用联系人回调
      this.$emit("setContacts", {
        showContacts: true,
        person: person,
        inserdIndex: index
      });
    },
    i_onConfirm(value) {
      $("#insuredCertificateType" + this.currInserSelect).val(value);
      this.insuredCertificateType = false;
    },
    // 删除被保险人
    delInsured(index) {
      var this_ = this;
      layer.confirm(
        "确定要删除吗",
        {
          btn: ["确定", "取消"] //按钮
        },
        function() {
          this_.insuredNum--;
          this_.inserdConfigList.splice(index, 1);
          layer.msg("删除成功", { icon: 1 });
          // 调用父组件的价格试算方法
          this_.$parent.changePrice(this_.insuredNum);
        },
        function(index) {
          layer.close(index);
        }
      );
    },
    //被保险人证件类型选择回调
    TypeSelect_inserd(item) {
      this.insuredCertificateType = true;
      $("#insuredCertificateType" + this.currInserSelect).val(item.name);
      // 被保人身份证锁定性别
      this.Utils.CertificateTypeLockSex(
        item.value,
        $(".insuredSex").eq(this.currInserSelect)
      );
    },
    //被保险人证件类型 显示隐藏
    ChooseType_inserd(index) {
      this.currInserSelect = index;
      this.insuredCertificateType = true;
    },
    // 投保人与被保险人关系类型选择 显示隐藏
    showSelect_Relationship(index) {
      this.currInserSelect = index;
      this.insuredRelationship = true;
    },
    //被保险人与投保人关系类型选择回调
    holderSelect_Relationship(item) {
      //获取到投保人信息
      var holder = {}; //投保人信息
      var this_ = this;
      // 获取投保人填写信息
      $.each(this.holderArray, function(index, ele) {
        if (ele.colcode == "holderSex") {
          holder[ele.colcode] = $(".holderSex")
            .find('input[name="sex"]:checked')
            .val();
        } else if (ele.colcode == "holderCertificateType") {
          holder[ele.colcode] = $("#holderCertificateType").val();
        } else {
          holder[ele.colcode] = $('[name="' + ele.colcode + '"]').val();
        }
      });
      if (item.name == "本人") {
        $(`.insuredName${this.currInserSelect}`).val(holder.holderName);
        $(`#insuredCertificateType${this.currInserSelect}`).val(
          holder.holderCertificateType
        );
        $(`.insuredCertificateNo${this.currInserSelect}`).val(
          holder.holderCertificateNo
        );
        $(`.insuredPhone${this.currInserSelect}`).val(holder.holderPhone);
        $(`#insuredBirth${this.currInserSelect}`).val(holder.holderBirth);
      } else {
        // $(`.insuredName${this.currInserSelect}`).val("");
        // $(`#insuredCertificateType${this.currInserSelect}`).val("");
        // $(`.insuredCertificateNo${this.currInserSelect}`).val("");
        // $(`.insuredPhone${this.currInserSelect}`).val("");
        // $(`#insuredBirth${this.currInserSelect}`).val("");
      }

      this.insuredRelationship = false;
      $("#insuredRelationship" + this.currInserSelect).val(item.name);
    },
    // 被保险人 输入身份证号
    getMoreInfoInserd(index) {
      if ($("#insuredCertificateType" + index).val() == "身份证") {
        var idVal = $(".insuredCertificateNo" + index).val();
        var tBirth_y = idVal.substring(6, 10);
        var tBirth_m = idVal.substring(10, 12);
        var tBirth_d = idVal.substring(12, 14);
        var tBirth = tBirth_y + "-" + tBirth_m + "-" + tBirth_d;
        $("#insuredBirth" + index).val(tBirth);
        // 性别
        if (idVal.length == 18) {
          var sex = idVal.charAt(16);
          if (sex % 2 == 0) {
            $(".insuredSex")
              .eq(index)
              .find("input[title=女]")
              .click();
          } else {
            $(".insuredSex")
              .eq(index)
              .find("input[title=男]")
              .click();
          }
          layui.use("form", function() {
            var form = layui.form;
            form.render();
          });
        } else {
          //    alert('身份证非18位证件号码')
        }
      }
    },
    // 三級联动
    confirm(val) {
      if (val[2] == undefined) {
        $("input[citySelect=" + "citySelect" + this.currInserSelect + "]").val(
          val[0].name + " " + val[1].name
        );
      } else {
        $("input[citySelect=" + "citySelect" + this.currInserSelect + "]").val(
          val[0].name + " " + val[1].name + " " + val[2].name
        );
      }
      this.areaShow = false;
    },
    // 添加被保险人
    addInserd() {
      // 被保险人个数增加
      this.insuredNum++;
      var key = ++this.key;
      // 调用父组件的价格试算方法
      this.$parent.changePrice(this.insuredNum);
      // 使用 JSON.stringify  JSON.parse转过之后，就不是址引用了
      var inserd = JSON.parse(JSON.stringify(this.inserdArray)).slice(1);
      // 添加key
      inserd.unshift({ key: key });
      this.inserdConfigList.push(inserd);
      // 渲染日历
      var inserdBirthID = "#insuredBirth" + (this.inserdConfigList.length - 1);
      this.$nextTick(function() {
        layui.use(["laydate", "form"], function() {
          var form = layui.form;
          var laydate = layui.laydate;
          laydate.render({
            elem: inserdBirthID,
            max: new Date().setDate(new Date().getDate()),
            done: value => {
              $(inserdBirthID).val(value);
            }
          });
          form.render();
        });
      });
    }
  }
};
</script>

<style lang='scss' scoped>
.MultipleInsured {
  .van-action-sheet {
    max-height: 100%;
  }
  .policyTitle {
    font-size: 32px;
    font-weight: 500;
    color: #0c0c0c;
    width: 100%;
    height: 88px;
    line-height: 88px;
    padding-left: 1em;
    background-color: #f7f7f7;
    span {
      font-size: 32px;
      font-weight: 500;
      color: #0c0c0c;
      height: 88px;
      line-height: 88px;
    }
  }
  .inserdPolicy {
    ul {
      li {
        border-bottom: 2px solid #dddddd;
        width: 100%;
        height: 100px;
        line-height: 100px;
        display: flex;
        .list_01 {
          display: inline-block;
          height: 100px;
          line-height: 100px;
          width: 27%;
          margin-left: 5%;
          color: #0c0c0c;
          font-size: 28px;
        }
        .list_02 {
          & > div {
            img {
              width: 44px;
            }
          }
          display: inline-block;
          height: 100px;
          line-height: 100px;
          .van-action-sheet__close {
            padding: 0 30px;
          }
          .van-radio-group {
            display: flex;
            margin: 30px auto;
            .van-radio {
              margin-right: 30px;
            }
          }
          input[type="text"] {
            width: 87%;
            height: 70px;
          }
        }
      }
    }
  }
  .van-dialog {
    .van-button {
      border: 0;
      width: 80%;
      margin: 0 auto;
      display: block;
      border-radius: 50px;
      margin-bottom: 20px;
      height: 40px;
      line-height: 40px;
    }
  }
  .layui-form-radio {
    margin-top: 0 !important;
  }
  .inserdPolicy ul > li:nth-of-type(1) {
    display: none !important;
  }
  #time {
    width: 87%;
    height: 98px;
  }
  // 家政职业分类联动
  .jiaZhengOccupation {
    .Occupation_one {
      & > li {
        padding: 20px 70px;
        background-color: rgb(245, 245, 245);
        text-align: center;
      }
      & > div {
        padding: 0 50px;
        border-bottom: solid 1px rgb(245, 245, 245);
        div {
          p {
            padding: 20px 0;
          }
          div {
            p {
              padding: 20px 40px;
              border-top: solid 1px rgb(245, 245, 245);
            }
            div {
              p {
                padding: 20px 80px;
                border-top: solid 1px rgb(245, 245, 245);
              }
            }
          }
        }
      }
    }
  }
  .OccupationalName {
    display: block !important;
  }
}

// 家政职业分类联动
</style>