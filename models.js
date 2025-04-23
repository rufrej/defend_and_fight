export function Enemies(context, imageUrl) {
  this.context = context;
  this.image = new Image();
  this.image.src = imageUrl;
  this.imageWidth = 1800;
  this.spriteWidth = 191;
  this.spriteHeight = 192;
  this.width = 120;
  this.height = 120;

  this.indentLeft = 1360;
  this.randomFrame = Math.floor(Math.random() * 7);
  this.frameX = 0;

  this.frameY = 0;
  this.staggerFrames = 6;
  this.frame = 7;
  this.deadFrameX = 0;

  this.render = function (x, y, animation, health) {
    let indentTop;
    if (animation == "run") {
      indentTop = 730;
    }
    if (animation == "hit") {
      indentTop = 310;
    }
    if (animation == "dead") {
      indentTop = 940;
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
    this.context.strokeRect(x + 34, y - 2, health / 2, 8);
    this.context.fillStyle = "red";
    this.context.fillRect(x + 35, y - 1, health / 2 - 2, 6);
  };

  this.dead = function (x, y, frame) {
    this.context.drawImage(
      this.image,
      this.indentLeft - this.spriteWidth * frame,
      940,
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
