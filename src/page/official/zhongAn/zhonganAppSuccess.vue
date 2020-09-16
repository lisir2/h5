<!-- 组件说明 众安智能核保之后的页面=_=-->
<template>
  <div class="zhonganAppSuccess">
    <div class="defeated">
      <div v-if="notList.length == 0">
        <img class="errorImg" src="../../../assets/images/zhongAn/sorry.png" alt="失败" />
        <span>很抱歉！</span>
        <li class="title">您的投保信息未通过智能核保，请去除以下未通过核保信息后再投保</li>
        <div class="conditionOne" v-for="item in exceptList" :key="item.certificateNo">
          <span>{{item.name}}({{item.conclusionType}})</span>
          <label>
            <input type="radio" :name="item.certificateNo" @click="exceptAccept('Y',item.certificateNo)"/>
            <span>同意</span>
          </label>
          <label>
            <input type="radio" :name="item.certificateNo" @click="exceptAccept('N',item.certificateNo)"/>
            <span>不同意</span>
          </label>
        </div>
        <button @click="startF()">下一步</button>
      </div>
      <div v-else-if="notList.length != 0">
        <div v-if="status == 1" class="condition_one">
          <p style="text-align:right;font-style: italic;" v-if="exceptList.length != 0">1/2</p>
          <img class="errorImg" src="../../../assets/images/zhongAn/sorry.png" alt="失败" />
          <span>很抱歉！</span>
          <li class="title">您的投保信息未通过智能核保，请去除以下未通过核保信息后再投保</li>
          <div class="conditionOne declinature" v-for="item in notList" :key="item.certificateNo">
            <van-icon :name="rightImg" @click="right()" v-if="exceptList.length != 0" />
            <label>
              <input type="checkbox" />
              <span>{{item.name}}({{item.conclusionType}})</span>
            </label>
          </div>
          <button v-if="byList.length != 0 && exceptList.length == 0" @click="goyl()">下一步</button>
          <button v-else-if="byList.length != 0 && exceptList.length != 0" @click="gocw()">下一步</button>
          <button v-else-if="byList.length == 0 && exceptList.length != 0" @click="gocw()">下一步</button>
          <button v-else-if="exceptList.length == 0 && byList.length == 0" @click="goyl()">下一步</button>
        </div>
        <div v-if="status == 2" class="condition_tow">
          <p style="text-align:right;font-style: italic;" v-if="notList.length != 0">2/2</p>
          <img class="errorImg" src="../../../assets/images/zhongAn/sorry.png" alt="失败" />
          <span>很抱歉！</span>
          <li class="title">您的投保信息属于除外责任，请选择是否同意</li>
          <div class="conditionOne" v-for="item in exceptList" :key="item.certificateNo">
            <van-icon :name="leftImg" @click="left()" v-if="notList.length != 0" />
            <!-- <p>您的投保信息属于除外责任，请选择是否同意</p> -->
            <span>{{item.name}}({{item.conclusionType}})</span>
            <label>
              <input type="radio" :name="item.certificateNo" @click="exceptAccept('Y',item.certificateNo)"/>
              <span>同意</span>
            </label>
            <label>
              <input type="radio" :name="item.certificateNo"  @click="exceptAccept('N',item.certificateNo)"/>
              <span>不同意</span>
            </label>
          </div>
          <button @click="startF()">下一步</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../../fetch/api";
