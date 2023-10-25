// DOM elements
const addBtn = document.getElementById("add-task-button");
const deleteAllBtn = document.getElementById("deleteButton");
const taskInputBox = document.getElementById("new-task");
const dateInputBox = document.getElementById("task-date");
const todoListBody = document.querySelector(".todos-list-body");

// Class representing a task
class Task {
  constructor(taskInput, date, status) {
    this.id = this.generateId();
    this.taskInput = taskInput;
    this.date = date;
    this.status = status || this.generateStatus();
  }

  // Generates a unique ID for each task
  generateId() {
    return Math.random().toString(36).substring(2, 10);
  }

  // Generates default status for a task
  generateStatus() {
    return "Pending...";
  }
}

// Function to create a new task instance
function createTask(taskInput, date, status) {
  return new Task(taskInput, date, status);
}

// Array to store tasks
let tasks = [];

// Function to update the user interface
const updateUI = () => {
  todoListBody.innerHTML = "";
  tasks.forEach((t) => {
    const html = `
      <tr>
        <td class="I">
          <p class="limit-text">${t.taskInput}</p>
        </td>
        <td class="I">${t.date}</td>
        <td class="I">${t.status}</td>
        <td class="I">
          <button class="btn editTask" onclick="editTask('${t.id}')">
            <i class="fa-regular fa-pen-to-square"></i>
          </button>
          <button class="btn doneTask" onclick="doneTask('${t.id}')">
            <i class="fa-solid fa-check"></i>
          </button>
          <button class="btn deleteTask" onclick="deleteTask('${t.id}')">
            <i class="fa-regular fa-trash-can"></i>
          </button>
        </td>
      </tr>`;

    todoListBody.insertAdjacentHTML("beforeend", html);
  });
  taskInputBox.value = dateInputBox.value = "";
};

// Event listener for adding a new task
addBtn.addEventListener("click", function () {
  if (taskInputBox.value && dateInputBox.value) {
    const newTask = createTask(taskInputBox.value, dateInputBox.value);
    tasks.push(newTask);
    updateUI();
    createPopup("You've got a new task on the list", "#ffcc00");
  }
});

// Event listener for deleting all tasks
deleteAllBtn.addEventListener("click", function () {
  tasks = [];
  updateUI();
  createPopup("All Tasks successfully removed", "#ffcc00");
});

// Function to mark a task as done or pending
function doneTask(id) {
  const todo = tasks.find((task) => task.id === id);
  todo.status = todo.status === "Pending..." ? "Completed" : "Pending...";
  updateUI();
  createPopup("Task accomplished!", "#00cc66");
}

// Function to delete a task
function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  updateUI();
  createPopup("Task successfully removed", "#ff5757");
}

// Function to edit a task
function editTask(id) {
  const todo = tasks.find((task) => task.id === id);
  taskInputBox.value = todo.taskInput;
  tasks = tasks.filter((task) => task.id !== id);
}

// Function to create a popup notification
function createPopup(text, color) {
  let el = document.createElement("div");
  el.classList.add("popup");
  el.innerHTML = text;
  el.style.background = color;
  document.body.insertAdjacentElement("afterbegin", el);
  setTimeout(() => {
    el.remove();
  }, 5000);
}
