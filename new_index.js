// SELECT CANVAS ELEMENT
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
ctx.lineWidth = 3;

// GAME VARIABLES AND CONSTANTS
let paddleWidth = 110;
let paddleMarginBottom = 20;
let paddleHeight = 20;
let ballRadius = 12;
let life = 3;
let score = 0;
let scoreStep = 10;
let level = 1;
let maxLevels = 3;
let game_over = false;
let rightPressed = false;
let leftPressed = false;

// CREATE THE PADDLE
let paddle = {
    x: canvas.width / 2 - paddleWidth / 2,
    y: canvas.height - paddleMarginBottom - paddleHeight,
    width: paddleWidth,
    height: paddleHeight,
    dx: 5
}

// DRAW PADDLE
function drawPaddle() {
    ctx.fillStyle = "#2e3548";
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.strokeStyle = "#ffcd05";
    ctx.strokeRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

// CONTROL THE PADDLE
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e) {
    let relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddle.x = relativeX - paddle.width / 2;
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

// MOVE PADDLE
function movePaddle() {
    if (rightPressed && paddle.x + paddle.width < canvas.width) {
        paddle.x += paddle.dx;
    } else if (leftPressed && paddle.x > 0) {
        paddle.x -= paddle.dx;
    }
}

// CREATE THE BALL
let ball = {
    x: canvas.width / 2,
    y: paddle.y - ballRadius,
    radius: ballRadius,
    speed: 6,
    dx: 3 * (Math.random() * 2 - 1),
    dy: -3
}

// DRAW THE BALL
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#ffcd05";
    ctx.fill();
    ctx.strokeStyle = "#2e3548";
    ctx.stroke();
    ctx.closePath();
}

// MOVE THE BALL
function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;
}

// BALL AND WALL COLLISION DETECTION
function ballWallCollision() {
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.dx = -ball.dx;
        wall_hit.play();
    }

    if (ball.y - ball.radius < 0) {
        ball.dy = -ball.dy;
        wall_hit.play();
    }

    if (ball.y + ball.radius > canvas.height) {
        life--;
        life_lost.play();
        resetBall();
    }
}

// RESET THE BALL
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = paddle.y - ball.radius;
    ball.dx = 3 * (Math.random() * 2 - 1);
    ball.dy = -3;
}

// BALL AND PADDLE COLLISION
function ballPaddleCollision() {
    if (ball.x < paddle.x + paddle.width && ball.x > paddle.x && paddle.y < paddle.y + paddle.height && ball.y > paddle.y) {

        paddle_hit.play();

        let collidePoint = ball.x - (paddle.x + paddle.width / 2);

        collidePoint = collidePoint / (paddle.width / 2);

        let angle = collidePoint * Math.PI / 3;
        ball.dx = ball.speed * Math.sin(angle);
        ball.dy = -ball.speed * Math.cos(angle);
    }
}

// CREATE THE BRICKS
let brick = {
    row: 4,
    column: 7,
    width: 95,
    height: 25,
    offSetLeft: 15,
    offSetTop: 25,
    marginTop: 25,
    fillColor: "#2e3548",
    strokeColor: "#FFF"
}

let bricks = [];

function createBricks() {
    for (let r = 0; r < brick.row; r++) {
        bricks[r] = [];
        for (let c = 0; c < brick.column; c++) {
            bricks[r][c] = {
                x: c * (brick.offSetLeft + brick.width) + brick.offSetLeft,
                y: r * (brick.offSetTop + brick.height) + brick.offSetTop + brick.marginTop,
                status: true
            }
        }
    }
}

createBricks();

// draw the bricks
function drawBricks() {
    for (let r = 0; r < brick.row; r++) {
        for (let c = 0; c < brick.column; c++) {
            let b = bricks[r][c];
            if (b.status) {
                ctx.fillStyle = brick.fillColor;
                ctx.fillRect(b.x, b.y, brick.width, brick.height);
                ctx.strokeStyle = brick.strokeColor;
                ctx.strokeRect(b.x, b.y, brick.width, brick.height);
            }
        }
    }
}

