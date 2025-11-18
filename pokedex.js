import {
  createCard,
  pokeIdFromEvent,
  deleteBtnFromPokeId,
  notesBtnFromPokeId,
  menuOpen,
  menuClose,
  toggleMenu,
  searchInput,
  getSearchResults,
} from './modules/ui.js';

import { loadStorage, writeStorage, deletePokemon } from './modules/storage.js';

const note = document.querySelector('#dialog-container');
const noteName = document.querySelector('#note-name');
const btnCloseNote = document.querySelector('#btn-close-note');
const noteArea = document.querySelector('#note-area');
const btnSaveNote = document.querySelector('#btn-save-note');

showFavourites();

searchInput.addEventListener('input', (e) => {
  getSearchResults(e, loadStorage());
});

menuOpen.addEventListener('click', (e) => {
  toggleMenu(e);
});

menuClose.addEventListener('click', (e) => {
  toggleMenu(e);
});

function showFavourites() {
  const favourites = loadStorage();
  document.querySelector('#pokemon-container').textContent = '';
  favourites.forEach((pokemon) => {
    const isStored = true;
    createCard(pokemon, isStored);
    deleteBtnFromPokeId(pokemon.id).onclick = deleteBtnClicked;
    const notesBtn = notesBtnFromPokeId(pokemon.id);
    notesBtn.hidden = false;
    notesBtn.onclick = notesBtnClicked;
  });
}

function deleteBtnClicked(e) {
  const pokeId = pokeIdFromEvent(e);
  deletePokemon(pokeId);
  showFavourites();
}

function notesBtnClicked(e) {
  const pokeId = pokeIdFromEvent(e);
  const storedData = loadStorage();
  const i = storedData.findIndex((item) => item.id === pokeId);
  const pokeSet = storedData.splice(i, 1)[0];
  noteName.textContent = pokeSet.name;
  noteArea.value = pokeSet.notes ? pokeSet.notes : '';
  note.classList.remove('hidden');

  btnCloseNote.addEventListener('click', () => {
    noteArea.value = '';
    note.classList.add('hidden');
  });

  btnSaveNote.addEventListener('click', (e) => {
    e.preventDefault();
    pokeSet.notes = noteArea.value;
    writeStorage([pokeSet, ...storedData]);
    note.classList.add('hidden');
  });
}
