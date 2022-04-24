'use strict'
const container = document.querySelector('.container');
const question_mark = document.querySelector('.question-mark');
const display_help = document.querySelector('.display-help');
const close_btn = document.querySelector('.close-btn');
const search = document.querySelector('.search');
const clearAll = document.querySelector('.clearAll');
const form = document.getElementById('form');
const welcome = document.querySelector('.welcome-container');
const footer = document.querySelector('.footer');

// Open and close help section
document.addEventListener('click', function (e) {
    if (e.target.closest('.help') && display_help.classList.contains('hidden')) {
        display_help.classList.remove('hidden');
        container.classList.add('blur');
        return;
    }
    if (e.target.matches('.display-help') || e.target.matches('.help-text') || e.target.closest('.help-text')) return;
    display_help.classList.add('hidden');
    container.classList.remove('blur');
});

// Submit form
search.addEventListener('click', function (e) {
    e.preventDefault();
    reset();
    // Go to update.js
    getInput();
    welcome.classList.add('hidden');
    results_container.classList.remove('hidden');
});

// Clear field on focus and clear placeholder
form.addEventListener('focusin', (e) => {
    e.target.value = '';
    e.target.classList.add('hide')
});

form.addEventListener('focusout', function (e) {
    e.target.classList.remove('hide');
})

clearAll.addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('form').reset();
    // Go to update.js
    reset();

    results_container.classList.add('hidden');
    welcome.classList.remove('hidden');
});

footer.innerHTML = `<h5>&copy; ${new Date().getFullYear()} Micaya. All Rights Reserved.</h5>`;