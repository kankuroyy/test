// オープニング
let msg_index = -1;
let msg = ['よくぞ参った。伝説の賢者の血を引くものよ。', 'おぬしも知っているようにこの世界を変える勇者が求められている', '伝説の賢者の血を引くものたちにギークの旅に出てもらうことなった。'];
$(window).bind('load',function(){
  next_message();
});

function push_message(tmp){
  if(tmp instanceof Array){
    for(i=0;i<tmp.length;i++){
      msg.push(tmp[i]);
    }
  }else{
    msg.push(tmp);
  }
}

function get_typing_message(msg){
  // 文字を１つずつ<span></span>で囲む
  output = "";
  msg.split('').forEach(function (c) {output += "<span>"+c+"</span>";});
  output += "<span> ▼</span>";
  $('.message-box-text').html(output);
  
  // 一文字ずつフェードインの時間をずらして表示
  $('.message-box-text').css({'opacity':1});
  var msg_num = $('.message-box-text').children().length;

  for (var i = 0; i < msg_num ; i++) {
    $('.message-box-text').children('span:eq('+i+')').delay(50*i).animate({'opacity':1},50);
  }
  setTimeout(function(){
    $('.message-box-text').children('span:eq('+(msg_num-1)+')').addClass('blinking');
  },(msg_num+5)*50);
}

function next_message(new_msg){
  if(new_msg)push_message(new_msg);//新しいメッセージが追加される場合
  if(msg_index==msg.length-1)return;//もうメッセージがないのに呼ばれたら終了
  msg_index++;
  var typing_message = get_typing_message(msg[msg_index]);//メッセージを装飾
  $('#message').html(typing_message);
}




let bull = new Object();
bull.x = 0;
bull.y = 0;
bull.move = 0;





$("#buffa").on("click",function(){
    bull.x +=32;
    console.log(bull.x);  
    let position = bull.x +'px';
    console.log(position);
    $("#buffa").css("left",position);
    // $("#buffa").css("left",`${bull.x}px`);
});



// let bull = document.getElementById('#buffa');
// $(window).load(function() {
//     let Offset = $('#buffa').offset();
//     console.log(Offset.left);   
//   });

// $("#buffa").on("click",function(){
//     let Offset = $('#buffa').offset();
//     $(Offset).css("left", +32);
//     // コンソールに表示
//     console.log(Offset.left);
// });

// $(bull).on("click",function(){
//     $("#buffa").css("left", +=10);
//     console.log(left);   
// })

// let masume = Math.floor(Math.random()*2+1);
// console.log(masume)