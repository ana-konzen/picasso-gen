const hairParams = {
  type: 0,
};

const noseParams = {
  type: 0,
  size: 3,
  position: { x: 1.5, y: -6 },
  rotate: 0,
  flip: false,
};

const mouthParams = {
  type: 0,
  size: 3.7,
  position: { x: 12, y: 57 },
  rotate: 0,
  flip: false,
};

const rightEyeParams = {
  type: 0,
  size: 3,
  position: { x: 54.41, y: -28 },
  rotate: 0,
  lashes: true,
  flip: false,
};

const leftEyeParams = {
  type: 1,
  size: 3,
  position: { x: -54, y: -26 },
  rotate: 0,
  lashes: true,
  flip: true,
};

const rightBrowParams = {
  type: 0,
  size: 3,
  position: { x: 35, y: -44 },
  rotate: 0,
  flip: true,
};

const leftBrowParams = {
  type: 0,
  size: 3.57,
  position: { x: -45.6, y: -50 },
  rotate: 0,
  flip: false,
};

const brows = [];
const numBrows = 10;

const eyes = [];
const lashes = [];
const numEyes = 6;

const noses = [];
const numNoses = 5;

const mouths = [];
const numMouths = 7;

const hairs = [];
const numHairs = 9;

const pane = new Tweakpane.Pane({ title: "Character Creator" });

const hairMenu = pane.addFolder({ title: "Hair" });
hairMenu.addInput(hairParams, "type", { min: 0, max: numHairs - 1, step: 1 });

const featuresMenu = pane.addFolder({ title: "Features" });

createMenu(numBrows, leftBrowParams, "Eyebrows", rightBrowParams);
createMenu(numEyes, leftEyeParams, "Eyes", rightEyeParams);
createMenu(numNoses, noseParams, "Nose");
createMenu(numMouths, mouthParams, "Mouth");

let backgroundimg;

function preload() {
  loadFeature(hairs, "new_hairs", "hair", numHairs);
  loadFeature(noses, "noses", "nose", numNoses);
  loadFeature(eyes, "eyes", "eye", numEyes);
  loadFeature(lashes, "eyes", "lashes", numEyes);
  loadFeature(brows, "right-brows", "brow", numBrows);
  loadFeature(mouths, "mouths", "mouth", numMouths);
  backgroundimg = loadImage("./AdobeStock_91053550.jpeg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  angleMode(DEGREES);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  image(backgroundimg, width / 2, height / 2, width, height);
  noStroke();

  image(
    hairs[hairParams.type],
    width / 2,
    height / 2,
    hairs[hairParams.type].width / 2.8,
    hairs[hairParams.type].height / 2.8
  );

  drawFeature(brows, rightBrowParams);
  drawFeature(brows, leftBrowParams);

  if (rightEyeParams.lashes) {
    drawFeature(lashes, rightEyeParams);
  } else {
    drawFeature(eyes, rightEyeParams);
  }
  if (leftEyeParams.lashes) {
    drawFeature(lashes, leftEyeParams);
  } else {
    drawFeature(eyes, leftEyeParams);
  }
  drawFeature(noses, noseParams);
  drawFeature(mouths, mouthParams);
}

function createMenu(num, params, title, params2 = 0) {
  let menu = featuresMenu.addFolder({ title: title });
  if (params2 === 0) {
    createOptions(num, params, menu);
  } else {
    const tab = menu.addTab({ pages: [{ title: "Left" }, { title: "Right" }] });
    createOptions(num, params, tab.pages[0]);
    createOptions(num, params2, tab.pages[1]);
  }
}

function createOptions(num, params, menu) {
  menu.addInput(params, "type", { min: 0, max: num - 1, step: 1 });

  menu.addInput(params, "size", { min: 1, max: 5 });
  menu.addInput(params, "position", {
    x: { min: -100, max: 100 },
    y: { min: -100, max: 100 },
  });
  menu.addInput(params, "rotate", { min: -180, max: 180 });
  menu.addInput(params, "flip");
  if (params === rightEyeParams || params === leftEyeParams) {
    menu.addInput(params, "lashes");
  }
}

function loadFeature(arr, folder, file, num) {
  for (let i = 1; i <= num; i++) {
    arr.push(loadImage(`./assets/${folder}/${file}${i}.png`));
  }
}

function drawFeature(arr, params) {
  const feature = arr[params.type];
  const factor = map(params.size, 1, 5, 7, 1);
  const posx = map(
    params.position.x,
    -100,
    100,
    width / 2 - 150,
    width / 2 + 150
  );
  const posy = map(
    params.position.y,
    -100,
    100,
    height / 2 - 250,
    height / 2 + 150
  );
  push();
  translate(posx, posy);
  if (params.flip) {
    scale(-1, 1);
  }
  rotate(params.rotate);

  image(feature, 0, 0, feature.width / factor, feature.height / factor);
  pop();
}
