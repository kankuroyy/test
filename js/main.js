// jsを記述する際はここに記載していく
$(document).ready(function(){
    $('.yoko_about').bxSlider();
  });

// P2Pトライ 
$(function(){
  
  $(window).scroll(function(){ //スクロールイベント 

      var y = jQuery(this).scrollTop(); //基本スクロール量  
      var sc = y / 1000; //●でスクロール量を割る  
      var c = Math.floor(sc); //端数を切り落としで、数値を単純化  
        
      switch(c){  
          
          case 0:  
          $(".appear").fadeOut();  
          $(".txt1").fadeOut();  
          break;  

          case 1:  
          $(".appear").fadeIn();
          $(".txt1").fadeIn();  
          $(".txt2").fadeOut(); 
          $(".txt3").fadeOut(); 
          $(".txt4").fadeOut();    
          break;  

          case 2:  
          $(".txt1").fadeOut(0);  
          $(".txt2").delay(2).fadeIn();  
          $(".txt3").fadeOut(); 
          $(".txt4").fadeOut();  
          break;  
            
          case 3:  
          $(".txt2").fadeOut(0);  
          $(".txt3").delay(2).fadeIn();  
          $(".txt4").fadeOut(); 
          break;  
            
          case 4:  
          $(".txt3").fadeOut(0);  
          $(".txt4").delay(2).fadeIn();  
          break;  

          default:  
          $(".appear").fadeOut();  
          $(".txt1").fadeOut();  
      }  
        
  });  
  
});  

var _window = $(window),
    _header = $('#header'),
    MVBottom;
 
_window.on('scroll',function(){     
    MVBottom = $('.main_visual').height();
    if(_window.scrollTop() > MVBottom){
        _header.addClass('fixed');
        _header.addClass('transform');    
    }
    else{
        _header.removeClass('fixed'); 
        _header.removeClass('transform');   
    }
});
 
_window.trigger('scroll');


// $(function() {
//   $('yoko_about').slick({
//         infinite: true,
//         dots:true,
//         slidesToShow: 6,
//         slidesToScroll: 6,
//         responsive: [{
//              breakpoint: 768,
//                   settings: {
//                        slidesToShow: 3,
//                        slidesToScroll: 3,
//              }
//         },{
//              breakpoint: 480,
//                   settings: {
//                        slidesToShow: 2,
//                        slidesToScroll: 2,
//                   }
//              }
//         ]
//    });
// });

// メニューのフェードイン
