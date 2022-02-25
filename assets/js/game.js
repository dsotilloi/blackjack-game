let decks = [];
const types = ["C", "D", "H", "S"];
const specials = ["A", "J", "Q", "K"];

let playerScore = 0,
  computerScore = 0;

//Referencias del HTML:
const btnAsk = document.querySelector("#btnAsk");
const btnStop = document.querySelector("#btnStop");
const btnNew = document.querySelector("#btnNew");
const playerDecks = document.querySelector("#playerDecks");
const computerDecks = document.querySelector("#computerDecks");
let htmlScore = document.querySelectorAll("small");

//Crea una nueva baraja:
const createDecks = () => {
  btnNew.disabled = true;

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

//Comienza el turno de juego de la computadora:
const computerTurn = (playerScore) => {
  do {
    const deck = askDeck();

    computerScore = computerScore + deckValue(deck);
    htmlScore[1].innerText = computerScore;

    const deckImg = document.createElement("img");
    deckImg.src = `./assets/decks/${deck}.png`;
    deckImg.classList.add("deck");
    computerDecks.append(deckImg);

    if (playerScore > 21) break;
  } while (computerScore < playerScore && playerScore < 21);
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
    btnNew.disabled = false;
    btnAsk.disabled = true;
    btnStop.disabled = true;
    computerTurn(playerScore);

    setTimeout(() => {
      alert("Game over 👾. Sumaste más de 21 puntos, la computadora gana.");
    }, 1000);
  } else if (playerScore === 21) {
    btnNew.disabled = false;
    btnAsk.disabled = true;
    btnStop.disabled = true;
    computerTurn(playerScore);

    setTimeout(() => {
      alert("Ganaste 🏆 ¡Sumaste 21 puntos exactos!");
    }, 1000);
  }
});

btnStop.addEventListener("click", () => {
  btnNew.disabled = false;
  btnAsk.disabled = true;
  btnStop.disabled = true;
  computerTurn(playerScore);

  setTimeout(() => {
    if (computerScore === playerScore) {
      alert("Empate 🤝 ¡Buena jugada!");
    } else if (computerScore > 21) {
      alert("Ganaste 🏆 ¡Juega de nuevo!");
    } else {
      alert("Game over 👾. La computadora gana, ¡inténtalo de nuevo!");
    }
  }, 1000);
});

btnNew.addEventListener("click", () => {
  decks = [];
  decks = createDecks();

  btnAsk.disabled = false;
  btnStop.disabled = false;

  playerScore = 0;
  computerScore = 0;

  htmlScore[0].innerText = 0;
  htmlScore[1].innerText = 0;

  computerDecks.innerHTML = "";
  playerDecks.innerHTML = "";
});
