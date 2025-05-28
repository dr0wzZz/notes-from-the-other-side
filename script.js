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

  document.querySelectorAll('.comment-section button').forEach(btn =>
    btn.addEventListener('click', handleComment)
  );
}

function handleComment(e) {
  const section = e.target.closest('.comment-section');
  const textarea = section.querySelector('textarea');
  const commentsDiv = section.querySelector('.comments');
  const comment = textarea.value.trim();
  if (comment) {
    const p = document.createElement('p');
    p.className = 'comment';
    p.textContent = comment;
    commentsDiv.appendChild(p);
    textarea.value = '';
  }
}

renderEntries();

function displayPublicEntries() {
  const publicEntriesList = document.getElementById('public-entries-list');
  publicEntriesList.innerHTML = '';
  const entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
  entries.forEach(entry => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `<strong>${entry.title}</strong><p>${entry.content}</p>`;
    publicEntriesList.appendChild(listItem);
  });
}

// Call this function on page load
displayPublicEntries();