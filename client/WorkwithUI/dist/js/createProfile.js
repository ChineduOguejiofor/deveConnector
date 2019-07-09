//Decide if there is a profile
callFetchAPI('/profile/me', 'GET', null, ({ statusCode, data }) => {
  if (statusCode === 400) {
    alert('no Profile');
  } else if (statusCode === 200) {
    // const formData = new FormData('form');
    console.log(data.githubusername);

    document.getElementById('status').value = data.status;
    document.getElementById('skills').value = data.skills;
    //Should be verified
    document.getElementById('company').value =
      data.company == null ? '' : data.company;
    document.getElementById('location').value =
      data.location == null ? '' : data.location;

    document.getElementById('website').value =
      data.website == null ? '' : data.website;
    // document.getElementById('githubusername').value = data.location;
    // document.getElementById('bio').value = data.location;
    console.log(data.githubusername == null);
  }
});

function socialFunction(event) {
  const social = document.getElementById('socialInputs');

  if (social.classList.contains('hide')) {
    social.classList.remove('hide');
    // alert('Removed');
  } else {
    social.classList.add('hide');
    // alert('added');
  }
}

function submitForm(event) {
  event.preventDefault();
  const formData = new FormData(event.target);

  // const aa = formData.set()
  const company = formData.get('company');
  const website = formData.get('website');
  const location = formData.get('location');
  const bio = formData.get('bio');
  const status = formData.get('status');
  const githubusername = formData.get('githubusername');
  const skills = formData.get('skills');
  const youtube = formData.get('youtube');
  const facebook = formData.get('facebook');
  const twitter = formData.get('twitter');
  const instagram = formData.get('instagram');
  const linkedin = formData.get('linkedin');

  const profileData = {
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin
  };

  console.log(profileData);

  callFetchAPI('/profile', 'POST', profileData, ({ data, statusCode }) => {
    if (statusCode === 400) {
      // alert('there was an error');
      console.log(data);
    } else if (statusCode === 200) {
      // alert('Profile Created');
      console.log(data);
      window.location.href = 'dashboard.html';
      // alert('passed location');
    }
  });
}
