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
    // afficher un message d'erreur
  }
});

async function login(email, password) {
  try {
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    if (response.status !== 200) {
      return null;
    }
    return await response.json();
  } catch (err) {
    console.log(err.message);
    return null;
  }
}
