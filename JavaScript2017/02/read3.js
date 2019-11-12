var CSV = require('csv-lite');
var meibo = CSV.readFileSync('meibo.csv', 'sjis');

// 顧客IDが1003のものを探す
var flag = false;
for (var row = 0; row < meibo.length; row++) {
  var id = meibo[row][0];
  var name = meibo[row][1];
  var email = meibo[row][2];
  if (id == 1003) {
    console.log("見つけました！");
    console.log(name + "<" + email + ">");
    flag = true;
    break;
  }
}
if (!flag) console.log("見つかりません");
