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