export default {
  initDistance(arr) {
    return new Promise((resolve, reject) => {
      let Distance = Array.from({ length: arr.length }, () => Array(arr.length).fill(0));
      let completedRequests = 0;
      let totalRequests = (arr.length * (arr.length - 1)) / 2;

      console.log(`Total requests to be made: ${totalRequests}`); // 调试信息

      const searchComplete = function (results, startPoint, endPoint) {
        console.log('Search complete callback called'); // 调试信息
        console.log('Search results:', results); // 调试信息

        if (results && results.routes && results.routes.length > 0) {
          const route = results.routes[0];
          const origin = route.origin;
          const destination = route.destination;

          console.log(`Comparing coordinates - Requested: (${startPoint.lat}, ${startPoint.lng}), Returned: (${origin.lat}, ${origin.lng})`);
          console.log(`Comparing coordinates - Requested: (${endPoint.lat}, ${endPoint.lng}), Returned: (${destination.lat}, ${destination.lng})`);

          let startIndex = arr.findIndex(item =>
            Math.abs(item.point.lat - origin.lat) < 0.01 && Math.abs(item.point.lng - origin.lng) < 0.01
          );
          let endIndex = arr.findIndex(item =>
            Math.abs(item.point.lat - destination.lat) < 0.01 && Math.abs(item.point.lng - destination.lng) < 0.01
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
            reject(new Error('Start or end index not found'));
          }
        } else {
          console.error('Search results are incomplete or undefined:', results);
          reject(new Error('Search results are incomplete or undefined'));
        }
      };

      const sendRequest = function (startPoint, endPoint) {
        const ak = '9meC5OvILgdn1tpQltPdxWKLEU6DBEQ2';
        const origin = `${startPoint.lat},${startPoint.lng}`;
        const destination = `${endPoint.lat},${endPoint.lng}`;
        const callbackFunction = `jsonpCallback_${Date.now()}_${Math.random().toString(36).substring(2)}`;
        const url = `https://api.map.baidu.com/direction/v2/driving?origin=${origin}&destination=${destination}&ak=${ak}&callback=${callbackFunction}`;

        console.log(`Request URL: ${url}`); // 调试信息
        console.log(`Requesting route from (${startPoint.lat}, ${startPoint.lng}) to (${endPoint.lat}, ${endPoint.lng})`); // 调试信息

        window[callbackFunction] = function (data) {
          if (data && data.result) {
            searchComplete(data.result, startPoint, endPoint);
          } else {
            console.error('Invalid JSONP response:', data); // 调试信息
            reject(new Error('Invalid JSONP response'));
          }
          delete window[callbackFunction];
        };

        const script = document.createElement('script');
        script.src = url;
        script.onerror = (error) => {
          console.error('Script load error:', error); // 调试信息
          delete window[callbackFunction];
          document.body.removeChild(script);
          reject(error);
        };
        script.onload = () => {
          console.log(`Script loaded successfully: ${script.src}`); // 调试信息
        };
        console.log(`Appending script with URL: ${script.src}`); // 调试信息
        document.body.appendChild(script);
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
