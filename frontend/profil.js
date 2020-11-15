const form = document.querySelector('#profile-form');

async function delAccount() {
  const user = JSON.parse(localStorage.getItem('user'));
  try {
    const response = await fetch(
      `http://localhost:3000/api/auth/${user.id_user}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          authorization: localStorage.getItem('token'),
        },
      }
    );
    if (response.status !== 200) {
      return null;
    }
    const res = await response.json();
    return res;
  } catch (err) {
    console.error(err.message);
    return [];
  }
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const r = await delAccount();
  if ((r.messagec = 'Account deleted')) {
    window.location.replace('/frontend/index.html');
  }
});
