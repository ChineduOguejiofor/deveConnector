const form = document.querySelector('form');

const API_URL = 'http://localhost:5000/api/auth';

form.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(form);

  const email = formData.get('email');
  const password = formData.get('password');

  const credentials = {
    email,
    password
  };

  console.log(credentials);

  fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: {
      'content-type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(token => {
      console.log(token);
    });
});
