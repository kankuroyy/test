
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
let db = firebase.database();


// データベース
const newPostRef = db.ref();
const send = document.getElementById("send");
const username = document.getElementById("username");
const text = document.getElementById("text");
// 地図関連
let map,latitude,longitude,infowindow;
let marker;
let latlang,lat,lng,Location; 
let result = document.getElementById("result");

// タブコントロール------------------------------------------------------------------------------------------



// 地図内のコントロール------------------------------------------------------------------------------------------
function getMyPlace() {
  // ブラウザが未対応の場合
  let output = document.getElementById("result");
  if (!navigator.geolocation){
    output.innerHTML = "<p>エラー：ブラウザが未サポート</p>";
  return;
  }
  // 対応できている場合
  function success(position) {
    let latitude  = position.coords.latitude;
    let longitude = position.coords.longitude;
    output.innerHTML = '<p>緯度 ' + latitude + '° 経度 ' + longitude + '°</p>';
    let latlng = new google.maps.LatLng( latitude , longitude);
    console.log(latlng);
    // Google Mapsに書き出し
    let map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: latlng,
    });
    // マーカーの新規出力
    let marker = new google.maps.Marker({
      map: map,
      position: latlng,
      draggable: true
    });
    marker.addListener('dragend', function(e){
      output.innerHTML = '<p>緯度 ' + e.latLng.lat() + '° 経度 ' + e.latLng.lng() + '°</p>';
      presentLocation = new google.maps.LatLng(e.latLng.lat(),e.latLng.lng());
      console.log(presentLocation);
      return presentLocation;
    });
    let infowin = new google.maps.InfoWindow({
      content:'<div><input name="textBox1" id="id_textBox1" type="text" value=""/>メモ欄</div>'
    });
    marker.addListener("click", function(){
      infowin.open(map, marker);
    });    
  };
  // 座標位置が取れない場合
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

// メンバーの位置トレース
let watchId = null;
let watchButton = document.querySelector("#watchButton");
watchButton.addEventListener("click", function(){
  alert("位置情報取得を開始します");
  let options = {enableHighAccuracy:true, maximumAge:0}
  watchId = navigator.geolocation.watchPosition(updatePosition);
}, false);

// let status;
// function wSuccessFunc(position){
//   status = "";
//   for(let prop in position.coords){
//     status += prop + ": " + position.coords[prop] + "<br>";
//   }
//   status += "<br>";
//   console.log(status);
//   return status;
// }

function updatePosition(p){
  let lat = p.coords.latitude;
  let lng = p.coords.longitude;
  let user = firebase.auth().currentUser;
  user_db.child(user.uid).set({
    username: user.displayName,
    latitude: lat,
    longitude: lng,
    timestamp:(new Date()).getTime()
  });
  console.log(username,latitude,timestamp);
}

// let wfailureFunc = function(err){
//   let errCause = "";
//   switch(err.code) {
//     case err.TIMEOUT:
//       errCause = 'Timeout';
//       break;
//     case err.POSITION_UNAVAILABLE:
//       errCause = 'Position unavailable';
//       break;
//     case err.PERMISSION_DENIED:
//       errCause = 'Permission denied';
//       break;
//     case err.UNKNOWN_ERROR:
//       errCause = 'Unknown error';
//       break;
//   }
//   alert("位置情報取得に失敗しました。原因: " + errCause + " " + err.message);
// }

// clear watch.
if (watchId !== null){ // watchId is a global variable.
  navigator.geolocation.clearWatch(watchId);
  watchId = null;
  alert("位置情報取得を終了しました");
}

// 送信（登録）アクションと処理------------------------------------------------------------------------------------------
$("#send").on("click", function(){
    newPostRef.push({
        username: $("#username").val(),
        text: $("#text").val(),
        time: time(),
        Location: MarkerLocation(),
        // memo; memo()
    });
    $("#text").val("");
});

// 送信（登録）があった場合のチャットエリアの表示・更新------------------------------------------------------------------------------------------
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
    console.log(v.Location);
    
    let marker = new google.maps.Marker({ // マーカーの追加
        position: v.Location, // マーカーを立てる位置を指定
        map: map // マーカーを立てる地図を指定
    });    
});

// チャットタブ------------------------------------------------------------------------------------------

// 取材メモタブ------------------------------------------------------------------------------------------

// ウェブ会議タブ------------------------------------------------------------------------------------------
const Peer = window.Peer;

(async function main() {
  const localVideo = document.getElementById('js-local-stream');
  const localId = document.getElementById('js-local-id');
  const callTrigger = document.getElementById('js-call-trigger');
  const closeTrigger = document.getElementById('js-close-trigger');
  const remoteVideo = document.getElementById('js-remote-stream');
  const remoteId = document.getElementById('js-remote-id');
  const meta = document.getElementById('js-meta');
  const sdkSrc = document.querySelector('script[src*=skyway]');

  meta.innerText = `
    UA: ${navigator.userAgent}
    SDK: ${sdkSrc ? sdkSrc.src : 'unknown'}
  `.trim();

  const localStream = await navigator.mediaDevices
    .getUserMedia({
      audio: true,
      video: true,
    })
    .catch(console.error);

  // Render local stream
  localVideo.muted = true;
  localVideo.srcObject = localStream;
  localVideo.playsInline = true;
  await localVideo.play().catch(console.error);

  const peer = (window.peer = new Peer({
    key: "a3f94f4b-eb5d-4099-98ee-833409fbdced",
    debug: 3,
  }));

  // Register caller handler
  callTrigger.addEventListener('click', () => {
    // Note that you need to ensure the peer has connected to signaling server
    // before using methods of peer instance.
    if (!peer.open) {
      return;
    }

    const mediaConnection = peer.call(remoteId.value, localStream);

    mediaConnection.on('stream', async stream => {
      // Render remote stream for caller
      remoteVideo.srcObject = stream;
      remoteVideo.playsInline = true;
      await remoteVideo.play().catch(console.error);
    });

    mediaConnection.once('close', () => {
      remoteVideo.srcObject.getTracks().forEach(track => track.stop());
      remoteVideo.srcObject = null;
    });

    closeTrigger.addEventListener('click', () => mediaConnection.close(true));
  });

  peer.once('open', id => (localId.textContent = id));

  // Register callee handler
  peer.on('call', mediaConnection => {
    mediaConnection.answer(localStream);

    mediaConnection.on('stream', async stream => {
      // Render remote stream for callee
      remoteVideo.srcObject = stream;
      remoteVideo.playsInline = true;
      await remoteVideo.play().catch(console.error);
    });

    mediaConnection.once('close', () => {
      remoteVideo.srcObject.getTracks().forEach(track => track.stop());
      remoteVideo.srcObject = null;
    });

    closeTrigger.addEventListener('click', () => mediaConnection.close(true));
  });

  peer.on('error', console.error);
})();



// 周辺情報タブ

