<template>
  <div id="personal-info">
    <h1>个人主页</h1>

    <!-- 单选项 -->
    <div class="form-group inline-group">
      <h3>性别：</h3>
      <label class="radio-inline">
        <input type="radio" name="gender" value="male"> 男
      </label>
      <label class="radio-inline">
        <input type="radio" name="gender" value="female"> 女
      </label>
    </div>

    <div class="form-group inline-group">
      <h3>年龄段：</h3>
      <label class="radio-inline">
        <input type="radio" name="age" value="young"> 青年
      </label>
      <label class="radio-inline">
        <input type="radio" name="age" value="middle"> 中年
      </label>
      <label class="radio-inline">
        <input type="radio" name="age" value="old"> 老年
      </label>
    </div>

    <!-- 填空项 -->
    <div class="form-group inline-group">
      <h3>姓名：</h3>
      <input type="text" v-model="name">
    </div>

    <div class="form-group inline-group">
      <h3>联系方式：</h3>
      <input type="text" v-model="contact">
    </div>

    <!-- 多选项 -->
    <div class="form-group inline-group">
      <h3>旅游爱好：</h3>
      <label class="checkbox-inline">
        <input type="checkbox" value="hiking"> 徒步旅行
      </label>
      <label class="checkbox-inline">
        <input type="checkbox" value="culture"> 文化探索
      </label>
      <label class="checkbox-inline">
        <input type="checkbox" value="food"> 美食之旅
      </label>
      <label class="checkbox-inline">
        <input type="checkbox" value="adventure"> 冒险运动
      </label>
      <label class="checkbox-inline">
        <input type="checkbox" value="beach"> 海滩度假
      </label>
      <label class="checkbox-inline">
        <input type="checkbox" value="urban"> 城市探险
      </label>
      <label class="checkbox-inline">
        <input type="checkbox" value="self-drive"> 自驾游
      </label>
      <label class="checkbox-inline">
        <input type="checkbox" value="photography"> 摄影
      </label>
    </div>

    <!-- 保存按钮 -->
    <button @click="saveInfo">保存</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      contact: ""
    };
  },
  methods: {
    saveInfo() {
      // 在这里处理保存用户信息的逻辑，可以将填写的信息提交到后端或者进行其他操作
      console.log("保存用户信息");
    }
  }
};
</script>

<style scoped>
/* scoped 样式，只在本组件内生效 */
.form-group {
  margin-bottom: 15px;
}

.inline-group {
  display: flex;
  align-items: center;
}

.radio-inline, .checkbox-inline {
  margin-right: 20px;
}
</style>
