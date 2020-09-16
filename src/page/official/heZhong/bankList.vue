<!-- 组件说明 -->
<template>
  <van-index-bar :index-list="indexList" highlight-color="#07c160">
    <van-index-anchor index="B" sticky="true">B</van-index-anchor>
    <van-cell title="北京银行" code="1008" @click="selectBank('北京银行','1008')"/>

    <van-index-anchor index="G" sticky="true">G</van-index-anchor>
    <van-cell title="广东发展银行" code="1015" @click="selectBank('广东发展银行','1015')"/>

    <van-index-anchor index="H" sticky="true">H</van-index-anchor>
    <van-cell title="华夏银行" code="1018" @click="selectBank('华夏银行','1018')"/>

    <van-index-anchor index="J" sticky="true">J</van-index-anchor>
    <van-cell title="交通银行" code="1006" @click="selectBank('交通银行','1006')"/>

    <van-index-anchor index="N" sticky="true">N</van-index-anchor>
    <van-cell title="宁波银行" code="1119" @click="selectBank('宁波银行','1119')"/>

    <van-index-anchor index="S" sticky="true">S</van-index-anchor>
    <van-cell title="上海银行" code="1007" @click="selectBank('上海银行','1007')"/>

    <van-index-anchor index="X" sticky="true">X</van-index-anchor>
    <van-cell title="兴业银行" code="1010" @click="selectBank('兴业银行','1010')"/>

    <van-index-anchor index="Z" sticky="true">Z</van-index-anchor>
    <van-cell title="中国工商银行" code="1002" @click="selectBank('中国工商银行','1002')"/>
    <van-cell title="中国农业银行" code="1003" @click="selectBank('中国农业银行','1003')"/>
    <van-cell title="中国银行" code="1004" @click="selectBank('中国银行','1004')"/>
    <van-cell title="中国建设银行" code="1005" @click="selectBank('中国建设银行','1005')"/>
    <van-cell title="中国光大银行" code="1009" @click="selectBank('中国光大银行','1009')"/>
    <van-cell title="招商银行" code="1014" @click="selectBank('招商银行','1014')"/>
    <van-cell title="中国邮政储蓄银行" code="2001" @click="selectBank('中国邮政储蓄银行','2001')"/>
  </van-index-bar>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      indexList: ["B", "G", "H", "J", "N", "S", "X", "Z"],
    };
  },
  computed: {},
  methods: {
      selectBank(name,code){
          this.$parent.$parent.SelectBank(name,code);
      }
  }
};
</script>

<style lang="scss">
.van-index-anchor{
    background: rgb(247, 248, 250);
}
</style>