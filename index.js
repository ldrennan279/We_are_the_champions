import { v4 as uuidId} from "https://jspm.dev/uuid"

import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"

import {getDatabase, ref, push, onValue} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

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
let feedMessageId = uuidId()

publishBtnEl.addEventListener('click', ()=>{
    let endorsementText = mainInputEl.value
    let fromText = fromInputEl.value
    let toText = toInputEl.value
    
   
    if(endorsementText && fromText && toText){
       let endorsementObject = {
        uuid: `${feedMessageId}`,
        personFrom: `${fromText}`,
        personTo: `${toText}`,
        endorsement: `${endorsementText}`
        }
        push(endorsementListDB, endorsementObject) 
    }
    clearInputFields()
})

onValue(endorsementListDB,  function(snapshot){
    let endorsementArray = Object.values(snapshot.val())
    let endorsementArrayReverse = endorsementArray.reverse()
    feedSection.innerHTML = ""
    endorsementArrayReverse.forEach((item)=>{
          feedSection.innerHTML += `
            <div class="endorsementBox" >
                <h3 class="endorsement-to">${item.personTo}</h3>
                <p class="endorsement-text">${item.endorsement}</p>
                <div class="likes-section">
                    <h3 class="endorsement-from">${item.personFrom}</h3>
                    <p class="likes">
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="11" viewBox="0 0 24 24"><path d="M12 4.419c-2.826-5.695-11.999-4.064-11.999 3.27 0 7.27 9.903 10.938 11.999 15.311 2.096-4.373 12-8.041 12-15.311 0-7.327-9.17-8.972-12-3.27z" id="${item.uuid}" /></svg>
                        <span>0</span>
                    </p>
                </div>
            </div>
        
        `
    })
    })
    

document.addEventListener('click', (e)=>{
 
})

function clearInputFields(){
    mainInputEl.value = ""
    fromInputEl.value = ""
    toInputEl.value = ""
}

