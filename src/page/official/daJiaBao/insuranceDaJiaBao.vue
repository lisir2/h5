<!-- 组件说明 -->
<template>
    <div>
        <div v-if="showPage">
            <van-skeleton title :row="20" style="padding-top: 0.5rem;"/>
        </div>
        <div v-else class='policyMain'>
            <p class="productName">{{goodName}}</p>
            <p class="startTime">
                <ul>
                    <li>
                        <span class="list_01">起保时间</span>
                        <span class="list_02">
                            <input type="text" placeholder="点击选择起保日期" id="time" readonly>
                        </span>
                    </li>
                </ul>
            </p>
            <!-- 投保人板块 -->
            <div v-if="holderList.length > 0">
                <div class="holderPolicy">
                    <p class="policyTitle">
                        <van-icon :name="titleIcon4" slot="left" size="18px" style="vertical-align:middle;margin-top:-3px"/>
                        <span>投保人信息</span>
                    </p>
                    <ul>
                        <li v-for="item in holderList" :key="item.id">
                            <span class="list_01">{{item.colname}}</span>
                            <span class="list_02">
                                <div v-if="item.colcode === 'holderName'">
                                    <input type="text" :name="item.colcode" placeholder="请填写投保人姓名" :ref="item.colcode">
                                    <img src="../../../assets/images/person.png" alt="" @click="contacts('tbr')">
                                </div>
                                <div v-else-if="item.colcode === 'holderSex'" :name="item.colcode">
                                    <form class="layui-form" action="javascript:void;">
                                        <div class="layui-input-inline holderSex" style="margin-top:0;">
                                            <input type="radio" name="sex" v-for="(radioItem,index) in item.value" :key="radioItem.name" :value="radioItem.value" :title="radioItem.name" :checked="index == 0 ? 'checked' :''" :ref="item.colcode">
                                        </div>
                                    </form>
                                </div>
                                <div v-else-if="item.colcode === 'holderCertificateType'">
                                    <van-action-sheet
                                    v-model="typeShow_holder"
                                    :actions="item.value"
                                    cancel-text="取消"
                                    @select="TypeSelect_holder"
                                    title="请选择证件类型"
                                    />
                                    <input type="text" placeholder="请选择证件类型" @select="TypeSelect_holder" @click="ChooseType_holder" id="holderCertificateType" :name="item.colcode" readonly :ref="item.colcode">
                                    <van-icon name="arrow"/>
                                </div>
                                <div v-else-if="item.colcode === 'holderCertificateNo'">
                                    <input type="text" :name="item.colcode" class="holderCertificateNo" placeholder="请填写投保人证件号码" @keyup="getMoreInfoHolder" maxlength="18" :ref="item.colcode">
                                </div>
                                <div v-else-if="item.colcode === 'holderBirth'">
                                    <input type="text" placeholder="请选择出生日期" id="holderBirth" :name="item.colcode" readonly :ref="item.colcode">
                                </div>
                                <div v-else>
                                    <input type="text" :name="item.colcode" :placeholder="item.value" :ref="item.colcode">
                                </div>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
            
            <!-- 被保险人 -->
            <div class="inserdPolicy">
                <!-- index下标小于1的话,该产品没有被保险人 -->
                <p class="policyTitle" v-if="inserdList.length > 0">
                    <van-icon :name="titleIcon5" slot="left" size="18px" style="vertical-align:middle;margin-top:-3px"/>
                    <span>被保险人信息</span>
                </p>
                <ul>
                    <li v-for="(item,index) in inserdList" :key="index" :style="item.colcode === 'workTypeName' ? 'height:2.3rem;' : ''">
                        <span class="list_01" :style="item.colcode === 'workTypeName' ? 'line-height:1rem;' : ''">{{item.colname}}</span>
                        <span class="list_02">
                            <!-- 被保险人姓名 -->
                            <div v-if="item.colcode === 'insuredName'">
                                <input type="text" :name="item.colcode" class="insuredName" placeholder="请填写被保险人姓名" :ref="item.colcode">
                                <img src="../../../assets/images/person.png" alt="" @click="contacts('bbr')">
                            </div>
                            <!-- 被保险人性别 -->
                            <div v-else-if="item.colcode === 'insuredSex'" >
                                <form class="layui-form" action="javascript:void;">
                                    <div class="layui-input-inline insuredSex" :name="item.colcode">
                                        <input type="radio" name="sex" v-for="(radioItem,index) in item.value" :key="radioItem.name" :value="radioItem.value" :title="radioItem.name" :checked="index == 0 ? 'checked' :''" :ref="item.colcode">
                                    </div>
                                </form>
                            </div>
                            <!-- 被保险人证件类型 -->
                            <div v-else-if="item.colcode === 'insuredCertificateType'">
                                <!-- v-model 控制显示可隐藏 -->
                                <van-action-sheet
                                v-model="insuredCertificateType"
                                :actions="item.value"
                                cancel-text="取消"
                                @select="TypeSelect_inserd"
                                title="请选择证件类型"
                                />
                                <input type="text" placeholder="请选择证件类型" @select="TypeSelect_inserd" @click="ChooseType_inserd()" :name="item.colcode" id="insuredCertificateType" readonly :ref="item.colcode">
                                <van-icon name="arrow" />
                            </div>
                            <!-- 被保险人证件号 -->
                            <div v-else-if="item.colcode === 'insuredCertificateNo'">
                                <input type="text" :name="item.colcode" class="insuredCertificateNo" placeholder="请填写被保险人证件号码" @keyup="getMoreInfoInserd()" maxlength="18" :ref="item.colcode">
                            </div>
                            <!-- 被保险人出生日期 -->
                            <div v-else-if="item.colcode === 'insuredBirth'">
                                <input type="text" placeholder="请选择出生日期" class="insuredBirth" id="insuredBirth" :name="item.colcode" readonly :ref="item.colcode">
                            </div> 
                            <!-- 与投保人关系 -->
                            <div v-else-if="item.colcode === 'insuredRelationship'">
                                <van-action-sheet
                                v-model="insuredRelationship"
                                :actions="item.value"
                                cancel-text="取消"
                                @select="inserdSelect_Relationship"
                                title="与投保人关系"
                                />
                                <input type="text" placeholder="与投保人关系" @click="showSelect_Relationship()" id="insuredRelationship" :name="item.colcode" readonly :ref="item.colcode">
                                <van-icon name="arrow" />
                                <!-- <input type="text" :placeholder="item.value" :name="item.colcode"> -->
                            </div>
                            <!-- 安联职业分类 -->
                            <div v-else-if="item.colcode === 'workTypeName'">
                                <input type="text" @click="ShowOccupation" :name=item.colcode :placeholder="item.value" readonly v-model="OccupationVal" :ref="item.colcode"> 
                            </div>
                            <div v-else-if="item.colcode === 'isSocialSecurity'">
                                <input type="text" :name="item.colcode" :value="isSocialSecurity" :class="item.colcode" readonly :ref="item.colcode">
                            </div>
                            <div v-else>
                                <input type="text" :placeholder="item.value" :class="item.colcode" :name="item.colcode" :ref="item.colcode">
                            </div>
                        </span>
                    </li>
                </ul>
            </div>

            <div class="beneFiciary">
                    <p class="policyTitle">
                        <van-icon :name="titleIcon2" slot="left" size="18px" style="vertical-align:middle;margin-top:-3px"/>
                        <span>受益人信息</span>
                    </p>
                    <ul>
                        <li>
                            <span class="list_01">受益人类型</span>
                            <span class="list_02">法定受益人</span>
                        </li>
                    </ul>
                    <p class="policyTitle">
                        <van-icon :name="titleIcon6" slot="left" size="18px" style="vertical-align:middle;margin-top:-3px"/>
                        <span>保费</span>
                    </p>
                    <ul>
                        <li>
                            <span class="list_01">购买份数</span>
                            <span>
                                <van-stepper v-model="totalVal" min="1" :max="productNum" @change="changePrice"/>
                            </span>
                        </li>
                        <li>
                            <span class="list_01">合计保费</span>
                            <span>￥{{totalPrice}}</span>
                        </li>
                    </ul>
                </div>
            <div class="fixBar">
                <van-tabbar>
                    <van-tabbar-item class="price">￥{{totalPrice}}</van-tabbar-item>
                    <van-tabbar-item class="gobuy" @click="onCheckPolicy">立即投保</van-tabbar-item>
                </van-tabbar>
            </div>  
            <van-popup v-model="areaShow" position="bottom">
            <!-- 省市区下拉框 -->
            <van-area
                :area-list="areaList"
                @confirm="confirm"
                @cancel="cancel"
                :item-height="35"
            />
            </van-popup>
            <!-- 开户银行下拉框 -->
            <van-popup v-model="showBank" position="bottom">
                <van-picker
                    show-toolbar
                    :columns="bankList"
                    @cancel="showBank = false"
                    @confirm="onConfirm"
                />
            </van-popup>
            <!-- 弹出遮罩层 -->
            <van-popup v-model="loadingShow" :lock-scroll="false" style="background-color: transparent;" :close-on-click-overlay="false">
                <!-- 加载动画 -->
                <van-loading size="24px" vertical color="#1989fa">数据加载中...</van-loading>
            </van-popup>
             <!-- 职业选择弹出 -->
          <van-action-sheet title="选择职业分类" v-model="showOccupation" position="bottom" :style="{ height: '80%' }">
              <div class="AnLianOccupation" :title="OccupationData">
                  <ul class="Occupation_one" v-for="(item,index) in OccupationData" :key="index">
                      <!-- 一级职业 -->
                      <li>{{item.trade}}</li>
                      <div>
                          <!-- 二级职业 -->
                          <li v-for="(items,index) in item.anLianSecondJobList" :key="index">
                              <div>
                                  <p @click="childShow($event)">{{items.occupationalClass}}<van-icon name="arrow" style="float:right;"/></p>
                                  <div class="showOccupationalName" v-show="false">
                                      <p v-for="(content,index) in items.anLianThirdJobList" :key="index" @click="selectOccupationVal(content.occupationalCode,item.trade,items.occupationalClass,content.occupationalName)">{{content.occupationalName}}</p>
                                  </div>
                              </div>
                          </li>
                      </div>
                  </ul>
              </div>
          </van-action-sheet>
            <!-- 常用联系人 -->
            <van-action-sheet title="选择常用联系人" v-model="showContacts" position="bottom" :style="{ height: '100%' }">
                <popupContacts @Contacts="ChildContacts"></popupContacts>
            </van-action-sheet>
        </div>
    </div>
