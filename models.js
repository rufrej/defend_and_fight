export function Enemies(
  context,
  imageUrl,
  indentLeft,
  spriteSize,
  size,
  staggerFrames,
  animRunIndent,
  animRunFrame,
  animHitIndent,
  animHitFrame,
  animHitStaggerFrame,
  animDeadIndent,
  animDeadFrame,
  deadSpriteWidth
) {
  this.context = context;
  this.image = new Image();
  this.image.src = imageUrl;
  this.spriteWidth = spriteSize;
  this.spriteHeight = spriteSize;
  this.width = size;
  this.height = size;

  this.indentLeft = indentLeft;
  this.frameX = 0;
  this.staggerFrames = staggerFrames;
  this.animHitStaggerFrame = animHitStaggerFrame;
  this.animRunFrame = animRunFrame;
  this.animHitFrame = animHitFrame;

  this.animDeadFrame = animDeadFrame;
  this.animDeadIndent = animDeadIndent;
  this.frame = animRunFrame;

  this.render = function (x, y, animation, healthStrip) {
    let indentTop;

    if (animation == "run") {
      indentTop = animRunIndent;
    }
    if (animation == "hit") {
      this.frame = animHitFrame;
      this.staggerFrames = this.animHitStaggerFrame;
      indentTop = animHitIndent;
    }

    this.context.drawImage(
      this.image,
      this.indentLeft - this.spriteWidth * this.frameX,
      indentTop,
      this.spriteWidth,
      this.spriteHeight,
      x,
      y,
      this.width,
      this.height
    );
    this.context.lineWidth = 1;
    this.context.strokeStyle = "white";
    this.context.strokeRect(x + 30, y - 2, healthStrip + 20, 8); //healthStrip + 10  это кастыль для предотвращения движения полоски здоровья в обратную сторону, почему оно вообще происходит пока не понятно
    this.context.fillStyle = "red";
    this.context.fillRect(x + 31, y - 1, healthStrip + 20 - 2, 6);
  };

  this.dead = function (x, y, frame) {
    let spriteWidth = deadSpriteWidth;

    this.context.drawImage(
      this.image,
      this.indentLeft - spriteWidth * frame,
      animDeadIndent,
      this.spriteWidth,
      this.spriteHeight,
      x,
      y,
      this.width,
      this.height
    );
  };

  this.animate = function (gameFrame) {
    if (gameFrame % this.staggerFrames == 2) {
      if (this.frameX < this.frame) this.frameX++;
      else this.frameX = 0;
    }
  };
}
