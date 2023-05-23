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

onValue(endorsementListDB,  function(snapshot){
    let endorsementArray = Object.values(snapshot.val())
    endorsementArray.forEach((item)=>{
          feedSection.innerHTML += `
            <div class="endorsementBox">
                <h3 class="endorsement-to">${item.personTo}</h3>
                <p class="endorsement-text">${item.endorsement}</p>
                <div class="likes-section">
                    <h3 class="endorsement-from">${item.personFrom}</h3>
                    <p class="likes">Likes 0</p>
                </div>
            </div>
        
        `
    })
    })

publishBtnEl.addEventListener('click', ()=>{
    let endorsementText = mainInputEl.value
    let fromText = fromInputEl.value
    let toText = toInputEl.value
   
    if(endorsementText && fromText && toText){
       let endorsementObject = {
        personFrom: `${fromText}`,
        personTo: `${toText}`,
        endorsement: `${endorsementText}`
        }
        push(endorsementListDB, endorsementObject) 
    }
    
    clearInputFields()
})

function clearInputFields(){
    mainInputEl.value = ""
    fromInputEl.value = ""
    toInputEl.value = ""
}

