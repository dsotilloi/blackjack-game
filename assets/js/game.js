// 2C = 2 of clubs
// 2D = 2 of diamonds
// 2H = 2 of hearts
// 2S = 2 of spades

let deck = [];
const types = ["C", "D", "H", "S"];
const specials = ["A", "J", "Q", "K"];

const createDeck = () => {
  for (let i = 2; i <= 10; i++) {
    for (let type of types) {
      deck.push(i + type);
    }
  }

  for(let type of types){
    for(let special of specials){
      deck.push(special + type);
    }
  }

  
  deck = _.shuffle(deck);
  
  return deck;
};


createDeck();
