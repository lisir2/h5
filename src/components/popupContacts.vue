<!-- 组件说明 投保页面弹出常用联系人 -->
<template>
  <div class="popupContacts">
    <div class="personList">
      <van-radio-group v-model="radio">
        <van-cell-group>
            <ul v-for="(item,index) in data" :key="index">
              <van-cell clickable @click="emitParent(index,item)">
                <van-radio slot="right-icon" :name="index"/>
                  <li style="position: relative;">
                      <span class="contactName">{{item.fcName}}</span>
                      <span class="relation">{{item.fcRelationship}}</span>
                  </li>
              </van-cell>
            </ul>
        </van-cell-group>
      </van-radio-group>
      <!-- <p>暂无常用联系人信息</p> -->
    </div>
    <div class="noContacts" v-show="showContacts">
      <p>暂无常用联系信息</p>
      <a href="javascript:;">
        <button @click="addContacts">立即添加</button>
      </a>
    </div>
  </div>
</template>

<script>
//import x from ''
import api from "../../src/fetch/api";
import { RadioGroup, Radio } from "vant";
export default {
  name: "popupContacts",
  components: {},
  data() {
    return {
      data: "",
      rightText: "",
      showContacts: false,
      radio:'',
    };
  },
  computed: {},
  mounted() {
    var args = this.sign({
      userId: this.getCookie("ZB_JUSER_Mid"),
      openId: this.getCookie("openId")
    });
    // this.$axios.post('/brg/openapi/h5/personalCenter/queryFrequentContactsList',args).then(res=>{
    api.queryFrequentContactsList(args).then(res => {
      if (res.code == 20000) {
        this.data = res.data;
        this.rightText = "添加";
        this.showContacts = false;
      } else if (res.code == 20001) {
        this.rightText = "";
        this.showContacts = true;
      }
    });
  },
  methods: {
    emitParent(index,data){
      this.radio = index;
      // 向父组件传值
      this.$emit('Contacts',data);
    },
    addContacts(){
      if(this.getCookie("ZB_JUSER_Mid")){
        this.$router.push('addContacts');
      }else{
        this.$router.push('loginRegister');
      }
      
    }
  }
};
</script>

<style lang="scss" scoped>
.popupContacts {
  .personList::before {
    content: "";
    display: block;
    height: 20px;
    background: rgba(247, 247, 247, 1);
    border-top: 2px solid rgba(221, 221, 221, 1);
  }
  .personList {
    .van-cell--clickable{
      padding: 0 40px;
    }
    p {
      text-align: center;
      font-size: 30px;
      color: #0c0c0c;
      margin-top: 96px;
    }
    ul {
      border-bottom: 2px solid #eee;
      li {
        height: 100px;
        line-height: 100px;
        span{
            line-height: 100px;
        }
        .relation {
          width: 150px;
          height: 50px;
          border: 2px solid #008cff;
          color: #008cff;
          border-radius: 6px;
          display: inline-block;
          line-height: 50px;
          text-align: center;
          font-size: 26px;
          margin-left: 50px;
        }
        .contactName {
          // width: 100px;
          // margin-left: 32px;
          color: #0c0c0c;
          display: inline-block;
        }
        .status {
          float: right;
          margin-right: 30px;
          color: #302d2d;
        }
        .van-icon-arrow {
          margin-top: -2px;
          vertical-align: middle;
          color: #d1d1d1;
        }
      }
    }
  }
  .noContacts {
    p {
      text-align: center;
      margin-top: 166px;
    }
    button {
      width: 291px;
      height: 88px;
      border: solid 2px #f99a31;
      border-radius: 44px;
      background-color: white;
      font-size: 32px;
      font-weight: 500;
      color: rgba(249, 154, 49, 1);
      display: block;
      margin: 96px auto;
    }
  }
  .addBtn {
    margin: 0 auto;
    margin-top: 96px;
    display: block;
    width: 290px;
    height: 88px;
    border-radius: 50px;
    border: 2px solid #f99a31;
    background: #fff;
    color: #f99a31;
  }
}
</style>