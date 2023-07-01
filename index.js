import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"

import {getDatabase, ref, push, onValue, update, get} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

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
        totalLikes: 0,
        heartStatus: ""
        }
        push(endorsementListDB, endorsementObject) 
    }
    clearInputFields()
})

onValue(endorsementListDB,  function(snapshot){
    let endorsementArray = Object.entries(snapshot.val())
    let endorsementArrayReverse = endorsementArray.reverse()
    
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
                        <i class="fa-solid fa-heart heart ${currentItemvalue.heartStatus}" id="${currentItemId}"></i>
                        <span>${currentItemvalue.totalLikes}</span>
                    </p>
                </div>
            </div>
        `
    })
    const nameInLights = document.getElementById("name-in-lights")
    const array = endorsementArrayReverse[0]
    const rockStar = array[1]
    nameInLights.innerHTML = `
        <H2>Today's Rock Stars</H2>
        <img src="images/Magic_Hearts_Gif_Animation.gif" alt="">
        <h3 class="name-in-lights-name">${rockStar.personTo}<h3>
        <p class="name-in-lights-like">
            ${rockStar.endorsement}
        </p>
        <h2>From ${rockStar.personFrom}</h2>
    `

}
render()
})


document.addEventListener('click', (e)=>{
    if(e.target.id){
        handleLikeClicks(e.target.id)
    }
})

function handleLikeClicks(itemId) {
    const itemRef = ref(database, `endorsementList/${itemId}`);
    

    get(itemRef).then((snapshot) => {
        const currentLikes = snapshot.val().totalLikes;
        const objectDetails = snapshot.val();

        if (objectDetails.status) {
            update(itemRef, {
                status: false,
                totalLikes: currentLikes + 1,
                heartStatus: "liked"
            })
            document.getElementById(itemId).classList.add("liked")
        } else {
            update(itemRef, {
                status: true,
                totalLikes: currentLikes - 1,
                heartStatus: ""
            });
        }
    });
}



function clearInputFields(){
    mainInputEl.value = ""
    fromInputEl.value = ""
    toInputEl.value = ""
}