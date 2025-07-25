import { context } from "./declarations.js";

import { Enemies } from "./models.js";

// подсказка
//   context,
//   imageUrl,
//   indentLeft, отсуп к правому краю от которого пойдет первый кадр
//   spriteSize, размеры одного кадра (высота и ширина одинаковые)
//   size, размеры на холсте(высота и ширина одинаковые)
//   staggerFrames, переменная для регулеровки скорости смены кадров
//   animRunIndent, отступ с верху до анимации движения
//   animRunFrame, количество кадров
//   animHitIndent, отступ с верху до анимации атаки
//   animHitFrame,количество кадров
//   animHitStaggerFrame переменная для регулеровки скорости смены кадров анимации атаки
//   animDeadIndent отступ с верху до анимации смерти
//   animDeadFrame,  количество кадров
//   deadSpriteWidth  , ширина кадра анимации смерти,нужна т.к. у некоторых спрайтов она существенно отличаеться от изначальной

const greenGoblinSprite = new Enemies(
  context,
  "assets/enemies/gob.avif",
  1360, //   indentLeft
  192, //   spriteSize
  120, //   size
  6, //   staggerFrames
  750, //   animRunIndent
  7, //   animRunFrame
  310, //   animHitIndent
  7, //   animHitFrame
  7, //   animHitStaggerFrame
  940, //   animDeadIndent
  7, //   animDeadFrame,
  192 //   deadSpriteWidth
);

const redDemonSprite = new Enemies(
  context,
  "assets/enemies/redDemon.avif",
  1358, //   indentLeft
  192, //   spriteSize
  130, //   size
  6, //   staggerFrames
  250, //   animRunIndent
  7, //   animRunFrame
  490, //   animHitIndent
  4, //   animHitFrame
  11, //   animHitStaggerFrame
  940, //   animDeadIndent
  5, //   animDeadFrame,
  213 //   deadSpriteWidth
);

const smallDemonSprite = new Enemies(
  context,
  "assets/enemies/smallDemon.avif",
  1358, //   indentLeft
  192, //   spriteSize
  130, //   size
  6, //   staggerFrames
  290, //   animRunIndent
  6, //   animRunFrame
  490, //   animHitIndent
  4, //   animHitFrame
  11, //   animHitStaggerFrame
  940, //   animDeadIndent
  5, //   animDeadFrame,
  190 //   deadSpriteWidth
);
const flyDemonSprite = new Enemies(
  context,
  "assets/enemies/flyDemon.webp",
  1358, //   indentLeft
  192, //   spriteSize
  130, //   size
  12, //   staggerFrames
  290, //   animRunIndent
  4, //   animRunFrame
  520, //   animHitIndent
  4, //   animHitFrame
  11, //   animHitStaggerFrame
  940, //   animDeadIndent
  5, //   animDeadFrame,
  192 //   deadSpriteWidth
);

const minotaurWhiteSprite = new Enemies(
  context,
  "assets/enemies/minotaurWhite.avif",
  1390, //   indentLeft
  192, //   spriteSize
  130, //   size
  6, //   staggerFrames
  250, //   animRunIndent
  7, //   animRunFrame
  490, //   animHitIndent
  3, //   animHitFrame
  16, //   animHitStaggerFrame
  900, //   animDeadIndent
  5, //   animDeadFrame,
  230 //   deadSpriteWidth
);
const minotaurDarkSprite = new Enemies(
  context,
  "assets/enemies/minotaurDark.avif",
  1370, //   indentLeft
  192, //   spriteSize
  130, //   size
  6, //   staggerFrames
  250, //   animRunIndent
  7, //   animRunFrame
  490, //   animHitIndent
  3, //   animHitFrame
  16, //   animHitStaggerFrame
  900, //   animDeadIndent
  5, //   animDeadFrame,
  230 //   deadSpriteWidth
);

const redDemon = {
  sprite: redDemonSprite,
  x: 1300,
  y: 200,
  health: 400,
  healthStrip: 60,
  animation: "run",
  deleteFlag: 0,
  damage: 10,
  speed: 1.3,
  size: 60,
  award: 7,
};
const minotaurWhite = {
  sprite: minotaurWhiteSprite,
  x: 1300,
  y: 200,
  health: 600,
  healthStrip: 65,
  animation: "run",
  deleteFlag: 0,
  damage: 12,
  speed: 1.5,
  size: 60,
  award: 8,
};
const minotaurDark = {
  sprite: minotaurDarkSprite,
  x: 1300,
  y: 200,
  health: 1000,
  healthStrip: 70,
  animation: "run",
  deleteFlag: 0,
  damage: 15,
  speed: 1.5,
  size: 60,
  award: 10,
};
const smallDemon = {
  sprite: smallDemonSprite,
  x: 1300,
  y: 200,
  health: 200,
  healthStrip: 59,
  animation: "run",
  deleteFlag: 0,
  damage: 5,
  speed: 2,
  size: 50,
  award: 3,
  firstFrame: 0,
};

const greenGoblin = {
  sprite: greenGoblinSprite,
  x: 1300,
  y: 200,
  healthStrip: 50,
  health: 100,
  animation: "run",
  deleteFlag: 0,
  damage: 5,
  speed: 3,
  size: 60,
  award: 2,
};
const flyDemon = {
  sprite: flyDemonSprite,
  x: 1300,
  y: 200,
  healthStrip: 50,
  health: 100,
  animation: "run",
  deleteFlag: 0,
  damage: 10,
  speed: 2,
  size: 70,
  award: 3,
};

export {
  redDemon,
  flyDemon,
  smallDemon,
  greenGoblin,
  minotaurWhite,
  minotaurDark,
  //
  redDemonSprite,
  flyDemonSprite,
  smallDemonSprite,
  greenGoblinSprite,
  minotaurWhiteSprite,
  minotaurDarkSprite,
};
