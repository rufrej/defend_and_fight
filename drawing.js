import { context, coin, buttonVolley } from "./declarations.js";
import { getCoins, pointingVolley } from "./helpers.js";
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

function drawHeath(towerHealth, towerHealthStrip) {
  context.strokeStyle = "white";
  context.lineWidth = 2;
  context.strokeRect(20, 740, 122, 30);
  context.fillStyle = "red";
  context.fillRect(21, 741, towerHealthStrip, 28);

  context.font = "25px Comic Sans MS";
  context.fillStyle = "white";
  context.fillText(towerHealth, 60, 765);
}

function drawCoins() {
  context.drawImage(coin, 1250, 725, 50, 50);
  context.font = "30px Comic Sans MS";
  context.fillStyle = "gold";
  context.fillText(getCoins(), 1300, 760);
}

function drawPointingVolley(context, pageX) {
  if (pointingVolley) {
    context.beginPath();
    context.moveTo(pageX - 100, 230);
    context.lineTo(pageX - 100, 720);
    context.lineTo(pageX, 720);
    context.lineTo(pageX, 230);

    context.fillStyle = "rgba(231, 154, 31, 0.5)";
    context.closePath();
    context.fill();
  }
}

function drawButtonVolley(data) {
  if (data.volleyArrowsLvl > 0) {
    buttonVolley.classList.remove("display-none");
  }
}
export {
  draw,
  drawArrow,
  drawCoins,
  drawHeath,
  drawPointingVolley,
  drawButtonVolley,
};
