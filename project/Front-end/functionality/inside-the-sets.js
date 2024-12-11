let flashcardAddVisible = false;

// import current set of flashcards from storage

window.onload = () => {
    const storedSet = localStorage.getItem('selectedSet');
    console.log(storedSet);

    if (storedSet) {
        // Parse the stored set data into an object
        const selectedSet = JSON.parse(storedSet);
        
        // Iterate over each key-value pair in the map/dict
        Object.entries(selectedSet).forEach(([question, answer]) => {
            // Use the createFlashcard function to generate a flashcard
            createFlashcard(question, answer);
        });
    } else {
        console.error('No set found in localStorage');
    }
};

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

    // Add edit functionality to the flashcard
    flashcard.querySelector('.confirm-button').addEventListener('click', function() {
        const question2 = flashcard.querySelector('.question-input').value;
        const answer2 = flashcard.querySelector('.answer-input').value;

        flashcard.innerHTML = `
        <p class="question">${question2}</p>
        <p class="answer">${answer2}</p>
        <div class="edit-button">Edit</div>
    `;
    });
    flashcard.querySelector('.close-button').addEventListener('click', function() {
        flashcardsContainer.removeChild(flashcard);
    });
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
        createFlashcard(flashcard.querySelector('.question-input').value, flashcard.querySelector('.answer-input').value);
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
function createFlashcard(question, answer) {
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

    return flashcard;
}


// 