const Gameboard = (() => {
  const gameboard = document.querySelector(".gameboard");
  const resetBtn = document.querySelector("#reset");

  const BOARD_SIZE = 3;
  const MARKER_SIZE = `9rem`;

  let gameArray = new Array(BOARD_SIZE ** 2);

  resetBtn.onclick = () => newBoard();

  const getBoard = (size) => {
    gameboard.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    gameboard.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
      const square = document.createElement("div");
      square.classList.add("square");
      square.setAttribute("id", String(i));
      square.textContent = "";

      square.style.fontSize = MARKER_SIZE;
      square.addEventListener("mousedown", setSquare);

      gameboard.appendChild(square);
    }
  };

  const setSquare = (e) => {
    let currentPlayer = Game.getCurrentPlayer();
    
    if (e.target.textContent === "") {
      e.target.textContent = currentPlayer;
      gameArray[e.target.id] = e.target.textContent;
    }

    Game.checkGame(e.target.id);

    console.log(gameArray);
    console.log(gameArray[e.target.id]);
    console.log(e.target.id);
  };

  const newBoard = () => {
    while (gameboard.firstChild) {
      gameboard.removeChild(gameboard.firstChild);
    }

    gameArray = new Array(BOARD_SIZE ** 2);
    getBoard(BOARD_SIZE);
  };

  window.onload = () => {
    getBoard(BOARD_SIZE);
  };

  return { gameArray, setSquare, newBoard };
})();

const Player = (marker) => {
  this.marker = marker;

  const getMarker = () => marker;

  return { getMarker };
};

const Game = (() => {
  const player1Marker = document.getElementById("player1-select");
  const player2Marker = document.getElementById("player2-select");

  const player1 = Player(player1Marker.value);
  const player2 = Player(player2Marker.value);

  let round = 1;
  let gameOver = false;

  const checkGame = (currentSquare) => {
    // check isWinner to see if a player has won
    if (isWinner(currentSquare)) {
      // display the winning player on screen
      gameOver = true;
    }

    // check the round number to see if the game is tied
    if (round === 9) {
      // all squares are full but there isn't a winner, so its a draw
      gameOver = true;
    }

    // otherwise keep playing by moving on to the next round
    round++;
    // indicate whos turn it is
  };

  const getCurrentPlayer = () => {
    if (round % 2 === 1) {
      return player1.getMarker();
    }

    return player2.getMarker();
  };

  const isWinner = (currentSquare) => {
    const winCombo = [
      // rows
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      // columns
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      // diagonals
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winCombo
    .filter((allCombo) => allCombo.includes(currentSquare))
    .some((winningCombo) =>
      winningCombo.every(
        (index) => Gameboard.gameArray[index] === getCurrentPlayer()
      )
    );
  };

  return { checkGame, getCurrentPlayer };
})();
