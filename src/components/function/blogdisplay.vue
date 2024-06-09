
<template>
  <div id="blogdisplay">
    <div class="container">
      <div class="travel-logs">
        <h2>旅游日志</h2>
        <div v-if="travelLogs.length">
          <div v-for="log in travelLogs" :key="log.id">
            <h3>{{ log.title }}</h3>
            <p>{{ log.content }}</p>
            <p>作者：{{ log.author }}</p>
          </div>
        </div>
        <div v-else>
          <p>暂无旅游日志</p>
        </div>
      </div>

      <div class="travel-guides">
        <h2>旅游攻略</h2>
        <div v-if="travelGuides.length">
          <div v-for="guide in travelGuides" :key="guide.id">
            <h3>{{ guide.title }}</h3>
            <p>{{ guide.content }}</p>
            <p>作者：{{ guide.author }}</p>
          </div>
        </div>
        <div v-else>
          <p>暂无旅游攻略</p>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
      export default {
        data() {
          return {
            travelLogs: [],
            travelGuides: [],
          };
        },
        created() {
          this.fetchTravelLogs();
          this.fetchTravelGuides();
        },
        methods: {
          fetchTravelLogs() {
            // 这里是获取旅游日志的代码，具体实现需要根据你的后台API进行调整
            // 假设你的后台API返回一个形如 [{ id: 1, title: '日志1', content: '日志1的内容', author: '作者1' }, ...] 的数组
            // axios.get('/api/travel-logs').then(response => {
            //   this.travelLogs = response.data;
            // });
          },
          fetchTravelGuides() {
            // 这里是获取旅游攻略的代码，具体实现需要根据你的后台API进行调整
            // 假设你的后台API返回一个形如 [{ id: 1, title: '攻略1', content: '攻略1的内容', author: '作者1' }, ...] 的数组
            // axios.get('/api/travel-guides').then(response => {
            //   this.travelGuides = response.data;
            // });
          },
        },
      };
    </script>

    <style scoped>
      .container {
        display: flex;
        justify-content: space-between;
      }
      .travel-logs, .travel-guides {
        width: 45%;
      }
    </style>
