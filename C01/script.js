function checkWinner(player, computer){
    if(!(player instanceof Playable) || !(computer instanceof Playable)) return "neutral";
    if(player.beats === computer.id){
        return "player";
    } else if(computer.beats === player.id){
        return "computer";
    } else{
        return "neutral";
    }
}
function smokeScreen(winner){
    let msgElem = document.getElementById("message");
    let screen = document.getElementById("smoke-screen");
    if(winner === "player"){
        msgElem.innerHTML = "You Win!";
    } else{
        msgElem.innerHTML = "You Lose :(";
    }
    screen.style.display = "grid";
}

class Playable{
    constructor(name, img, id, beats, loses){
        this.name = name;
        this.img = img;
        this.id = id;
        this.beats = beats;
        this.loses = loses;
    }
}

const playables = {
    rock: new Playable("rock", "./imgs/rock.png", 0, 2, 1),
    paper: new Playable("paper", "./imgs/paper.png", 1, 0, 2),
    scissors: new Playable("scissors", "./imgs/scissors.webp", 2, 1, 0)
}

class Player{
    constructor(name, sqr, scoreOutput){
        this.name = name;
        this.outputSqr = sqr;
        this.scoreOutput = scoreOutput;
        this.score = 0;
        this.currentSelection = null;
    }
    select(selection){
        if(!(selection instanceof Playable)) return;
        this.currentSelection = selection;
        this.outputSqr.innerHTML = `<img src="${selection.img}" alt="${selection.name} image">`
        return this.currentSelection;
    }
    incrementScore(){
        this.score++;
        this.scoreOutput.innerText = this.score;
    }
    win(){
        this.outputSqr.style.borderColor = "green";
        this.outputSqr.style.boxShadow = "0px 0px 50px green";
        smokeScreen("player");
    }
    reset(){
        this.score = 0;
        this.currentSelection = null;
        this.scoreOutput.innerText = "0";
        this.outputSqr.innerHTML = "";
        this.outputSqr.style.boxShadow = "none";
        this.outputSqr.style.borderColor = "white";
    }
}
class Computer{
    constructor(sqr, scoreOutput){
        this.score = 0;
        this.currentSelection = null;
        this.scoreOutput = scoreOutput;
        this.outputSqr = sqr;
    }
    randomSelect(){
        this.currentSelection = Object.values(playables)[Math.floor(Math.random() * Object.keys(playables).length)];
        this.outputSqr.innerHTML = `<img src="${this.currentSelection.img}" alt="${this.currentSelection.name} image">`;
        return this.currentSelection;
    }
    incrementScore(){
        this.score++;
        this.scoreOutput.innerText = this.score;
    }
    win(){
        this.outputSqr.style.borderColor = "green";
        this.outputSqr.style.boxShadow = "0px 0px 50px green";
        smokeScreen("computer");
    }
    reset(){
        this.score = 0;
        this.currentSelection = null;
        this.scoreOutput.innerText = "0";
        this.outputSqr.innerHTML = "";
        this.outputSqr.style.boxShadow = "none";
        this.outputSqr.style.borderColor = "white";
    }
}

let rockE = document.getElementById("rock"),
    paperE = document.getElementById("paper"),
    scissorsE = document.getElementById("scissors");

let playerSqr = document.getElementById("player-sqr");
let compSqr = document.getElementById("comp-sqr");
let playerScore = document.getElementById("player-score");
let compScore = document.getElementById("comp-score");
let resetBtn = document.getElementById("reset");

let player = new Player("Player", playerSqr, playerScore);
let computer = new Computer(compSqr, compScore);

let hold = false;

function reset(){
    player.reset()
    computer.reset();
    document.getElementById("smoke-screen").style.display = "none";
}

function processWinner(){
    let winner = checkWinner(player.currentSelection, computer.currentSelection);
    if(winner === "neutral") {hold = false; return;};

    if(winner === "computer") computer.incrementScore(); 
    else if(winner === "player") player.incrementScore();

    if(computer.score >= 25){
        computer.win();
    } else if(player.score >= 25){
        player.win();
    }
    setTimeout(() => hold = false, 600)
}

function handlePlayerSelection(selection){
    if(hold === true) return;
    hold = true;
    player.select(selection);
    computer.randomSelect();
    processWinner();
}

rockE.onclick = () => handlePlayerSelection(playables.rock);
paperE.onclick = () => handlePlayerSelection(playables.paper);
scissorsE.onclick = () => handlePlayerSelection(playables.scissors);

resetBtn.onclick = () => reset();