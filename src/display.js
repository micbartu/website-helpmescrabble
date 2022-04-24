'use strict'
const results_container = document.querySelector('.results-container');
const search_container = document.querySelector('.search-container');
const back_top = document.querySelector('.back-top');
const scroll_down = document.querySelector('.scroll-down');

// Display results 
const getResults = function (extra, results, boardL, letterP) {
    if (results.length === 0) {
        results_container.insertAdjacentHTML('beforeend', `<p class='no-res'>Oooops,<br>I couldn\'t find a word composed of: ${letters.length === 0 ? 'No letters' : letters.join(', ')}</p>`);
        return;
    }

    displayResults(extra, results, boardL, letterP);
}

const displayResults = function (extra, results, boardL, letterP) {
    const title_one = `<h2 class="res-title">This is what I found:</h2>`
    results_container.insertAdjacentHTML('beforeend', title_one);
    // Extra results
    let PositionLet = true;

    if (letterP === 0 || boardL === '') {
        PositionLet = false;
    }
    else if (extra.length === 0) {
        const noResults = `
            <div class="extra-container">
                <h3>I couldn't find any words with letter: <span class="extra-color">${boardL.toUpperCase()}</span> on position: <span class="extra-color">${letterP}</span></h3>
            </div>`
        results_container.insertAdjacentHTML('beforeend', noResults);
    }

    const renderResults = function (results) {
        return `${results.map(res => `<p class="flex-div-p">${res}</p>`).join('')}`;
    }

    if (extra.length !== 0) {
        const results = `
            <div class="extra-container">
                <h3>Words with letter: <span class="extra-color">${boardL.toUpperCase()}</span> on position: <span class="extra-color">${letterP}</span></h3>
                <div class="flex-div">
                    ${renderResults(extra)}
                </div>
                
            </div>
            `;

        results_container.insertAdjacentHTML('beforeend', results)
    }


    // All results
    if (PositionLet) {
        const title_two = `<h2 class="title">All matches:</h2>`
        results_container.insertAdjacentHTML('beforeend', title_two);
    }

    const all_results_con = document.createElement('div');
    all_results_con.classList.add('all-container');
    results_container.appendChild(all_results_con);

    const buildResults = function (num, arr) {
        const all_results = `
                <div class="all-results">
                    <h3>${num + 2} letter words:</h3>
                    <div class="flex-div">
                    ${renderResults(arr)}
                    </div>
                </div>`;

        all_results_con.insertAdjacentHTML('beforeend', all_results);
    }

    const twoLett = [];
    const threeLett = [];
    const fourLett = [];
    const fiveLett = [];
    const sixLett = [];
    const sevenLett = [];
    const eightLett = [];

    results.forEach(res => {
        if (res.length === 2) twoLett.push(res);
        if (res.length === 3) threeLett.push(res);
        if (res.length === 4) fourLett.push(res);
        if (res.length === 5) fiveLett.push(res);
        if (res.length === 6) sixLett.push(res);
        if (res.length === 7) sevenLett.push(res);
        if (res.length === 8) eightLett.push(res);
    });

    if (twoLett.length > 0) {
        buildResults(0, twoLett);
    }
    if (threeLett.length > 0) {
        buildResults(1, threeLett);
    }
    if (fourLett.length > 0) {
        buildResults(2, fourLett);
    }
    if (fiveLett.length > 0) {
        buildResults(3, fiveLett);
    }
    if (sixLett.length > 0) {
        buildResults(4, sixLett);
    }
    if (sevenLett.length > 0) {
        buildResults(5, sevenLett);
    }
    if (eightLett.length > 0) {
        buildResults(6, eightLett);
    }
}

// Scroll top
const displayTop = function (entries) {
    const [entry] = entries;
    if (!entry.isIntersecting) back_top.classList.remove('hidden');
    else back_top.classList.add('hidden');
}

const resultsObserver = new IntersectionObserver(displayTop,
    {
        root: null,
        threshold: 0,
        rootMargin: `${300}px`
    });

resultsObserver.observe(search_container);

back_top.addEventListener('click', function () {
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
})

// Display word and definition
const chosen_div = document.createElement('div');

const displayChosen = function (chosen) {
    const chosen_word = `<h3 class='chosen'>${chosen}</h3>`;
    chosen_div.classList.add('chosen-div');
    results_container.appendChild(chosen_div);
    chosen_div.insertAdjacentHTML('beforeend', chosen_word);
}

const displayDef = function (shortdef) {
    const def_con = document.createElement('div');
    def_con.classList.add('def-con');
    chosen_div.appendChild(def_con);

    shortdef.forEach(def => {
        def_con.insertAdjacentHTML('beforeend', `<li>${def}</li>`);
    });
}

// Remove letters from input
let chosen = '';
results_container.addEventListener('click', function (e) {

    if (chosen === e.target.textContent) return;
    chosen = e.target.textContent;
    // Go to dictionary.js
    getDefinition(chosen);

    if (chosen.length > letters.length) return;
    // Go to update.js
    clearResults();

    displayChosen(chosen);

    // Update input, letters
    for (let i = 0; i < chosen.length; i++) {
        for (let j = 0; j < letters.length; j++) {
            if (chosen[i] === letters[j]) {
                letters.splice(letters.indexOf(letters[j]), 1);
                break;
            }
        }
    }
    // Go to update.js
    updateInput(letters);
});