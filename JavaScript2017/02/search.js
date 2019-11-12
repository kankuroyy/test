// --------------------------------
// ファイル横断検索ツール
// --------------------------------
const fs = require('fs');
const path = require('path');

// コマンドライン引数の取得
const args = process.argv;
const runtime = args.shift(), script = args.shift();
const keyword = args.shift();
const args_dir = args.shift();
const target_dir = (args_dir === undefined) ? "." : args_dir;
if (keyword === undefined) {
  console.log("[USAGE] search.js (keyword)");
  process.exit();
}
console.log("#keyword=" + keyword);
console.log("#target=" + target_dir);
// 検索実行
searchDir(target_dir);

// ファイルを再帰的に検索
function searchDir(dir) {
  const files = fs.readdirSync(dir); // ファイル一覧を取得
  files.forEach( (file) => {
    const fullpath = path.join(dir, file);
    const stat = fs.statSync(fullpath); // ファイルの状態を取得
    if (stat.isFile()) searchFile(dir, file); // ファイルなら検索処理
    if (stat.isDirectory()) searchDir(fullpath); //ディレクトリならさらに検索
  });
}

// ファイルを検索
function searchFile(dir, file) {
  // ファイル名にキーワードを含むか？
  if (file.indexOf(keyword) >= 0) {
    console.log("-", dir+"/"+file);
  }
}
