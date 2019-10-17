const checkbox = document.querySelector('input[type=checkbox]');
const to = document.getElementById('to');

checkbox.addEventListener('change', function() {
  if (this.checked) {
    to.value = '';
    to.disabled = true;
  } else {
    to.disabled = false;
  }
});

function addEducation(event) {
  event.preventDefault();
  const formData = new FormData(event.target);

  const school = formData.get('school');
  const degree = formData.get('degree');
  const fieldofstudy = formData.get('fieldofstudy');
  const from = formData.get('from');
  const to = formData.get('to');
  const current = checkbox.checked;
  const description = formData.get('description');

  // const current = true;
  const eduInfo = {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
  };

  console.log(eduInfo);
  callFetchAPI('/profile/education', 'PUT', eduInfo, ({ data, statusCode }) => {
    if (statusCode === 400) {
      alert('there was an error');
      console.log(data);
    } else if (statusCode === 200) {
      console.log(data);
      window.location.href = 'dashboard.html';
    }
  });
}
