<template>
  <div id="plan">
    <div class="plan-div1">
      <div class="glass plan-div1-div1">
        <h3>景点</h3>
        <ul class="attractions">
          <li v-for="item in attractions" :key="item.id" @click="select(item)" :class="{selected:item.selected}">{{item.title}}</li>
        </ul>
      </div>
      <div class="glass plan-div1-div2">
        <h3>要规划景点</h3>
        <ul class="selected-attractions">
          <li v-for="(item, index) in selectedAttractions" @click="selectOne(item, index)">{{item.title}}</li>
        </ul>
        <button id="calc" class="glass btn plan-btn" @click="startCalc()">开始规划</button>
      </div>
      <div class="plan-div1-div3">
        <div class="glass start" @click="setStart()">
          <p>start</p>
          <span>{{start.title}}</span>
        </div>
        <div class="glass end" @click="setEnd()">
          <p>end</p>
          <span>{{end.title}}</span>
        </div>
        <div class="glass SeE" title="勾选，终点即为起点">
          <label for="SeE">回到起点</label>
          <input type="checkbox" v-model="SeE" id="SeE">
        </div>
      </div>
    </div>
    <div class="glass plan-div2">
      <div class="plan-div2-div1" id="allmap"></div>
      <div class="plan-div2-div2">
        <span><b>规划的线路：</b></span>
        <span v-for="(item, index) in plan">{{index === 0 ? "" : "(" + bestDistance[index - 1] + "分钟)"}}{{item.title}}{{index === plan.length - 1 ? '' : ">"}} </span>
        <p><b>路上总共花费：</b>{{bestTime}}</p>
        <div class="button-container">
          <button class="btn glass save-btn" @click="savePlan()">保存</button>
          <button class="btn glass review-btn" @click="goToReview()">评价</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api_map from '../../services/api_map.js' //地图api的请求
import api_attraction from '../../services/api_attraction.js' //景点的数据操作
import api_plan from '../../services/api_plan.js' //路线的数据操作
import SAA from "../../assets/js/saa.js" //模拟退火算法
import MyEnum from "../../assets/js/enum.js" //枚举
import Tools from "../../assets/js/tools.js" //工具
import { Message } from 'element-ui'; //错误消息提示
export default {
  data() {
    return {
      attractions: [], //景点集合
      selectedAttractions: [], //要规划的景点集合
      start: '', //起点
      end: '', //终点
      SeE: false, //起点等于终点
      one: '', //选择要操作的元素
      Distance: [], //距离数组
      bestGhh: [], //最好的路线编码
      bestTime: '', //最好路线花费的时间
      plan: [], //规划后的路线
      bestDistance: [], //规划后每个地点之间的花费时间
    }
  },
  methods: {
    goToReview() {
      this.$router.push({ name: 'Help' });
    },
    async getAttractions() {
      const userId = $.cookie('userid'); // 获取用户ID
      console.log(userId); // 打印用户ID以进行调试

      try {
        const data = await api_attraction.getAttractions(userId);
        console.log('Received data:', data);
        if (!data || !Array.isArray(data)) {
          console.error('获取的数据不是一个有效的数组:', data);
          return;
        }
        data.forEach(item => {
          console.log(item); // 打印每一条数据以进行调试
          item.selected = false; // 添加一个新的属性 selected
        });
        this.attractions = data; // 更新 savedList 数组
      } catch (error) {
        console.error('Error retrieving attractions:', error);
      }
    },
    select(item) {
      item.selected = !item.selected
      if (item.selected) {
        this.selectedAttractions.push(item)
        console.log(item.title)
        console.log(this.selectedAttractions)
      } else {
        var index = this.selectedAttractions.findIndex(function (i) {
          return i == item
        })
        this.selectedAttractions.splice(index, 1)
      }
    },
    selectOne(item, index) {
      $('.selected-attractions li').eq(index)
        .siblings().removeClass('selectedOne')
        .end().addClass('selectedOne')
      this.one = item
    },
    setStart() {
      if (this.one) {
        console.log(this.one)
        if (this.start != this.one) {
          this.start = this.one
        } else {
          this.start = ""
        }
      }
    },
    setEnd() {
      if (this.one) {
        if (this.end != this.one) {
          this.end = this.one
        } else {
          this.end = ""
        }
      }
    },
    swap(value, i) {
      var index = this.selectedAttractions.findIndex(function (item) {
        return item == value
      })
      var temp = this.selectedAttractions[i]
      this.selectedAttractions[i] = this.selectedAttractions[index]
      this.selectedAttractions[index] = temp
    },
    setPlace(bestGhh) {
      this.plan = []
      for (var i = 0; i < this.selectedAttractions.length; i++) {
        this.plan[i] = this.selectedAttractions[bestGhh[i]]
      }
    },
    startCalc() {
      $('#calc').text('计算中');
      console.log("start", this.start);
      console.log(this.selectedAttractions);
      console.log(this.end);

      if (this.start != "" && this.start == this.end) {
        this.SeE = true;
      }
      var List = []
      if (this.start != "") {
        this.swap(this.start, 0)
      }
      if (this.SeE == false && this.end != "") {
        this.swap(this.end, this.selectedAttractions.length - 1)
      }
      List = this.selectedAttractions
      console.log("list", List)

      global.count = 0
      var sum = List.length * List.length - List.length
      console.log('initDistance开始')
      Tools.initDistance(List).then(Distance => {
        this.Distance = Distance;
        var isStart = 0;
        if (this.start != "") {
          isStart = 1
        }
        var isEnd = 0;
        if (this.end != "") {
          isEnd = 1
        }
        var isSeE = 0;
        if (this.SeE) {
          isSeE = 1
        }
        var N = List.length - isStart - isSeE;

        var that = this;
        if (N >= 9) {
          console.log('计算开始了，使用saa计算')
          console.time('saa')
          var saa = new SAA(List, N * N * N, 800 + (N * 20), Distance, isStart, isEnd, isSeE)
          saa.run()
          console.timeEnd('saa')
          that.bestGhh = saa.bestGhh
          that.bestTime = (saa.bestEvaluation / 60).toFixed(1) + '分钟'
          that.setPlace(saa.bestGhh)
        } else {
          console.log('计算开始了，使用enum计算')
          console.time('enum')
          var myEnum = new MyEnum(List, Distance, isStart, isEnd, isSeE)
          myEnum.run()
          console.timeEnd('enum')
          that.bestGhh = myEnum.bestGhh
          that.bestTime = (myEnum.bestEvaluate / 60).toFixed(1) + '分钟'
          that.setPlace(myEnum.bestGhh)
        }
        that.$message("路线已经规划好")
        $('#calc').text('开始规划');
        that.draw()
        that.getBestDistance()
      }).catch(error => {
        console.error('Error calculating distances:', error);
      });
    },
    draw() {
      var map = new BMap.Map("allmap");
      api_map.setRoute(map, this.plan, this.SeE)
    },
    getBestDistance() {
      var len = this.bestGhh.length
      for (var i = 0; i < len - 1; i++) {
        this.bestDistance.push(Number((this.Distance[this.bestGhh[i]][this.bestGhh[i + 1]] / 60).toFixed(1)))
      }
    },
    savePlan() {
      // 提取plan数组中的title字段
      const titles = this.plan.map(item => item.title);
      var data = {
        route: titles, // 将提取的title数组转换为字符串
        // cost: this.bestTime,
        // eachCost: JSON.stringify(this.bestDistance), // 将bestDistance数组转换为字符串
        // userid: $.cookie('userid'),
        // SeE: this.SeE
      };
      api_plan.save(data, function (res) {
        if (res.success) {
          alert('Saved plan successfully');
        } else {
          //this.$message("路线保存失败");
        }
      }.bind(this));
    }
  },
  created() {
    this.getAttractions()
  },
  watch: {
    attractions: function (value) {},
    SeE: function (value) {},
    start: function (value) {
      if (value != "") {
        if (value == this.end) {
          this.end = ""
        }
      }
    },
    end: function (value) {
      if (value != "") {
        if (value == this.start) {
          this.end = ""
        }
      }
    }
  }
}
</script>

