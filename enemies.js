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

const greenGoblin = new Enemies(
  context,
  "assets/enemies/gob.png",
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

const redDemon = new Enemies(
  context,
  "assets/enemies/redDemon.png",
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

const smallDemon = new Enemies(
  context,
  "assets/enemies/smallDemon.png",
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
  192 //   deadSpriteWidth
);
const flyDemon = new Enemies(
  context,
  "assets/enemies/flyDemon.png",
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

const redDemonParameters = {
  type: redDemon,
  x: 1300,
  y: 200,
  health: 400,
  healthStrip: 50,
  animation: "run",
  deleteFlag: 0,
  damage: 5,
  speed: 1.3,
  size: 60,
  award: 5,
};
const smallDemonParameters = {
  type: smallDemon,
  x: 1300,
  y: 200,
  health: 200,
  healthStrip: 40,
  animation: "run",
  deleteFlag: 0,
  damage: 5,
  speed: 2,
  size: 50,
  award: 2,
  firstFrame: 0,
};

const greenGoblinParameters = {
  type: greenGoblin,
  x: 1300,
  y: 200,
  healthStrip: 40,
  health: 100,
  animation: "run",
  deleteFlag: 0,
  damage: 5,
  speed: 3,
  size: 50,
  award: 1,
};
const flyDemonParameters = {
  type: flyDemon,
  x: 1300,
  y: 200,
  healthStrip: 40,
  health: 100,
  animation: "run",
  deleteFlag: 0,
  damage: 10,
  speed: 2,
  size: 50,
  award: 3,
};

export {
  redDemon,
  flyDemon,
  smallDemon,
  greenGoblin,
  redDemonParameters,
  flyDemonParameters,
  smallDemonParameters,
  greenGoblinParameters,
};
