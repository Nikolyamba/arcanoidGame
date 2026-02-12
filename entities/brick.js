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

    const radius = 5; // скругление углов
    const x = this.x;
    const y = this.y;
    const w = this.width;
    const h = this.height;

    // создаём линейный градиент сверху вниз
    const gradient = context.createLinearGradient(x, y, x, y + h);
    if (this.health == 3) {
        gradient.addColorStop(0, '#00FF00'); // светлый сверху
        gradient.addColorStop(1, '#008800'); // тёмный снизу
    } else if (this.health == 2) {
        gradient.addColorStop(0, '#4444FF');
        gradient.addColorStop(1, '#000088');
    } else if (this.health == 1) {
        gradient.addColorStop(0, '#FF4444');
        gradient.addColorStop(1, '#880000');
    }

    // рисуем сам кирпич со скругленными углами
    context.beginPath();
    context.moveTo(x + radius, y);
    context.lineTo(x + w - radius, y);
    context.quadraticCurveTo(x + w, y, x + w, y + radius);
    context.lineTo(x + w, y + h - radius);
    context.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
    context.lineTo(x + radius, y + h);
    context.quadraticCurveTo(x, y + h, x, y + h - radius);
    context.lineTo(x, y + radius);
    context.quadraticCurveTo(x, y, x + radius, y);
    context.closePath();

    // заливка градиентом
    context.fillStyle = gradient;
    context.fill();

    // тонкая обводка
    context.strokeStyle = '#000';
    context.lineWidth = 2;
    context.stroke();

    // светлая полоска сверху (объем)
    context.fillStyle = 'rgba(255,255,255,0.3)';
    context.fillRect(x + 2, y + 2, w - 4, h / 4);
}

    hit() {
        if (this.health > 0) {
            this.health -= 1;
        }

        if (this.health <= 0) {
            this.destroyed = true;
        }
    }
}