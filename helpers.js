import {
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
} from "./declarations.js";

let animation = false;
let pointingVolley = false;

function toggleAnimation() {
  if (!animation) {
    animation = true;
  } else if (animation) {
    animation = false;
  }
}

function togglePointingVolley() {
  if (!pointingVolley) {
    pointingVolley = true;
  } else if (pointingVolley) {
    pointingVolley = false;
  }
}

function degreesToRadians(degrees) {
  return degrees * (Math.PI / 180);
}

function setCoins(coins) {
  localStorage.setItem("money", coins);
}

function getCoins() {
  let money = localStorage.getItem("money");
  if (localStorage.getItem("money") == NaN) return 0;
  return +money;
}

function setData(item) {
  localStorage.setItem("data", JSON.stringify(item));
}

function getData() {
  let data = localStorage.getItem("data");
  return (
    JSON.parse(data) ?? {
      damage: 50,
      damageLvl: 1,
      arrowSpeed: 20,
      rechargeTime: 900,
      rechargeLvl: 1,
      towerHealth: 110,
      towerHealthLvl: 1,
      volleyArrowsLvl: 0,
      volleyArrowsDamage: 100,
      volleyArrowsWave: 1,
    }
  );
}

function updateShopData() {
  const data = getData();
  coinsIndicator.innerHTML = getCoins();
  let crossbowDamage = data.damage;
  let damageLvl = data.damageLvl;

  let rechargeTime = data.rechargeTime;
  let rechargeLvl = data.rechargeLvl;

  let towerHealth = data.towerHealth;
  let towerHealthLvl = data.towerHealthLvl;

  let volleyArrowsLvl = data.volleyArrowsLvl;
  let volleyArrowsDamage = data.volleyArrowsDamage;
  let volleyArrowsWave = data.volleyArrowsWave;
  let damageNextLvl = data.damage + data.damage / 10;
  let rechargeNextLvl = data.rechargeTime - data.rechargeTime / 20;
  let towerHealthNextLvl = data.towerHealth + 10;

  let volleyArrowsNextLvl =
    data.volleyArrowsDamage + data.volleyArrowsDamage / 10;

  let volleyArrowsWaveNextLvl = data.volleyArrowsWave * 3000;

  damageIndicator.innerHTML = `damage lvl ${damageLvl} : <span class="colored-red">${Math.round(
    crossbowDamage
  )}</span>
    --> <span class="colored-red">${Math.round(damageNextLvl)}</span>`;
  buttonUpDamage.innerHTML = `up damage  <span class ="colored-gold">${
    damageLvl * 100
  }</span>`;
  //
  rechargeIndicator.innerHTML = `recharge lvl ${rechargeLvl} : <span class="colored-red">${Math.round(
    rechargeTime
  )}</span>
    --> <span class="colored-red">${Math.round(rechargeNextLvl)}</span>`;
  buttonUpRecharge.innerHTML = `up recharge  <span class ="colored-gold">${
    rechargeLvl * 100
  }</span>`;
  //
  healthIndicator.innerHTML = `tower health lvl ${towerHealthLvl} : <span class="colored-red">${Math.round(
    towerHealth
  )}</span>
    --> <span class="colored-red">${Math.round(towerHealthNextLvl)}</span>`;
  buttonUpHealth.innerHTML = `up health  <span class ="colored-gold">${
    towerHealthLvl * 200
  }</span>`;

  if (volleyArrowsLvl == 0) {
    buttonUpVolleyWave.classList.add("display-none");
    volleyWaveIndicator.classList.add("display-none");
    buttonUpVolley.innerHTML =
      'volley arrows <span class ="colored-gold"> 3000</span>';
    volleyIndicator.classList.add("display-none");
  } else {
    buttonUpVolleyWave.classList.remove("display-none");
    buttonUpVolleyWave.innerHTML = `up wave : ${volleyArrowsWave}  <span class ="colored-gold">${volleyArrowsWaveNextLvl}</span> `;
    buttonUpVolley.innerHTML = `up volley <span class ="colored-gold">${
      volleyArrowsLvl * 500
    }</span>`;
    volleyIndicator.classList.remove("display-none");
    volleyWaveIndicator.classList.remove("display-none");
    volleyIndicator.innerHTML = `volley lvl ${volleyArrowsLvl} :<span class="colored-red">${volleyArrowsDamage}</span>
     --> <span class="colored-red">${volleyArrowsNextLvl}</span> `;

    volleyWaveIndicator.innerHTML = `volley wave lvl <span class="colored-red">${volleyArrowsWave}</span>
     --> <span class="colored-red">${++volleyArrowsWave}</span> `;
  }
}

export {
  animation,
  toggleAnimation,
  degreesToRadians,
  setCoins,
  getCoins,
  pointingVolley,
  togglePointingVolley,
  setData,
  getData,
  updateShopData,
};
