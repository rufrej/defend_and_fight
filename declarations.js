const canvas = document.querySelector("#game");
const context = canvas.getContext("2d");

const CANVAS_WIDTH = (canvas.width = 1400);
const CANVAS_HEIGHT = (canvas.height = 800);

const buttonPause = document.querySelector("#buttonPause");
const crossbow = document.querySelector(".crossbow");
const fireball = document.querySelector("#fireball");

let boxBoundingRect = crossbow.getBoundingClientRect();

let boxCenter = {
  x: boxBoundingRect.left + boxBoundingRect.width / 2,
  y: boxBoundingRect.top + boxBoundingRect.height / 2,
};

const arrows = [];

const coin = new Image();
coin.src = "assets/coin.png";

const bg = new Image();
bg.src = "assets/fort.png";
const expl = new Image();
expl.src = "assets/enemies/explo.png";
// const fireball = new Image();
// fireball.src = "assets/enemies/fireball.gif";

export {
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
};
