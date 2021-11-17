let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let score = 0;
let scoreStep = 10;
let lives = 3;
let levels = 1;
let max_levels = 3;

let x = canvas.width / 2;
let y = canvas.height - 30;
let ballRadius = 15;

let paddleHeight = 20;
let paddleWidth = 110;
let paddleX = (canvas.width - paddleWidth) / 2;

let rightPressed = false;
let leftPressed = false;

let dx = 3 * (Math.random() * 2 - 1);
let dy = -3;

let brickRowCount = 5;
let brickColumnCount = 8;
let brickWidth = 85;
let brickHeight = 25;
let brickPadding = 10;
let brickOffsetTop = 55;
let brickOffsetLeft = 20;

let game_over = false;

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
                    wall_hit.play();
                    b.status = 0;
                    score += scoreStep;
                    if (score / 10 === brickRowCount * brickColumnCount) {
                        win.play();
                        document.location.reload();
                    }
                }
            }
        }
    }
}

// Audio
const wall_hit = new Audio();
wall_hit.src = "sounds/hit_sound.wav";

const life_lost = new Audio();
life_lost.src = "sounds/life_lost.wav";

const paddle_hit = new Audio();
paddle_hit.src = "sounds/more_hit.mp3";

const win = new Audio();
win.src = "sound/game-win.wav";

const brick_hit = new Audio();
brick_hit.src = "sounds/hit_sound.wav";

const loseGame = new Audio();
loseGame.src = "sounds/game_over.wav";

const soundImg = document.getElementById('sound');
soundImg.addEventListener('click', audioStatus);

function audioStatus() {
    let srcImg = soundImg.getAttribute('src');
    let sound_img = srcImg === "images/sound-on.png" ? "images/sound-off.png" : "images/sound-on.png";

    soundImg.setAttribute('src', sound_img);

    wall_contact.muted = wall_contact.muted ? false : true;
    paddle_contact.muted = paddle_contact.muted ? false : true;
    brick_contact.muted = brick_contact.muted ? false : true;
    win.muted = win.muted ? false : true;
    life_lost.muted = life_lost.muted ? false : true;
}

function drawSound() {
    ctx.beginPath();
    ctx.arc(42, 25, 15, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0,0,0,0)"
    ctx.fill();
    ctx.strokeStyle = "rgba(0,0,0,0.79)";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.closePath();
}

function drawScore() {
    const imagePoints = new Image(80, 70);
    imagePoints.src = 'images/point-1.png';
    ctx.drawImage(imagePoints, canvas.width - 275, 10);
    ctx.font = "30px Road Rage";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`${score}`, canvas.width - 235, 35);
}

function drawLives() {
    const imageLives = new Image(10, 10);
    imageLives.src = 'images/heart.png';
    ctx.drawImage(imageLives, canvas.width - 75, 10);
    ctx.font = "30px Road Rage";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`${lives}`, canvas.width - 35, 35);
}

function drawLevels() {
    const imageLevels = new Image(10, 10);
    imageLevels.src = 'images/level.png';
    ctx.drawImage(imageLevels, canvas.width - 175, 10);
    ctx.font = "30px Road Rage";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`${levels}`, canvas.width - 135, 35);
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,222,0,0.91)";
    ctx.fill();
    ctx.strokeStyle = "rgba(0,29,221,0.85)";
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX - 2.5, canvas.height - paddleHeight - 2.5, paddleWidth, paddleHeight);
    ctx.fillStyle = "rgba(255,222,0,0.91)";
    ctx.fill();
    ctx.strokeStyle = "rgba(0,29,221,0.85)";
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
                ctx.fillStyle = "rgba(255,222,0,0.91)";
                ctx.fill();
                ctx.lineWidth = 20
                ctx.strokeStyle = "rgba(0,29,221,0.85)";
                ctx.lineWidth = 5;
                ctx.stroke();
                ctx.closePath();
            }
        }
    }
}

const gameover = document.getElementById("gameover");
const youwin = document.getElementById("youwin");
const youlose = document.getElementById("youlose");
const restart = document.getElementById("restart");

restart.addEventListener("click", function () {
    location.reload(); // reload the page
})

function showYouWin() {
    gameover.style.display = "block";
    youwin.style.display = "block";
}

function showYouLose() {
    gameover.style.display = "block";
    youlose.style.display = "block";
}

function showYouLose() {
    gameover.style.display = "block";
    youlose.style.display = "block";
}

function gameOver() {
    if (lives <= 0) {
        showYouLose();
        loseGame.play();
        game_over = true;
    }
}

function levelUp() {
    let levelIsDone = true;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    drawLevels();
    drawSound();
    collisionDetection();
    if (x + ballRadius > canvas.width || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy < ballRadius) {
        dy = -dy;
        wall_hit.play();
    } else if (y + dy > canvas.height - paddleHeight) {
        if (x > paddleX + paddleWidth + 2.5 && x < paddleX + paddleWidth + 2.5) {
            dy = -dy;
        } else {
            lives--;
            life_lost.play();
            if (!lives) {
                alert("GAME OVER");
                document.location.reload();
            } else {
                x = canvas.width / 2;
                y = canvas.height - 30;
                levels++;
                dx += 5;
                dy -= -3;
                paddleX = (canvas.width - paddleWidth) / 2;
            }
        }
    }
    if (rightPressed && paddleX + paddleWidth < canvas.width) {
        paddleX += 7;
    } else if (leftPressed && paddleX - 10 > 0) {
        paddleX -= 7;
    }
    x += dx;
    y += dy;
    requestAnimationFrame(draw);
}

draw();

function update() {
    movePaddle();

    moveBall();

    ballWallCollision();

    ballPaddleCollision();

    ballBrickCollision();

    gameOver();

    levelUp();
}

// GAME LOOP
function loop() {
    // CLEAR THE CANVAS
    ctx.drawImage(BG_IMG, 0, 0);

    draw();

    update();

    if (!game_over) {
        requestAnimationFrame(loop);
    }
}

loop();