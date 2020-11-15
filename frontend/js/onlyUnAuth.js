{
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');

  if (user && token) {
    window.location.replace('/frontend/forum.html');
  }
}
