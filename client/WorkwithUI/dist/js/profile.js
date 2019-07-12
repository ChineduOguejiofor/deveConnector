if (localStorage.token) {
  callFetchAPI('/auth', 'GET', null, resp => {
    if (resp.statusCode === 200) {
      if (resp.data._id === localStorage.clickedUser) {
        const editProfile = document.getElementById('editpro');
        editProfile.classList.remove('hide');
      }
    }
  });
}
const userId = localStorage.clickedUser;
callFetchAPI('/profile/user/' + userId, 'GET', null, ({ data, statusCode }) => {
  if (statusCode === 400) {
    alert('There was an err');
    console.log(data);
  } else if (statusCode === 200) {
    console.log(data);
    // console.log(data.social != null);

    // console.log(data.social.twitter != null);
    const profileBody = document.getElementById('profileBody');
    const profileTop = document.createElement('div');
    const twitter = document.createElement('div');

    //Work on social
    // if (data.social != null) {
    //   if (data.social.twitter != null) {
    //     // twitter.innerHTML = `<a href='#'><i class='fas fa-globe fa-2x'/></a>`;
    //     twitter.innterHTML = '<h2> I am Twitter</h2>';
    //   }
    // }
    profileTop.classList.add('profile-top');
    profileTop.classList.add('bg-primary');
    profileTop.classList.add('p-2');
    profileTop.innerHTML = `
        
        <img
        src="https:${data.user.avatar}"
        alt="${data.user.name}"
        class="round-img my-1"
        />

        <h1>${data.user.name}</h1>
        <p class="lead">${data.status} ${
      data.company == null
        ? ''
        : '<span class="at-class"> at </span>' + data.company
    }</p>
        <p>${data.location == null ? '' : data.location}</p>
        <div id='social-icons' class="icons my-1">
            
          </div>
        `;

    profileBody.appendChild(profileTop);
    const socialicondiv = profileBody.querySelector('#social-icons');

    if (data.website) {
      const anchor = document.createElement('a');
      const iTag = document.createElement('i');
      anchor.href = data.website;
      anchor.target = '_blank';
      iTag.className = `fas fa-globe fa-2x`;
      anchor.appendChild(iTag);

      socialicondiv.appendChild(anchor);
    }

    if (data.social) {
      for ([social, webLink] of Object.entries(data.social)) {
        const anchor = document.createElement('a');
        const iTag = document.createElement('i');
        anchor.href = webLink;
        anchor.target = '_blank';
        iTag.className = `fab fa-${social} fa-2x`;
        if (social == 'website') {
          iTag.className = `fas fa-globe fa-2x`;
        }
        anchor.appendChild(iTag);
        socialicondiv.appendChild(anchor);
      }
    }

    const bio = document.createElement('div');
    bio.classList.add('profile-about');
    bio.classList.add('bg-light');
    bio.classList.add('p-2');

    bio.innerHTML = `
          <h2 class="text-primary">${
            data.user.name.trim().split(' ')[0]
          }'s Bio</h2>
          <p>
            ${data.bio}
          </p>
          <div class="line"></div>
    `;

    profileBody.appendChild(bio);
    const skill = document.createElement('h2');
    skill.classList.add('text-primary');
    skill.textContent = 'Skill set';
    bio.appendChild(skill);
    // profileBody.appendChild(skill);
    const skillDiv = document.createElement('div');
    skillDiv.classList.add('skills');

    for (let i = 0; i < data.skills.length; i++) {
      const skill = document.createElement('div');
      skill.classList.add('p-1');
      skill.innerHTML = `<i class="fas fa-check"></i> ${data.skills[i]}`;
      skillDiv.appendChild(skill);
    }
    bio.appendChild(skillDiv);

    const expBody = document.getElementById('expBody');
    if (data.experience.length > 0) {
      for (let i = 0; i < data.experience.length; i++) {
        const singleExp = document.createElement('div');
        singleExp.innerHTML = `
      <h3>${data.experience[i].company}</h3>
      <p>${data.experience[i].from} - ${data.experience[i].to}</p>
      <p><strong>Position: </strong> ${data.experience[i].title}</p>
      <p>
        <strong>Description: </strong> ${data.experience[i].description}
      </p>`;
        expBody.appendChild(singleExp);
      }
    } else {
      const noexp = document.createElement('p');
      noexp.innerHTML = '<strong>No experience Credentials</strong>';
      expBody.appendChild(noexp);
    }

    const eduBody = document.getElementById('eduBody');
    if (data.education.length > 0) {
      for (let i = 0; i < data.education.length; i++) {
        const singleEdu = document.createElement('div');
        singleEdu.innerHTML = `
    <h3>${data.education[i].school}</h3>
    <p>${data.education[i].from} - ${data.education[i].to}</p>
    <p><strong>Degree: </strong> ${data.education[i].degree}</p>
    <p><strong>Field Of Study: </strong> ${data.education[i].fieldofstudy}</p>
    <p>
      <strong>Description: </strong> ${data.education[i].description}
    </p>`;
        eduBody.appendChild(singleEdu);
      } //end for loop
    } else {
      const noedu = document.createElement('p');
      noedu.innerHTML = '<strong>No education Credentials</strong>';
      eduBody.appendChild(noedu);
    }

    const gitBody = document.getElementById('gitBody');

    if (data.githubusername != null) {
      const githubUserName = data.githubusername;

      // debugger;
      callFetchAPI(
        '/profile/github/' + githubUserName,
        'GET',
        null,
        ({ statusCode, data }) => {
          if (statusCode === 400) {
            alert('There was an error');
            console.log(data);
          } else if (statusCode === 200) {
            data.forEach(repo => {
              const gitRepo = document.createElement('div');
              gitRepo.classList.add('repo');
              gitRepo.classList.add('bg-white');
              gitRepo.classList.add('my-1');
              gitRepo.classList.add('p-1');
              gitRepo.innerHTML = `
        <div>
          <h4><a href="${
            repo.html_url
          }" target='_blank' rel='noopener noreferrer'>${repo.name}
          </a></h4>
          <p>
            ${repo.description}
          </p>
        </div>
        <div>
          <ul>
            <li class="badge badge-primary">Stars ${repo.stargazers_count}</li>
            <li class="badge badge-dark">Watchers ${repo.watchers_count}</li>
            <li class="badge badge-light">Forks ${repo.forks_count}</li>
          </ul>
        </div>
  
  `;
              gitBody.appendChild(gitRepo);
              const spinner = document.getElementById('spinner');
              spinner.classList.add('hide');
            });
          } //status for git hub
        }
      ); //end Fetch git hub
    } else {
      gitBody.classList.add('hide');
    }
  } //end statusCode 200
});
