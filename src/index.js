import "./styles.css";

const pieces = ["X", "O"];
const resultElement = document.querySelector("#result");
let count = 0;
let matrix = [];

function changePiece() {
  document.querySelector("#piece").innerHTML = pieces[count % 2];
}
function reset() {
  count = 0;
  matrix = [];
  changePiece();
  const all = document.querySelectorAll("td");
  Array.prototype.map.call(all, element => {
    element.innerHTML = "";
  });
  resultElement.innerHTML = "";
}

function win(verifier, piece) {
  const types = ["col", "row", "diag"];
  const winner = types
    .map(item => {
      let index = verifier[item].indexOf(3);
      let result;
      if (index > -1) {
        result = {
          piece,
          type: item,
          pos: index
        };
      }
      return result;
    })
    .filter(value => value !== undefined);
  if (winner.length > 0) {
    const { piece: p, type, pos } = winner[0];
    resultElement.innerHTML = `${p} ${type} ${pos + 1}`;
  }
}

document.querySelector("table").addEventListener(
  "click",
  function({ target }) {
    if (target && target.nodeName === "TD") {
      const position = target.dataset.position;
      const piece = pieces[count++ % 2];
      const arrPosition = { position: position.split(","), piece };
      const verifier = {
        row: Array(3).fill(0),
        col: Array(3).fill(0),
        diag: Array(2).fill(0)
      };
      let victory = {};

      target.innerHTML = piece;
      changePiece();
      matrix.push(arrPosition);

      matrix
        .filter(value => value.piece === piece)
        .forEach(({ position }) => {
          const row = position[0];
          const col = position[1];
          victory.piece = piece;

          verifier.row[row] = verifier.row[row] + 1;
          verifier.col[col] = verifier.col[col] + 1;

          if (row === col) {
            verifier.diag[0] = verifier.diag[0] + 1;
            if (row === "1") {
              verifier.diag[1] = verifier.diag[1] + 1;
            }
          }
          if (Math.abs(row - col) === 2) {
            verifier.diag[1] = verifier.diag[1] + 1;
          }
        });
      win(verifier, piece);
    }
  },
  false
);

reset();

document.querySelector("#start-game").addEventListener("click", reset);
