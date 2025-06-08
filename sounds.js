function playSoundShot() {
  const shot = new Audio("assets/sounds/shot.mp3");
  shot.play();
}
function playSoundHurt() {
  let randomSound = Math.floor(Math.random() * 3 + 1);
  const hurtSound = new Audio(`assets/sounds/hurt/hit${randomSound}.wav`);
  hurtSound.play();
}
function playSoundDamage() {
  let randomSound = Math.floor(Math.random() * 2 + 1);
  const damageSound = new Audio(`assets/sounds/damage/${randomSound}.wav`);
  damageSound.play();
}
function playSoundGameOver(play) {
  const gameOverSound = new Audio(`assets/sounds/dead.mp3`);
  if (play == "play") {
    gameOverSound.play();
    gameOverSound.loop = true;
  } else if (play == "stop") {
    gameOverSound.load();
  }
}

function playSoundArrowLaunch() {
  const sound = new Audio("assets/sounds/arrowLaunch.mp3");
  sound.play();
}
function playSoundArrowHit() {
  const sound = new Audio("assets/sounds/arrowHit.mp3");
  sound.play();
}

const battleSound = new Audio("assets/sounds/background/battle.mp3");

export {
  // battleSound,
  playSoundShot,
  playSoundHurt,
  playSoundDamage,
  playSoundGameOver,
  playSoundArrowLaunch,
  playSoundArrowHit,
  // playSoundBattle,
};
