<!-- 私人定制详细 -->
<template>
    <div class='content'>
        <p class="title">{{data.questionName}}</p>
        <div id="icon" :class="data.topicTypes == '关系' ? 'noFlex' : ( data.topicTypes == '单选' ? 'flexBox' : 'date')">
            <label v-for="(item,index) in data.znAnswer" :key="index">
                <div style="display:inline-block" v-if="data.topicTypes == '单选'">
                    <img :src="iconPath + item.answerPic.split(':')[1]" alt="">
                    <input type="radio" :name="item.znProblemId" :value="item.answer">{{item.answer}}
                </div>
                <div style="display:inline-block" v-else-if="data.topicTypes == '关系'">
                    <img :src="iconPath + item.answerPic.split(':')[1]" alt="">
                    <input type="checkbox" :sort="item.sort" :value="item.answer" v-bind:checked="item.checked == 2 ? true : false">{{item.answer}}
                </div>
                <div style="display:block;" v-else-if="data.topicTypes == '日期'">
                    <span>{{item.relationship}}</span>
                    <img :src="iconPath + item.answerPic.split(':')[1]" alt="">
                    <input type="text" :sort="item.sort" placeholder="请选择日期" @click="showDate($event)" readonly>
                </div>
                <div style="display:block;" v-else-if="data.topicTypes == '职业'">
                    <span>{{item.relationship}}</span>
                    <img :src="iconPath + item.answerPic.split(':')[1]" alt="">
                    <select style="margin-left:1rem;">
                        <option v-for="(items,index) in item.oldAnswerList" :key="index" :sort="item.sort" :selected="item.answer == items.answer ? true : false">{{items.answer}}</option>
                    </select>
                </div>
                <div style="display:block;" v-else-if="data.topicTypes == '数字'">
                    <span>{{item.relationship}}</span>
                    <img :src="iconPath + item.answerPic.split(':')[1]" alt="">
                    <div class="number">
                        年收入 <input type="number" :sort="item.sort" :value="item.answer"> 万
                    </div>
                </div>
                <div style="display:block;" v-else-if="data.topicTypes == '社保'">
                    <span>{{item.relationship}}</span>
                    <img :src="iconPath + item.answerPic.split(':')[1]" alt="">
                    <div class="socialSecurity">
                        <label v-for="(items,index1) in item.oldAnswerList" :key="index1">
                            <input type="radio" :sort="item.sort" :name="'relationship' + index" :value="items.answer" v-bind:checked="(item.answer == items.answer ? true : (index1 == 0 ? 'checked' : false))">{{items.answer}}社保
                        </label>
                    </div>
                </div>
                <div style="display:block;" v-else-if="data.topicTypes == '地址'">
                    <span>{{item.relationship}}</span>
                    <img :src="iconPath + item.answerPic.split(':')[1]" alt="">
                    <input type="text" :sort="item.sort" @click="chowCity($event)" placeholder="请选择省市区" readonly>
                </div>
            </label>
        </div>
        <div class="addBtn" v-if="data.topicTypes == '关系'" @click="addProp()">+</div>
        <div class="lineButton">
            <input type="button" name="nextstep" class="nextstep" value="选好了，继续" @click="next()"/>
            <!-- 当前进度及返回上一题 -->
            <div class="front_btn">
                <p><span :style="'width:' + pathWidth + '%'"></span></p>
                <div class="button">
                    <input type="button" class="goFront" value="上一题" v-show="sortWeight < 8" @click="Previous()">
                    <span class="sapn_jd">{{data.znProblemId}}/8</span>
                </div>
            </div>
        </div>
        <!-- 选择多个关系 -->
        <div class="porp_box" style="display:none;">
            <div class="alert_box">
                <ul>
                    <li>
                        <label for='choose_one' @click="addRelation('儿子','son')">
                            <img src="https://www.zgbxjj.com/showImage?imgId=/attachment/brand/son.png">
                            <p><input type='radio' name='choose_guanxi' id='choose_one' value='' />儿子</p>
                        </label>
                    </li>
                    <li>
                        <label for='choose_two' @click="addRelation('女儿','daughter')">
                            <img src="https://www.zgbxjj.com/showImage?imgId=/attachment/brand/daughter.png">
                            <p><input type='radio' name='choose_guanxi' id='choose_two' value='' />女儿</p>
                        </label>
                    </li>
                    <li>
                        <label for='choose_three' @click="addRelation('母亲','mother')">
                            <img src="https://www.zgbxjj.com/showImage?imgId=/attachment/brand/mother.png">
                            <p><input type='radio' name='choose_guanxi' id='choose_three' value='' />母亲</p>
                        </label>
                    </li>
                    <li>
                        <label for='choose_four' @click="addRelation('父亲','father')">
                            <img src="https://www.zgbxjj.com/showImage?imgId=/attachment/brand/father.png">
                            <p><input type='radio' name='choose_guanxi' id='choose_four' value='' />父亲</p>
                        </label> 
                    </li>
                </ul>
            </div>
        </div>
        <!-- 日期选择 -->
        <van-popup v-model="showTime" position="bottom"  >
            <van-datetime-picker
            type="date"
            v-model="currentDate"
            :min-date="minDate"
            :max-date="maxDate"
            @confirm="confirm"
            @cancel="showTime == false"
            />
        </van-popup>
        <!-- 省市区联动 -->
        <van-popup v-model="showArea" position="bottom"  >
            <van-area
                :area-list="areaList"
                @confirm="cityConfirm"
                @cancel="showArea == false"
                :item-height="35"
            />
        </van-popup>
        <!-- 弹出遮罩层 -->
        <van-popup v-model="loadingShow" :lock-scroll="false" style="background-color: transparent;" :close-on-click-overlay="false">
            <!-- 加载动画 -->
            <van-loading size="24px" vertical color="#1989fa">数据加载中...</van-loading>
        </van-popup>
    </div>
