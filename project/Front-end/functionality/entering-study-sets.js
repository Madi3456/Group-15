let flashcards =[];

let data = {};

function addFlashcards() {
  
  const term = document.getElementById("term").value;           
  const definition = document.getElementById("definition").value;

  if (term!=='' && definition!=='') {
    flashcards.push({term,definition})
    data[term]=definition;
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
console.log(data);
let subjects = [];

function addSubject() {
  const subject = document.getElementById("subjects").value.toLowerCase();           
  subjects.push(subject);
  console.log(subjects);
}

const n = document.getElementById("name-set");

const addbutton = document.getElementById("add-Subject");

addbutton.addEventListener("click",()=>addSubject());

async function addSet() {
  let nameSet = n.value;
  console.log(JSON.stringify({nameSet,subjects,data}));
  subjects=JSON.stringify(subjects);
  data=JSON.stringify(data);
  await fetch("/v1/sets", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({nameSet,subjects,data}),
  });
}

const submit = document.getElementById("save-set");
submit.addEventListener("click",()=>addSet());