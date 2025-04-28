import { Enemies } from "./models.js";

import { paused, togglePause, degreesToRadians } from "./helpers.js";

const canvas = document.querySelector("#game");
const context = canvas.getContext("2d");
const crossbow = document.querySelector(".crossbow");

const CANVAS_WIDTH = (canvas.width = 1400);
const CANVAS_HEIGHT = (canvas.height = 800);

const buttonPause = document.querySelector("#buttonPause");

window.addEventListener("keydown", function (e) {
  const key = e.keyCode;
  if (key === 80) {
    togglePause();
  }
});

buttonPause.addEventListener("click", togglePause);

const arrows = [];
const greenGoblins = [];
const deadsgreenGoblins = [];
let boxBoundingRect = crossbow.getBoundingClientRect();

let boxCenter = {
  x: boxBoundingRect.left + boxBoundingRect.width / 2,
  y: boxBoundingRect.top + boxBoundingRect.height / 2,
};

let angle = null;
let coolDown = false;
let rechargeTime = 500;

const bg = new Image();
bg.src = "assets/fort.png";

let greenGoblin = new Enemies(context, "assets/enemies/gob.png");
let gameFrame = 0;

document.addEventListener("mousemove", (e) => {
  angle =
    Math.atan2(e.pageX - boxCenter.x, -(e.pageY - boxCenter.y)) *
    (180 / Math.PI);
  if (angle <= 20) angle = 20;
  if (angle >= 160) angle = 160;

  crossbow.style.transform = `rotate(${angle}deg)`;
});

function shot() {
  if (paused == false) {
    if (angle <= 10) angle = 10;
    if (angle >= 170) angle = 170;

    if (coolDown == false) {
      let timerId = setTimeout(function tick() {
        arrows.push({
          x: 80,
          y: 390,
          speed: 15,
          direction: angle - 90,
        });

        coolDown = true;
        setTimeout(() => {
          coolDown = false;
        }, rechargeTime);

        timerId = setTimeout(tick, rechargeTime);
      }, 20);

      canvas.addEventListener("mouseup", () => {
        crossbow.style.animation = ``;
        clearTimeout(timerId);
      });
    }
  }
}

function drawArrow(context, fromx, fromy, tox, toy) {
  let headlen = 10; // length of head in pixels
  let dx = tox - fromx;
  let dy = toy - fromy;
  let angle = Math.atan2(dy, dx);
  context.lineWidth = 3;
  context.strokeStyle = "rgba(151, 152, 154, 0.99)";
  context.moveTo(fromx, fromy);
  context.lineTo(tox, toy);

  context.lineTo(
    tox - headlen * Math.cos(angle - Math.PI / 6),
    toy - headlen * Math.sin(angle - Math.PI / 6)
  );
  context.moveTo(tox, toy);
  context.lineTo(
    tox - headlen * Math.cos(angle + Math.PI / 6),
    toy - headlen * Math.sin(angle + Math.PI / 6)
  );
}

canvas.addEventListener("mousedown", shot);

function game() {
  if (!paused) {
    update();
    render();
  }
  requestAnimationFrame(game);
}

function update() {
  gameFrame++;

  //спавним врага
  if (gameFrame % 150 == 0) {
    greenGoblins.push({
      x: 1300,
      y: 300,
      health: 100,
      animation: "run",
      deleteFlag: 0,
      damage: 50,
    });
  }

  greenGoblin.animate(gameFrame);

  //физика стрелы
  for (let i in arrows) {
    arrows[i].x +=
      Math.cos(degreesToRadians(arrows[i].direction)) * arrows[i].speed;
    arrows[i].y +=
      Math.sin(degreesToRadians(arrows[i].direction)) * arrows[i].speed;
  }

  // движение
  for (let item in greenGoblins) {
    greenGoblins[item].x = greenGoblins[item].x - 3;

    //границы
    if (greenGoblins[item].x <= 135) {
      // let random = Math.floor(Math.random() * 10 - 5);
      // greenGoblins[item].y = greenGoblins[item].y + random;
      // greenGoblins[item].x = 135; // остановка
      // greenGoblins[item].animation = "hit";
      greenGoblins.splice(item, 1); //  удаление

      // анимация атаки
    }

    // проверка на попадание стрелы
    for (let j in arrows) {
      if (
        Math.abs(greenGoblins[item].x - arrows[j].x) < 20 &&
        Math.abs(greenGoblins[item].y + 50 - arrows[j].y) < 35
      ) {
        arrows.splice(j, 1);
        greenGoblins[item].health = greenGoblins[item].health - 50;
        if (greenGoblins[item].health <= 0) greenGoblins[item].deleteFlag = 1;
        break;
      }
    }
    if (greenGoblins[item].deleteFlag == 1) {
      let deadCoordX = greenGoblins[item].x;
      let deadCoordY = greenGoblins[item].y;
      deadsgreenGoblins.push({ x: deadCoordX, y: deadCoordY, animX: 0 });
      greenGoblins.splice(item, 1);
    }
  }

  // анимация смерти

  for (let d in deadsgreenGoblins) {
    if (gameFrame % 8 == 0) {
      deadsgreenGoblins[d].animX = deadsgreenGoblins[d].animX + 1;
    }

    if (deadsgreenGoblins[d].animX > 5) deadsgreenGoblins.splice(d, 1);
  }

  for (let item in arrows) {
    if (arrows[item].x >= 1200 || arrows[item].y >= 800 || arrows[item].y < 5) {
      // arrows[item].x = 250; // остановка
      arrows.splice(item, 1); //  удаление
    }
  }
}

function render() {
  context.drawImage(bg, 0, 0, 1400, 800);
  for (let i in greenGoblins) {
    greenGoblin.render(
      greenGoblins[i].x,
      greenGoblins[i].y,
      greenGoblins[i].animation,
      greenGoblins[i].health
    );
  }

  for (let i in arrows) {
    const angl = angle;
    context.beginPath();
    drawArrow(
      context,
      arrows[i].x,
      arrows[i].y,
      arrows[i].x + Math.cos(degreesToRadians(arrows[i].direction)) * 40,
      arrows[i].y + Math.sin(degreesToRadians(arrows[i].direction)) * 40
    );
    context.stroke();
  }

  for (let i in deadsgreenGoblins) {
    greenGoblin.dead(
      deadsgreenGoblins[i].x,
      deadsgreenGoblins[i].y,
      deadsgreenGoblins[i].animX
    );
  }
}

game();
