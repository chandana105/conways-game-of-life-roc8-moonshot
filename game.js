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
      gridContainer.appendChild(cell);
    }
  }
}

initializeGrid();
