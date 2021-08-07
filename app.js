
const loadingBlockScreen = document.getElementById('loadingBlockScreen')

// firebase start
const firebaseConfig = {
    apiKey: "AIzaSyC4NwvR2uYMAMGZk4t-IntEm5-ezLY1Zw4",
    authDomain: "twitterclone-b8036.firebaseapp.com",
    databaseURL: "https://twitterclone-b8036-default-rtdb.firebaseio.com",
    projectId: "twitterclone-b8036",
    storageBucket: "twitterclone-b8036.appspot.com",
    messagingSenderId: "13930404191",
    appId: "1:13930404191:web:2c4f7c6f88c939c8e1feea",
    measurementId: "G-0NHX1DCGV0"
};
firebase.initializeApp(firebaseConfig);
var db = firebase.database()
var auth = firebase.auth()
var provider = new firebase.auth().signInAnonymously();

setTimeout(()=>{
    loadingBlockScreen.classList.add('hideLoading')
},3000);

// auth.signOut()
// firebase end

// vars start

var msgInput = document.getElementById('msgInput')
var sendBtn = document.getElementById('sendBtn')
var containerMiddle = document.getElementById('containerMiddle')
var topRight = document.getElementById('topRight')

var UData = {}
// vars end

auth.onAuthStateChanged((user)=>{
    if (user){
        topRight.innerHTML = user.displayName
        UData = user
    }




    if(!user){
        var userName = prompt('user name : ')
        var userPassword = prompt('password : ')
        provider.then(()=>{
            console.log('sgined in');
            firebase.auth().currentUser.updateProfile({
                displayName : userName,
                password : userPassword
            })
        })
    }
})




function deleteThis(id) {
    db.ref('chat').child(id).remove()
    containerMiddle.removeChild(document.getElementById(id))
}


db.ref('chat').on('child_added',(snap)=>{
    var deleteBtn = ''

    if (snap.val().UserId==UData.uid){
        deleteBtn = `<button id="delete" onclick='deleteThis("${snap.key}")'>delete</button>`
    }
    
    containerMiddle.innerHTML += `
    <div class="msg" id="${snap.key}">
        <div class="msgTop">
            <div class="msgName">${snap.val().name}</div>
            <div class="msgDate">${snap.val().date}</div>
        </div>
        <div class="msgBottom">
            ${snap.val().text}
        </div>
        ${deleteBtn}
    </div>
    `
    containerMiddle.scrollTop = containerMiddle.scrollHeight;

    
})

sendBtn.addEventListener('click',()=>{
    if (!msgInput.value==''){
        db.ref('chat').push({
            name : UData.displayName,
            date : new Date().toLocaleDateString(),
            text : msgInput.value,
            UserId : UData.uid
        })
    }
    msgInput.value = ''
})
