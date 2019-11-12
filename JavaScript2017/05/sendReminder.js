// 送信先メールアドレスを以下に指定
var address = {
  "田中": "tanaka@example.com",
  "鈴木": "suzuki@example.com",
  "武田": "takeda@example.com",
  "佐藤": "sato@example.com"
};

function sendReminder() {
  // スプレッドシートのデータを得る
  var sheet = SpreadsheetApp.getActive();
  var lastRow = sheet.getLastRow();
  var values = sheet.getSheetValues(1,1,lastRow,3);
  // 本日の日付を得る
  var t = new Date();
  var y = t.getYear();
  var m = t.getMonth() + 1;
  var d = t.getDate();
  // 予定が本日かどうか各行を照合
  var persons = [];
  for (var i = 0; i < values.length; i++) {
    var date = values[i][0];
    var work = values[i][1];
    var name = values[i][2];
    if (!(date instanceof Date)) continue;
    var cy = date.getYear();
    var cm = date.getMonth() + 1;
    var cd = date.getDate();
    // 日付が合致しない場合
    if (!(y == cy && m == cm && d == cd)) continue;
    // メールアドレスが設定されていない場合
    if (address[name] == undefined) continue;
    if (persons[name] == undefined) {
      persons[name] = [];
    }
    persons[name].push(work);
  }
  // メール送信
  for (var name in persons) {
    var mailto = address[name];
    var work_str = persons[name].join(",");
    var body = name + "さん、本日の当番のリマインダです。\n" +
      work_str + "の仕事があります。よろしくお願いします。\n";
    var subject = "**当番のリマインダ";
    MailApp.sendEmail(mailto, subject, body);
  }
}
