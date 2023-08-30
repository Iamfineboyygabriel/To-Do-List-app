window.addEventListener('load', () => {
    alert('new update coming soon !')
    const form = document.querySelector('#new-task-form');
    const input = document.querySelector('#new-task-input');
    const list_el = document.querySelector('#tasks');

    // Load tasks from local storage on page load
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Function to render tasks
    const renderTasks = () => {
        list_el.innerHTML = '';

        tasks.forEach((task, index) => {
            const task_el = document.createElement('div');
            task_el.classList.add('task');

            const task_content_el = document.createElement('div');
            task_content_el.classList.add('content');

            const task_input_el = document.createElement('input');
            task_input_el.type = 'text';
            task_input_el.value = task.text;
            if (task.completed) {
                task_input_el.classList.add('completed');
            }
            task_input_el.setAttribute('readonly', 'readonly');

            // Add click event listener to toggle completion status
            task_input_el.addEventListener('click', () => {
                task.completed = !task.completed;
                updateLocalStorage();
                renderTasks(); // Re-render tasks after completion status change
            });

            task_content_el.appendChild(task_input_el);

            const task_actions_el = document.createElement('div');
            task_actions_el.classList.add('actions');

            const task_edit_el = document.createElement('button');
            task_edit_el.classList.add('edit');
            task_edit_el.textContent = 'Edit';

            const task_delete_el = document.createElement('button');
            task_delete_el.classList.add('delete');
            task_delete_el.textContent = 'Delete';

            // Add click event listener to delete task
            task_delete_el.addEventListener('click', () => {
                tasks.splice(index, 1);
                updateLocalStorage();
                renderTasks(); // Re-render tasks after deletion
            });

            task_actions_el.appendChild(task_edit_el);
            task_actions_el.appendChild(task_delete_el);

            task_el.appendChild(task_content_el);
            task_el.appendChild(task_actions_el);

            list_el.appendChild(task_el);

            task_edit_el.addEventListener('click', () => {
                task_input_el.removeAttribute('readonly');
                task_input_el.focus();
                task_edit_el.innerText = 'Save';
            });
        });
    };

    // Function to update local storage
    const updateLocalStorage = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const task = input.value;

        if (!task) {
            alert('Please fill out the task');
            return;
        }

        tasks.push({ text: task, completed: false });
        updateLocalStorage();
        renderTasks();

        input.value = ''; // Clear the input field after adding the task
    });

    // Call the renderTasks function on page load
    renderTasks();
});