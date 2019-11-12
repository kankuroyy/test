// RSSのURLを指定 --- (*1)
const RSS = "http://weather.livedoor.com/forecast/rss/area/130010.xml";
// cheerio-httpcli モジュールを取り込む
const cli = require('cheerio-httpcli');

// ダウンロードして解析
cli.fetch(RSS, { }, (err, $, res) => {
  // エラーがあればメッセージを表示
  if (err) { console.log("失敗", err); return; }
  // ダウンロードしたデータから必要な部分を取り出す --- (*2)
  $("item > title").each((index, elem) => {
    let e = $(elem);
    console.log(e.text()); // テキスト部分を表示
  });
});
