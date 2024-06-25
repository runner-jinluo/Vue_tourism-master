// services/api_attraction.js
export default {
  save(id, attractions, callback) {
    $.ajax({
      url: `${global.ApiUrl}attractions/save_more_data`,
      contentType: 'application/json',
      data: JSON.stringify({ attractions, userid: id }),
      method: 'POST',
      success: function (res) {
        callback(res);
      },
      error: function (err) {
        console.error('Error saving attractions:', err);
      }
    });
  },

  getAttractions(id) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${global.ApiUrl}attractions/get_data`,
        contentType: 'application/json',
        data: JSON.stringify({ userid: id }),
        method: 'POST',
        success: function (res) {
          resolve(res);
          console.log('Attractions:', res);
        },
        error: function (err) {
          reject(err);
        }
      });
    });
  },

  del(delSavedList, callback) {
    $.ajax({
      url: `${global.ApiUrl}attractions/del`,
      contentType: 'application/json',
      data: JSON.stringify({ attractions: delSavedList }),
      method: 'POST',
      success: function (res) {
        callback(res);
      },
      error: function (err) {
        console.error('Error deleting attractions:', err);
      }
    });
  }
};
