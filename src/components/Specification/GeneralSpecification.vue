<!-- 组件说明 普通规格渲染 -->
<template>
    <div class='GeneralSpecification'>
        <div v-for="(item,i) in prodPlanList_second" :key="item.id" :name="item.attrName">
        <div v-if="item.isDisplay == 0" class="specification_box">
          <div class="quota">
            <span class="borderA"></span>
            <p class="titleA">{{item.attrName}}</p>
          </div>
          <div class="quotaList">
            <van-button
              size="small"
              v-for="(part,j) in item.planAttrValList"
              :key="part.id"
              :name="part.id"
              :class="activitySpecifications[i] == j ? 'on' : ''"
              @click="tap(i,j,part.id,false)"
            >{{part.attrValue}}</van-button>
          </div>
        </div>
      </div>
      <slot></slot>
    </div>
</template>

<script>
    export default {
        components: {

        },
        data () {
            return {
              
            };
        },
        props:['prodPlanList_second','priceResult','activitySpecifications'],
        computed: {

        },
        methods: {
            tap(i,j){
                this.$parent.$parent.tap(i,j);
            }
        },
        mounted(){
          
        }
    }
</script>

<style scoped>

</style>