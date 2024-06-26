// src/services/logService.js

export default {
    /**
     * 上传日志
     */
    uploadLog(data, callback) {
      $.ajax({
        url: `${global.ApiUrl}logs/upload`,
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
    },
  
    /**
     * 获取所有日志
     */
    fetchAllLogs(callback) {
      $.ajax({
        url: `${global.ApiUrl}logs/all`,
        method: 'GET',
        contentType: 'application/json',
        success: function(res) {
          callback(res);
        },
        error: function(err) {
          console.log(err);
        }
      });
    },
  
    /**
     * 获取所有路线
     */
    fetchAllRoutes(callback) {
      $.ajax({
        url: `${global.ApiUrl}routes/all`,
        method: 'GET',
        contentType: 'application/json',
        success: function(res) {
          callback(res);
        },
        error: function(err) {
          console.log(err);
        }
      });
    },
  
    /**
     * 上传旅游攻略
     */
    uploadGuide(data, callback) {
      $.ajax({
        url: `${global.ApiUrl}guides/upload`,
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
    },

    /**
     * 获取所有旅游攻略
     */
    fetchAllGuides(callback) {
        $.ajax({
        url: `${global.ApiUrl}guides/all`,
        method: 'GET',
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
  