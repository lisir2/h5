<!-- 组件说明 用户评论列表 -->
<template>
  <div class>
    <van-nav-bar title="用户评价" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <div class="quota" id="tabFourth">
      <span class="borderA"></span>
      <p class="titleA">
        用户评价
        <span>(1024)</span>
      </p>
      <!-- <p style="float:right;color: #333333;">
        查看更多
        <van-icon name="arrow" size="15" style="vertical-align: middle;margin-top: -3px;" />
      </p> -->
      <div class="userComment">
        <div class="userHead">
          <img src="@/assets/images/home/agentload.png" alt />
          <p>秋天***</p>
        </div>
        <div class="commentContent">
          <div class="star">
            <van-rate v-model="value" readonly size="12" gutter="2" style="display:inline;" color="#F9912E" />
            <span>非常满意</span>
            <span style="color:#8F8F8F;float:right;">2019-05-24</span>
            <p>非常好的一款重疾险，性价比高非常好的一款重疾险，性价比高非常好的一款重疾险。</p>
          </div>
        </div>
      </div>
      <div class="userComment">
        <div class="userHead">
          <img src="@/assets/images/home/agentload.png" alt />
          <p>秋天***</p>
        </div>
        <div class="commentContent">
          <div class="star">
            <van-rate v-model="value" readonly size="12" gutter="2" style="display:inline;" color="#F9912E"/>
            <span>非常满意</span>
            <span style="color:#8F8F8F;float:right;">2019-05-24</span>
            <p>非常好的一款重疾险，性价比高非常好的一款重疾险，性价比高非常好的一款重疾险。</p>
          </div>
        </div>
      </div>
      <!-- <div>该产品暂无评价</div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "CommentList",
  components: {},
  data() {
    return {
        value:5,
    };
  },
  computed: {},
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped lang='scss'>
#tabFourth {
  padding: 30px;
  .titleA{
      display: inline-block;
  }
  .userComment {
    padding: 43px 0;
    overflow: hidden;
    border-bottom: 2px solid #eeeeee;
    .userHead {
      width: 18%;
      float: left;
      p {
        font-size: 21px;
        margin-top: 15px;
        color: #008cff;
      }
      img {
        width: 86px;
        height: 86px;
        border-radius: 100%;
      }
    }
    .commentContent {
      .star {
        span {
          font-size: 23px !important;
          color: #f9912e;
        }
        span:nth-of-type(1) {
          margin-left: 20px;
        }
        p {
          color: #333333;
          font-size: 28px;
          margin-top: 15px;
        }
      }
      width: 82%;
      float: left;
    }
  }
  & > div:nth-last-child(1) {
    border-bottom: 0;
  }
}
</style>