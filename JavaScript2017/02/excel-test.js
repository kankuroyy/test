// Excelファイルを作成するテスト
// 必要なモジュールを取り込む
const fs = require('fs');
const officegen = require('officegen');
const xlsx = officegen('xlsx');

// 新規シートを作成
const sheet = xlsx.makeNewSheet();
sheet.name = "自動的に作ったシート";

// セル名を指定してセルにデータを書き込む
sheet.setCell("C2", "Node.jsスゴイ");

// ファイルを書き出す
const f = fs.createWriteStream('test.xlsx');
xlsx.generate(f);
