//Decide which nav to show
const guestLinks = document.getElementById('guestLinks');
const authLinks = document.getElementById('authLinks');

if (localStorage.token) {
  guestLinks.classList.add('hide');
  authLinks.classList.add('show');
} else {
  authLinks.classList.add('hide');
  guestLinks.classList.add('show');
}

function logout(event) {
  localStorage.removeItem('token');
}
