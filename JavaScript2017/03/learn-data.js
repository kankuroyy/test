// synaptic.jsでデータを学習する

// synaptic.jsの取り込み
const synaptic = require('synaptic');
const Layer = synaptic.Layer;
const Network = synaptic.Network;
const Trainer = synaptic.Trainer;
// 各レイヤーを生成
const inputLayer = new Layer(2);
const hiddenLayer = new Layer(30);
const outputLayer = new Layer(2);
// レイヤーを接続しニューラルネットワークを構築
inputLayer.project(hiddenLayer);
hiddenLayer.project(outputLayer);
const bmi_network = new Network({
  input: inputLayer,
  hidden: [hiddenLayer],
  output: outputLayer
});

// 訓練データを読み込む
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('bmi.json'));
// 読み込んだデータを正規化する必要がある
// データを0-1の範囲に正規化する
let setInput = function(height, weight) {
  return [height / 200, weight / 100]
};
for (var i in data) {
  let v = data[i].input;
  data[i].input = setInput(v[0], v[1]);
}

// データを学習する
const trainer = new Trainer(bmi_network);
trainer.train(data, {
  rate: 0.2, iterations: 30, error: 0.1,
  shuffle: true, log: 1,
  cost: Trainer.cost.CROSS_ENTROPY
});

// データをテストする
test(150, 80);
test(190, 50);
test(160, 75);
test(170, 50);

// データをテストする関数
function test(height, weight) {
  const labels = ["普通", "肥満"];
  let n = bmi_network.activate(setInput(height, weight));
  let result = labels[argmax(n)];
  
  console.log("+ 身長:", height, "体重:", weight);
  console.log("| - 判定:", labels[argmax(n)]);
  console.log("| - 普通の可能性:", n[0]);
  console.log("| - 肥満の可能性:", n[1]);
}

// 配列nのうち最も大きな要素番号を返す
function argmax(n) {
  let v = Number.MIN_VALUE;
  let index = -1;
  for (let i = 0; i < n.length; i++) {
    if (v < n[i]) { index = i; v = n[i]; } 
  }
  return index;
}