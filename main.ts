interface Circle {
    x: number;
    y: number;
    radius: number;
    type: 'football' | 'basketball';
    velocityY: number;
}

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const footballImage = new Image();
footballImage.src = './assets/football.png';

const basketballImage = new Image();
basketballImage.src = './assets/basketball.png';

let imagesLoaded = 0;

footballImage.onload = () => {
    imagesLoaded++;
    if (imagesLoaded === 2) {
        update();
    }
};

basketballImage.onload = () => {
    imagesLoaded++;
    if (imagesLoaded === 2) {
        update();
    }
};

const circles: Circle[] = [];
let footballCount = 0;
let basketballCount = 0;

function drawImage(circle: Circle): void {
    if (circle.type === 'football') {
        ctx.drawImage(footballImage, circle.x - circle.radius, circle.y - circle.radius, circle.radius * 2, circle.radius * 2);
    } else if (circle.type === 'basketball') {
        ctx.drawImage(basketballImage, circle.x - circle.radius, circle.y - circle.radius, circle.radius * 2, circle.radius * 2);
    }
}

function update(): void {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    circles.forEach(circle => {
        circle.velocityY += 0.2; 
        circle.y += circle.velocityY;
        if (circle.y + circle.radius >= canvas.height) {
            circle.velocityY *= -0.9;
            circle.y = canvas.height - circle.radius;
        }
        drawImage(circle);
    });

    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(`Football count: ${footballCount}`, 10, 30);
    ctx.fillText(`Basketball count: ${basketballCount}`, 10, 60);
    ctx.fillText(`click double on the ball and start to play`, canvas.width / 2 - 150 , 30);

    requestAnimationFrame(update);
}

function handleClick(event: MouseEvent): void {
    const x = event.clientX - canvas.offsetLeft;
    const y = event.clientY - canvas.offsetTop;
    const type: 'football' | 'basketball' = Math.random() < 0.5 ? 'football' : 'basketball';
    circles.push({
        x,
        y,
        radius: 30,
        type,
        velocityY: 0
    });

    if (type === 'football') {
        footballCount++;
    } else {
        basketballCount++;
    }
}

function handleMouseMove(event: MouseEvent): void {
    const x = event.clientX - canvas.offsetLeft;
    const y = event.clientY - canvas.offsetTop;
    let hover = false;
    for (const circle of circles) {
        const dist = Math.sqrt((x - circle.x) ** 2 + (y - circle.y) ** 2);
        if (dist <= circle.radius) {
            hover = true;
            break;
        }
    }
    canvas.style.cursor = hover ? 'pointer' : 'default';
}

function handleDoubleClick(event: MouseEvent): void {
    const x = event.clientX - canvas.offsetLeft;
    const y = event.clientY - canvas.offsetTop;
    for (const circle of circles) {
        const dist = Math.sqrt((x - circle.x) ** 2 + (y - circle.y) ** 2);
        if (dist <= circle.radius) {
            if (circle.type === 'football') {
                canvas.removeEventListener('click', handleClick)
                location.assign("./gamePage/football.html");
            } else if (circle.type === 'basketball') {
                canvas.removeEventListener('mousemove', handleClick)

                location.assign("./gamePage/basketBall.html");
            }
            break;
        }
    }
}

canvas.addEventListener('click', handleClick);
canvas.addEventListener('mousemove', handleMouseMove);
canvas.addEventListener('dblclick', handleDoubleClick);
