let hour24Output = document.getElementById("hours24");
let min24Output = document.getElementById("mins24");
let sec24Output = document.getElementById("secs24");
let hour12Output = document.getElementById("hours12");
let min12Output = document.getElementById("mins12");
let sec12Output = document.getElementById("secs12");
let hour24ClockElem = document.getElementById("clock-24");
let hour12ClockElem = document.getElementById("clock-12");
let amPmOutput = document.getElementById("am-pm-output");
let amPmBox = document.getElementById("am-pm-box");
let dateDiv = document.getElementById("date-display");
let dateOutput = document.getElementById("date-output");

let hours = 0, mins = 0, secs = 0;

dateOutput.innerText = new Date().toDateString();

function hour24Clock(){
    let date = new Date();
    hours = date.getHours();
    mins = date.getMinutes();
    secs = date.getSeconds();

    hour24Output.innerText = (hours < 10) ? "0" + hours : hours;
    min24Output.innerText = (mins < 10) ? "0" + mins : mins;
    sec24Output.innerText = (secs < 10) ? "0" + secs : secs;
}
function hour12Clock(){
    let date = new Date();
    hours = date.getHours();
    mins = date.getMinutes();
    secs = date.getSeconds();
    let hoursto12 = (hours > 12) ? hours - 12 : hours;

    hour12Output.innerText = (hoursto12 < 10) ? "0" + hoursto12 : hoursto12;
    min12Output.innerText = (mins < 10) ? "0" + mins : mins;
    sec12Output.innerText = (secs < 10) ? "0" + secs : secs;
    amPmOutput.innerText = (hours >= 12) ? "PM" : "AM";
}

let switchTo12 = document.getElementById("hour-12-mode");
let switchTo24 = document.getElementById("hour-24-mode");

let intvl = setInterval(hour24Clock, 1000);
let currentMode = 24;

switchTo12.onclick = () => {
    if(currentMode === 12) return;
    hour24ClockElem.style.animationName = "switch-go-up";
    hour24ClockElem.style.animationDuration = ".8s";
    hour24ClockElem.onanimationend = () => {
        hour24ClockElem.style.display = "none";
        hour12ClockElem.style.animationName = "switch-come-down";
        hour12ClockElem.style.animationDuration = ".8s";
        hour12ClockElem.style.display = "grid";
        hour24ClockElem.onanimationend = null;
    }
    clearInterval(intvl);
    intvl = setInterval(hour12Clock,1000);
    currentMode = 12;
}
switchTo24.onclick = () => {
    if(currentMode === 24) return;
    hour12ClockElem.style.animationName = "switch-go-up";
    hour12ClockElem.style.animationDuration = ".8s";
    hour12ClockElem.onanimationend = () => {
        hour12ClockElem.style.display = "none";
        hour24ClockElem.style.animationName = "switch-come-down";
        hour24ClockElem.style.animationDuration = ".8s";
        hour24ClockElem.style.display = "grid";
        hour12ClockElem.onanimationend = null;
    }
    clearInterval(intvl);
    intvl = setInterval(hour24Clock,1000);
    currentMode = 24;
}

let currentTheme = "dark";
let themeSwitch = document.getElementById("theme-switch");

let upAndDown = [
    {transform: "translateY(-100vh)", offset: 0.4},
    {transform: "translateY(20px)", offset: 0.55},
    {transform: "translateY(-40vh)", offset: 0.75}
]

themeSwitch.onclick = () => {
    let program = document.getElementById("program");
    let timeBoxes = document.querySelectorAll(".time-box");
    let timeOutputs = document.querySelectorAll(".time-output");
    let switchBtns = document.getElementById("mode-switch");
    let lightBG = document.getElementById("light-bg");
    let githubLogo = document.getElementById("github-logo");
    if(currentTheme === "dark"){
        lightBG.style.animationName = "slide-in";
        lightBG.style.animationDuration = ".4s";
        lightBG.onanimationend = () => {
            lightBG.style.width = "100%";
            lightBG.onanimationend = null;
        }
        githubLogo.style.filter = "invert(0)";
        currentTheme = "light";
        program.style.animationName = "up-and-down";
        program.style.animationDuration = "1.3s";
        setTimeout(() => {
            timeBoxes.forEach(val => val.classList.add("lightmode"));
            timeOutputs.forEach(val => val.classList.add("lightmode"));
            dateDiv.classList.add("lightmode");
            switchBtns.classList.add("lightmode");
            amPmBox.classList.add("lightmode");
        }, 510);
        program.onanimationend = () => {
            program.style.animationName = "none";
            program.onanimationend = null;
        }
    } else{
        lightBG.style.animationName = "slide-out";
        lightBG.style.animationDuration = ".4s";
        lightBG.onanimationend = () => {
            lightBG.style.width = "0%";
            lightBG.onanimationend = null;
        }
        program.style.animationName = "up-and-down";
        program.style.animationDuration = "1.3s";
        setTimeout(() => {
            timeBoxes.forEach(val => val.classList.remove("lightmode"));
            timeOutputs.forEach(val => val.classList.remove("lightmode"));
            switchBtns.classList.remove("lightmode");
            dateDiv.classList.remove("lightmode");
            amPmBox.classList.remove("lightmode");
        }, 510);
        program.onanimationend = () => {
            program.style.animationName = "none";
            program.onanimationend = null;
        }
        githubLogo.style.filter = "invert(1)";
        currentTheme = "dark";
    }
}
