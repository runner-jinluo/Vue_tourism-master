<template>
  <div id="personal-info">
    <h1>个人主页</h1>
    <div v-if="showSavedData">

      <div>
        <p>性别：{{ formData.gender }}</p>
        <p>年龄：{{ formData.age }}</p>
        <p>姓名：{{ formData.name }}</p>
        <p>联系方式：{{ formData.contact }}</p>
        <p>旅游爱好：{{ formData.hobbies}}</p>
        <!-- 其他表单字段... -->
      </div>
      <a class="glass light btn register-btn" @click="modify()">去修改</a>
    </div>
      <div v-if="!showSavedData">
        <el-form :model="formData" :rules="rules" ref="myForm" label-width="120px">
          <el-form-item label="性别">
            <el-radio v-model="formData.gender" label="male">男</el-radio>
            <el-radio v-model="formData.gender" label="female">女</el-radio>
          </el-form-item>
          <el-form-item label="年龄段">
            <el-radio v-model="formData.age" label="young">青年</el-radio>
            <el-radio v-model="formData.age" label="middle">中年</el-radio>
            <el-radio v-model="formData.age" label="old">老年</el-radio>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="formData.name"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" prop="contact">
            <el-input v-model="formData.contact"></el-input>
          </el-form-item>
          <div class="centered-checkbox">
          <el-form-item label="旅游爱好">

            <el-checkbox-group v-model="formData.hobbies">
              <el-checkbox label="hiking">徒步旅行</el-checkbox>
              <el-checkbox label="culture">文化探索</el-checkbox>
              <el-checkbox label="food">美食之旅</el-checkbox>
              <el-checkbox label="adventure">冒险运动</el-checkbox>
              <el-checkbox label="beach">海滩度假</el-checkbox>
              <el-checkbox label="urban">城市探险</el-checkbox>
              <el-checkbox label="self-drive">自驾游</el-checkbox>
              <el-checkbox label="photography">摄影</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          </div>
          <el-form-item>
            <a class="glass light btn register-btn" @click="saveForm">保存</a>
          </el-form-item>
        </el-form>
      </div>

  </div>

</template>


<script>
import api from "../../services/api_user";

export default {
  data() {
    return {
      formData: {
        gender: '', // 性别
        age: '', // 年龄段
        name: '', // 姓名
        contact: '',// 联系方式
        hobbies: [] // 存储选中的爱好
      },
      showSavedData: true ,// 控制显示之前输入的数据
      rules: {
        contact: [
          /*{ required: true, message: '请输入联系方式', trigger: 'blur' },*/
          { min: 11, max: 11, message: '联系方式必须是11位', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    saveForm: function () {
      this.showSavedData=true;
      this.$refs['myForm'].validate(valid => {
        if (valid) {
          api.saveuserinfo(this.formData, function (res) {
            if (res.status == 'y') {
              this.$message.success("用户修改成功")
              this.$router.push({ name: 'Function' })
            }
            else {
              this.$message.error(res.msg)
            }
          }.bind(this))
        }
        else {
          console.log('validate error!')
        }
      })
    },
    created() {
      if($.cookie('userid')){
        this.fetchSavedData(); // 调用你的初始化方法
      }
      if(this.formData)
      this.showSavedData = true;
    },
    fetchSavedData:function(){
      api.getuserinfo($.cookie('userid'), function (data){
       this.formData= data.data
      }.bind(this))

    },
    modify:function(){
      this.showSavedData=false;
    },
  }
};
</script>

<style scoped>
h1 {
  text-align: center;
  margin-top: 100px;
  margin-bottom: 40px;
}

.myForm {
  width: 50%;
  margin: 0 auto;
}


input.el-input__inner {
  border: none !important;
}

a.btn {
  margin: 0 auto;
  display: inline-block;
  width: 200px;
  height: 60px;
  color: #666;
  border-radius: 15px;
  text-align: center;
  line-height: 60px;
  font-size: 24px;
  justify-content: space-between;
}
.centered-checkbox {
  display: flex;
  align-items: center;
}
a.btn:active {
  position: relative;
  top: 10px;
  background-color: aquamarine;
}

</style>
