let resultDiv = document.getElementById("result-div");
let result = document.getElementById("result");
let input = document.getElementById("input");
let checkBtn = document.getElementById("check");

function closeResult(){
    resultDiv.style.animationName = "slideout";
    resultDiv.style.animationDuration = ".4s";
    resultDiv.onanimationend = () => {
        resultDiv.style.left = "-500px";
    }
}
function openResult(text, type){
    result.innerText = text;
    resultDiv.style.background = (type) ? "rgb(255, 67, 67)" : "rgb(0, 170, 85)";
    resultDiv.style.animationName = "slidein";
    resultDiv.style.animationDuration = ".4s";
    resultDiv.onanimationend = () => {
        resultDiv.style.left = "10px";
        setTimeout(() => {
            closeResult();
        }, 1000)
    }
}

function isPalindrome(text){
    if(!text) return null;
    let isPalindrome = true;
    for(let i = 0; i < text.length/2; i++){
        if(text[i] !== text[text.length-1-i]) isPalindrome = false;
        if(!isPalindrome) break;
    }
    return (isPalindrome) ? "Palindrome" : "Not a Palindrome";
}

checkBtn.onclick = () => {
    let inputVal = input.value;
    if(!inputVal) openResult("Error: Type Some Text", 1);
    else openResult(
        isPalindrome(
            inputVal.toLowerCase().replace(/[^a-zA-Z0-9]/g, "")
        )
    );
}

input.addEventListener("keydown", (e) => {
    if(e.key === "Enter" && e.ctrlKey && !e.shiftKey && !e.altKey && !e.metaKey) checkBtn.click();
})