export default {
  name: "zhonganAppSuccess",
  components: {},
  data() {
    return {
      notList: [],
      exceptList: [],
      byList: [],
      orderNo: "",
      orderId: "",
      status: 1,
      leftImg: require("@/assets/images/zhongAn/left-1.png"),
      rightImg: require("@/assets/images/zhongAn/right-1.png")
    };
  },
  computed: {},
  mounted() {
    var familyQuestionnaireId = decodeURIComponent(
      this.getQueryString("familyQuestionnaireId")
    );
    var tempStorage = decodeURIComponent(this.getQueryString("tempStorage"));
    var args = this.sign({ familyQuestionnaireId, tempStorage });
    api.smartUnderwritingAccept(args).then(response => {
      if (response.success == true) {
        this.byList = response.byList;
        this.exceptList = response.exceptList;
        this.notList = response.notList;
        this.orderNo = response.orderNo;
        this.orderId = response.orderId;

        // 没有除外责任的话直接跳转 预览页面。
        if (response.notList.length == 0 && response.exceptList.length == 0) {
          this.$router.push({
            path: "/zhongAnFamilyProview",
            query: {
              orderNo: response.orderNo,
              orderId: response.orderId,
              exclusions: 'no',
            }
          });
        }
      } else {
        this.Toast("错误");
      }
    });
  },
  methods: {
    right() {
      this.gocw();
    },
    left() {
      this.status = 1;
    },
    // 去除未通过核保 进入除外责任页面
    gocw() {
      var status = "";
      for (var i = 0; i < $(".declinature input").length; i++) {
        if (
          $(".declinature input[type=checkbox]:eq(" + i + "):checked").length ==
          0
        ) {
          status = false;
        } else {
          status = true;
        }
      }

      if (status) {
        this.status = 2;
      } else {
        this.Toast("请去除拒保用户");
      }
    },
    // 同意选择除外责任
    goyl() {
      var status = "";
      for (var i = 0; i < $(".declinature input").length; i++) {
        if (
          $(".declinature input[type=checkbox]:eq(" + i + "):checked").length ==
          0
        ) {
          status = false;
        } else {
          status = true;
        }
      }
      if (status) {
        this.$router.push({
          path: "/zhongAnFamilyProview",
          query: {
            orderNo: this.orderNo,
            orderId: this.orderId
          }
        });
      } else {
        this.Toast("请去除拒保用户");
      }
    },
    // 同意除外跳到预览页面
    startF(){
      var status = true;
      for (var i = 0; i < $(".conditionOne").length; i++) {
        // 判断单选框是否选择
        if ($(".conditionOne:eq("+ i +") input[type=radio]:checked").length == 0) {
          status = false
        }
      }
      if (status) {
        this.$router.push({
          path: "/zhongAnFamilyProview",
          query: {
            orderNo: this.orderNo,
            orderId: this.orderId
          }
        });
      } else {
        this.Toast("请选择是否同意");
      }
    },
    // 责任除外接口
    exceptAccept(status,cardNo) {
      var args = this.sign({
        cardNo: cardNo,
        orderId: this.orderId,
        exceptStatus: status
      });
      // 责任除外 没有返回值
      api.exceptAccept(args).then(response => {});
    }
  }
};
</script>

<style lang='scss' scoped>
.zhonganAppSuccess {
  padding: 40px 30px;
  .defeated {
    font-size: 30px;
    // background-color: #fbfbfb;
    padding: .4rem .2rem;
    // box-shadow: 0 0 0.1rem 0.1rem #eee;
    span {
      display: inline-block;
      font-size: 30px;
    }
    .title{
      margin: 15px 48px 0 48px;
      font-size: 28px;
    }
    .errorImg {
      width: 35px;
      vertical-align: middle;
      margin-top: -8px;
    }
    .condition_one {
      position: relative;
      padding-left: 40px;
      .van-icon {
        height: 45px;
        width: 45px;
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        .van-image{
          height: 45px;
          width: 45px;
        }
      }
    }
    .condition_tow {
      position: relative;
      padding-left: 40px;
      .van-icon {
        height: 45px;
        width: 45px;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 50px;
        margin: auto;
        .van-image{
          height: 45px;
          width: 45px;
        }
      }
    }
    .conditionOne {
      margin: 0 48px 0 48px;
      margin-top: 10px;
      .van-radio-group {
        display: inline-block;
        vertical-align: middle;
        div {
          float: left;
          margin-left: 20px;
        }
      }
      span {
        display: inline-block;
        font-size: 28px;
      }
      label {
        font-size: 28px;
        margin-left: 10px;
        vertical-align: middle;
        input {
          vertical-align: middle;
        }
      }
    }
    button {
      border-radius: 6px;
      border: 0;
      text-align: center;
      color: #fff;
      background: #0088ff;
      margin: 40px auto 0;
      display: block;
      font-size: 0.3rem;
      padding: 15px 50px;
    }
  }
}
</style>