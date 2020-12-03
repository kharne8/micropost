import { http } from './http';
import { ui } from './ui';

//get post on DOM load
document.addEventListener('DOMContentLoaded', getPost);

function getPost() {
  http
    .get('http://localhost:3000/post')
    .then((data) => ui.showPost(data))
    .catch((err) => console.log(err));
}
