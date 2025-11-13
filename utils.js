const pfxCatch = 'catch-';
const pfxDelete = 'delete-';
const pfxNotes = 'notes-';
const pfxArticle = 'article-';

export function createCard(data, isStored = false) {
  const catchBtnVisibility = isStored ? 'hidden' : '';
  const deleteBtnVisibility = isStored ? '' : 'hidden';
  const notesBtnVisibility = isStored ? '' : 'hidden';
  const pokeContainer = document.querySelector('#pokemon-container');
  const html = `
        <article id="${pfxArticle}${data.id}" class="flex flex-col bg-poke-gray-dark text-stone-100 rounded-xl shadow">
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
}

export function catchBtnFromPokemon(pokemon) {
  const catchBtn = e.target.id.startsWith(pfxCatch)
    ? e.target
    : e.target.parentElement;
  const id = catchBtn.id.split('-').pop();
  const deleteBtn = document.querySelector(`#${pfxDelete}${id}`);
  catchBtn.hidden = true;
  deleteBtn.hidden = false;
}

export function catchBtnFromPokeId(pokeId) {
  return btnFromPokeId(pokeId, pfxCatch);
}

export function deleteBtnFromPokeId(pokeId) {
  return btnFromPokeId(pokeId, pfxDelete);
}

export function notesBtnFromPokeId(pokeId) {
  return btnFromPokeId(pokeId, pfxNotes);
}

export function articleFromPokeId(pokeId) {
  return btnFromPokeId(pokeId, pfxArticle);
}

function btnFromPokeId(pokeId, prefix) {
  return document.querySelector(`#${prefix}${pokeId}`);
}

export function pokeIdFromEvent(e) {
  const element = e.target.closest('button') ?? e.target.closest('article');
  return element.id.split('-').pop();
}
