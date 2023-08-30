window.addEventListener('load', () => {
    alert('New update coming soon!');
    const form = document.querySelector('#new-task-form');
    const input = document.querySelector('#new-task-input');
    const datetimeInput = document.querySelector('#new-task-datetime');
    const list_el = document.querySelector('#tasks');

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

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

            const task_datetime_el = document.createElement('span');
            task_datetime_el.classList.add('task-datetime');
            task_datetime_el.textContent = task.datetime;
            task_content_el.appendChild(task_input_el);
            task_content_el.appendChild(task_datetime_el);

            task_el.appendChild(task_content_el);

            const task_actions_el = document.createElement('div');
            task_actions_el.classList.add('actions');

            const task_edit_el = document.createElement('button');
            task_edit_el.classList.add('edit');
            task_edit_el.textContent = 'Edit';

            const task_save_el = document.createElement('button');
            task_save_el.classList.add('save');
            task_save_el.textContent = 'Save';

            const task_delete_el = document.createElement('button');
            task_delete_el.classList.add('delete');
            task_delete_el.textContent = 'Delete';

            task_save_el.style.display = 'none';

            task_edit_el.addEventListener('click', () => {
                task_input_el.removeAttribute('readonly');
                task_input_el.focus();
                task_edit_el.style.display = 'none';
                task_save_el.style.display = 'inline';
            });

            task_save_el.addEventListener('click', () => {
                task_input_el.setAttribute('readonly', 'readonly');
                task_edit_el.style.display = 'inline';
                task_save_el.style.display = 'none';
                tasks[index].text = task_input_el.value;
                updateLocalStorage();
            });

            task_delete_el.addEventListener('click', () => {
                tasks.splice(index, 1);
                updateLocalStorage();
                renderTasks();
            });

            task_actions_el.appendChild(task_edit_el);
            task_actions_el.appendChild(task_save_el);
            task_actions_el.appendChild(task_delete_el);

            task_el.appendChild(task_actions_el);

            task_input_el.addEventListener('click', () => {
                task.completed = !task.completed;
                updateLocalStorage();
                renderTasks();
            });

            list_el.appendChild(task_el);
        });
    };

    const updateLocalStorage = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const task = input.value;
        const datetime = datetimeInput.value;

        if (!task || !datetime) {
            alert('Please fill out the task and select a date and time');
            return;
        }

        tasks.push({ text: task, completed: false, datetime: datetime });
        updateLocalStorage();
        renderTasks();

        input.value = '';
        datetimeInput.value = '';
    });

    renderTasks();
});