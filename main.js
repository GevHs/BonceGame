var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var footballImage = new Image();
footballImage.src = './assets/football.png';
var basketballImage = new Image();
basketballImage.src = './assets/basketball.png';
var imagesLoaded = 0;
footballImage.onload = function () {
    imagesLoaded++;
    if (imagesLoaded === 2) {
        update();
    }
};
basketballImage.onload = function () {
    imagesLoaded++;
    if (imagesLoaded === 2) {
        update();
    }
};
var circles = [];
var footballCount = 0;
var basketballCount = 0;
function drawImage(circle) {
    if (circle.type === 'football') {
        ctx.drawImage(footballImage, circle.x - circle.radius, circle.y - circle.radius, circle.radius * 2, circle.radius * 2);
    }
    else if (circle.type === 'basketball') {
        ctx.drawImage(basketballImage, circle.x - circle.radius, circle.y - circle.radius, circle.radius * 2, circle.radius * 2);
    }
}
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    circles.forEach(function (circle) {
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
    ctx.fillText("Football count: ".concat(footballCount), 10, 30);
    ctx.fillText("Basketball count: ".concat(basketballCount), 10, 60);
    ctx.fillText("click double on the ball and start to play", canvas.width / 2 - 150, 30);
    requestAnimationFrame(update);
}
function handleClick(event) {
    var x = event.clientX - canvas.offsetLeft;
    var y = event.clientY - canvas.offsetTop;
    var type = Math.random() < 0.5 ? 'football' : 'basketball';
    circles.push({
        x: x,
        y: y,
        radius: 30,
        type: type,
        velocityY: 0
    });
    if (type === 'football') {
        footballCount++;
    }
    else {
        basketballCount++;
    }
}
function handleMouseMove(event) {
    var x = event.clientX - canvas.offsetLeft;
    var y = event.clientY - canvas.offsetTop;
    var hover = false;
    for (var _i = 0, circles_1 = circles; _i < circles_1.length; _i++) {
        var circle = circles_1[_i];
        var dist = Math.sqrt(Math.pow((x - circle.x), 2) + Math.pow((y - circle.y), 2));
        if (dist <= circle.radius) {
            hover = true;
            break;
        }
    }
    canvas.style.cursor = hover ? 'pointer' : 'default';
}
function handleDoubleClick(event) {
    var x = event.clientX - canvas.offsetLeft;
    var y = event.clientY - canvas.offsetTop;
    for (var _i = 0, circles_2 = circles; _i < circles_2.length; _i++) {
        var circle = circles_2[_i];
        var dist = Math.sqrt(Math.pow((x - circle.x), 2) + Math.pow((y - circle.y), 2));
        if (dist <= circle.radius) {
            if (circle.type === 'football') {
                canvas.removeEventListener('click', handleClick);
                location.assign("./gamePage/football.html");
            }
            else if (circle.type === 'basketball') {
                canvas.removeEventListener('mousemove', handleClick);
                location.assign("./gamePage/basketBall.html");
            }
            break;
        }
    }
}
canvas.addEventListener('click', handleClick);
canvas.addEventListener('mousemove', handleMouseMove);
canvas.addEventListener('dblclick', handleDoubleClick);