<style scoped>
#plan>div {
  float: left;
}
.plan-div1 {
  width: 40%;
  height: 740px;
}
.plan-div1>div {
  width: 96%;
  height: 43%;
  margin-bottom: 4%;
}
.plan-div1>div:nth-of-type(3) {
  width: 96%;
  height: 10%;
}
.plan-div1>div:nth-of-type(3)>div {
  width: 30%;
  height: 100%;
  margin-right: 5%;
  float: left;
}
.plan-div1>div>h3 {
  text-align: center;
}
.plan-div1>div:nth-of-type(3)>div:nth-of-type(3) {
  margin-right: 0;
}
.plan-div1-div3 {
  text-align: center;
}
.plan-div1-div3 p {
  margin: 0;
}
.plan-div1-div3 .SeE label {
  line-height: 74px;
}
.plan-div2 {
  width: 60%;
  height: 740px;
}
.selected {
  background-color: white;
}
.attractions {
  text-align: center;
  overflow: scroll;
  height: 297px;
  padding: 20px 0;
}
.attractions li {
  width: 50%;
  margin: 0 auto;
}
.selected-attractions li {
  width: 50%;
  float: left;
  text-align: center;
}
.selectedOne {
  background-color: white;
}
.btn {
  background-color: transparent;
  border: none;
}
.plan-btn {
  width: 30px;
  height: 200px;
  border-radius: 50%;
  position: absolute;
  top: calc(50% - 100px);
  right: 10px;
}
.plan-div2>div {
  width: 100%;
}
.plan-div2-div1 {
  height: 80%;
  background-color: white;
}
.plan-div2-div2 {
  height: 20%;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
}
.plan-div2-div2 p {
  margin: 5px 0;
}
.save-btn {
  width: 100px;
  height: 40px;
  line-height: 40px;
  float: right;
  border-radius: 15px;
  position: absolute;
  right: 15px;
  bottom: 15px;
}
.review-btn {
  width: 100px;
  height: 40px;
  line-height: 40px;
  float: right;
  border-radius: 15px;
  position: absolute;
  right: 15px;
  bottom: 60px;
}
.save-btn:active {
  background-color: aquamarine;
}
.button-container {
  display: flex;
  justify-content: space-between;
}
</style>
