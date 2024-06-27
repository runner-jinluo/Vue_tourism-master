<template>
  <div id="query">
    <div class="glass tool">
      <div class="tool-item">工具栏</div>
      <div class="tool-item">
        <label class="tool-item1-label" for="isClick">获取坐标</label>
        <input class="tool-item1-checkbox" title="点击地图获取坐标" type="checkbox" id="isClick" v-model="isAddClickEvent">
      </div>
      <a class="tool-item glass btn attractions" @click="getAttractions">搜索景点</a>
    </div>
    <div class="query-div1 glass">
      <div class="query-div1-div1">
        <a href="javascript:void(0)" data-list="list" class="cur" @click="setIsSaveTrue()">查询</a>
        <a href="javascript:void(0)" data-list="savedList" @click="getSavedList()">已保存</a>
      </div>
      <div>
        <ul class="list block">
          <li v-for="(i, index) in place" :key="index">{{i.title}} <span class="del" @click="delItem(index)"> x </span></li>
        </ul>
        <ul class="savedList">
          <li v-for="(i, index) in savedList" :key="index" :class="{selected: i.selected}" @click="selectSavedListItem(i)">{{i.title}}</li>
        </ul>
      </div>
      <button href="javascript:void(0)" class="btn save-btn glass" @click="saveOrDelAttractions">{{isSave ? '保存' : '删除'}}</button>
    </div>
    <div class="query-div2 glass">
      <div id="allmap"></div>
    </div>
    <div class="query-div3 right">
      <el-row justify="space-between" type="flex">
        <el-form>
          <div class="query-input">
            <input class="input glass" placeholder="请输入关键词" v-model="query.key"></input>
            <button id="calc" class="glass btn plan-btn" @click="goToSavedSearchPage()">开始规划</button>
          </div>
          <div>
            <a class="glass btn search-btn" @click="subHandle">搜</a>
          </div>
        </el-form>
        <div class="clear"></div>
      </el-row>
      <div id="r-result" class="glass"></div>
    </div>
  </div>
</template>

<script>
import api_map from '../../services/api_map.js';
import api_attraction from '../../services/api_attraction.js';

