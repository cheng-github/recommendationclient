<template>
<div class="login" id="login" element-loading-text="登录中..." v-loading="isLoging"  
element-loading-background="rgba(0, 0, 0, 0.6)">
    <a v-if="isLoginShow" class="log-close reg-btn" @click="changeOption">注册</a>
    <a v-else class="log-close reg-btn" @click="changeOption">登录</a>
    <div class="log-bg">
        <div class="log-cloud cloud1"></div>
        <div class="log-cloud cloud2"></div>
        <div class="log-cloud cloud3"></div>
        <div class="log-cloud cloud4"></div>
        
        <div v-if="isLoginShow" class="log-logo">登录</div>
        <div v-else class="log-logo">注册</div>
    </div>
    <div class="log-email">
        <input type="text" placeholder="用户名" :class="'log-input' + (username==''?' log-input-empty':'')" v-model="username">
        <input type="password" placeholder="密码" :class="'log-input' + (password==''?' log-input-empty':'')"  v-model="password">
        <input v-show="!isLoginShow" type="password" placeholder="再次输入密码" :class="'log-input' + (passwordRepeat==''?' log-input-empty':'')"  v-model="passwordRepeat">
        <a v-if="isLoginShow" href="javascript:;" class="log-btn" @click="login">登录</a>
        <a v-else href="javascript:;" class="log-btn" @click="register">注册</a>
    </div>
   
</div>
</template>

<script>
// import { Message } from 'element-ui';
import Vue from 'vue'
import axios from 'axios';
const md5 = require('md5');
import { Loading } from 'element-ui'
import { setTimeout } from 'timers';


Vue.use(Loading.directive);
// Vue.prototype.$loading = Loading.service;

export default {
    name: 'Login',
    data(){
        return {
            isLoging: false,
            isLoginShow: true,
            username: '',
            password: '',
            passwordRepeat: '',
            loginResult: false
        }
    },
    components:{
        
    },
    methods:{
        //登录逻辑
        login(){
            if(this.username!='' && this.password!=''){
                this.toLogin();
            }else{
                this.openMessage("waring","用户名和密码不能为空");
            }
        },
        
        // 注册应该替换掉现有的组件为注册
        register(){
            var reg = /[a-zA-Z0-9]{7,}[a-zA-Z0-9]$/;
            var isValid = true;
            if( !(this.passwordRepeat === this.password) || !this.username || !this.password ){
                this.openMessage('warning', '请输入合法的用户名和密码');
                isValid = false;
            }
            else if( this.username.length < 8 || this.password.length < 8 ){
                this.openMessage('warning', '用户名密码长度不能小于八位');
                isValid = false;
            }
            else if(!this.username.match(reg) || !this.password.match(reg)){
                this.openMessage('warning', '用户名密码必须由数字和字母组成');
                isValid = false;
            }
            // 如果验证通过那么进行注册请求调用
            if(isValid){
                this.toRegister()
            }   
        },

        // 注册请求
        toRegister(){
            // axios内部无法使用this
            // let self = this;
            axios.post('/portal/register.do', {
                username: this.username,
                password: md5(md5(this.password))
            })
            .then(response => {
                // 本身就是对象，自动为我们做了转化
                return response.data
            })
            .then(result => {
                if( result.code == 1){
                    this.openMessage("success", "注册成功")
                    this.changeOption()
                }else{
                    this.openMessage("error", "注册失败，用户名已存在")
                }
            })
            .catch(error => {
                this.openMessage("error", "出现异常，请联系管理员")
            });
        },

        //登录请求
        toLogin(){
            let password_sha = md5(md5(this.password));

            // 需要向后端发送的登录参数
            let loginParam = {
                username: this.username,
                password: password_sha
            }

            //设置在登录状态，延迟返回数据显示动态组件
            this.isLoging = true;
            
            // 获取当前的JSESSIONCOOKIE值并设置到axios里去
            // 对于这种进行验证身份的Cookie，是属于httponly的，就是不能够被
            // js脚本读取的，只能够使用在http请求里。
            // axios默认是对于同一个域的请求带上cookie的，要求是这个cookie在它的请求的url下
            axios.post("/portal/login.do", loginParam)
            .then(response => 
                new Promise(resolve => setTimeout(() => {
                    this.isLoging = false
                    resolve(response.data)
                }, 1000)))
            .then(result => {
                if(result.code == 1){
                    this.openMessage("success", result.msg);
                    return new Promise(resolve => setTimeout(() => { 
                        this.loginResult = true;
                        resolve(); 
                    }, 1000))
                }else {
                    this.openMessage("error", result.msg);
                }
            })
            .catch(error => {
                this.isLoging = false
                this.openMessage("error", "登录出现问题，请检查程序")
            })
            .finally(() => {
                if(this.loginResult){
                    // 跳转到新闻界面，不使用replace试试，不知道为啥不可以用replace，
                    // 反正我使用replace就要登录两次...可能replace会将上次的请求刷掉？
                    window.location.href = "/news.do"
                } 
            });

            
        },

        changeOption(){
            this.isLoginShow = !this.isLoginShow;
        },

        //   展示消息框
        openMessage(typ,msg){
            this.$message({
            showClose: true,
            message: msg,
            center: true,
            type: typ
            });
        }
    }
}
</script>



