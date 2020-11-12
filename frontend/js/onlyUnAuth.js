{
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');

  if (user && token) {
    window.location.replace('/Groupomania/frontend/forum.html');
  }
}
