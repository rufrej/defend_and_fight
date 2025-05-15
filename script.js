import { redDemon, flyDemon, smallDemon, greenGoblin } from "./enemies.js";
import {
  canvas,
  context,
  buttonPause,
  crossbow,
  boxCenter,
  arrows,
  coin,
  bg,
  expl,
  fireball,
} from "./declarations.js";

import {
  paused,
  togglePause,
  degreesToRadians,
  drawArrow,
  draw,
  buildLineEnemies,
} from "./helpers.js";

import { playSoundShot, playSoundHurt, playSoundDamage } from "./sounds.js";

import {
  redDemonParameters,
  flyDemonParameters,
  smallDemonParameters,
  greenGoblinParameters,
} from "./enemies.js";

let angle = null;

let coolDown = false;

let rechargeTime = 500;

let arrowsSpeed = 30;

let gameFrame = 0;

let towerHealth = 100;

let towerHealthStrip = 120;

let arrowDamege = 50;

let coins = 0;
let enemies = [];
let deadEnemies = [];
let distanceAttacks = [];

window.addEventListener("keydown", function (e) {
  const key = e.keyCode;
  if (key === 80) {
    togglePause();
  }
});

buttonPause.addEventListener("click", togglePause);

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
        if (paused == false) {
          playSoundShot();

          arrows.push({
            x: 80,
            y: 390,
            speed: arrowsSpeed,
            direction: angle - 90,
          });

          crossbow.style.animation = `reloaded 0.${rechargeTime}s linear infinite`;
          coolDown = true;
          setTimeout(() => {
            coolDown = false;
            crossbow.style.animation = ``;
          }, rechargeTime);

          timerId = setTimeout(tick, rechargeTime);
        }
      }, 20);

      canvas.addEventListener("mouseup", () => {
        crossbow.style.animation = ``;
        clearTimeout(timerId);
      });
    }
  }
}

canvas.addEventListener("mousedown", shot);

function game() {
  if (!paused) {
    update();
    render();
  }
  requestAnimationFrame(game);
}

// function buildLineEnemies(quantity, gap, enemy) {
//   let centerCoord = 400;
//   let indentTop = gap;
//   let indentButton = gap;
//   const enem = Object.assign({}, enemy);
//   enem.y = centerCoord;
//   enemies.push(enem);
//   for (let i = 1; i <= quantity - 1; i++) {
//     const enem = Object.assign({}, enemy);

//     if (i % 2 == 0) {
//       enem.y = centerCoord + indentTop;

//       indentTop += gap;
//     } else {
//       enem.y = centerCoord - indentButton;
//       indentButton -= -gap;
//     }

//     enemies.push(enem);
//     enemies.sort((next, prev) => next.y - prev.y);
//   }
// }

