import { context, coin } from "./declarations.js";

let paused = false;

function togglePause() {
  if (!paused) {
    paused = true;
  } else if (paused) {
    paused = false;
  }
}

function degreesToRadians(degrees) {
  return degrees * (Math.PI / 180);
}

function draw(
  context,
  image,
  indentLeft,
  spriteWidth,
  spriteHeight,
  frameX,
  width,
  height,
  x,
  y
) {
  context.drawImage(
    image,
    indentLeft - spriteWidth * frameX,
    0,
    spriteWidth,
    spriteHeight,
    x,
    y,
    width,
    height
  );
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
function draftHeath(towerHealth, towerHealthStrip) {
  context.strokeStyle = "white";
  context.lineWidth = 2;
  context.strokeRect(20, 740, 122, 30);
  context.fillStyle = "red";
  context.fillRect(21, 741, towerHealthStrip, 28);

  context.font = "25px Comic Sans MS";
  context.fillStyle = "white";
  context.fillText(towerHealth, 60, 765);
}

function draftCoins(coins) {
  context.drawImage(coin, 1250, 725, 50, 50);
  context.font = "30px Comic Sans MS";
  context.fillStyle = "gold";
  context.fillText(coins, 1300, 760);
}

export {
  paused,
  togglePause,
  degreesToRadians,
  drawArrow,
  draw,
  buildLineEnemies,
  draftCoins,
  draftHeath,
};
