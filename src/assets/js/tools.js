export default {

  initDistance(arr) {
    return new Promise((resolve, reject) => {
      let Distance = Array.from({ length: arr.length }, () => Array(arr.length).fill(0));
      let completedRequests = 0;
      let totalRequests = (arr.length * (arr.length - 1)) / 2;

      const searchComplete = function (results) {
        if (results && results.Rv && results.cv) {
          let startIndex = arr.findIndex(item => item.point.lat === results.Rv.point.lat && item.point.lng === results.Rv.point.lng);
          let endIndex = arr.findIndex(item => item.point.lat === results.cv.point.lat && item.point.lng === results.cv.point.lng);

          if (startIndex !== -1 && endIndex !== -1) {
            let duration = results.getPlan(0).getDuration(false);
            Distance[startIndex][endIndex] = duration;
            Distance[endIndex][startIndex] = duration;

            completedRequests += 1;
            if (completedRequests === totalRequests) {
              resolve(Distance);
            }
          } else {
            console.error('Start or end index not found:', { startIndex, endIndex, results });
          }
        } else {
          console.error('Search results are incomplete or undefined:', results);
        }
      };

      const transit = new BMap.DrivingRoute('哈尔滨', {
        onSearchComplete: searchComplete,
      });

      arr.forEach((start, i) => {
        arr.forEach((end, j) => {
          if (i < j) {
            let startPoint = new BMap.Point(start.point.lng, start.point.lat);
            let endPoint = new BMap.Point(end.point.lng, end.point.lat);
            transit.search(startPoint, endPoint);
          }
        });
      });
    });
  }
}

// Example usage
// function testDistance() {
//     const locations = [
//         { point: { lat: 22.396428, lng: 114.109497 } }, // 香港
//         { point: { lat: 31.230391, lng: 121.473701 } }, // 上海
//         // Other cities...
//     ];

//     initDistance(locations).then(distanceMatrix => {
//         console.log(distanceMatrix);
//     }).catch(error => {
//         console.error('Error calculating distances:', error);
//     });
// }