</template>

<script>
    import area from "../../../../static/js/area";
    import api from '../../../fetch/api'
    import $ from "jquery";
    import Vant,{ Toast } from 'vant';
    import { isIdCard , isPhoneNumber,isEmail } from '../../../util/validate'
    // 弹出常用联系人
    import popupContacts from '../../../components/popupContacts' 
    export default {
        name:'insuranceAnXin',
        components: {
            popupContacts:popupContacts
        },
        data () {
            return {
                titleIcon1: require("../../../assets/images/others/personal1.png"),
                titleIcon2: require("../../../assets/images/others/personal2.png"),
                titleIcon3: require("../../../assets/images/others/personal3.png"),
                titleIcon4: require("../../../assets/images/others/personal4.png"),
                titleIcon5: require("../../../assets/images/others/personal5.png"),
                titleIcon6: require("../../../assets/images/others/personal6.png"),
                showPage:true, //是否显示骨架屏
                loadingShow:false,//加载动画是否显示
                //三级联动
                areaList: area,   //三级联动所有数据
                areaShow: false,   //三级联动是否显示
                holderList:"",   //投保人配置信息(需要让用户填写的信息)
                inserdConfigList:[],//所有被保险人信息
                inserdList:'',  //存放单个被保险人基本配置信息
                insuredCertificateType:false,   //被保险人证件类型控件显示隐藏
                insuredRelationship:false,  //与投保人关系控件显示隐藏
                isSocialSecurity:true, //是否有社保
                //投保人区域
                holderBirth:"",   //投保人性别
                typeShow_holder:false,   //投保人证件类型是否显示
                typeActions_holder: '',  //投保人证件类型JSON数据   例如:{name:年龄,value:'18'}
                //被保险人区域
                //底部信息 标的信息
                otherList:"",
                totalPrice:"",
                onePrice:"",  //单件产品价格
                totalVal:"1",   //产品个数
                productId:'',  //产品id
                goodName:'', //产品名称
                inserdNum:1, //投保人个数
                productNum:1,//产品上限个数
                insuredNum:0, //被保险人上限个数
                key:1,  //每个被保险人渲染 绑定的key值  删除的时候问题
                inserdArr:'',
                minPolicyDate:1, //最小起保投保日期为当前时间的几天后。 默认为1，如果后台没有配置不会报错
                maxPolicyDate:1, //最大起保投保日期为当前时间的几天后。 默认为1，如果后台没有配置不会报错
                showOccupation: false, //职业分类是否显示
                OccupationData: "", //安联职业全部JSON数据
                OccupationVal: "", //职业分类value
                cityListCode: "", //选择最后一个职业列表之后获取的 occupationalCode
                isSocialSecurityVal:'', //被保险人有无社保val值
                isSocialSecurityName:'', //被保险人有无社保name属性
                anLianJobList:'',  //安联职业全部JSON数据
                city1:'',  //一级职业下面的所有数据
                city2:'',  //二级职业下面的所有数据
                cityListCode:'', //选择最后一个职业列表之后获取的 occupationalCode
                showBank: false, //开户银行类型显示隐藏
                bankValue:'',  //开户银行类型选择value值
                bankList:[  //开户银行数据类型
                    {'text':'中国银行','value':'中国银行'},
                    {'text':'建设银行','value':'建设银行'},
                    {'text':'交通银行','value':'交通银行'},
                    {'text':'邮政储蓄银行','value':'邮政储蓄银行'},
                    {'text':'广发银行','value':'广发银行'},
                    {'text':'兴业银行','value':'兴业银行'},
                    {'text':'广大银行','value':'广大银行'},
                    {'text':'平安银行','value':'平安银行'},
                    {'text':'中信银行','value':'中信银行'},
                    {'text':'浦发银行','value':'浦发银行'},
                    {'text':'北京银行','value':'北京银行'},
                    {'text':'广州银行','value':'广州银行'},
                    {'text':'上海银行','value':'上海银行'},
                ],
                showContacts:false, //常用联系人弹窗是否显示
                person:'', //选择常用联系人的是投保人，还是被保险人
            }
        },
        mounted() {
            /**
             * 中科软可回溯
             */
            var infor={};
            infor.start=1; //必传
            initEasyReplay(infor);//初始化

            console.log(this.$route.query)
            this.onePrice = this.$route.query.priceResult;  // 价格
            this.productId = this.$route.query.productId;  // 产品id
            this.planId = this.$route.query.planId;  // 计划id
            this.brandId = this.$route.query.brandId;  // 用于职业分类 brandId、catId、typeId
            this.catId = this.$route.query.catId;  
            this.typeId = this.$route.query.typeId;  
            this.changePrice(); //价格试算
            var this_ = this;

            // 根据产品id 获取产品名称 
            var args=this.sign({productId:this.productId,planId:this.planId});
            // 投保人配置信息
            var holderArr=[];
            // 被保险人配置信息
            var inserdArr=[];
            // 其他配置信息
            var otherArr=[];

            // 获取投保人、被保险人、标的信息 配置信息
            api.getSetPolicy(args).then(res => {
                this_.showPage = false
                this_.$nextTick(function(){
                    // 产品名称
                this_.goodName = res.data.policyParams.goodName;
                // 最大起保日期
                this_.maxPolicyDate = res.data.policyParams.goodSlowestEffectiveTime;
                // 最小起保日期
                this_.minPolicyDate = res.data.policyParams.goodFastestEffectiveTime;
                // 获取产品详情根据计划id，获取最大产品个数
                this_.productNum = res.data.policyParams.insuredPortion;
                // 渲染起保日期 日历
                layui.use('laydate',function(){
                    var laydate = layui.laydate;
                    var time = new Date().setDate(new Date().getDate()+Number(this_.minPolicyDate));
                    // 起保时间
                    laydate.render({
                        elem: "#time",
                        type : 'date',
                        format : 'yyyy-MM-dd',
                        min:+Number(this_.minPolicyDate), //起保日期
                        max:+Number(this_.maxPolicyDate),
                        value:this_.timestampToTime(time,true),
                        done:value => { 
                            $('#time').val(value);
                        }
                    }); 
                })

                // 投保配置信息
                var prodPolicyInputs = res.data.prodPolicyInputs;
                $.each(prodPolicyInputs,function(index,ele){
                    if(ele.classcode=="tbr_info"){
                        try {
                            ele.value = eval(ele.value)
                        } catch (error) {}
                        holderArr.push(ele);
                    }else if(ele.classcode=="bbr_info"){
                        try {
                            ele.value = eval(ele.value)
                        } catch (error) {}
                        inserdArr.push(ele);
                    }else if(ele.classcode=="other_info"){
                        try {
                            ele.value = eval(ele.value)
                        } catch (error) {}
                        otherArr.push(ele);
                    }else if(ele.classcode=="bbr_num"){
                        try {
                            ele.value = eval(ele.value)
                        } catch (error) {}
                        this_.insuredNum = ele.value;
                    }
                })
                // 取出 投保人信息数据 
                this.holderList=holderArr;
                // 取出 被保人信息
                this.inserdList = inserdArr;
                // 取出其他 配置信息
                this.otherList = otherArr;

                // 绑定日期选择器
                this.$nextTick(function   () {
                    layui.use(['laydate','form'],function(){
                        var laydate=layui.laydate;
                        var form=layui.form;
                        //投保人出生日期
                        laydate.render({
                            elem: "#holderBirth",
                            max:new Date().setDate(new Date().getDate()),
                            done:value => { 
                                $('#holderBirth').val(value);
                            }
                        }); 
                        // 默认第一个被保险人出生日期
                        laydate.render({
                            elem: '#insuredBirth',
                            max:new Date().setDate(new Date().getDate()),
                            done:value => { 
                                $('#insuredBirth').val(value);
                            }
                        }); 
                        form.render();
                    })
                });
                })
            })

             // 获取大家保职业数据
            var args1 = this.sign({brandId:this.brandId,catId:this.catId,typeId:this.typeId,templateName:"职业分类库"});
            api.getOccupationList(args1).then(res => {
                this_.OccupationData = res.anLianJobList;
            });

            // 获取安联省市区信息
            // var args1=this.sign({});
            // api.getJobByAnLian(args1).then(res => {
            //     this_.anLianJobList = res.anLianJobList;
            //     console.log(this_.anLianJobList)
            //     var province = ' <option>请选择</option>';
            //     for(var i = 0;i < res.anLianJobList.length;i++){
            //         province += '<option>'+ res.anLianJobList[i].trade +'</option>'
            //     }
            //     $('#profession1').html(province);
            // })
        },
        methods: {
            ChildContacts(res){
                this.showContacts = false;
                // 调用公共常用联系人回调
                this.Utils.SelectContacts(res, this.person, 0);
            },
            // 常用联系人
            contacts(person){
                // 显示常用联系人弹窗
                this.showContacts = true;
                // 选择的是投保人 还是被保险人
                this.person = person;
            },
            // 显示职业分类选择
            ShowOccupation() {
            this.showOccupation = true;
            },
            // 职业分类二级选择显示隐藏
            childShow(event) {
            if (
                $(event.target)
                .parent("div")
                .find("div")
                .attr("class") == "showOccupationalName"
            ) {
                $(".showOccupationalName").removeClass("OccupationalName");
                $(".van-icon").css("transform", "rotate(0deg)");
                $(event.target)
                .parent("div")
                .find("div")
                .addClass("OccupationalName");
                $(event.target)
                .find($(".van-icon"))
                .css("transform", "rotate(90deg)");
            } else {
                $(event.target)
                .parent("div")
                .find("div")
                .removeClass("OccupationalName");
                $(event.target)
                .find($(".van-icon"))
                .css("transform", "rotate(0deg)");
            }
            },
            // 职业分类三级选择获取内容和code
            selectOccupationVal(
                code,
                OccupationValOne,
                OccupationValTow,
                OccupationValThree
            ) {
                this.OccupationVal = 
                  OccupationValOne + " " + OccupationValTow + " " + OccupationValThree;
                this.cityListCode = code;
                this.showOccupation = false;
            },
            // 开户银行选择回调
            onConfirm(value) {
                this.bankValue = value.value;
                this.showBank = false;
            },
            //投保人区域
            //投保人证件类型选择回调
            TypeSelect_holder(item) {
                this.typeShow_holder = false;
                this.$refs.holderCertificateType[0].value = item.value;
                // 判断身份证回调类型为身份证的时候，性别锁死
                this.Utils.CertificateTypeLockSex(item.value,$(".holderSex"),this.getMoreInfoHolder());
            },
            ChooseType_holder(){
                this.typeShow_holder=true;
            },
            //被保险人证件类型选择回调
            TypeSelect_inserd(item) {
                this.insuredCertificateType = !this.insuredCertificateType;
                $('#insuredCertificateType').val(item.name);
                // 被保人身份证锁定性别
                this.Utils.CertificateTypeLockSex(item.value, $(".insuredSex"),this.getMoreInfoInserd());
            },
            //被保险人证件类型 显示隐藏
            ChooseType_inserd(){
                this.insuredCertificateType = !this.insuredCertificateType;
            },
            // 投保人与被保险人关系类型选择 显示隐藏
            showSelect_Relationship(){
                this.insuredRelationship = !this.insuredRelationship;
            },
            // 被保险人有无社保显示隐藏
            showSelect_isSocialSecurity(index){
                this.isSocialSecurity = !this.isSocialSecurity;
            },
            // 被保险人有无社保选择回调
            holderSelect_isSocialSecurity(item){
                this.isSocialSecurity = !this.isSocialSecurity;
                $('#isSocialSecurity').val(item.name);
            },
            //被保险人与投保人关系类型选择回调
            inserdSelect_Relationship(item) {
                this.insuredRelationship = !this.insuredRelationship;
                $('#insuredRelationship').val(item.name);
                // 选择本人
                if(item.name == "本人"){
                    $('input[name=insuredName]').val($('input[name=holderName]').val());
                    $('#insuredCertificateType').val($('input[name=holderCertificateType]').val());
                    $('input[name=insuredCertificateNo]').val($('input[name=holderCertificateNo]').val());
                    $('input[name=insuredPhone]').val($('input[name=holderPhone]').val());
                    var idVal=$('.insuredCertificateNo').val();
                    var tBirth_y = idVal.substring(6, 10);
                    var tBirth_m = idVal.substring(10, 12);
                    var tBirth_d = idVal.substring(12, 14);
                    var tBirth = tBirth_y + "-" + tBirth_m + "-" + tBirth_d;
                    $('#insuredBirth').val(tBirth);
                    var sex = idVal.charAt(16);
                    if (sex % 2 == 0) {
                        $('.insuredSex').eq(0).find('input[title=女]').click();
                    } else {
                        $('.insuredSex').eq(0).find('input[title=男]').click();
                    }
                    layui.use('form', function(){
                        var form = layui.form; 
                        form.render();
                    }); 
                    // 被保人身份证锁定性别
                    this.Utils.CertificateTypeLockSex($('#insuredCertificateType').val(), $('.insuredSex'));
                }else{
                    // $('input[name=insuredName]').val('');
                    // $('input[name=insuredCertificateType]').val('');
                    // $('input[name=insuredCertificateNo]').val('');
                    // $('input[name=insuredPhone]').val('');
                    // $('#insuredBirth0').val('');
                }
            },
            changePrice(){
                // 价格 * 人数 * 份数
                this.totalPrice = this.accMul(Number(this.onePrice),Number(this.totalVal),Number(this.inserdNum));
            },
            //调用核保接口
            onCheckPolicy(){
                var data={
                    time: $('#time').val(),
                    memberId: this.getCookie('ZB_JUSER_Mid'),
                    openId: this.getCookie('openId'),  //o3aOP03W4q9_FG_0lLo60dXxxcrA"
                    number: this.totalVal,
                    shareLinks: this.getQueryString("shareMid"), //分享者mid
                    goodId: this.getQueryString('productId'),
                    source: "2",
                    planId: this.getQueryString('planId'),
                    policyFee:this.totalPrice,
                    safeDate:decodeURI(this.getQueryString('safeDate')),
                    activityCode:this.getQueryString('activityCode'),  //活动id
                    invitationCode:this.getQueryString('invitationCode'),  //邀请码
                    topActivityCode:this.getQueryString('topActivityCode'),  //上级邀请码
                    healthNotification:this.getCookie('healthAnswer') ? JSON.parse(this.getCookie('healthAnswer')) : '',
                };
                var holder={};   //投保人信息
                var inserdAllList = [];  //被保险人信息
                var this_=this;

                //==================================================  获取用户填写信息  =================================================

                // 获取投保人填写信息
                $.each(this.holderList,function(index,ele){
                    if(ele.colcode=="holderSex"){
                        holder[ele.colcode] = $('.holderSex').find('input[name="sex"]:checked').val();
                    }else if(ele.colcode=="holderCertificateType"){
                        holder[ele.colcode] = this_.$refs.holderCertificateType[0].value;
                    }else{
                        holder[ele.colcode] = $('[name="'+ele.colcode+'"]').val();
                    }
                })
                // 获取所有被保险人填写信息
                var inserdList = {};
                $.each(this_.inserdList,function(index,ele){
                    if(ele.colcode=="insuredSex"){
                        var radioContent = $('.inserdPolicy').find($('div[name='+ ele.colcode +']')).find('input[name="sex"]:checked').val();
                        inserdList[ele.colcode] = radioContent;
                    }else if(ele.colcode=="insuredCertificateType"){
                        inserdList[ele.colcode] = $('.inserdPolicy').find($('input[name='+ ele.colcode +']')).val();
                    }else if(ele.colcode=="workTypeName"){
                        var profession1 = $('#profession1').val() == '请选择' ? '' : $('#profession1').val();
                        var profession2 = $('#profession2').val() == '请选择' ? '' : $('#profession2').val();
                        var profession3 = $('#profession3').val() == '请选择' ? '' : $('#profession3').val();
                        inserdList[ele.colcode] = profession1 + ' ' + profession2 + ' ' + profession3;
                        inserdList['work_type_code'] = this_.cityListCode;
                    }else{
                        if(ele.colcode != undefined){
                            inserdList[ele.colcode] = $('.inserdPolicy').find($('input[name='+ ele.colcode +']')).val();
                        }
                    }
                })

                // 获取所有其他信息 放到other对象中
                var otherList = {};
                $.each(this_.otherList,function(index,ele){
                    if(this_.isSocialSecurity == false){
                        if(ele.colcode!="AccountNo" && ele.colcode!="AccountBankName" && ele.colcode!="AccountName"){
                            otherList[ele.colcode] = $('.inserdPolicy').find($('input[name='+ ele.colcode +']')).val();
                        }
                    }else{
                        otherList[ele.colcode] = $('.inserdPolicy').find($('input[name='+ ele.colcode +']')).val();
                    }
                })
                inserdList.subjectJson = otherList;
                inserdAllList.push(inserdList);
                data.holder=holder;
                data.inserd=inserdAllList;
                console.log(data)


                //==================================================  校验户填写信息  =================================================

                // 投保人信息校验
                var reg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;//验证姓名正则
                if($('#time').val() == ''){
                    Toast('请选择起保时间');
                }else if(!reg.test($('input[name=holderName]').val())){
                    Toast('投保人姓名不正确');
                }else if($('input[name=holderCertificateType]').val() == ''){
                    Toast('请选择投保人证件类型');
                }else if($('input[name=holderCertificateNo]').val() == ''){
                    Toast('请填写投保人证件号码');
                }else if($('input[name=holderCertificateType]').val() == '身份证' &&  isIdCard($('input[name=holderCertificateNo]').val()) == false){
                    Toast('投保人身份证号码不正确');
                }else if($('input[name=holderPhone]').val() == '' || isPhoneNumber($('input[name=holderPhone]').val()) == false){
                    Toast('投保人电话不正确');
                }else if($('input[name=holderMailbox]').val() == '' || isEmail($('input[name=holderMailbox]').val()) == false){
                    Toast('投保人邮箱不正确');
                }else if($('input[name=holderBirth]').val() == ''){
                    Toast('请选择投保人出生日期');
                // 被保险人信息校验
                }else{
                    var Status = true;
                    for(var i = 0;i < data.inserd.length;i++){
                        if(data.inserd[i].insuredRelationship == ''){
                            Toast('请选择与投保人关系');
                            Status = false;
                        }else if(data.inserd[i].insuredName == ''){
                            Toast('请输入被保险人姓名');
                            Status = false;
                        }else if(data.inserd[i].insuredSex == ''){
                            Toast('请选择被保险人性别');
                            Status = false;
                        }else if(data.inserd[i].insuredCertificateNo == ''){
                            Toast('请输入被保险人证件号码');
                            Status = false;
                        }else if(data.inserd[i].insuredCertificateType == ''){
                            Toast('请选择被保险人证件类型');
                            Status = false;
                        }else if(data.inserd[i].insuredBirth == ''){
                            Toast('请输入被保险人出生日期');
                            Status = false;
                        }else if(data.inserd[i].insuredPhone == ''){
                            Toast('请输入被保险人手机号');
                            Status = false;
                        }else if(data.inserd[i].workTypeName == ''){
                            Toast('请选择职业信息');
                            Status = false;
                        }else if(data.inserd[i].isSocialSecurity == ''){
                            Toast('请选择有无社保');
                            Status = false;
                            // 标的信息判断
                        }else if(this_.isSocialSecurity){
                            if(data.inserd[i].subjectJson.AccountNo == ''){
                                Toast('请输入银行账户');
                                Status = false;
                            }else if(data.inserd[i].subjectJson.AccountBankName == ''){
                                Toast('请选择开户银行');
                                Status = false;
                            }else if(data.inserd[i].subjectJson.AccountName == ''){
                                Toast('请输入持卡人姓名');
                                Status = false;
                            }
                        }
                    }

                    if(Status == true){
                        var args=this_.sign(data);
                        this_.loadingShow = true;
                        // this.$axios.post('/brg/openapi/Order/appAddpolicy',args)  //本地核保接口
                         api.getAppAddpolicy(args)
                                .then(response => {
                                    this_.loadingShow = false;
                                    if(response.code == 1){
                                        var Pid=response.data;
                                        this_.$router.push({ path: '/policyPreview',query:{id:Pid,productId:this_.productId,planId:this_.planId}});
                                    }else{
                                        this_.loadingShow = false;
                                        Toast(response.message);
                                    }
                                }, err => {
                                    this_.loadingShow = false;
                                    Toast(err.message);
                                })
                                .catch((error) => {
                                    this_.loadingShow = false;
                                    Toast(err.message);
                                })
                    }
                }
            },
            // 投保人 输入身份证号
            getMoreInfoHolder(){
                if($('#holderCertificateType').val() == '身份证'){
                    var idVal=$('.holderCertificateNo').val();
                    var tBirth_y = idVal.substring(6, 10);
                    var tBirth_m = idVal.substring(10, 12);
                    var tBirth_d = idVal.substring(12, 14);
                    var tBirth = tBirth_y + "-" + tBirth_m + "-" + tBirth_d;
                    $('#holderBirth').val(tBirth);
                    // 性别
                    if (idVal.length==18) {
                        var sex = idVal.charAt(16);
                        if (sex % 2 != 0) {
                            $('.holderSex input[value=男]').click();
                            layui.form.render();
                        } else {
                            $('.holderSex input[value=女]').click();
                            layui.form.render();
                        }
                    } else {
                    //    alert('身份证非18位证件号码')
                    }
                }
            },
            // 被保险人 输入身份证号
            getMoreInfoInserd(){
                if($('#insuredCertificateType').val() == '身份证'){
                    var idVal=$('.insuredCertificateNo').val();
                    var tBirth_y = idVal.substring(6, 10);
                    var tBirth_m = idVal.substring(10, 12);
                    var tBirth_d = idVal.substring(12, 14);
                    var tBirth = tBirth_y + "-" + tBirth_m + "-" + tBirth_d;
                    $('#insuredBirth').val(tBirth);
                    // 性别
                    if (idVal.length==18) {
                        var sex = idVal.charAt(16);
                        if (sex % 2 == 0) {
                            $('.insuredSex').find('input[title=女]').click();
                        } else {
                            $('.insuredSex').find('input[title=男]').click();
                        }
                        layui.use('form', function(){
                            var form = layui.form; 
                            form.render();
                        }); 
                    } else {
                    //    alert('身份证非18位证件号码')
                    }
                }
            },
            // 三級联动
            confirm(val) {
                if(val[2] == undefined){
                    $('input[citySelect='+ 'citySelect]').val(val[0].name + " " + val[1].name);
                }else{
                    $('input[citySelect='+ 'citySelect]').val(val[0].name + " " + val[1].name + " " + val[2].name);
                }
                this.areaShow = false;
            },
            cancel() {
                this.areaShow = false;
                console.log(this.$refs);
            },
            AreaShow(index) {
                this.areaShow = true;
            },
            // 职业联动
            profession1(){
                $('#profession2').html('<option>请选择</option>');
                $('#profession3').html('<option>请选择</option>');
                for(var i = 0;i < this.anLianJobList.length;i++){
                    if(this.anLianJobList[i].trade == $('#profession1').val()){
                        this.city1 = this.anLianJobList[i].anLianSecondJobList;
                        var city = '<option>请选择</option>';
                        for(var j = 0;j < this.city1.length;j++){
                            city += '<option>'+ this.city1[j].occupationalClass +'</option>'
                        }
                        $('#profession2').html(city);
                    }
                }
            },
            profession2(){
                $('#profession3').html('<option>请选择</option>');
                for(var i = 0;i < this.city1.length;i++){
                    if(this.city1[i].occupationalClass == $('#profession2').val()){
                        this.city2 = this.city1[i].anLianThirdJobList;
                        var city = '<option>请选择</option>';
                        for(var j = 0;j < this.city2.length;j++){
                            city += '<option>'+ this.city2[j].occupationalName +'</option>'
                        }
                        $('#profession3').html(city);
                    }
                }
                $('#profession3').html(city);
            },
            profession3(){
                for(var i = 0;i < this.city2.length;i++){
                    if(this.city2[i].occupationalName == $('#profession3').val()){
                        console.log(this.city2[i])
                        this.cityListCode = this.city2[i].occupationalCode;
                        console.log(this.cityListCode)
                    }
                }
            }
        }
    }
