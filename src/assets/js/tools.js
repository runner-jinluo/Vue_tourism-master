export default {
  initDistance(arr) {
    return new Promise((resolve, reject) => {
      let Distance = Array.from({ length: arr.length }, () => Array(arr.length).fill(0));
      let completedRequests = 0;
      let totalRequests = (arr.length * (arr.length - 1)) / 2;

      console.log(`Total requests to be made: ${totalRequests}`); // 调试信息

      const searchComplete = function (results) {
        console.log('Search complete callback called'); // 调试信息
        console.log('Search results:', results); // 调试信息

        if (results && results.routes && results.routes.length > 0) {
          const route = results.routes[0];
          const origin = route.origin;
          const destination = route.destination;

          // 更宽松的比较方法
          let startIndex = arr.findIndex(item =>
            Math.abs(item.point.lat - origin.lat) < 0.001 && Math.abs(item.point.lng - origin.lng) < 0.001
          );
          let endIndex = arr.findIndex(item =>
            Math.abs(item.point.lat - destination.lat) < 0.001 && Math.abs(item.point.lng - destination.lng) < 0.001
          );

          console.log(`Start index: ${startIndex}, End index: ${endIndex}`); // 调试信息

          if (startIndex !== -1 && endIndex !== -1) {
            let duration = route.duration;
            console.log(`Duration from ${startIndex} to ${endIndex}: ${duration}`); // 调试信息

            Distance[startIndex][endIndex] = duration;
            Distance[endIndex][startIndex] = duration;

            completedRequests += 1;
            console.log(`Completed requests: ${completedRequests}`); // 调试信息

            if (completedRequests === totalRequests) {
              console.log('All requests completed, resolving promise'); // 调试信息
              resolve(Distance);
            }
          } else {
            console.error('Start or end index not found:', { startIndex, endIndex, results });
          }
        } else {
          console.error('Search results are incomplete or undefined:', results);
        }
      };

      const sendRequest = function (startPoint, endPoint) {
        const ak = '9meC5OvILgdn1tpQltPdxWKLEU6DBEQ2';
        const origin = `${startPoint.lat},${startPoint.lng}`;
        const destination = `${endPoint.lat},${endPoint.lng}`;
        const url = `https://api.map.baidu.com/direction/v2/driving?origin=${origin}&destination=${destination}&ak=${ak}`;

        console.log(`Request URL: ${url}`); // 调试信息

        jsonp(url).then(data => {
          if (data && data.result) {
            searchComplete(data.result);
          } else {
            console.error('Invalid JSONP response:', data); // 调试信息
          }
        }).catch(error => {
          console.error('Error fetching data:', error); // 调试信息
        });
      };

      arr.forEach((start, i) => {
        arr.forEach((end, j) => {
          if (i < j) {
            let startPoint = { lat: start.point.lat, lng: start.point.lng };
            let endPoint = { lat: end.point.lat, lng: end.point.lng };
            console.log(`Searching route from (${startPoint.lat}, ${startPoint.lng}) to (${endPoint.lat}, ${endPoint.lng})`); // 调试信息
            sendRequest(startPoint, endPoint);
          }
        });
      });
    });
  }
}

function jsonp(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    const callbackFunction = `jsonpCallback_${Date.now()}`;
    window[callbackFunction] = (data) => {
      resolve(data);
      delete window[callbackFunction];
      document.body.removeChild(script);
    };
    script.src = `${url}&callback=${callbackFunction}`;
    script.onerror = (error) => {
      console.error('Script load error:', error); // 新的调试信息
      reject(error);
      document.body.removeChild(script);
    };
    console.log(`Appending script with URL: ${script.src}`); // 调试信息
    document.body.appendChild(script);
  });
}

// 示例用法
function testDistance() {
  const locations = [
    { point: { lat: 22.396428, lng: 114.109497 } }, // 香港
    { point: { lat: 31.230391, lng: 121.473701 } }, // 上海
    // 其他城市...
  ];

  initDistance(locations).then(distanceMatrix => {
    console.log('Distance matrix:', distanceMatrix); // 调试信息
  }).catch(error => {
    console.error('Error calculating distances:', error); // 调试信息
  });
}
