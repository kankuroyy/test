// Excelファイルを作成するテスト
// 必要なモジュールを取り込む
const fs = require('fs');
const officegen = require('officegen');
const xlsx = officegen('xlsx');

// 新規シートを作成
const sheet = xlsx.makeNewSheet();
sheet.name = "和暦西暦対応表";

// 1900年から2100年までの対応データを書き込む
sheet.data[0] = ["西暦", "和暦"];
let row = 1;
for (y = 1900; y <= 2100; y++) {
  let wareki = convert_wareki(y);
  sheet.data[row] = [y+"年", wareki];
  row++;
}

// ファイルを書き出す
const f = fs.createWriteStream('wareki.xlsx');
xlsx.generate(f);

// 西暦から和暦への変換関数
function convert_wareki(y) {
  let ba = 1;
  let wa = "";
  /* */if (1868 > y) { }
  else if (1912 > y) { ba = 1868; wa = "明治"; }
  else if (1926 > y) { ba = 1912; wa = "大正"; }
  else if (1989 > y) { ba = 1926; wa = "昭和"; }
  else               { ba = 1989; wa = "平成"; }
  let nen = (y - ba + 1);
  if (nen == 1) nen = "元";
  return wa + nen + "年";
}
