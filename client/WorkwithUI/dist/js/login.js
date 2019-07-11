function loginUser(event) {
  event.preventDefault();
  const formData = new FormData(event.target);

  const email = formData.get('email');
  const password = formData.get('password');

  const credentials = {
    email,
    password
  };

  console.log(credentials);
  const errorDiv = document.getElementById('error');

  callFetchAPI(
    '/auth',
    'POST',
    credentials,
    ({ data, statusCode }) => {
      if (statusCode === 400) {
        console.log(data.errors[0].msg);
        const errMsg = document.createElement('h3');
        errMsg.classList.add('p-1');
        errMsg.textContent = data.errors[0].msg;

        errorDiv.appendChild(errMsg);
        errorDiv.classList.remove('hide');

        setTimeout(() => {
          errorDiv.removeChild(errMsg);
          errorDiv.classList.add('hide');
        }, 3000);
      } else if (statusCode === 200) {
        localStorage.setItem('token', data.token);

        callFetchAPI('/auth', 'GET', null, ({ statusCode, data }) => {
          if (statusCode === 400) {
            console.log(data);
          } else if (statusCode === 200) {
            localStorage.setItem('userId', data._id);
            console.log('I am called');

            // location.href = 'dashboard.html';
          }
        });
        console.log(data);
      }
    },
    err => {
      const errMsg = document.createElement('h3');
      errMsg.classList.add('p-1');
      errMsg.textContent = err;

      errorDiv.appendChild(errMsg);
      errorDiv.classList.remove('hide');

      setTimeout(() => {
        errorDiv.removeChild(errMsg);
        errorDiv.classList.add('hide');
      }, 3000);
      console.log(err);
    }
  );
}
