<template>
  <div id="personal-info">
    <h1>个人主页</h1>
    <div v-if="showSavedData">

      <div>
        <p>性别：{{ formData.sex }}</p>
        <p>年龄：{{ formData.age }}</p>
        <p>姓名：{{ formData.name }}</p>
        <p>联系方式：{{ formData.phoneNumber }}</p>
        <p>旅游爱好：{{ (interest1[0]==1)? hobbies[0]: null}} {{ (interest1[1]==1)? hobbies[1]: null}} {{ (interest1[2]==1)? hobbies[2]: null}} {{ (interest1[3]==1)? hobbies[3]: null}} {{ (interest1[4]==1)? hobbies[4]: null}} {{ (interest1[5]==1)? hobbies[5]: null}} {{ (interest1[6]==1)? hobbies[6]: null}} {{ (interest1[7]==1)? hobbies[7]: null}}</p>
<!--
        <p>test：{{ interest1 }}</p>
        <p>test：{{ formData.interest }}</p>
-->
      </div>
      <a class="glass light btn register-btn" @click="modify()">去修改</a>
    </div>
      <div v-if="!showSavedData">
        <el-form :model="formData" :rules="rules" ref="myForm" label-width="120px">

          <el-form-item label="性别">
            <el-radio v-model="formData.sex" label="男">男</el-radio>
            <el-radio v-model="formData.sex" label="女">女</el-radio>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input input class="my-input" v-model="formData.age"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input input class="my-input" v-model="formData.name"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" prop="contact">
            <el-input input class="my-input" v-model="formData.phoneNumber" type="number"></el-input>
          </el-form-item>


          <div class="centered-checkbox">
          <el-form-item label="旅游爱好">
<!--            <el-checkbox-group v-model="formData.interest">-->
              <el-checkbox :checked="selectedInterest[0]==true"  @change="handleInterestSelection(0)">徒步旅行</el-checkbox>
              <el-checkbox :checked="selectedInterest[1]==true" @change="handleInterestSelection(1)">文化探索</el-checkbox>
              <el-checkbox :checked="selectedInterest[2]==true" @change="handleInterestSelection(2)">美食之旅</el-checkbox>
              <el-checkbox :checked="selectedInterest[3]==true" @change="handleInterestSelection(3)">冒险运动</el-checkbox>
              <el-checkbox :checked="selectedInterest[4]==true" @change="handleInterestSelection(4)">海滩度假</el-checkbox>
              <el-checkbox :checked="selectedInterest[5]==true" @change="handleInterestSelection(5)">城市探险</el-checkbox>
              <el-checkbox :checked="selectedInterest[6]==true" @change="handleInterestSelection(6)">自驾游</el-checkbox>
              <el-checkbox :checked="selectedInterest[7]==true" @change="handleInterestSelection(7)">摄影</el-checkbox>
<!--            </el-checkbox-group>-->
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
        email: '',
        sex: '', // 性别
        age: '', // 年龄段
        name: '', // 姓名
        phoneNumber: '',// 联系方式
        interest: '',
      },
      interest1: new Array(8).fill(0),
      selectedInterest:new Array(8).fill(false),
      hobbies : ['徒步旅行', '文化探索', '美食之旅', '冒险运动', '海滩度假', '城市探险', '自驾游', '摄影'],
      showSavedData: true ,// 控制显示之前输入的数据
      rules: {
        contact: [
          /*{ required: true, message: '请输入联系方式', trigger: 'blur' },*/
          { min: 11, max: 11, message: '联系方式必须是11位', trigger: 'blur' }
        ]
      }
    };
  },

  created() {

    if($.cookie('userid')){
      this.fetchSavedData(); // 调用你的初始化方法

    }

  },
  methods: {

    fetchSavedData:function(){

      api.getuserinfo($.cookie('userid'), function (res){

        this.formData.email= res.email
        this.formData.sex= res.sex
        this.formData.age= res.age
        this.formData.name= res.name
        this.formData.phoneNumber= res.phoneNumber
        this.interest1 = res.interest.split("");
        for (var i = 0; i <  this.interest1.length; i++) {
          if(this.interest1[i]=='1')
          {
            this.selectedInterest[i]=true;
          }
          else{
            this.selectedInterest[i]=false;
          }
        }
      }.bind(this))

    },
    saveForm: function () {
      this.showSavedData=true;
      this.formData.interest = this.interest1.join("");
      this.formData.email=$.cookie('userid');
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
    handleInterestSelection(index) {
      if(this.interest1[index] == '0')
      {
        this.interest1[index] = '1'; // 设置为选中状态
        this.selectedInterest[index]=true;
      }
       else
        {
          this.interest1[index] = '0';
          this.selectedInterest[index]=false;
      }
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
  margin-top: 5px; /* 调整上边距 */
  margin-bottom: 5px; /* 调整下边距 */
}


input.el-input__inner {
  border: none !important;
}

a.btn {
  margin: 0 auto;
  display: inline-block;
  width: 200px;
  height: 50px;
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
  max-height: 75px;

}
a.btn:active {
  position: relative;
  top: 0px;
  background-color: aquamarine;
}
.my-input {
  width: 200px; /* 设置宽度，根据你的需求调整 */
  height: 30px; /* 设置高度，根据你的需求调整 */
}
</style>
