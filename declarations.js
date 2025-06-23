const canvas = document.querySelector("#game");
const context = canvas.getContext("2d");

const canvasWidth = (canvas.width = 1400);
const canvasHeight = (canvas.height = 800);

const buttonPause = document.querySelector("#buttonPause");
const buttonGameStart = document.querySelector("#buttonGameStart");
const buttonMenu = document.querySelector("#buttonMenu");
const buttonShop = document.querySelector("#buttonGameShop");
const buttonUpDamage = document.querySelector("#buttonShopDamage");
const buttonUpRecharge = document.querySelector("#buttonShopRecharge");
const buttonUpHealth = document.querySelector("#buttonShopTowerHealth");
const buttonUpVolley = document.querySelector("#buttonShopVolley");
const buttonUpVolleyWave = document.querySelector("#buttonShopVolleyWave");

const shop = document.querySelector("#shop");
const buttonVolley = document.querySelector("#buttonVolley");
const killCounter = document.querySelector("#game-over__kill-counter");
const awardCounter = document.querySelector("#game-over__award-counter");

const coinsIndicator = document.querySelector("#coinsIndicator");
const damageIndicator = document.querySelector("#damageIndicator");

const rechargeIndicator = document.querySelector("#rechargeIndicator");

const healthIndicator = document.querySelector("#healthIndicator");
const volleyIndicator = document.querySelector("#volleyIndicator");
const volleyWaveIndicator = document.querySelector("#volleyWaveIndicator");

const modalGameOver = document.querySelector("#gameOver");
const modalMenu = document.querySelector("#menu");
const crossbow = document.querySelector(".crossbow");

let boxBoundingRect = crossbow.getBoundingClientRect();

let boxCenter = {
  x: boxBoundingRect.left + boxBoundingRect.width / 2,
  y: boxBoundingRect.top + boxBoundingRect.height / 2,
};

const arrows = [];
let volley = [];
let enemies = [];
let deadEnemies = [];
let distanceAttacks = [];

const coin = new Image();
coin.src = "assets/coin.avif";

const bg = new Image();
bg.src = "assets/fort.avif";
const expl = new Image();
expl.src = "assets/enemies/expl.avif";

const fireball = new Image();
fireball.src = "assets/enemies/fireball.avif";
const arrow = new Image();
arrow.src = "assets/arrow.avif";

export {
  canvas,
  context,
  canvasWidth,
  canvasHeight,
  buttonPause,
  crossbow,
  boxCenter,
  arrows,
  enemies,
  deadEnemies,
  distanceAttacks,
  coin,
  bg,
  expl,
  fireball,
  modalGameOver,
  modalMenu,
  buttonGameStart,
  buttonShop,
  shop,
  buttonMenu,
  killCounter,
  awardCounter,
  buttonVolley,
  arrow,
  volley,
  coinsIndicator,
  damageIndicator,
  rechargeIndicator,
  healthIndicator,
  buttonUpDamage,
  buttonUpRecharge,
  buttonUpHealth,
  buttonUpVolley,
  buttonUpVolleyWave,
  volleyIndicator,
  volleyWaveIndicator,
};
