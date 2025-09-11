const gameContainer = document.getElementById("game-container"); 
const rows = 10;
const cols = 10; 
const bombCount = 14; 

function createBoard() {
  const cells = []; 
  for (let i = 0; i < rows * cols; i++) {
    const cell = document.createElement("div"); 
    cell.classList.add("cell"); 
    cell.dataset.id = i; 
    gameContainer.appendChild(cell);
    cells.push(cell);
  }

  let bombsPlaced = 0; 
  while (bombsPlaced < bombCount) {
    const randomIndex = Math.floor(Math.random() * cells.length); 
    if (!cells[randomIndex].classList.contains("bomb")) {
      cells[randomIndex].classList.add("bomb"); 
      bombsPlaced++; 
    }
  }

  return cells; 
}

function handleCellClick(event) {
  const cell = event.target; 
  if (cell.classList.contains("revealed")) return; 

  cell.classList.add("revealed"); 

  if (cell.classList.contains("bomb")) {
    cell.innerHTML = "💣";
    revealAllBombs(); 
    alert("Game Over!", setTimeout(function() { location.reload(); },7000));
    
  } else {
    const adjacentBombs = getAdjacentBombs(cell.dataset.id);
    cell.innerHTML = adjacentBombs || ""; 
  }
}

function revealAllBombs() {
  cells.forEach((cell) => {
    if (cell.classList.contains("bomb")) {
      cell.classList.add("revealed");
      cell.innerHTML = "💣";
    }
  });
}

function getAdjacentBombs(index) {
  const row = Math.floor(index / cols); 
  const col = index % cols; 
  let count = 0;

  
  for (let r = row - 1; r <= row + 1; r++) {
    for (let c = col - 1; c <= col + 1; c++) {
      if (r >= 0 && r < rows && c >= 0 && c < cols) {
        const neighborIndex = r * cols + c; 
        if (cells[neighborIndex].classList.contains("bomb")) {
          count++; 
        }
      }
    }
  }

  return count; 
}

const cells = createBoard(); // Cria o tabuleiro
cells.forEach((cell) => cell.addEventListener("click", handleCellClick)); // Adiciona o evento de clique em cada célula
