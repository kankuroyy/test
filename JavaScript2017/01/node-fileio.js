const fs = require('fs')
// テキストをファイルに保存する
fs.writeFileSync("test.txt", 
    "泣くのに時があり\n笑うのに時がある",
    "UTF-8");
// ファイルからテキストを読む
var s = fs.readFileSync("test.txt", "UTF-8")
console.log(s)
