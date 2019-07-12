callFetchAPI('/auth', 'GET', null, ({ statusCode, data }) => {
  if (statusCode === 200) {
    const name = document.getElementById('userName');
    const pname = document.getElementById('pName');
    pname.classList.remove('hide');
    name.textContent = data.name;
  }
});

callFetchAPI('/profile/me', 'GET', null, response => {
  const spinner = document.getElementById('spinner');
  spinner.classList.add('hide');
  if (response.statusCode === 400) {
    console.log(response.data);
    const sBody = document.getElementById('noProfile');

    sBody.classList.remove('hide');
  } else if (response.statusCode === 200) {
    const sBody = document.getElementById('profile');

    sBody.classList.remove('hide');

    console.log(response.data);

    const eduBody = document.getElementById('eduBody');
    const expBody = document.getElementById('expBody');

    for (let i = 0; i < response.data.experience.length; i++) {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${response.data.experience[i].company}</td>
        <td class="hide-sm">${response.data.experience[i].title}</td>
        <td class="hide-sm">${response.data.experience[i].from}</td>
        <td><button onClick="deleteExp(event, '${
          response.data.experience[i]._id
        }')" class="btn btn-danger">Delete</button></td>
      `;

      expBody.appendChild(tr);
    }

    for (let i = 0; i < response.data.education.length; i++) {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${response.data.education[i].school}</td>
        <td class="hide-sm">${response.data.education[i].degree}</td>
        <td class="hide-sm">${response.data.education[i].from}</td>
        <td><button onClick="deleteEdu(event,'${
          response.data.education[i]._id
        }')" class="btn btn-danger">Delete</button></td>
      `;

      eduBody.appendChild(tr);
    }
  }
});
function deleteEdu(event, id) {
  console.log('I was clicked');
  event.target.parentElement.parentElement.remove();
  callFetchAPI('/profile/education/' + id, 'DELETE', null, res => {
    console.log(res.data);
  });
}
function deleteExp(event, id) {
  callFetchAPI('/profile/experience/' + id, 'DELETE', null, res => {
    console.log(res.data);
  });
  console.log('I was clicked');
  event.target.parentElement.parentElement.remove();
}

function deleteMyAcc() {
  if (window.confirm('Are you sure? This Cant be Undone')) {
    callFetchAPI('/profile', 'DELETE', null, res => {
      console.log(res.data);
    });
  }
  logout();
}
