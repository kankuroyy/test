// 2から100までの素数を調べるプログラム
function isPrime(n) {
  for (var i = 2; i < n; i++) {
    if (n % i == 0) return false;
  }
  return true;
}
function checkPrime() {
  var result = "";
  for (var i = 2; i < 100; i++) {
    if (isPrime(i)) {
      result += "[" + i + "]";
    }
  }
  return result;
}
alert("100以下の素数一覧=" + checkPrime());