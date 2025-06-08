let animation = true;
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

export {
  animation,
  toggleAnimation,
  degreesToRadians,
  setCoins,
  getCoins,
  pointingVolley,
  togglePointingVolley,
};
