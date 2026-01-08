/* =========================================
   CONFIGURACIÓN GENERAL
========================================= */

// puntos necesarios para cada hito de ruleta
const HITOS = [300, 600, 900, 960];

// premios de la ruleta (pueden repetirse)
const PREMIOS = [
  "Cena especial 🍽️",
  "Plan sorpresa 🎁",
  "Salida improvisada 🌙",
  "Un detalle inesperado 💙"
];

// clave de almacenamiento
const STORAGE_KEY = "visionBoardProgress";

/* =========================================
   ESTADO INICIAL
========================================= */

let state = {
  openedGoals: [],   // ids de metas abiertas
  points: 0,
  spinsUsed: []      // hitos ya usados
};

/* =========================================
   CARGAR / GUARDAR ESTADO
========================================= */

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    state = JSON.parse(saved);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

/* =========================================
   INICIALIZACIÓN
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  loadState();
  restoreOpenedGoals();
  checkHitos();
  setupGoals();
  setupSecretReset();
});

/* =========================================
   METAS
========================================= */

function setupGoals() {
  const goals = document.querySelectorAll(".goal");

  goals.forEach(goal => {
    const id = goal.dataset.id;
    const points = parseInt(goal.dataset.points, 10);

    // si ya estaba abierta
    if (state.openedGoals.includes(id)) {
      goal.classList.add("open");
    }

    // click para marcar como cumplida
    goal.addEventListener("click", () => {
      if (state.openedGoals.includes(id)) return;

      openGoal(goal, id, points);
    });
  });
}

function openGoal(goal, id, points) {
  goal.classList.add("open");
  state.openedGoals.push(id);
  state.points += points;

  saveState();
  checkHitos();
}

function restoreOpenedGoals() {
  const goals = document.querySelectorAll(".goal");

  goals.forEach(goal => {
    const id = goal.dataset.id;
    if (state.openedGoals.includes(id)) {
      goal.classList.add("open");
    }
  });
}

/* =========================================
   HITOS Y RULETA
========================================= */

function checkHitos() {
  HITOS.forEach(hito => {
    if (
      state.points >= hito &&
      !state.spinsUsed.includes(hito)
    ) {
      state.spinsUsed.push(hito);
      saveState();
      showRoulette(hito);
    }
  });
}

function showRoulette(hito) {
  const overlay = document.createElement("div");
  overlay.className = "roulette-overlay";

  const box = document.createElement("div");
  box.className = "roulette-box";

  const title = document.createElement("h2");
  title.textContent = "Premio desbloqueado 🎉";

  const info = document.createElement("p");
  info.textContent = `Alcanzaste ${hito} puntos. Gira la ruleta.`;

  const button = document.createElement("button");
  button.textContent = "Girar";

  const result = document.createElement("p");
  result.className = "roulette-result";

  button.addEventListener("click", () => {
    const premio =
      PREMIOS[Math.floor(Math.random() * PREMIOS.length)];
    result.textContent = premio;
    button.disabled = true;
  });

  box.appendChild(title);
  box.appendChild(info);
  box.appendChild(button);
  box.appendChild(result);
  overlay.appendChild(box);
  document.body.appendChild(overlay);

  overlay.addEventListener("click", e => {
    if (e.target === overlay) {
      overlay.remove();
    }
  });
}

/* =========================================
   BOTÓN SECRETO (RESET)
   Mantener presionado el título 5 segundos
========================================= */

function setupSecretReset() {
  const secret = document.getElementById("secret-reset");
  let pressTimer;

  secret.addEventListener("touchstart", startPress);
  secret.addEventListener("mousedown", startPress);

  secret.addEventListener("touchend", cancelPress);
  secret.addEventListener("mouseup", cancelPress);
  secret.addEventListener("mouseleave", cancelPress);

  function startPress() {
    pressTimer = setTimeout(() => {
      const confirmReset = confirm(
        "Reiniciar todo el progreso (solo pruebas)?"
      );
      if (confirmReset) {
        localStorage.removeItem(STORAGE_KEY);
        location.reload();
      }
    }, 5000);
  }

  function cancelPress() {
    clearTimeout(pressTimer);
  }
}
