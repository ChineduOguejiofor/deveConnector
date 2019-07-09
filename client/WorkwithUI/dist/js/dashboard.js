// const API_URL = 'http://localhost:3000/api/profile/me';

// const tokenValue = localStorage.getItem('token');
// const myHeaders = new Headers();
// myHeaders.append('x-auth-token', tokenValue);

// console.log(tokenValue);

// fetch(API_URL, {
//   method: 'GET',
//   headers: myHeaders
// })
//   .then(res => res.json())
//   .then(json => console.log(json));

// fetch(API_URL, {
//   method: 'GET',
//   body: undefined,
//   headers: {
//     'content-type': 'application/json',
//     Authorization: localStorage.token
//   }
// })
//   .then(async response => {
//     if (response.status == 401) {
//       console.log('You are not Authz To do This');

//       // location.href = 'login.html';
//     } else {
//       return {
//         data: await response.json(),
//         statusCode: response.status
//       };
//     }
//   })
//   .then(console.log(response.data))
//   .catch(errorHandler);

// debugger;
//stops here
callFetchAPI('/profile/me', 'GET', null, response => {
  if (response.statusCode === 400) {
    console.log(response.data);
    const sBody = document.getElementById('profile');
    sBody.classList.add('hide');
  } else if (response.statusCode === 200) {
    const sBody = document.getElementById('noProfile');
    sBody.classList.add('hide');
    // sBody.classList.contains
    console.log(response.data);
    console.log('Doo I have a profiel');

    const name = document.getElementById('userName');
    // const btnLogout = document.getElementById('logout');
    const eduBody = document.getElementById('eduBody');
    const expBody = document.getElementById('expBody');

    name.textContent = response.data.user.name;
    // btnLogout.addEventListener('click',function(e) =>{
    //   alert('You clicked me')
    // })

    for (let i = 0; i < response.data.experience.length; i++) {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${response.data.experience[i].company}</td>
        <td class="hide-sm">${response.data.experience[i].title}</td>
        <td class="hide-sm">${response.data.experience[i].from}</td>
        <td><button class="btn btn-danger">Delete</button></td>
      `;

      expBody.appendChild(tr);
    }

    for (let i = 0; i < response.data.education.length; i++) {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${response.data.education[i].school}</td>
        <td class="hide-sm">${response.data.education[i].degree}</td>
        <td class="hide-sm">${response.data.education[i].from}</td>
        <td><button class="btn btn-danger">Delete</button></td>
      `;

      eduBody.appendChild(tr);
    }

    // tr.firstElementChild.textC
    // const td = document.createElement('td');
  }
});

function logout(event) {
  localStorage.removeItem('token');
}
