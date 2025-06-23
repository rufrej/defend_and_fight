import { playSoundArrowLaunch, playSoundArrowHit } from "./sounds.js";
import { canvas, volley, enemies, buttonVolley } from "./declarations.js";
import {
  animation,
  getData,
  pointingVolley,
  togglePointingVolley,
} from "./helpers.js";

import {
  redDemon,
  flyDemon,
  smallDemon,
  greenGoblin,
  minotaurWhite,
  minotaurDark,
} from "./enemies.js";

let volleyArrowsCoolDown = false;
let volleyArrowsCoolDownTime = 9000;

function pushArrowLine(event, delay) {
  if (!volleyArrowsCoolDown) {
    setTimeout(() => {
      playSoundArrowLaunch();
    }, delay - 400);
    setTimeout(() => {
      let y = -100;
      let targer = 600;
      for (let i = 1; i <= 10; i++) {
        volley.push({
          x: event.pageX - 800,
          y: y,
          targerCoord: targer,
        });

        y -= 50;
        targer -= 50;
      }
      playSoundArrowHit();
    }, delay);
  }
}

function pushArrow(event) {
  if (!volleyArrowsCoolDown) {
    if (animation) {
      let data = getData();
      const vaves = data.volleyArrowsWave;
      let delay = 500;

      for (let i = 1; i <= vaves; i++) {
        pushArrowLine(event, delay);
        delay += 200;
      }
      // pushArrowLine(event, 500);
      // pushArrowLine(event, 700);
      // pushArrowLine(event, 1000);

      canvas.removeEventListener("click", pushArrow);
      togglePointingVolley();
    }
  }
  volleyArrowsCoolDown = true;

  buttonVolley.style.background = "rgb(87, 18, 9)";

  let cd = volleyArrowsCoolDownTime - 1000;

  const coolDownInterval = setInterval(() => {
    if (animation) {
      buttonVolley.textContent = cd / 1000;

      cd -= 1000;
    }
  }, 1000);

  setTimeout(() => {
    if (animation) {
      clearInterval(coolDownInterval);

      buttonVolley.textContent = " ";
      buttonVolley.style.background = " rgb(231, 39, 14)";
    }
  }, volleyArrowsCoolDownTime);

  setTimeout(() => {
    if (animation) volleyArrowsCoolDown = false;
  }, volleyArrowsCoolDownTime);
}

function volleyArrows() {
  let data = getData();
  let volleyArrowsLvl = data.volleyArrowsLvl;
  console.log(volleyArrowsLvl);
  if (!volleyArrowsCoolDown && volleyArrowsLvl !== 0) {
    if (!pointingVolley) togglePointingVolley();
    canvas.addEventListener("click", pushArrow);
  }
}

function buildLineEnemies(array, quantity, gap, enemy) {
  let centerCoord = 400;
  let indentTop = gap;
  let indentButton = gap;
  const enem = Object.assign({}, enemy);
  enem.y = centerCoord;
  array.push(enem);
  for (let i = 1; i <= quantity - 1; i++) {
    const enem = Object.assign({}, enemy);

    if (i % 2 == 0) {
      enem.y = centerCoord + indentTop;

      indentTop += gap;
    } else {
      enem.y = centerCoord - indentButton;
      indentButton -= -gap;
    }

    array.push(enem);
    array.sort((next, prev) => next.y - prev.y);
  }
}

function vaveEnemies(gameFrame) {
  if (gameFrame == 100) {
    buildLineEnemies(enemies, 6, 80, greenGoblin);
  }
  if (gameFrame == 300) {
    buildLineEnemies(enemies, 6, 80, flyDemon);
  }

  if (gameFrame == 500) {
    buildLineEnemies(enemies, 6, 80, smallDemon);
  }

  if (gameFrame == 700) {
    buildLineEnemies(enemies, 6, 80, redDemon);
  }
  if (gameFrame == 900) {
    buildLineEnemies(enemies, 5, 100, minotaurWhite);
  }
  if (gameFrame == 1100) {
    buildLineEnemies(enemies, 4, 120, minotaurDark);
  }
}

export { pushArrowLine, vaveEnemies, volleyArrows };
