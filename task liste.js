// Define UI Variables
const form = document.querySelector('#task-form');

const taskList = document.querySelector('.collection');

const clearBtn = document.querySelector('.clear-tasks');

const filter = document.querySelector('#filter');

const taskInput = document.querySelector('#task');


// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners(){
    // DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add task event
    form.addEventListener('submit', addTask);
    // Remove task event
    taskList.addEventListener('click', removeTask);
    // Clear Task event
    clearBtn.addEventListener('click', clearTasks);
    // Filter tasks event
    filter.addEventListener('keyup', filterTasks);
}

// Get Tasks from Local Storage
function getTasks(){
    let tasks;
    if (localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.forEach(function(task){
        // Create li element
        const li = document.createElement('li');
        // Add Class
        li.className = 'collection-item';
        //Create text node and append to li
        li.appendChild(document.createTextNode(task));
        // Create new link element
        const link = document.createElement('a');
        // Add class
        link.className = 'delete-item secondary-content';
        // Add icon HTML
        link.innerHTML = '<i class="fa fa-remove"</i>'; 
        // Append the link to the li
        li.appendChild(link)
        // Append li to ul
        taskList.appendChild(li);

    })
}

// Add task
function addTask(e){
    if(taskInput.value === ""){
        alert("Add a task!");
    }
    // Create li element
    const li = document.createElement('li');
    // Add Class
    li.className = 'collection-item';
    //Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon HTML
    link.innerHTML = '<i class="fa fa-remove"</i>'; 
    // Append the link to the li
    li.appendChild(link)
    // Append li to ul
    taskList.appendChild(li);

    // Store in Local Storage
    storeTaskInLocalStorage(taskInput.value);

    // Clear Input
    taskInput.value = "";

    // prevent default Behaviour of Forms
    e.preventDefault();
}


// Store Task in Local Storage
function storeTaskInLocalStorage(task){
    let tasks;
    if (localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// how to remove tasks
// Since all the remove icons have the same class 'delete-item' and they're dynamic meaning that we can add more tasks,
// we need to use event delegation here
//we are gonna put the event listener on the ul (the parent)

function removeTask(e){
    // right now wherever I click on the ul the event is called
    // we need to target the a tag
    // when we click on the remove icon we the target console.log(e.target) gives us the i tag
    // we want the a tag (the a tag is the parent of i tag)
    if (e.target.parentElement.classList.contains("delete-item")) {
        //if the a tag has the class delete-item, we want the li to be removed not just the a tag so it's the parent of the parent
        if(confirm('Are you sure?')){
        e.target.parentElement.parentElement.remove();


        // remove the task from Local Storage
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }

    e.preventDefault();
}

// Remove from Local Storage
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if (localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


// Clear Tasks
function clearTasks(){
    //There are two things we can do to clears the tasks
    // 1- 
    taskList.innerHTML = '';
    // loop through with a while loop and loop through each one --> FASTER
    while(taskList.firstChild){
        //while there is a first child ==> remove the first child
        taskList.removeChild(taskList.firstChild);
    }

    // Clear Tasks from Local Storage
    clearTasksFromLocalStorage();
}

// Clear Tasks from Local Storage
function clearTasksFromLocalStorage(){
    localStorage.clear();
}


// Filter Tasks
function filterTasks(e){
    const text = e.target.value.toLowerCase();
    // querySelectorAll returns a node list --> we can use forEach
    // getElementbyClassName returns an html collection --> can't use forEach --> need to call Array.from() method
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        } else{
            task.style.display = 'none';
        }
    });
}

