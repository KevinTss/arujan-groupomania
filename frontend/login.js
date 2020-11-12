const loginForm = document.querySelector('#login-form');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;

  const response = await login(email, password);
  if (response.token) {
    localStorage.setItem('token', response.token);
    if (!auth) {
      var auth = response.user;
    } else {
      auth = response.user;
    }
    window.location.replace('/Groupomania/frontend/forum.html');
  } else {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // afficher un message d'erreur
  }
});
