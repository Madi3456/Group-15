import {StudySet, User } from '../js/Storage';

let flashcardAddVisible = false;
let currSet = new StudySet();

// initialize the set we clicked on
function initFlashcards() {
    Object.entries(currSet.getDic).forEach(([key, value]) => {

        // make flashcard visible
        createFlashcard(key, value, false);
    });
}

// adding a new card to an existing set -- after add was pressed
function editFlashcard(flashcard) {

    const flashcardsContainer = document.getElementById('flashcard-container');

    const question = flashcard.querySelector('.question').textContent;
    const answer = flashcard.querySelector('.answer').textContent;

    flashcard.innerHTML = `
    <input class="question-input" value="${question}"></input>
    <input class="answer-input" value="${answer}"></input>
    <div class="confirm-button">Confirm</div>
    <div class="close-button">Delete</div>
    `;

    let updatedQuestion;
    let updatedAnswer;

    // Add edit functionality to the flashcard
    flashcard.querySelector('.confirm-button').addEventListener('click', function() {
        const question2 = flashcard.querySelector('.question-input').value;
        const answer2 = flashcard.querySelector('.answer-input').value;

        updatedAnswer = answer2;
        updatedQuestion = question2;

        flashcard.innerHTML = `
        <p class="question">${question2}</p>
        <p class="answer">${answer2}</p>
        <div class="edit-button">Edit</div>
    `;
    });
    flashcard.querySelector('.close-button').addEventListener('click', function() {
        flashcardsContainer.removeChild(flashcard);
    });

    // update storage
    currSet.dicRemove(question);
    currSet.dicAdd(updatedQuestion, updatedAnswer);
}

function clickedAddNew() {
    // if already visible don't show
    if (flashcardAddVisible) {
        return;
    }

    //otherwise we're making it so set it to true
    flashcardAddVisible = true;

    const flashcard = document.createElement('div');
    flashcard.classList.add('flashcard');
    
    flashcard.innerHTML = `
        <input class="question-input"></input>
        <input class="answer-input"></input>
        <div class="confirm-button">Confirm</div>
        <div class="close-button">X</div>
    `;

    // add edit functionality to the flashcard
    flashcard.querySelector('.confirm-button').addEventListener('click', function() {
        createFlashcard(flashcard.querySelector('.question-input').value, flashcard.querySelector('.answer-input').value, true);
        flashcardsContainer.removeChild(flashcard);
        flashcardAddVisible = false;
    });
    flashcard.querySelector('.close-button').addEventListener('click', function() {
        flashcardsContainer.removeChild(flashcard);
        flashcardAddVisible = false;
    });

    // add it to the page
    const flashcardsContainer = document.getElementById('flashcard-container');
    flashcardsContainer.appendChild(flashcard);

    return flashcard;
}

// adding a new card to an existing set -- after add was pressed
function createFlashcard(question, answer, updateStorage) {
    const flashcard = document.createElement('div');
    flashcard.classList.add('flashcard');
    
    flashcard.innerHTML = `
        <p class="question">${question}</p>
        <p class="answer">${answer}</p>
        <div class="edit-button">Edit</div>
    `;

    // Add edit functionality to the flashcard
    flashcard.querySelector('.edit-button').addEventListener('click', function() {
        editFlashcard(flashcard);
    });

    const flashcardsContainer = document.getElementById('flashcard-container');
    flashcardsContainer.appendChild(flashcard);

    if (updateStorage) { // update storage if needed
        currSet.dicAdd(question, answer);
    }

    return flashcard;
}