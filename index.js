const firstTile = [19588, 13335];
const zoom = 15;
let container;

const tilesMatrix = [new Array(7), new Array(7), new Array(7)];

const moveTile = (tile, oldPos, newPos) => {
  tilesMatrix[newPos.row][newPos.column] =
    tilesMatrix[oldPos.row][oldPos.column];
  tilesMatrix[oldPos.row][oldPos.column] = undefined;
  tile.style.left = newPos.column * 256 + "px";
  tile.style.top = newPos.row * 256 + "px";
  tile.dataset.row = newPos.row;
  tile.dataset.column = newPos.column;
};

const returnMoveOptions = (pos) => {
  if (pos.row - 1 >= 0 && !tilesMatrix[pos.row - 1][pos.column]) {
    return { row: pos.row - 1, column: pos.column };
  }

  if (
    pos.row + 1 < tilesMatrix.length &&
    !tilesMatrix[pos.row + 1][pos.column]
  ) {
    return { row: pos.row + 1, column: pos.column };
  }

  if (pos.column - 1 >= 0 && !tilesMatrix[pos.row][pos.column - 1]) {
    return { row: pos.row, column: pos.column - 1 };
  }

  if (
    pos.column + 1 < tilesMatrix[0].length &&
    !tilesMatrix[pos.row][pos.column + 1]
  ) {
    return { row: pos.row, column: pos.column + 1 };
  }
  return undefined;
};

const onTileClick = (event) => {
  const tile = event.target;
  const currentPos = {
    row: parseInt(tile.dataset.row),
    column: parseInt(tile.dataset.column),
  };
  const newPos = returnMoveOptions(currentPos);
  if (newPos) {
    moveTile(tile, currentPos, newPos);
  }
};

const findPlaceInMatrix = () => {
  let row;
  let column;
  do {
    row = Math.floor(Math.random() * 3);
    column = Math.floor(Math.random() * 7);
  } while (tilesMatrix[row][column]);
  return [row, column];
};

const placeTile = (xTile, yTile) => {
  const tilePos = findPlaceInMatrix();
  const img = document.createElement("img");
  img.src = `https://tile.openstreetmap.org/15/${xTile}/${yTile}.png`;
  img.style.left = tilePos[1] * 256 + "px";
  img.style.top = tilePos[0] * 256 + "px";
  img.classList.add("tile", "disable-interactivity");
  img.dataset.row = tilePos[0];
  img.dataset.column = tilePos[1];
  img.onclick = onTileClick;
  tilesMatrix[tilePos[0]][tilePos[1]] = img;
  container.appendChild(img);
};

const init = () => {
  for (let i = 19588; i <= 19594; i++) {
    for (let j = 13333; j <= 13335; j++) {
      if (i != 19588 || j != 13333) {
        placeTile(i, j);
      }
    }
  }
};

window.addEventListener("DOMContentLoaded", () => {
  container = document.querySelector(".container");
  init();
});
