// Define a simple password (In production, use a more secure method)
const ADMIN_PASSWORD = 'your_secure_password';

function authenticateAdmin() {
  const inputPassword = document.getElementById('admin-password').value;
  if (inputPassword === ADMIN_PASSWORD) {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('admin-panel').style.display = 'block';
    loadEntries();
  } else {
    alert('Incorrect password!');
  }
}
