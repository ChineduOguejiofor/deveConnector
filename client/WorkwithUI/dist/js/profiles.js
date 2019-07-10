callFetchAPI('/profile', 'GET', null, ({ statusCode, data }) => {
  if (statusCode === 400) {
    console.log('There was an error');
    console.log(data);
  } else if (statusCode === 200) {
    console.log(data);
    const spinner = document.getElementById('spinner');
    spinner.classList.add('hide');

    const sectionBody = document.getElementById('sectionBody');

    for (let i = 0; i < data.length; i++) {
      const profile = document.createElement('div');
      profile.innerHTML = ` <div class="profiles">
    <div class="profile bg-light">
      <img
        src="http:${data[i].user.avatar}"
        alt="User Image"
        class="round-img"
      />
      <div>
        <h2>${data[i].user.name}</h2>
        <p>${data[i].company}</p>
        <p>${data[i].location}</p>
        <a href="#" onclick="viewProfile('${
          data[i].user._id
        }')" class="btn btn-primary">View Profile</a>
      </div>

      <ul>
        <li class="text-primary"><i class="fas fa-check"></i> ${
          data[i].skills[0]
        }</li>
        <li class="text-primary"><i class="fas fa-check"></i> ${
          data[i].skills[1]
        }</li>
        <li class="text-primary"><i class="fas fa-check"></i> ${
          data[i].skills[2]
        }</li>
        <li class="text-primary"><i class="fas fa-check"></i> ${
          data[i].skills[3]
        }</li>
      </ul>
    </div>
  </div>
  `;
      sectionBody.appendChild(profile);
    }
  }
});

function viewProfile(id) {
  localStorage.setItem('clickedUser', id);
  // console.log(id);

  location.href = 'profile.html';
}
