const journal = [
  {
    id: 1,
    title: "Riffed into Oblivion",
    content: "Last night’s gig melted face. Literally. Bass amp caught fire. Best night ever.",
    timestamp: "2025-05-27T22:30:00"
  },
  {
    id: 2,
    title: "Another Day, Another Decibel",
    content: "Woke up to Slayer. Breakfast was leftover nachos and distortion pedals.",
    timestamp: "2025-05-28T09:15:00"
  }
];

function formatDate(iso) {
  return new Date(iso).toLocaleString();
}

function renderEntries() {
  const container = document.getElementById('journal');
  container.innerHTML = '';

  journal.forEach(entry => {
    const el = document.createElement('article');
    el.className = 'entry';
    el.innerHTML = `
      <h2>${entry.title}</h2>
      <time>${formatDate(entry.timestamp)}</time>
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
