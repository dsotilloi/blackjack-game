let decks = [];
const types = ["C", "D", "H", "S"];
const specials = ["A", "J", "Q", "K"];

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

deckValue(askDeck());
