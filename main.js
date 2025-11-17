import {
  createCard,
  pokeIdFromEvent,
  catchBtnFromPokeId,
  deleteBtnFromPokeId,
  menuOpen,
  menuClose,
  toggleMenu,
  searchInput,
  getSearchResults,
} from './utils.js';

import {
  Pokemon,
  storePokemon,
  deletePokemon,
  isStored,
  loadStoreage,
} from './storeage.js';

const URL = 'https://pokeapi.co/api/v2/pokemon/';
const numberToFetch = 25;
const favouriteHeaderIcon = document.querySelector('#favourite-icon');

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
    setFavouriteIconColor();
  } catch (error) {
    console.error(error);
  }
})();

searchInput.addEventListener('input', (e) => {
  getSearchResults(e, pokeArr);
});

menuOpen.addEventListener('click', (e) => {
  toggleMenu(e);
});

menuClose.addEventListener('click', (e) => {
  toggleMenu(e);
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
  const pokeId = pokeIdFromEvent(e);
  catchBtnFromPokeId(pokeId).hidden = false;
  deleteBtnFromPokeId(pokeId).hidden = true;
  deletePokemon(pokeId);
  setFavouriteIconColor();
}

async function catchBtnClicked(e) {
  const pokeId = pokeIdFromEvent(e);
  catchBtnFromPokeId(pokeId).hidden = true;
  deleteBtnFromPokeId(pokeId).hidden = false;
  //storePokemon(await fetchPokemon(pokeId));
  fetchPokemon(pokeId).then((pokemonData) => {
    storePokemon(pokemonData);
    setFavouriteIconColor();
  });
}

function setFavouriteIconColor() {
  const storedPokemon = loadStoreage();
  if (storedPokemon.length > 0) {
    favouriteHeaderIcon.classList.add('text-poke-red');
    favouriteHeaderIcon.classList.remove('text-white');
  } else {
    favouriteHeaderIcon.classList.add('text-white');
    favouriteHeaderIcon.classList.remove('text-poke-red');
  }
}
