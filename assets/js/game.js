let decks = [];
const types = ["C", "D", "H", "S"];
const specials = ["A", "J", "Q", "K"];

let playerScore = 0,
  ComputerScore = 0;

//Referencias del HTML:
const btnAsk = document.querySelector("#btnAsk");
const playerDecks = document.querySelector("#playerDecks");
let htmlScore = document.querySelectorAll("small");

//Crea una nueva baraja:
const createDecks = () => {
  for (let i = 2; i <= 10; i++) {
    for (let type of types) {
      decks.push(i + type);
    }
  }

  for (let type of types) {
    for (let special of specials) {
      decks.push(special + type);
    }
  }

  decks = _.shuffle(decks);

  return decks;
};

createDecks();

//Permite tomar una baraja:
const askDeck = () => {
  const deck = decks.pop();
  return deck;
};

//Permite obtener el valor de la baraja:
const deckValue = (deck) => {
  const value = deck.substring(0, deck.length - 1);

  return isNaN(value) ? (value === "A" ? 11 : 10) : value * 1;
};

//Eventos:
btnAsk.addEventListener("click", () => {
  const deck = askDeck();

  playerScore = playerScore + deckValue(deck);
  htmlScore[0].innerText = playerScore;

  const deckImg = document.createElement("img");
  deckImg.src = `./assets/decks/${deck}.png`;
  deckImg.classList.add("deck");
  playerDecks.append(deckImg);

  if (playerScore > 21) {

    btnAsk.disabled = true;
    setTimeout(() => {
      alert("Game over 👾. Sumaste más de 21 puntos, ¡inténtalo de nuevo!");
    }, 300);

  }else if ( playerScore === 21) {

    btnAsk.disabled = true;
    setTimeout(() => {
      alert("Ganaste 🏆 ¡Sumaste 21 puntos!");
    }, 300);

  }
});
