// Select necessary elements from the DOM
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const archivedListContainer = document.getElementById("archived-list-container");
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
        if (checkbox.checked) {
            archiveTask(taskItem); // Move to archive if checked
        } else {
            unarchiveTask(taskItem); // Move back to task list if unchecked
        }
        updateCounters();
    });

    // Edit button listener for editing a task
    editBtn.addEventListener("click", () => {
        console.log("Edit button clicked!"); // Debugging: Check if edit button is clicked
        const updatedTask = prompt("Edit task:", taskSpan.textContent);
        if (updatedTask !== null && updatedTask.trim() !== "") {
            taskSpan.textContent = updatedTask.trim();
            if (taskItem.parentElement === archivedListContainer) {
                taskItem.classList.remove("completed");
                checkbox.checked = false;
                archivedListContainer.removeChild(taskItem);
                listContainer.appendChild(taskItem);
            }
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

// Function to move task to the archived section
function archiveTask(taskItem) {
    taskItem.classList.add("completed");
    archivedListContainer.appendChild(taskItem);
}

// Function to move task back to the task list from the archive
function unarchiveTask(taskItem) {
    taskItem.classList.remove("completed");
    listContainer.appendChild(taskItem);
}

// Function to update the completed and uncompleted task counters
function updateCounters() {
    const completedTasks = archivedListContainer.querySelectorAll("li").length;
    const totalTasks = listContainer.querySelectorAll("li").length + completedTasks;
    const uncompletedTasks = totalTasks - completedTasks;

    console.log(`Completed: ${completedTasks}, Uncompleted: ${uncompletedTasks}`); // Debugging: Check task counters
    completedCounter.textContent = completedTasks;
    uncompletedCounter.textContent = uncompletedTasks;
}

// Attach the addTask function to the button click
document.getElementById('input-button').addEventListener('click', function () {
    console.log("Add button event listener triggered!"); // Debugging
    addTask();
});

// Optional: Allow pressing "Enter" key to add a task
inputBox.addEventListener('keypress', function (event) {
    if (event.key === "Enter") {
        console.log("Enter key pressed!");
        addTask();
    }
});

