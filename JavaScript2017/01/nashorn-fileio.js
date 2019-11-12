// テキストをファイルに保存する
saveText("test.txt", 
    "泣くのに時があり\n笑うのに時がある",
    "UTF-8");
// ファイルからテキストを読む
var s = readText("test.txt", "UTF-8");
print(s);

// テキストを保存する関数を定義 --- (*1)
function saveText(fname, text, encoding) {
  var osw = new java.io.OutputStreamWriter(
      new java.io.FileOutputStream(fname), encoding);
  osw.write(text, 0, text.length);
  osw.close();
}

// テキストを読み込む関数を定義 --- (*2)
function readText(fname, encoding) {
  var r = new java.io.BufferedReader(
      new java.io.FileReader(fname));
  var res = "";
  for (;;) {
    var line = r.readLine();
    if (line == null) break;
    res += line + "\n";
  }
  return "" + res;
}
