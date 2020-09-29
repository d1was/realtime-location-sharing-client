let ws = new WebSocket("wss://b3jl8evf21.execute-api.ap-southeast-2.amazonaws.com/dev?jobOrderId=1");

ws.onopen = (evt) => {
    console.log("Connected to ws from client");
}

ws.onmessage = evt => {
    console.log("event",evt);
    console.log(JSON.parse(evt.data));
    let data = JSON.parse(evt.data);
    let last = data[data.length - 1];

    var mapProp= {
        center:new google.maps.LatLng(last.lat, last.lng),
        zoom:10,
      };

      let path = new google.maps.Polyline({
          path: data,
          strokeColor: "#0000FF",
          strokeOpacity: 0.8,
          strokeWeight: 6
      });
      var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
      
      var marker = new google.maps.Marker({position: {lat:last.lat,lng:last.lng} });
      marker.setMap(map);
      path.setMap(map);
}

