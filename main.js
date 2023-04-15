let wrapper = document.querySelector(".wrapper"),
  searchInput = document.querySelector(".search input"),
  textInfo = document.querySelector(".text-info"),
  synonyms = document.querySelector(".synonyms .list"),
  clearBtn =  document.querySelector(".search .fa-xmark"),
  audioBtn = document.querySelector(".word i");

  let audio;


const data = (result, word) => {
  if (result.title) {
    textInfo.innerHTML = `Oops.! Can't find the meaning of '${word}'...`;
  } else {
    console.log(result);

    let def = result[0].meanings[0].definitions[0];

    document.querySelector(".word p").innerHTML = result[0].word;
    document.querySelector(".word span").innerHTML = `${result[0].meanings[0].partOfSpeech} ${result[0].phonetics[0].text}`;
    document.querySelector(".meaning span").innerHTML = def.definition;
    document.querySelector(".example span").innerHTML = def.example;

    audio = new Audio(result[0].phonetics[0].audio);

    let arrSyn = result[0].meanings[0].synonyms;
    
    synonyms.innerHTML = "";
    for (let x = 0; x < 5; x++) {
      if(arrSyn[x] == undefined){
        if(arrSyn[0] == undefined){
          synonyms.parentElement.style.display = "none";
        }
        break;
      }else{
        synonyms.parentElement.style.display = "block";
        let tag = `<span onclick=search('${arrSyn[x]}') >${arrSyn[x]}</span>, `;
        synonyms.insertAdjacentHTML("beforeend", tag);
      }
    }
    wrapper.classList.add("active");
  }
};

// Giving the user typed word 
// calling api will return a result and that result and word will pass the data function
const fetchAPi = (word) => {
  textInfo.style.color = "black";
  textInfo.innerHTML = `searching meaning of '${word}'...`;

  let API = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

  fetch(API)
    .then((res) => res.json())
    .then((result) => data(result, word));
};

// When the user type a word and press 'Enter'
searchInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter" && e.target.value != "") {
    fetchAPi(e.target.value);
  }
});

// Clear the input box
clearBtn.addEventListener('click',()=>{
  searchInput.value = "";
  searchInput.focus();
  wrapper.classList.remove("active");
})

// Pronuounce the word
audioBtn.addEventListener('click',()=>{
  audio.play();
})

// call the search function
const search = (word) =>{
  searchInput.value = word;
  fetchAPi(word);
}