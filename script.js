async function authenticateAdmin() {
  const password = document.getElementById('admin-password').value;
  const response = await fetch('/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ username: 'admin', password })
  });
  const result = await response.json();
  if (result.success) {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('admin-panel').style.display = 'block';
    loadEntries();
  } else {
    alert('Login failed');
  }
}

const ADMIN_PASSWORD = 'your_password_here';

let journalEntries = JSON.parse(localStorage.getItem('journalEntries')) || window.journalEntries || [];

function formatDate(iso) {
  return new Date(iso).toLocaleString();
}

function renderEntries() {
  const container = document.getElementById('journal');
  container.innerHTML = '';

  journalEntries.forEach(entry => {
    const el = document.createElement('article');
    el.className = 'entry';

    const imgHTML = entry.image ? `<img src="${entry.image}" alt="${entry.title}" class="entry-img">` : '';

    el.innerHTML = `
      <h2>${entry.title}</h2>
      <time>${formatDate(entry.timestamp)}</time>
      ${imgHTML}
      <p>${entry.content}</p>
    `;
    container.appendChild(el);
  });
}

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

function loadEntries() {
  const entriesList = document.getElementById('entries-list');
  entriesList.innerHTML = '';
  journalEntries.forEach((entry, index) => {
    const item = document.createElement('li');
    item.innerHTML = `
      <strong>${entry.title}</strong>
      <button onclick="editEntry(${index})">Edit</button>
      <button onclick="deleteEntry(${index})">Delete</button>
    `;
    entriesList.appendChild(item);
  });
}

function saveEntry(event) {
  event.preventDefault();
  const id = document.getElementById('entry-id').value;
  const title = document.getElementById('entry-title').value;
  const content = document.getElementById('entry-content').value;
  const image = document.getElementById('entry-image').value;
  const timestamp = new Date().toISOString();

  const newEntry = { id: Date.now(), title, content, image, timestamp };

  if (id) {
    const index = journalEntries.findIndex(e => e.id == id);
    if (index !== -1) journalEntries[index] = { ...journalEntries[index], title, content, image };
  } else {
    journalEntries.unshift(newEntry);
  }

  localStorage.setItem('journalEntries', JSON.stringify(journalEntries));
  document.getElementById('entry-form').reset();
  loadEntries();
  renderEntries();
}

function editEntry(index) {
  const entry = journalEntries[index];
  document.getElementById('entry-id').value = entry.id;
  document.getElementById('entry-title').value = entry.title;
  document.getElementById('entry-content').value = entry.content;
  document.getElementById('entry-image').value = entry.image || '';
}

function deleteEntry(index) {
  if (confirm("Are you sure you want to delete this entry?")) {
    journalEntries.splice(index, 1);
    localStorage.setItem('journalEntries', JSON.stringify(journalEntries));
    loadEntries();
    renderEntries();
  }
}

renderEntries();
