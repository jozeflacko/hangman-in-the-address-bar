
var currentMessage = "";

const words = [
    "TOYOTA",
    "VOLKSWAGEN",
    "AUDI",
    "BMW",
    "PORSCHE",
    "SKODA",
    "KIA",
];

const EMPTY = "_";
const STAR = "*";
let hangWord = "";
let visibleLetters = "";
const clickedCharacters = [];
let chances = 5;

function print(m){
    const TIMEOUT_MS = 50;        
    for(let i=0; i<=m.length;i++) {            
        pause(TIMEOUT_MS);      
        setHistoryState(m.substring(0, i));
    }
    return TIMEOUT_MS * m.length;
}

function setHistoryState(m) {
    m = replaceAll(m, " ", "_"); 
    m = m.toUpperCase();     
    currentMessage = "?_" + m;
    history.replaceState(null, null, currentMessage);

    function replaceAll(str, a, b) {
        return str.split(a).join(b);
    }  
}

function onKeyPress(e) {
    var key = (e.key).toUpperCase()
    console.log(key);
    setHistoryState("Pressed key: " + key);



    evaluate(key);
}

function getWord() {
    var guess = "";
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
    return ">>"+guess+"<<";
}

function evaluate(key) {
    pause(500);
    clickedCharacters.push(key);
    const match = hangWord.indexOf(key) > -1;
    if(match) {
        print("correct!"); 
        visibleLetters += key;                    
    } else {
        chances--;  
        print("wrong!"); 
    }

    let guess = getWord();
    //const addressBar = "?word="+ guess + "&hangman="+ drawGamer() + PLACE + "&leftAttempts="+chances;
    
    pause(1000);

    if(chances === 0) {
        setHistoryState("You have lost!!! Hangword was: "+hangword);   
        alert("You lost!");
    } else if (guess.indexOf(STAR) < 0) {
        setHistoryState("You have won!!! Congratulations");
    } else {
        const word = getWord();
        if(match) {
            pause(1000);            
            print("word: "+word+". Keep going"); 
        } else {
            pause(1000);
            print("word: "+word+". Try again!"); 
        }  
    }
    
}

/*
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
*/
window.addEventListener("keydown", onKeyPress);

const randomNumber = Math.floor(Math.random() * words.length);
hangWord = (words[randomNumber]).toUpperCase();
console.log("Random hangword will be:"+hangWord);

setHistoryState("");
print("THIS IS A GAME: HANGMAN IN THE ADDRESS BAR !");
pause(1000);
print("You play against the address bar!");
pause(1000);
print("Amouth of your false attempts till you hang is "+chances+".");
pause(1000);
print("Your hangword has "+hangWord.length+" characters with blank spaces and it is a car brand.");
pause(1000);
print(getWord()+". Type 1 character on your keyboard:");



