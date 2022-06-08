const $btnSignIn = document.querySelector('.sign_in_btn'),
      $btnSignUp = document.querySelector('.sign_up_btn'),
      $signUp = document.querySelector('.sign-up'),
      $signIn = document.querySelector('.sign-in');

      document.addEventListener('click', e =>{
        if  (e.target === $btnSignIn || e.target === $btnSignUp){
            $signUp.classList.toggle('active')
            $signIn.classList.toggle('active')
        }
      })


