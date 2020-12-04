class UI {
  constructor() {
    this.post = document.querySelector('#posts');
    this.titleInput = document.querySelector('#title');
    this.bodyInput = document.querySelector('#body');
    this.idInput = document.querySelector('#id');
    this.postSubmit = document.querySelector('.post-submit');
    this.forState = 'add';
  }

  showPost(posts) {
    let output = '';

    posts.forEach((post) => {
      output += `
        <div class="card mb-3">
            <div class="card-body">
                <h4 class="card-tittle">${post.title}</h4>
                <p class="card-text">${post.body}</p>
                <a href="#" class="edit card-link" data-id="${post.id}">
                    <i class="fa fa-pencil"></i>
                </a>

                <a href="#" class="delete card-link" data-id="${post.id}">
                    <i class="fa fa-remove"></i>
                </a>
            </div>
        </div>
        `;
    });
    this.post.innerHTML = output;
  }

  showAlert(message, className) {
    this.clearAlert();

    const div = document.createElement('div');

    div.className = className;

    div.appendChild(document.createTextNode(message));

    const container = document.querySelector('.postsContainer');

    const posts = document.querySelector('#posts');

    container.insertBefore(div, posts);

    setTimeout(() => {
      this.clearAlert();
    }, 3000);
  }

  clearAlert() {
    const currentAlert = document.querySelector('.alert');

    if (currentAlert) {
      currentAlert.remove();
    }
  }

  clearFields() {
    this.titleInput.value = '';
    this.bodyInput.value = '';
  }

  fillForm(data) {
    this.titleInput.value = data.title;
    this.bodyInput.value = data.body;
    this.idInput.value = data.id;

    this.changeFormState('edit');
  }

  clearIdInput() {
    this.idInput.value = '';
  }

  //state
  changeFormState(type) {
    if (type === 'edit') {
      this.postSubmit.textContent = 'Update Post';
      this.postSubmit.className = 'post-submit btn btn-warning btn-block';

      //cancel update
      const button = document.createElement('button');
      button.className = 'post-cancel btn btn-light btn-block';
      button.appendChild(document.createTextNode('Cancel edit'));

      //get parent and indert
      const cardForm = document.querySelector('.card-form');

      const formEnd = document.querySelector('.form-end');

      cardForm.insertBefore(button, formEnd);
    } else {
      this.postSubmit.textContent = 'Post it!';
      this.postSubmit.className = 'post-submit btn btn-primary btn-block';
      //clear cancel button
      if (document.querySelector('.post-cancel')) {
        document.querySelector('.post-cancel').remove();
      }
      //clear from id and text field
      this.clearIdInput();
      this.clearFields();
    }
  }
}

export const ui = new UI();
