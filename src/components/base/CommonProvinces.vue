<!-- 组件说明: 省市区库（想公用分类库，但是返回的数据名称不一样） -->
<template>
  <div class="Provinces">
    <!-- 省市区 -->
    <div class="ProvincesList">
      <ul class="Provinces_one" v-for="(item,index) in ProvincesJSON" :key="index">
        <!-- 省 -->
        <li @click="cityShow($event,(item.pingAnCityList.length == 0 ? false : true),item.province,item.provinceCode.trim())">
          {{item.province}}
          <van-icon name="arrow" style="float:right;" v-if="item.pingAnCityList.length != 0"/>
        </li>

        <div class="city" v-show="false">
          <!-- 市 -->
          <li v-for="(items,index) in item.pingAnCityList" :key="index">
            <div class="Provinces_tow">
              <!-- 市内容 -->
              <p
                @click="regionShow($event,(items.pingAnAreaList.length == 0 ? false : true),item.province + ' ' + items.city,item.provinceCode.trim() + ' ' + items.cityCode.trim())"
              >
                {{items.city}}
                <van-icon
                  name="arrow"
                  style="float:right;"
                  v-if="items.pingAnAreaList.length != 0"
                />
              </p>
              <div class="region" v-show="false">
                <!-- 区内容 -->
                <p
                  v-for="(content,index) in items.pingAnAreaList"
                  :key="index"
                  @click="selectOccupationVal(item.province + ' ' + items.city + ' ' + content.area,item.provinceCode.trim() + ' ' + items.cityCode.trim() + ' ' + content.areaCode.trim())"
                >{{content.area}}</p>
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
  name: "CommonProvinces",
  components: {},
  data() {
    return {
      ProvincesJSON: ""
    };
  },
  mounted() {
    var tempToast = this.Toast.loading({
      message: "加载中",
      duration: 0,
      forbidClick: true,
      loadingType: "spinner"
    });

    var that = this;
    // 获取省市区库数据
    api.getPingAnArea().then(res => {
      console.log(res);
      console.log(res.code);
      if (res.code == 20000) {
        console.log(res);
        that.ProvincesJSON = res.data;
        tempToast.clear();
        console.log(res.data);
      }
    });
  },
  computed: {},
  methods: {
    /**
     * event 事件原对象
     * isCity 下级是否后区
     * val 选着区的value值
     * code 选择区的code值
     */
    regionShow(event, isArea, val, code) {
      if (isArea) {
        // showBlock：当前区内容已经展开
        if (
          !$(event.target)
            .parent(".Provinces_tow")
            .find(".region")
            .hasClass("showBlock")
        ) {
          $(".region").removeClass("showBlock");
          $(event.target)
            .parent("Provinces_tow")
            .find(".van-icon")
            .css("transform", "rotate(0deg)");
          $(event.target)
            .parent(".Provinces_tow")
            .find(".region")
            .addClass("showBlock");
          $(event.target)
            .find($(".van-icon"))
            .css("transform", "rotate(90deg)");
        } else {
          $(event.target)
            .parent(".Provinces_tow")
            .find(".region")
            .removeClass("showBlock");
          $(event.target)
            .find($(".van-icon"))
            .css("transform", "rotate(0deg)");
        }
      } else {
        this.$parent.$parent.selectProvinces(val, code);
      }
    },
    /**
     * event 事件原对象
     * isCity 下级是否后市
     * val 选着省的value值
     * code 选择省的code值
     */
    cityShow(event, isCity, val, code) {
      // showBlock：当前市内容已经展开
      if(isCity){
        if (
          !$(event.target)
            .parent(".Provinces_one")
            .find(".city")
            .hasClass("showBlock")
        ) {
          $(".city").removeClass("showBlock");
          $(".van-icon").css("transform", "rotate(0deg)");
          $(event.target)
            .parent(".Provinces_one")
            .find(".city")
            .addClass("showBlock");
          $(event.target)
            .find($(".van-icon"))
            .css("transform", "rotate(90deg)");
        } else {
          $(event.target)
            .parent(".Provinces_one")
            .find(".city")
            .removeClass("showBlock");
          $(event.target)
            .find($(".van-icon"))
            .css("transform", "rotate(0deg)");
        }
      }else{
        this.$parent.$parent.selectProvinces(val, code);
      }
    },
    /**
     * 选择省市区之后的回调
     * val 选择省市区之后value值
     * code 选择省市区之后code值
     */
    selectOccupationVal(val, code) {
      this.$parent.$parent.selectProvinces(val, code);
    }
  }
};
</script>

<style lang="scss" scoped>
.ProvincesList {
  .Provinces_one {
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