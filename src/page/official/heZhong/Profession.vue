<!-- 组件说明: 职业类型库（想公用分类库，但是返回的数据名称不一样） -->
<template>
  <div class="Profession">
    <!-- 职业类型 -->
    <div class="ProfessionList">
      <ul class="Profession_one" v-for="(item,index) in ProfessionJSON" :key="index">
        <!-- 一级职业类型 -->
        <li @click="cityShow($event)">
          {{item.classCode}}
          <van-icon name="arrow" style="float:right;" />
        </li>

        <div class="city" v-show="false">
          <!-- 二级职业类型 -->
          <li v-for="(items,index) in item.secondBaseClassList" :key="index">
            <div class="Profession_tow">
              <!-- 二级职业类型内容 -->
              <p @click="regionShow($event)">
                {{items.secondClassCode}}
                <van-icon name="arrow" style="float:right;" />
              </p>
              <div class="region" v-show="false">
                <!-- 三级职业类型内容 -->
                <p
                  v-for="(content,index) in items.thirdBaseClassList"
                  :key="index"
                  @click="selectOccupationVal(item.classCode + ' ' + items.secondClassCode + ' ' + content.threeClassCode,item.className.trim() + ' ' + items.secondClassName.trim() + ' ' + content.threeClassName.trim())"
                >{{content.threeClassCode}}</p>
              </div>
            </div>
          </li>
        </div>
        <i class="colorBlock"></i>
      </ul>
    </div>
  </div>
</template>

<script>
import api from "@/fetch/api.js";
export default {
  components: {},
  data() {
    return {
      ProfessionJSON: ""
    };
  },
  props:{
    brandId:{
      type: String,
      required: true
    },
    catId: {
      type: String,
      required: true
    },
    typeId: {
      type: String,
      required: true
    },
  },
  mounted() {
    var tempToast = this.Toast.loading({
      message: "加载中",
      duration: 0,
      forbidClick: true,
      loadingType: "spinner"
    });

    var that = this;
    var params = this.sign({
      brandId: this.brandId,
      catId: this.catId,
      typeId: this.typeId,
      templateName: "职业分类库"
    });
    // 获取职业分类库数据
    api.Classlib(params).then(res => {
      if (res.code == "20000") {
        that.ProfessionJSON = res.data;
        tempToast.clear();
        console.log(res.data);
      }
    });
  },
  computed: {},
  methods: {
    // 区选择
    regionShow(event) {
      // showBlock：当前区内容已经展开
      if (
        !$(event.target)
          .parent(".Profession_tow")
          .find(".region")
          .hasClass("showBlock")
      ) {
        $(".region").removeClass("showBlock");
        $(event.target)
          .parent("Profession_tow")
          .find(".van-icon")
          .css("transform", "rotate(0deg)");
        $(event.target)
          .parent(".Profession_tow")
          .find(".region")
          .addClass("showBlock");
        $(event.target)
          .find($(".van-icon"))
          .css("transform", "rotate(90deg)");
      } else {
        $(event.target)
          .parent(".Profession_tow")
          .find(".region")
          .removeClass("showBlock");
        $(event.target)
          .find($(".van-icon"))
          .css("transform", "rotate(0deg)");
      }
    },
    // 显示市
    cityShow(event) {
      // showBlock：当前市内容已经展开
      if (
        !$(event.target)
          .parent(".Profession_one")
          .find(".city")
          .hasClass("showBlock")
      ) {
        $(".city").removeClass("showBlock");
        $(".van-icon").css("transform", "rotate(0deg)");
        $(event.target)
          .parent(".Profession_one")
          .find(".city")
          .addClass("showBlock");
        $(event.target)
          .find($(".van-icon"))
          .css("transform", "rotate(90deg)");
      } else {
        $(event.target)
          .parent(".Profession_one")
          .find(".city")
          .removeClass("showBlock");
        $(event.target)
          .find($(".van-icon"))
          .css("transform", "rotate(0deg)");
      }
    },
    selectOccupationVal(code, val) {
      this.$parent.$parent.selectProfession(code, val);
    }
  }
};
</script>

<style lang="scss" scoped>
.ProfessionList {
  .Profession_one {
    & > li {
      padding: 30px 50px;
      background-color: white;
      text-align: left;
      border-bottom: 1px solid #eeeeee;
    }
    .city {
      padding: 0 70px;
      border-bottom: solid 1px rgb(245, 245, 245);
      div {
        p {
          padding: 20px 0;
        }
        div {
          p {
            padding: 20px 40px;
            border-top: solid 1px rgb(245, 245, 245);
          }
        }
      }
    }
  }
  .colorBlock {
    display: block;
    height: 20px;
    background-color: rgb(245, 245, 245);
  }
}
.showBlock {
  display: block !important;
}
</style>