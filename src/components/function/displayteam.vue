<template>
  <div>
    <h2>推荐的队友</h2>
    <button id="calc" class="glass btn plan-btn" @click="goToPlanPage()">开始规划</button>
    <div class="team-container">
      <div class="team-list">
        <ul>
          <li v-for="(user, index) in users" :key="index">
            <p><strong>队友{{ index + 1 }}：</strong></p>
            <p><strong>姓名：</strong>{{ user.name }}</p>
            <p><strong>年龄：</strong>{{ user.age }}</p>
            <p><strong>联系方式：</strong>{{ user.phoneNumber }}</p>
            <p><strong>爱好：</strong>{{ user.commonInterests }}</p>
            <br />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import logService from '../../services/team';
import $ from 'jquery';
import 'jquery.cookie';

export default {
  data() {
    return {
      users: []
    };
  },
  created() {
    const email = $.cookie('userid');
    console.log(`Current user email: ${email}`);
    if (!email) {
      this.$message('请先登录');
      this.$router.push({ name: 'Login' });
    } else {
      this.fetchMatchingUsers(email);
    }
  },
  methods: {
    fetchMatchingUsers(email) {
      logService.fetchMatchingUsers(email, data => {
        console.log('Fetched users:', data);
        this.users = data;
      });
    },
    goToPlanPage() {
        this.$router.push({ name: 'Plan' });
    }
  }
};
</script>

<style>
ul {
  list-style-type: none;
  padding: 0;
}

.team-container {
  max-height: 80vh; /* 控制容器高度 */
  overflow-y: auto; /* 添加垂直滚动条 */
  border: 1px solid #ddd; /* 边框 */
  padding: 10px; /* 内边距 */
}

.team-list {
  list-style-type: none; /* 去掉列表样式 */
  padding: 0; /* 去掉默认的内边距 */
}

strong {
  display: inline-block;
  width: 100px;
}
</style>
