const POKEMONS = 'Pokemons';
class Pokemon {
  id;
  name;
  img;
  hp;
  attack;
  defense;
  notes;
  constructor(data, notes = '') {
    console.log(data);
    this.id = data.id;
    this.name = data.name;
    this.img = data.sprites.front_shiny;
    this.hp = data.stats[0].base_stat;
    this.attack = data.stats[0].base_stat;
    this.defense = data.stats[0].base_stat;
    this.notes = notes;
  }
}

export function storePokemon(data) {
  const pokemons = loadStoreage();
  pokemons.push(new Pokemon(data));
  writeStoreage(pokemons);
}

export function deletePokemon(id) {
  const pokemons = loadStoreage().filter((pokemon) => pokemon.id != id);
  writeStoreage(pokemons);
}

function loadStoreage() {
  return JSON.parse(localStorage.getItem(POKEMONS)) ?? [];
}

function writeStoreage(pokemons) {
  localStorage.setItem(POKEMONS, JSON.stringify(pokemons));
}
