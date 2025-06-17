let output = document.getElementById("output");
let input = document.getElementById("color-picker");
let copyBtn = document.getElementById("copy");
let demoDiv = document.getElementById("demo-bg");
let demoTxt = document.getElementById("demo-text");


input.oninput = () => {
    output.innerText = input.value.slice(1);
    demoDiv.style.background = input.value;
}

copyBtn.onclick = () => {
    navigator.clipboard.writeText(input.value);
}

let txtEasterCount = 0;
let divEasterCount = 0;
let divInFocus = false;
document.body.onclick = e => {
    if(txtEasterCount === 2 && e.target === demoTxt){
        demoTxt.style.color = input.value;
        txtEasterCount = 0;
    } else if(e.target === demoTxt){
        txtEasterCount++;
    } else if(e.target === demoDiv){
        if(divEasterCount === 0) divEasterCount++;
        divInFocus = true;
    } else{
        txtEasterCount = 0;
        divInFocus = false;
    }
}
let lockTxt = "";
let unlockTxt = "";
document.body.onkeydown = e => {
    if(divEasterCount === 1){
        if(lockTxt === "" && e.key.toLowerCase() === "z"){
            lockTxt += "z";
        } else if(lockTxt === "z" && e.key.toLowerCase() === "a"){
            lockTxt += "a";
        } else if(lockTxt === "za" && e.key.toLowerCase() === "p"){
            input.oninput = () => {
                output.innerText = input.value.slice(1);
            }
            divEasterCount = 2;
            lockTxt = "";
        } else{
            lockTxt = "";
        }
    } else if(divEasterCount === 2 && divInFocus){
        if(unlockTxt === "" && e.key.toLowerCase() === "z"){
            unlockTxt += "z";
        } else if(unlockTxt === "z" && e.key.toLowerCase() === "i"){
            unlockTxt += "i";
        } else if(unlockTxt === "zi" && e.key.toLowerCase() === "p"){
            input.oninput = () => {
                output.innerText = input.value.slice(1);
                demoDiv.style.background = input.value;
            }
            divEasterCount = 0;
        } else{
            unlockTxt = "";
        }
    }
}