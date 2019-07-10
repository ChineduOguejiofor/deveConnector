const BASE_URL = 'http://localhost:3000/api';

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

function logout() {
  localStorage.removeItem('token');
}

function login() {
  location.href = 'login.html';
}
