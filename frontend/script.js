document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTask');
    const taskList = document.getElementById('taskList');
    const clearCompletedBtn = document.getElementById('clearCompleted');
    const filters = document.querySelectorAll('.filter');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let currentFilter = 'all';

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function clearInput() {
        taskInput.value = '';
        taskInput.focus();
    }

    function displayTask(task, index) {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex align-items-center';
        if (task.completed) li.classList.add('completed');

        const span = document.createElement('span');
        span.className = 'task-text';
        span.textContent = task.text;
        span.style.cursor = 'pointer';

        span.addEventListener('click', () => {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            updateList();
        });

        span.addEventListener('dblclick', () => {
            const input = document.createElement('input');
            input.className = 'edit-task';
            input.value = task.text;

            input.onblur = () => {
                const newText = input.value.trim();
                if (newText !== '') {
                    tasks[index].text = newText;
                    saveTasks();
                    updateList();
                }
            };

            input.addEventListener('keypress', e => {
                if (e.key === 'Enter') input.blur();
            });

            li.replaceChild(input, span);
            input.focus();
        });

        const removeBtn = document.createElement('button');
        removeBtn.className = 'btn btn-sm btn-outline-danger btn-action';
        removeBtn.textContent = 'Remove';
        removeBtn.addEventListener('click', () => {
            li.classList.add('fade-out');
            setTimeout(() => {
                tasks.splice(index, 1);
                saveTasks();
                updateList();
            }, 300);
        });

        const completeBtn = document.createElement('button');
        completeBtn.className = 'btn btn-sm btn-purple-outline btn-action';
        completeBtn.innerHTML = '<i class="fas fa-check"></i>';
        completeBtn.title = 'Complete';
        completeBtn.addEventListener('click', () => {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            updateList();
        });

        li.appendChild(completeBtn);
        li.appendChild(span);
        li.appendChild(removeBtn);
        taskList.appendChild(li);
    }

    function updateList() {
        taskList.innerHTML = '';

        filters.forEach(btn => btn.classList.remove('active'));
        document.querySelector(`.filter[data-filter="${currentFilter}"]`)?.classList.add('active');

        tasks.forEach((task, index) => {
            const show =
                currentFilter === 'all' ||
                (currentFilter === 'active' && !task.completed) ||
                (currentFilter === 'completed' && task.completed);
            if (show) displayTask(task, index);
        });
    }

    function addTask() {
        const text = taskInput.value.trim();
        if (!text) return;
        tasks.push({ text, completed: false });
        saveTasks();
        clearInput();
        updateList();
    }

    function clearCompleted() {
        tasks = tasks.filter(task => !task.completed);
        saveTasks();
        updateList();
    }

    addTaskBtn.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', e => {
        if (e.key === 'Enter') addTask();
    });

    clearCompletedBtn.addEventListener('click', clearCompleted);

    filters.forEach(filterBtn => {
        filterBtn.addEventListener('click', () => {
            currentFilter = filterBtn.dataset.filter;
            updateList();
        });
    });

    updateList();
});