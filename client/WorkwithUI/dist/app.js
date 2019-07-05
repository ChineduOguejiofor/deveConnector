// const profile = new Profile();

// profile
//   .getprofile()
//   .then(results => {
//     console.log(results);
//   })
//   .catch();

console.log('I am working');
listmes();

function listmes() {
  fetch('http://localhost:5000/api/profile/')
    .then(response => response.json())
    .then(mews => {
      console.log(mews);
    });
}

const form = document.querySelector('form');

form.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(form);

  const email = formData.get('email');
  const password = formData.get('password');

  const both = {
    email,
    password
  };

  console.log(both);

  console.log('I was clicked');
});
