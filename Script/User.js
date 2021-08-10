let canvas = document.getElementById('game');
canvas.width = innerWidth;
canvas.height = innerHeight;
let c = canvas.getContext('2d');


class User {
    constructor(x, y, r, color) {
        this.x = x
        this.y = y
        this.r = r
        this.color = color
    }

    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        c.fillStyle = this.color
        c.fill();
        c.closePath();

    }

}

class Projectile {
    constructor(x, y, r, color, speed) {
        this.x = x
        this.y = y
        this.r = r
        this.color = color
        this.speed = speed
    }

    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        c.fillStyle = this.color
        c.fill();
        c.closePath();

        // console.log('123')
    }

    update() {
        this.draw()
        this.x = this.x - this.speed.x;
        this.y = this.y - this.speed.y;
        // console.log('')
    }

}

class Enemy {
    constructor(x, y, r, color, speed) {
        this.x = x
        this.y = y
        this.r = r
        this.color = color
        this.speed = speed
    }

    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        c.strokeStyle = this.color
        c.stroke();
        c.closePath();

        // console.log('123')
    }

    update() {
        this.draw()
        this.x = this.x + this.speed.x;
        this.y = this.y + this.speed.y;
        // console.log('')
    }

}

let rP = 10
let x = canvas.width / 2;
let y = canvas.height;
let user = new User(x, y, 50, "skyblue");
let projectiles = [];
let enemies = [];
let play = document.getElementById('play');
let score = 0;
let check = false

function initEnemy() {
    setInterval(() => {
        let enemyX = Math.random() * innerWidth
        let enemyY = 100
        let enemyR = Math.random() * 100
        let enemyC = 'white'
        let enemyS = {
            x: Math.random() * 5,
            y: Math.random() * 5
        }
        enemies.push(new Enemy(enemyX, enemyY, enemyR, enemyC, enemyS))
    }, 1000)
}
initEnemy()

function animate() {
    if (!check) {
        requestAnimationFrame(animate)
        c.clearRect(0, 0, canvas.width, canvas.height)
        projectiles.forEach((projectile) => {
            projectile.update()
        })
        enemies.forEach((enemy, index) => {
            let dist = Math.hypot(user.x - enemy.x, user.y - enemy.y)
            if (dist - enemy.r - user.r < 1) {
                check = true;
            } else {
                enemy.update()
                projectiles.forEach((projectile, projectileIndex) => {
                    let distance = Math.hypot(projectile.x - enemy.x,
                        projectile.y - enemy.y)

                    if (distance - enemy.r - projectile.r < 1) {
                        enemies.splice(index, 1)
                        projectiles.splice(index, 1)
                        score++;
                    }
                })
            }
        })
        // console.log(enemies)
        user.draw();
        drawScore();
        drawHighScore()
    } else {
        alert('Game Over: ' + score);
        saveScoreArray(score)
        document.getElementById('play').style.display = "block";
        document.location.reload();
    }
}

addEventListener('click', function (event) {
    let angle = Math.atan2(
        canvas.height - event.clientY,
        canvas.width / 2 - event.clientX
        // canvas.height - event.clientY,
        // canvas.width / 2 - event.clientX
    )

    console.log(angle)
    let speed = {
        x: Math.cos(angle) * Math.PI * 2,
        y: Math.sin(angle) * Math.PI * 2
    };
    projectiles.push(new Projectile(canvas.width / 2, canvas.height, rP, 'pink', speed))
    // console.log(projectiles)
})

play.addEventListener('click', (event) => {
    animate();

    document.getElementById("play").style.display = "none";
})

function drawScore() {
    c.font = "25px Arial";
    c.fillStyle = "white";
    c.fillText("Score: " + score, 10, 800);

}


function drawHighScore() {
    c.font = "25px Arial";
    c.fillStyle = "skyblu";
    c.fillText("High Score " + result, 10, 900);
    console.log('teset')
}
let result = loadScoreArray();

// function saveScore(score) {
//     localStorage.setItem('score', score)
// }
//
// function loadScore() {
//     if (localStorage.hasOwnProperty('score')) {
//         return localStorage.getItem('score')
//     } else {
//         return 0;
//     }
// }
// loadScore()

//save array
function saveScoreArray(score) {
    let name = prompt('What is your name?');
    let user = [name, score];
    localStorage.setItem('score2', JSON.stringify(user));
}

function loadScoreArray() {
    if (localStorage.hasOwnProperty('score2')) {
        return JSON.parse(localStorage.getItem('score2')).join(' : ');
    } else {
        return [];
    }
}
