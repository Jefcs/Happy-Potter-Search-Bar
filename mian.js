const charactersList = document.getElementById("charactersList");
let hpCharacters = [];

let searchBar = document.getElementById("searchBar");
searchBar.addEventListener("keyup", (e) => {
  const searchEvent = e.target.value.toLowerCase();
  const filteredCharacter = hpCharacters.filter((character) => {
    return (
      character.name.toLowerCase().includes(searchEvent) ||
      character.house.toLowerCase().includes(searchEvent)
    );
  });
  displayCharacters(filteredCharacter);
});

const loadCharacters = async () => {
  try {
    const res = await fetch("https://hp-api.herokuapp.com/api/characters");
    hpCharacters = await res.json();
    displayCharacters(hpCharacters);
  } catch (err) {
    console.error(err);
  }
};

const displayCharacters = (characters) => {
  const htmlString = characters
    .map((character) => {
      return `
            <li class="character">
                <h2>${character.name}</h2>
                <p>House: ${character.house}</p>
                <img src="${character.image}"></img>
            </li>
        `;
    })
    .join("");
  charactersList.innerHTML = htmlString;
};

loadCharacters();
