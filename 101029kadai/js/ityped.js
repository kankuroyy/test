import { init } from 'box_text3';
 
init(`#element`, {
  // required - for now, only accepting texts
    strings: ['Dead simple animated typing.', 'No dependencies'],
    //表示させる文字
    typeSpeed: 55, //default
    //表示する時のスピード
    backSpeed: 30, //default
    //戻る時のスピード
    startDelay: 500, //default
    //スタート時の遅延時間
    backDelay: 500, //default
    //戻る時の遅延時間
    loop: false, //default
    //ループの有無   
    showCursor: true, //default
    //カーソル表示の有無   
    cursorChar: "|", //default
    //カーソルの形状
    onFinished: function(){}
});