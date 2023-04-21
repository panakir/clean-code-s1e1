const taskInput = document.getElementById("new-task");
const addButton = document.querySelector(".btn_add");
const incompleteTaskHolder = document.getElementById("incomplete-tasks");
const completedTasksHolder = document.getElementById("completed-tasks");


//New task list item
const createNewTaskElement = function(taskString) {
  // list-item
  const listItem = document.createElement("li");
  listItem.classList.add("task-list__item");

  //input (checkbox)
  const checkBox = document.createElement("input");
  checkBox.classList.add("input", "input_checkbox");
  checkBox.type="checkbox";

  //label
  const label = document.createElement("label");
  label.className = "task task-list__label";
  label.innerText=taskString;

  //input (text)
  const editInput = document.createElement("input");
  editInput.className="task input input_text";
  editInput.type="text";

  //button.edit
  const editButton = document.createElement("button");
  editButton.className="btn btn_edit";
  editButton.innerText="Edit";

  //button.delete
  const deleteButton = document.createElement("button");
  deleteButton.className="btn btn_delete";

  const deleteButtonImg = document.createElement("img");
  deleteButtonImg.className = "btn__image_delete"
  deleteButtonImg.src='./remove.svg';
  deleteButton.appendChild(deleteButtonImg);
  
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
}


// Add new task
const addTask = function() {
  
  if (!taskInput.value) return;

  const listItem = createNewTaskElement(taskInput.value);
  incompleteTaskHolder.appendChild(listItem);

  bindTaskEvents(listItem, taskCompleted);

  taskInput.value="";

}

// Edit an existing task
const editTask = function() {
  
  const listItem = this.parentNode;
  const editInput = listItem.querySelector('input[type=text]');
  const label = listItem.querySelector("label");
  const editBtn = listItem.querySelector(".btn_edit");
  const containsClass = listItem.classList.contains("edit-mode");
  
  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  listItem.classList.toggle("edit-mode");
};

// Delete task
const deleteTask = function() {
  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  ul.removeChild(listItem);
}

//Mark task completed
const taskCompleted = function() {
  const listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

// Mark complete task
const taskIncomplete = function() {
  const listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem,taskCompleted);
}

const bindTaskEvents = function(taskListItem,checkBoxEventHandler) {
  const checkBox = taskListItem.querySelector(".input_checkbox");
  const editButton = taskListItem.querySelector(".btn_edit");
  const deleteButton = taskListItem.querySelector(".btn_delete");

  addButton.addEventListener("click", addTask);
  editButton.addEventListener("click", editTask);
  deleteButton.addEventListener("click",deleteTask);
  checkBox.addEventListener('change', checkBoxEventHandler);
}

//cycle over incompleteTaskHolder ul list items for each list item
for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}

//cycle over completedTasksHolder ul list items
for (let i = 0; i < completedTasksHolder.children.length; i++) {
//bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}