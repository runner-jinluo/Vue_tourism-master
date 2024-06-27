<template>
  <div id="select_option">
    <h1>筛选条件</h1>
    <el-form :model="selectform"  ref="myForm" label-width="120px">
      <el-form-item>
        <a class="glass light btn register-btn" @click="goToSavedSearchPage">景点选择</a>
      </el-form-item>
      <div class="centered-checkbox">
        <h3> <el-form-item label="性别：">
          <el-checkbox :checked="selectedSex[0]==1"  @change="handleSelection(0,0)">男</el-checkbox>
          <el-checkbox :checked="selectedSex[1]==1"  @change="handleSelection(0,1)">女</el-checkbox>
        </el-form-item></h3>
        </div>

      <div class="centered-checkbox">
          <h3> <el-form-item label="年龄段：">
            <el-checkbox :checked="selectedAge[0]==1"  @change="handleSelection(1,0)">青年</el-checkbox>
            <el-checkbox :checked="selectedAge[1]==1"  @change="handleSelection(1,1)">中年</el-checkbox>
            <el-checkbox :checked="selectedAge[2]==1"  @change="handleSelection(1,2)">老年</el-checkbox>
          </el-form-item></h3>
       </div>

      <div class="centered-checkbox">
        <h3> <el-form-item label="旅游爱好：">

          <el-checkbox :checked="selectedInterest[0]==1"  @change="handleSelection(2,0)">徒步旅行</el-checkbox>
          <el-checkbox :checked="selectedInterest[1]==1" @change="handleSelection(2,1)">文化探索</el-checkbox>
          <el-checkbox :checked="selectedInterest[2]==1" @change="handleSelection(2,2)">美食之旅</el-checkbox>
          <el-checkbox :checked="selectedInterest[3]==1" @change="handleSelection(2,3)">冒险运动</el-checkbox>
          <el-checkbox :checked="selectedInterest[4]==1" @change="handleSelection(2,4)">海滩度假</el-checkbox>
          <el-checkbox :checked="selectedInterest[5]==1" @change="handleSelection(2,5)">城市探险</el-checkbox>
          <el-checkbox :checked="selectedInterest[6]==1" @change="handleSelection(2,6)">自驾游</el-checkbox>
          <el-checkbox :checked="selectedInterest[7]==1" @change="handleSelection(2,7)">摄影</el-checkbox>

        </el-form-item></h3>
      </div>

      <!-- 保存按钮 -->

      <div class="centered-checkbox">
      <h3> <el-form-item label="时间：">
        <el-checkbox :checked="selectedDays[0]==1"  @change="handleSelection(3,0)">周一</el-checkbox>
        <el-checkbox :checked="selectedDays[1]==1"  @change="handleSelection(3,1)">周二</el-checkbox>
        <el-checkbox :checked="selectedDays[2]==1"  @change="handleSelection(3,2)">周三</el-checkbox>
        <el-checkbox :checked="selectedDays[3]==1"  @change="handleSelection(3,3)">周四</el-checkbox>
        <el-checkbox :checked="selectedDays[4]==1"  @change="handleSelection(3,4)">周五</el-checkbox>
        <el-checkbox :checked="selectedDays[5]==1"  @change="handleSelection(3,5)">周六</el-checkbox>
        <el-checkbox :checked="selectedDays[6]==1"  @change="handleSelection(3,6)">周日</el-checkbox>
      </el-form-item></h3>
      </div>

      <div class="centered-checkbox">
      <h3> <el-form-item label="门票：">
        <el-checkbox :checked="selectedTickets[0]==1"  @change="handleSelection(4,0)">有</el-checkbox>
        <el-checkbox :checked="selectedTickets[1]==1"  @change="handleSelection(4,1)">无</el-checkbox>
      </el-form-item></h3>
      </div>
      <!-- 保存按钮 -->
      <el-form-item>
        <a class="glass light btn register-btn" @click="saveForm">保存</a>
      </el-form-item>
<!--
      <p>test：{{ this.selectedSex}}</p>
      <p>test：{{ selectform.sex }}</p>
-->

      </el-form>







  </div>
</template>

<script>
import api from "../../services/api_user";
export default {

  data() {
    return {
      selectform: {
        email: '',
        sex: '', // 性别
        age: '', // 年龄段
        interest: '',
        days:'',
       tickets:'',
      },
      selectedSex:new Array(2).fill(0),
      selectedAge:new Array(3).fill(0),
      selectedInterest:new Array(8).fill(0),
      selectedDays:new Array(7).fill(0),
      selectedTickets:new Array(2).fill(0),
    }
  },
  methods: {
    handleSelection(option,index) {
      if(option== 0){

        this.selectedSex[index] = '1'; // 设置为选中状态

      }
      else  if(option== 1){

          this.selectedAge[index] = '1'; // 设置为选中状态

      }
      else  if(option== 2){

          this.selectedInterest[index] = '1'; // 设置为选中状态

       }
      else  if(option== 3){
          this.selectedDays[index] = '1'; // 设置为选中状态


        }
      else  if(option== 4){

          this.selectedTickets[index] = '1'; // 设置为选中状态

        }
    },
    goToSavedSearchPage() {
        this.$router.push({ name: 'Query' });
      },
    saveForm() {

      this.selectform.email=$.cookie('userid');
      this.selectform.sex = this.selectedSex.join("");
      this.selectform.age = this.selectedAge.join("");
      this.selectform.interest = this.selectedInterest.join("");
      this.selectform.days = this.selectedDays.join("");
      this.selectform.tickets = this.selectedTickets.join("");
      this.$refs['myForm'].validate(valid => {
        if (valid) {
          api.saveuserinfo(this.selectform, function (res) {
          /*api.selectoption(this.selectform, function (res) {*/
            if (res.status == 'y') {
              this.$message.success("用户设置成功")

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
      this.$router.push({ name: 'Function' });
    }
  }
}
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
