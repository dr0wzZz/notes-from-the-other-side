let entries = JSON.parse(localStorage.getItem('journalEntries')) || [];

function loadEntries() {
  const entriesList = document.getElementById('entries-list');
  entriesList.innerHTML = '';
  entries.forEach((entry, index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <strong>${entry.title}</strong>
      <button onclick="editEntry(${index})">Edit</button>
      <button onclick="deleteEntry(${index})">Delete</button>
    `;
    entriesList.appendChild(listItem);
  });
}

function saveEntry(event) {
  event.preventDefault();
  const title = document.getElementById('entry-title').value;
  const content = document.getElementById('entry-content').value;
  const id = document.getElementById('entry-id').value;

  if (id) {
    // Edit existing entry
    entries[id] = { title, content };
  } else {
    // Add new entry
    entries.push({ title, content });
  }

  localStorage.setItem('journalEntries', JSON.stringify(entries));
  document.getElementById('entry-form').reset();
  loadEntries();
}

function editEntry(index) {
  const entry = entries[index];
  document.getElementById('entry-id').value = index;
  document.getElementById('entry-title').value = entry.title;
  document.getElementById('entry-content').value = entry.content;
}

function deleteEntry(index) {
  if (confirm('Are you sure you want to delete this entry?')) {
    entries.splice(index, 1);
    localStorage.setItem('journalEntries', JSON.stringify(entries));
    loadEntries();
  }
}
