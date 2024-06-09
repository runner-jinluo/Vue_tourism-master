<template>
    <div id="travel-share">
      <h1>旅游分享</h1>
      <div class="content-upload">
        <!-- 可以填写内容和上传图片的文本框 -->
        <textarea placeholder="分享你的旅行见闻..." rows="4"></textarea>
        <input type="file" accept="image/*">
        <button @click="publishLog">发表为旅游日志</button>
        <button @click="publishStrategy">发表为旅游攻略</button>
      </div>
      <div class="travel-logs">
        <!-- 已有的旅游日志和旅游攻略列表 -->
        <div class="log-item">
          <h3>日志标题</h3>
          <p>这里是旅行日志的内容...</p>
        </div>
        <div class="log-item">
          <h3>攻略标题</h3>
          <p>这里是旅行攻略的内容...</p>
        </div>
        <!-- 在这里添加更多的日志和攻略 -->
      </div>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      publish() {
        // 处理发表按钮点击事件的方法
        // 在这里编写将内容上传服务器等逻辑
      }
    }
  }
  </script>
  
  <style scoped>
  #travel-share {
    text-align: center;
  }
  
  .content-upload {
    margin-top: 20px;
  }
  
  textarea {
    width: 80%;
    margin-bottom: 10px;
  }
  
  input[type="file"] {
    margin-bottom: 10px;
  }
  
  button {
    padding: 8px 16px;
  }
  
  .travel-logs {
    margin-top: 20px;
  }
  
  .log-item {
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 10px;
  }
  </style>
  