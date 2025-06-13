function isMobile() {
  const userAgentMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(
    navigator.userAgent
  );
  const screenSizeMobile = window.innerWidth <= 768;
  return userAgentMobile || screenSizeMobile;
}

const textElement = document.getElementById("pause-text");

if (isMobile()) {
  textElement.innerHTML = "Presiona ⏸️ para pausar/reanudar";
} else {
  textElement.innerHTML = "Presiona ESPACIO para pausar/reanudar";
}
// PWA Variables
let deferredPrompt;
let isInstalled = false;

// Game Variables
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreElement = document.getElementById("score");
const highScoreElement = document.getElementById("highScore");
const gameOverElement = document.getElementById("gameOver");
const finalScoreElement = document.getElementById("finalScore");
const installBtn = document.getElementById("installBtn");
const pwaStatus = document.getElementById("pwaStatus");

// PWA Functions
function initializePWA() {
  // Registrar Service Worker
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", async () => {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
        });
        console.log(
          "Service Worker registrado exitosamente:",
          registration.scope
        );

        // Verificar actualizaciones
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          newWorker.addEventListener("statechange", () => {
            if (
              newWorker.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              showUpdateNotification();
            }
          });
        });
      } catch (error) {
        console.error("Error al registrar Service Worker:", error);
      }
    });
  }

  // Manejar evento beforeinstallprompt
  window.addEventListener("beforeinstallprompt", (e) => {
    console.log("beforeinstallprompt evento disparado");
    e.preventDefault();
    deferredPrompt = e;
    showInstallButton();
  });

  // Verificar si ya está instalado
  window.addEventListener("appinstalled", (e) => {
    console.log("PWA instalada exitosamente");
    hideInstallButton();
    showPWAStatus("🚀 App instalada correctamente", "online");
    isInstalled = true;
  });

  // Detectar si es modo standalone (instalada)
  if (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone
  ) {
    isInstalled = true;
    hideInstallButton();
  }

  // Monitorear estado de conexión
  window.addEventListener("online", () => {
    showPWAStatus("🌐 En línea", "online");
  });

  window.addEventListener("offline", () => {
    showPWAStatus("📴 Sin conexión", "offline");
  });

  // Mostrar estado inicial
  showPWAStatus(
    navigator.onLine ? "🌐 En línea" : "📴 Sin conexión",
    navigator.onLine ? "online" : "offline"
  );
}

function showInstallButton() {
  installBtn.classList.add("show");
}

function hideInstallButton() {
  installBtn.classList.remove("show");
}

function showPWAStatus(message, type) {
  pwaStatus.textContent = message;
  pwaStatus.className = `pwa-status ${type}`;
  pwaStatus.style.display = "block";

  setTimeout(() => {
    pwaStatus.style.display = "none";
  }, 3000);
}

function showUpdateNotification() {
  if (confirm("¡Nueva versión disponible! ¿Actualizar ahora?")) {
    window.location.reload();
  }
}

// Install button click handler
installBtn.addEventListener("click", async () => {
  if (!deferredPrompt) {
    showPWAStatus("⚠️ La instalación no está disponible", "offline");
    return;
  }

  const result = await deferredPrompt.prompt();
  console.log("Resultado de instalación:", result);

  if (result.outcome === "accepted") {
    showPWAStatus("⏳ Instalando aplicación...", "online");
  } else {
    showPWAStatus("❌ Instalación cancelada", "offline");
  }

  deferredPrompt = null;
  hideInstallButton();
});

// Inicializar PWA
initializePWA();

// Configuración del juego
const gridSize = 20;
let canvasSize = Math.min(
  window.innerWidth * 0.9,
  window.innerHeight * 0.6,
  400
);

