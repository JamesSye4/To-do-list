// Select necessary elements from the DOM
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const completedCounter = document.getElementById("completed-counter");
const uncompletedCounter = document.getElementById("uncompleted-counter");

// Function to add a task
function addTask() {
    console.log("Add button clicked!"); // Debugging: Check if addTask is called

    const task = inputBox.value.trim(); // Get and trim input value
    if (!task) {
        alert("Please write down a task");
        return;
    }

    // Create list item (li) with task and controls
    const li = document.createElement("li");
    li.innerHTML = `
        <label>
            <input type="checkbox" class="task-checkbox">
            <span>${task}</span>
        </label>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
    `;

    // Append the new task to the list
    listContainer.appendChild(li);
    inputBox.value = ""; // Clear input field

    // Add event listeners for the new task
    addTaskEventListeners(li);

    // Update the task counters after adding a new task
    updateCounters();
}

// Function to add event listeners to a task item
function addTaskEventListeners(taskItem) {
    const checkbox = taskItem.querySelector(".task-checkbox");
    const editBtn = taskItem.querySelector(".edit-btn");
    const deleteBtn = taskItem.querySelector(".delete-btn");
    const taskSpan = taskItem.querySelector("label span");

    // Checkbox listener for marking a task as completed
    checkbox.addEventListener("click", () => {
        console.log("Checkbox clicked!"); // Debugging: Check if checkbox is clicked
        taskItem.classList.toggle("completed", checkbox.checked);
        updateCounters();
    });

    // Edit button listener for editing a task
    editBtn.addEventListener("click", () => {
        console.log("Edit button clicked!"); // Debugging: Check if edit button is clicked
        const updatedTask = prompt("Edit task:", taskSpan.textContent);
        if (updatedTask !== null && updatedTask.trim() !== "") {
            taskSpan.textContent = updatedTask.trim();
            taskItem.classList.remove("completed");
            checkbox.checked = false;
            updateCounters();
        }
    });

    // Delete button listener for removing a task
    deleteBtn.addEventListener("click", () => {
        console.log("Delete button clicked!"); // Debugging: Check if delete button is clicked
        if (confirm("Are you sure you want to delete this task?")) {
            taskItem.remove();
            updateCounters();
        }
    });
}

// Function to update the completed and uncompleted task counters
function updateCounters() {
    const completedTasks = document.querySelectorAll("li.completed").length;
    const totalTasks = document.querySelectorAll("#list-container li").length;
    const uncompletedTasks = totalTasks - completedTasks;

    console.log(`Completed: ${completedTasks}, Uncompleted: ${uncompletedTasks}`); // Debugging: Check task counters
    completedCounter.textContent = completedTasks;
    uncompletedCounter.textContent = uncompletedTasks;
}

// Attach the addTask function to the button click
document.getElementById('input-button').addEventListener('click', addTask);

// Optional: Allow pressing "Enter" key to add a task
inputBox.addEventListener('keypress', function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});
