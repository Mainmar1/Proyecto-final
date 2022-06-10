const $btnSignIn = document.querySelector(".sign_in_btn"),
  $btnSignUp = document.querySelector(".sign_up_btn"),
  $signUp = document.querySelector(".sign-up"),
  $signIn = document.querySelector(".sign-in");

document.addEventListener("click", (e) => {
  if (e.target === $btnSignIn || e.target === $btnSignUp) {
    $signUp.classList.toggle("active");
    $signIn.classList.toggle("active");
  }
});

let ingreso = 0;

document.getElementById("btnRegistrarse").addEventListener("click", (e) => {
  const name_usuario = document.getElementById("name_usuario").value;
  const email_usuario = document.getElementById("email_usuario").value;
  const password_usuario = document.getElementById("password_usuario").value;
  

  const storageParsed =
    JSON.parse(localStorage.getItem("registeredUsers")) ?? [];

  const validationEmailRegistered = storageParsed.filter(element => element.email === email_usuario);

  if(validationEmailRegistered.length > 0) {
    alert(`Please enter another email address, ${email_usuario} already in use`);
    return;
  }
   
  if (name_usuario === "" || email_usuario === "" || password_usuario === "") {
    alert("Todos los campos de registro deben estar completos");
    return;} 
    else{ alert("The account was successfully created")
  $signUp.classList.toggle("active");
  $signIn.classList.toggle("active");}

  const newRegisteredUserObject = {
    username: name_usuario,
    email: email_usuario,
    password: password_usuario,
  };


  storageParsed.push(newRegisteredUserObject);

  localStorage.setItem("registeredUsers", JSON.stringify(storageParsed));


});

// INICIO DE SESION

document.getElementById("btnInicionSesion").addEventListener("click",(e)=>{

  let ingreso_email = document.getElementById("validacion_email").value
  let ingreso_password = document.getElementById("validacion_password").value

  if (ingreso_email === "" || ingreso_password === "") {
    alert("Todos los campos de registro deben estar completos");
    return;
  }

  const storageParsed =
    JSON.parse(localStorage.getItem("registeredUsers")) ?? false;

    if(!storageParsed) {
      alert('not registered users')
      return;
    }

    storageParsed.forEach(element => {
      const emailValidated = element.email.toUpperCase() === ingreso_email.toUpperCase() ?? false;
      const passwordValidated = element.password.toUpperCase() === ingreso_password.toUpperCase() ?? false;

      if(emailValidated && passwordValidated) {
        window.location.href = "./carritoCompras.html";
        alert("¡Accsess successfully!");
        ingreso = 1;
        return ingreso;

      }else if ( !emailValidated || !passwordValidated) {
        alert('email or password incorrect');
      }
    }) 

})


