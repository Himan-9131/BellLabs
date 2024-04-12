
const addEmployeeBtn = document.getElementById('cta');
const addEmployeeModal = document.getElementById('addEmployeeModal');
const closeModalBtn = document.getElementById('close');
const employeeTableBody = document.getElementById('employeeTableBody');
const addButton = document.getElementById('add-btn');

// Load data from localStorage when the page loads
/* window.onload = function () {
     loadFromLocalStorage();
 }; */

// Display modal on add employee button click
addEmployeeBtn.addEventListener('click', () => {
    addButton.textContent = "Add"; // Reset button text to 'Add' when opening modal for new employee
    clearForm();
    displayModal();
});

// Close modal when close button is clicked
closeModalBtn.addEventListener('click', hideModal);

// Close modal when clicked outside the modal
window.onclick = function (event) {
    if (event.target == addEmployeeModal) {
        hideModal();
    }
}

/* Generate row on add or update button click */
addButton.addEventListener('click', function () {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const title = document.getElementById('title').value;
    const role = document.getElementById('role').value;

    if (name && email && title && role) {

        if (addButton.textContent === 'Add') {
            const newRow = generateTableRow(name, email, title, role);
            employeeTableBody.appendChild(newRow);
            addToLocalStorage(name, email, title, role); // Add data to localStorage
            hideModal();
        } else {
            const index = addButton.dataset.index; // Get index of the row to be updated
            updateRow(index, name, email, title, role);
            updateLocalStorage(index, name, email, title, role); // Update data in localStorage
            hideModal();
        }
        //hideModal();
        clearForm();
    } else {
        alert('Please fill in all fields!');
    }
});


/* HELPER FUNCTIONS */

/* Helper Function to generate a row */
function generateTableRow(name, email, title, role) {
    const tableRow = document.createElement('tr');

    const nameCell = document.createElement('td');
    nameCell.textContent = name;

    const emailCell = document.createElement('td');
    emailCell.textContent = email;

    const titleCell = document.createElement('td');
    titleCell.textContent = title;

    const roleCell = document.createElement('td');
    roleCell.textContent = role;

    /* Editing the row clicking edit button */
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.style.background = "#14b8a6";
    styleButton(editButton);
    editButton.addEventListener('click', function () {
        editRow(tableRow);
    });

    /* Deleting the row clicking delete button */
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.style.background = "#FA8072";
    styleButton(deleteButton);
    deleteButton.addEventListener('click', function () {
        deleteRow(tableRow);
    });

    const editCell = document.createElement('td');
    editCell.appendChild(editButton);
    const deleteCell = document.createElement('td');
    deleteCell.appendChild(deleteButton);

    tableRow.appendChild(nameCell);
    tableRow.appendChild(emailCell);
    tableRow.appendChild(titleCell);
    tableRow.appendChild(roleCell);
    tableRow.appendChild(editCell);
    tableRow.appendChild(deleteCell);

    return tableRow;
}

// Helper function to add data to localStorage
function addToLocalStorage(name, email, title, role) {
    let employees = JSON.parse(localStorage.getItem('employees')) || [];
    employees.push({ name, email, title, role });
    localStorage.setItem('employees', JSON.stringify(employees));
}

// Helper function to load data from localStorage
function loadFromLocalStorage() {
    let employees = JSON.parse(localStorage.getItem('employees')) || [];
    employees.forEach(employee => {
        const newRow = generateTableRow(employee.name, employee.email, employee.title, employee.role);
        employeeTableBody.appendChild(newRow);
    });
}

// Helper function to edit the row
function editRow(row) {
    const cells = row.cells;
    document.getElementById('name').value = cells[0].textContent;
    document.getElementById('email').value = cells[1].textContent;
    document.getElementById('title').value = cells[2].textContent;
    document.getElementById('role').value = cells[3].textContent;

    addButton.textContent = 'Update';
    addButton.dataset.index = row.rowIndex - 1; // Set the index of the row to be updated

    displayModal();
}
// Helper function to update the row
function updateRow(index, name, email, title, role) {
    const row = employeeTableBody.rows[index];
    const cells = row.cells;
    cells[0].textContent = name;
    cells[1].textContent = email;
    cells[2].textContent = title;
    cells[3].textContent = role;
}

// Helper function to update data in localStorage
function updateLocalStorage(index, name, email, title, role) {
    let employees = JSON.parse(localStorage.getItem('employees')) || [];
    employees[index] = { name, email, title, role };
    localStorage.setItem('employees', JSON.stringify(employees));
}

/* Helper Function to delete the row */
function deleteRow(row) {
    const index = row.rowIndex - 1;
    row.remove();

    let employees = JSON.parse(localStorage.getItem('employees')) || [];
    employees.splice(index, 1);
    localStorage.setItem('employees', JSON.stringify(employees));
}

/* Function for clearing the form fields */
function clearForm() {
    addEmployeeModal.getElementsByTagName('form')[0].reset();
}

/* Function for display the modal */
function displayModal() {
    addEmployeeModal.style.display = "block";
}

/* Function for hide the modal */
function hideModal() {
    addEmployeeModal.style.display = "none";
}

/* Function for styling buttons */
function styleButton(button) {
    button.style.fontSize = "1.2rem";
    button.style.color = "white";
    button.style.border = "none";
    button.style.borderRadius = ".2rem";
    button.style.padding = ".4rem .8rem";
    button.style.cursor = "pointer";
}



