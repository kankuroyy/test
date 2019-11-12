// テキストをファイルに保存する
saveText("test.txt", 
    "泣くのに時があり¥n笑うのに時がある",
    "UTF-8");
// ファイルからテキストを読む
var s = readText("test.txt", "UTF-8");
WScript.Echo(s);

// テキストを保存する関数を定義 --- (*1)
function saveText(fname, text, charset) {
  if (charset == undefined) {
    charset = "_autodetect_all";
  }
  var adTypeBinary = 1, adTypeText = 2;
  var adSaveCreateNotExist = 1, adSaveCreateOverWrite = 2;
  var adWriteLine = 1;
  var s = new ActiveXObject("ADODB.Stream");
  s.Type = adTypeText;
  s.charset = charset;
  s.Open();
  s.WriteText(text, adWriteLine);
  s.SaveToFile(fname, adSaveCreateOverWrite);
  s.Close();
}

// テキストを読み込む関数を定義 --- (*2)
function readText(fname, charset) {
  if (charset == undefined) {
    charset = "_autodetect_all";
  }
  var adTypeBinary = 1, adTypeText = 2;
  var adReadAll = -1,   adReadLine = -2;
  var s = new ActiveXObject("ADODB.Stream");
  s.Type = adTypeText;
  s.charset = charset;
  s.Open();
  s.LoadFromFile(fname);
  var text = s.ReadText(adReadAll);
  s.Close();
  return text;
}
