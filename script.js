import {
  canvas,
  context,
  buttonPause,
  crossbow,
  boxCenter,
  arrows,
  bg,
  fireball,
  modalGameOver,
  modalMenu,
  buttonGameStart,
  buttonMenu,
  killCounter,
  awardCounter,
  buttonVolley,
  arrow,
  volley,
  enemies,
  deadEnemies,
  distanceAttacks,
  buttonShop,
  shop,
  damageIndicator,
  damageIndicatorNextLevel,
  rateIndicator,
  rateIndicatorNextLevel,
  healthIndicator,
  healthIndicatorNextLevel,
} from "./declarations.js";

import {
  animation,
  toggleAnimation,
  degreesToRadians,
  setCoins,
  getCoins,
  pointingVolley,
  togglePointingVolley,
} from "./helpers.js";

import {
  draw,
  drawArrow,
  drawCoins,
  drawHeath,
  drawPointingVolley,
} from "/drawing.js";

import {
  playSoundShot,
  playSoundHurt,
  playSoundDamage,
  playSoundGameOver,
} from "./sounds.js";

import {
  redDemonSprite,
  flyDemonSprite,
  smallDemonSprite,
  greenGoblinSprite,
  minotaurWhiteSprite,
  minotaurDarkSprite,
} from "./enemies.js";

import { pushArrowLine, vaveEnemies, volleyArrows } from "./mechanics.js";

let angle;
let coolDown = false;
let rechargeTime = 130;
let arrowsSpeed = 30;
let gameFrame = 0;
let towerHealth = 110;
let towerHealthStrip = 120;
let crossbowDamage = 50;
let volleyDamage = 100;
let coins = getCoins();
let levelAward = 0;
let levelKills = 0;
let pageX;

// const battleSound = new Audio(`assets/sounds/background/battle2.mp3`);

// function playSoundBattle() {
//   setTimeout(() => {
//     battleSound.play();
//     battleSound.loop = true;
//   }, 100);
// }

function showModalGameOver() {
  killCounter.innerHTML = `ENEMIES KILLED : ${levelKills}`;
  awardCounter.innerHTML = `PROFIT : ${levelAward}`;
  toggleAnimation();
  modalGameOver.style.animation = "appearance 2s linear";
  modalGameOver.showModal();
  enemies.splice(0, enemies.length);
  distanceAttacks.splice(0, enemies.length);
  deadEnemies.splice(0, enemies.length);
  // setTimeout(() => {
  //   playSoundGameOver("play");
  // }, 500);
}

function showModalMenu() {
  if (animation) {
    toggleAnimation();
  }
  towerHealth = 110;
  towerHealthStrip = 120;
  modalMenu.showModal();
}

window.addEventListener("keydown", function (e) {
  const key = e.keyCode;
  if (key === 80) {
    toggleAnimation();
  }
});
window.addEventListener("keydown", function (e) {
  const key = e.keyCode;
  if (key === 90) {
    if (animation) volleyArrows();
  }
});

buttonVolley.addEventListener("click", volleyArrows);

buttonPause.addEventListener("click", toggleAnimation);

buttonShop.addEventListener("click", () => {
  damageIndicator.textContent = crossbowDamage;

  shop.classList.toggle("display-none");
});

buttonMenu.addEventListener("click", () => {
  // playSoundGameOver("stop");
  modalGameOver.close();
  showModalMenu();
});

buttonGameStart.addEventListener("click", () => {
  modalMenu.close();
  if (!animation) {
    toggleAnimation();
    levelAward = 0;
    levelKills = 0;
  }

  // playSoundBattle();
  gameFrame = 0;
});

canvas.addEventListener("mousemove", (e) => {
  pageX = e.pageX;
  angle =
    Math.atan2(e.pageX - boxCenter.x, -(e.pageY - boxCenter.y)) *
    (180 / Math.PI);
  if (angle <= 20) angle = 20;
  if (angle >= 160) angle = 160;

  crossbow.style.transform = `rotate(${angle}deg)`;
});

