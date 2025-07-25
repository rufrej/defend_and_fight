import { playSoundArrowLaunch, playSoundArrowHit } from "./sounds.js";
import { canvas, volley, enemies, buttonVolley } from "./declarations.js";
import {
  animation,
  getData,
  pointingVolley,
  togglePointingVolley,
  toggleVolleyArrowsCooldown,
  volleyArrowsCoolDown,
} from "./helpers.js";

import {
  redDemon,
  flyDemon,
  smallDemon,
  greenGoblin,
  minotaurWhite,
  minotaurDark,
} from "./enemies.js";

// let volleyArrowsCoolDown = false;
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
      canvas.removeEventListener("click", pushArrow);
      togglePointingVolley();
    }
  }
  if (!volleyArrowsCoolDown) toggleVolleyArrowsCooldown();

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
    if (animation) {
      if (volleyArrowsCoolDown) {
        buttonVolley.textContent = " ";
        toggleVolleyArrowsCooldown();
      }
    }
  }, volleyArrowsCoolDownTime);
}

function volleyArrows() {
  let data = getData();
  let volleyArrowsLvl = data.volleyArrowsLvl;

  if (!volleyArrowsCoolDown && volleyArrowsLvl !== 0) {
    if (!pointingVolley) togglePointingVolley();
    canvas.addEventListener("click", pushArrow);
  }
}

function buildLineEnemies(array, quantity, gap, enemy, lvl) {
  let centerCoord = 400;
  let indentTop = gap;
  let indentButton = gap;

  const enem = Object.assign({}, enemy);
  enem.y = centerCoord;
  enem.lvl = lvl;
  enem.damage *= lvl;
  enem.health *= lvl;
  enem.award *= lvl;
  array.push(enem);
  for (let i = 1; i <= quantity - 1; i++) {
    const enem = Object.assign({}, enemy);
    enem.lvl = lvl;
    enem.damage *= lvl;
    enem.health *= lvl;
    enem.award *= lvl;

    if (i % 2 == 0) {
      enem.y = centerCoord + indentTop;

      indentTop += gap;
    } else {
      enem.y = centerCoord - indentButton;
      indentButton -= -gap;
    }

    array.push(enem);
    array.sort((next, prev) => next.y - prev.y);
    console.log(array);
  }
}

function wedgeEnemies(gameFrame, lvl) {
  // спавн врагов клином
  if (gameFrame == 100) {
    buildLineEnemies(enemies, 1, 0, greenGoblin, 1);
  }
  if (gameFrame == 120) {
    buildLineEnemies(enemies, 3, 50, greenGoblin, 1);
  }

  if (gameFrame == 140) {
    buildLineEnemies(enemies, 5, 50, greenGoblin, 1);
  }

  if (gameFrame == 160) {
    buildLineEnemies(enemies, 7, 50, greenGoblin, 1);
  }
  if (gameFrame == 180) {
    buildLineEnemies(enemies, 9, 50, greenGoblin, 1);
  }
  if (gameFrame == 200) {
    buildLineEnemies(enemies, 11, 50, greenGoblin, 1);
  }
}

function vaveEnemies(gameFrame, lvl) {
  if (gameFrame == 100) {
    buildLineEnemies(enemies, 6, 80, greenGoblin, lvl);
  }
  // if (gameFrame == 300) {
  //   buildLineEnemies(enemies, 6, 80, flyDemon, lvl);
  // }

  if (gameFrame == 500) {
    buildLineEnemies(enemies, 6, 80, smallDemon, lvl);
  }

  if (gameFrame == 700) {
    buildLineEnemies(enemies, 6, 80, redDemon, lvl);
  }
  if (gameFrame == 900) {
    buildLineEnemies(enemies, 5, 100, minotaurWhite, lvl);
  }
  if (gameFrame == 1100) {
    buildLineEnemies(enemies, 4, 120, minotaurDark, lvl);
  }
}

function infiniteVave(gameFrame, towerHealth) {
  let lvl = 1;

  while (towerHealth > 0) {
    if (gameFrame == 100) {
      buildLineEnemies(enemies, 6, 80, greenGoblin, lvl);
    }
    if (gameFrame == 300) {
      buildLineEnemies(enemies, 6, 80, flyDemon, lvl);
    }

    if (gameFrame == 500) {
      buildLineEnemies(enemies, 6, 80, smallDemon, lvl);
    }

    if (gameFrame == 700) {
      buildLineEnemies(enemies, 6, 80, redDemon, lvl);
    }
    if (gameFrame == 900) {
      buildLineEnemies(enemies, 5, 100, minotaurWhite, lvl);
    }
    if (gameFrame == 1100) {
      buildLineEnemies(enemies, 4, 120, minotaurDark, lvl);
    }
    lvl++;
  }
}

export {
  pushArrowLine,
  vaveEnemies,
  volleyArrows,
  infiniteVave,
  volleyArrowsCoolDown,
};
