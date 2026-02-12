class Ball {
    constructor() {
        this.x = 400,
        this.y = 300,
        this.radius = 10,
        this.vx = 3,
        this.vy = -3
    }

    draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, 
            this.radius, 0, Math.PI * 2, false)
        context.fillStyle = 'white'
        context.fill()
        context.closePath();
        }

    update(canvas) {
        this.x += this.vx
        this.y += this.vy

        if (this.x + this.radius > canvas.width ||
            this.x - this.radius < 0) {
                this.vx *= -1
            }
        if (this.y - this.radius < 0) {
            this.vy *= -1
        }
    }
}