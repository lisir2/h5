<!-- 组件说明 常用联系人-->
<template>
    <div class='TopContacts'>
        <!-- <van-nav-bar title="常用联系人" left-arrow @click-left="onClickLeft" /> -->
        <van-nav-bar title="常用联系人" left-arrow @click-left="onClickLeft" :right-text="rightText" @click-right="onClickRight"/>
        <div class="personList">
            <ul v-for="(item,index) in data" :key="index">
                <li @click="editContacts(item.fcId,item)" style="position: relative;">
                    <span class="contactName">{{item.fcName}}</span>
                    <span class="relation">{{item.fcRelationship}}</span>
                    <span class="isPerfect">{{isPerfect(item)}}</span>
                    <span class="status"> <van-icon name="arrow" /> </span>
                </li>
            </ul>
            <!-- <p>暂无常用联系人信息</p> -->
        </div>
        <div class="noContacts" v-show="showContacts">
            <p>暂无常用联系信息</p>
            <router-link to="/addContacts"><button>立即添加</button></router-link>
        </div>
        <!-- <input type="button" value="立即添加" class="addBtn" @click="addNewOne"> -->
    </div>
</template>

<script>
    import { Toast } from 'vant';
    import api from '../fetch/api'
    export default {
        components: {

        },
        data () {
            return {
                data:'',
                rightText:'',
                showContacts:false,
                
            };
        },
        computed: {
           
        },
        mounted(){
            var args=this.sign({userId: this.getCookie('ZB_JUSER_Mid'),openId: this.getCookie("openId")});
            // this.$axios.post('/brg/openapi/h5/personalCenter/queryFrequentContactsList',args).then(res=>{
            api.queryFrequentContactsList(args).then(res=>{
                if(res.code == 20000){
                    this.data = res.data;
                    this.rightText = '添加';
                    this.showContacts = false;
                }else if(res.code == 20001){
                    this.rightText = '';
                    this.showContacts = true;
                }
            })
        },
        methods: {
            //用户信息是否已完善
            isPerfect(item){
                if(item.fcName !== '' && 
                item.fcCertificateType !== '' && 
                item.fcCertificateNo !== '' && 
                item.fcSex !== '' && 
                item.fcBirth !== '' && 
                item.fcPhone !== '' && 
                item.fcMailbox !== '' && 
                item.fcAddress !== '' && 
                item.fcZipCode !== '' && 
                item.fcRelationship !== '' 
                ){
                    return '已完善'
                }else{
                    return '未完善'
                }

            },
            onClickLeft() {
               this.$router.push('/mine');
            },
            addNewOne(){
                Toast('功能正在开发中');
            },
            onClickRight(){
                this.$router.push('/addContacts')
            },
            editContacts(fcId,data){
                this.setCookie('contactsMessage',JSON.stringify(data));
                this.$router.push({path:'/editContacts',query:{fcId:fcId}});
            }
        },
    }
</script>

<style lang='scss'>
.isPerfect{
    position: absolute;
    right: 75px;
    font-size:28px;
}
    .TopContacts{
        .personList::before{
            content: '';
            display: block;
            height:20px;
            background:rgba(247,247,247,1);
            border-top:2px solid rgba(221,221,221,1);
        }
        .personList{
            p{
                text-align: center;
                font-size: 30px;
                color: #0c0c0c;
                margin-top: 96px;
            }
            ul{
                li{
                    height: 100px;
                    line-height: 100px;
                    border-bottom: 1px solid #eee;
                    .relation{
                        width: 150px;
                        height: 50px;
                        border: 2px solid #008CFF;
                        color: #008CFF;
                        border-radius: 6px;
                        display: inline-block;
                        line-height: 50px;
                        text-align: center;
                        font-size: 26px;  
                        margin-left: 50px;
                    }
                    .contactName{
                        width: 100px;
                        margin-left: 32px;
                        color: #0c0c0c;
                        display: inline-block;
                    }
                    .status{
                        float: right;
                        margin-right: 30px;
                        color: #302d2d;
                    }
                    .van-icon-arrow{
                        margin-top: -2px;
                        vertical-align: middle;
                        color: #d1d1d1;
                    }
                }
            }
        }
        .noContacts{
            p{
                text-align: center;
                margin-top: 166px;
            }
            button{
                width:291px;
                height:88px;
                border: solid 2px #F99A31;
                border-radius: 44px;
                background-color: white;
                font-size:32px;
                font-weight:500;
                color:rgba(249,154,49,1);
                display: block;
                margin: 96px auto;
            }
        }
        .addBtn{
            margin: 0 auto;
            margin-top: 96px;
            display: block;
            width: 290px;
            height: 88px;
            border-radius: 50px;
            border: 2px solid #F99A31;
            background: #fff;
            color: #F99A31;
        }
    }
</style>