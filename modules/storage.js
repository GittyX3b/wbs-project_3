const POKEMONS = 'Pokemons';

export class Pokemon {
  id;
  name;
  img;
  hp;
  attack;
  defense;
  notes;
  constructor(data, notes = '') {
    this.id = data.id;
    this.name = data.name;
    this.img = data.sprites.other.dream_world.front_default;
    this.hp = data.stats[0].base_stat;
    this.attack = data.stats[0].base_stat;
    this.defense = data.stats[0].base_stat;
    this.notes = notes;
  }
}

export function storePokemon(data) {
  const pokemons = loadStorage();
  pokemons.push(new Pokemon(data));
  writeStorage(pokemons);
}

export function deletePokemon(id) {
  let pokemons = loadStorage();
  pokemons = pokemons.filter((pokemon) => pokemon.id !== id);
  pokemons.length > 0
    ? writeStorage(pokemons)
    : localStorage.removeItem(POKEMONS);
}

export function isStored(id) {
  return loadStorage().find((pokemon) => pokemon.id === id);
}

export function loadStorage() {
  return JSON.parse(localStorage.getItem(POKEMONS)) ?? [];
}

export function writeStorage(pokemons) {
  localStorage.setItem(POKEMONS, JSON.stringify(pokemons));
}
