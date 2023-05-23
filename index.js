import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"

import {getDatabase, ref, push} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

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
   
    let endorsementObject = {
        personFrom: `${fromText}`,
        personTo: `${toText}`,
        endorsement: `${endorsementText}`
    }
    addEndorsementToFieldSection()
    // push(endorsementListDB, endorsementObject)

    clearInputFields()
})

// create function that pulls data from database and adds to the HTML feed section.
function addEndorsementToFieldSection(){
    feedSection.innerHTML += `
        <div class="endorsementBox">
            <h3 class="endorsement-to">To frank</h3>
            <p class="endorsement-text">lee was here last night and had a really good time. he want to play the play station all night long!!!</p>
            <div class="likes-section">
                <h3 class="endorsement-from">From Andy</h3>
                <p class="likes">Likes 0</p>
            </div>
        </div>
    
    `
}

function clearInputFields(){
    mainInputEl.value = ""
    fromInputEl.value = ""
    toInputEl.value = ""
}

