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
      <div class="comment-section" data-id="${entry.id}">
        <textarea placeholder="Scribble your thoughts..."></textarea>
        <button>Add Comment</button>
        <div class="comments"></div>
      </div>
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
