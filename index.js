import { createCharacterCard } from "./components/card/card.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
const maxPage = 1;
const page = 1;
const searchQuery = "";

async function fetchCharacters() {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/?page=${page}`
    );

    const data = await response.json();

    const characterArray = data.results;
    cardContainer.innerHTML = "";
    console.log(characterArray);

    characterArray.map((character) => {
      const newCharacterCard = createCharacterCard(character);
      return cardContainer.append(newCharacterCard);
    });
  } catch (error) {
    console.error("Bad response");
  }
}

fetchCharacters();
