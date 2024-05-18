const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');


const fullPath = window.location.pathname;
const fileName = fullPath.substring(fullPath.lastIndexOf('/') + 1);

canvas.width = 800;
canvas.height = 600;

const hoop = {
    x: canvas.width - 100,
    y: canvas.height / 2 - 50,
    width: 10,
    height: 100,
    score: 0
};

const basketballImage = new Image();
basketballImage.src = '../assets/basketball.png'; 

const footballImage = new Image();
footballImage.src = '../assets/football.png'; 
const balls = [];

function drawHoop() {
    if(fileName === 'basketBall.html' ){
        ctx.fillStyle = 'red';
        console.log("Hello");
    }
    if(fileName === 'football.html' ){
        ctx.fillStyle = 'green'
      
    }
   
    ctx.fillRect(hoop.x, hoop.y, hoop.width, hoop.height);
}

function drawBall(ball) {
    if(fileName === 'basketBall.html' ){
        ctx.drawImage(basketballImage, ball.x - ball.radius, ball.y - ball.radius, ball.radius * 2, ball.radius * 2);
    }
    if(fileName === 'football.html' ){
        ctx.drawImage(footballImage, ball.x - ball.radius, ball.y - ball.radius, ball.radius * 2, ball.radius * 2);
      
    }
    
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawHoop();

    balls.forEach((ball, index) => {
        ball.x += ball.dx;
        ball.y += ball.dy;

   
        if (
            ball.x + ball.radius > hoop.x &&
            ball.y > hoop.y &&
            ball.y < hoop.y + hoop.height
        ) {
        
            balls.splice(index, 1);
            hoop.score++;
        }

    
        if (ball.x - ball.radius > canvas.width || ball.y - ball.radius > canvas.height) {
            balls.splice(index, 1);
        } else {
            drawBall(ball);
        }
    });

    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${hoop.score}`, 10, 30);

    requestAnimationFrame(update);
}

function shootBall(event) {
    const x = event.clientX - canvas.offsetLeft;
    const y = event.clientY - canvas.offsetTop;

    const angle = Math.atan2(hoop.y + hoop.height / 2 - y, hoop.x - x);
  
    const speed = 10;

    const ball = {
        x: x,
        y: y,
        radius: 16,
        dx: speed * Math.cos(angle),
        dy: speed * Math.sin(angle)
    };

    balls.push(ball);
}

canvas.addEventListener('click', shootBall);

basketballImage.onload = () => {
    update();
};
