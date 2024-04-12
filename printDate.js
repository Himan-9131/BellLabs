let timeContainer = document.querySelector('#date-time');

/* Current date assign to p element */
let currDate = new Date();
let options = { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long'  
};
let dateString = currDate.toLocaleDateString('en-US', options);
timeContainer.textContent = dateString;
