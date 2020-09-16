<!-- 组件说明: 历史保单微商城数据 -->
<template>
  <div class="CustomerOrder">
    <van-nav-bar title="客户保单列表" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <van-dropdown-menu style="z-index: 10000;">
      <van-dropdown-item v-model="policyType" :options="option" @change="SelectTabbar"/>
    </van-dropdown-menu>
    <router-view></router-view>
  </div>
</template>

<script>
import api from '@/fetch/api'
export default {
  name: "CustomerOrder",
  components: {},
  data() {
    return {
      option: [
        { text: '个险保单', value: 'clientInsurancePolicy' },
        { text: '团险保单', value: 'clientIndustryPolicy' },
        { text: '车险保单', value: 'clientCarInsurancePolicy' },
      ],
      policyType:'clientInsurancePolicy', 
    };
  },
  computed: {},
  mounted(){
    if (this.$route.name == "clientInsurancePolicy") {
      this.policyType = "clientInsurancePolicy";
    } else if (this.$route.name == "clientIndustryPolicy") {
      this.policyType = "clientIndustryPolicy";
    } else if (this.$route.name == "clientCarInsurancePolicy") {
      this.policyType = "clientCarInsurancePolicy";
    }
    console.log(this.$route.name);
  },
  methods: {
    onClickLeft() {
      this.$router.push('mine');
    },
    // 选择保单类型回调
    SelectTabbar(data){
      console.log(data);
      this.$router.push(data);
    }
  },
};
</script>

<style lang="scss" scoped>

</style>