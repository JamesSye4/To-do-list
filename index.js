// Select necessary elements from the DOM
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const completedCounter = document.getElementById("completed-counter");
const uncompletedCounter = document.getElementById("uncompleted-counter");

// Function to add a task
function addTask() {
  // Get the value of the task and trim whitespace
  const task = inputBox.value.trim();
  if (!task) {
    alert("Please write down a task");
    return;
  }

  // Create a new list item (li)
  const li = document.createElement("li");
  li.innerHTML = `
    <label>
      <input type="checkbox" class="task-checkbox">
      <span>${task}</span>
    </label>
    <button class="edit-btn">Edit</button>
    <button class="delete-btn">Delete</button>
  `;

  // Append the new list item to the list container
  listContainer.appendChild(li);

  // Clear the input field after adding the task
  inputBox.valu

