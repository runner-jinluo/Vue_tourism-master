<template>
  <div id="select_option">
    <h1>筛选条件</h1>
    <el-form :model="formData"  ref="myForm" label-width="120px">
      <el-form-item>
        <a class="glass light btn register-btn" @click="goToSavedSearchPage">景点选择</a>
      </el-form-item>
      <div class="centered-checkbox">
        <h3> <el-form-item label="性别：">
      <el-checkbox-group v-model="formData.sex">
        <el-checkbox label="男">男</el-checkbox>
        <el-checkbox label="女">女</el-checkbox>
      </el-checkbox-group>
        </el-form-item></h3>
        </div>

      <div class="centered-checkbox">
          <h3> <el-form-item label="年龄段：">
        <el-checkbox-group v-model="formData.age">
          <el-checkbox label="young">青年</el-checkbox>
          <el-checkbox label="middle">中年</el-checkbox>
          <el-checkbox label="old">老年</el-checkbox>
        </el-checkbox-group>
          </el-form-item></h3>
       </div>

      <div class="centered-checkbox">
        <h3> <el-form-item label="旅游爱好：">

          <el-checkbox :checked="selectedInterest[0]==true"  @change="handleInterestSelection(0)">徒步旅行</el-checkbox>
          <el-checkbox :checked="selectedInterest[1]==true" @change="handleInterestSelection(1)">文化探索</el-checkbox>
          <el-checkbox :checked="selectedInterest[2]==true" @change="handleInterestSelection(2)">美食之旅</el-checkbox>
          <el-checkbox :checked="selectedInterest[3]==true" @change="handleInterestSelection(3)">冒险运动</el-checkbox>
          <el-checkbox :checked="selectedInterest[4]==true" @change="handleInterestSelection(4)">海滩度假</el-checkbox>
          <el-checkbox :checked="selectedInterest[5]==true" @change="handleInterestSelection(5)">城市探险</el-checkbox>
          <el-checkbox :checked="selectedInterest[6]==true" @change="handleInterestSelection(6)">自驾游</el-checkbox>
          <el-checkbox :checked="selectedInterest[7]==true" @change="handleInterestSelection(7)">摄影</el-checkbox>

        </el-form-item></h3>
      </div>

      <!-- 保存按钮 -->

      <div class="centered-checkbox">
      <h3> <el-form-item label="时间：">
      <el-checkbox-group v-model="formData.selectedDays">
        <el-checkbox label="Monday">周一</el-checkbox>
        <el-checkbox label="Tuesday">周二</el-checkbox>
        <el-checkbox label="Wednesday">周三</el-checkbox>
        <el-checkbox label="Thursday">周四</el-checkbox>
        <el-checkbox label="Friday">周五</el-checkbox>
        <el-checkbox label="Saturday">周六</el-checkbox>
        <el-checkbox label="Sunday">周日</el-checkbox>
      </el-checkbox-group>
      </el-form-item></h3>
      </div>

      <div class="centered-checkbox">
      <h3> <el-form-item label="门票：">
      <el-checkbox-group v-model="formData.selectedTickets">
        <el-checkbox label="yes">有</el-checkbox>
        <el-checkbox label="no">无</el-checkbox>
      </el-checkbox-group>
      </el-form-item></h3>
      </div>
      <!-- 保存按钮 -->
      <el-form-item>
        <a class="glass light btn register-btn" @click="saveForm">保存</a>
      </el-form-item>


      </el-form>





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
        interest: '',
        selectedDays:'',
        selectedTickets:'',
      },
      interest1: new Array(8).fill(0),
      selectedInterest:new Array(8).fill(false),

    }
  },
  methods: {
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
    goToSavedSearchPage() {
        this.$router.push({ name: 'Query' });
      },
    saveInfo() {
      // 这里可以添加保存信息的代码，例如保存用户的选择
    }
  }
}
</script>



<style scoped>
h1 {
  text-align: center;
  margin-top: 40px; /* 调整上边距 */
  margin-bottom: 20px; /* 调整下边距 */
}

input.el-input__inner {
  border: none !important;
}

a.btn {
  margin: 0 auto;
  display: inline-block;
  width: 150px;
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
  max-height: 75px;
}
a.btn:active {
  position: relative;
  top: 10px;
  background-color: aquamarine;
}

</style>
