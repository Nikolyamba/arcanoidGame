const startBtn = document.getElementById('startBtn');
const score = document.getElementById('score');
const canvas = document.getElementById('game');
const menu = document.getElementById('menu');

canvas.style.display = 'none';

const bestScore = localStorage.getItem('bestScore') || 0;
score.textContent = `Ваш предыдущий рекорд: ${bestScore}`;

startBtn.addEventListener('click', () => {
    menu.style.display = "none";
    canvas.style.display = "block";

    new arcanoidGame();
});