</template>

<script>
    import $ from 'jquery';
    import api from "@/fetch/api";
    import area from "../../../static/js/area";
    export default {
        name:'CustomizeMessage',
        components: {

        },
        data () {
            return {
                currentDate: new Date(),
                maxDate:new Date(),
                minDate:new Date(1900,1,1),
                showTime: false,   //三级联动是否显示 
                showArea: false,   //省市区联动
                areaList: area,   //三级联动所有数据
                timeTarget:'',  //选中日期联动 input目标元素
                cityTarget:'', //选中省市区 input 目标元素
                data:'',  // 获取题 接口返回数据
                iconPath:'https://www.zgbxjj.com/showImage?imgId=',  //icon 图片路径
                sortWeight:8,
                pathWidth:0,
                relationSort:1, //添加 角色排序
                openId:this.getCookie('openId'),
                loadingShow: false, //加载动画是否显示
            };
        },
        mounted(){
            var that = this;
            this.pathWidth+=12.5;
            // 默认请求第一题
            var args = this.sign({
                openId:that.openId,
                sortWeight: that.sortWeight,
                mId:this.getCookie('ZB_JUSER_Mid')
            });
            // this.$axios.post('/brg/openapi/h5/personalCenter/getZnProblemAndZnAnswer',args).then(res=>{
            api.getZnProblemAndZnAnswer(args).then(res=>{
                var response = res;
                if(response.code == 20000){
                    that.data = response.data;
                    that.$nextTick(function(){
                            if(that.data.topicTypes == '日期' || that.data.topicTypes == '地址'){
                                for(var i = 0;i < that.data.znAnswer.length;i++){
                                    $('#icon label input').eq(i).val(that.data.znAnswer[i].answer);
                                }
                            }else if(that.data.topicTypes == '单选'){
                                for(var i = 0;i < that.data.znAnswer.length;i++){
                                    console.log($('#icon label input').eq(i)[0])
                                    if(that.data.znAnswer[i].checked == 2){
                                        $('#icon label input').eq(i).prop("checked",true);
                                    }
                                }
                            }
                        })
                }
            })
        },
        computed: {

        },
        methods: {
            // 下一题
            next(){
                var that = this;
                // 根据用户回答问题转json
                var selectCon = [];
                // 是否选择题目答案
                var isCorrect = false;
                // 判断私人定制选项为 关系
                if(this.data.topicTypes == '单选'){
                    for(var i = 0;i < $('#icon label input').length;i++){
                        if($('#icon label input:eq('+ i +'):checked')[0]){
                            selectCon.push({
                                answer: $('#icon label input:eq('+ i +'):checked').val(),
                                sort: 1,
                                relationship: null,
                                customer_answer_two: null,
                            })
                            isCorrect = true;
                        }
                    }
                    if(isCorrect == false){
                        that.Toast('请选择' + this.data.topicTypes);
                    }
                }else if(this.data.topicTypes == '关系'){
                    for(var i = 0;i < $('#icon label input').length;i++){
                        if($('#icon label input:eq('+ i +'):checked')[0]){
                            selectCon.push({
                                answer: $('#icon label input:eq('+ i +'):checked').val(),
                                sort: $('#icon label input:eq('+ i +'):checked').attr('sort'),
                                relationship: null,
                                customer_answer_two: null,
                            })
                            isCorrect = true;
                        }
                    }
                    if(isCorrect == false){
                        that.Toast('请选择关系');
                    }
                }else if(this.data.topicTypes == '日期' || this.data.topicTypes == '地址'){
                    for(var i = 0;i < $('#icon label input').length;i++){
                        if($('#icon label input').eq(i).val() != ''){
                            selectCon.push({
                                answer: $('#icon label input').eq(i).val(),
                                sort: $('#icon label input').eq(i).attr('sort'),
                                relationship: $('#icon label input').eq(i).parent().children('span').html(),
                                customer_answer_two: null,
                            })
                            if($('#icon label input').length-1 == i){
                                isCorrect = true;
                            }
                        }else{
                            isCorrect = false;
                            this.Toast('请选择' + this.data.topicTypes);
                        }
                    }
                }else if(this.data.topicTypes == '职业'){
                    this.$nextTick(function(){
                        for(var i = 0;i < $('#icon label select').length;i++){
                            if($('#icon label select').eq(i).find("option:selected").text() != ''){
                                selectCon.push({
                                    answer: $('#icon label select').eq(i).find("option:selected").text(),
                                    sort: $('#icon label select').eq(i).find("option:selected").attr('sort'),
                                    relationship: $('#icon label select').eq(i).parent().children('span').html(),
                                    customer_answer_two: null,
                                })
                                isCorrect = true;
                            }else{
                                this.Toast('请选择职业')
                            }
                        }
                    })
                }else if(this.data.topicTypes == '数字'){
                    this.$nextTick(function(){
                        for(var i = 0;i < $('#icon label input').length;i++){
                            if($('#icon label input').eq(i).val() != ''){
                                selectCon.push({
                                    answer: $('#icon label input').eq(i).val(),
                                    sort: $('#icon label input').eq(i).attr('sort'),
                                    relationship: $('#icon label input').eq(i).parent().parent().children('span').html(),
                                    customer_answer_two: null,
                                })
                                if($('#icon label input').length-1 == i){
                                    isCorrect = true;
                                }
                            }else{
                                isCorrect = false;
                                this.Toast('请选择日期')
                            }
                        }
                    })
                }else if(this.data.topicTypes == '社保'){
                    for(var i = 0;i < $('#icon label input').length;i++){
                        if($('#icon label input:eq('+ i +'):checked')[0]){
                            selectCon.push({
                                answer: $('#icon label input:eq('+ i +'):checked').val(),
                                sort: $('#icon label input:eq('+ i +'):checked').attr('sort'),
                                relationship: $('#icon label input:eq('+ i +'):checked').parent().parent().parent().children('span').html(),
                                customer_answer_two: null,
                            })
                            isCorrect = true;
                        }
                    }
                    if(isCorrect == false){
                        that.Toast('请选择' + this.data.topicTypes);
                    }
                }

                // 判断当前问题是否选择
                this.$nextTick(function(){
                    if(isCorrect){
                        // 加载动画显示
                        that.loadingShow = true;
                        // 权重
                        --this.sortWeight;
                        if(this.sortWeight <= 0){
                            that.gain(selectCon);
                            that.Toast('问题已回答完毕')
                            that.$router.push('/PersonalTailor');
                        }else{
                            // 提交用户填写问题
                            that.gain(selectCon);
                        }
                    }
                })
            },
            // 获取问题
            getZnProblemAndZnAnswer(){
                var that = this;
                // 获取当前填写问题内容
                var args = this.sign({
                    openId:that.openId,
                    sortWeight: that.sortWeight,
                    mId:this.getCookie('ZB_JUSER_Mid')
                })
                // this.$axios.post('/brg/openapi/h5/personalCenter/getZnProblemAndZnAnswer',args).then(res=>{
                api.getZnProblemAndZnAnswer(args).then(res=>{
                    var response = res;
                    if(response.code == 20000){
                        that.data = response.data;
                        that.$nextTick(function(){
                            if(that.data.topicTypes == '日期' || that.data.topicTypes == '地址'){
                                for(var i = 0;i < that.data.znAnswer.length;i++){
                                    $('#icon label input').eq(i).val(that.data.znAnswer[i].answer);
                                }
                            }else if(that.data.topicTypes == '单选'){
                                for(var i = 0;i < that.data.znAnswer.length;i++){
                                    if(that.data.znAnswer[i].checked == 2){
                                        $('#icon label input').eq(i).prop("checked",true);
                                    }
                                }
                            }
                        })
                    }
                })
            },
            // 获取用户填写问题
            gain(selectCon){
                var that = this;
                // 提交用户添加问题
                var args = this.sign({
                    customerProblem: {
                        openId:that.openId,
                        znProblemId: that.data.znProblemId,
                        sortWeight: that.data.sortWeight,
                        mId:this.getCookie('ZB_JUSER_Mid')
                    },
                    customerAnswers: selectCon
                });
                // this.$axios.post('/brg/openapi/h5/personalCenter/insertCustomerNewProblemAndAnswer',args).then(res=>{
                api.insertCustomerNewProblemAndAnswer(args).then(res=>{
                    var response = res;
                    if(response.code == 20000){
                        // 加载动画
                        that.loadingShow = false;
                        // 进度条
                        that.pathWidth+=12.5;
                        if(that.sortWeight > 0){
                            that.getZnProblemAndZnAnswer();
                        }
                    }
                })
            },
            // 上一题
            Previous(){
                var that = this;
                // 加载动画
                that.loadingShow = true;
                // 权重
                ++this.sortWeight;
                var args = this.sign({
                    openId:that.openId,
                    sortWeight: that.sortWeight,
                    mId:this.getCookie('ZB_JUSER_Mid')
                });
                // this.$axios.post('/brg/openapi/h5/personalCenter/getZnProblemAndZnAnswer',args).then(res=>{
                api.getZnProblemAndZnAnswer(args).then(res=>{
                    var response = res;
                    if(response.code == 20000){
                        // 加载动画
                        that.loadingShow = false;
                        // 进度条
                        that.pathWidth-=12.5;
                        that.data = response.data;
                        that.$nextTick(function(){
                            if(that.data.topicTypes == '日期' || that.data.topicTypes == '地址'){
                                for(var i = 0;i < that.data.znAnswer.length;i++){
                                    $('#icon label input').eq(i).val(that.data.znAnswer[i].answer);
                                }
                            }else if(that.data.topicTypes == '单选'){
                                for(var i = 0;i < that.data.znAnswer.length;i++){
                                    if(that.data.znAnswer[i].checked == 2){
                                        $('#icon label input').eq(i).prop("checked",true);
                                    }
                                }
                            }
                        })
                    }
                })
            },
            // 添加被保险人弹出框
            addProp(){
                layer.open({
                    title:'添加被保险人',
                    type: 1,
                    skin: 'layui-layer-demo', //样式类名
                    anim: 2,
                    shadeClose: true, //开启遮罩关闭
                    content: $('.porp_box').html(),
                });
            },
            // 添加被保险人
            addRelation(params,imageName){
                ++this.relationSort;
                console.log(this.relationSort)
                this.data.znAnswer.push({
                        "znProblemId": "3",
                        "answer": params,
                        "checked": "2",
                        "sort": this.relationSort,
                        "relationship": null,
                        "answerPic": "fs:/attachment/brand/"+ imageName +".png"
                    });
                layer.closeAll();
            },
            // 省市区显示
            showDate(event){
                // 选择省市区当前的元素
                console.log(event.target)
                this.timeTarget = event.target;
                this.showTime = true;
            },
            // 时间选择回调
            confirm(value){
                var that = this;
                that.$nextTick(function(){
                    $(that.timeTarget).val(this.timestampToTime(value,true))
                })
                this.showTime = false;
            },
            // 省市区回调
            cityConfirm(val){
                var that = this;
                that.$nextTick(function(){
                    if(val[2] == undefined){
                        $(that.cityTarget).val(val[0].name + " " + val[1].name);
                    }else{
                        $(that.cityTarget).val(val[0].name + " " + val[1].name + " " + val[2].name);
                    }
                })
                that.showArea = false;
            },
            // 显示省市区
            chowCity(event){
                console.log('省市区')
                this.cityTarget = event.target;
                this.showArea = true;
            }
        },
    }
