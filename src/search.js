'use strict'
let results_arr = [];
let extra_arr = [];

// Go to update.js
const checkWord = function (letters, boardLetter, letterPos) {
    results_arr = [];
    extra_arr = [];

    words.forEach(word => {
        let tempWord = word;
        for (let i = 0; i < letters.length; i++) {
            for (let j = 0; j < tempWord.length; j++) {
                if (letters[i] === tempWord[j]) {
                    tempWord = tempWord.replace(tempWord[j], '');
                    break;
                }
            }
            // Find all results
            if (tempWord.length === 0) {
                results_arr.push(word);
                // Find extra results
                if (word[letterPos - 1] === boardLetter) {
                    extra_arr.push(word);
                }
                break;
            }
        }
    });

    sortResults(extra_arr);
    sortResults(results_arr);
    // Go to display.js
    getResults(extra_arr, results_arr, boardLetter, letterPos);
}

// Sort results by length
const sortResults = function (res) {
    res.sort((a, b) => {
        if (a.length > b.length) {
            return 1;
        }
        if (a.length < b.length) {
            return -1;
        }
        return 0;
    });
}