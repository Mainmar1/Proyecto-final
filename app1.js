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
    swal(`Please enter another email address, ${email_usuario} already in use`,"", "warning");
    return;
  }
   
  if (name_usuario === "" || email_usuario === "" || password_usuario === "") {
    swal("Todos los campos de registro deben estar completos","","warning");
    return;} 
    else{ swal("Good Job!", "The account was successfully created", "success")
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
    swal("Todos los campos de ingreso deben estar completos","","warning");
    return;
  }

  const storageParsed =
    JSON.parse(localStorage.getItem("registeredUsers")) ?? false;

    if(!storageParsed) {
      swal('not registered users');
      return;
    }

    storageParsed.forEach(element => {
      const emailValidated = element.email.toUpperCase() === ingreso_email.toUpperCase() ?? false;
      const passwordValidated = element.password.toUpperCase() === ingreso_password.toUpperCase() ?? false;

      if(emailValidated && passwordValidated) {
       swal("¡Access Successfully"," ", "success");
       window.location.href = "./carritoCompras.html";
      }else if ( !emailValidated || !passwordValidated) {
        swal('Email or password incorrect',"", "error");
      }
    }) 

})