function shot() {
  if (animation == true) {
    if (angle <= 10) angle = 10;
    if (angle >= 170) angle = 170;

    if (coolDown == false) {
      let timerId = setTimeout(function tick() {
        if (animation == true) {
          playSoundShot();

          arrows.push({
            x: 80,
            y: 390,
            speed: arrowsSpeed,
            direction: angle - 90,
          });
          arrows.push({
            x: 80,
            y: 390,
            speed: arrowsSpeed,
            direction: angle - 91,
          });
          arrows.push({
            x: 80,
            y: 390,
            speed: arrowsSpeed,
            direction: angle - 89,
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

window.onload = function () {
  showModalMenu();
};

function game() {
  if (animation) {
    update();
    render();
  }
  requestAnimationFrame(game);
}

function update() {
  gameFrame++;

  vaveEnemies(gameFrame);

  if (towerHealth <= 0) {
    showModalGameOver();
    // battleSound.load();
  }
  greenGoblinSprite.animate(gameFrame);
  redDemonSprite.animate(gameFrame);
  smallDemonSprite.animate(gameFrame);
  flyDemonSprite.animate(gameFrame);
  minotaurWhiteSprite.animate(gameFrame);
  minotaurDarkSprite.animate(gameFrame);

  //физика стрелы
  for (let i in arrows) {
    arrows[i].x +=
      Math.cos(degreesToRadians(arrows[i].direction)) * arrows[i].speed;
    arrows[i].y +=
      Math.sin(degreesToRadians(arrows[i].direction)) * arrows[i].speed;
  }

  //залп стрел
  for (let i in volley) {
    volley[i].x += 20;
    volley[i].y += 20;

    if (volley[i].y >= volley[i].targerCoord) {
      volley[i].y = volley[i].targerCoord;
      volley.splice(i, 1);
    }
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
    if (enemies[item].sprite == flyDemonSprite) {
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

    // проверка на попадание стрелы арбалета
    for (let j in arrows) {
      if (
        Math.abs(enemies[item].x + 30 - arrows[j].x) < 20 &&
        Math.abs(enemies[item].y + 70 - arrows[j].y) < enemies[item].size
      ) {
        arrows.splice(j, 1);
        playSoundHurt();
        enemies[item].health -= crossbowDamage;
        let damage = enemies[item].health / crossbowDamage;
        enemies[item].healthStrip -= enemies[item].healthStrip / damage;

        if (enemies[item].health <= 0) enemies[item].deleteFlag = 1;

        break;
      }
    }
    // проверка на попадание стрелы залпа
    for (let i in volley) {
      if (
        Math.abs(enemies[item].x + 30 - volley[i].x) < 20 &&
        Math.abs(enemies[item].y + 10 - volley[i].y) < enemies[item].size
      ) {
        volley.splice(i, 1);
        playSoundHurt();
        enemies[item].health -= volleyDamage;
        let damage = enemies[item].health / volleyDamage;
        enemies[item].healthStrip -= enemies[item].healthStrip / damage;

        if (enemies[item].health <= 0) enemies[item].deleteFlag = 1;
      }
    }
    if (enemies[item].deleteFlag == 1) {
      let deadCoordX = enemies[item].x;
      let deadCoordY = enemies[item].y;
      deadEnemies.push({
        sprite: enemies[item].sprite,
        x: deadCoordX,
        y: deadCoordY,
        animX: 0,
      });
      coins += enemies[item].award;
      setCoins(coins);
      levelAward += enemies[item].award;
      levelKills += 1;
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

  // границы для стрел
  for (let item in arrows) {
    if (arrows[item].x >= 1200 || arrows[item].y >= 800 || arrows[item].y < 5) {
      // arrows[item].x = 250; // остановка
      arrows.splice(item, 1); //  удаление
    }
  }
}

function render() {
  context.drawImage(bg, 0, 0, 1400, 800);

  drawHeath(towerHealth, towerHealthStrip);
  drawCoins(coins);

  drawPointingVolley(context, pageX); // отрисовка зоны для залпа стрел
  for (let i in enemies) {
    enemies[i].sprite.render(
      enemies[i].x,
      enemies[i].y,
      enemies[i].animation,
      enemies[i].healthStrip
    );
  }
  // рендер стрел
  for (let i in arrows) {
    context.beginPath();
    drawArrow(
      context,
      arrows[i].x,
      arrows[i].y,
      arrows[i].x + Math.cos(degreesToRadians(arrows[i].direction)) * 40, // поворот под нужным углом
      arrows[i].y + Math.sin(degreesToRadians(arrows[i].direction)) * 40
    );
    context.stroke();
  }

  //залп стрел
  for (let i in volley) {
    context.drawImage(arrow, volley[i].x, volley[i].y);
  }
  // анимация дистанционных атак
  for (let i in distanceAttacks) {
    draw(
      context,
      fireball,
      1100,
      220,
      184,
      distanceAttacks[i].animX,
      100,
      100,
      distanceAttacks[i].x,
      distanceAttacks[i].y
    );
  }

  // анимация смерти
  for (let i in deadEnemies) {
    deadEnemies[i].sprite.dead(
      deadEnemies[i].x,
      deadEnemies[i].y,
      deadEnemies[i].animX
    );
  }
}
game();
