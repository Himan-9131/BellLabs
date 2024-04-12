
function fetchAndDisplayProjects(option) {
    let selectedOption = option || 'ongoing';
    let projectContainer = document.querySelector('.project-container');
    projectContainer.innerHTML = "";

    fetch('./projects.json')
        .then(response => response.json())
        .then(data => {

            let filteredProjects = [];

            if (selectedOption === 'ongoing') {
                filteredProjects = data.slice(0, 3);
            } else if (selectedOption === 'completed') {
                filteredProjects = data.slice(3, 6);
            } else if (selectedOption === 'upcoming') {
                filteredProjects = data.slice(6, 8);
            }
            displayProjectCards(filteredProjects);
        })
        .catch(error => console.error('Error fetching JSON:', error));

}

// Helper Function

function displayProjectCards(projects) {

    let projectContainer = document.querySelector('.project-container');
    projects.forEach(project => {
        let projectCard = document.createElement('div');
        projectCard.classList.add('project-card');
        projectCard.innerHTML = `
        <div class="project-image">
            <img src="${project.image}" alt="">       
        </div>
        <div class="project-desc">
            <h3>${project.name}</h3>
            <p>${project.description}</p>
        </div>
        `;
        projectContainer.appendChild(projectCard);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    fetchAndDisplayProjects();
});

document.getElementById('project-selector').addEventListener('change', function() {
    let selectedOption = this.value;
    fetchAndDisplayProjects(selectedOption);
});