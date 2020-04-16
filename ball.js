class Ball {
  constructor() {
    this.velocity = createVector(random(4, 8));
    this.velocity.mult(5);
    this.position = createVector(width / 2, height / 2);
    this.paddlePos = createVector(width - 50, height / 2);
    this.r = 30;
    this.mouse = createVector(mouseX, mouseY);
    this.score = 0;
    this.compScore = 0;
    this.history = [];
  }
  run() {
    this.update();
    this.borders();
    this.show();
  }
  update() {
    this.position.add(this.velocity);
    this.paddlePos.y = this.position.y + 5;
    this.mouse.y = mouseY;
    let h = createVector(this.position.x, this.position.y);
    this.history.push(h);
    if (this.history.length > 5) this.history.splice(0, 1);
  }
  borders() {
    if (
      this.position.x <= this.r + 30 &&
      this.position.y > this.mouse.y - 75 &&
      this.position.y < this.mouse.y + 75
    ) {
      this.score += 1;
      let delta = this.position.y - this.mouse.y - 60 / 2;
      console.log(delta);
      this.velocity.x *= -1;
      this.velocity.y = delta * 0.35;
      this.velocity.mult(1.01);
    }
    if (this.position.x <= this.r) {
      this.position = createVector(width / 2, height / 2);
      this.velocity = createVector(random(4, 8));
      this.velocity.mult(5);
      if (random(1) > 0.5) this.velocity.mult(-1);
      this.score = 0;
      this.compScore += 1;
    }
    if (this.position.y <= this.r) this.velocity.y *= -1;
    if (
      this.position.x >= width - this.r - 30 &&
      this.position.y > this.paddlePos.y - 75 &&
      this.position.y < this.paddlePos.y + 75
    ) {
      let delta = this.position.y - this.paddlePos.y - 60 / 2;
      this.velocity.x *= -1;
      this.velocity.y = delta * 0.35;
      this.velocity.mult(1.1);
    }
    if (this.position.y >= height - this.r) this.velocity.y *= -1;
  }
  show() {
    for (let i = 0; i < this.history.length; i++) {
      let pos = this.history[i];
      fill(255);
      ellipse(pos.x, pos.y, i * 6, i * 6);
      text(this.score, width / 4, height / 4);
      text(this.compScore, width / 1.333, height / 4);
      rect(this.paddlePos.x, this.paddlePos.y - 75, 30, 150);
      rect(20, this.mouse.y - 75, 30, 150);
      textSize(40);
    }
  }
}
