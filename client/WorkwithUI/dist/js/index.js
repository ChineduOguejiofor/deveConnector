const guestLink = document.getElementById('guest');
const authLink = document.getElementById('loggedIn');

if (localStorage.token) {
  guestLink.classList.add('hide');
} else {
  authLink.classList.add('hide');
}
