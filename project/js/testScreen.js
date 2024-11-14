const testTest = new Map();
testTest.set("What is the language we use to style a Web page?","css");
testTest.set("What is the standard markup language for Web pages?","html");
testTest.set("What is an object-oriented computer programming language commonly used to create interactive effects within web browsers?","javascript");
testTest.set("Is 326 awesome?","yes");

const key = Array.from(testTest.keys());


let questions = [];
let answers = [];
for(let a = 0; a<key.length;a++){
    answers[a]=null;
}

const build = () => {
const testList= document.getElementById("list");
for(let i = 0;i<key.length;i++){
    const questionbox = document.createElement("div");
    questionbox.classList.add("testing-box");

    const question = document.createElement("div");
    question.classList.add("question");
    question.textContent="Definition: "+key[i];

    const answerText= document.createTextNode("Answer:");

    const answer = document.createElement("input");
    answer.style.left = '50%';
    answer.style.top = '50%';
    answer.style.transform = 'translate(25%, -50%)';
    answer.classList.add("answer");
    answer.addEventListener("keyup", ()=>{answers[i]=answer.value})
    
    questionbox.appendChild(question);
    questionbox.appendChild(answerText)
    questionbox.appendChild(answer);

    console.log(answer);
    testList.appendChild(questionbox);
    
}
}

build();

const submitButton = document.getElementById("submit");
submitButton.addEventListener("click",()=>{console.log(answers)});
