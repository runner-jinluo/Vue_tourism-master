<template>
    <div id="home">
        <h1>旅游路线规划系统</h1>
        <div class="glass" @click="goToQuery">
            <dt>查询景点</dt>
            <dd>用户通过查询景点,可以将有意向取得旅游地添加到景点收集集合</dd>
        </div>
        <div class="glass" @click="goToPlan">
            <dt>规划路线</dt>
            <dd>此功能是系统的核心功能,作用是在用户选择多个景点的情况下,为用户进行路线规划的系统</dd>
        </div>
        <div class="glass" @click="goToSelectoption">
            <dt>推荐队友</dt>
            <dd>根据喜好完成队友的推荐，并且展示出来</dd>
        </div>
      <a class="glass btn light " @click="isLogin ? logout():goToLogin() ">{{ isLogin ? '登出' : '去登录' }}
      </a>

    </div>
</template>
<script>
import api from '../services/api_user'
export default {
  name: 'app',
  data(){
    return {
      isLogin:false
    }
  },
  watch:{//监控路由
    $route:function(){
      if($.cookie('userid') && $.cookie('userid') != ''){
        this.isLogin = true;
      }
      else{
        this.isLogin = false;
      }

      $('a[href="#'+this.$router.currentRoute.fullPath+'"]').parent().addClass('active')
        .siblings().removeClass('active')
    }
  },
  created(){
    // console.log($.cookie('userid'))
    if($.cookie('userid')){
      this.isLogin = true;
    }
  },



  methods:{
    goToLogin() {
      // 前往登录页面
      console.log('前往登录页面');
      // 在这里执行跳转逻辑，例如使用路由导航
       this.$router.push('/login');
    },
    goToSelectoption() {
      // 前往登录页面
      console.log('队友选择');
      // 在这里执行跳转逻辑，例如使用路由导航
      this.$router.push('/Selectoption');
    },
    goToQuery() {
      // 前往登录页面
      console.log('前往登录页面');
      // 在这里执行跳转逻辑，例如使用路由导航
      this.$router.push('/query');
    },
    goToPlan() {
      // 前往登录页面
      console.log('前往登录页面');
      // 在这里执行跳转逻辑，例如使用路由导航
      this.$router.push('/plan');
    },
    logout:function(){
      $.cookie('userid','',{path:'/',expires:-1})
      this.$router.push({name:'Login'})
      this.$message.success("用户退出登录")
    }
  }
}
</script>
<style scoped>
h1{
    text-align: center;
}
#home div{
    margin-top:50px;
    /*background-color:white;*/
    padding:24px;

}
dt{
    font-size: 24px;
}
dd{
    font-size: 20px;
}
a.btn{
    float: right;
    margin-top:50px;
    display: block;
    width: 160px;
    height: 50px;
    color:#666;
    border-radius: 15px;
    text-align: center;
    line-height: 50px;
}
a.btn:active{
    position:relative;
    top:10px;
    background-color:aquamarine;
}

</style>
