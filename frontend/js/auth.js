const token = localStorage.getItem('token');

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
