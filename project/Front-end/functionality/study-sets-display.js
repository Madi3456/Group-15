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
    console.log(Sets.length);
    const testList = document.getElementById("list");
    for(let i = 0;i<Sets.length;i++){
      
      const questionbox = document.createElement("div");
      questionbox.classList.add("testing-box");
      const innertext = document.createElement("div");
      innertext.classList.add("question");
      innertext.innerHTML=Sets[i].nameSet;
      questionbox.appendChild(innertext);
      testList.appendChild(questionbox);
      console.log(i);
    }
}

generates(await getSets());