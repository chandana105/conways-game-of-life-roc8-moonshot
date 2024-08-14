const gridSize = 30;
let grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(false));
let intervalId = null;

const gridContainer = document.getElementById("grid");

// Initialize the grid UI
function initializeGrid() {
  gridContainer.innerHTML = "";
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.addEventListener("click", () => toggleCell(row, col));
      // Clicking on any cell will call toggleCell with the row and col indices
      gridContainer.appendChild(cell);
    }
  }
  updateGridUI();
}

// Toggle the cell's state between true and false
function toggleCell(row, col) {
  grid[row][col] = !grid[row][col];
  updateGridUI();
}

function updateGridUI() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell, index) => {
    const row = Math.floor(index / gridSize);
    const col = index % gridSize;
    // Update the class of each cell based on its state in the grid
    // The 'alive' class is added if grid[row][col] is true, removed if false
    cell.classList.toggle("alive", grid[row][col]);
  });
}

// Get the neighbors of a cell
function getNeighbors(row, col) {
  const neighbors = [];
  for (let r = row - 1; r <= row + 1; r++) {
    for (let c = col - 1; c <= col + 1; c++) {
      if (
        r >= 0 &&
        r < gridSize &&
        c >= 0 &&
        c < gridSize &&
        (r !== row || c !== col)
      ) {
        neighbors.push(grid[r][c]);
      }
    }
  }
  return neighbors;
}

// compute the next state of the grid based on the current state and the rules of Conway's Game of Life.
function computeNextGeneration() {
  const newGrid = Array.from({ length: gridSize }, () =>
    Array(gridSize).fill(false)
  );

  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const neighbors = getNeighbors(row, col);
      const liveNeighbors = neighbors.filter((n) => n).length;

      if (grid[row][col]) {
        newGrid[row][col] = liveNeighbors === 2 || liveNeighbors === 3;
      } else {
        newGrid[row][col] = liveNeighbors === 3;
      }
    }
  }

  grid = newGrid;
  updateGridUI();
}

// Start or stop the game
function toggleGame() {
  if (intervalId) {
    // If intervalId is set: The function will stop the game by clearing the interval, updating the button text to "Start", and setting intervalId to null.
    clearInterval(intervalId);
    intervalId = null;
    document.getElementById("startStop").textContent = "Start";
  } else {
    // If intervalId is not set: The function will start the game by setting up a new interval to call computeNextGeneration every 500 milliseconds, updating the button text to "Stop", and storing the interval ID in intervalId.
    intervalId = setInterval(computeNextGeneration, 500);
    document.getElementById("startStop").textContent = "Stop";
  }
}

// Randomize the grid
function randomizeGrid() {
  grid = Array.from({ length: gridSize }, () =>
    Array.from({ length: gridSize }, () => Math.random() < 0.3)
  );

  updateGridUI();
}

document.getElementById("startStop").addEventListener("click", toggleGame);
document.getElementById("randomize").addEventListener("click", randomizeGrid);

initializeGrid();
