// LINE Notifyでトークルームのトークンを取得して以下に設定★
var LINE_NOTIFY_TOKEN = "** TODO **";
// 一回に送信する単語の数
var COUNT_WORDS = 6;
// 英単語を取得してLINEで送信 --- (*1)
function sendWords() {
  // シートを取得
  var sheet = SpreadsheetApp.getActiveSheet();
  // 今のカウンターを取得
  var counter = sheet.getRange("D1").getValue();
  // 今日の単語一覧を得る
  var values = sheet.getRange(counter + 2, 1, COUNT_WORDS, 2).getValues();
  counter += COUNT_WORDS;
  // 最下行までいった？
  if (sheet.getLastRow() < counter) counter = 1;
  // 送信内容を作成
  var res = "";
  for (var i = 0; i < values.length; i++) {
    var r = values[i];
    res += "【" + r[0] + "】\n" + r[1] + "\n\n";
  }
  Logger.log(res);
  // 送信
  _sendMessage("\n"+res);
  // どこまで送信したかを記録
  sheet.getRange("D1").setValue(counter);
}

// メッセージを送信する
function _sendMessage(msg) {
  // 認証情報のセット
  var headers = {
    "Authorization": "Bearer " + LINE_NOTIFY_TOKEN
  };
  // メッセージをセット
  var payload = {
    "message": msg
  };
  // 送信情報をまとめる
  var options = {
    'method' : 'post',
    'contentType' : 'application/x-www-form-urlencoded',
    'headers': headers,
    'payload' : payload
  };
  Logger.log(options);
  // 実際に送信する
  var NOTIFY_API = "https://notify-api.line.me/api/notify";
  var response = UrlFetchApp.fetch(NOTIFY_API, options);
  Logger.log(response);
}