'use strict'

async function getDefinition(word) {
    const res = await fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${API_KEY}`);
    const [{ shortdef }] = await res.json();

    if (!shortdef || shortdef.length === 0) {

        chosen_div.insertAdjacentHTML('beforeend', `<p class='no-res'>sorry, no definition found</p>`);
        return;
    }
    // Go to display.js
    displayDef(shortdef);
}