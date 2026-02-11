const startBtn = document.getElementById('startBtn')
const score = document.getElementById('score')
const canvas = document.getElementById('game')
const menu = document.getElementById('menu')

canvas.style.display = 'none'

var bestScore = localStorage.getItem('Score') || 0
score.textContent = `Ваш предыдущий рекорд: ${bestScore}`

startBtn.addEventListener('click', function(event) {
    menu.style.display = "none";
    canvas.style.display = "block";

    const startGame = new arcanoidGame();
})