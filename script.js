/***********************
  CONFIGURACIÓN GENERAL
************************/
const POINTS_MILESTONES = [300, 600, 900, 960];
const PRIZES = [
  "💌 Una cita sorpresa",
  "🎁 Un regalo especial",
  "🌻 Un día solo para ti",
  "✨ Un deseo concedido"
];

/***********************
  ESTADO GUARDADO
************************/
let openedNotes = JSON.parse(localStorage.getItem("openedNotes")) || [];
let totalPoints = JSON.parse(localStorage.getItem("totalPoints")) || 0;
let unlockedMilestones = JSON.parse(localStorage.getItem("milestones")) || [];
let savedPrizes = JSON.parse(localStorage.getItem("savedPrizes")) || [];

/***********************
  METAS (PAPELITOS)
************************/
document.querySelectorAll(".note").forEach(note => {
  const id = note.dataset.id;
  const points = parseInt(note.dataset.points);

  // Si ya estaba abierta
  if (openedNotes.includes(id)) {
    note.classList.add("open");
  }

  note.addEventListener("click", () => {
    if (openedNotes.includes(id)) return;

    note.classList.add("open");
    openedNotes.push(id);
    totalPoints += points;

    localStorage.setItem("openedNotes", JSON.stringify(openedNotes));
    localStorage.setItem("totalPoints", totalPoints);

    checkMilestones();
  });
});

/***********************
  HITOS Y RULETA
************************/
function checkMilestones() {
  POINTS_MILESTONES.forEach(milestone => {
    if (
      totalPoints >= milestone &&
      !unlockedMilestones.includes(milestone)
    ) {
      unlockedMilestones.push(milestone);
      localStorage.setItem("milestones", JSON.stringify(unlockedMilestones));
      showRoulette();
    }
  });
}

function showRoulette() {
  document.getElementById("roulette-wrapper").classList.remove("hidden");
}

/***********************
  RULETA
************************/
let spinning = false;

document.getElementById("spin").addEventListener("click", () => {
  if (spinning) return;
  spinning = true;

  const wheel = document.querySelector(".wheel");
  const randomTurns = Math.floor(Math.random() * 4) + 4;
  const randomDegree = Math.floor(Math.random() * 360);
  const rotation = randomTurns * 360 + randomDegree;

  wheel.style.transform = `rotate(${rotation}deg)`;

  setTimeout(() => {
    const prizeIndex = Math.floor(randomDegree / 90);
    const prize = PRIZES[prizeIndex];

    savePrize(prize);
    spinning = false;
  }, 2600);
});

/***********************
  CARTA DEL PREMIO
************************/
function savePrize(prize) {
  savedPrizes.push(prize);
  localStorage.setItem("savedPrizes", JSON.stringify(savedPrizes));
  renderPrizes();
}

function renderPrizes() {
  const container = document.getElementById("card-container");
  container.innerHTML = "";

  savedPrizes.forEach(prize => {
    const card = document.createElement("div");
    card.className = "prize-card";
    card.innerHTML = `
      <strong>Premio desbloqueado</strong><br>
      ${prize}
    `;
    container.appendChild(card);
  });
}

renderPrizes();

/***********************
  RESET SECRETO
************************/
document.getElementById("reset").addEventListener("click", () => {
  if (!confirm("¿Reiniciar todo? Solo para pruebas 😉")) return;

  localStorage.clear();
  location.reload();
});
