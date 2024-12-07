
let flashcards = [];

function addFlashcards() {
  
  const term = document.getElementById("term").value;           
  const definition = document.getElementById("definition").value;

  if (term!=='' && definition!=='') {
    flashcards.push({ term, definition });
    
    const cards = document.getElementById("flash");
    cards.innerHTML = '';
    for(const i of flashcards){
        const flashcardElement = document.createElement('div');
        flashcardElement.classList.add('flashcard');
        flashcardElement.innerHTML = `
      <div class="term">${i.term}</div>
      <div class="definition">${i.definition}</div>
        `;
    cards.appendChild(flashcardElement);
    }
  } 
  document.getElementById("term").value = '';
  document.getElementById("definition").value = '';
  
}