export default {
  data() {
    return {
      query: {
        key: '',
        results: []
      },
      rules: {
        key: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      },
      location: {
        x: '',
        y: ''
      },
      map: '',
      isAddClickEvent: false,
      btn: '',
      title: '',
      CreatedEvent: false,
      place: [],
      savedList: [],
      delSavedList: [],
      isSave: true
    };
  },
  methods: {
    subHandle: function() {
      console.log("subHandle called with key:", this.query.key); // 调试信息
      if (this.query.key === '') {
        $('input.input').attr('placeholder', '输入框不能为空');
        return;
      }
      this.map.clearOverlays();
      var sel = this;
      api_map.searchByKey(this.query.key, this.map, function(results) {
        console.log("searchByKey results:", results); // 调试信息
        sel.query.results = results;
        var btn = sel.btn;
        if (!sel.CreatedEvent) {
          $('body').on('click', '#r-result li', function(event) {
            event.stopPropagation();
            $(this).css('position', 'relative').append(btn);
          });
          $('body').on('click', 'button.collect', function(event) {
            event.stopPropagation();
            sel.title = $(this).parent().find('span').eq(2).text();
            console.log("Selected title:", sel.title); // 调试信息
            var myGeo = new BMap.Geocoder();
            myGeo.getPoint(sel.title, function(point) {
              if (point) {
                var item = {};
                item.point = point;
                item.title = sel.title;
                item.address = sel.title;
                sel.place.push(item);
                console.log("Point found and added:", item); // 调试信息
              } else {
                alert("您选择地址没有解析到结果!");
              }
            }, "厦门市");
          });
          sel.CreatedEvent = true;
        }
      });
    },
    getLocation() {
      console.log("getLocation called"); // 调试信息
      api_map.location(this.map);
    },
    goToSavedSearchPage() {
      console.log("goToSavedSearchPage called"); // 调试信息
      this.$router.push({ name: 'Displayteam' });
    },
    getCoordinates(event) {
      console.log("getCoordinates called with event:", event); // 调试信息
      var item = {};
      item.point = event.point;
      var geoc = new BMap.Geocoder();
      geoc.getLocation(event.point, function(rs) {
        item.title = rs.address;
        var addComp = rs.addressComponents;
        item.address = `${addComp.province},${addComp.city},${addComp.district},${addComp.street},${addComp.streetNumber}`;
        this.place.push(item);
        console.log("Coordinates found and added:", item); // 调试信息
      }.bind(this));
    },
    initBtn() {
      console.log("initBtn called"); // 调试信息
      this.btn = $('<button>+</button>').css({
        position: 'absolute',
        top: 'calc(50% - 20px)',
        right: '0px',
        width: '30px',
        height: '30px'
      }).addClass('glass light collect').eq(0);
    },
    getAttractions() {
      console.log("getAttractions called"); // 调试信息
      this.query.key = '景点';
      this.subHandle();
    },
    delItem(index) {
      console.log("delItem called with index:", index); // 调试信息
      this.place.splice(index, 1);
    },
    saveOrDelAttractions() {
      if (this.isSave) {
        console.log("Saving attractions"); // 调试信息
        if (this.place.length <= 0) {
          this.$message('没有数据需要保存');
          return;
        }
        api_attraction.save($.cookie('userid'), this.place, function(res) {
          console.log("save response:", res); // 调试信息
          if (res.status === "y") {
            this.$message.success("数据保存成功");
            this.place = [];
          }
        }.bind(this));
      } else {
        console.log("Deleting attractions"); // 调试信息
        if (this.delSavedList.length <= 0) {
          this.$message('没有数据需要删除');
          return;
        }
        api_attraction.del(this.delSavedList, function(res) {
          console.log("delete response:", res); // 调试信息
          if (res.status === "y") {
            this.$message.success("数据删除成功");
            this.getSavedList();
          }
        }.bind(this));
      }
    },
    async getSavedList() {
      this.isSave = false;
      const userId = $.cookie('userid'); // 获取用户ID
      console.log("getSavedList called with userId:", userId); // 调试信息

      try {
        const data = await api_attraction.getAttractions(userId);
        console.log("getSavedList received data:", data); // 调试信息
        if (!data || !Array.isArray(data)) {
          console.error('获取的数据不是一个有效的数组:', data);
          return;
        }
        data.forEach(item => {
          item.selected = false; // 添加一个新的属性 selected
        });
        this.savedList = data; // 更新 savedList 数组
        console.log("Updated savedList:", this.savedList); // 调试信息
      } catch (error) {
        console.error('Error retrieving attractions:', error);
      }
    },
    selectSavedListItem(item) {
      console.log("selectSavedListItem called with item:", item); // 调试信息
      item.selected = !item.selected;
      if (item.selected) {
        this.delSavedList.push(item);
      } else {
        const index = this.delSavedList.findIndex(i => i === item);
        this.delSavedList.splice(index, 1);
      }
      console.log("Updated delSavedList:", this.delSavedList); // 调试信息
    },
    setIsSaveTrue() {
      console.log("setIsSaveTrue called"); // 调试信息
      this.isSave = true;
    }
  },
  watch: {
    isAddClickEvent(value) {
      console.log("isAddClickEvent changed to:", value); // 调试信息
      if (value) {
        this.map.addEventListener("click", this.getCoordinates, false);
      } else {
        this.map.removeEventListener("click", this.getCoordinates, false);
      }
    },
    title(value) {
      console.log("title changed to:", value); // 调试信息
      if (value && this.query.results) {
        const data = this.query.results.filter(item => item.title.indexOf(value) > -1)[0];
        if (data) {
          const data2 = {
            title: data.title,
            point: data.point,
            address: data.address
          };
          this.place.push(data2);
          console.log("Updated place with new title:", this.place); // 调试信息
        }
      }
    },
    place(value) {
      console.log("place changed to:", value); // 调试信息
      if (value.length >= 15) {
        this.$message('最多保存15个');
      }
    }
  },
  created() {
    console.log("Component created"); // 调试信息
    this.initBtn();
  },
  mounted() {
    console.log("Component mounted"); // 调试信息
    const map = new BMap.Map("allmap");
    this.map = map;
    api_map.initMap(this.map);
    api_map.showCityList(this.map);
    $('.query-div1-div1').on('click', 'a', function(e) {
      $(this).addClass('cur').siblings().removeClass('cur');
      $('.query-div1 ul.' + $(this).data('list')).addClass('block').siblings().removeClass('block');
    });
  }
};
</script>

