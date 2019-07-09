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
