const guestLinks = ['index.html', 'login.html', 'register.html'];
const pageIsGuestLink = guestLinks.some(element =>
  location.href.endsWith(element)
);

if (localStorage.token && pageIsGuestLink) {
  location.href = 'dashboard.html';
} else if (!localStorage.token && !pageIsGuestLink) {
  location.href = 'login.html';
}
