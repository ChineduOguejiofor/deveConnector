console.log(' hello');

function registerUser(event) {
  event.preventDefault();
  const formData = new FormData(event.target);

  const name = formData.get('name');
  const email = formData.get('email');
  const password = formData.get('password');
  const password2 = formData.get('password2');

  if (password !== password2) {
    alert('wrong password');
  } else {
    const newUser = {
      name,
      email,
      password
    };

    callFetchAPI('/users', 'POST', newUser, ({ data, statusCode }) => {
      if (statusCode === 400) {
        console.log(data);
      } else if (statusCode === 200) {
        localStorage.token = data.token;
        location.href = 'dashboard.html';
        console.log(data);
      }
    });
  }
}
