/**
 * 保存数据到服务器
 * 需要保存的数据 data
 * 请求成功的回调函数 callback
 */
export default {
  /**
   * 用户注册
   */
  register(data, callback) {
    $.ajax({
      url: `${global.ApiUrl}users/reg`,
      data: JSON.stringify(data),
      method: 'POST',
      contentType: 'application/json',
      success: function(res) {
        $.cookie('224', '222');
        callback(res);
      },
      error: function(err) {
        console.log(err);
      }
    });
  },
  /**
   * 用户登录
   */
  login(data, callback) {
    $.ajax({
      url: `${global.ApiUrl}users/login`,
      data: JSON.stringify(data),
      method: 'POST',
      contentType: 'application/json',
      success: function(res) {
        console.log(res);
        callback(res);
      },
      error: function(err) {
        console.log(err);
      }
    });
  },
  saveuserinfo(data,callback) {
    $.ajax({
      url: `${global.ApiUrl}users/update`,
      data: JSON.stringify(data),
      method: 'PUT',
      contentType: 'application/json',
      success: function(res) {
        callback(res);
      },
      error: function(err) {
        console.log(err);
      }
    });
  },
  getuserinfo(id, callback) {
    $.ajax({
      url: `${global.ApiUrl}users/${id}`,
      method: "GET",
      success: function (res) {
        // 处理成功响应的数据
        console.log(id);
        console.log("User info retrieved:", res)
        callback(res);

        // 在这里你可以更新你的应用状态或者执行其他操作
      },
      error: function (err) {
        console.error("Error fetching user info:", err);
        // 处理错误情况，例如显示错误提示或者重试
      }
    });
  },
  selectoption(data,callback) {
    $.ajax({
      url: `${global.ApiUrl}users/selectoption`,
      data: JSON.stringify(data),
      method: 'PUT',
      contentType: 'application/json',
      success: function(res) {
        callback(res);
      },
      error: function(err) {
        console.log(err);
      }
    });
  },
  getDataById(id, callback) {
    $.ajax({
      url: `${global.ApiUrl}users/${id}`,
      method: 'GET',
      success: function(res) {
        console.log(res);
        callback(res.data);
      },
      error: function(err) {
        console.log(err);
      }
    });
  },
  // 根据id修改指定的记录数据
  updateById(id, data, callback) {
    $.ajax({
      url: `${global.ApiUrl}users/update/${id}`,
      data: JSON.stringify(data),
      method: 'POST',
      contentType: 'application/json',
      success: function(res) {
        callback(res);
      },
      error: function(err) {
        console.log(err);
      }
    });
  }
};
