
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

// 宣言
let db = firebase.database();
let user_db = db.ref("/users");
const post_db = db.ref("/posts/logs");
let map = null;
let watchID;
let users = {};

// 宣言・input系
let send = document.getElementById("btn_send");
let username = document.getElementById("username");
// 宣言・地図関連
let latitude,longitude,infowindow;
let marker;
let markerLocation;
let presentLocation;
let latlang,lat,lng,Location; 
let result = document.getElementById("result");

// パーツ
// 時間の取得
function time() {
  let date = new Date();
  let hh = ("0" + date.getHours()).slice(-2);
  let min = ("0" + date.getMinutes()).slice(-2);
  let sec = ("0" + date.getSeconds()).slice(-2);
  let time = hh + ":" + min + ":" + sec;
  return time;
} 

// function MarkerLocation() {
//   let pos = marker.getPosition();
//   console.log(pos)
//   let lat_now = pos.lat();
//   let lng_now = pos.lng();
//   alert(pos);
//   // alert("緯度："+lat+"、経度："+lng);
//   // let Location = pos.toJSON();
//   return lat_now,lng_now;
// }

// タブコントロール------------------------------------------------------------------------------------------
onload="initTabControl('tabControl', 'tabControl-data')"

document.addEventListener('DOMContentLoaded', () => {
  const tab = document.getElementById('tab-1');
  new Tab(tab);
});

function Tab(tab) {
  this.toggles = tab.querySelectorAll('[data-toggle]'); 
  this.handleClick();
}

/*** タブをクリックした時の動作*/
Tab.prototype.handleClick = function() {
  this.toggles.forEach(toggle => {
    toggle.addEventListener('click', event => {
      event.preventDefault();
      // 先にすべて閉じておく
      this.closeAll();
      // リンクの親要素に開いた表現のクラスを追加
      toggle.parentNode.classList.add('is-open');
      // クリックされたタブに対応するコンテンツを表示
      const target = toggle.getAttribute('href');
      const content = document.querySelector(target);
      content.classList.add('is-open');
    });
  });
};
/*** タブをすべて閉じる*/
Tab.prototype.closeAll = function() {
  this.toggles.forEach(toggle => {
    toggle.parentNode.classList.remove('is-open');
    const target = toggle.getAttribute('href');
    const content = document.querySelector(target);
    content.classList.remove('is-open');
  });
};

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
      map.setCenter(presentLocation);
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

function Myloc(presentLocation){
  alert(presentLocation);
};



// メンバーの位置トレース
let watchButton = document.querySelector("#watchButton");
watchButton.addEventListener("click", function(){
  alert("位置情報取得を開始します");
  let options = {enableHighAccuracy:true, maximumAge:0}
  watchID = navigator.geolocation.watchPosition(updatePosition);
});

function updatePosition(p){
  let lat = p.coords.latitude;
  let lng = p.coords.longitude;
  let user = firebase.auth().currentUser;
  user_db.child(user.uid).push({
    username: user.displayName || '',
    latitude: lat || 0,
    longitude: lng || 0,
    timestamp:time()
    // (new Date()).getTime()
  });
  console.log(username,latitude);
}

// // データベースに沿って地図上にマークをつける
// user_db.limitToLast(20).on("child_added",checkValue);
// function checkValue(data){
//   let v = data.val();
//   let lat = v.latitude;
//   let lng = v.longitude;
//   let key = data.key;
//   console.log(v.latitude,v.longitude);

//   let bar = v.username;
//   if(!(key in users)){
//     let marker = new google.maps.Marker({
//       position:  {"lat": lat, "lng": lng},
//     });
//     // let info = new google.maps.Infowindow({
//     //   content: bar
//     // });
//     marker.setMap(map);
//     // marker.addListener('click',function(){
//     //   info.open(map,marker)
//     // });
//     users[key] = {
//       "marker": marker
//       // "info": info
//     };
//   }
//   else {
//     let marker = users[key].marker;
//     marker.setPosition({
//       "lat":lat, "lng":lng
//     });
//   }
// }
// function $(id){
//   return document.getElementById(id);
// };



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
if (watchID !== null){ 
  navigator.geolocation.clearWatch(watchID);
  watchId = null;
  console.log("位置情報取得を終了しました");
}

// 音声認識
const speech = new webkitSpeechRecognition();
speech.lang = 'ja-JP';

