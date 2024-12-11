
//get the sets form data base
async function getSets() {
    let d = [];
    const response =  await fetch("/v1/sets").then(response => response.json())  // Parse the JSON response
    .then(data => {
      d=data.items;
    })
    .catch(error => {
      console.error('Error fetching data:', error);  // Handle error
    });
    return d;
}
//get the Sets by name
async function getSetByName(name){
    let sets = await getSets();
    for(let i = 0;i<sets.length;i++){
        if(sets[i].nameSet==name){
            return sets[i];
        }
    }
    return null;
}

//getting subject's from set
function getSubjects(Set){
    return JSON.parse(Set.subjects);
}


//getting subject's from set
function getData(Set){
    return JSON.parse(Set.data);
}

console.log(getData(await getSetByName("Test")));


function generates(Sets){
  console.log(Sets);
    console.log(Sets.length);
    const testList = document.getElementById("list");
    for(let i = 0;i<Sets.length;i++){
      
      const questionbox = document.createElement("div");
      questionbox.classList.add("testing-box");

      const innertext = document.createElement("div");
      innertext.classList.add("question");
      innertext.innerHTML=Sets[i].nameSet;

      const flash = document.createElement("div");
      flash.classList.add("active-box");
      flash.innerHTML="flashcards";
      flash.style.left = '50%';
      flash.style.top = '50%';
      flash.style.transform = 'translate(40%, -50%)';
      flash.addEventListener("click",()=>{
        localStorage.setItem('selectedSet', JSON.stringify(getData(Sets[i])));
        location.href = "inside-the-sets.html";
      });

      const test = document.createElement("div");
      test.classList.add("active-box");
      test.innerHTML="test";
      test.style.left = '75%';
      test.style.top = '75%';
      test.style.transform = 'translate(40%, -70%)';

      test.addEventListener("click",()=>{
        localStorage.setItem('selectedSet', JSON.stringify(getData(Sets[i])));
        location.href = "testing.html";
      });

      questionbox.appendChild(innertext);
      questionbox.appendChild(flash);
      questionbox.appendChild(test);
      testList.appendChild(questionbox);
      console.log(i);
    }
}





let set = await getSets();
async function sortBySubject(subject){
  let subjectMatches = [];
  for(let i = 0;i<set.length;i++){ 
    let sub = getSubjects(set[i]);
    for(let j = 0;j<sub.length;j++){
      console.log(sub[j],subject);
      if(sub[j].toLowerCase()==subject.toLowerCase()){
        subjectMatches.push(set[i]);
      }
    }
  }
  return subjectMatches;
}
let subjectSet=[];
const userSelectSubject = localStorage.getItem('userSelectSubject');
if(userSelectSubject!=null){
  console.log(userSelectSubject);
  subjectSet = await sortBySubject(userSelectSubject);
}
window.onload = () => {
  const userSelectSubject = localStorage.getItem('userSelectSubject');
  const userSetHistory = localStorage.getItem('currentUserSets');
  console.log(userSetHistory);
  
  if(userSelectSubject){
    generates(subjectSet);
    localStorage.removeItem('userSelectSubject');
  }
  else if (userSetHistory) {
      // Parse the stored set data into an object
      const userSetHistory = JSON.parse(userSetHistory);

      // Call the function to dynamically generate the test based on the retrieved set
      generates(userSetHistory);
  } else {
    generates(set);
  }
};