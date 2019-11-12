// CSVモジュールを取り込む
var CSV = require('csv-lite');

// meibo.csv(Shift_JIS)を読み込む
var meibo = CSV.readFileSync('meibo.csv', 'sjis');
console.log(meibo);
