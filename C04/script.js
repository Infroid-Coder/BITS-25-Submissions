let input = document.getElementById("input-val"),
    inputDiv = document.getElementById("input-div"),
    inputUnit = document.getElementById("input-unit"),
    output = document.getElementById("output-val"),
    outputDiv = document.getElementById("output-div"),
    outputUnit = document.getElementById("output-unit"),
    switchBtn = document.getElementById("switch");

let mode = "10";

function update(){
    if(input.value === "") {output.value = ""; return;}
    let value = Number(input.value);
    if(mode === "10"){
        output.value = Number(((value * 9/5) + 32).toPrecision(5));
    } else{
        output.value = Number(((value - 32) * 5/9).toPrecision(5));
    }
}

input.oninput = update;
switchBtn.onclick = () => {
    mode = (mode === "10") ? "01" : "10";
    outputUnit.innerText = (outputUnit.innerText === "F") ? "C" : "F";
    inputUnit.innerText = (inputUnit.innerText === "F") ? "C" : "F";
    update();
}