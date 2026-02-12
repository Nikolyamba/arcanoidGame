class Brick {
    constructor(x, y, width = 80, height = 20, 
        health) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.health = health;
        this.destroyed = false;
    }

    draw(context) {
        if (this.health < 1) return;
        context.beginPath();
        context.rect(this.x, this.y, this.width, this.height);
        context.fillStyle = this.health == 3 ? 'green':
        this.health == 2 ? 'blue' :
        this.health == 1 ? 'red' : 'transparent'
        context.strokeStyle = "#000000";
        context.fill()
        context.closePath();
    }

    hit() {
        if (!this.destroyed) {
            this.health -= 1
        }
            if (this.health < 0) {
                this.destroyed = true
            }
    }
}