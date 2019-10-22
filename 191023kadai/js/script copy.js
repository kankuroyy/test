// canvasの設定
let canvas = document.getElementById('canvas');
canvas.width = 800;
canvas.height = 640;

// コンテキストの取得
let ctx = canvas.getContext('2d');

let background = new Image();
background.src = "img/map_trial2.png";
background.onload = function(){
    ctx.drawImage(background,0,0);
}

// マップの作成
let map = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],  
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,6,7,8,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,5,0,0,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,1,2,3,4,0,0,11,12,13,14,15,16,17,18,19,20,21,22,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,23,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,24,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,25,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,26,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,27,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,28,29,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,30,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,31,32,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,33,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,46,45,0,0,0,0,0,0,0,0,34,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,44,43,42,41,40,39,38,37,36,35,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]    
]

// {type: 'image', name:'map', src:'img/'}

// 正方形を書いてみる（テスト）
// ctx.fillRect(0, 0, 30, 30);

// 画像のオブジェクトを作成
let buffa = new Object();
buffa.img = new Image();
buffa.img.src = 'img/32buffalo.png';
buffa.x = 0;
buffa.y = 0;
buffa.move = 0;

// キーボードのオブジェクトです
let key = new Object();
key.up = false;
key.down = false;
key.right = false;
key.left = false;
key.push = '';

// メインループ
function main(){
    // 塗りつぶす色を決め、塗りつぶす
    // ctx.fillStyle = "rgb(0, 0, 0)";
    // ctx.fillRect(0, 0, 800, 640);

    // 画像を表示
    ctx.drawImage(buffa.img, buffa.x, buffa.y);

    addEventListener("keydown", keydownfunc, false);
    addEventListener("keyup", keyupfunc, false);

    // 方向キーが押されると移動
    if(buffa.move === 0){
        if(key.left === true){
            buffa.move = 32;
            key.push = 'left';
        }
        if(key.up === true){
            buffa.move = 32;
            key.push = 'up';
        }
        if(key.right === true){
            buffa.move = 32;
            key.push = 'right';
        }
        if(key.down === true){
            buffa.move = 32;
            key.push = 'down';
        }
    }
    // moveが０より大きい場合は、４pxずつ移動
    if(buffa.move > 0){
        buffa.move -= 4;
        if (key.push === 'left') buffa.x -= 4;
        if (key.push === 'up') buffa.y -= 4;
        if (key.push === 'right') buffa.x += 4;
        if (key.push === 'down') buffa.y += 4;
    }

    requestAnimationFrame( main );
}

// データが読み込まれたら画像を表示
addEventListener('load', main(),false);

// キーボードが押されると呼び出される関数
function keydownfunc(event){
    let key_code = event.keyCode;
    if(key_code === 37 ) key.left = true;
    if(key_code === 38 ) key.up = true;
    if(key_code === 39 ) key.right = true;
    if(key_code === 40 ) key.down = true;
    event.preventDefault();
}

// キーボードが離された時に呼び出される関数
function keyupfunc(event){
    let key_code = event.keyCode;
    if(key_code === 37 ) key.left = false;
    if(key_code === 38 ) key.up = false;
    if(key_code === 39 ) key.right = false;
    if(key_code === 40 ) key.down = false;
}

//配列 evt に ["イベント文字列",行くマス目] を登録
var evt = new Array();
evt[2]=['ジャンプで2マス進みます。貴方は4マス目にいます。',4];
evt[3]=['傘を忘れて2マス戻ります。貴方は1マス目にいます。',1];
evt[5]=['財布を落として1マス戻ります。貴方は4マス目にいます。',4];
evt[7]=['道草を食って1マス戻ります。貴方は6マス目にいます。',6];
evt[8]=['手袋を落として2マス戻ります。貴方は6マス目にいます。',6];
evt[9]=['居眠りをして2マス戻ります。貴方は7マス目にいます。',7];
evt[10]=['ドブに落ちて6マス戻ります。貴方は4マス目にいます。',4];
evt[11]=['電柱にぶつかって5マス戻ります。貴方は6マス目にいます。',6];
evt[12]=['喧嘩をして1マス戻ります。貴方は11マス目にいます。',11];
evt[13]=['コケて3マス戻ります。貴方は10マス目にいます。',10];
evt[14]=['滑って7マス戻ります。貴方は7マス目にいます。',7];
evt[15]=['バスに乗って2マス進みます。貴方は17マス目にいます。',17];
evt[18]=['靴を忘れてスタートに戻ります。貴方は0マス目にいます。',0];
evt[19]=['帽子を忘れて18マス戻ります。貴方は1マス目にいます。',1];
evt[20]=['下着を忘れてスタートに戻ります。貴方は0マス目にいます。',0];

