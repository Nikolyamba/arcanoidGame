class Ball {
    constructor(platform) {
        this.radius = 10;
        this.x = platform.x + (platform.width / 2);
        this.y = platform.y - this.radius;
        this.vx = 3;
        this.vy = -3;
        this.active = false;
    }

    reset(platform) {
        this.x = platform.x + platform.width / 2;
        this.y = platform.y - this.radius;

        this.vx = 3;
        this.vy = -3;

        this.active = false;
    }

    launch(speedMultiplier = 1) {
        this.active = true;
        this.vx = 3 * speedMultiplier;
        this.vy = -3 * speedMultiplier;
    }

    draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, 
            this.radius, 0, Math.PI * 2, false)
        context.fillStyle = 'white'
        context.fill()
        context.closePath();
        }

    update(canvas, platform) {
        if (!this.active) {
            this.x = platform.x + (platform.width / 2)
            this.y = platform.y - this.radius
            return ;
        }

        this.x += this.vx
        this.y += this.vy

        if (this.x + this.radius > canvas.width ||
            this.x - this.radius < 0) {
                this.vx *= -1
            }
        if (this.y - this.radius < 0) {
            this.vy *= -1
        }
        
        if (this.y - this.radius > canvas.height){
            return "gameover"
        }
    }
}