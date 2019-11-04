let config = {
    apiKey: "AIzaSyDHCI9HelAf6SLGaO8BCrm4f20TvFeyhlU",
    authDomain: "labs-2e127.firebaseapp.com",
    databaseURL: "https://labs-2e127.firebaseio.com",
    projectId: "labs-2e127",
    storageBucket: "labs-2e127.appspot.com",
    messagingSenderId: "746225726271",
    appId: "1:746225726271:web:5590c90b37a9c2b87b198a"
};
firebase.initializeApp(config);

const newPostRef = firebase.database().ref();

const send = document.getElementById("send");
const username = document.getElementById("username");
const text = document.getElementById("text");
let map,latitude,longitude,marker,infowindow;
let latlang,lat,lng,Location; 
let result = document.getElementById("result");
// const latitude = document.getElementById("latitude");
// const longitude = document.getElementById("longitude");

// const messagesRef = firebase.database().ref().child('messages');

// function initMap(){
//     const defaultSettings = {zoom: 15, center:{lat: 35.6811673, lng:139.7670516}};
//     const map = new google.maps.map(
//         document.querySelector('#map'),
//         defaultSettings
//     );
// }

function getMyPlace() {
    let output = document.getElementById("result");
    if (!navigator.geolocation){
      output.innerHTML = "<p>ブラウザーでサポートされていません</p>";
      return;
    }
    function success(position) {
        let latitude  = position.coords.latitude;
        let longitude = position.coords.longitude;
        output.innerHTML = '<p>緯度 ' + latitude + '° <br>経度 ' + longitude + '°</p>';
        let latlng = new google.maps.LatLng( latitude , longitude);
        // Google Mapsに書き出し
        let map = new google.maps.Map( document.getElementById('map'), {
            zoom: 15,
            center: latlng,
        });
        // マーカーの新規出力
        marker = new google.maps.Marker({
            map: map,
            position: latlng,
            draggable: true,
        });

        marker.addListener('dragend', function(e){
            console.log(e.latLng.lat());
            latitude = e.latLng.lat();
            longitude = e.latLng.lng();
            output.innerHTML = '<p>緯度 ' + latitude + '° <br>経度 ' + longitude + '°</p>';
            // output.innerHTML = '<p>緯度 ' + e.latLng.lat() + '° <br>経度 ' + e.latLng.lng() + '°</p>';
            presentLocation = [e.latLng.lat(),e.latLng.lng()];
            console.log(presentLocation);
            // $("#location_comment").html("presentLocation");
        return presentLocation;
        });
    };
    function error(){
        output.innerHTML = "座標位置を取得できません";
    };
    navigator.geolocation.getCurrentPosition(success, error);
}

function MarkerLocation() {
    let pos = marker.getPosition() ;
    let lat = pos.lat();
    let lng = pos.lng();
    alert(pos);
    // alert("緯度："+lat+"、経度："+lng);
    $("#location_comment").html("【コメント位置】緯度："+lat+"、経度："+lng);

    let Location = pos.toJSON();
    return Location;
}

function time() {
    let date = new Date();
    let hh = ("0" + date.getHours()).slice(-2);
    let min = ("0" + date.getMinutes()).slice(-2);
    let sec = ("0" + date.getSeconds()).slice(-2);
    let time = hh + ":" + min + ":" + sec;
    return time;
} 

$("#send").on("click", function(){
    newPostRef.push({
        username: $("#username").val(),
        text: $("#text").val(),
        time: time(),
        Location: MarkerLocation()
    });
    $("#text").val("");
});

newPostRef.on('child_added', function(data){
    let v = data.val();
    let k = data.key;
    let str = "";

    // str += '<div class = "column">';
    str += '<div id="+ k +" class = "msg_main">';
    str += '<div class = "msg_left">';
    str += '<div class = ""><imag src = "imgs/buke.png"  class = "icon '+ v.username +'" width ="30"></div>';
    str += '<div class = "msg">' ; 
    str += '<div class="name">' + v.username + '</div>';
    str += '<div class+"text">' + v.text + '</div>';
    str += '</div>';
    str += '</div>';
    str += '<div class = "msg_right">';
    str += '<div class = "time">' + v.time + '</div>';
    str += '</div>';
    str += '</div>';

    output.innerHTML += str;
    
    let marker = new google.maps.Marker({ // マーカーの追加
        position: v.Location, // マーカーを立てる位置を指定
        map: map // マーカーを立てる地図を指定
    });    
});
    // let kMarker = new google.maps.Marker({
    //             // マーカーを置く緯度経度
    //     position: v.Location,
    //     map: map,
    //     });

    // let jsObject = JSON.parse(a);
    // let latitude = jsObject.lat;
    // let longitude = jsObject.lng;
    // console.log(a);
    // console.log(latitude);

    // let latitude  = v.Location[0];
    // let longitude = v.Location[1];
    // let latlng = new google.maps.LatLng( latitude , longitude);
    // let kMarker = new google.maps.Marker({
    //         // マーカーを置く緯度経度
    //     position: latlng,
    //     map: map,
    //     });



const speech = new webkitSpeechRecognition();
speech.lang = 'ja-JP';

const btn = document.getElementById('btn');
const content = document.getElementById('content');
btn.addEventListener('click', function(){
    speech.start();
});

speech.onresult = function(e){
    speech.stop();
    if(e.results[0].isFinal){
        let autotext = e.results[0][0].transcript;
        console.log(e);
        console.log(autotext);
        newPostRef.push({
            username: username.value,
            text: autotext,
            time: time()
        });
    }
}

speech.onend = () => {
    speech.start()
};





// let map;
// let marker;
// let center = {
//     lat: 35.6811673, // 緯度
//     lng: 139.7670516 // 経度
// }
// let infowindow;

// function initMap() {
//     geocorder = new google.maps.Geocorder();
//     geocorder.geocord({
//         'adress': '東京都港区北青山3-5-6'
//         }, function(results,status){
//             if(status === google.maps.GeocoderStatus.OK){
//                 console.group('Success');
//                 console.log(results);
//                 console.log(status);
//             } else {
//                 console.group('Error');
//                 console.log(results);
//                 console.log(status);
//             }
//         });
    
//     map = new google.maps.Map(document.getElementById('map'), {
//         center: center,
//         zoom: 19
//     });

//     marker = new google.maps.Marker({
//         position: center,
//         map: map
//     });

//     infoWindow = new google.maps.InfoWindow({
//         content: '<div class="map">現場</div>'
//     });

//     marker.addListener('click', function() {
//     infoWindow.open(map, marker);
//     });
// }


// speech.addEventListener('result', function(e){
//     console.log(e);
//     const text = e.results[0][0].transcript;
//     content.innerText = text;
