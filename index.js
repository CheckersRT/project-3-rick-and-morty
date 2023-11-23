import { createCharacterCard } from "./components/card/card.js";
import navButton from "./components/nav-button/nav-button.js";
import navPagination from "./components/nav-pagination/nav-pagination.js";
// import { selectCards } from "./components/battle/battle.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
let maxPage = 1;
let page = 1;
let searchQuery = "";

searchBar.addEventListener("submit", (event) => {
  event.preventDefault();
  searchQuery = event.target.query.value;
  fetchCharacters();
});

const prevOnClick = (e) => {
  page--;
  fetchCharacters();
  if (page < maxPage) {
    nextButton.disabled = false;
  }
};
const nextOnClick = (e) => {
  page++;
  fetchCharacters();
  if (page > 1) {
    prevButton.disabled = false;
  }
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
navigation.append(pageNumbers);
navigation.append(nextButton);


async function fetchCharacters() {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/?page=${page}&name=${searchQuery}`
      );
      
      const data = await response.json();
      maxPage = data.info.pages;
      
      pageNumbers.innerHTML = `${page}/${maxPage}`;
      
      const characterArray = data.results;
      cardContainer.innerHTML = "";
      
      
      characterArray.map((character) => {
        const newCharacterCard = createCharacterCard(character);
        return cardContainer.append(newCharacterCard);
      });
      
      if (page === maxPage) {
        nextButton.disabled = true;
      } else if (page === 1) {
        prevButton.disabled = true;
      }
      
      const characterCards = document.querySelectorAll('[data-js="character-card"]')
      const SelectButtons = document.querySelectorAll('[data-js="select-button"]');
      let count = 0;
      let maxCount = 2;
      
      SelectButtons.forEach((button, index) => {
        button.addEventListener("click", (event) => {
          count++;
          console.log(count);
          let fighterOne;
          let fighterTwo;
          console.log(characterCards);
          if(count < 2) {
            fighterOne = characterArray.filter((character, index2) => {
              if(index === index2) {
                return character;
              }
            }).map((name) => name.name).toString();
            // console.log(fighterOne);
            
            characterCards[index].classList.add("selected");
          } else if (count === 2) {
            fighterTwo = characterArray.filter((character, index2) => {
              if(index === index2) {
                return character;
              }
            }).map((name) => name.name).toString();
            //  console.log(fighterTwo);
            characterCards[index].classList.add("selected");
            const fightButton = navButton("button--fight", "", "Fight!", fightCharacters)
            document.body.append(fightButton);
          }
        })
      });
      
    } catch (error) {
      console.error("Bad response");
    }
  }
  
  fetchCharacters();
  
  const fightCharacters = (One, Two) => {
    console.log(One)
    if(One.length >= Two.length) {
      let result = fighterOne;
      console.log(result);
      return result;
    } else {
      result = fighterTwo;
      console.log(result);
      return result;
    }
  }
  
  
  
  