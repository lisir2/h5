<!-- 组件说明 -->
<template>
    <div class='endBox'>
        <ul class="endUl">
                <li>
                    <router-link to="/QualificationLicence">
                        <van-icon :name="endicon1" />
                        <span>资质牌照</span>
                    </router-link>
                </li>
                <li>
                    <a href="javascript:;" @click="companyIntroduction">
                        <van-icon :name="endicon2" />
                        <span>公司简介</span>
                    </a>
                </li>
                <li>
                    <router-link to="/contactUs">
                        <!-- <a href="javascript:;" @click="contactUs()"> -->
                            <van-icon :name="endicon3" />
                            <span>联系我们</span>
                        <!-- </a> -->
                    </router-link>
                </li>
                <li style="border:0">
                    <van-icon :name="endicon4" />
                    <span><a class="goodConcat" href="https://koubei.baidu.com/m2/mem/ed45d8f689f8e31fecae2a4a864ccc49">网友好评</a></span>
                </li>
        </ul>
        <p>©浙江环晟保险经纪有限公司</p>
        <p>
          <a href="http://beian.miit.gov.cn/publish/query/indexFirst.action">电信增值业务许可证：浙B2-20160256</a>
        </p>
        <p>
         <a href="http://beian.miit.gov.cn/publish/query/indexFirst.action">网站备案号：浙ICP备09004644号</a> / <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010502000938">浙公网安33010502000938号</a>
        </p>
        <p><a href="http://iir.circ.gov.cn/">保险经纪业务许可证：260939000000800</a></p>
        <div style="display:none;" class="contactUs">
            <p style="margin:10px; line-height: 24px;">
				地址：浙江省杭州市拱墅区密渡桥路1号浙商时代大厦B座608室
				<br>
				邮编：310000
				<br>
				传真：0571-88310311
				<br>
				服务热线：400-693-8080 0571-8831-0700（理赔）
				<br>
				邮箱：service@zgbxjj.com.cn
			</p>
        </div>
    </div>
</template>

<script>
export default {
  name: "endBox",
  components: {},
  data() {
    return {
      endicon1: require("@/assets/images/home/04.png"),
      endicon2: require("@/assets/images/home/03.png"),
      endicon3: require("@/assets/images/home/tel.png"),
      endicon4: require("@/assets/images/home/05.png")
    };
  },
  computed: {},
  methods: {
    contactUs() {
      layui.use("layer", function() {
        var layer = layui.layer;
        layer.open({
          type: 1,
          skin: "layui-layer-demo", //样式类名
          // closeBtn: 0, //不显示关闭按钮
          anim: 2,
          area: ["80%"],
          shadeClose: true, //开启遮罩关闭
          content: $(".contactUs").html()
        });
      });
    },
    companyIntroduction() {
      this.$router.push({ path: "/companyIntroduction" });
    }
  }
};
</script>

<style lang="scss" scoped>
.goodConcat {
  font-size: 24px;
  color: #fff;
}
.endBox {
  padding-bottom: 1.2rem;
  background: #333;
  .endUl {
    margin-top: 20px;
    border-top: solid 1px #eeeeee;
  }
  p {
    text-align: center;
    font-size: 22px;
    color: #fff;
    margin-bottom: 6px;
    letter-spacing: 1.6px;
    &>a{
      text-align: center;
      font-size: 20px;
      color: #fff;
      margin-bottom: 6px;
      letter-spacing: 1.6px;
    }
  }
  ul {
    display: flex;
    padding: 40px 20px 20px;
    margin-bottom: 5px;
    li {
      flex: 1;
      text-align: center;
      border-right: 1px solid #ddd;
      // height: 100%;
      // line-height: 100%;
      span {
        font-size: 24px;
        color: #fff;
      }
      .van-icon {
       vertical-align: middle;
        .van-icon__image {
          width: 24px;
          height: 24px;
        }
      }
    }
  }
}
</style>