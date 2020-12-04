import { http } from './http';
import { ui } from './ui';

//get post on DOM load
document.addEventListener('DOMContentLoaded', getPost);

//listen for add post
document.querySelector('.post-submit').addEventListener('click', submitPost);

//listen for delete
document.querySelector('#posts').addEventListener('click', deletePost);

//listen for edit state
document.querySelector('#posts').addEventListener('click', enableEdit);

//listen for cancel
document.querySelector('.card-form').addEventListener('click', cancelEdit);

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
  const id = document.querySelector('#id').value;

  const data = {
    title,
    body,
  };

  if (title === '' && body === '') {
    ui.showAlert('Field in all fields', 'alert alert-danger');
  } else {
    if (id === '') {
      //create post
      http
        .post('http://localhost:3000/posts', data)
        .then((data) => {
          ui.showAlert('Post added', 'alert alert-success');
          ui.clearFields();
          getPost();
        })
        .catch((err) => console.log(err));
    } else {
      //update post
      http
        .put(`http://localhost:3000/posts/${id}`, data)
        .then((data) => {
          ui.showAlert('Post updated', 'alert alert-success');
          ui.changeFormState('add');
          getPost();
        })
        .catch((err) => console.log(err));
    }
  }
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

//edit state
function enableEdit(e) {
  if (e.target.parentElement.classList.contains('edit')) {
    const id = e.target.parentElement.dataset.id;
    const body = e.target.parentElement.previousElementSibling.textContent;
    const title =
      e.target.parentElement.previousElementSibling.previousElementSibling
        .textContent;

    const data = {
      id,
      title,
      body,
    };
    //fill form with data
    ui.fillForm(data);
  }

  e.preventDefault();
}

//cancel edit state
function cancelEdit(e) {
  if (e.target.classList.contains('post-cancel')) {
    ui.changeFormState('add');
  }
  e.preventDefault();
}
