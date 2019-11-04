
// 1.Save クリックイベント
$("#save").on("click",function(){
    const key = $("#keyword").val();
    const category = $("#category").val();
    const memo = $("#memo").val();
    const datalist =[category,memo];
    // console.log(datalist);
    localStorage.setItem(key, JSON.stringify(datalist));
    const html = '<tr><th>'+key+'</th><td>'+category+'</td><td>'+memo+'</td></tr>';
    $("#list").append(html);
});

//2.clear クリックイベント
$("#clear").on("click",function(){
    localStorage.clear();
    $("#").empty();
    $("#key").val("");
    $("#memo").val("");
});

//3.ページ読み込み：保存データ取得表示
for(let i=0; i<localStorage.length;i++){
    const key = localStorage.key(i);
    const datalist_i = localStorage.getItem(key);
    const datalist = JSON.parse(datalist_i); 
    const category = datalist[0];
    const memo = datalist[1];
    const html = '<tr><th>'+key+'</th><td>'+category+'</td><td>'+memo+'</td></tr>';
    $("#list").append(html);
}