import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"

import {getDatabase, ref, push, onValue, update} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: 'https://we-are-the-champions-fe824-default-rtdb.europe-west1.firebasedatabase.app/'
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementListDB = ref(database, "endorsementList")

const mainInputEl = document.getElementById('main-input')
const fromInputEl = document.getElementById('from-input')
const toInputEl = document.getElementById('to-input')
const publishBtnEl = document.getElementById('publish-btn')
const feedSection = document.getElementById('feed_section')


publishBtnEl.addEventListener('click', ()=>{
    let endorsementText = mainInputEl.value
    let fromText = fromInputEl.value
    let toText = toInputEl.value
    
   
    if(endorsementText && fromText && toText){
       let endorsementObject = {
        personFrom: `${fromText}`,
        personTo: `${toText}`,
        endorsement: `${endorsementText}`,
        status: "true",
        totalLikes: 0
        }
        push(endorsementListDB, endorsementObject) 
    }
    clearInputFields()
})

onValue(endorsementListDB,  function(snapshot){
    let endorsementArray = Object.entries(snapshot.val())
    let endorsementArrayReverse = endorsementArray.reverse()
    console.log(endorsementArray)
    
    feedSection.innerHTML = ""
    function render(){
    endorsementArrayReverse.forEach((item)=>{
        let currentItemId = item[0]
        let currentItemvalue = item[1]
          feedSection.innerHTML += `
            <div class="endorsementBox" >
                <h3 class="endorsement-to">${currentItemvalue.personTo}</h3>
                <p class="endorsement-text">${currentItemvalue.endorsement}</p>
                <div class="likes-section">
                    <h3 class="endorsement-from">${currentItemvalue.personFrom}</h3>
                    <p class="likes">
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="11" viewBox="0 0 24 24"><path d="M12 4.419c-2.826-5.695-11.999-4.064-11.999 3.27 0 7.27 9.903 10.938 11.999 15.311 2.096-4.373 12-8.041 12-15.311 0-7.327-9.17-8.972-12-3.27z" data-like="${currentItemId}" /></svg>
                        <span>${currentItemvalue.totalLikes}</span>
                    </p>
                </div>
            </div>
        `
    })
}

render()



    document.addEventListener('click', (e)=>{
    if(e.target.dataset.like){
        handleLikeClicks(e.target.dataset.like)
    }
})

function handleLikeClicks(itemId){
    const like = endorsementArray.filter((endorsement)=>{
        return endorsement === itemId
    })[0]
    console.log(like)
    // if(like.status){
    //     like.totalLikes++
    //     like.status = false
    // } else {
    //     like.totalLikes--
    //     like.status = true
    // }
    
    // return update(ref(database, `endorsementList/${itemId}`), like)
    
}
})
    




function clearInputFields(){
    mainInputEl.value = ""
    fromInputEl.value = ""
    toInputEl.value = ""
}

