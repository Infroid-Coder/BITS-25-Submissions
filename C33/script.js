let heightInput = document.getElementById("height");
let weightInput = document.getElementById("weight");
let calBtn = document.getElementById("calculate");
let output = document.getElementById("output")
let stripLabelElems = document.querySelectorAll("#strip-labels p");

function highlightLabel(BMI){
    let stripLabels = {
        underweight: stripLabelElems[0],
        normal: stripLabelElems[1],
        overweight: stripLabelElems[2],
        obese: stripLabelElems[3]
    }
    if(BMI < 18.5){
        output.style.color = "rgb(0, 158, 84)";
        stripLabels.underweight.style.color = "yellow";
        stripLabels.normal.style.color = "white";
        stripLabels.overweight.style.color = "white";
        stripLabels.obese.style.color = "white";
    } else if(BMI < 25){
        output.style.color = "rgb(0, 255, 0)";
        stripLabels.normal.style.color = "yellow";
        stripLabels.underweight.style.color = "white";
        stripLabels.overweight.style.color = "white";
        stripLabels.obese.style.color = "white";
    } else if(BMI < 30){
        output.style.color = "rgb(255, 0, 0)";
        stripLabels.overweight.style.color = "yellow";
        stripLabels.underweight.style.color = "white";
        stripLabels.normal.style.color = "white";
        stripLabels.obese.style.color = "white";
    } else if(BMI > 29.9){
        output.style.color = "rgb(200, 0, 0)";
        stripLabels.obese.style.color = "yellow";
        stripLabels.underweight.style.color = "white";
        stripLabels.normal.style.color = "white";
        stripLabels.overweight.style.color = "white";
    }
}

calBtn.onclick = () => {
    let height = Number(heightInput.value);
    let weight = Number(weightInput.value);
    if(height <= 0 || weight <= 0 || isNaN(height) || isNaN(weight)){
        alert("You sure you're human buddy?");
        return;
    };
    let BMI = (Number(weightInput.value) / ((Number(heightInput.value) / 100) ** 2)).toFixed(1);
    output.innerText = BMI;
    highlightLabel(Number(BMI));
}

weightInput.onkeydown = (e) => {
    if(e.key === "Enter" && !e.shiftKey && !e.metaKey && !e.altKey && !e.ctrlKey) calBtn.click();
}
heightInput.onkeydown = (e) => {
    if(e.key === "Enter" && !e.shiftKey && !e.metaKey && !e.altKey && !e.ctrlKey) calBtn.click();
}