function levelsGeneration(rows=3, cols=8) {
    var level = []
        for (let row = 0; row < rows; row++) {
            let colArr = []
            for (let col = 0; col < cols; col++) {
                colArr.push(Math.floor(Math.random() * 4))
            }
            level.push(colArr)
            level.push([])
        }
    return level
    }

class arcanoidGame {
    constructor() {
        this.canvas = document.getElementById('game');
        this.context = this.canvas.getContext("2d");

        this.platform = new Platform(this.canvas)
        this.ball = new Ball(this.platform)

        this.score = 0
        this.speedMultiplier = 1
        this.levelNum = 0

        this.nextLevel()
        this.bindControls()
        this.loop()
    }

    bindControls() {
    document.addEventListener('keydown', (event) => {
        if (event.code === 'Space' && !this.ball.active) {
            this.ball.launch(this.speedMultiplier);
        }
    });
    }

    nextLevel() {
        this.levelNum ++
        this.level = levelsGeneration();
        this.bricks = [];

        const brickWidth = this.canvas.width / this.level[0].length;
        const brickHeight = 30;

        this.speedMultiplier += 0.2;

        for (let row = 0; row < this.level.length; row++) {
            for (let col = 0; col < this.level[row].length; col++) {

                const health = this.level[row][col];
                if (health < 1) continue;

                const x = col * brickWidth;
                const y = row * brickHeight + 50;

                this.bricks.push(
                    new Brick(x, y, brickWidth, brickHeight, health)
                );
            }
        }

        this.platform.x = (this.canvas.width - this.platform.width) / 2;

        this.ball.reset(this.platform);
    }

    gameOver() {
        const bestScore = localStorage.getItem("bestScore") || 0;

        if (this.score > bestScore) {
            localStorage.setItem("bestScore", this.score);
        alert(`Игра окончена! Ваш счёт: ${this.score}`);
        }
    }

    draw() {
        this.context.clearRect(0, 0, this.canvas.width, 
        this.canvas.height)

        this.context.fillStyle = 'white'
        this.context.font = "14px 'Press Start 2P'";
        this.textScore = "Счёт: " + this.score;
        this.textLevel = "Уровень: " + this.levelNum;
        this.context.fillText(this.textScore, 20, 570);
        this.context.fillText(this.textLevel, 635, 570)

        this.ball.draw(this.context)
        this.platform.draw(this.context)

        this.bricks.forEach((brick) => brick.draw(this.context))
    }

    update() {

        const result = this.ball.update(this.canvas, this.platform);

       if (result === "gameover") {
            const bestScore = localStorage.getItem("bestScore") || 0;
            if (this.score > bestScore) localStorage.setItem("bestScore", this.score);

            alert(`Игра окончена! Ваш счёт: ${this.score}`);
            setTimeout(() => location.reload(), 500);
            return;
        }

        this.platform.update(this.canvas);

        if (
            this.ball.y + this.ball.radius >= this.platform.y &&
            this.ball.y - this.ball.radius <= this.platform.y + this.platform.height &&
            this.ball.x >= this.platform.x &&
            this.ball.x <= this.platform.x + this.platform.width &&
            this.ball.vy > 0
        ) {
            const hitPoint =
                (this.ball.x - (this.platform.x + this.platform.width / 2)) /
                (this.platform.width / 2);

            const angle = hitPoint * (Math.PI / 3);

            const speed = Math.sqrt(
                this.ball.vx * this.ball.vx +
                this.ball.vy * this.ball.vy
            );

            this.ball.vx = speed * Math.sin(angle);
            this.ball.vy = -speed * Math.cos(angle);
        }

        this.bricks.forEach((brick) => {

            if (brick.destroyed) return;

            const ballLeft = this.ball.x - this.ball.radius;
            const ballRight = this.ball.x + this.ball.radius;
            const ballTop = this.ball.y - this.ball.radius;
            const ballBottom = this.ball.y + this.ball.radius;

            const brickLeft = brick.x;
            const brickRight = brick.x + brick.width;
            const brickTop = brick.y;
            const brickBottom = brick.y + brick.height;

            const collision =
                ballLeft < brickRight &&
                ballRight > brickLeft &&
                ballBottom > brickTop &&
                ballTop < brickBottom;

            if (collision) {

                brick.hit();

                if (brick.destroyed) {
                    this.score += 100;
                } else {
                    this.score += 50;
                }

                const overlapX = Math.min(
                    ballRight - brickLeft,
                    brickRight - ballLeft
                );

                const overlapY = Math.min(
                    ballBottom - brickTop,
                    brickBottom - ballTop
                );

                if (overlapX < overlapY) {
                    this.ball.vx *= -1;
                } else {
                    this.ball.vy *= -1;
                }

                this.ball.x += this.ball.vx;
                this.ball.y += this.ball.vy;
            }
        });

        const remainingBricks = this.bricks.filter(b => !b.destroyed);

        if (remainingBricks.length === 0) {
            alert('Вы прошли уровень!');
            alert(`Ваше суммарное количество очков: ${this.score}`);
            this.nextLevel();
        }
}

    loop(){
        this.update()
        this.draw()
        

        requestAnimationFrame(() => this.loop())
    }
}