// Ajustar canvas según el dispositivo
function resizeCanvas() {
  const isMobile = window.innerWidth <= 768;
  if (isMobile) {
    canvasSize = Math.min(
      window.innerWidth * 0.95,
      window.innerHeight * 0.5,
      350
    );
  } else {
    canvasSize = 400;
  }
  canvas.width = canvasSize;
  canvas.height = canvasSize;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const tileCount = Math.floor(canvas.width / gridSize);

let snake = [{ x: 10, y: 10 }];
let food = {};
let dx = 0;
let dy = 0;
let score = 0;
let highScore = parseInt(localStorage.getItem("snakeHighScore")) || 0;
let gameRunning = true;
let gamePaused = false;

// Actualizar récord en pantalla
highScoreElement.textContent = highScore;

// Generar comida aleatoria
function randomFood() {
  food = {
    x: Math.floor(Math.random() * tileCount),
    y: Math.floor(Math.random() * tileCount),
  };
}

// Dibujar elementos del juego
function drawGame() {
  // Limpiar canvas
  ctx.fillStyle = "rgba(20, 20, 40, 0.3)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Dibujar culebra
  ctx.fillStyle = "#4ecdc4";
  snake.forEach((segment, index) => {
    if (index === 0) {
      // Cabeza de la culebra con gradiente
      const gradient = ctx.createRadialGradient(
        segment.x * gridSize + gridSize / 2,
        segment.y * gridSize + gridSize / 2,
        0,
        segment.x * gridSize + gridSize / 2,
        segment.y * gridSize + gridSize / 2,
        gridSize / 2
      );
      gradient.addColorStop(0, "#6c5ce7");
      gradient.addColorStop(1, "#a29bfe");
      ctx.fillStyle = gradient;
    } else {
      ctx.fillStyle = "#74b9ff";
    }

    ctx.fillRect(
      segment.x * gridSize + 2,
      segment.y * gridSize + 2,
      gridSize - 4,
      gridSize - 4
    );
    ctx.strokeStyle = "#0984e3";
    ctx.lineWidth = 2;
    ctx.strokeRect(
      segment.x * gridSize + 2,
      segment.y * gridSize + 2,
      gridSize - 4,
      gridSize - 4
    );
  });

  // Dibujar comida con animación
  const time = Date.now() * 0.005;
  const foodScale = 1 + Math.sin(time) * 0.1;
  const foodSize = (gridSize - 4) * foodScale;
  const foodOffset = (gridSize - foodSize) / 2;

  ctx.fillStyle = "#ff6b6b";
  ctx.beginPath();
  ctx.arc(
    food.x * gridSize + gridSize / 2,
    food.y * gridSize + gridSize / 2,
    foodSize / 2,
    0,
    2 * Math.PI
  );
  ctx.fill();

  ctx.fillStyle = "#ff4757";
  ctx.beginPath();
  ctx.arc(
    food.x * gridSize + gridSize / 2,
    food.y * gridSize + gridSize / 2,
    (foodSize / 2) * 0.6,
    0,
    2 * Math.PI
  );
  ctx.fill();
}

// Actualizar lógica del juego
function updateGame() {
  if (!gameRunning || gamePaused) return;

  // Solo mover si hay dirección establecida
  if (dx === 0 && dy === 0) return;

  const head = { x: snake[0].x + dx, y: snake[0].y + dy };

  // Verificar colisiones con paredes
  if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
    gameOver();
    return;
  }

  // Verificar colisiones con el cuerpo
  for (let segment of snake) {
    if (head.x === segment.x && head.y === segment.y) {
      gameOver();
      return;
    }
  }

  snake.unshift(head);

  // Verificar si comió la fruta
  if (head.x === food.x && head.y === food.y) {
    score += 10;
    scoreElement.textContent = score;
    scoreElement.parentElement.classList.add("pulse");
    setTimeout(() => {
      scoreElement.parentElement.classList.remove("pulse");
    }, 300);

    randomFood();

    // Verificar nuevo récord
    if (score > highScore) {
      highScore = score;
      highScoreElement.textContent = highScore;
      localStorage.setItem("snakeHighScore", highScore);
    }
  } else {
    snake.pop();
  }
}

// Terminar juego
function gameOver() {
  gameRunning = false;
  finalScoreElement.textContent = score;
  gameOverElement.style.display = "block";
}

// Reiniciar juego
function restartGame() {
  snake = [{ x: 10, y: 10 }];
  dx = 0;
  dy = 0;
  score = 0;
  scoreElement.textContent = score;
  gameRunning = true;
  gamePaused = false;
  gameOverElement.style.display = "none";
  randomFood();
}

// Controles del teclado
document.addEventListener("keydown", (e) => {
  if (!gameRunning && e.code !== "Space") return;

  switch (e.code) {
    case "ArrowUp":
      if (dy !== 1) {
        dx = 0;
        dy = -1;
      }
      break;
    case "ArrowDown":
      if (dy !== -1) {
        dx = 0;
        dy = 1;
      }
      break;
    case "ArrowLeft":
      if (dx !== 1) {
        dx = -1;
        dy = 0;
      }
      break;
    case "ArrowRight":
      if (dx !== -1) {
        dx = 1;
        dy = 0;
      }
      break;
    case "Space":
      e.preventDefault();
      if (gameRunning) {
        gamePaused = !gamePaused;
      }
      break;
  }
});

// Controles táctiles para móviles
document.querySelectorAll(".control-btn").forEach((btn) => {
  btn.addEventListener("touchstart", (e) => {
    e.preventDefault();

    const direction = btn.dataset.direction;
    const action = btn.dataset.action;

    if (action === "pause") {
      if (gameRunning) {
        gamePaused = !gamePaused;
      }
      return;
    }

    if (!gameRunning) return;

    switch (direction) {
      case "up":
        if (dy !== 1) {
          dx = 0;
          dy = -1;
        }
        break;
      case "down":
        if (dy !== -1) {
          dx = 0;
          dy = 1;
        }
        break;
      case "left":
        if (dx !== 1) {
          dx = -1;
          dy = 0;
        }
        break;
      case "right":
        if (dx !== -1) {
          dx = 1;
          dy = 0;
        }
        break;
    }
  });

  // También agregar soporte para clicks en escritorio
  btn.addEventListener("click", (e) => {
    e.preventDefault();

    const direction = btn.dataset.direction;
    const action = btn.dataset.action;

    if (action === "pause") {
      if (gameRunning) {
        gamePaused = !gamePaused;
      }
      return;
    }

    if (!gameRunning) return;

    switch (direction) {
      case "up":
        if (dy !== 1) {
          dx = 0;
          dy = -1;
        }
        break;
      case "down":
        if (dy !== -1) {
          dx = 0;
          dy = 1;
        }
        break;
      case "left":
        if (dx !== 1) {
          dx = -1;
          dy = 0;
        }
        break;
      case "right":
        if (dx !== -1) {
          dx = 1;
          dy = 0;
        }
        break;
    }
  });
});

// Bucle principal del juego
function gameLoop() {
  updateGame();
  drawGame();
}

// Inicializar juego
randomFood();
setInterval(gameLoop, 150);

// Dibujar el estado inicial
drawGame();
