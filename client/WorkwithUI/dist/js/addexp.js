function addExperience(event) {
  event.preventDefault();
  const formData = new FormData(event.target);

  const title = formData.get('title');
  const company = formData.get('company');
  const location = formData.get('location');
  const from = formData.get('from');
  const to = formData.get('to');
  const current = formData.get('current');
  const description = formData.get('description');

  const expInfo = { title, company, location, from, to, current, description };

  console.log(expInfo);
}
