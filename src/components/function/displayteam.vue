<template>
  <div id="displayteam">
    <h2>推荐的队友</h2>
    <div v-if="recommendedTeammates.length">
      <div v-for="teammate in recommendedTeammates" :key="teammate.id">
        <h3>{{ teammate.name }}</h3>
        <p>{{ teammate.description }}</p>
        <input type="radio" :value="teammate.id" v-model="selectedTeammateId"> 选择此队友
      </div>
    </div>
    <div v-else>
      <p>暂无推荐的队友</p>
    </div>
    <button @click="confirmSelection" :disabled="!selectedTeammateId">确认选择</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recommendedTeammates: [],
      selectedTeammateId: null,
    };
  },
  created() {
    this.fetchRecommendedTeammates();
  },
  methods: {
    fetchRecommendedTeammates() {
      // 这里是获取推荐队友的代码，具体实现需要根据你的后台API进行调整
      // 假设你的后台API返回一个形如 [{ id: 1, name: '队友1', description: '队友1的描述' }, ...] 的数组
      // axios.get('/api/recommended-teammates').then(response => {
      //   this.recommendedTeammates = response.data;
      // });
    },
    confirmSelection() {
      // 这里是确认选择的代码，具体实现需要根据你的后台API进行调整
      // axios.post('/api/confirm-selection', { teammateId: this.selectedTeammateId }).then(() => {
      //   alert('选择成功！');
      // });
    },
  },
};
</script>
