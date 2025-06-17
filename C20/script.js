let input = document.getElementById("input");
let sentenceOutput = document.getElementById("sentence")
let startBtn = document.getElementById("start");
let stopBtn = document.getElementById("stop");
let restartBtn = document.getElementById("restart");
let minuteOutput = document.getElementById("mins");
let secondOutput = document.getElementById("secs");
let mSecondOutput = document.getElementById("msecs");

let backdrop = document.getElementById("backdrop");
let popupWrapper = document.getElementById("popup-wrapper");
let popup = document.getElementById("popup");
let analyzedSentence = document.getElementById("detail-sentence");

let timeResult = document.getElementById("time");
let wpmResult = document.getElementById("wpm");
let accuracyResult = document.getElementById("accuracy");

function generateSentence(){
    let wordList = [
        "hello", "world", "what", "how", "I", "not", "bad", "type", "need", "mad", "everytime", "mean", "it", "so", "drive", "you", 
        "even", "try", "nobody", "feel", "focus", "then", "now", "when", "nothing", "wrong", "something", "middle", "night", "bright", 
        "burn", "believe", "leave", "feel", "move", "care", "about", "still", "protect"
    ]

    let sentence = "";
    let sentenceLength = Math.floor(Math.random() * 10)+15;
    for(let i = 0; i < sentenceLength; i++){
        sentence += wordList[Math.floor(Math.random() * wordList.length)] + ((i < sentenceLength-1) ? " " : "");
    }
    return sentence;
}

let sentence = generateSentence();
sentenceOutput.innerText = sentence;
input.setAttribute("placeholder", sentence)

let intvlVar;
let mseconds, seconds, minutes, actualMS = 0;

startBtn.onclick = () => {
    if(intvlVar) return;
    actualMS = 0;
    wpmResult.innerText = "0";
    accuracyResult.innerText = "0%";
    mseconds = seconds = minutes = 0;
    intvlVar = setInterval(() => {
        if(mseconds === 99){
            mseconds = 0;
            seconds++;
        } else if(seconds === 59){
            seconds = 0;
            minutes++;
        } else{
            mseconds++;
        }
        minuteOutput.innerText = (minutes < 10) ? "0" + minutes : minutes;
        secondOutput.innerText = (seconds < 10) ? "0" + seconds : seconds;
        mSecondOutput.innerText = (mseconds < 10) ? "0" + mseconds : mseconds;
        actualMS += 10;
    }, 10)
    input.focus();
}

stopBtn.onclick = () => {
    if(!intvlVar) return;
    clearInterval(intvlVar);
    intvlVar = undefined;

    startBtn.disabled = "true";
    stopBtn.disabled = "true";

    timeResult.children[0].innerText = (minutes < 10) ? "0" + minutes : minutes;
    timeResult.children[2].innerText = (seconds < 10) ? "0" + seconds : seconds;
    timeResult.children[4].innerText = (mseconds < 10) ? "0" + mseconds : mseconds;

    let typed = input.value.trim();

    if(typed){
        let typedWords = typed.split(/\s+/);
        wpmResult.innerText = Math.round((typedWords.length / (actualMS / 1000)) * 60);
    }

    let correctCount = 0;
    let appendText = "";
    for(let i = 0; i < sentence.length; i++){
        if(typed[i] === sentence[i]){
            appendText += sentence[i];
            correctCount++;
        } else{
            appendText += `<span class="wrong-char">${sentence[i]}</span>`;
        }
    }
    analyzedSentence.innerHTML = appendText;
    let maxLen = Math.max(typed.length, sentence.length);
    accuracyResult.innerText = Math.round((correctCount / maxLen) * 100) + "%";

    backdrop.style.display = "block";
    popup.style.animationName = "popup";
    popup.style.animationDuration = ".4s";
    popupWrapper.style.display = "grid";
}

restartBtn.onclick = () => {
    sentence = generateSentence();
    sentenceOutput.innerText = sentence;
    input.setAttribute("placeholder", sentence);
    mSecondOutput.innerText = secondOutput.innerText = minuteOutput.innerText = "00";
    timeResult.children[0].innerText = timeResult.children[2].innerText = timeResult.children[4].innerText = "00";
    wpmResult.innerText = "0";
    accuracyResult.innerText = "0%";
    startBtn.disabled = false;
    stopBtn.disabled = false;
    input.value = "";
    popup.style.animationName = "popup-out";
    popup.style.animationDuration = ".2s";
    popup.onanimationend = () => {
        backdrop.style.display = "none";
        popupWrapper.style.display = "none";
        popup.onanimationend = null;
    }
}

input.oninput = (e) => {
    let value = input.value.trim();
    if(value === sentence){
        stopBtn.click();
    } else if(value.length === 1 && intvlVar === undefined){
        startBtn.click();
    }
}