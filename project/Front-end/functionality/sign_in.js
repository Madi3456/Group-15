const signinEmail = document.getElementById('signup-email');

const signinPassword = document.getElementById("signup-password");

const signinsubmitbutton = document.getElementById("submit-signup");


let Username = "";
let Password = "";
signinEmail.addEventListener("keyup", ()=>{Username=signinEmail.value});
signinPassword.addEventListener("keyup", ()=>{Password=signinPassword.value});



async function register() {
    const username = Username;
    const password = Password;
    const response = await fetch("/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    console.log(JSON.stringify(data, null, 2));
    alert(data.message);
  }

  async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const response = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    console.log(JSON.stringify(data, null, 2));
    alert(data.message);

  }

  async function logout() {
    const response = await fetch("/logout");
    const data = await response.json();
    console.log(JSON.stringify(data, null, 2));
    alert(data.message);
  }

  signinsubmitbutton.addEventListener("click",()=>{register();});