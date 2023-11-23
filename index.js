import { createCharacterCard } from "./components/card/card.js";
import navButton from "./components/nav-button/nav-button.js";
import navPagination from "./components/nav-pagination/nav-pagination.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
// const prevButton = document.querySelector('[data-js="button-prev"]');
// const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
let maxPage = 1;
let page = 1;
let searchQuery = "";


const prevOnClick = () => {
  page--;
  // function that chnages pagination
  fetchCharacters();
};
const nextOnClick = () => {
  page++;
  fetchCharacters();
};


const pageNumbers = navPagination(page, maxPage);

const prevButton = navButton(
  "button--prev",
  "button-prev",
  "prev",
  prevOnClick
);

const nextButton = navButton(
  "button--next",
  "button-next",
  "next",
  nextOnClick
);

navigation.append(prevButton);
navigation.append(pageNumbers)
navigation.append(nextButton);

async function fetchCharacters() {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/?page=${page}`
    );

    const data = await response.json();
    maxPage = data.info.pages;
    console.log(maxPage)

    pageNumbers.innerHTML = `${page}/${maxPage}`;

    const characterArray = data.results;
    cardContainer.innerHTML = "";

    characterArray.map((character) => {
      const newCharacterCard = createCharacterCard(character);
      return cardContainer.append(newCharacterCard);
    });
  } catch (error) {
    console.error("Bad response");
  }
}

fetchCharacters();
