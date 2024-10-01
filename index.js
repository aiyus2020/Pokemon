"use strict";

// DOM Elements
const userInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const spriteContainer = document.getElementById("sprite_container");
const types = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialDefense = document.getElementById("special-defense");
const specialAttack = document.getElementById("special-attack");
const speed = document.getElementById("speed");

const pokemonUrl = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/";

// Fetch Pokémon data
const getPokemon = async () => {
  const pokemonInput = userInput.value.toLowerCase().trim();

  // Validate input
  if (!pokemonInput) {
    return alert("Input must not be empty");
  }

  try {
    const res = await fetch(`${pokemonUrl}${pokemonInput}`);

    if (!res.ok) {
      return alert("Pokémon not found");
    }

    const data = await res.json();
    console.log(data);

    displayPokemonData(data);
  } catch (error) {
    alert("An error occurred while fetching Pokémon data.");
  }
};

// Display Pokémon data
const displayPokemonData = (data) => {
  // Set Pokémon info
  pokemonName.textContent = `${data.name.toUpperCase()}`;
  pokemonId.textContent = `${data.id}`;
  weight.textContent = `${(data.weight / 10).toFixed(1)} kg`;
  height.textContent = `${(data.height / 10).toFixed(1)} m`;

  // Display Pokémon sprite
  spriteContainer.innerHTML = `<img src="${data.sprites.front_default}" alt="${data.name}" />`;

  // Display Pokémon types
  types.innerHTML = data.types
    .map(
      (typeInfo) =>
        `<span class="type ${
          typeInfo.type.name
        }">${typeInfo.type.name.toUpperCase()}</span>`
    )
    .join("");

  // Display Pokémon base stats
  hp.textContent = data.stats[0].base_stat;
  attack.textContent = data.stats[1].base_stat;
  defense.textContent = data.stats[2].base_stat;
  specialAttack.textContent = data.stats[3].base_stat;
  specialDefense.textContent = data.stats[4].base_stat;
  speed.textContent = data.stats[5].base_stat;
};

// Event listener for the search button
searchBtn.addEventListener("click", () => {
  getPokemon();
});
userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    getPokemon();
  }
});
