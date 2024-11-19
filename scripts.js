
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

const loadTasks = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'flex justify-between items-center p-2 border-b border-gray-300';
        li.innerHTML = `
            <span class="${task.completed ? 'line-through' : ''}">${task.text}</span>
            <div>
                <button onclick="editTask(${index})" class="bg-yellow-500 text-white p-1 rounded mr-2">Edit</button>
                <button onclick="deleteTask(${index})" class="bg-red-500 text-white p-1 rounded">Delete</button>
                <button onclick="toggleComplete(${index})" class="bg-green-500 text-white p-1 rounded ml-2">${task.completed ? 'Undo' : 'Complete'}</button>
            </div>
        `;
        taskList.appendChild(li);
    });
};

const saveTasks = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
};

addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    const dateAdded = new Date().toLocaleString();
    if (taskText) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push({ text: taskText, completed: false });
        saveTasks(tasks);
        taskInput.value = '';
    }
    

});

window.editTask = (index) => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const newTaskText = prompt('Edit task:', tasks[index].text);
    if (newTaskText !== null) {
        tasks[index].text = newTaskText;
        saveTasks(tasks);
    }
};

window.deleteTask = (index) => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.splice(index, 1);
    saveTasks(tasks);
};

window.toggleComplete = (index) => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks[index].completed = !tasks[index].completed;
    saveTasks(tasks);
};
loadTasks();

// Dark Mode
function toggleMode() {
    const body = document.getElementById('body');
    const toggleBtn = document.getElementById('toggleModeBtn');
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const box = document.querySelector('.max-w-xl');
    if (body.classList.contains('bg-gray-100')) {
        body.classList.remove('bg-gray-100');
        body.classList.add('bg-gray-900', 'text-white');
        toggleBtn.textContent = 'Switch to Day Mode';
        taskInput.classList.add('bg-gray-800', 'text-white');
        addTaskBtn.classList.add('bg-gray-800', 'text-white');
        box.classList.add('bg-gray-700');
    } else {
        body.classList.remove('bg-gray-900', 'text-white');
        body.classList.add('bg-gray-100');
        toggleBtn.textContent = 'Switch to Night Mode';
        taskInput.classList.remove('bg-gray-800', 'text-white');
        addTaskBtn.classList.remove('bg-gray-800', 'text-white');
        box.classList.remove('bg-gray-700');
    }
}