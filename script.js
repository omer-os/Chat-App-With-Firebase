var NAME = prompt('enter your name : ')
var TEXT = document.getElementById('text')
var sendBtn = document.getElementById('sendBtn')

TEXT =='' ? TEXT=

sendBtn.addEventListener('click',()=>{
    if (!TEXT.value==''){
        db.ref('room1').push().set({
            'name':NAME,
            'text':TEXT.value
        })
    }
    document.getElementById('chatSection').lastChild.scrollIntoView()
})

var deleteMsg = (msg)=>{
    db.ref('room1').child(msg).remove()
    
}

db.ref('room1').on('child_added',(snap)=>{
    
    var html = `
    <div class="Messege">
    <div>
    <div class="name">${snap.val()['name']} : </div>
    <div class="text">${snap.val()['text']}</div>
    </div>
    `
    if(snap.val()['name']==NAME){
        html+=`
        <button class='deleteBtn' onclick="deleteMsg('${snap.key}')">delete</button>
        `
    }
    html+='</div>'
    
    var newLi = document.createElement('div')
    newLi.id = snap.key
    newLi.innerHTML=html
    
    document.getElementById('chatSection').appendChild(newLi)
})



db.ref('room1').on('child_removed',(snap)=>{
    const deleteThis = document.getElementById(snap.key)
    document.getElementById('chatSection').removeChild(deleteThis)
})