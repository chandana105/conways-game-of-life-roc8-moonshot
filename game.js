const gridSize = 30;
let grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(false));

const gridContainer = document.getElementById("grid");

// Initialize the grid UI
function initializeGrid() {
  gridContainer.innerHTML = "";
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.addEventListener("click", () => toggleCell(row, col));
      //   clicking on any cell , with given its postion at row and col'th number : we ll make it false to true
      gridContainer.appendChild(cell);
    }
  }
  upgradeUI();
}

// toggle cell state
function toggleCell(row, col) {
  grid[row][col] = !grid[row][col]; // grid[1][2] = false , then it ll become true
  upgradeUI();
}

function upgradeUI() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell, index) => {
    // each cell is postioned at some number of row and col
    const row = Math.floor(index / gridSize);
    const col = index % gridSize;
    console.log(grid[row][col]);
    // in intiulaize grid , on whatever cell we have clicked it would have changed state from false to true
    // so here, we are going throught each cell ie from grid[row][col]
    // if with toggle :- alive class will be added based on grid[row][col] = true/false
    
    cell.classList.toggle("alive", grid[row][col]);
  });
}

initializeGrid();
