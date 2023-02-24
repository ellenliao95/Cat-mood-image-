// use import and export to cash other js files data to use 
import { catsData } from '/data.js'

// connect with HTML 
const getImageBtn = document.getElementById("get-image-btn")
const emotionRadios = document.getElementById("emotion-radios")
const gifsOnlyOption = document.getElementById("gifs-only-option")
const memeModal = document.getElementById("meme-modal")
const memeModalInner = document.getElementById("meme-modal-inner")
const memeModalCloseBtn = document.getElementById("meme-modal-close-btn")

emotionRadios.addEventListener("change", highlightCheckedOption)
getImageBtn.addEventListener("click", renderCat)
memeModalCloseBtn.addEventListener("click", closeBrowser)


function closeBrowser(){
    memeModal.style.display = "none"
}

// click radio then highlight line and selected box
function highlightCheckedOption(e){
    const radios = document.getElementsByClassName("radio")
    for(let radio of radios){
        radio.classList.remove("highlight")
    }
    document.getElementById(e.target.id).parentElement.classList.add("highlight") 
}

function getMatchingCatArray(){
    // if select the emotion array then run the name 
    if(document.querySelector('input[type="radio"]:checked')){
        
        // save the checked radio value
        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value
        // boolean for  Gifs checkbox
        const isGif = gifsOnlyOption.checked // Gif img btn

        // 當選中一個emotion時，顯示出所有有該emotions的貓
        const matchingCatArray = catsData.filter(function(cats){
            if (isGif === true && selectedEmotion === true){
                return cats.emotionTags.includes(selectedEmotion) 
            }else {
               return cats.emotionTags.includes(selectedEmotion)
            }
        })
       return matchingCatArray
    }
}

// 抓取每個貓自己的資料，提供給renderCat()使用
function getSingleCatObject(){
    const catsArray = getMatchingCatArray()
    if(catsArray.length === 1){
        return catsArray[0]
    }else{
        const random = Math.floor(Math.random() * catsArray.length)
        return catsArray[random]
    }
}

// run cat image
function renderCat(){
    const catObject = getSingleCatObject()
    memeModalInner.innerHTML = `
    <img 
        class = "cat-img"
        src = "./images/${catObject.image}"
        arl = "${catObject.alt}"
    >
    `
    memeModal.style.display = "flex"
}

// not duplicate emotion 
function getEmotionsArray(catsData){
    const newArray = []
    for (let cat of catsData){
        for(let emotion of cat.emotionTags){
            if(!newArray.includes(emotion)){
                newArray.push(emotion)
            }
        }
    }
    return newArray
}

// create emotion radios to innerHTML
function radioEmotionArray(catsData){
    const emotions = getEmotionsArray(catsData)
    let radioEmotion = " "
    for(let emotion of emotions){
        radioEmotion += `
        <div class="radio">
        <label for="${emotion}">${emotion}</label>
        <input type="radio" name="radioEmotion" 
        id="${emotion}" 
        value="${emotion}">
        </div>
        `
    }
    emotionRadios.innerHTML = radioEmotion
}
radioEmotionArray(catsData)
