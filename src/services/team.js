// src/services/logService.js

export default {
    fetchMatchingUsers(email, callback) {
      $.ajax({
        url: `${global.ApiUrl}users/matching`,
        data: { email: email },
        method: 'GET',
        contentType: 'application/json',
        success: function(res) {
          console.log('Response data:', res);
          callback(res);
        },
        error: function(err) {
          console.log('Error fetching users:', err);
        }
      });
    }
  };
  