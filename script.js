//your code here
document.addEventListener("DOMContentLoaded", () => {
  const gameContainer = document.getElementById("gameContainer");
  const scoreBoard = document.createElement("div");
  scoreBoard.className = "scoreBoard";
  scoreBoard.innerText = "Score: 0";
  gameContainer.appendChild(scoreBoard);

  const GRID_SIZE = 40;
  const PIXEL_SIZE = 10;
  const SNAKE_SPEED = 100; // in milliseconds
  let snake = [{ x: 1, y: 20 }];
  let direction = "right";
  let food = null;
  let score = 0;
  let gameInterval = null;

  function createPixel(x, y, className) {
    const pixel = document.createElement("div");
    pixel.id = `pixel${y * GRID_SIZE + x}`;
    pixel.className = `pixel ${className}`;
    pixel.style.gridColumn = x + 1;
    pixel.style.gridRow = y + 1;
    gameContainer.appendChild(pixel);
  }

  function createFood() {
    const x = Math.floor(Math.random() * GRID_SIZE);
    const y = Math.floor(Math.random() * GRID_SIZE);
    food = { x, y };
    createPixel(x, y, "food");
  }

  function updateScore() {
    scoreBoard.innerText = `Score: ${score}`;
  }

  function moveSnake() {
    const head = snake[0];
    let newHead = null;

    switch (direction) {
      case "right":
        newHead = { x: head.x + 1, y: head.y };
        break;
      case "left":
        newHead = { x: head.x - 1, y: head.y };
        break;
      case "up":
        newHead = { x: head.x, y: head.y - 1 };
        break;
      case "down":
        newHead = { x: head.x, y: head.y + 1 };
        break;
    }

    if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
      clearInterval(gameInterval);
      alert("Game Over!");
      return;
    }

    snake.unshift(newHead);

    const tail = snake.pop();
    document.getElementById(`pixel${tail.y * GRID_SIZE + tail.x}`).remove();

    const headPixel = document.getElementById(`pixel${newHead.y * GRID_SIZE + newHead.x}`);

    if (headPixel.classList.contains("food")) {
      headPixel.classList.remove("food");
      score += 10;
      updateScore();
      createFood();
    }

    createPixel(newHead.x, newHead.y, "snakeBodyPixel");
  }

  function startGame() {
    createFood();
    gameInterval = setInterval(moveSnake, SNAKE_SPEED);
  }

  document.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "ArrowRight":
        if (direction !== "left") direction = "right";
        break;
      case "ArrowLeft":
        if (direction !== "right") direction = "left";
        break;
      case "ArrowUp":
        if (direction !== "down") direction = "up";
        break;
      case "ArrowDown":
        if (direction !== "up") direction = "down";
        break;
    }
  });

  startGame();
});
