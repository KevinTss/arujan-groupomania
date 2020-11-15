const loginForm = document.querySelector('#login-form');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const errorEmail = document.querySelector('#erreuremail');
const errorPassword = document.querySelector('#erreurPassword');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;

  let test_email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/;
  let test_password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;

  if (!email.match(test_email)) {
    errorEmail.innerHTML = 'Email invalide';
    return;
  }
  if (!password.match(test_password)) {
    errorPassword.innerHTML =
      'Le mot de passe doit contenir une minusule, une majuscle et un chiffre';
    return;
  }

  const response = await login(email, password);
  if (response.token) {
    localStorage.setItem('token', response.token);
    if (!auth) {
      var auth = response.user;
    } else {
      auth = response.user;
    }
    window.location.replace('/frontend/forum.html');
  } else {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // afficher un message d'erreur
  }
});
