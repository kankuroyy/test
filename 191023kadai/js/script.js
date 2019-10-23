
// ★★じゃんけんゲーム
let pc = "#pc_hands";
let jud = "#judgment";

let win = "勝ち";
let drw = "引き分け";
let def = "負け";

let cho = "チョキ";
let guu = "グー";
let par = "パー";

// // 勝利数のカウント。連続して勝つとイベント(サイコロ)移行したい
// let WinMe = 0, WinCom = 0;
// 累計ポイントの数字。スゴロクで活用できたら。
let PointMe = 0,PointCom = 0;
let NowMe = 0, NowCom = 0;


// じゃんけん選ぶ
// ぐーの時
$("#gu_btn").on("click", function(){
  const r = Math.floor(Math.random()*3); 
  console.log(r);
  if(r == 0){
    $(pc).html(guu);
    $(jud).html(drw);
    $(jud).css("color", "gray");

    PointMe += 25, PointCom += 25;
    console.log(PointMe, PointCom);
  }
  if(r == 1){
    $(pc).html(cho);
    $(jud).html(win);
    $(jud).css("color", "red");

    PointMe += 50;
    console.log(PointMe);
  }

  if(r == 2){
    $(pc).html(par);
    $(jud).html(def);
    $(jud).css("color", "#0000ff");

    PointCom += 50;
    console.log(PointCom);
  }

  $("#Point01").html(PointMe);
  $("#Point02").html(PointCom);

  if(PointMe >= 100){
      // PointMe -= 100;
      alert("100ptで１回サイコロが振れます！");
      // return PointMe;
      let field = document.getElementById('btn_start');
      // alert("有効化");
      field.removeAttribute("disabled");
    }

  if(PointCom >= 100){
    alert("Comがサイコロを振ります！");
    const sainomeCom = Math. ceil(Math.random()*6); 
    console.log(sainomeCom);
    NowCom = NowCom + sainomeCom;
    console.log(NowCom);

    $("#dice_num").html(sainomeCom);
    $("#MasumeCom").html(NowCom);

    if(sainomeCom == 1){
      $('#dice_me').attr('src',"/img/1.png");
      kab.x +=32;
      console.log(kab.x);  
      let position = kab.x +'px';
      console.log(position);
      $("#kaba").css("left",position);
    }
    if(sainomeCom == 2){
      $('#dice_me').attr('src',"/img/2.png");
      kab.x +=64;
      console.log(kab.x);  
      let position = kab.x +'px';
      console.log(position);
      $("#kaba").css("left",position);
    }if(sainomeCom == 3){
      $('#dice_me').attr('src',"/img/3.png");
      kab.x +=(3*32);
      console.log(kab.x);  
      let position = kab.x +'px';
      console.log(position);
      $("#kaba").css("left",position);
    }if(sainomeCom == 4){
      $('#dice_me').attr('src',"/img/4.png");
      kab.x +=(4*32);
      console.log(kab.x);  
      let position = kab.x +'px';
      console.log(position);
      $("#kaba").css("left",position);
    }if(sainomeCom == 5){
      $('#dice_me').attr('src',"/img/5.png");
      kab.x +=(5*32);
      console.log(kab.x);  
      let position = kab.x +'px';
      console.log(position);
      $("#kaba").css("left",position);
    }if(sainomeCom == 6){
      $('#dice_me').attr('src',"/img/6.png");
      kab.x +=(6*32);
      console.log(kab.x);  
      let position = kab.x +'px';
      console.log(position);
      $("#kaba").css("left",position);
    }


    PointCom -= 100;
    console.log(PointCom);

    $("#Point02").html(PointCom);
    console.log(PointCom);
  }

})
// チョキのとき
$("#cho_btn").on("click", function(){
  const r = Math.floor(Math.random()*3); 
  console.log(r);
  if(r == 0){
    $(pc).html(guu);
    $(jud).html(def);
    $(jud).css("color", "#0000ff");

    PointCom += 50;
    console.log(PointCom);
  }
  if(r == 1){
    $(pc).html(cho);
    $(jud).html(drw);
    $(jud).css("color", "gray");

    PointMe += 25, PointCom += 25;
    console.log(PointMe, PointCom);
  }
  if(r == 2){
    $(pc).html(par);
    $(jud).html(win);
    $(jud).css("color", "red");

    PointMe += 50;
    console.log(PointMe);
  }

  $("#Point01").html(PointMe);
  $("#Point02").html(PointCom);

  if(PointMe >= 100){
      // PointMe -= 100;
      alert("100ptで１回サイコロが振れます！");
      // return PointMe;
      let field = document.getElementById('btn_start');
      // alert("有効化");
      field.removeAttribute("disabled");
    }

  if(PointCom >= 100){
    alert("Comがサイコロを振ります！");
    const sainomeCom = Math. ceil(Math.random()*6); 
    console.log(sainomeCom);
    NowCom = NowCom + sainomeCom;
    console.log(NowCom);

    $("#dice_num").html(sainomeCom);
    $("#MasumeCom").html(NowCom);

    PointCom -= 100;
    console.log(PointCom);

    if(sainomeCom == 1){
      $('#dice_me').attr('src',"/img/1.png");
      kab.x +=32;
      console.log(kab.x);  
      let position = kab.x +'px';
      console.log(position);
      $("#kaba").css("left",position);
    }
    if(sainomeCom == 2){
      $('#dice_me').attr('src',"/img/2.png");
      kab.x +=64;
      console.log(kab.x);  
      let position = kab.x +'px';
      console.log(position);
      $("#kaba").css("left",position);
    }if(sainomeCom == 3){
      $('#dice_me').attr('src',"/img/3.png");
      kab.x +=(3*32);
      console.log(kab.x);  
      let position = kab.x +'px';
      console.log(position);
      $("#kaba").css("left",position);
    }if(sainomeCom == 4){
      $('#dice_me').attr('src',"/img/4.png");
      kab.x +=(4*32);
      console.log(kab.x);  
      let position = kab.x +'px';
      console.log(position);
      $("#kaba").css("left",position);
    }if(sainomeCom == 5){
      $('#dice_me').attr('src',"/img/5.png");
      kab.x +=(5*32);
      console.log(kab.x);  
      let position = kab.x +'px';
      console.log(position);
      $("#kaba").css("left",position);
    }if(sainomeCom == 6){
      $('#dice_me').attr('src',"/img/6.png");
      kab.x +=(6*32);
      console.log(kab.x);  
      let position = kab.x +'px';
      console.log(position);
      $("#kaba").css("left",position);
    }


    $("#Point02").html(PointCom);
    console.log(PointCom);
  }
})