const btn_voice = document.getElementById('btn_voice');
let text_chat = document.getElementById('text_chat');
btn_voice.addEventListener('click', function(){
  speech.start();
});
speech.onresult = function(e){
  speech.stop();
  if(e.results[0].isFinal){
      let autotext = e.results[0][0].transcript;
      console.log(autotext);
      str = text_chat + autotext;
      text_chat.innerHTML = str;
  }
}
speech.onend = () => {
    speech.start()
};

// 送信（登録）アクションと処理------------------------------------------------------------------------------------------
// 送信関数
function send_post(){
  let user = firebase.auth().currentUser;
  let text_chat = document.getElementById("text_chat");
  // markerLocation = marker.getPosition();
  console.log(text_chat);
  post_db.push({
    time: time(),
    username: user.displayName || '',
    // latlng: MarkerLocation(),
    text:text_chat.html()
  });
}
// イベント
document.getElementById("btn_send").onclick = function() {
  send_post();
  // Location: MarkerLocation()
};

// チャットタブ------------------------------------------------------------------------------------------
// 送信（登録）があった場合のチャットエリアの表示・更新------------------------------------------------------------------------------------------
post_db.limitToLast(20).on("child_added",addLog);
function addLog(data){
  let v = data.val();
  let k = data.key;
  let str = "";

  // str += '<div class = "column">';
  str += '<div id="+ k +" class = "msg_main">';
  str += '<div class = "msg_left">';
  // str += '<div class = ""><imag src = "imgs/buke.png"  class = "icon '+ v.username +'" width ="30"></div>';
  str += '<div class = "msg">' ; 
  str += '<div class="name">' + v.username + '</div>';
  str += '<div class+"text">' + v.text_chat + '</div>';
  str += '</div>';
  str += '</div>';
  str += '<div class = "msg_right">';
  str += '<div class = "time">' + v.time + '</div>';
  str += '</div>';
  str += '</div>';

output_chat.innerHTML += str;


// 取材メモタブ------------------------------------------------------------------------------------------
const form = document.querySelector('form');
const setfile = document.getElementById("setFile");
const storage = firebase.storage();
const imgSample = document.getElementById("imgSample");

let file_name;
let blob;

// setfileの変更で処理開始
setfile.addEventListener("change", e => {
    let file = e.target.files;
    file_name = file[0].name;
    blob = new Blob(file, { type: "image/jpeg" });
    console.warn(blob);
});

// submitで処理開始
form.addEventListener('submit', e => {
    e.preventDefault();

    let uploadRef = storage.ref('images/').child(file_name);
    uploadRef.put(blob).then(snapshot => {
    console.log(snapshot.state);
        uploadRef.getDownloadURL().then(url => {
            imgSample.style.backgroundImage = "url("+url+")";
        }).catch(error => {
        console.log(error);
        });
    });
    file_name = '';
    blob = '';
});

// カメラ機能
document.getElementById("btn_snap").onclick = function() {
  const video  = document.querySelector("#camera");
  const canvas = document.querySelector("#picture");
  const se     = document.querySelector('#se');
  /** カメラ設定 */
  const constraints = {
    audio: false,
    video: {
      width: 300,
      height: 200,
      facingMode: "user"   // フロントカメラを利用する
      // facingMode: { exact: "environment" }  // リアカメラを利用する場合
    }
  };
  /*** カメラを<video>と同期*/
  navigator.mediaDevices.getUserMedia(constraints)
  .then( (stream) => {
    video.srcObject = stream;
    video.onloadedmetadata = (e) => {
      video.play();
    };
  })
  // .catch( (err) => {
  //   console.log(err.name + ": " + err.message);
  // });
  /*** シャッターボタン*/
   document.querySelector("#shutter").addEventListener("click", () => {
    const ctx = canvas.getContext("2d");
    video.pause();  // 映像を停止
    se.play();      // シャッター音
    setTimeout( () => {
      video.play(); 
    }, 500);
    //画像を貼り付ける
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    // canvasを画像に変換
    let c_data = canvas.toDataURL('image/jpeg');
    // 画像として出力
    let outputImg = document.createElement('img');
    outputImg.src = c_data;
    document.getElementById('picture').appendChild(outputImg);   
    // let dlLink = document.createElement('a');
    // dlLink.href = c_data;
    // dlLink.download = 'snap.jpeg';
    // dlLink.innerText = 'ダウンロード';
    // document.getElementById('result').appendChild(dlLink);
  });
}


    // ctx.drawImage(video, 0, 0, w, h);
  //   if (canvas.toBlob) {
  //     canvas.toBlob(function(blob) {
  //       imageURL = URL.createObjectURL(blob);
  //       // 要素にURLを適用
  //       image.src = imageURL;
  //       link.href = imageURL;
  //     });
  //   } else if (canvas.msToBlob) {
  //     // canvasの図形からPNG形式のBlobオブジェクトを取得
  //     blob = canvas.msToBlob();
  //     // BlobオブジェクトにアクセスできるURLを生成
  //     imageURL = URL.createObjectURL(blob);  
  //     // 要素にURLを適用
  //     image.src = imageURL;
  //     link.href = imageURL;
  //     // IEとEDGEの場合 navigator.msSaveBlob() でBlobオブジェクトを保存できるメソッドがある
  //     link.addEventListener('click', function (ev) {
  //       ev.preventDefault();
  //       navigator.msSaveBlob(blob, 'canvas.png');
  //     });
  //   } else {
  //     // Blobオブジェクトに変換できない場合はPNG形式のデータURIスキームとして出力
  //     imageURL = canvas.toDataURL();
  //     // 要素にURLを適用
  //     image.src = imageURL;
  //     link.href = imageURL;
  //   }


// ウェブ会議タブ ※別jsファイル


// 周辺情報タブ

window.onload = function() {
  var map = new Y.Map("around_map", {
  configure : {
      doubleClickZoom : true,
      scrollWheelZoom : true,
      dragging : true
      }
  });
  //天気レイヤ作成
  var weather = new Y.WeatherMapLayer({
      "opacity": 0.6,
  });
  //天気レイヤを重ねる地図レイヤを作成(今回のサンプルでは通常地図を設定)
  var maplayer = new Y.NormalLayer();
  //地図 + 天気レイヤを追加
  map.addLayerSet("weather", new Y.LayerSet("地図+天気", [maplayer, weather]));
  //レイヤを選択するコントロールを追加
  //スライダーバーを追加
  map.addControl(new Y.SliderZoomControlHorizontal());
  //地図を描画
  map.drawMap(new Y.LatLng(35.665627,139.730738), 6, "weather");
  //天気データを更新
  weather.UpdateWeather();
  //5分間毎に自動更新するように設定
  weather.setAutoUpdateInterval(5);
  //自動更新スタート
  weather.startAutoUpdate();
}();
// window.onload = function(){
//   let ymap = new Y.Map("around_map",{
//     configure : {
//         weatherOverlay: true
//     }
//   });  
//   function getPosition() {
//     navigator.geolocation.getCurrentPosition(
//       function(position) {
//         let latitude  = position.coords.latitude;
//         let longitude = position.coords.longitude;
//         let Y_LatLng = [latitude,longitude];
//         console.log("緯度:"+latitude+",経度"+longitude);
//       });
//   ymap.drawMap(new Y_LatLng, 10, Y.LayerSetId.PHOTO);
//   };
// }
// };
// window.onload = function() {
//   let ymap = new Y.Map("around_map", {
//     configure : {
//         doubleClickZoom : true,
//         scrollWheelZoom : true,
//         dragging : true
//       }
//   });
//   //天気レイヤ作成
//   let weather = new Y.WeatherMapLayer({
//       "opacity": 0.6,
//   });
//   //天気レイヤを重ねる地図レイヤを作成(今回のサンプルでは通常地図を設定)
//   let maplayer = new Y.NormalLayer();
//   //地図 + 天気レイヤを追加
//   map.addLayerSet("weather", new Y.LayerSet("地図+天気", [maplayer, weather]));
//   //レイヤを選択するコントロールを追加
//   //スライダーバーを追加
//   map.addControl(new Y.SliderZoomControlHorizontal());

//   function getPosition() {
//     navigator.geolocation.getCurrentPosition(
//       function(position) {
//         let latitude  = position.coords.latitude;
//         let longitude = position.coords.longitude;
//         console.log("緯度:"+latitude+",経度"+longitude);
//       });
//   ymap.drawMap(new Y.LatLng(latitude,longitude), 10, "weather");
//   };
//   //天気データを更新
//   weather.UpdateWeather();
//   //5分間毎に自動更新するように設定
//   weather.setAutoUpdateInterval(5);
//   //自動更新スタート
//   weather.startAutoUpdate();
// }
// }
}
