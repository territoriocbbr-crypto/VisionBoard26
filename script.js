console.log("script cargado");

const goals = document.querySelectorAll(".goal");
const rouletteWrapper = document.getElementById("roulette-wrapper");

let completed = 0;
const totalGoals = goals.length;

// Metas tipo pegatina
goals.forEach(goal => {
  goal.addEventListener("click", () => {
    if (!goal.classList.contains("completed")) {
      goal.classList.add("completed");
      completed++;

      if (completed === totalGoals) {
        rouletteWrapper.classList.remove("hidden");
      }
    }
  });
});

/* RULETA */
const canvas = document.getElementById("roulette");
const ctx = canvas.getContext("2d");

const prizes = [
  "🌸 Detalle sorpresa",
  "🎬 Noche de película",
  "☕ Café especial",
  "🌻 Flores"
];

function drawRoulette() {
  const angle = (2 * Math.PI) / prizes.length;

  prizes.forEach((prize, i) => {
    ctx.beginPath();
    ctx.moveTo(150,150);
    ctx.fillStyle = i % 2 === 0 ? "#fdf6ec" : "#f2c94c";
    ctx.arc(150,150,140, angle*i, angle*(i+1));
    ctx.fill();

    ctx.save();
    ctx.translate(150,150);
    ctx.rotate(angle*i + angle/2);
    ctx.fillStyle = "#333";
    ctx.font = "14px sans-serif";
    ctx.fillText(prize, 60, 5);
    ctx.restore();
  });
}

drawRoulette();

document.getElementById("spin-btn").addEventListener("click", () => {
  alert("🎉 Premio desbloqueado");
});