// パーのとき
$("#par_btn").on("click", function(){
  const r = Math.floor(Math.random()*3); 
  console.log(r);
  if(r == 0){
    $(pc).html(guu);
    $(jud).html(win);
    $(jud).css("color", "red");

    PointMe += 50;
    console.log(PointMe);
  }
  if(r == 1){
    $(pc).html(cho);
    $(jud).html( def);
    $(jud).css("color", "#0000ff");

    PointCom += 50;
    console.log(PointCom);
  }
  if(r == 2){
    $(pc).html(par);
    $(jud).html(drw);
    $(jud).css("color", "gray");

    PointMe += 25, PointCom += 25;
    console.log(PointMe, PointCom);
  }

  $("#Point01").html(PointMe);
  $("#Point02").html(PointCom);

  if(PointMe >= 100){
      // PointMe -= 100;
      alert("100ptで１回サイコロが振れます！");
      let field = document.getElementById('btn_start');
      // alert("有効化");
      field.removeAttribute("disabled");
    }

  if(PointCom >= 100){
    alert("Comがサイコロを振ります！");
    clearTimeout(timer);
    const sainomeCom = Math. ceil(Math.random()*6); 
    console.log(sainomeCom);
    NowCom = NowCom + sainomeCom;
    console.log(NowCom);

    if(sainomeCom == 1){
      $('#dice_me').attr('src',"/img/1.png");
      kab.x +=32;
      console.log(kab.x);  
      let position = kab.x +'px';
      console.log(position);
      $("#kaba").css("left",position);
    }
    if(sainomeCom == 2){
      $('#dice_me').attr('src',"/img/2.png");
      kab.x +=64;
      console.log(kab.x);  
      let position = kab.x +'px';
      console.log(position);
      $("#kaba").css("left",position);
    }if(sainomeCom == 3){
      $('#dice_me').attr('src',"/img/3.png");
      kab.x +=(3*32);
      console.log(kab.x);  
      let position = kab.x +'px';
      console.log(position);
      $("#kaba").css("left",position);
    }if(sainomeCom == 4){
      $('#dice_me').attr('src',"/img/4.png");
      kab.x +=(4*32);
      console.log(kab.x);  
      let position = kab.x +'px';
      console.log(position);
      $("#kaba").css("left",position);
    }if(sainomeCom == 5){
      $('#dice_me').attr('src',"/img/5.png");
      kab.x +=(5*32);
      console.log(kab.x);  
      let position = kab.x +'px';
      console.log(position);
      $("#kaba").css("left",position);
    }if(sainomeCom == 6){
      $('#dice_me').attr('src',"/img/6.png");
      kab.x +=(6*32);
      console.log(kab.x);  
      let position = kab.x +'px';
      console.log(position);
      $("#kaba").css("left",position);
    }

    $("#dice_num").html(sainomeCom);
    $("#MasumeCom").html(NowCom);

    PointCom -= 100;
    console.log(PointCom);

    $("#Point02").html(PointCom);
    console.log(PointCom);
  }
})


