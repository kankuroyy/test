// LINE Notifyでトークルームのトークンを取得して以下に設定★
var LINE_NOTIFY_TOKEN = "*** TODO ***";
var NOTIFY_API = "https://notify-api.line.me/api/notify";

function sendReminder() { // ---------- (*1)
  var msg = "お疲れ様です。" +
    "もうすぐ、月曜二時の定例会議の時間です。" +
    "よろしくお願いします！";
  _sendMessageWithSticker(msg, "2", "161"); // --- (*2)
}

// スタンプを送信する
function _sendMessageWithSticker(msg, packageId, stickerId) {
  // 認証情報のセット
  var headers = {
    "Authorization": "Bearer " + LINE_NOTIFY_TOKEN
  };
  // メッセージとステッカーをセット
  var payload = {
    "message": msg,
    "stickerPackageId": packageId,
    "stickerId": stickerId
  };
  // 送信情報をまとめる
  var options = {
    'method' : 'post',
    'contentType' : 'application/x-www-form-urlencoded',
    'headers': headers,
    'payload' : payload
  };
  // 実際に送信する
  var response = UrlFetchApp.fetch(NOTIFY_API, options);
  Logger.log(response);
}