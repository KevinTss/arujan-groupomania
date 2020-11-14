const newPostForm = document.querySelector('#new-post-form');
const titleInput = document.querySelector('#title-input');
const textInput = document.querySelector('#text-input');
const imageInput = document.querySelector('#image-input');
const tokenInput = document.querySelector('#hidden-token-input');
const userIdInput = document.querySelector('#hidden-user-id-input');

{
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  if (token && user) {
    tokenInput.value = token;
    userIdInput.value = JSON.parse(user).id_user;
  }
}

async function postArticle(data) {
  try {
    const response = await fetch(`http://localhost:3000/api/article/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify(data),
    });
    // if (response.status !== 200) {
    //   return null;
    // }
    // const res = await response.json();
    return {
      message: 'ok',
    };
  } catch (err) {
    console.err(err.message);
    return {
      message: err.message,
    };
  }
}

// newPostForm.addEventListener('submit', (e) => {
//   e.preventDefault();

//   const title = titleInput.value;
//   const description = textInput.value;
//   // const image = imageInput.files;

//   postArticle({
//     title,
//     description,
//   });
// });
