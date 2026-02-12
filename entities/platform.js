class Platform {
    constructor(canvas) {
        this.x = (canvas.width - 120) / 2,
        this.y = canvas.height - 40,
        this.width = 120,
        this.height = 15,
        this.speed = 7,
        this.moveLeft = false,
        this.moveRight = false,

        this.bindControls()
    }

    draw(context) {
    context.fillStyle = '#FF5555';
    context.strokeStyle = '#880000';
    context.lineWidth = 3;
    context.fillRect(this.x, this.y, this.width, this.height);
    context.strokeRect(this.x, this.y, this.width, this.height);
    }

    bindControls() {
        document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') {
            this.moveLeft = true;
        }
        if (event.key === 'ArrowRight') {
            this.moveRight = true;
        }
    });

        document.addEventListener('keyup', (event) => {
        if (event.key === 'ArrowLeft') {
            this.moveLeft = false;
        }
        if (event.key === 'ArrowRight') {
            this.moveRight = false
        }
        }
        )
    }

    update(canvas) {
        if (this.moveLeft && this.x > 0) {
            this.x -= this.speed
        }
        if (this.moveRight && this.x + this.width < canvas.width) {
            this.x += this.speed
        }
    }
}
