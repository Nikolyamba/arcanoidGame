import levelsGeneration from "./features/level_generate";

class arcanoidGame {
    constructor() {
        this.canvas = document.getElementById('game');
        this.context = this.canvas.getContext("2d");

        this.ball = new Ball()
        this.platform = new Platform(this.canvas)

        for (let row = 0; row < this.level.length; row++) {
            for (let col = 0; col < this.level[row].length; col++) {

                const health = this.level[row][col]

                if (health < 1) continue  // если кирпича нет — пропускаем

                const x = col * brickWidth
                const y = row * brickHeight + 50

                this.bricks.push(
                    new Brick(x, y, brickWidth, brickHeight, health)
                )
             }
        }

        this.loop()
    }

    draw() {

        this.context.clearRect(0, 0, this.canvas.width, 
             this.canvas.height)
        this.ball.draw(this.context)
        this.platform.draw(this.context)
    }

    update() {
        this.ball.update(this.canvas)
        this.platform.update(this.canvas)

        if (this.ball.y + this.ball.radius === this.platform.y &&
            this.ball.x >= this.platform.x && 
            this.ball.x <= this.platform.x + this.platform.width
        ) {
            this.ball.vy *= -1
        }

    }

    loop(){
        this.update()
        this.draw()
        

        requestAnimationFrame(() => this.loop())
    }
}

const startGame = new arcanoidGame();