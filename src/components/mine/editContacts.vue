<!-- 组件说明 添加常用联系人-->
<template>
  <div class="addContacts">
    <van-nav-bar title="编辑常用联系人" left-arrow @click-left="onClickLeft" />
    <div class="ContactsMessage">
      <ul>
        <li>
          <span>姓名</span>
          <input type="text" placeholder="请填写真实姓名" v-model="userName"/>
        </li>
        <li>
          <span>证件类型</span>
          <input
            type="text"
            v-model="certificateType"
            placeholder="请选择证件类型"
            @click="certificateShow = true"
            readonly
          />
          <van-icon name="arrow" />
          <van-action-sheet v-model="certificateShow" :actions="certificateactions" @select="onSelect" cancel-text="取消"/>
        </li>
        <li>
          <span>证件号码</span>
          <input type="text" placeholder="请填写证件号码" v-model="IDNumber" @input="getMoreInfoInserd"/>
        </li>
        <li>
          <span>性别</span>
          <van-button
            type="default"
            plain
            :class="gender == 1 ? 'buttonColor' : ''"
            size="mini"
            @click="gender = 1"
          >男</van-button>
          <van-button
            type="default"
            plain
            :class="gender == 2 ? 'buttonColor' : ''"
            size="mini"
            @click="gender = 2"
          >女</van-button>
        </li>
        <li>
          <span>出生日期</span>
          <input type="text" placeholder="请填写真实姓名" id="Birthdate" v-model="Birthdate"/>
        </li>
        <div class="colorBlock"></div>
        <li>
          <span>手机号码</span>
          <input type="text" placeholder="请填写手机号码" v-model="phone"/>
        </li>
        <li>
          <span>电子邮箱</span>
          <input type="text" placeholder="请填写电子邮箱" v-model="email"/>
        </li>
        <!-- <li>
          <span>省市区</span>
          <input
            type="text"
            @click="AreaShow()"
            name="citySelect"
            placeholder="请选择省市区"
            readonly
          />
          <van-icon name="arrow" />
        </li> -->
        <li>
          <span>详细地址</span>
          <input type="text" placeholder="请填写详细地址" v-model="city"/>
        </li>
        <li>
          <span>邮编</span>
          <input type="text" placeholder="请填写邮编" v-model="postcode"/>
        </li>
        <li>
          <span>与您的关系</span>
          <input
            type="text"
            v-model="relationType"
            placeholder="请选择与您的关系"
            @click="relationShow = true"
            readonly
          />
          <van-icon name="arrow" />
          <van-action-sheet v-model="relationShow" :actions="actions" @select="SelectRelation" cancel-text="取消" />
        </li>
      </ul>
      <div style="padding:20px;">
          <van-button round class="save" type="info" size="large" @click="save">保存信息</van-button>
      </div>
    </div>

    <van-popup v-model="areaShow" position="bottom">
      <van-area :area-list="areaList" @confirm="confirm" @cancel="cancel" :item-height="35" />
    </van-popup>
  </div>
</template>

