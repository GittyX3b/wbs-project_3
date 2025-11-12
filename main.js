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
  pokeArr.forEach((element) => {
    createCard(element);
  });
}

function createCard(data) {
  console.log('POKEMON DATA loaded:', pokeArr);
  const pokeContainer = document.querySelector('#pokemon-container');
  const html = `
         <article class="bg-poke-gray-dark text-stone-100 flex md:flex-col justify-evenly gap-2 rounded-xl shadow">
          <img class="grow-1" src="${data.sprites.front_shiny}" alt="">
          
          <div class="flex flex-col grow-4 justify-center">
            <h2 class="font-semibold capitalize text-center m-2">${data.name}</h2>
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
        </article>`;
  pokeContainer.insertAdjacentHTML('beforeend', html);
}
