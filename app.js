const Gameboard = (() => {
  const gameboard = document.querySelector(".gameboard");
  const sizeLabel = document.querySelector("#sizeLabel");
  const sizeSlider = document.querySelector("#gridSize");
  const resetBtn = document.querySelector("#reset");

  const DEFAULT_GRID = 3;

  let boardSize = DEFAULT_GRID;

  let gameArray = [];

  sizeSlider.onmousemove = (e) => setLabel(e.target.value);
  sizeSlider.onchange = (e) => setSize(e.target.value);
  resetBtn.onclick = () => newBoard();

  const getBoard = (size) => {
    gameboard.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    gameboard.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
      const square = document.createElement("div");
      square.classList.add("square");

      if (gameArray[i] != null) {
        square.textContent = gameArray[i];
      }

      square.addEventListener("mousedown", ticTacToe);

      gameboard.appendChild(square);
    }
  };

  const ticTacToe = (e) => {
    e.target.textContent = "X";
  };

  const setLabel = (size) => {
    sizeLabel.textContent = size + " X " + size;
  }

  const setSize = (size) => {
    boardSize = size;
    newBoard();
  }

  const newBoard = () => {
    while(gameboard.firstChild) {
      gameboard.removeChild(gameboard.firstChild);
    }

    getBoard(boardSize);
  }

  window.onload = () => {
    getBoard(DEFAULT_GRID);
  };
})();

const Player = () => {
  let move = "";

};

