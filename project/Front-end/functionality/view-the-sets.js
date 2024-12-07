import {StudySet, User } from '../js/Storage';

let tileAddVisible = false;
let currSet = new StudySet();

// initialize the sets of this user
//TODO: Only a few at a time? page numbers?
function initSets() {
    Object.entries(currSet.getDic).forEach(([key, value]) => {

        // make tile visible
        createTile(key, value, false);
    });
}

// display a set
function createTile(question, answer, updateStorage) {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    
    tile.innerHTML = `
        <p class="question">${question}</p>
        <p class="answer">${answer}</p>
        <div class="edit-button">Edit</div>
    `;

    // Add edit functionality to the tile
    tile.querySelector('.edit-button').addEventListener('click', function() {
        editTile(tile);
    });

    const tilesContainer = document.getElementById('tile-container');
    tilesContainer.appendChild(tile);

    if (updateStorage) { // update storage if needed
        currSet.dicAdd(question, answer);
    }

    return tile;
}