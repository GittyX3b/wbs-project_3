import {
  createCard,
  pokeIdFromEvent,
  catchBtnFromPokeId,
  deleteBtnFromPokeId,
  searchInput,
  searchButton,
  getSearchResults,
} from './utils.js';

import { Pokemon, storePokemon, deletePokemon, isStored } from './storeage.js';

const URL = 'https://pokeapi.co/api/v2/pokemon/';
const numberToFetch = 10;

let pokeArr = [];

/* FETCHING DATA =======================*/

// Initial fetching of all data and saving it in pokeArr => then calling createPage()
(async function () {
  try {
    const promiseArr = [];

    // Create all fetch requests first
    for (let i = 1; i <= numberToFetch; i++) {
      promiseArr.push(fetchPokemon(i));
    }

    // Wait for all to finish...
    pokeArr = await Promise.all(promiseArr);

    // ...and render page if pokeArr is filled
    createGrid(pokeArr);
  } catch (error) {
    console.error(error);
  }
})();

searchInput.addEventListener('input', (e) => {
  getSearchResults(e, pokeArr);
});

searchButton.addEventListener('click', (e) => {
  getSearchResults(e, pokeArr);
});

function fetchPokemon(id) {
  return fetch(`${URL}${id}`).then((res) => {
    if (!res.ok) throw new Error('res.ok = false');
    return res.json();
  });
}

/* SCHEDULE ===============================*/
function createGrid(pokeArr) {
  pokeArr.forEach((data) => {
    const pokemon = new Pokemon(data);
    createCard(pokemon, isStored(pokemon.id));
    catchBtnFromPokeId(pokemon.id).onclick = catchBtnClicked;
    deleteBtnFromPokeId(pokemon.id).onclick = deleteBtnClicked;
  });
}

function deleteBtnClicked(e) {
  console.log('delete button clicked');
  const pokeId = pokeIdFromEvent(e);
  catchBtnFromPokeId(pokeId).hidden = false;
  deleteBtnFromPokeId(pokeId).hidden = true;
  deletePokemon(pokeId);
}

async function catchBtnClicked(e) {
  console.log('catch button clicked');
  const pokeId = pokeIdFromEvent(e);
  catchBtnFromPokeId(pokeId).hidden = true;
  deleteBtnFromPokeId(pokeId).hidden = false;
  storePokemon(await fetchPokemon(pokeId));
}