<style scoped>
.login{position: fixed; overflow: hidden;left: 50%; margin-left: -250px; top:50%; margin-top: -350px; width: 500px; min-height: 555px; z-index: 10; right: 140px; background: #fff;-webkit-border-radius: 5px;
-moz-border-radius: 5px;
-ms-border-radius: 5px;
-o-border-radius: 5px;
border-radius: 5px; -webkit-box-shadow:  0px 3px 16px -5px #070707; box-shadow:  0px 3px 16px -5px #070707}

.log-close{display: block; position: absolute; top:12px; right: 12px; opacity: 1;}
.log-close:hover .icons{transform: rotate(180deg);}
.log-close .icons{opacity: 1; transition: all .3s}
.log-cloud{background-image: url(../images/login-cloud.png); width: 63px ;height: 40px; position: absolute; z-index: 1}
.login .cloud1{top:21px; left: -30px; transform: scale(.6); animation: cloud1 20s linear infinite;}
.login .cloud2{top:87px; right: 20px; animation: cloud2 19s linear infinite;}
.login .cloud3{top:160px; left: 5px;transform: scale(.8);animation: cloud3 21s linear infinite;}
.login .cloud4{top:150px; left: -40px;transform: scale(.4);animation: cloud4 19s linear infinite;}
.log-bg{background: #0A0A0A; width: 100%; height: 312px; overflow: hidden;}
.log-logo{height: 80px; margin: 120px auto 25px; text-align: center; color: #36648B; font-weight: bold; font-size: 40px;}
.log-logo,.log-text{z-index: 2}
.icons{background:url(../images/icons.png) no-repeat; display: inline-block;}
.close{height:16px;width:16px;background-position:-13px 0;}
.login-email{height:17px;width:29px;background-position:-117px 0;}

.log-btns{padding: 15px 0; margin: 0 auto;}
.log-btn{width:402px; display: block; text-align: left; line-height: 50px;margin:0 auto 15px; height:50px; color:#fff; font-size:13px;-webkit-border-radius: 5px; background-color: #5C5C5C;
-moz-border-radius: 5px;
-ms-border-radius: 5px;
-o-border-radius: 5px;
border-radius: 5px;
position: relative;}
.log-btn:hover,.log-btn:focus{color: #fff; opacity: .8;}

.log-email{text-align: center; margin-top: 20px;}
.log-email .log-btn{background-color:#4876FF; text-align: center;}

.log-input-empty{border: 1px solid #74baf3 !important;}
.isloading{background: #d6d6d6}
.log-btn .icons{margin-left: 30px; vertical-align: middle;}
.log-btn .text{left: 95px; line-height: 50px; text-align: left; position: absolute;}
.log-input{width: 370px;overflow: hidden; padding: 0 15px;font-size: 13px; border: 1px solid #EBEBEB; margin:0 auto 15px; height: 48px; line-height: 48px; -webkit-border-radius: 5px;
-moz-border-radius: 5px;
-ms-border-radius: 5px;
-o-border-radius: 5px;
border-radius: 5px;}
.log-input.warn{border: 1px solid #f88787}

.reg-btn{ color: #BDB76B; text-align: center; font-size: 18px; }

 @-webkit-keyframes cloud1 {  
    0%{left: 200px}  
    100%{left:-130px;} 
}
@keyframes cloud1{
    0%{left: 200px}  
    100%{left:-130px;} 
}

 @-webkit-keyframes cloud2 {  
    0%{left:500px;}  
    100%{left:-90px;} 
}
@keyframes cloud2{
    0%{left:500px;}  
    100%{left:-90px;} 
}

@-webkit-keyframes cloud3 {  
    0%{left:620px;}  
    100%{left:-70px;} 
}
@keyframes cloud3{
    0%{left:620px;}  
    100%{left:-70px;} 
}@-webkit-keyframes cloud4 {  
    0%{left:100px;}  
    100%{left:-70px;} 
}
@keyframes cloud4{
    0%{left:100px;}  
    100%{left:-70px;} 
}

</style>