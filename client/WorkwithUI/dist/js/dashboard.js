callFetchAPI('/auth', 'GET', null, ({ statusCode, data }) => {
  if (statusCode === 200) {
    const name = document.getElementById('userName');
    const pname = document.getElementById('pName');
    pname.classList.remove('hide');
    name.textContent = data.name;
  }
});

callFetchAPI('/profile/me', 'GET', null, ({ statusCode, data }) => {
  const spinner = document.getElementById('spinner');
  spinner.classList.add('hide');
  if (statusCode === 400) {
    console.log(data);
    const sBody = document.getElementById('noProfile');

    sBody.classList.remove('hide');
  } else if (statusCode === 200) {
    const sBody = document.getElementById('profile');

    sBody.classList.remove('hide');

    console.log(data);

    const eduBody = document.getElementById('eduBody');
    const expBody = document.getElementById('expBody');

    for (let i = 0; i < data.experience.length; i++) {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${data.experience[i].company}</td>
        <td class="hide-sm">${data.experience[i].title}</td>
        <td class="hide-sm">${formatDate(data.experience[i].from)} - ${
        data.experience[i].to ? formatDate(data.experience[i].to) : 'Now'
      }</td>
        <td><button onClick="deleteExp(event, '${
          data.experience[i]._id
        }')" class="btn btn-danger">Delete</button></td>
      `;

      expBody.appendChild(tr);
    }

    for (let i = 0; i < data.education.length; i++) {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${data.education[i].school}</td>
        <td class="hide-sm">${data.education[i].degree}</td>
        <td class="hide-sm">${formatDate(data.education[i].from)} - ${
        data.education[i].to ? formatDate(data.education[i].to) : 'Now'
      }</td>
        <td><button onClick="deleteEdu(event,'${
          data.education[i]._id
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
