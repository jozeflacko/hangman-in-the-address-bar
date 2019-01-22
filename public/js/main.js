const EMPTY = "_";
const STAR = "*";

const words = [
    "vacuum cleaner",
    "hotline",
    "katholic church",
    "city center",
    "portfolio",
    "Have a nice day"
];

let hangWord = "";
let visibleLetters = "";
const clickedCharacters = [];
let chances = 5;


function setup() {
    const randomNumber = Math.floor(Math.random() * words.length);
    hangWord = (words[randomNumber]).toUpperCase();
    setOutput();
    installClickOnCharacters();

    console.log(hangWord);
    setTimeout(()=>{
        setIntoAddressBar("");
    },500);
}

function setOutput() {
    let guess = "";
    for(let i=0; i<hangWord.length; i++) {
        const expectedLetter = hangWord.charAt(i);
        
        if(visibleLetters.indexOf(expectedLetter) > -1) {
            guess += expectedLetter;
        } else if(expectedLetter === " ") {
            guess += EMPTY;
        } else {
            guess += STAR;
        }
        
    }
    const PLACE ="___";
    const addressBar = "?word="+ guess + "&hangman="+ drawGamer() + PLACE + "&leftAttempts="+chances;
    
    if(chances === 0) {
        setIntoAddressBar(addressBar+"...You_lost!!!");
    } else if (guess.indexOf(STAR) < 0) {
        setIntoAddressBar(addressBar+"...You_won!!!");
    } else {
        setIntoAddressBar(addressBar);
    }
    createZoom();    
}

function setIntoAddressBar(what) {
    history.replaceState(null, null, what);

    
}

function setStatus(correct) {
      
    const s = correct ? "Correct!" : "Wrong!";
    document.getElementById("game-status").innerHTML = s;    
}

function createZoom() {
    const url = location.href;



    document.getElementById("zoom").innerHTML = url;
}

function drawGamer() {
    if(chances === 0) {
        return "L_o!<";
    } else if(chances === 1) {
        return "L_o!-";
    } else if(chances === 2) {
        return "L_o!";
    } else if(chances === 3) {
        return "L_o,";
    } else if(chances === 4) {
        return "L_o";
    } else {
        return "";
    }
}

function characterClickEvent(character) {   
    if(character.classList.contains("clicked") === false) {
        const value = character.innerHTML;
        clickedCharacters.push(value);
        character.classList.add("clicked");
        if(hangWord.indexOf(value) > -1) {
            character.classList.add("correct");
            setStatus(true);
            visibleLetters += value;                    
        } else {
            chances--;     
            setStatus(false);   
        }
        setOutput();
    }    
}

function installClickOnCharacters() {
    const characters = document.getElementsByClassName("character");
    for(let i=0; i<characters.length; i++) { 
        characters[i].addEventListener("click", () => { characterClickEvent(characters[i]) });
    }
}

(function startGame() {
    setup();
})();