<script>
import area from "../../../static/js/area";
import $ from "jquery";
import api from '@/fetch/api'
import { isIdCard, isPhoneNumber, isEmail } from "@/util/validate";
export default {
  name:'editContacts',
  components: {},
  data() {
    return {
      areaList: area, //三级联动所有数据
      areaShow: false, //三级联动是否显示
      certificateShow: false,  //证件类型下拉框是否展示
      relationShow: false,  //关系类型下拉框是否展示
      certificateactions: [{ name: "身份证" }, { name: "护照" }, { name: "军官证" }],//证件类型下拉框内容
      actions: [{ name: "本人" }, { name: "配偶" }, { name: "儿子" }, { name: "女儿" },{ name: "父亲" },{ name: "母亲" },{ name: "其他" }],//证件类型下拉框内容本人、配偶、儿子、女儿、父亲、母亲、其他
      userName:'', //姓名
      certificateType: "",  //证件类型
      IDNumber:'', //证件号码
      gender: 1, //1 男 2 女
      Birthdate:'', //出生日期
      phone:'', //手机号
      email:'', //邮箱
      city:'', //城市
      postcode:'', //邮编
      relationType:"", //关系类型
      fcId:'', //编辑常用联系人id
    };
  },
  computed: {},
  mounted() {
    var that = this;
    this.fcId = this.$route.query.fcId;
    if(this.fcId!= '' || this.fcId!= undefined){
      var res = JSON.parse(this.getCookie('contactsMessage'));
      console.log(res);
      that.userName = res.fcName; //姓名
      that.certificateType = res.fcCertificateType;  //证件类型
      that.IDNumber = res.fcCertificateNo; //证件号码
      that.gender = res.fcSex == '男' ? 1 : 2; //1 男 2 女
      that.Birthdate = res.fcBirth.split(' ')[0]; //出生日期
      that.phone = res.fcPhone; //手机号
      that.email = res.fcMailbox; //邮箱
      that.city = res.fcAddress; //城市
      that.postcode = res.fcZipCode; //邮编
      that.relationType = res.fcRelationship; //关系类型
    }

    layui.use("laydate", function() {
      var laydate = layui.laydate;
      laydate.render({
        elem: "#Birthdate",
        type: "date",
        format: "yyyy-MM-dd",
        done: value => {
          that.Birthdate = value;
        }
      });
    });
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onSelect(item) {
      // 点击选项时默认不会关闭菜单，可以手动关闭
      this.certificateShow = false;
      this.certificateType = item.name;
      console.log(item.name);
    },
    SelectRelation(item) {
      // 点击选项时默认不会关闭菜单，可以手动关闭
      this.relationShow = false;
      this.relationType = item.name;
      console.log(item.name);
    },
    // 三級联动
    confirm(val) {
      if (val[2] == undefined) {
        $("input[name=citySelect]").val(
          val[0].name + " " + val[1].name
        );
      } else {
        $("input[name=citySelect]").val(
          val[0].name + " " + val[1].name + " " + val[2].name
        );
      }
      this.areaShow = false;
    },
    cancel() {
      this.areaShow = false;
      console.log(this.$refs);
    },
    AreaShow() {
      this.areaShow = true;
    },
    // 保存
    save(){
      var args=this.sign({
          fcId: this.fcId,//修改传1  添加不传    // ——》常用联系人
          fcName: this.userName,            //——》姓名
          fcCertificateType: this.certificateType,    // ——》证件类型（身份证、护照、军官证、警官证、港澳台回乡证、港澳通行证、其他）
          fcCertificateNo: this.IDNumber,  // ——》证件号
          fcSex: this.gender == 1 ? '男' : '女',     //——》性别（男；女）
          fcBirth: this.Birthdate,  // ——》出生日期（格式：yyyy-MM-dd）
          fcPhone: this.phone,    //——》手机号码
          fcMailbox: this.email,  // ——》电子邮箱
          fcAddress: this.city,   // ——》详细地址
          fcZipCode: this.postcode,   // ——》邮编
          fcRelationship: this.relationType,   // ——》该联系人是你的（本人、配偶、儿子、女儿、父亲、母亲、其他）
          fcUserId: this.getCookie('ZB_JUSER_Mid'),  // ——》用户id
          fcOpenId: this.getCookie('openId')   // ——》微信用户openid
      });

      if(this.userName == ''){
        this.Toast('请输入姓名')
      }else if(this.certificateType == ''){
        this.Toast('请选择证件类型')
      }else if(this.IDNumber == ''){
        this.Toast('请选择证件号码')
      }else if(this.Birthdate == ''){
        this.Toast('请请选择出生日期')
      }else if(this.phone == '' || isPhoneNumber(this.phone) == false){
        this.Toast('手机号码格式不正确')
      }else if(this.email == '' || isEmail(this.email) == false){
        this.Toast('邮箱格式不正确')
      }
      // else if(this.city == ''){
      //   this.Toast('请输入详细地址')
      // }else if(this.postcode == ''){
      //   this.Toast('请输入邮编')
      // }
      else if(this.relationType == ''){
        this.Toast('请选择与联系人关系')
      }else{
        //  this.$axios.post('/brg/openapi/h5/personalCenter/insertOrUpdateFrequentContacts',args).then(res=>{
          api.insertOrUpdateFrequentContacts(args).then(res=>{
            if(res.code == 20000){
              this.Toast(res.data);
              this.$router.push('/topContacts');
            }
          })
      }
    },
    getMoreInfoInserd(){
      var that = this;
      console.log(that.certificateType)
        if(that.certificateType == '身份证'){
            var idVal=that.IDNumber;
            var tBirth_y = idVal.substring(6, 10);
            var tBirth_m = idVal.substring(10, 12);
            var tBirth_d = idVal.substring(12, 14);
            var tBirth = tBirth_y + "-" + tBirth_m + "-" + tBirth_d;
            that.Birthdate = tBirth;
            // 性别
            if (idVal.length==18) {
                var sex = idVal.charAt(16);
                if (sex % 2 == 0) {
                  that.gender = 2;
                } else {
                  that.gender = 1;
                }
            }
        }
    },
  }
};
</script>

<style lang='scss' scoped>
.addContacts {
  .ContactsMessage {
    li {
      border-bottom: solid 2px #dddddd;
      padding: 0 31px;
      line-height: 100px;
      input{
        width: 5rem;
      }
      & > span {
        display: inline-block;
        width: 190px;
      }
    }
  }
}
.buttonColor {
  background-color: rgb(0, 137, 245);
  span {
    color: white;
  }
}
.colorBlock {
  height: 20px;
  background: rgba(247, 247, 247, 1);
}
.save{
    background-color:#F99A31;
    border:0;
    height:80px;
    line-height:80px;
}
.van-icon{
    float: right;
    margin-right: 20px;
    line-height: 100px;
}
</style>