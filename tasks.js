
const addTaskBtn = document.getElementById('addTask');
const addTaskModal = document.getElementById('addTaskModal');
const closeBtn = document.getElementById('c-l-o-s-e');
const taskTableBody = document.getElementById('taskTableBody');
const add_Button = document.getElementById('addBtn');

//Load data from localStorage when the page loads
/* window.onload = function () {
    loadFromLS();
}; */

// Display modal on add task button click
addTaskBtn.addEventListener('click', () => {
    add_Button.textContent = "Add"; // Reset button text to 'Add' when opening modal for new task
    clear_Form();
    display_Modal();
});

// Close modal when close button is clicked
closeBtn.addEventListener('click', hide_Modal);

// Close modal when clicked outside the modal
window.onclick = function (event) {
    if (event.target == addTaskModal) {
        hide_Modal();
    }
}

/* Generate row on add or update button click */
add_Button.addEventListener('click', function () {
    const task = document.getElementById('task').value;
    if (task) {
        if (add_Button.textContent === 'Add') {
            const new_Row = generate_Table_Row(task);
            taskTableBody.appendChild(new_Row);
            addToLS(task); // Add data to localStorage
            hide_Modal();
        } else {
            const idx = add_Button.dataset.index; // Get index of the row to be updated
            update_Row(idx, task);
            updateLS(idx, task); // Update data in localStorage
            hide_Modal();
        }
        //hideModal();
        clear_Form();
    } else {
        alert('Please fill the input field!');
    }
});


/* HELPER FUNCTIONS */

/* Helper Function to generate a row */
function generate_Table_Row(task) {
    const table_Row = document.createElement('tr');

    const taskCell = document.createElement('td');
    taskCell.textContent = task;

    /* Editing the row clicking edit button */
    const edit_Button = document.createElement('button');
    edit_Button.textContent = 'Edit';
    edit_Button.style.background = "#14b8a6";
    style_Button(edit_Button);
    edit_Button.addEventListener('click', function () {
        edit_Row(table_Row);
    });

    /* Deleting the row clicking delete button */
    const delete_Button = document.createElement('button');
    delete_Button.textContent = 'Delete';
    delete_Button.style.background = "#FA8072";
    style_Button(delete_Button);
    delete_Button.addEventListener('click', function () {
        delete_Row(table_Row);
    });

    const edit_Cell = document.createElement('td');
    edit_Cell.appendChild(edit_Button);
    const delete_Cell = document.createElement('td');
    delete_Cell.appendChild(delete_Button);

    table_Row.appendChild(taskCell);
    table_Row.appendChild(edit_Cell);
    table_Row.appendChild(delete_Cell);

    return table_Row;
}

// Helper function to add data to localStorage
function addToLS(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ task });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Helper function to load data from localStorage
function loadFromLS() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const new_Row = generate_Table_Row(task.task);
        taskTableBody.appendChild(new_Row);
    });
}

// Helper function to edit the row
function edit_Row(row) {
    const cells = row.cells;
    document.getElementById('task').value = cells[0].textContent;

    add_Button.textContent = 'Update';
    add_Button.dataset.index = row.rowIndex - 1; // Set the index of the row to be updated

    display_Modal();
}
// Helper function to update the row
function update_Row(index, task) {
    const row = taskTableBody.rows[index];
    const cells = row.cells;
    cells[0].textContent = task;
}

// Helper function to update data in localStorage
function updateLS(index, task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks[index] = { task };
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

/* Helper Function to delete the row */
function delete_Row(row) {
    const index = row.rowIndex - 1;
    row.remove();

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

/* Function for clearing the form fields */
function clear_Form() {
    addTaskModal.getElementsByTagName('form')[0].reset();
}

/* Function for display the modal */
function display_Modal() {
    addTaskModal.style.display = "block";
}

/* Function for hide the modal */
function hide_Modal() {
    addTaskModal.style.display = "none";
}

/* Function for styling buttons */
function style_Button(button) {
    button.style.fontSize = "1.2rem";
    button.style.color = "white";
    button.style.border = "none";
    button.style.borderRadius = ".2rem";
    button.style.padding = ".4rem .8rem";
    button.style.cursor = "pointer";
}