</script>

<style lang="scss" scoped>
    .content{
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: scroll;
        background-color: #efeff4;
        padding-top: 80px;
        .title{
            margin: 0 0 20px 0;
            text-align: center;
            color: #8f8f94;
            font-size: 27px;
        }
        // 日期题
        .date{
            min-height: 250px;
            padding:0 5%;
            margin-top: 60px;
            label{
                &>div{
                    position: relative;
                    background-color: white;
                    margin-bottom: 20px;
                    border-radius: 23px 0 23px 0;
                    padding: 15px 0;
                    span{
                        width: 46px;
                        padding: 5px 0;
                        display: inline-block;
                        background-color: #007AFF;
                        border-radius: 23px 0 23px 0;
                        color: white;
                        text-align: center;
                        position: absolute;
                        top:0;
                        left: 0;
                        font-size: 25px;
                    }
                    img{
                        width: 120px;
                        display: inline-block;
                        vertical-align: middle;
                        margin: 10px 0 10px 80px;
                    }
                    &>input{
                        width: 400px;
                        margin-left: 40px;
                        background-color: #F99A31;
                        text-align: center;
                        height: 60px;
                        border-radius: 30px;
                        color: white;
                        &::-webkit-input-placeholder { /* WebKit, Blink, Edge */
                            color:white;
                        }
                        &:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
                            color:white;
                        }
                        &::-moz-placeholder { /* Mozilla Firefox 19+ */
                            color:white;
                        }
                        &:-ms-input-placeholder { /* Internet Explorer 10-11 */
                            color:white;
                        }
                    }
                }
                .number{
                    display: inline-block;
                    margin-left: 80px;
                    input{
                        background-color:white!important;
                        width:150px!important;
                        height: 60px;
                        border:solid 2px rgba(0,0,0,.2)!important;
                        border-radius:10px!important;
                        margin: 0 20px 0 20px !important;
                        color: black;
                        text-align: center;
                    }
                }
                .socialSecurity{
                    display: inline-block;
                    label{
                        margin-left: 80px;
                         input{
                            color: black;
                            vertical-align: middle;
                        }
                    }
                }
            }
        }
        // 单选题
        .flexBox{
            min-height: 180px;
            padding:0 10%;
            margin-top: 60px;
            display: flex;
            /*主轴方向*/
            flex-direction: row;
            /*换行方式*/
            flex-wrap: wrap;
            /*弹性子元素在主轴上的是对齐方式*/
            justify-content: space-around;
            label{
                img{
                    width: 120px;
                    display: block;
                    margin-bottom: 10px;
                    margin: auto;
                }
                width: 30%;
                margin-bottom: 20px;
                text-align: center;
                input{
                    vertical-align: middle;
                }
            }
        }
        // 关系题
        .noFlex{
            min-height: 250px;
            padding:0 10%;
            margin-top: 60px;
            label{
                display:inline-block;
                img{
                    width: 120px;
                    display: block;
                    margin-bottom: 10px;
                    margin: auto;
                }
                width: 33.3%;
                margin-bottom: 20px;
                text-align: center;
                input{
                    vertical-align: middle;
                }
            }
        }
        .addBtn{
            width: 90px;
            height: 90px;
            border-radius: 50%;
            border:solid 2px #999;
            margin:30px auto;
            font-size: 50px;
            color: #999;
            text-align: center;
            line-height: 90px;
        }
        .lineButton{
            margin-bottom: 100px;
            .nextstep{
                width: 270px;
                height: 80px;
                border-radius: 100px;		
                background: #9966FF;
                color: #fff;	
                text-align: center;	
                border: 0;
                display: block;
                margin:80px auto 0;
            }
        }
        /* 进度条css */
        .front_btn{
            margin-top: 10px;
            .button{
                position: relative;
                .sapn_jd{
                    color: #999;
                    display: block;
                    width: auto;
                    text-align: center;
                    position: absolute;
                    left: 0;
                    right: 0;
                    margin: auto;
                }
                .goFront{
                    margin-left: 20px;
                    position: relative;
                    z-index: 20;
                }
            }
            &>p{
                display: inline-block;
                height: 20px;
                background: #ccc;
                border-radius: 20px;
                position: relative;
                width:90%;
                margin: 20px;
                span{
                    display: inline-block;
                    height: 20px;
                    background: #007AFF;
                    border-radius: 20px;
                    position: absolute;
                    left: 0;
                    top: 0;
                }
            }
            input{
                margin-left: 8px;
                font-size: 28px;
                border: 0;
                float: left;
                background: none;
            }
        }
    }
    .alert_box {
        padding:20px;
        ul{
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            align-content: flex-start;
            text-align: center;
            margin-top: 10px;
            input{
                vertical-align: middle;
            }
            li{
                list-style: none;
                flex: 0 0 50%;
                height: 200px;
                box-sizing: border-box;
                margin-bottom:30px;
                img{
                    width: 140px;
                    height: 140px;
                    margin-bottom: 10px;
                }
            }
        }
    }
</style>