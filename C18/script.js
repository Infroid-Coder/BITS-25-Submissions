let input = document.getElementById("input");
let pEntry = document.getElementById("previous-entry");
let buttons = document.querySelectorAll(".btns");

let allowedKeys = "1234567890+-*/^#%".split("");
let calLineRegex = /^(#?\d{1,15}(\.\d{1,15})?(\+|\-|\/|\*|\^|%)#?\d{1,15}(\.\d{1,15})?)+$/;
let calLine = "";
let lineOperation = "";

function alertOpen(alertBox){
    alertBox.onanimationend = () => alertBox.style.left = "10px";
    alertBox.style.animationName = "alertBoxIn";
    alertBox.style.animationDuration = ".4s";
}
function alertClose(alertBox, alertDesc){
    alertBox.onanimationend = () => {
        alertBox.style.left = "-300px";
        alertDesc.innerHTML = "";
    }
    alertBox.style.animationName = "alertBoxOut";
    alertBox.style.animationDuration = ".4s";
}
let siteAlertTimeout = setTimeout(() => {},1);
function siteAlert(title="", msg=""){
    clearTimeout(siteAlertTimeout);
    let alertBox = document.getElementById("alert-box");
    let alertDesc = document.getElementById("alert-desc");
    if(typeof msg === "string" && msg.length > 0 && typeof title === "string" && title.length > 0){
        alertDesc.innerHTML = "<b>"+title+": </b>"+msg;
        alertOpen(alertBox);
    }
    siteAlertTimeout = setTimeout(() => {
        alertClose(alertBox, alertDesc);
    },3000);
    alertBox.onclick = () => {
        alertClose(alertBox, alertDesc);
        clearTimeout(siteAlertTimeout);
    }
}
function floatPrecision(number){
    return parseFloat(number.toPrecision(15));
}

function calculate(){
    let rValue = null;
    if(calLineRegex.test(calLine)){
        let decimalPresent = false;
        if(calLine.includes(".")){
            decimalPresent = true;
        }
        let spltLine = calLine.split(lineOperation);
        spltLine.forEach((line,i,arr) => {
            if(line[0].includes("#")){
                spltLine[i] = Math.sqrt(Number(line.replace("#","")));
            }
        })
        switch(lineOperation){
            case '+':
                if(decimalPresent){
                    rValue = floatPrecision(Number(spltLine[0]) + Number(spltLine[1]));
                    break;
                } else {
                    rValue = Number(spltLine[0]) + Number(spltLine[1]);
                    break;
                }
            case '-':
                if(decimalPresent){
                    rValue = floatPrecision(Number(spltLine[0]) - Number(spltLine[1]));
                    break;
                } else {
                    rValue = Number(spltLine[0]) - Number(spltLine[1]);
                    break;
                }
            case '*':
                if(decimalPresent){
                    rValue = floatPrecision(Number(spltLine[0]) * Number(spltLine[1]));
                    break;
                } else {
                    rValue = Number(spltLine[0]) * Number(spltLine[1]);
                    break;
                }
            case '/':
                if(decimalPresent){
                    rValue = floatPrecision(Number(spltLine[0]) / Number(spltLine[1]));
                    break;
                } else {
                    rValue = Number(spltLine[0]) / Number(spltLine[1]);
                    break;
                }
            case '^':
                if(decimalPresent){
                    rValue = floatPrecision(Number(spltLine[0]) ** Number(spltLine[1]));
                    break;
                } else {
                    rValue = Number(spltLine[0]) ** Number(spltLine[1]);
                    break;
                }
            case '%':
                if(decimalPresent){
                    rValue = floatPrecision(Number(spltLine[0]) % Number(spltLine[1]));
                    break;
                } else {
                    rValue = Number(spltLine[0]) % Number(spltLine[1]);
                    break;
                }                
        }
    } else {
        if(lineOperation === "" && calLine.includes("#")){
            rValue = Math.sqrt(Number(calLine.replace("#","")));
        } else if(lineOperation !== ""){
            siteAlert("Character Limit Exceeded","More than 15 characters are present after the decimal point. The numbers after the decimal point will be reduced to 15 through deleting the excess numbers in order to perform the calculation.")
            let decimalPresent = 0;
            let spltLine = calLine.split(lineOperation);
            spltLine.forEach((line,i,arr) => {
                if(line.split(".").length === 2){
                    let decimalSplit =  line.split(".");
                    decimalSplit[1] = decimalSplit[1].slice(0,15);
                    spltLine[i] = decimalSplit.join(".");
                    decimalPresent++;
                }
            })
            if(decimalPresent > 0){
                calLine = spltLine.join(lineOperation);
                return calculate()
            }
        }
    }
    return rValue;
}


for(let i = 0; i < buttons.length; i++){
    buttons[i].onclick = () => {
        if(allowedKeys.includes(buttons[i].id)){
            input.value += buttons[i].id;
            calLine += buttons[i].id;
        } else if(buttons[i].id === "dec"){
            if(input.value === ""){
                input.value += "0.";
                calLine += "0.";
            } else if(!input.value.includes(".")){
                input.value += ".";
                calLine += ".";
            }
        } else if(buttons[i].id === "backspace"){
            if(input.value.length > 0){
                input.value = input.value.slice(0,input.value.length-1);
                calLine = calLine.slice(0,calLine.length-1);
            }
        } else if(buttons[i].id === "sqrt"){
            if(input.value.length === 0){
                calLine += "#";
                input.value += "√";
            } else if(input.value.includes("√") === false && input.value.length > 0){
                calLine = calLine.slice(0,-(input.value.length));
                calLine += Math.sqrt(Number(input.value));
                input.value = Math.sqrt(Number(input.value));
            }
        } else if(buttons[i].classList.value.includes("basic-operation")){
            if(input.value.includes("e") || input.value.includes("E")){
                siteAlert("Scientific Notation Unhandled", "This calculator cannot work with scientific notation.")
            } else if(input.value.split(".")[0].length > 15){
                siteAlert("Character Limit Exceeded","The character limit before and after the decimal point is 15 characters.")
            } else{
                let operation = "";
                if(buttons[i].id === "add"){
                    operation = "+";
                } else if(buttons[i].id === "subs"){
                    operation = "-";
                } else if(buttons[i].id === "mult"){
                    operation = "*";
                } else if(buttons[i].id === "div"){
                    operation = "/";
                }  else if(buttons[i].id === "power"){
                    operation = "^";
                }  else if(buttons[i].id === "modulus"){
                    operation = "%";
                }
                if(isNaN(Number(input.value.replace(/√/g,""))) === false && input.value.split(".")[0].length > 0 && input.value.split(".")[0].length < 16){
                    let cal = calculate();
                    if(cal != null){
                        calLine = cal
                    }
                    calLine += operation;
                    input.value = "";
                    pEntry.value = calLine.replace(/#/g,"√");
                    lineOperation = operation;
                }
            }
        } else if(buttons[i].id === "equals"){
            if(input.value.split(".")[0].length > 15){
                siteAlert("Character Limit Exceeded","The character limit before and after the decimal point is 15 characters.")
            } else{
                if(isNaN(Number(input.value.replace(/√/g,""))) === false && input.value.split(".")[0].length > 0 && input.value.split(".")[0].length < 16){
                    let cal = calculate();
                    if(cal != null){
                        calLine = cal.toString();
                        input.value = cal;
                        pEntry.value = "";
                        lineOperation = "";
                    }
                }
            }
        } else if(buttons[i].id === "clear"){
            calLine = "";
            input.value = "";
            pEntry.value = "";
            lineOperation = "";
        } else if(buttons[i].id === "cleare"){
            calLine = calLine.slice(0,calLine.length-input.value.length);
            input.value = "";
        } else if(buttons[i].id === "square"){
            calLine = calLine.slice(0,calLine.length-input.value.length);
            let workLine = input.value;
            if(input.value.includes("#")){
                workLine = Math.sqrt(Number(input.value.replace(/√/g,""))) ** 2;
            } else {
                workLine = Number(input.value) ** 2
            }
            calLine += workLine;
            input.value = workLine;
        } 
        console.log(calLine);
    }
}