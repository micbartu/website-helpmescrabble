'use strict'
const bench_container = document.querySelector('.bench');
const errorMsg = document.querySelector('.error');
const bench = document.querySelectorAll('.letter');
const number = document.querySelector('.number');
const board_letter = document.querySelector('.board-letter');
const letter_position = document.querySelector('.letter-position');
let letters = [];
let board_letter_val = '';
let letter_position_val = 0;

// Jump to next input automatically, change input to Upper Case, check value
let flag = true;
Array.from(bench).forEach(letter => {
    letter.addEventListener("keyup", function () {
        letter.value = letter.value.toUpperCase();
        // Check if value is not a number
        flag = checkCharacter(letter.value);
        if (flag === false) {
            letter.value = '';
            return;
        }
        if (letter.nextElementSibling === null) return;
        letter.nextElementSibling.focus()
        errorMsg.textContent = '';
    });
});

// Check if value is a number from 1-8
number.addEventListener('keyup', function (e) {
    flag = checkNumber(e.target.value);
    if (flag === false) {
        number.value = '';
        return;
    }
    errorMsg.textContent = '';
})

// Get letters from input
const getInput = function () {
    bench.forEach(function (letter) {
        if (letter.value) {
            letters.push(letter.value.toLowerCase());
        }
    });

    // Letter from board and number value
    if (board_letter) board_letter_val = board_letter.value;
    if (letter_position) letter_position_val = Number(letter_position.value);

    // Go to search.js
    checkWord(letters, board_letter.value.toLowerCase(), letter_position_val);
}

// Update input fields
const updateInput = function (letters) {
    resetInput();
    for (let i = 0; i < letters.length; i++) {
        bench[i].value = letters[i].toUpperCase();
    }
}

// Validation
const checkCharacter = function (c) {
    if (!/^[a-zA-Z]+$/.test(c)) {
        errorMsg.textContent = "Only letters A to Z";
        return false;
    } else return true;
}

const checkNumber = function (c) {
    if (!/^[1-8]+$/.test(c)) {
        errorMsg.textContent = "Only numbers from 1 to 8"
        return false;
    } else return true;
}



// Reset input fields
const resetInput = function () {
    bench.forEach(function (letter) {
        letter.value = '';
        letter_position.value = '';
    });
}

// Reset arr and results container
const reset = function () {
    letters = [];
    clearResults();
    errorMsg.textContent = '';
}

// Clear results
const clearResults = function () {
    results_container.innerHTML = '';
    if (chosen_div) {
        chosen_div.innerHTML = '';
    }
}