function update() {
  gameFrame++;
  //спавним врага
  if (gameFrame == 100) {
    buildLineEnemies(enemies, 6, 80, greenGoblinParameters);
  }
  //спавним врага
  if (gameFrame == 200) {
    buildLineEnemies(enemies, 6, 80, flyDemonParameters);
  }
  //спавним врага
  if (gameFrame == 300) {
    buildLineEnemies(enemies, 6, 80, smallDemonParameters);
  }
  //спавним врага
  if (gameFrame == 400) {
    buildLineEnemies(enemies, 6, 80, redDemonParameters);
  }

  greenGoblin.animate(gameFrame);
  redDemon.animate(gameFrame);
  smallDemon.animate(gameFrame);
  flyDemon.animate(gameFrame);

  //физика стрелы
  for (let i in arrows) {
    arrows[i].x +=
      Math.cos(degreesToRadians(arrows[i].direction)) * arrows[i].speed;
    arrows[i].y +=
      Math.sin(degreesToRadians(arrows[i].direction)) * arrows[i].speed;
  }

  // движение
  for (let item in enemies) {
    enemies[item].x = enemies[item].x - enemies[item].speed;

    //границы
    if (enemies[item].x <= 135) {
      enemies[item].x = 135; // остановка
      enemies[item].animation = "hit";
      // enemies.splice(item, 1); //  удаление

      // анимация атаки

      if (gameFrame % 50 == 0) {
        towerHealth = towerHealth - enemies[item].damage;
        let damage = towerHealth / enemies[item].damage;
        towerHealthStrip -= towerHealthStrip / damage;
        playSoundDamage();
      }
    }
    // дистанционные атаки
    if (enemies[item].type == flyDemon) {
      if (enemies[item].x <= 635) {
        enemies[item].x = 635; // остановка
        enemies[item].animation = "hit";
        // enemies.splice(item, 1); //  удаление

        // анимация атаки

        if (gameFrame % 100 == 0) {
          let coordX = enemies[item].x;
          let coordY = enemies[item].y;
          distanceAttacks.push({
            x: coordX,
            y: coordY,
            animX: null,
            speed: 6,
            damage: enemies[item].damage,
          });
        }
      }
    }

    // проверка на попадание стрелы
    for (let j in arrows) {
      if (
        Math.abs(enemies[item].x + 30 - arrows[j].x) < 20 &&
        Math.abs(enemies[item].y + 70 - arrows[j].y) < enemies[item].size
      ) {
        arrows.splice(j, 1);
        playSoundHurt();
        enemies[item].health -= arrowDamege;
        let damage = enemies[item].health / arrowDamege;
        enemies[item].healthStrip -= enemies[item].healthStrip / damage;

        if (enemies[item].health <= 0) enemies[item].deleteFlag = 1;

        break;
      }
    }
    if (enemies[item].deleteFlag == 1) {
      let deadCoordX = enemies[item].x;
      let deadCoordY = enemies[item].y;
      deadEnemies.push({
        type: enemies[item].type,
        x: deadCoordX,
        y: deadCoordY,
        animX: 0,
      });
      coins += enemies[item].award;
      enemies.splice(item, 1);
    }
  }

  // дистанционные атаки
  for (let i in distanceAttacks) {
    if (gameFrame % 15 == 0) {
      distanceAttacks[i].animX = distanceAttacks[i].animX + 1;
    }
    if (distanceAttacks[i].animX > 7) distanceAttacks.splice(i, 1);
  }

  for (let i in distanceAttacks) {
    distanceAttacks[i].x -= distanceAttacks[i].speed * 2;
    if (distanceAttacks[i].x <= 110) {
      towerHealth = towerHealth - distanceAttacks[i].damage;
      let damage = towerHealth / distanceAttacks[i].damage;
      towerHealthStrip -= towerHealthStrip / damage;
      playSoundDamage();
      distanceAttacks.splice(i, 1);
    }
  }

  // анимация смерти

  for (let d in deadEnemies) {
    if (gameFrame % 8 == 0) {
      deadEnemies[d].animX = deadEnemies[d].animX + 1;
    }

    if (deadEnemies[d].animX > 6) deadEnemies.splice(d, 1);
  }

  for (let item in arrows) {
    if (arrows[item].x >= 1200 || arrows[item].y >= 800 || arrows[item].y < 5) {
      // arrows[item].x = 250; // остановка
      arrows.splice(item, 1); //  удаление
    }
  }
}
function draftHeath() {
  context.strokeStyle = "white";
  context.lineWidth = 2;
  context.strokeRect(20, 740, 122, 30);
  context.fillStyle = "red";
  context.fillRect(21, 741, towerHealthStrip, 28);

  context.font = "25px Comic Sans MS";
  context.fillStyle = "white";
  context.fillText(towerHealth, 60, 765);
}

function draftCoins() {
  context.drawImage(coin, 1250, 725, 50, 50);
  context.font = "30px Comic Sans MS";
  context.fillStyle = "gold";
  context.fillText(coins, 1300, 760);
}

function render() {
  context.drawImage(bg, 0, 0, 1400, 800);

  draftHeath();
  draftCoins();

  for (let i in enemies) {
    enemies[i].type.render(
      enemies[i].x,
      enemies[i].y,
      enemies[i].animation,
      enemies[i].healthStrip
    );
  }

  for (let i in arrows) {
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

  for (let i in distanceAttacks) {
    draw(
      context,
      expl,
      803,
      109,
      100,
      distanceAttacks[i].animX,
      100,
      100,
      distanceAttacks[i].x,
      distanceAttacks[i].y
    );
  }
  for (let i in deadEnemies) {
    deadEnemies[i].type.dead(
      deadEnemies[i].x,
      deadEnemies[i].y,
      deadEnemies[i].animX
    );
  }
}

game();
