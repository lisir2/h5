<!-- 组件说明 -->
<template>
  <div class="agentRegisterSuccess">
      <div class="registerSuccess">
        <img src="../../assets/images/agent/success.jpg" alt="">
        <span>恭喜您，注册成功</span>
        <button @click="$router.push('agent')">立即申请代理人</button>
        <p>99%聪明人都选择成为代理人，您距离赚钱只差一步！</p>
    </div>
  </div>
</template>

<script>
export default {
  name:'agentRegisterSuccess',
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.registerSuccess {
  margin-top: 100px;
}

.registerSuccess img {
  width: 130px;
  display: block;
  margin: 0 auto 40px;
}

.registerSuccess span {
  display: block;
  text-align: center;
  color: black;
  font-size: 36px;
}
.registerSuccess button {
  width: 80%;
  display: block;
  margin: auto;
  margin-top: 80px;
  background-color: #f99a31;
  line-height: 93px;
  border-radius: 46px;
  padding: 0;
  color: white;
  border: none;
}
.registerSuccess p {
  text-align: center;
  margin-top: 30px;
}
</style>