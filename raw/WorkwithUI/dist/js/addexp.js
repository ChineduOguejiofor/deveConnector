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

function addExperience(event) {
  event.preventDefault();
  const formData = new FormData(event.target);

  const title = formData.get('title');
  const company = formData.get('company');
  const location = formData.get('location');
  const from = formData.get('from');
  const to = formData.get('to');
  const current = checkbox.checked;
  const description = formData.get('description');

  const expInfo = { title, company, location, from, to, current, description };

  console.log(expInfo);
  callFetchAPI(
    '/profile/experience',
    'PUT',
    expInfo,
    ({ data, statusCode }) => {
      if (statusCode === 400) {
        alert('there was an error');
        console.log(data);
      } else if (statusCode === 200) {
        console.log(data);
        window.location.href = 'dashboard.html';
      }
    }
  );
}
