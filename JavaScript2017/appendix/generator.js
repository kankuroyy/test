<button id="btn">押して</button>
<script>
function* genMsg() {
  while (true) {
    alert("Hello!"); yield;
    alert("Hi!"); yield;
    alert("こんにちは!"); yield;
  }
}
let itr = genMsg();
let btn = document.getElementById("btn");
btn.onclick = () => itr.next();
</script>