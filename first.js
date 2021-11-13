let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let score = 0;
let lives = 3;
let levels = 1;

let x = canvas.width / 2;
let y = canvas.height - 30;
let ballRadius = 15;

let paddleHeight = 20;
let paddleWidth = 110;
let paddleX = (canvas.width - paddleWidth) / 2;

let rightPressed = false;
let leftPressed = false;

let dx = 4;
let dy = -5;

let brickRowCount = 5;
let brickColumnCount = 8;
let brickWidth = 85;
let brickHeight = 25;
let brickPadding = 10;
let brickOffsetTop = 55;
let brickOffsetLeft = 20;

let bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = {x: 0, y: 0, status: 1};
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e) {
    let relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}

function keyDownHandler(e) {
    if (e.keyCode === 39) {
        rightPressed = true;
    } else if (e.keyCode === 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode === 39) {
        rightPressed = false;
    } else if (e.keyCode === 37) {
        leftPressed = false;
    }
}

function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            let b = bricks[c][r];
            if (b.status === 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if (score === brickRowCount * brickColumnCount) {
                        alert("YOU WIN, CONGRATULATIONS!");
                        document.location.reload();
                    }
                }
            }
        }
    }
}

function drawScore() {
    const imagePoints = new Image(80,70);
    imagePoints.src = 'images/point-1.png';
    ctx.drawImage(imagePoints, 20, 10);
    ctx.font = "30px Road Rage";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`${score}`, 65, 35);
}

function drawLives() {
    const imageLives = new Image(10,10);
    imageLives.src = 'images/heart.png';
    ctx.drawImage(imageLives, canvas.width - 75, 10);
    ctx.font = "30px Road Rage";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`${lives}`, canvas.width - 35, 35);
}

function drawLevels() {
    const imageLevels = new Image(10,10);
    imageLevels.src = 'images/level.png';
    ctx.drawImage(imageLevels, canvas.width/2 - 17, 10);
    ctx.font = "30px Road Rage";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`${levels}`, canvas.width/2 + 20, 35);
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#e0dc29"
    ctx.fill();
    ctx.strokeStyle = "#001ddd";
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX - 2.5, canvas.height - paddleHeight - 2.5, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.strokeStyle = "#001ddd";
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.closePath();
}

function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status === 1) {
                let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.lineWidth = 20
                ctx.strokeStyle = "#001ddd";
                ctx.lineWidth = 5;
                ctx.stroke();
                ctx.closePath();
            }
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    drawLevels();
    collisionDetection();
    if (x + ballRadius > canvas.width || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX + 2.5 && x < paddleX + paddleWidth + 2.5) {
            dy = -dy;
        } else {
            lives--;
            if (!lives) {
                alert("GAME OVER");
                document.location.reload();
            } else {
                x = canvas.width / 2;
                y = canvas.height - 30;
                levels++;
                dx = 5 + levels ;
                dy = -3 - levels;
                paddleX = (canvas.width - paddleWidth) / 2;
            }
        }
    }
    if (rightPressed && paddleX < canvas.width - paddleWidth - 2.5) {
        paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
    x += dx;
    y += dy;
    requestAnimationFrame(draw);
}

draw();