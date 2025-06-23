import {
  getCoins,
  getData,
  setCoins,
  setData,
  updateShopData,
} from "./helpers.js";

import { playSoundButtonClick, playSoundNotCompleted } from "./sounds.js";
const data = getData();
let coins = getCoins();

function handleClickButtonShop() {
  updateShopData();
  shop.classList.toggle("display-none");

  const button = document.createElement("button");
  button.innerHTML = "+10000";
  button.classList.add("button-shop", "button-cheat");
  shop.append(button);
  button.addEventListener("click", () => {
    coins += 10000;
    setCoins(coins);
    updateShopData();
  });
}

function saveChanges(levelUpCost) {
  coins -= levelUpCost;
  setCoins(coins);
  setData(data);
  updateShopData();
}

function handleClickButtonUpDamage() {
  const levelUpCost = data.damageLvl * 100;
  if (levelUpCost <= coins) {
    playSoundButtonClick();
    let damageNextLvl = data.damage + data.damage / 10;
    data.damage = Math.round(damageNextLvl);
    data.damageLvl++;
    data.arrowSpeed += 0.5;
    saveChanges(levelUpCost);
  } else playSoundNotCompleted();
}
function handleClickButtonUpRate() {
  const levelUpCost = data.rechargeLvl * 100;
  if (levelUpCost <= coins) {
    playSoundButtonClick();
    let rechargeNextLvl = data.rechargeTime - data.rechargeTime / 20;
    data.rechargeTime = Math.round(rechargeNextLvl);
    data.rechargeLvl++;
    saveChanges(levelUpCost);
  } else playSoundNotCompleted();
}
function handleClickButtonUpHealth() {
  const levelUpCost = data.towerHealthLvl * 200;
  if (levelUpCost <= coins) {
    playSoundButtonClick();
    let towerHealthNextLvl = data.towerHealth + 10;
    data.towerHealth = Math.round(towerHealthNextLvl);
    data.towerHealthLvl++;
    saveChanges(levelUpCost);
  } else playSoundNotCompleted();
}
function handleClickButtonUpVolley() {
  let levelUpCost;
  if (data.volleyArrowsLvl == 0) levelUpCost = 3000;
  else levelUpCost = data.volleyArrowsLvl * 500;

  if (levelUpCost <= coins) {
    playSoundButtonClick();
    let volleyArrowsNextLvl = data.volleyArrowsDamage + 10;
    data.volleyArrowsDamage = Math.round(volleyArrowsNextLvl);
    data.volleyArrowsLvl++;
    saveChanges(levelUpCost);
    buttonVolley.classList.remove("display-none");
  } else playSoundNotCompleted();
}
function handleClickButtonUpVolleyWave() {
  let levelUpCost = data.volleyArrowsWave * 3000;
  if (levelUpCost <= coins) {
    playSoundButtonClick();
    data.volleyArrowsWave++;
    saveChanges(levelUpCost);
  } else playSoundNotCompleted();
}

export {
  handleClickButtonShop,
  handleClickButtonUpDamage,
  handleClickButtonUpHealth,
  handleClickButtonUpRate,
  handleClickButtonUpVolley,
  handleClickButtonUpVolleyWave,
};
