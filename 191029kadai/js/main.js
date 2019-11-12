// 付箋エリア

$(function() {
    $('#new').click(function() {
      make();
      save();
    });
  
    $('#del').click(function() {
      $('.selected').remove();
      save();
    });
  
    function make() {
      let sticky = $('<div class="sticky">自由に移動、入力できます</div>');
      sticky.appendTo("#editor")
        .css('background-color', $('#color').val())
        .draggable({stop: save})
        .dblclick(function() {
          $(this).html('<textarea>' + $(this).html() + '</textarea>')
            .children()
            .focus()
            .blur(function() {
              $(this).parent().html($(this).val());
              save();
            });
        }).mousedown(function() {
          $('.sticky').removeClass('selected');
          $(this).addClass('selected');
        });
      return sticky;
    }
  
    function save() {
      let items = [];
      $('.sticky').each(function() {
        items.push({
          css: {
            left: $(this).css('left'),
            top: $(this).css('top'),
            backgroundColor: $(this).css('background-color')
          },
          html: $(this).html()
        });
      });
      localStorage.sticky = JSON.stringify(items);
    }
  
    function load() {
      if (!localStorage.sticky) return;
      let items = JSON.parse(localStorage.sticky);
      $.each(items, function(i, item) {
        make().css(item.css).html(item.html);
      });
    }
    load();
  });

// // サブエリア
// let content = 0;
// $(function(){
    // for(let key in localStorage){
    //     let arry = localStorage.getItem(key);
    //     console.log(arry);
    //     let arry = localStorage.getItem(key);
    //     let content = JSON.parse(arry);
    //     console.log(content);
    //     let rNo = Math.floor(Math.random()*arry.length) +1;
    //     }
    // }

//     console.log(content);
    
    
//     })


// 名言登録エリア
$(document).ready(function(){
    // 1.登録 クリックイベント
    $("#regist").on("click",function(){
        // keyを現在時間にする
        let time = new Date().getTime();
        // valueは名前、言葉、ジャンルの３つ
        let data = new Object();
        data.name = $("#name").val();
        data.category = $("#category").val();
        data.memo = $("#memo").val();
        let str = JSON.stringify(data);
        // ローカルストレージに保存
        localStorage.setItem(time, str);
        alert("登録しました");
        loadStorage();
        // // リストに追加表示させる
        // const html = '<tr><td>'+data.name+'</td><td>'+data.category+'</td><td>'+data.memo+'</td></tr>';
        // $("#list").append(html);
    });

    //2.clear クリックイベント
    $("#clear").on("click",function(){
        if(confirm("登録中の全データを消去してよろしいですか？")){
            localStorage.clear();
            alert("全てのデータを消去しました")
            loadStorage();
        }
        else{
            alert("キャンセルされました");
        }    
    });

    //3.ページ読み込み：保存データ取得表示
    function loadStorage(){
        $("#list tbody").empty();
        let rec = "";
        for (let i=0; i<localStorage.length; i++){
            let key = localStorage.key(i);
            let value = localStorage.getItem(key);
            let data = JSON.parse(value);
            let date = new Date();
            date.setTime(key);
            let dateStr = date.toDateString() + " " + date.toLocaleTimeString();
            console.dir(data,dateStr);

            rec += "<tr id='" + key + "'><td><button class='delete' href='#'>削除</button></td>";
            rec += "<td>" + data.name + "</td>";
            rec += "<td>" + data.memo + "</td>";
            rec += "<td>" + data.category+ "</td>"; 
            rec += "<td><time datetime='" + dateStr + "'>" + dateStr + "</time></td>";    
            rec += "</tr>";
            console.dir(rec);
        }
        $("#list tbody").append(rec);
        $('.delete').bind('click', delete_clickHandler);
    }

    // 削除処理
    function delete_clickHandler(evnet){
        let target = $(event.target).parents('tr').attr('id');
        localStorage.removeItem(target);
        alert("対象を削除しました");
        loadStorage;
    }

    loadStorage();
});