<style scoped>
.query-div {
  height: 740px;
  background-color: transparent;
}
.right {
  min-height: 740px;
}
.el-form {
  width: 100%;
}
.el-button {
  width: 100%;
}
#allmap {
  width: 100%;
  height: 100%;
}
#query > div {
  float: left;
}
.query-div1 {
  margin-right: 20px;
  width: 20%;
  height: 740px;
  box-sizing: border-box;
  padding: 20px;
  position: relative;
}
.clear {
  clear: both;
}
.query-div2 {
  margin-right: 20px;
  height: 740px;
  width: calc(60% - 40px);
}
.query-div3 {
  width: 20%;
  margin-right: 0px;
  min-height: 740px;
}
.btn {
  background-color: transparent;
  border: none;
  color: #666;
  text-align: center;
  cursor: pointer;
}
a.search-btn {
  float: left;
  display: inline-block;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  line-height: 42px;
}
a.search-btn:active {
  top: 10px;
}
.query-input {
  width: calc(100% - 42px);
  float: left;
}
input.input {
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  border: none;
  background-color: transparent;
  width: 100%;
  text-align: center;
  color: #666;
}
.btn:active {
  background-color: aquamarine;
}
.tool {
  padding: 0;
  margin: 0;
  position: absolute;
  top: 110px;
  left: 27%;
  z-index: 5;
  background-color: transparent;
  border-radius: 0 15px 15px 0;
}
.tool-item {
  height: 40px;
  width: 100px;
  float: left;
  text-align: center;
  border-right: 1px solid #fff;
  line-height: 40px;
}
.tool-item1-label {
  line-height: 40px;
}
.attractions {
  height: 40px;
  display: inline-block;
  line-height: 40px;
}
.query-div1 .list {
  margin-top: 30px;
}
.query-div1 .list li {
  line-height: 40px;
  padding-left: 10px;
  position: relative;
}
.query-div1 .savedList {
  margin-top: 30px;
}
.query-div1 .savedList li {
  line-height: 40px;
  padding-left: 10px;
  position: relative;
}
.del {
  display: inline-block;
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
  border-radius: 50%;
  position: absolute;
  right: -20px;
  top: 0px;
}
.del:hover {
  background-color: rgba(255, 255, 255, 0.4);
}
.save-btn {
  position: absolute;
  left: 0px;
  bottom: 0px;
  display: block;
  width: 100%;
  height: 40px;
  line-height: 40px;
}
.query-div1-div1 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
.query-div1-div1 > a {
  float: left;
  width: 50%;
  text-align: center;
  color: #666;
  height: 50px;
  line-height: 50px;
  background-color: rgba(255, 255, 255, 0.5);
}
.query-div1-div1 > a:nth-of-type(1) {
}
.query-div1-div1 > a.cur {
  background-color: rgba(255, 255, 255, 0.3);
  font-size: 20px;
}
.query-div1 ul {
  display: none;
}
.query-div1 ul.savedList {
  height: 650px;
  overflow: scroll;
  overflow-x: hidden;
  width: 220px;
}
.query-div1 ul.savedList li.selected {
  background-color: white;
}
.query-div1 ul.block {
  display: block;
}
</style>
