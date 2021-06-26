const topLeftTile = [16369, 10895];
const zoom = 15;
const tileSize = 256;
const rowCount = 3;
const columnCount = 7;
let container;

const tilesMatrix = [...new Array(rowCount)].map(() => new Array(columnCount));

const moveTile = (tile, oldPos, newPos) => {
  tilesMatrix[newPos.row][newPos.column] =
    tilesMatrix[oldPos.row][oldPos.column];
  tilesMatrix[oldPos.row][oldPos.column] = undefined;
  tile.style.transform = `translate3d(${newPos.column * tileSize}px, ${
    newPos.row * tileSize
  }px, 0)`;
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
    row = Math.floor(Math.random() * rowCount);
    column = Math.floor(Math.random() * columnCount);
  } while (tilesMatrix[row][column]);
  return [row, column];
};

const placeTile = (xTile, yTile) => {
  const tilePos = findPlaceInMatrix();
  const img = document.createElement("img");
  img.src = `https://tile.openstreetmap.org/${zoom}/${xTile}/${yTile}.png`;
  img.style.transform = `translate3d(${tilePos[1] * tileSize}px, ${
    tilePos[0] * tileSize
  }px, 0)`;
  img.classList.add("tile", "disable-interactivity");
  img.dataset.row = tilePos[0];
  img.dataset.column = tilePos[1];
  img.onclick = onTileClick;
  tilesMatrix[tilePos[0]][tilePos[1]] = img;
  container.appendChild(img);
};

const init = () => {
  for (let i = topLeftTile[0]; i <= topLeftTile[0] + columnCount - 1; i++) {
    for (let j = topLeftTile[1]; j <= topLeftTile[1] + rowCount - 1; j++) {
      if (i != topLeftTile[0] || j != topLeftTile[1]) {
        placeTile(i, j);
      }
    }
  }
};

window.addEventListener("DOMContentLoaded", () => {
  container = document.querySelector(".container");
  init();
});
