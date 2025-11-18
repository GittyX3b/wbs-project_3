const pfxCatch = 'catch-';
const pfxDelete = 'delete-';
const pfxNotes = 'notes-';
const pfxArticle = 'article-';
export const menuOpen = document.querySelector('#menu-o');
export const menuClose = document.querySelector('#menu-c');
export const searchInput = document.querySelector('#search');
export const searchContainer = document.querySelector('#search-container');

export function createCard(pokemon, isStored = false) {
  const catchBtnVisibility = isStored ? 'hidden' : '';
  const deleteBtnVisibility = isStored ? '' : 'hidden';
  const pokeContainer = document.querySelector('#pokemon-container');
  const html = `
        <article id="${pfxArticle}${pokemon.id}" class="flex flex-col bg-poke-gray-dark text-stone-100 rounded-xl shadow">
          <div class="flex justify-end">
            <button id="${pfxNotes}${pokemon.id}" class="w-7 mt-1 me-1 hover:cursor-pointer hover:outline-2 rounded-md flex justify-center" hidden>
              <img class="rounded-md" src="./assets/icons/notes.png">
            </button>
            <button id="${pfxDelete}${pokemon.id}" class="w-7 mt-1 me-1 hover:cursor-pointer hover:outline-2 rounded-full flex justify-center" ${deleteBtnVisibility}>
              <img class="bg-white rounded-full" src="./assets/icons/delete.png">
            </button>
            <button id="${pfxCatch}${pokemon.id}" class="w-7 mt-1 me-1 hover:cursor-pointer hover:outline-2 rounded-full flex justify-center hover:animate-spin" ${catchBtnVisibility}>
              <img src="./assets/icons/pokeball.png">
            </button>
          </div>
          <div class="flex md:flex-col gap-2 h-full">
            <img class="grow-1 p-10 max-w-1/4 min-w-[10rem] scale-100 md:max-w-2/3 lg:max-h-2/3 mx-auto drop-shadow-[0_0_15px_rgba(0,0,0,1)]" src="${pokemon.img}"  alt="${pokemon.name}" draggable="false">
            <div class="flex flex-col grow justify-center max-w-2/3 md:max-w-full px-5 lg:p-2">
              <h2 class="font-semibold capitalize text-center mb-4 text-lg">${pokemon.name}</h2>
              <div class="flex gap-2 items-center justify-between w-full px-3">
                <label for="hp">HP</label>
                <meter class="bg-poke-yellow w-[40%] sm:w-[70%] md:w-[60%] lg:w-[40%]" value="${pokemon.hp}" max="100" id="hp">HP</meter>
              </div>
              <div class="flex gap-2 items-center justify-between w-full px-3">
                <label for="attack">Attack</label>
                <meter class="bg-poke-red w-[40%] sm:w-[70%] md:w-[60%] lg:w-[40%]" value="${pokemon.attack}" max="100" id="attack">Attack</meter>
              </div>
              <div class="flex gap-2 items-center justify-between w-full px-3 pb-3">
                <label for="defense">Defense</label>
                <meter class="bg-poke-blue w-[40%] sm:w-[70%] md:w-[60%] lg:w-[40%]" value="${pokemon.defense}" max="100"
                  id="defense">Defense</meter>
              </div>
            </div>
          </div>
        </article>`;
  pokeContainer.insertAdjacentHTML('beforeend', html);
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
  return Number(element.id.split('-').pop());
}

export function getSearchResults(e, cardArray) {
  let errorContainer = document.querySelector('.error');
  const query = searchInput.value.toLowerCase();
  if (query === '') {
    const cards = document.querySelectorAll('article');
    cards.forEach((card) => {
      card.classList.remove('hidden');
      if (errorContainer) {
        errorContainer.remove();
      }
    });
  } else {
    let cardFound = false;
    cardArray.forEach((item) => {
      const card = document.querySelector(`#article-${item.id}`);
      if (!item.name.toLowerCase().includes(query)) {
        card.classList.add('hidden');
      } else {
        cardFound = true;
        card.classList.remove('hidden');
        if (errorContainer) {
          errorContainer.remove();
        }
      }
    });
    if (cardFound === false) {
      if (!errorContainer) {
        errorContainer = document.createElement('div');
        errorContainer.textContent = 'Keine Pokemons gefunden';
        errorContainer.classList.add(
          'error',
          'text-poke-red',
          'text-center',
          'text-2xl'
        );
        const mainContainer = document.querySelector('main');
        mainContainer.prepend(errorContainer);
      }
    }
  }
}

export function toggleMenu(e) {
  menuOpen.classList.toggle('hidden');
  menuClose.classList.toggle('hidden');
  if (e.target.id === 'menu-c') {
    searchContainer.classList.add('hidden');
  } else if (e.target.id === 'menu-o') {
    searchContainer.classList.remove('hidden');
  }
}
