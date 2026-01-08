const notes = document.querySelectorAll('.note');
const STORAGE_KEY = 'visionBoardOpened';

let opened = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

notes.forEach(note => {
  const id = note.dataset.id;

  if (opened[id]) {
    note.classList.add('open');
  }

  note.addEventListener('click', () => {
    if (!opened[id]) {
      note.classList.add('open');
      opened[id] = true;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(opened));
    }
  });
});

// Botón secreto para resetear (solo tú 😌)
document.getElementById('reset').addEventListener('click', () => {
  localStorage.removeItem(STORAGE_KEY);
  location.reload();
});
