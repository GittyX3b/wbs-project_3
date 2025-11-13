import {
  createCard,
  pokeIdFromEvent,
  catchBtnFromPokeId,
  deleteBtnFromPokeId,
} from './utils.js';

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
      promiseArr.push(
        fetch(`${URL}${i}`).then((res) => {
          if (!res.ok) throw new Error('res.ok = false');
          return res.json();
        })
      );
    }

    // Wait for all to finish...
    pokeArr = await Promise.all(promiseArr);

    // ...and render page if pokeArr is filled
    createPage(pokeArr);
  } catch (error) {
    console.error(error);
  }
})();

/* SCHEDULE ===============================*/
function createPage(pokeArr) {
  pokeArr.forEach((pokemon) => {
    createCard(pokemon);
    catchBtnFromPokeId(pokemon.id).onclick = catchBtnClicked;
    deleteBtnFromPokeId(pokemon.id).onclick = deleteBtnClicked;
  });
}

function deleteBtnClicked(e) {
  console.log('delete button clicked');
  console.log('catch button clicked');
  const pokeId = pokeIdFromEvent(e);
  catchBtnFromPokeId(pokeId).hidden = false;
  deleteBtnFromPokeId(pokeId).hidden = true;
  // delete Pokemon from favourites
}

function catchBtnClicked(e) {
  console.log('catch button clicked');
  const pokeId = pokeIdFromEvent(e);
  catchBtnFromPokeId(pokeId).hidden = true;
  deleteBtnFromPokeId(pokeId).hidden = false;
  // store pokemon in favourites
}
