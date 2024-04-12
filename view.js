// Get the tableHeader
let tableHeader = document.getElementById('table-header');
// Get the view buttons container
let viewButtons = document.getElementsByClassName('viewBtn');

// Add event listener to each view button
for (let i = 0; i < viewButtons.length; i++) {

    viewButtons[i].addEventListener('click', function () {

        // Remove active class from all buttons
        for (let j = 0; j < viewButtons.length; j++) {
            viewButtons[j].classList.remove("active");
        }

        // Add active class to the clicked button
        this.classList.add("active");

        // Toggle between list and grid view based on the button clicked
        if (this.id === 'list-view') {
            employeeTableBody.classList.remove('grid');
            employeeTableBody.classList.add('list');
            tableHeader.style.display = 'table-header-group';
        } else if (this.id === 'grid-view') {
            employeeTableBody.classList.remove('list');
            employeeTableBody.classList.add('grid');
            tableHeader.style.display = 'none';
        }
    });
}






