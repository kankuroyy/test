var LINE_NOTIFY_TOKEN = "*** TODO ***";
var LINE_NOTIFY_API = "https://notify-api.line.me/api/notify";

function main() {
  sendMessage("こんにちは!!\nAPIを使って送信してます。");
}

function sendMessage(msg) {
  var response = UrlFetchApp.fetch(LINE_NOTIFY_API, {
    "method": "post",
    "headers": {
      "Authorization": "Bearer " + LINE_NOTIFY_TOKEN
    },
    "payload": {
      "message": msg
    }
  });
}