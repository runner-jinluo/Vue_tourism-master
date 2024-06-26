<template>
  <div id="review">
    <h1>路线评价</h1>
    <div class="content-upload">
      <!-- 可以填写内容和上传图片的文本框 -->
      <textarea placeholder="给出你的观点..." rows="4"></textarea>
      <input type="file" accept="image/*">
      <button @click="publishReview">发表</button>

    </div>
    <div class="mark">
      <!-- 已有的旅游日志和旅游攻略列表 -->


      <div>
        <h3>评分：</h3>
        <input type="radio" id="one" name="mark" value="one">
        <label for="on">1</label>
        <input type="radio" id="two" name="mark" value="two">
        <label for="two">2</label>
        <input type="radio" id="three" name="mark" value="three">
        <label for="three">3</label>
        <input type="radio" id="four" name="mark" value="four">
        <label for="four">4</label>
        <input type="radio" id="five" name="mark" value="five">
        <label for="five">5</label>
      </div>


      <!-- 在这里添加更多的日志和攻略 -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: '',
      image: null,
      mark: '',
      logs: []
    }
  },
  methods: {
    publishReview() {
      // 这里可以添加发布日志的代码，例如将内容和图片上传到服务器
      this.logs.push({
        id: this.logs.length,
        content: this.content,
        image: this.image,
        mark: this.mark
      });
      // 清空输入框
      this.content = '';
      this.image = null;
      this.mark = '';
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