</script>

<style lang='scss'>
.van-action-sheet{
  max-height: 100%;
}
.policyMain{
    .van-icon__image{
        width: 40px;
        height: 40px;
        vertical-align: middle;
        margin-top: -8px;
        font-size: 18px;
    }
    .productName{
        height: 110px;
        line-height: 110px;
        color: #0c0c0c;
        font-size: 32px;
        font-weight: 600;
        padding: 0 20px;
        background-color: #F7F7F7;
    }
    .policyTitle{
        font-size: 32px;
        font-weight: 500;
        color: #0c0c0c;
        width: 100%;
        height: 88px;
        line-height: 88px;
        padding-left:1em;
        background-color: #F7F7F7;
        span{
            font-size: 32px;
            font-weight: 500;
            color: #0c0c0c;
            height: 88px;
            line-height: 88px;
        }
    }
    
    .holderPolicy,
    .inserdPolicy,
    .otherPolicy,
    .beneFiciary,
    .startTime {
      &>ul {
        li {
          border-bottom: 2px solid #dddddd;
          width: 100%;
          height: 100px;
          line-height: 100px;
          display: flex;
          .list_01 {
            display: inline-block;
            height: 100px;
            line-height: 100px;
            width: 27%;
            margin-left: 5%;
            color: #0c0c0c;
            font-size: 28px;
          }
          .list_02 {
            width: 65%;
            display: inline-block;
            height: 100px;
            line-height: 100px;
            &>div{
              img{
                width: 44px;
              }
            }
            .van-action-sheet__close {
              padding: 0 30px;
            }
            .van-radio-group {
              display: flex;
              margin: 30px auto;
              .van-radio {
                margin-right: 30px;
              }
            }
            input[type="text"] {
              width: 87%;
              height: 70px;
            }
          }
          .van-stepper {
              display: contents;
              input {
                line-height: 28px;
              }
            }
        }
      }
    }
    .fixBar{
        .van-tabbar{
            height: 100px;
            line-height: 100px;
        }
        .van-tabbar-item--active{
            color: #666
        }
            .van-tabbar-item:nth-child(2){
            flex: 2;
            color: #333; 
        }
        .van-tabbar-item:nth-child(3){
            flex: 3;
            color: #333; 
        }
       .price {
      .van-tabbar-item__icon{
        display: none;
      }
      .van-tabbar-item__text {
        font-weight: 600;
        font-size: 36px;
        color: #f9912e;
      }
    }
    .gobuy {
      background: #f9912e;
      .van-tabbar-item__icon{
        display: none;
      }
      .van-tabbar-item__text {
        color: #fff;
        font-size: 36px;
        width: 100%;
        height: 100%;
        text-align: center;
        line-height: 100px;
        font-weight:bold;
      }
    }
    }   
    .van-dialog {
        .van-button {
            border: 0;
            width: 80%;
            margin: 0 auto;
            display: block;
            border-radius: 50px;
            margin-bottom: 20px;
            height: 40px;
            line-height: 40px;
        }
    }
}
.layui-form-radio{
    margin-top: 0!important;
}
#time{
    width: 87%;
    height: 98px;
}
.AnLianOccupation {
  .Occupation_one {
    & > li {
      padding: 20px 70px;
      background-color: rgb(245, 245, 245);
      text-align: center;
    }
    & > div > li {
      padding: 0 50px;
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
}
.OccupationalName {
  display: block !important;
}
div[name='workTypeName']{
    padding: 10px 0;
    height: 50px;
    select{
        width: 480px;
        margin-bottom: 15px;
        display: block;
        background: white;
    }
}
</style>