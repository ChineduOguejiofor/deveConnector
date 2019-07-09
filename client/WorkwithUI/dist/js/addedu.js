function addEducation(event) {
  event.preventDefault();
  const formData = new FormData(event.target);

  const school = formData.get('school');
  const degree = formData.get('degree');
  const fieldofstudy = formData.get('fieldofstudy');
  const from = formData.get('from');
  const to = formData.get('to');
  const current = formData.get('current');
  const description = formData.get('description');

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
}
