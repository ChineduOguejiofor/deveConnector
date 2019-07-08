callFetchAPI(
  '/profile/user/5d0cd0671cf58a0d5028eec7',
  'GET',
  null,
  response => {
    if (response.statusCode === 400) {
      console.log(response.data);
    } else if (response.statusCode === 200) {
      console.log(response.data);
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
  }
);

function logout(event) {
  localStorage.removeItem('token');
}
