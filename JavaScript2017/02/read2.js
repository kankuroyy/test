var CSV = require('csv-lite');
var meibo = CSV.readFileSync('meibo.csv', 'sjis');

// (0から数えて)2行目1列目のデータを表示
var name = meibo[2][1];
console.log(name);
