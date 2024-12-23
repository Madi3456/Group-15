const signinEmail = document.getElementById('signup-email');

const signinPassword = document.getElementById("signup-password");

const signinsubmitbutton = document.getElementById("submit-signup");

const loginEmail = document.getElementById('login-email');

const loginPassword = document.getElementById("login-password");

const loginsubmitbutton = document.getElementById("submit-button");


let Username = "";
let Password = "";

signinEmail.addEventListener("keyup", ()=>{Username=signinEmail.value});
signinPassword.addEventListener("keyup", ()=>{Password=signinPassword.value});

loginEmail.addEventListener("keyup", ()=>{Username=loginEmail.value});
loginPassword.addEventListener("keyup", ()=>{Password=loginPassword.value});


//register function
async function register() {
  const username = Username;
  const password = Password;
  
  let isValid=true;
  try{
    const response = await fetch("/v1/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    if (response.status === 400) {
      alert("Username taken.");
      console.log("Error 400: Username taken");
      isValid=false;
    }
  }else{
    const data = await response.json();
    console.log("Registration successful:", data);
    isValid=true;
  }
}catch(error) {
    alert("An error occurred");
    console.error(error);
    isValid = false;
  }

  if(isValid){
    localStorage.setItem("user",Username);
    location.href = "intro.html";
  }
}

//login function
  async function login() {
    const username = Username;
    const password = Password;

    isValid=true;

    const response = await fetch("/v1/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    }).then(response => {
      if (!response.ok) {
        if (response.status === 401) {
          alert("Username doesn't exist.");
          console.log(400);
          isValid=false;
        }
      }
      else{
        isValid=true;
      }
      return response.json();
    }).catch(error => {
      alert("Username doesn't exist.");
      isValid=false;
    });

    if(isValid){
      const data = response;
      console.log(JSON.stringify(data, null, 2));
      localStorage.setItem("user",Username);
      location.href = "intro.html";
    }
  }

  console.log(signinPassword,signinEmail)
  signinsubmitbutton.addEventListener("click",()=>{
    if(loginEmail.value!=""&&signinEmail.value!=""){
      alert("Can not sign up and log in at same time");
    }
    else if(loginPassword.value!=""&&signinPassword.value!=""){
      alert("Can not sign up and log in at same time");
    }
    else if(loginPassword.value!=""&&signinEmail.value!=""){
      alert("Can not sign up and log in at same time");
    }
    else if(loginEmail.value!=""&&signinPassword.value!=""){
      alert("Can not sign up and log in at same time");
    }
    else if(signinEmail.value==""){
      alert("Username can't be null.")
    }
    else if(signinPassword.value==""){
      alert("Password can't be null.")
    }
    else{
    register();
  }});

  loginsubmitbutton.addEventListener("click",()=>{
  if(loginEmail.value!=""&&signinEmail.value!=""){
    alert("Can not sign up and log in at same time");
  }
  else if(loginPassword.value!=""&&signinPassword.value!=""){
    alert("Can not sign up and log in at same time");
  }
  else if(loginPassword.value!=""&&signinEmail.value!=""){
    alert("Can not sign up and log in at same time");
  }
  else if(loginEmail.value!=""&&signinPassword.value!=""){
    alert("Can not sign up and log in at same time");
  }
  else if(loginEmail.value==""){
    alert("Username can't be null.")
  }
  else if(loginPassword.value==""){
    alert("Password can't be null.")
  }
  else{
  login();
}});