<template>
    <div id="login">
        <el-card class="loginCard" shadow="hover">
            <div slot="header" class="title">电梯物联网系统</div>
            <div class="body">
                <el-input placeholder="请输入用户名" prefix-icon = "el-icon-user-solid" v-model="userName"></el-input>
                <br /><br />
                <el-input placeholder="请输入密码" prefix-icon="el-icon-lock" v-model="password" show-password></el-input>
                <br /><br />
                <el-button type="primary" icon="el-icon-s-promotion" @click = "submit()">登录</el-button>
            </div>
        </el-card>
    </div>
</template>

<script>
import {_login} from '@/network/api/apiUser.js'
import HelloWorld from "@/components/mqtt/HelloWorld";
export default {
    name: "login",
    data(){
        return{
            userName:'',
            password:''
        }
    },
    components:{
        HelloWorld
    },
    methods: {
        submit() {
            _login(this.userName,this.password).then(res =>{
                if(res.data.code === 200){
                    localStorage.setItem("Authorization",res.data.data.Authorization)
                    localStorage.setItem("userId",res.data.data.userId)
                    this.$router.replace('/afterLogin')
                }
                else{
                    this.$message({
                        message:res.data.message,
                        type:'warning'
                    })
                }
            })
        }
    }
}
</script>

<style scoped>
#login {
    height: 100vh;
    background-image: url("/src/assets/image/loginBackground.svg");
}

.loginCard {
    width: 30rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.title {
    text-align: center;
    color: var(--colorActive-theme);
    font-size: 1.6rem;
    font-weight: 900;
}
.body{
    width: 70%;
    margin: 0 auto;
    text-align: center;
}
</style>