<template>
  <div>
    <div class="top-section">
    </div>

    <div class="content-container">
      <div class="logs-section">
        <h2>旅游日志</h2>
        <div class="logs">
          <ul>
            <li v-for="log in logs" :key="log.time">
              <p><strong>用户名:</strong> {{ log.usrId }}</p>
              <p><strong>日志内容:</strong> {{ log.logText }}</p>
              <p><strong>发表时间</strong> {{ log.time }}</p>
            </li>
          </ul>
        </div>
      </div>

      <div class="guides-section">
        <h2>旅游攻略</h2>
        <div class="guides">
          <ul>
            <li v-for="guide in guides" :key="guide.guide.time">
              <p><strong>用户名:</strong> {{ guide.guide.usrId }}</p>
              <p><strong>攻略内容:</strong> {{ guide.guide.guideText }}</p>
              <p><strong>发表时间:</strong> {{ guide.guide.time }}</p>
              <p><strong>路线ID:</strong> {{ guide.guide.routeId }}</p>
              <p><strong>路线内容:</strong> {{ guide.route.route }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import logService from '../../services/logService';

export default {
  data() {
    return {
      logs: [],
      guides: []
    };
  },
  created() {
    this.fetchTravelLogs();
    this.fetchTravelGuides();
  },
  methods: {
    fetchTravelLogs() {
      logService.fetchAllLogs(data => {
        this.logs = data;
      });
    },
    fetchTravelGuides() {
      logService.fetchAllGuides(data => {
        this.guides = data;
      });
    }
  }
};
</script>

<style>
.top-section {
}

.content-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.logs-section, .guides-section {
  flex: 1;
  margin: 0 10px;
}

.logs, .guides {
  height: 500px; /* 固定高度 */
  overflow-y: auto; /* 允许垂直滚动 */
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 1em;
  padding: 1em;
  border: 1px solid #ddd;
}

strong {
  display: inline-block;
  width: 100px;
}

.logs-section h2, .guides-section h2 {
  text-align: center;
}
</style>
