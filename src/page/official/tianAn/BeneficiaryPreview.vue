<!-- 组件说明 天安码上长大产品的受益人预览组件 -->
<template>
  <div class="beneficiaryList">
    <div class="beneficiary" v-for="(item,index) in BeneficiaryList" :key="index">
      <div class="blank10"></div>
      <van-cell :title="'受益人信息'+(index+1)" :icon="titleIcon4" />
      <div v-if="BeneficiaryList.length != 0">
        <ul v-for="(temp,index) in item" :key="index">
          <li>
            <span class="list_01">{{temp.name}}</span>
            <span>{{temp.value}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BeneficiaryPreview",
  components: {},
  props: {
    BeneficiaryData: {
      type: Array,
      required: true
    },
    syrInfoList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      titleIcon4: require("../../../assets/images/others/personal4.png"),
      BeneficiaryList: [] // 映射之后的受益人数组
    };
  },
  watch: {
    BeneficiaryData: function() {
      this.DataLoadingCompleted();
    },
    syrInfoList: function() {
      this.DataLoadingCompleted();
    }
  },
  mounted() {},
  methods: {
    //   数据加载完成
    DataLoadingCompleted() {
      if (this.syrInfoList.length != 0 && this.BeneficiaryData.length != 0) {
        // 受益人列表
        this.BeneficiaryData.forEach(element => {
          var tempBeneficiary = [];
          for (const key in element) {
            //   中文key和sort排序
            var chineseKey = this.getChineseKey(key, this.syrInfoList);
            if (chineseKey) {
              // 如果value值为空，不映射
              if (element[key] != "" && element[key] != null) {
                if (key == "beneficiaryRate") {
                  chineseKey["value"] = element[key] + "%";
                } else {
                  chineseKey["value"] = element[key];
                }

                tempBeneficiary.push(chineseKey);
              }
            }
          }
          //   排序
          tempBeneficiary.sort(function(a, b) {
            a.sort - b.sort;
          });
          console.log(tempBeneficiary);
          this.BeneficiaryList.push(tempBeneficiary);
        });
      }
    },
    //根据传入的英文键，返回对应的中文健
    //第一个参数：英文键
    //第二个参数要映射中文的数组：holderArr:[{colcode:"holderName",colname:"姓名"}]
    getChineseKey(key, holderArr) {
      let reslute = {};
      for (let i = 0; i < holderArr.length; i++) {
        if (holderArr[i].colcode == key) {
          reslute.name = holderArr[i].colname;
          reslute.sort = holderArr[i].sort;
        }
      }
      if (Object.keys(reslute).length != 0) {
        return reslute;
      }
    }
  }
};
</script>

<style lang='scss'>
</style>