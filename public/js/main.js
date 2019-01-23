var currentMessage = "";

const words = [
"AUSTRIA","USA","CANADA","EGYPT","DENMARK","FINLAND","HUNGARY",
"POLAND","CZECH","RUSSIA","UKRAINE","VIETNAM","TAIWAN","JAPAN",
"CHINA","PERU","NETHERLANDS","KOREA","JAMAICA","MONACO","PORTUGAL"
];

const EMPTY = "_";
const STAR = "*";
let hangWord = "";
let visibleLetters = "";
const clickedCharacters = [];
let chances = 5;

function print(m, fast){
    m = replaceAll(m, " ", "_"); 
    m = m.toUpperCase();     
    
    if(fast === true) {
        setHistoryState(m);
        return;
    }    
    const TIMEOUT_MS = 100;        
    for(let i=0; i<=m.length;i++) {            
        pause(TIMEOUT_MS);      
        setHistoryState(m.substring(0, i));
    } 
    
    function setHistoryState(m) {   
        currentMessage = "?_" + m;
        history.replaceState(null, null, currentMessage);  
    }
    function replaceAll(str, a, b) {
        return str.split(a).join(b);
    }  
}



function onKeyPress(e) {
    var key = (e.key).toUpperCase();
    console.log(key);
    //setTimeout(()=>{ document.getElementById("key").innerHTML = key; },0);
    print("Pressed key: " + key, true);


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
        print("correct!", true); 
        visibleLetters += key;                    
    } else {
        chances--;  
        print("wrong!", true); 
    }

    let guess = getWord();
    //const addressBar = "?word="+ guess + "&hangman="+ drawGamer() + PLACE + "&leftAttempts="+chances;
    
    pause(1000);

    if(chances === 0) {
        print("You have lost!!! Hangword was: "+hangword+" "+drawGamer());   
       } else if (guess.indexOf(STAR) < 0) {
        print("You have won!!! Congratulations");
    } else {
        const word = getWord();
        const h = chances > 4 ? "" : "hangman:"+drawGamer(); 
        pause(1000); 
        if(match) {
            print("country: "+word+". "+ h); 
        } else {
            print("country: "+word+".Left chances:"+chances+". "+ h); 
        }  
    }
    
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

window.addEventListener("keydown", onKeyPress);

print("",true);

function start() {
    const randomNumber = Math.floor(Math.random() * words.length);
    hangWord = (words[randomNumber]).toUpperCase();
    console.log("Random hangword will be:"+hangWord);

    print("",true);
    print("HANGMAN IN THE ADDRESS BAR !");
    pause(2000);
    print("In this game You play against the address bar!");
    pause(1000);
    print("you can make "+chances+" wrong decisions till you hang");
    pause(1000);
    print("You are searching for a COUNTRY.");
    pause(1000);
    const w = getWord();
    print("country:"+w+". ___Type a character on your keyboard:");
}



