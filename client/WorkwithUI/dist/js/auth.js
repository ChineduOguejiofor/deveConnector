const cantseeifloggedin = ['login.html', 'register.html'];
const redirecttoDashboard = cantseeifloggedin.some(element =>
  location.href.endsWith(element)
);
// window.location.href.indexOf("franky") > -1
// location.href.endsWith('login.html')
if (!(location.href.indexOf('login') > -1) && !localStorage.token) {
  location.href = 'login.html';
} else if (localStorage.token && redirecttoDashboard) {
  location.href = 'dashboard.html';
}
