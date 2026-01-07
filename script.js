let completedGoals = 0;
const unlockAt = 3;

document.querySelectorAll('.goal-header').forEach(header => {
  header.addEventListener('click', () => {
    header.parentElement.classList.toggle('open');
  });
});

document.querySelectorAll('.complete-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.disabled = true;
    completedGoals++;

    if (completedGoals === unlockAt) {
      document.getElementById('roulette-section').classList.remove('hidden');
    }
  });
});

const prizes = [
  "Café juntos ☕",
  "Detalle sorpresa 🎁",
  "Salida especial 🌙",
  "Carta escrita a mano 💌"
];

document.getElementById('spin').addEventListener('click', () => {
  const roulette = document.getElementById('roulette');
  roulette.style.transform = `rotate(${Math.random() * 360 + 720}deg)`;

  setTimeout(() => {
    const prize = prizes[Math.floor(Math.random() * prizes.length)];
    document.getElementById('result').innerText = prize;
  }, 2000);
});