// ★★サイコロゲーム

let bull = new Object();
bull.x = 60;
bull.y = 170;
bull.move = 0;

$("#buffa").on("click",function(){
    bull.x +=32;
    console.log(bull.x);  
    let position = bull.x +'px';
    console.log(position);
    $("#buffa").css("left",position);
    // $("#buffa").css("left",`${bull.x}px`);
})

let kab = new Object();
kab.x = 60;
kab.y = 138;
kab.move = 0;

$("#kaba").on("click",function(){
    kab.x +=32;
    console.log(kab.x);  
    let position = kab.x +'px';
    console.log(position);
    $("#kaba").css("left",position);
    // $("#buffa").css("left",`${bull.x}px`);
})

// 初期設定としてサイコロがぐるぐるしている状態を作る
let timer = 0;
function dice_guruguru(){
  let guruguru = Math.ceil(Math.random()*6); 
    if(guruguru == 1){
      $('#dice_me').attr('src','/img/1.png');
    }
    if(guruguru == 2){
      $('#dice_me').attr('src','/img/2.png');
    }if(guruguru == 3){
      $('#dice_me').attr('src','/img/3.png');
    }if(guruguru == 4){
      $('#dice_me').attr('src','/img/4.png');
    }if(guruguru == 5){
      $('#dice_me').attr('src','/img/5.png');
    }if(guruguru == 6){
      $('#dice_me').attr('src','/img/6.png');
    }
    timer = setTimeout(dice_guruguru,100);
}

dice_guruguru();


