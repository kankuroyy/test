// 身長・体重・肥満判定のデータを大量に生成する
const DATA_SIZE = 50000
const data = []
// データを生成する
for (var i = 0; i < DATA_SIZE; i++) {
  let height = rand(120, 200);
  let weight = rand(30, 100);
  let bmi = calc_bmi(height, weight);
  let f = {
    'input': [height, weight],
    'output': bmi ? [0, 1] : [1, 0]
  };
  data.push(f);
}
// データをファイルに保存する
data_json = JSON.stringify(data);
const fs = require('fs');
fs.writeFileSync("bmi.json", data_json);
console.log("ok, saved");

// BMIを計算して肥満かどうかを判定する
function calc_bmi(height, weight) {
  let m = height / 100;
  let v = weight / (m * m);
  return (v > 25);
}

// 任意の範囲の乱数を生成する
function rand(n, m) {
  let range = m - n + 1;
  return Math.floor(Math.random() * range + n)
}
