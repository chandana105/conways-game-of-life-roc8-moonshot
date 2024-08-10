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
      // Clicking on any cell will call toggleCell with the row and col indices
      gridContainer.appendChild(cell);
    }
  }
  updateGridUI();
}

// Toggle the cell's state between true and false
function toggleCell(row, col) {
  grid[row][col] = !grid[row][col]; // If grid[1][2] is false, it becomes true, and vice versa
  updateGridUI();
}

function updateGridUI() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell, index) => {
    // Convert the linear index to row and column indices
    const row = Math.floor(index / gridSize);
    const col = index % gridSize;
    // Update the class of each cell based on its state in the grid
    // The 'alive' class is added if grid[row][col] is true, removed if false
    cell.classList.toggle("alive", grid[row][col]);
  });
}

// Get the neighbors of a cell
function getNeighbors(row, col) {
  //eg:- [2,2]
  const neighbors = [];
  for (let r = row - 1; r <= row + 1; r++) {
    for (let c = col - 1; c <= col + 1; c++) {
      // r = 1; r<= 3 ; r++
      // c = 1; c<= 3 ; c++
      if (
        r >= 0 && //r= 1 >=0
        r < gridSize && // 1 < 30
        c >= 0 && // c = 1 >=0
        c < gridSize && // 1 <30
        (r !== row || c !== col) // 1 !== 2 || 1 || 2
      ) {
        // all above things matched then here
        neighbors.push(grid[r][c]); // neighbours = [grid[r][c]]
        //  negihbours = [(1,1)]
      }
    }
  }
  return neighbors;
  //   neighbours = [(1,1) , (1,2), (1,3), (2,1) , (2,3) , (3,1), (3,2) , (3,3)]
  //   [true, false, true, false, false, false, false, false]
}

// Compute the next generation
// compute the next state of the grid based on the current state and the rules of Conway's Game of Life.
function computeNextGeneration() {
  const newGrid = Array.from({ length: gridSize }, () =>
    Array(gridSize).fill(false)
  );

  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const neighbors = getNeighbors(row, col);
      //  neighbours = getNeighbours(2,2)
      const liveNeighbors = neighbors.filter((n) => n).length;
      //   neighbors.filter((n) => n) = [true, true]
      // liveNeighbours = [true, true].length = 2

      if (grid[row][col]) {
        newGrid[row][col] = liveNeighbors === 2 || liveNeighbors === 3;
      } else {
        newGrid[row][col] = liveNeighbors === 3;
      }
      //   if (grid[2][2]) {
      //     newGrid[2][2] = liveNeighbors === 2 || liveNeighbors === 3;
      //   }
    }
  }

  grid = newGrid;
  //   grid = in newgrid at 2,2 cell = alive as liveNeighbours is equal to 2
  updateGridUI();
}

initializeGrid();



// Underpopulation: If a live cell has fewer than 2 live neighbors, it dies. This is implicitly handled because if liveNeighbors is not 2 or 3, the cell will be set to false (dead) in newGrid.
// Overpopulation: If a live cell has 4 or more neighbors, it dies. This is also implicitly handled because if liveNeighbors is not 2 or 3, the cell will be set to false.
// Reproduction: A dead cell becomes alive if it has exactly 3 live neighbors.