// クリック後、自分の際の目を表示させ、合計する
$("#dice_start").on("click", function(){
  clearTimeout(timer);
  const sainome = Math.ceil(Math.random()*6); 
  console.log(sainome);
  NowMe = NowMe + sainome;
  console.log(NowMe);

  if(sainome == 1){
    $('#dice_me').attr('src',"/img/1.png");
    bull.x +=32;
    console.log(bull.x);  
    let position = bull.x +'px';
    console.log(position);
    $("#buffa").css("left",position);
  }
  if(sainome == 2){
    $('#dice_me').attr('src',"/img/2.png");
    bull.x +=64;
    console.log(bull.x);  
    let position = bull.x +'px';
    console.log(position);
    $("#buffa").css("left",position);
  }if(sainome == 3){
    $('#dice_me').attr('src',"/img/3.png");
    bull.x +=96;
    console.log(bull.x);  
    let position = bull.x +'px';
    console.log(position);
    $("#buffa").css("left",position);
  }if(sainome == 4){
    $('#dice_me').attr('src',"/img/4.png");
    bull.x +=128;
    console.log(bull.x);  
    let position = bull.x +'px';
    console.log(position);
    $("#buffa").css("left",position);
  }if(sainome == 5){
    $('#dice_me').attr('src',"/img/5.png");
    bull.x +=160;
    console.log(bull.x);  
    let position = bull.x +'px';
    console.log(position);
    $("#buffa").css("left",position);
  }if(sainome == 6){
    $('#dice_me').attr('src',"/img/6.png");
    bull.x +=192;
    console.log(bull.x);  
    let position = bull.x +'px';
    console.log(position);
    $("#buffa").css("left",position);
  }

  $("#dice_num").html(sainome);
  $("#MasumeMe").html(NowMe);
  
  PointMe -= 100;
  console.log(PointMe);

  let field = document.getElementById('btn_start');
  // alert("無効化")
  field.setAttribute("disabled", "disabled");

  $("#Point01").html(PointMe);
  console.log(PointMe);

    // let n;
    // if(bull.x == n*32+60){
    //   alert('n + "升目"');
    // }

    if(bull.x >= 700){
      goalin();
      console.log(bull.x);
    }
    if(kab.x >= 700){
      goalin();
      console.log(kab.x);
    }
    
    function goalin() {
        alert("ゴール！！おめでとうございます！");
        restart();
    }

    check_event();
    })

    function check_event(){
    // if(bull.x == (32+60)){
    // alert("IDカードを忘れる。1マス戻る");
    // bull.x -=32;
    // console.log(bull.x);  
    // let position = bull.x +'px';
    // $("#buffa").css("left",position);
    // // １升目
    // }

    // if(bull.x == (32*2)+60){
    // alert("課題提出の朝。まだ終わらない。しかもgitの扱いが不安。１マス戻る");
    // bull.x -=32;
    // console.log(bull.x);  
    // let position = bull.x +'px';
    // $("#buffa").css("left",position);
    // }

    // 2升目
    // if(bull.x == (32*3)+60){
    // alert("課題が仕上がる。気分良くHP回復。３マス進む");
    // bull.x +=96;
    // console.log(bull.x);  
    // let position = bull.x +'px';
    // $("#buffa").css("left",position);
    // //3升目
    // }
    
    if(bull.x == (32*4)+60){
    alert("バグの原因が見つからない。イライラ。１回休み");
    bull.x -=96;
    console.log(bull.x);  
    let position = bull.x +'px';
    $("#buffa").css("left",position);
    // 4升目
    }
    
    if(bull.x == (32*5)+60){
    alert("「P2P!」と連呼する。モチベーションが上がって３マス進む");
    bull.x +=96;
    console.log(bull.x);  
    let position = bull.x +'px';
    $("#buffa").css("left",position);
    // 5升目
    }
    
    if(bull.x == (32*6)+60){
    alert("「横を見るな、縦を見ろ」とつぶやいて自分を鼓舞する。３マス進む");
    bull.x +=96;
    console.log(bull.x);  
    let position = bull.x +'px';
    $("#buffa").css("left",position);
    // 6升目
    }

    if(bull.x == (32*7)+60){
      alert("「P2P!」と連呼する。モチベーションが上がって３マス進む");
      bull.x +=96;
      console.log(bull.x);  
      let position = bull.x +'px';
      $("#buffa").css("left",position);
    }
    // if(bull.x == (32*8)+60){
    //   alert("チューターの鋭いアドバイスに尊敬の念。頑張るぞ。３マス進む");
    //   bull.x +=96;
    //   console.log(bull.x);  
    //   let position = bull.x +'px';
    //   $("#buffa").css("left",position);
    // }
    // if(bull.x == (32*9)+60){
    //   alert("「P2P!」と連呼する。モチベーションが上がって３マス進む");
    //   bull.x +=96;
    //   console.log(bull.x);  
    //   let position = bull.x +'px';
    //   $("#buffa").css("left",position);
    // }

    if(bull.x == (32*10)+60){
      alert("チューターの鋭いアドバイスに尊敬の念。頑張るぞ。３マス進む");
      bull.x +=96;
      console.log(bull.x);  
      let position = bull.x +'px';
      $("#buffa").css("left",position);
    }
    // if(bull.x == (32*11)+60){
    //   alert("バグの原因が見つからない。イライラ。３マス戻る");
    //   bull.x -=96;
    //   console.log(bull.x);  
    //   let position = bull.x +'px';
    //   $("#buffa").css("left",position);
    // }
    if(bull.x == (32*12)+60){
      alert("「P2P!」と連呼する。モチベーションが上がって３マス進む");
      bull.x +=96;
      console.log(bull.x);  
      let position = bull.x +'px';
      $("#buffa").css("left",position);
    }
    // if(bull.x == (32*13)+60){
    // alert("紹介されたウェブサイトがヤバくてやる気がアップ。３進む");
    // bull.x +=96;
    // console.log(bull.x);  
    // let position = bull.x +'px';
    // $("#buffa").css("left",position);
    // }
    if(bull.x == (32*14)+60){
      alert("バグの原因が見つからない。イライラ。３マス戻る");
      bull.x -=96;
      console.log(bull.x);  
      let position = bull.x +'px';
      $("#buffa").css("left",position);
    }
    if(bull.x == (32*15)+60){
    alert("ハロウィーン準備で徹夜。１回休み");
    }
    // if(bull.x == (32*16)+60){
    //   alert("「横を見るな、縦を見ろ」とつぶやいて自分を鼓舞する。３マス進む");
    //   bull.x +=96;
    //   console.log(bull.x);  
    //   let position = bull.x +'px';
    //   $("#buffa").css("left",position);
    // }
    if(bull.x == (32*17)+60){
      alert("「横を見るな、縦を見ろ」とつぶやいて自分を鼓舞する。３マス進む");
      bull.x +=96;
      console.log(bull.x);  
      let position = bull.x +'px';
      $("#buffa").css("left",position);
    }
    // if(bull.x == (32*18)+60){
    //   alert("あと少し！");
    
      // 
    if(bull.x == (32*19)+60){
      alert("バグの原因が見つからない。イライラ。３マス戻る");
      bull.x -=96;
      console.log(bull.x);  
      let position = bull.x +'px';
      $("#buffa").css("left",position);
    }
}

