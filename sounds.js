function playSoundShot() {
  const shotSfx = new Audio("assets/sounds/shot.mp3");
  shotSfx.play();
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

export { playSoundShot, playSoundHurt, playSoundDamage };
