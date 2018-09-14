<template>
    <form class="login_from">
        <input type="text" placeholder="请输入账号" v-model="local.user">
        <input type="password" placeholder="请输入密码" v-model="local.pass">
        <button type="#" @click="login">登录</button>
    </form>
</template>
<script>
    import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
    export default {
        data() {
            return {
                local: {
                    user: '',
                    pass: ''
                }
            }
        }, methods : {
            login(){
                console.log(this.local.user,this.local.pass)
                if(this.local.user === '1602E' && this.local.pass === '1602E'){
                    window.localStorage.setItem('login','true')
                    window.history.back()
                }
            }
         },
    }
</script>
<style>
     * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-size: .14rem;
    }

    html,
    body {
        width: 100%;
        height: 100%;
    }

    html {
        font-size: 625%;
    }
    a {
        color: #000;
        text-decoration: none;
    }
    .login_from {
        display: flex;
        flex-direction: column;
    }

    .login_from input {
        width: 80%;
        height: .4rem;
        margin: .15rem 0 .15rem 10%;
        outline: none;
        padding-left: .1rem;
        border: 1px solid rgb(134, 134, 134);
    }

    .login_from button {
        width: 60%;
        margin-left: 20%;
        padding: .1rem 0;
    }
</style>