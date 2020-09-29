let ws = new WebSocket("wss://b3jl8evf21.execute-api.ap-southeast-2.amazonaws.com/dev?jobOrderId=1");

ws.onopen = event => {
    console.log("Connected as server");

    // After the connection is opened, start sending current location every 4 second
    setInterval(() => {

        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                let message = {
                    action: "newLocation",
                    jobOrderId: "1",
                    location: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                };
                ws.send(JSON.stringify(message));
                console.log("message sent");
            })
        }
        else {
            console.log('Problem');
        }

    
    }, 4000);
    
};

ws.onerror = evt => {
    console.log(evt);
}
