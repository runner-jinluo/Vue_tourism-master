<template>
  <div>
    <h2>上传旅游日志</h2>
    <form @submit.prevent="submitLog">
      <div>
        <label for="logText">日志内容:</label>
        <textarea v-model="log.logText" id="logText" required></textarea>
      </div>
      <button type="submit">上传</button>
    </form>

    <h2>上传旅游攻略</h2>
    <form @submit.prevent="submitGuide">
      <div>
        <label for="guideText">攻略内容:</label>
        <textarea v-model="guide.guideText" id="guideText" required></textarea>
      </div>
      <div>
        <label for="routeId">攻略对应路线:</label>
        <select v-model="guide.routeId" id="routeId" required>
          <option v-for="route in routes" :key="route.id" :value="route.id">
            {{ route.id }}
          </option>
        </select>
      </div>
      <button type="submit">上传</button>
    </form>
  </div>
</template>

<script>
import logService from '../services/logService';
import $ from 'jquery';
import 'jquery.cookie';

export default {
  data() {
    return {
      log: {
        usrId: '',
        logText: ''
      },
      guide: {
        usrId: '',
        guideText: '',
        routeId: ''
      },
      routes: []
    };
  },
  created() {
    const userId = $.cookie('userid');
    if (!userId) {
      this.$message('请先登录');
      this.$router.push({ name: 'Login' });
    } else {
      this.log.usrId = userId;
      this.guide.usrId = userId;
      this.fetchRoutes();
    }
  },
  methods: {
    submitLog() {
      logService.uploadLog(this.log, data => {
        console.log('Log uploaded:', data);
        alert('Log uploaded successfully');
        this.log.logText = '';
      });
    },
    submitGuide() {
      logService.uploadGuide(this.guide, data => {
        console.log('Guide uploaded:', data);
        alert('Guide uploaded successfully');
        this.guide.guideText = '';
        this.guide.routeId = '';
      });
    },
    fetchRoutes() {
      logService.fetchAllRoutes(data => {
        this.routes = data;
      });
    }
  }
};
</script>

<style>
/* Add some basic styling */
form {
  max-width: 400px;
  margin: auto;
}

div {
  margin-bottom: 1em;
}


textarea, select {
  width: 100%;
  padding: 0.5em;
  box-sizing: border-box;
}
</style>
