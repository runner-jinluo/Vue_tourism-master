<template>
  <div id="select_option">
    <h1>筛选条件</h1>

    <div>
      <input type="text" v-model="searchTerm" placeholder="请输入具体景点" @input="handleInput" />
      <button @click="saveSearch">保存搜索</button>
      <div v-if="searchTerm">
        <div v-for="result in searchResults" :key="result.id">
          {{ result.name }}
        </div>
      </div>
      <div v-if="savedSearches.length">
        <h2>保存的搜索</h2>
        <div v-for="search in savedSearches" :key="search.id">
          <h3>{{ search.term }}</h3>
          <div v-for="result in search.results" :key="result.id">
            {{ result.name }}
          </div>
        </div>
      </div>
    </div>


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
    <div>
      <h3>时间：</h3>
      <input type="checkbox" id="Monday" value="Monday">
      <label for="Monday">周一</label>
      <input type="checkbox" id="Tuesday" value="Tuesday">
      <label for="Tuesday">周二</label>
      <input type="checkbox" id="Wednesday" value="Wednesday">
      <label for="Wednesday">周三</label>
      <input type="checkbox" id="Thursday" value="Thursday">
      <label for="Thursday">周四</label>
      <input type="checkbox" id="Friday" value="Friday">
      <label for="Friday">周五</label>
      <input type="checkbox" id="Saturday" value="Saturday">
      <label for="Saturday">周六</label>
      <input type="checkbox" id="Sunday" value="Sunday">
      <label for="Sunday">周日</label>
      <!-- 保存按钮 -->
      <button @click="saveInfo">保存</button>
    </div>
    <div>
      <h3>有无门票：</h3>
      <input type="checkbox" id="yes" value="yes">
      <label for="yes">有</label>
      <input type="checkbox" id="no" value="no">
      <label for="no">无</label>

      <!-- 保存按钮 -->
      <button @click="saveInfo">保存</button>
    </div>




  </div>
</template>

<script>
export default {
  data() {
    return {
      searchTerm: '',
      name: "",
      contact: "",
      searchResults: [],
      savedSearches: []
    };
  },
  methods: {
    saveInfo() {
      // 在这里处理保存用户信息的逻辑，可以将填写的信息提交到后端或者进行其他操作
      console.log("保存用户信息");
    },
      handleInput() {
        this.searchResults = this.items.filter(item =>
          item.name.includes(this.searchTerm)
        );
      },
      saveSearch() {
        this.savedSearches.push({
          term: this.searchTerm,
          results: [...this.searchResults],
        });
    }
  }
};
</script>

<style>
/* 添加样式，使界面看起来更美观 */
/* 可以按照自己的需求添加样式 */
</style>
