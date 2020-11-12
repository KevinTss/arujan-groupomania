const token = localStorage.getItem('token');

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

(async () => {
  if (!token) {
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/api/auth/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    });
    const jsonResponse = await response.json();
    localStorage.setItem('user', JSON.stringify(jsonResponse.user));
  } catch (err) {
    console.log('User non connecté');
  }
})();
