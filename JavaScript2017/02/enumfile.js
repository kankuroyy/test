// ファイル一覧をテキストファイルに書き出すプログラム
// 出力ファイルの指定
const OUT_FILE = __dirname + "/files.txt";
// コマンドライン引数を得る
const args = process.argv;
const runtime = args.shift(), scriptname = args.shift();
const target_dir = args.shift();
const dir = (target_dir === undefined) ? "." : target_dir;
// ファイルの一覧を得る
const fs = require('fs');
const dir_list = fs.readdirSync(dir);
// ディレクトリを除外
const files = dir_list.filter(n=>fs.statSync(dir+"/"+n).isFile())
// テキストファイルに出力
const result = files.join("\r\n")
console.log(result)
fs.writeFileSync(OUT_FILE, result)
console.log("saved = " + OUT_FILE)
