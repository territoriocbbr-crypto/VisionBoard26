// ===== CONFIGURACIÓN =====
const ROULETTE_MILESTONES = [300, 600, 900, 960];
const PRIZES = [
  "Café juntos ☕",
  "Detalle sorpresa 🎁",
  "Salida especial 🌙",
  "Carta escrita a mano 💌"
];

// ===== ESTADO =====
let state = {
  points: 0,
  completedGoals: {},
  rouletteSpins: []
};

// ===== CARGAR ESTADO =====
if (localStorage.getItem("visionBoardState")) {
  state = JSON.parse(localStorage.getItem("visionBoardState"));
}

// ===== GUARDAR ESTADO =====
function saveState() {
  localStorage.setItem("visionBoardState", JSON.stringify(state));
}

// ===== INICIALIZAR METAS =====
document.querySelectorAll(".goal").forEach(goal => {
  const id = goal.dataset.id;
  const points = parseInt(goal.dataset.points);
  const content = goal.querySelector(".goal-content");
  const btn = goal.querySelector(".complete-btn");

  // Si ya fue completada
  if (state.completedGoals[id]) {
    goal.classList.add("open");
    content.style.maxHeight = "200px";
    btn.disabled = true;
  } else {
    content.style.maxHeight = "0";
  }

  btn.addEventListener("click", () => {
    if (state.completedGoals[id]) return;

    // Marcar como cumplida
    state.completedGoals[id] = true;
    state.points += points;

    goal.classList.add("open");
    btn.disabled = true;

    saveState();
    checkRoulette();
  });
});

// ===== RULETA =====
const rouletteSection = document.getElementById("roulette-section");
const roulette = document.getElementById("roulette");
const spinBtn = document.getElementById("spin");
const result = document.getElementById("result");

function checkRoulette() {
  const nextMilestone = ROULETTE_MILESTONES.find(
    m => state.points >= m && !state.rouletteSpins.includes(m)
  );

  if (nextMilestone) {
    rouletteSection.classList.remove("hidden");
    rouletteSection.dataset.milestone = nextMilestone;
  } else {
    rouletteSection.classList.add("hidden");
  }
}

spinBtn.addEventListener("click", () => {
  const milestone = parseInt(rouletteSection.dataset.milestone);
  if (!milestone) return;

  roulette.style.transform = `rotate(${Math.random() * 360 + 720}deg)`;

  setTimeout(() => {
    const prize = PRIZES[Math.floor(Math.random() * PRIZES.length)];
    result.innerText = prize;

    state.rouletteSpins.push(milestone);
    saveState();

    rouletteSection.dataset.milestone = "";
    setTimeout(() => {
      rouletteSection.classList.add("hidden");
      result.innerText = "";
    }, 2500);
  }, 2000);
});

// ===== INICIO =====
checkRoulette();
