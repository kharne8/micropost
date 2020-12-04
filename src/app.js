import { http } from './http';
import { ui } from './ui';

//get post on DOM load
document.addEventListener('DOMContentLoaded', getPost);

//listen for add post
document.querySelector('.post-submit').addEventListener('click', submitPost);

//listen for delete
document.querySelector('#posts').addEventListener('click', deletePost);

function getPost() {
  http
    .get('http://localhost:3000/posts')
    .then((data) => ui.showPost(data))
    .catch((err) => console.log(err));
}

//submit post
function submitPost() {
  const title = document.querySelector('#title').value;
  const body = document.querySelector('#body').value;

  const data = {
    title,
    body,
  };

  //create post
  http
    .post('http://localhost:3000/posts', data)
    .then((data) => {
      ui.showAlert('Post added', 'alert alert-success');
      ui.clearFields();
      getPost();
    })
    .catch((err) => console.log(err));
}

//delete post

function deletePost(e) {
  if (e.target.parentElement.classList.contains('delete')) {
    const id = e.target.parentElement.dataset.id;

    if (confirm('Are you sure you want to deleted this post?')) {
      http
        .delete(`http://localhost:3000/posts/${id}`)
        .then((data) => {
          ui.showAlert('Post Removed', 'alert alert-success');
          getPost();
        })
        .catch((err) => console.log(err));
    }
  }

  e.preventDefault();
}
