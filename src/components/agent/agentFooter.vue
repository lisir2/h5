<!-- 组件说明 -->
<template>
  <div class="AgentFooter">
    <footer>
      <div class="QRCode">
        <img src="../../assets/images/agent/ewm.jpg" alt />
        <div class="textDescription">
          <p>关注微信公众号</p>
          <p>长按二维码</p>
          <p>或者微信搜索"保险经纪网"</p>
        </div>
      </div>
      <div class="companyProfile">
        <ul>
          <router-link to="companyIntroduction">
            <li>
              <img src="../../assets/images/agent/ico_company.png" alt />
              <p>公司简介</p>
            </li>
          </router-link>
          <a
            href="//mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI3MDQ4MzE4OA==&scene=124#wechat_redirect"
          >
            <li>
              <img src="../../assets/images/agent/ico_jikt.png" />
              <p>保险课堂</p>
            </li>
          </a>
          <a href="javascript:;" @click="contactUs">
            <li>
              <img src="../../assets/images/agent/ico_tei_01.png" />
              <p>联系我们</p>
            </li>
          </a>
        </ul>
        <p class="bottom_css">
          浙江环晟保险经纪有限公司
          <br />
          <a href="http://iir.circ.gov.cn/" style="color: #8f8f94;">经营保险经纪业务许可证：260939000000800</a>
          <br />Copyright©2008-2018 www.zgbxjj.com. All Rights Reserved.
          <br />
          <a
            href="http://beian.miit.gov.cn/publish/query/indexFirst.action"
            style="color: #8f8f94;"
          >电信增值业务许可证：浙B2-20160256</a>
          <a
            href="http://beian.miit.gov.cn/publish/query/indexFirst.action"
            style="color: #8f8f94;"
          >浙ICP备09004644号</a>
        </p>
        <p style="text-align: center; color: #8f8f94;font-size: 12px;margin-top: 5px;">
          <a
            href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010502000938"
            style="color: #8f8f94;"
          >
            <img
              src="../../assets/images/agent/ghs.png"
              style="width: 20px;vertical-align: middle;margin-top: -6px;"
            />
            浙公网安备 33010502000938号
          </a>
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
//import x from ''
export default {
  name: "agentFooter",
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {
    contactUs(){
      this.$dialog.alert({
        title: '联系我们',
        messageAlign:'left',
        message: `地址：浙江省杭州市拱墅区密渡桥路1号浙商时代大厦B座608室\n邮编：310000\n传真：0571-88310311\n服务热线：400-693-8080 0571-8831-0700（理赔）\n邮箱：service@zgbxjj.com.cn`,
      })
    }
  },
  mounted() {
    
  }
};
</script>

<style lang="scss" scoped>
footer {
  background: #303030;
  padding-bottom: 100px;
  margin-bottom: -1.36rem;
}
.textDescription {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 2.53rem;
}
.QRCode {
  padding: 30px 0;
  overflow: hidden;
  width: 88%;
  margin: 0 auto;
  img {
    width: 190px;
    float: left;
  }
  div {
    float: left;
    p {
      color: #fff;
      margin-left: 12px;
      font-size: 26px;
    }
  }
}
.companyProfile {
  img {
    width: 58px;
    margin-top: 18px;
  }
  ul {
    display: flex;
    justify-content: center;
    width: 96%;
    margin: 0 auto;
    a {
      flex: 1;
      text-align: center;
    }
    li {
      width: 140px;
      height: 140px;
      border-radius: 50%;
      background: #202020;
      list-style: none;
      margin: 0 15px;
      display: inline-block;
      text-align: center;
      p {
        text-align: center;
        color: #fff;
        font-size: 24px;
        margin-top: 10px;
      }
    }
  }
}
.bottom_css {
  color: #8f8f94;
  font-size: 26px;
  text-align: center;
  margin-top: 20px;
  line-height: 42px;
}
</style>