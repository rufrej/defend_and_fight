import { Enemies } from "./models.js";

const canvas = document.querySelector("#game");
const context = canvas.getContext("2d");
const crossbow = document.querySelector(".crossbow");

const CANVAS_WIDTH = (canvas.width = 1400);
const CANVAS_HEIGHT = (canvas.height = 800);

const arrows = [];
const greenGoblins = [];

let boxBoundingRect = crossbow.getBoundingClientRect();

let boxCenter = {
  x: boxBoundingRect.left + boxBoundingRect.width / 2,
  y: boxBoundingRect.top + boxBoundingRect.height / 2,
};

let angle = null;

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

function game() {
  update();
  render();

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

  // движение
  for (let item in greenGoblins) {
    greenGoblins[item].x = greenGoblins[item].x - 3;

    //границы
    if (greenGoblins[item].x <= 135) {
      greenGoblins.splice(item, 1); //  удаление
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
}

game();
