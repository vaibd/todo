// getting all required elements
const inputTask = document.querySelector(".inputItem input");
const addButton = document.querySelector(".addButton");
const list = document.querySelector(".list");
const deleteAllButton = document.querySelector(".deleteAllButton");

let taskArray = ["Learn React", "Learn new ES6 syntax", "Complete the project"]; //create a blank array
let selectElement = [];
displayTask(); //calling showTask function

let checkBoxState = document.querySelector(".abcd").checked;
console.log(checkBoxState);
addButton.addEventListener("click", () => {
  addTask(displayTask);
});

deleteAllButton.addEventListener("click", () => {
  deleteAll(displayTask);
});

// add tasks to the local storage
function addTask(displayTaskCallback) {
  let taskName = inputTask.value; // input
  if (taskName == "") {
    window.alert("Please enter something");
  } else {
    let taskNameStorage = localStorage.getItem("New Todo"); //getting localstorage

    taskArray.push(taskName); //pushing or adding new value in array
    localStorage.setItem("New Todo", taskArray); //transforming js object into a json string
    displayTaskCallback(); //calling showTask function
  }
}

// display the tasks in the local storage
function displayTask() {
  let taskNameStorage = localStorage.getItem("New Todo");

  let newListTag = "";
  taskArray.forEach((element, index) => {
    newListTag += `
    
    <div class="listElement">

       <div> 
       <input class = "abcd" type="checkbox" onclick = "multiSelect(${index})">
        </div>
         <div class="displayElement"> &nbsp ${element} &nbsp </div> 
        <div class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash del"></i></div>

    </div>
    `;
  });
  list.innerHTML = newListTag; //adding new list tag inside ul tag
  inputTask.value = ""; //once task added leave the input field blank
}

// multi select elements
function multiSelect(index) {
  selectElement.push(index);
  // console.log(selectElement);
  // console.log("before" + taskArray);
  console.log(checkBoxState);
}

//delete selected elements
function multiDelete() {
  selectElement.map((elementIndex) => {
    if (elementIndex > -1) {
      taskArray.splice(elementIndex, 1);
    }

    console.log("after " + taskArray);
  });

  // for (i = 0; i <= selectElement.length; i++) {
  //   taskArray.splice(selectElement[i], 1);
  // }
  displayTask();
  selectElement = [];
}

// delete particular task
function deleteTask(index) {
  //taskArray = JSON.parse(taskNameStorage);
  taskArray.splice(index, 1); //delete or remove the li
  localStorage.setItem("New Todo", taskArray);
  displayTask(); //call the displayTask function
}

// delete all tasks
function deleteAll(deleteAllCallback) {
  taskArray = []; //empty the array
  localStorage.setItem("New Todo", JSON.stringify(taskArray)); //set the item in localstorage
  displayTask(); //call the displayTask function
}
