const loginForm = document.querySelector('#sign-up-form');
const usernameInput = document.querySelector('#username');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = usernameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;

  const response = await signUp(username, email, password);
  if (response.token) {
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', response.user);
    if (!auth) {
      var auth = response.user;
    } else {
      auth = response.user;
    }
    window.location.replace('/Groupomania/frontend/forum.html');
  } else {
    // afficher un message d'erreur
  }
});

async function signUp(username, email, password) {
  try {
    const response = await fetch('http://localhost:3000/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });
    if (response.status !== 201) {
      return null;
    }

    return await login(email, password);
  } catch (err) {
    console.log(err.message);
    return null;
  }
}
