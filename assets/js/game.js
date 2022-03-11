const BlackJack = (() => {
  "use strict";

  let decks = [];
  const types = ["C", "D", "H", "S"],
        specials = ["A", "J", "Q", "K"];

  let playersScore = [],
      playerScore = 0,
      computerScore = 0;

  //Referencias del HTML:
  const btnAsk = document.querySelector("#btnAsk"),
        btnStop = document.querySelector("#btnStop"),
        btnNew = document.querySelector("#btnNew");

  const desksContainer = document.querySelectorAll(".desksDiv"),
        htmlScore = document.querySelectorAll("small");

  //Estilo inicial de los botones:
  btnNew.classList.add("btn-danger");
  btnAsk.classList.add("btn-primary");
  btnAsk.disabled = true;
  btnStop.disabled = true;

  //Habilida y deshabilita los botones "btnNew" y "btnAsk" para guiar al usuario en la jugada:
  const btnStyles = (btnA, btnB) => {
    btnA.classList.remove("btn-danger");
    btnA.classList.add("btn-primary");
    btnB.classList.remove("btn-primary");
    btnB.classList.add("btn-danger");

    btnA.disabled = true;
    btnB.disabled = false;
  };

  //Esta función inicializa el juego:
  const startPlay = (playersNum = 2) => {
    decks = createDecks();

    playersScore = [];

    for (let i = 0; i < playersNum; i++) {
      playersScore.push(0);
    }

    htmlScore.forEach((element) => (element.innerText = 0));
    desksContainer.forEach((element) => (element.innerText = ""));

    btnStyles(btnNew, btnAsk);
    btnStop.disabled = false;
  };

  //Crea una nueva baraja:
  const createDecks = () => {
    decks = [];

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

    return _.shuffle(decks);
  };

  //Permite tomar la última baraja del arreglo:
  const askDeck = () => {
    return decks.pop();
  };

  //Permite obtener el valor de la baraja:
  const deckValue = (deck) => {
    const value = deck.substring(0, deck.length - 1);

    return isNaN(value) ? (value === "A" ? 11 : 10) : value * 1;
  };

  //Acumula los puntos del jugador respectivo: primer jugador = posición 0, computadora = última posición del arreglo.
  const scoreCounter = (deck, turn) => {
    playersScore[turn] = playersScore[turn] + deckValue(deck);
    htmlScore[turn].innerText = playersScore[turn];

    return playersScore[turn];
  };

  //Muestra las cartas del jugador que corresponda:
  const showDesk = (deck, turn) => {
    const deckImg = document.createElement("img");
    deckImg.src = `./assets/decks/${deck}.png`;
    deckImg.classList.add("deck");
    desksContainer[turn].append(deckImg);
  };

  //Comienza el turno de juego de la computadora:
  const computerTurn = (playerScore) => {
    do {
      const deck = askDeck();
      computerScore = scoreCounter(deck, playersScore.length - 1);
      showDesk(deck, playersScore.length - 1);
    } while (computerScore < playerScore && playerScore < 21);
  };

  //Determina el resultado de la partida y anuncia al ganador al superar o igualar 21 puntos:
  const results = () => {
    const message = [
      "Ganaste 🏆 ¡Sumaste 21 puntos exactos! ¿Qué tal otra partida, campeón?",
      "Game over 👾. Sumaste más de 21 puntos, la Máquina gana ¡Inténtalo de nuevo!",
    ];

    const _endGame = () => {
      btnStyles(btnAsk, btnNew);
      btnStop.disabled = true;
      computerTurn(playerScore);
    };

    if (playerScore === 21) {
      _endGame();
      setTimeout(() => {
        alert(message[0]);
      }, 700);
    } else if (playerScore > 21) {
      _endGame();
      setTimeout(() => {
        alert(message[1]);
      }, 700);
    } 
  };

  //Determina el resultado de la partida y anuncia al ganador al presionar "btnStop":
  const endGame = () => {
    const message = [
      "Empate 🤝 ¿Qué tal otra partida?",
      "Ganaste 🏆 Te aproximaste más que la Máquina a 21 puntos ¡Juega de nuevo!",
      "Game over 👾. La Máquina gana porque se aproximó más a 21 puntos, ¡inténtalo de nuevo!"
    ];

    setTimeout(() => {
      if (computerScore === playerScore) {
         alert(message[0]);
       } else if (computerScore > 21) {
         alert(message[1]);
       } else {
         alert(message[2]);
       }
     }, 700);
  };

  //Eventos:
  btnAsk.addEventListener("click", () => {
    const deck = askDeck();
    playerScore = scoreCounter(deck, 0);
    showDesk(deck, 0);
    results();
  });

  btnStop.addEventListener("click", () => {
    computerTurn(playerScore);
    btnStyles(btnAsk, btnNew);
    btnStop.disabled = true;
    endGame();
  });

  btnNew.addEventListener("click", () => startPlay());

  return {
    nuevoJuego: startPlay
  }

})();
