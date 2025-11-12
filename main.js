const URL = 'https://pokeapi.co/api/v2/pokemon/';
const numberToFetch = 10;
const pfxCatch = 'catch-';
const pfxDelete = 'delete-';
const pfxNotes = 'notes-'; // TODO: remove notes button here but keep in pokedex.js

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
  pokeArr.forEach((element) => {
    createCard(element);
  });
}

function createCard(data) {
  console.log('POKEMON DATA loaded:', pokeArr);
  const isStored = false; // TODO: check if pokemon is stored in favourites
  const catchBtnVisibility = isStored ? 'hidden' : '';
  const deleteBtnVisibility = isStored ? '' : 'hidden';
  const notesBtnVisibility = isStored ? '' : 'hidden'; // TODO: remove notes button here but keep in pokedex.js
  const pokeContainer = document.querySelector('#pokemon-container');
  const html = `
        <article class="flex flex-col bg-poke-gray-dark text-stone-100 rounded-xl shadow">
          <div class="flex justify-end">
            <button id="${pfxNotes}${data.id}" class="w-7 mt-1 me-1 hover:cursor-pointer hover:outline-2 rounded-md flex justify-center" ${notesBtnVisibility}>
              <img class="rounded-md" src="./assets/icons/notes.png">
            </button>
            <button id="${pfxDelete}${data.id}" class="w-7 mt-1 me-1 hover:cursor-pointer hover:outline-2 rounded-full flex justify-center" ${deleteBtnVisibility}>
              <img class="bg-white rounded-full" src="./assets/icons/delete.png">
            </button>
            <button id="${pfxCatch}${data.id}" class="w-7 mt-1 me-1 hover:cursor-pointer hover:outline-2 rounded-full flex justify-center" ${catchBtnVisibility}>
              <img src="./assets/icons/pokeball.png">
            </button>
          </div>
          <div class="flex md:flex-col justify-evenly gap-2">
            <img class="grow-1" src="${data.sprites.front_shiny}" alt="">
            <div class="flex flex-col grow-4 justify-center">
              <h2 class="font-semibold capitalize text-center mb-4">${data.name}</h2>
              <div class="flex gap-2 items-center justify-between w-full px-3">
                <label for="hp">HP</label>
                <meter class="bg-poke-yellow" value="${data.stats[0].base_stat}" max="100" id="hp">HP</meter>
              </div>
              <div class="flex gap-2 items-center justify-between w-full px-3">
                <label for="attack">Attack</label>
                <meter class="bg-poke-red" value="${data.stats[1].base_stat}" max="100" id="attack">Attack</meter>
              </div>
              <div class="flex gap-2 items-center justify-between w-full px-3 pb-3">
                <label for="defense">Defense</label>
                <meter class="bg-poke-blue" value="${data.stats[2].base_stat}" max="100"
                  id="defense">Defense</meter>
              </div>
            </div>
          </div>
        </article>`;
  pokeContainer.insertAdjacentHTML('beforeend', html);
  document.querySelector(`#${pfxNotes}${data.id}`).onclick = notesBtnClicked; // TODO: remove notes button here but keep in pokedex.js
  document.querySelector(`#${pfxDelete}${data.id}`).onclick = deleteBtnClicked;
  document.querySelector(`#${pfxCatch}${data.id}`).onclick = catchBtnClicked;
}

// TODO: remove notes button here but keep in pokedex.js
function notesBtnClicked(e) {
  console.log('notes button clicked');
}

function deleteBtnClicked(e) {
  console.log('delete button clicked');
  const deleteBtn = e.target.id.startsWith(pfxDelete)
    ? e.target
    : e.target.parentElement;
  const id = deleteBtn.id.split('-').pop();
  const catchBtn = document.querySelector(`#${pfxCatch}${id}`);
  deleteBtn.hidden = true;
  catchBtn.hidden = false;
  // delete Pokemon from favourites
}

function catchBtnClicked(e) {
  console.log('catch button clicked');
  const catchBtn = e.target.id.startsWith(pfxCatch)
    ? e.target
    : e.target.parentElement;
  const id = catchBtn.id.split('-').pop();
  const deleteBtn = document.querySelector(`#${pfxDelete}${id}`);
  catchBtn.hidden = true;
  deleteBtn.hidden = false;
  // store pokemon in favourites
}
