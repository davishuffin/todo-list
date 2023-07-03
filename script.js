// Retrieve tasks from local storage or initialize an empty array
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Function to save tasks to local storage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to add a new task
function addTask() {
  const todoInput = document.getElementById("todoInput");
  const todoList = document.getElementById("todoList");

  const taskText = todoInput.value;

  const task = {
    text: taskText,
    completed: false
  };

  tasks.push(task);
  saveTasks();

  const taskElement = document.createElement("div");
  taskElement.classList.add("todo-item");
  taskElement.textContent = taskText;
  taskElement.addEventListener("click", function () {
    toggleTaskCompleted(task);
  });

  todoList.appendChild(taskElement);

  todoInput.value = "";
}

// Function to toggle the completed status of a task
function toggleTaskCompleted(task) {
  task.completed = !task.completed;
  saveTasks();
  renderTaskList();
}

// Event listener for the form submission
document.getElementById("todoForm").addEventListener("submit", function (event) {
  event.preventDefault();
  addTask();
});

// Render the initial task list
function renderTaskList() {
  const todoList = document.getElementById("todoList");

  // Clear the existing content of the task list
  todoList.innerHTML = "";

  // Create and append task elements for each task
  tasks.forEach(function (task) {
    const taskElement = document.createElement("div");
    taskElement.classList.add("todo-item");
    taskElement.textContent = task.text;
    if (task.completed) {
      taskElement.classList.add("completed");
    }
    taskElement.addEventListener("click", function () {
      toggleTaskCompleted(task);
    });

    todoList.appendChild(taskElement);
  });
}

// Call the renderTaskList function
renderTaskList();
