<!-- 组件说明 定制保险 -->
<template>
  <div class="content">
    <van-nav-bar
      title="定制保险"
      left-arrow
      @click-left="onClickLeft"
      />
    <div class="banner">
      <img src="@/assets/images/CustomizedInsurance/dzbx.jpg" alt />
    </div>
    <div class="order_box">
      <p>
        今日已有
        <span>{{number}} </span>提交
      </p>
      <li>
        <span>姓名：</span>
        <input type value placeholder="请填写您的姓名" v-model="userName" />
      </li>
      <li>
        <span>手机号：</span>
        <input type id="user_phone" value placeholder="请填写您的手机号码" v-model="userPhone" maxlength="11"/>
      </li>
      <li>
        <span>预约时间：</span>
        <select name id="sele_time" v-model="seleTime">
          <option selected>回访时间：上午8:00-上午12:00</option>
          <option>回访时间：下午13:00-下午18:00</option>
          <option>回访时间：晚上18:00-晚上24:00</option>
        </select>
      </li>
      <button @click="submit()">预约提交</button>
      <p>预约一个工作日内，顾问会与您联系</p>
    </div>
    <div class="images">
      <img src="@/assets/images/CustomizedInsurance/company_pic_01.png" alt />
      <img src="@/assets/images/CustomizedInsurance/company_pic_02.png" alt />
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import api from "@/fetch/api";
import { isPhoneNumber } from "@/util/validate";
export default {
  name: "CustomizedInsurance",
  components: {},
  data() {
    return {
      number: 0,
      userName: "",
      userPhone: "",
      seleTime: "回访时间：上午8:00-上午12:00"
    };
  },
  computed: {},
  mounted() {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    this.getAppointmentCount();
  },
  methods: {
    submit() {
      if (this.userName == "") {
        this.Toast("请输入姓名");
      } else if (
        this.userPhone == "" ||
        isPhoneNumber(this.userPhone) == false
      ) {
        this.Toast("手机号码不正确");
      } else if (this.seleTime == "") {
        this.Toast("请选择预约时间");
      } else {
        var args = this.sign({
          name: this.userName,
          phone: this.userPhone,
          remark: this.seleTime,
          height: "",
          weight: "",
          categoryName: "企业与团体"
        });
        // this.$axios
        //   .post("/brg/openapi/h5/index/addAppointment", args)
        //   .then(res => {
        api.addAppointment(args).then(res => {
          if (res.code == 20000) {
            this.Toast(res.data);
            this.getAppointmentCount();
          } else {
            this.Toast(res.message);
          }
        });
      }
    },
    getAppointmentCount() {
      var args = this.sign({});
      // 获取人数
      //   this.$axios
      //     .post("/brg/openapi/h5/index/getAppointmentCount", args)
      //     .then(res => {
      api.getAppointmentCount(args).then(res => {
        this.number = res.data;
      });
    },
    onClickLeft(){
        window.history.back(-1); 
    },
  }
};
</script>

<style lang="scss" scoped>
.content {
  .banner {
    img {
      width: 100%;
    }
  }
  .order_box {
    p:nth-of-type(1) {
      text-align: center;
      margin: 30px 0;
      font-size: 32px;
      span {
        font-weight: bold;
      }
    }
    p:nth-of-type(2) {
      text-align: center;
      margin: 30px 0;
      font-size: 22px;
    }
    li {
      margin: 30px;
      span {
        display: inline-block;
        width: 25%;
      }
      input {
        display: inline-block;
        width: 70%;
        border: solid 2px #ccc;
        height: 80px;
        text-indent: 1em;
        box-sizing: border-box;
      }
      select {
        display: inline-block;
        border: solid 2px #ccc;
        width: 70%;
        height: 80px;
        box-sizing: border-box;
        text-indent: 0.6em;
      }
    }
    button {
      width: 80%;
      height: 75px;
      border-radius: 0.1rem;
      background: #0088ff;
      color: #fff;
      font-size: 0.36rem;
      text-align: center;
      line-height: 0.8rem;
      border: 0;
      display: block;
      margin: auto;
    }
  }
  .images {
    img {
      width: 100%;
    }
  }
}
</style>