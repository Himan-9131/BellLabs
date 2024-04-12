const searchInput = document.querySelector('.search');

searchInput.addEventListener('input', function (event) {

    const searchText = event.target.value.trim().toLowerCase();

    const rows = document.querySelectorAll('#employeeTableBody tr');

    rows.forEach(row => {
        const name = row.cells[0].textContent.trim().toLowerCase();
        const email = row.cells[1].textContent.trim().toLowerCase();
        const title = row.cells[2].textContent.trim().toLowerCase();
        const role = row.cells[3].textContent.trim().toLowerCase();

        if (name.includes(searchText) || email.includes(searchText) || title.includes(searchText) || role.includes(searchText)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    })
});