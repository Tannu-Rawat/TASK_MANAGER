'use strict';
let low = [];
let medium = [];
let high = [];
let recent = [];

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const prioritySelect = document.getElementById("prioritySelect");

    const task = taskInput.value.trim();
    const priority = prioritySelect.value;

    if (!task) return;

    
    if (priority === "low") low.push(task);
    else if (priority === "medium") medium.push(task);
    else if (priority === "high") high.push(task);

    
    recent.unshift({ name: task, priority: priority });

    filterTasks();
    taskInput.value = "";
}

function renderTasks(list) {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    list.forEach((task) => {
        let taskName = typeof task === "string" ? task : task.name;
        let taskPriority = typeof task === "string" ? document.getElementById("filterPriority").value : task.priority;

        const li = document.createElement("li");
        li.className = `list-group-item d-flex justify-content-between align-items-center ${taskPriority}`;
        
        let safeTaskName = taskName.replace(/'/g, "\\'");
        li.innerHTML = `
            <span>${taskName}</span>
            <button class="btn btn-sm delete-btn" onclick="deleteTask('${safeTaskName}')">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

function filterTasks() {
    const filter = document.getElementById("filterPriority").value;
    if (filter === "all") renderTasks(recent);
    else if (filter === "low") renderTasks(low);
    else if (filter === "medium") renderTasks(medium);
    else if (filter === "high") renderTasks(high);
}

function deleteTask(taskName) {
    low = low.filter(task => task !== taskName);
    medium = medium.filter(task => task !== taskName);
    high = high.filter(task => task !== taskName);
    recent = recent.filter(task => task.name !== taskName);

    filterTasks();
}

function deleteTaskBySearch() {
    const taskName = document.getElementById("deleteInput").value.trim();
    if (taskName === "") {
        alert("Please enter a task name to delete.");
        return;
    }

    const existsInLow = low.includes(taskName);
    const existsInMedium = medium.includes(taskName);
    const existsInHigh = high.includes(taskName);

    if (!existsInLow && !existsInMedium && !existsInHigh) {
        alert("Task not found!");
        return;
    }

    low = low.filter(task => task !== taskName);
    medium = medium.filter(task => task !== taskName);
    high = high.filter(task => task !== taskName);
    recent = recent.filter(task => task.name !== taskName);

    alert(`Task "${taskName}" deleted successfully.`);
    document.getElementById("deleteInput").value = "";
    filterTasks();
}


window.addTask = addTask;
window.deleteTask = deleteTask;
window.deleteTaskBySearch = deleteTaskBySearch;
window.filterTasks = filterTasks;


window.onload = filterTasks;
