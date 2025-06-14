function makeTaskElem(taskText, isDone = false, fullTaskList, fallback, taskList, i){
    let wrapper = document.createElement("div");
    let textOutput = document.createElement("h2");
    let buttonDiv = document.createElement("div");
    let doneBtn = document.createElement("button");
    let removeBtn = document.createElement("button");
    buttonDiv.classList.add("btn-set");
    wrapper.classList.add("task-div");
    textOutput.classList.add("task"); if(isDone) textOutput.classList.add("done-task");
    doneBtn.classList.add("done");
    removeBtn.classList.add("remove");
    doneBtn.innerText = "Done"; removeBtn.innerText = "Remove";
    textOutput.innerText = taskText;
    buttonDiv.appendChild(doneBtn);
    buttonDiv.appendChild(removeBtn);
    wrapper.appendChild(textOutput);
    wrapper.appendChild(buttonDiv);
    doneBtn.onclick = () => {
        if(!isDone){
            fullTaskList[i].done = 1;
            textOutput.classList.add("done-task");
        }
    }
    removeBtn.onclick = () => {
        fullTaskList[i] = null;
        taskList.removeChild(wrapper);
        if(taskList.childElementCount === 1) fallback.style.display = "block";
    }
    return {
        elem: wrapper,
        taskList: fullTaskList
    };
}

let input = document.getElementById("task-input");
let addBtn = document.getElementById("add-to-list");
let taskList = document.getElementById("task-list");
let fallback = document.getElementById("fallback");

let currentTasks = [];
if(localStorage.toDoListTasks){
    try {
        currentTasks = JSON.parse(localStorage.toDoListTasks).filter(val => {
            return (val === null) ? false : true;
        });
    } catch (error) {
        currentTasks = [];
    }
}

if(currentTasks.length > 0){
    currentTasks.forEach((val, i) => {
        if(!val) return;

        let taskElem = makeTaskElem(val.val, Boolean(val.done), currentTasks, fallback, taskList, i);
        currentTasks = taskElem.taskList;
        taskList.appendChild(taskElem.elem);
    });
}
if(taskList.childElementCount === 1) fallback.style.display = "block";
    
input.addEventListener("keydown", e => {
    if(e.key === "Enter" && !e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey){
        addBtn.click();
    }
})
addBtn.onclick = () => {
    let inputVal = input.value.trim()
    if(inputVal){
        currentTasks.push({val: inputVal, done: 0});
        taskList.appendChild(makeTaskElem(inputVal, false, currentTasks, fallback, taskList, currentTasks.length-1).elem);
        input.value = "";
        if(getComputedStyle(fallback).display === "block") fallback.style.display = "none";
    }
}

window.onbeforeunload = () => {
    localStorage.toDoListTasks = JSON.stringify(
        currentTasks.filter(val => {
            return (val === null) ? false : true;
        })
    );
}