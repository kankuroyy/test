// 写真の保存
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

const form = document.querySelector('form');
const setfile = document.getElementById("setFile");
const storage = firebase.storage();
const imgSample = document.getElementById("imgSample");

let file_name;
let blob;

// setfile変更
setfile.addEventListener("change", e => {
  let file = e.target.files;
  file_name = file[0].name;
  blob = new Blob(file, { type: "image/jpeg" });
  console.warn(blob);
});

// submit
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



// 

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth()+1;
const day = date.getDate();
const time = `${year}/${month}/${day}`;

$("#send").on("click",function(){

database.push({
  name:$("#name").val(),
  store:$("#store").val(),
  genre:$("#genre").val(),
  price:$("#price").val(),
  lat:$("#lat").val(),
  lng:$("#lng").val(),
  lng:$("#lng").val(),
  setfile:$("#setfile").val(),
  time:time,
  });

  $("#name").val("");
  $("#store").val("");
  $("#genre").val("");
  $("#price").val("");
  $("#lat").val("");
  $("#lng").val("");
  $("#setfile").val("");
  $("#dialog").fadeOut();
});


// 

$("#post").on("click",function(){
  $("#dialog").dialog();
});

let infowindow = new google.maps.InfoWindow();

function initialize() {

database.on("child_added",function(data){
const v = data.val();  //データ取得
const n = data.name; 
const s = data.store; 
const g = data.genre; 
const pr = data.price; 
const lat = data.lat; 
const lng = data.lng; 
const setfile = data.setfile;

console.log(v.lat,v.lng);

var point = new google.maps.LatLng(v.lat,v.lng);
var marker = create_maker(point, "info",'<p>'+v.store+'（'+v.genre+'） by'+v.name+'<br>'+v.price+'<pre>'+v.time+'に投稿</pre></p><img src="'+v.setfile+'">');
});

// ＿＿＿＿＿＿＿＿【1】＿＿＿＿＿＿＿＿＿
var option1 = {
zoom: 16,
center: new google.maps.LatLng(35.665140, 139.712516),
mapTypeId: google.maps.MapTypeId.ROADMAP,
};

// 吹き出しを閉じる処理
map1 = new google.maps.Map(document.getElementById("map1"), option1);
google.maps.event.addListener(map1, "click", function() {infowindow.close();});

var point = new google.maps.LatLng(35.666018, 139.716969);
var marker = create_maker(point, "info", "<p>ラス（フランス料理）<br>8,000-10,000円/人</p><img src='https://lh5.googleusercontent.com/p/AF1QipPEnM5dl0u7npt99HN6972COUMi0cQengwm3CCe=w408-h306-k-no' id='photo'/>");


function create_maker(latlng, label, html) {
// マーカーを生成
  var marker1 = new google.maps.Marker({position: latlng, map: map1, title: label});
  // マーカーをマウスオーバーした時の処理
  google.maps.event.addListener(marker1, "mouseover", function() {
    infowindow.setContent(html);
    infowindow.open(map1, marker1);
  });
var marker2 = new google.maps.Marker({position: latlng, map: map2, title: label});
  google.maps.event.addListener(marker2, "mouseover", function() {
    infowindow.setContent(html);
    infowindow.open(map2, marker2);
}); 

google.maps.event.addDomListener(window, "load", initialize);

$('#setfile').on('change', function(){ //ファイルが選択されるたびに動作するイベントハンドラ
  var strFileInfo = $("#setfile")[0].files[0]; //jQueryでファイルオブジェクトを変数にセット
    if(strFileInfo && strFileInfo.type.match('image.*')){ //選択されたファイルが画像であれば、処理を継続

      $('#preview').remove();  //表示中のプレビュー画像があれば、削除しておく
      $('#preview_area').append('<img id="preview" width="260" />'); //横幅300pxの空の画像をプレビューエリアにセット

      fileReader = new FileReader(); //HTML5 のAPI である FileReader() メソッドを初期化
      fileReader.onload = function(event){
        $('#preview').attr('src', event.target.result);
      }

      fileReader.readAsDataURL(strFileInfo); //ローカルフォルダから画像ファイルが読み込まれる
  }
});