// ball brick collision
function ballBrickCollision() {
    for (let r = 0; r < brick.row; r++) {
        for (let c = 0; c < brick.column; c++) {
            let b = bricks[r][c];
            if (b.status) {
                if (ball.x + ball.radius > b.x && ball.x - ball.radius < b.x + brick.width && ball.y + ball.radius > b.y && ball.y - ball.radius < b.y + brick.height) {
                    brick_hit.play();
                    ball.dy = -ball.dy;
                    b.status = false;
                    score += scoreStep;
                }
            }
        }
    }
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
    ctx.fillText(`${life}`, canvas.width - 35, 35);
}

function drawLevels() {
    const imageLevels = new Image(10, 10);
    imageLevels.src = 'images/level.png';
    ctx.drawImage(imageLevels, canvas.width - 175, 10);
    ctx.font = "30px Road Rage";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`${level}`, canvas.width - 135, 35);
}

// DRAW FUNCTION
function draw() {
    drawSound();
    drawScore();
    drawLives();
    drawLevels();
    drawPaddle();
    drawBall();
    drawBricks();
}

// game over
function gameOver() {
    if (life <= 0) {
        loseGame.play();
        showYouLose();
        game_over = true;
    }
}

// level up
function levelUp() {
    let isLevelDone = true;

    // check if all the bricks are broken
    for (let r = 0; r < brick.row; r++) {
        for (let c = 0; c < brick.column; c++) {
            isLevelDone = isLevelDone && !bricks[r][c].status;
        }
    }

    if (isLevelDone) {
        if (level >= maxLevels) {
            showYouWin();
            win_game.play();
            game_over = true;
            return;
        }
        brick.row++;
        createBricks();
        ball.speed += 0.7;
        resetBall();
        level++;
    }
}

// UPDATE GAME FUNCTION
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
    ctx.clearRect(0, 0, canvas.width, canvas.height);
        draw();
        update();
        document.addEventListener("keydown", keyDownHandler, false);
        function keyDownHandler(e) {
            if (e.keyCode === 32) {
                draw();
                update();}}
    if (!game_over) {
        requestAnimationFrame(loop);
    }
}

loop();

// Audio

const wall_hit = new Audio();
wall_hit.src = "sounds/hit_sound.wav";

const life_lost = new Audio();
life_lost.src = "sounds/life_lost.wav";

const paddle_hit = new Audio();
paddle_hit.src = "sounds/more_hit.mp3";

const win_game = new Audio();
win_game.src = "sound/game-win.wav";

const brick_hit = new Audio();
brick_hit.src = "sounds/hit_sound.wav";

const loseGame = new Audio();
loseGame.src = "sounds/game_over.wav";

// SELECT SOUND ELEMENT
const soundImg = document.getElementById('sound');
soundImg.addEventListener('click', audioStatus);

function audioStatus() {
    let srcImg = soundImg.getAttribute('src');
    let sound_img = srcImg === "images/sound-on.png" ? "images/sound-off.png" : "images/sound-on.png";

    soundImg.setAttribute('src', sound_img);

    wall_hit.muted = wall_hit.muted ? false : true;
    paddle_hit.muted = paddle_hit.muted ? false : true;
    brick_hit.muted = brick_hit.muted ? false : true;
    win_game.muted = win_game.muted ? true : false;
    life_lost.muted = life_lost.muted ? false : true;
}

// SHOW GAME OVER MESSAGE
/* SELECT ELEMENTS */
const gameover = document.getElementById("gameover");
const youwin = document.getElementById("youwin");
const congr = document.getElementById("win");
const youlose = document.getElementById("youlose");
const restart = document.getElementById("restart");

// CLICK ON PLAY AGAIN BUTTON
restart.addEventListener("click", function () {
    location.reload(); // reload the page
})

// SHOW YOU WIN
function showYouWin() {
    gameover.style.display = "block";
    congr.style.display = "block";
    youwin.style.display = "block";
}

// SHOW YOU LOSE
function showYouLose() {
    gameover.style.display = "block";
    youlose.style.display = "block";
}

//DataBase

let topPlayers = {}