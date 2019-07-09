const BASE_URL = 'http://localhost:3000/api';

function loginUser(event) {
  event.preventDefault();
  const formData = new FormData(event.target);

  const email = formData.get('email');
  const password = formData.get('password');
  // const { email, password } = formData.getAll();

  // console.log(email, password);

  // debugger;
  const credentials = {
    email,
    password
  };

  console.log(credentials);

  callFetchAPI('/auth', 'POST', credentials, ({ data, statusCode }) => {
    if (statusCode === 400) {
      console.log(data);
    } else if (statusCode === 200) {
      localStorage.setItem('token', data.token);
      // localStorage.token = data.token;
      location.href = 'dashboard.html';
      console.log(data);
    }
  });
}

function callFetchAPI(
  route,
  method,
  data,
  callback,
  errorHandler = err => {
    console.log(err);
  }
) {
  const myHeaders = new Headers();
  const tokenValue = localStorage.getItem('token');

  myHeaders.append('x-auth-token', tokenValue);
  myHeaders.append('Content-Type', 'application/json');

  fetch(BASE_URL + route, {
    method: method,
    body: data ? JSON.stringify(data) : undefined,
    headers: myHeaders
  })
    .then(async response => {
      if (response.status == 401) {
        location.href = 'login.html';
      } else {
        return {
          data: await response.json(),
          statusCode: response.status
        };
      }
    })
    .then(callback)
    .catch(errorHandler);
}
