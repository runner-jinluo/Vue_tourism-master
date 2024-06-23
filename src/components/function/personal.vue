<template>
    <div id="personal-info">
      <h1>个人主页</h1>

      <!-- 单选项 -->
      <div>
        <h3>性别：</h3>
        <input type="radio" id="male" name="gender" value="male">
        <label for="male">男</label>
        <input type="radio" id="female" name="gender" value="female">
        <label for="female">女</label>
      </div>

      <div>
        <h3>年龄段：</h3>
        <input type="radio" id="young" name="age" value="young">
        <label for="young">青年</label>
        <input type="radio" id="middle" name="age" value="middle">
        <label for="middle">中年</label>
        <input type="radio" id="old" name="age" value="old">
        <label for="old">老年</label>
      </div>

      <!-- 填空项 -->
      <div>
        <h3>姓名：</h3>
        <input type="text" v-model="name">
      </div>

      <div>
        <h3>联系方式：</h3>
        <input type="text" v-model="contact">
      </div>

      <!-- 多选项 -->
      <div>
        <h3>旅游爱好：</h3>
            <input type="checkbox" id="hiking" value="hiking">
            <label for="hiking">徒步旅行</label>
            <input type="checkbox" id="culture" value="culture">
            <label for="culture">文化探索</label>
            <input type="checkbox" id="food" value="food">
            <label for="food">美食之旅</label>
            <input type="checkbox" id="adventure" value="adventure">
            <label for="adventure">冒险运动</label>
            <input type="checkbox" id="beach" value="beach">
            <label for="beach">海滩度假</label>
            <input type="checkbox" id="urban" value="urban">
            <label for="urban">城市探险</label>
            <input type="checkbox" id="self-drive" value="self-drive">
            <label for="self-drive">自驾游</label>
            <input type="checkbox" id="photography" value="photography">
            <label for="photography">摄影</label>

        <!-- 保存按钮 -->
        <button @click="saveInfo">保存</button>
      </div>
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

  <style>
    /* 添加样式，使界面看起来更美观 */
    /* 可以按照自己的需求添加样式 */
  </style>
