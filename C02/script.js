let resultOutput = document.getElementById("result");
let trigger = document.getElementById("count");
let input = document.getElementById("string");

trigger.onclick = () => {
    let str = input.value.toLowerCase();
    if(str){
        let vowelCount = 0;
        for(let i = 0; i < str.length; i++){
            let val = str[i];
            if(val === "a" || val === "e" || val === "i" || val === "o" || val === "u"){
                vowelCount++;
            }
        };
        resultOutput.innerText = vowelCount;
    }
}