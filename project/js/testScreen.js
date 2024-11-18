import {UserDataBase, User, StudySet } from "../js/Storage.js";





const testTest = new Map();
testTest.set("What is the language we use to style a Web page?","css");
testTest.set("What is the standard markup language for Web pages?","html");
testTest.set("What is an object-oriented computer programming language commonly used to create interactive effects within web browsers?","javascript");
testTest.set("What sound do frogs make?","ribbit");
testTest.set("Is 326 awesome?","yes");

const key = Array.from(testTest.keys());

const set1 = new StudySet("CICS 326",testTest);

const user1 = new User("Maddie", "mgelnett@umass.edu", 1);



// Create the UserDataBase instance
const db = new UserDataBase('test');

let result;

try {
  // Open the database
  result = await db.openDatabase();
  console.log("Database opened successfully.");
} catch (error) {
  console.log("Error opening the database:", error);
}

try {
  // Add user to the database
  result = await db.addUser(user1);
  console.log("User added successfully:", result); // Should log "Task added successfully!"
} catch (error) {
  console.log("Failed to add user:", error);
}

try {
  // Get all users from the database
  result = await db.getUsers();
  console.log("Users retrieved:", result);
} catch (error) {
  console.log("Error getting users:", error);
}



let questions = [];
let answers = [];
for(let a = 0; a<key.length;a++){
    answers[a]=null;
}

const build = () => {
const testList= document.getElementById("list");
for(let i = 0;i<key.length;i++){
    questions.push(key[i]);
    const questionbox = document.createElement("div");
    questionbox.classList.add("testing-box");

    const question = document.createElement("div");
    question.classList.add("question");
    question.textContent="Definition: "+key[i];

    const answerText= document.createElement("answer");
    answerText.style.left = '50%';
    answerText.style.top = '50%';
    answerText.style.transform = 'translate(36%, -35%)';
    answerText.innerHTML="Answer:";

    const answer = document.createElement("input");
    answer.style.left = '50%';
    answer.style.top = '50%';
    answer.style.transform = 'translate(25%, -50%)';
    answer.classList.add("answer");
    answers[i]="";
    answer.addEventListener("keyup", ()=>{answers[i]=answer.value})
    
    questionbox.appendChild(question);
    questionbox.appendChild(answerText)
    questionbox.appendChild(answer);

    console.log(answer);
    testList.appendChild(questionbox);
    
}
}

build();

const results = ()=>{
    const testboxRemove = Array.from(document.getElementsByClassName("testing-box"));
    let count = 0;
    while(testboxRemove.length>count){
        console.log(testboxRemove[0]);
        testboxRemove[count].remove();
        count++;
    }
    let totalRight = 0;
    console.log(questions.length);
    for(let i = 0;i<questions.length-1;i++){
        if(testTest.get(key[i]).toLowerCase()==answers[i].toLowerCase()){
            totalRight++;
        }
    }

    const submitButton = document.getElementById("submit");
    submitButton.remove();
    const testList= document.getElementById("list");
    const result = document.createElement("div");
    result.classList.add("results");
    result.innerHTML="Results = " + totalRight/key.length*100+"%";
    testList.appendChild(result);

    for(let i = 0;i<answers.length;i++){
        console.log(i);
        questions.push(key[i]);
        const questionbox = document.createElement("div");
        questionbox.classList.add("testing-box");
    
        const question = document.createElement("div");
        question.classList.add("question");
        question.textContent="Definition: "+key[i];
        
        const answer = document.createElement("div");
        answer.style.left = '50%';
        answer.style.top = '50%';
        answer.style.transform = 'translate(25%, -50%)';
        answer.classList.add("result-box");
        if(testTest.get(key[i]).toLowerCase()==answers[i].toLowerCase()){
            answer.classList.add("correct");
            answer.textContent="Correct: "+testTest.get(key[i])+" == " + answers[i];
        }
        else{   
            answer.classList.add("wrong");
            answer.textContent="Incorrect: "+testTest.get(key[i])+" != " + answers[i];
        }
        
        
        
        questionbox.appendChild(question);
        questionbox.appendChild(answer);
        testList.appendChild(questionbox);
    }

    const buttonStorage = document.createElement("div");
    buttonStorage.classList.add("test-list");
    const button = document.createElement("button");
    button.classList.add("submit-button");
    button.innerHTML="Back";
    buttonStorage.appendChild(button);

    button.addEventListener("click",()=>{location.href = "intro.html"});
    const button2 = document.createElement("button");
    button2.classList.add("submit-button");
    button2.innerHTML="Restart";
    button2.addEventListener("click",()=>{location.href = "testing.html"})
    buttonStorage.appendChild(button2);

    testList.appendChild(buttonStorage);
}



const submitButton = document.getElementById("submit");
submitButton.addEventListener("click",()=>{results()});






    