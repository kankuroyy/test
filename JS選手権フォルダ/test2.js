let config = {
    apiKey: "AIzaSyDHCI9HelAf6SLGaO8BCrm4f20TvFeyhlU",
    authDomain: "labs-2e127.firebaseapp.com",
    databaseURL: "https://labs-2e127.firebaseio.com",
    projectId: "labs-2e127",
    storageBucket: "labs-2e127.appspot.com",
    messagingSenderId: "746225726271",
    appId: "1:746225726271:web:5590c90b37a9c2b87b198a"
};
firebase.initializeApp(config);

const form = document.querySelector('form');
const setfile = document.getElementById("setFile");
const storage = firebase.storage();
const imgSample = document.getElementById("imgSample");

let file_name;
let blob;

// setfileの変更で処理開始
setfile.addEventListener("change", e => {
    let file = e.target.files;
    file_name = file[0].name;
    blob = new Blob(file, { type: "image/jpeg" });
    console.warn(blob);
});

// submitで処理開始
form.addEventListener('submit', e => {
    e.preventDefault();

    let uploadRef = storage.ref('images/').child(file_name);
    uploadRef.put(blob).then(snapshot => {
    console.log(snapshot.state);
        uploadRef.getDownloadURL().then(url => {
            imgSample.style.backgroundImage = "url("+url+")";
        }).catch(error => {
        console.log(error);
        });
    });
    file_name = '';
    blob = '';
});