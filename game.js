function levelsGeneration(rows=3, cols=8) {
    var level = []
        for (let row = 0; row < rows; row++) {
            let colArr = []
            for (let col = 0; col < cols; col++) {
                colArr.push(Math.floor(Math.random() * 4))
            }
            level.push(colArr)
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

        this.nextLevel()
        this.bindControls()
        this.loop()
    }

    bindControls() {
    document.addEventListener('keydown', (event) => {
        if (event.code === 'Space' && !this.ball.active) {
            this.ball.launch();
        }
    });
    }

    nextLevel() {
        this.level = levelsGeneration();
        this.bricks = [];

        const brickWidth = this.canvas.width / this.level[0].length;
        const brickHeight = 30;

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

        this.ball.vx *= 1.1;
        this.ball.vy *= 1.1;
    }

    gameOver() {
        alert(`Игра окончена! Ваш счёт: ${this.score}`);

        const bestScore = localStorage.getItem("bestScore") || 0;

        if (this.score > bestScore) {
            localStorage.setItem("bestScore", this.score);
        }

        location.reload();
    }

    draw() {

        this.context.clearRect(0, 0, this.canvas.width, 
             this.canvas.height)
        this.ball.draw(this.context)
        this.platform.draw(this.context)

        this.bricks.forEach((brick) => brick.draw(this.context))
    }

    update() {
        const result = this.ball.update(this.canvas, this.platform);

        if (result === "gameover") {
            this.gameOver();
        }

        this.platform.update(this.canvas)

        if  (this.ball.y + this.ball.radius >= this.platform.y &&
            this.ball.y - this.ball.radius <= this.platform.y + this.platform.height &&
            this.ball.x >= this.platform.x &&
            this.ball.x <= this.platform.x + this.platform.width &&
            this.ball.vy > 0)
         {
            this.ball.vy *= -1;
            
            const hitPoint = this.ball.x - (this.platform.x + this.platform.width / 2);
            this.ball.vx = hitPoint * 0.1;
        }

        this.bricks.forEach((brick) => {
            if (brick.destroyed) return 
            
            const ballLeft = this.ball.x - this.ball.radius;
            const ballRight = this.ball.x + this.ball.radius;
            const ballTop = this.ball.y - this.ball.radius;
            const ballBottom = this.ball.y + this.ball.radius;

            const brickLeft = brick.x;
            const brickRight = brick.x + brick.width;
            const brickTop = brick.y;
            const brickBottom = brick.y + brick.height;

            const colission = ballLeft < brickRight &&
            ballRight > brickLeft &&
            ballBottom > brickTop &&
            ballTop < brickBottom

            if (colission) {
                brick.hit()
                this.score += 50
                this.ball.vy *= -1
                
                if (brick.destroyed) {
                    this.score += 100
                }
            }   
        }
    )
        const remainingBricks = this.bricks.filter(b => !b.destroyed);

        if (remainingBricks.length === 0) {
            alert('Вы прошли уровень!')
            alert(`Ваше суммарное количество очков: ${this.score}`)
            this.nextLevel();
        }
    }

    loop(){
        this.update()
        this.draw()
        

        requestAnimationFrame(() => this.loop())
    }
}

