let b = "";
function setup() {
  frameRate(60);
  createCanvas(1600, 900);
  b = new Ball();
}
function draw() {
  background(51);
  b.run();
}
