class Ball {
  constructor() {
    this.velocity = createVector(random(4, 8));
    this.velocity.mult(-2.5);
    this.position = createVector(width / 2, height / 2);
    this.paddlePos = createVector(width - 40, height / 2);
    this.r = 30;
    this.mouse = createVector(mouseX, mouseY);
    this.score = 0;
    this.compScore = 0;
    this.history = [];
    this.maxSpeed;
  }
  run() {
    this.update();
    this.borders();
    this.paddleCollision();
    this.show();
  }
  update() {
    this.position.add(this.velocity);
    if (this.position.y > 75 && this.position.y < height - 75) {
      this.paddlePos.y = this.position.y + 5;
    }
    if (mouseY > 75 && mouseY < height - 75) this.mouse.y = mouseY;
    let h = createVector(this.position.x, this.position.y);
    this.history.push(h);
    if (this.history.length > 5) this.history.shift();
  }
  paddleCollision() {
    //player
    if (
      this.position.x <= 50 &&
      this.position.x >= this.r &&
      this.position.y > this.mouse.y - 85 &&
      this.position.y < this.mouse.y + 85
    ) {
      this.score += 1;
      let delta = this.position.y - this.mouse.y;
      let maxBounceAngle = (5 * 3.14) / 12;
      let normalizedRelativeIntersectionY = delta / (150 / 2);
      let bounceAngle = normalizedRelativeIntersectionY * maxBounceAngle;
      this.velocity.y = 10 * Math.sin(bounceAngle);
      this.velocity.x *= -1;
      this.velocity.mult(1.01);
    }
    //computer
    if (
      this.position.x >= width - this.r - 20 &&
      this.position.x <= width - this.r
    ) {
      let delta =
        this.position.y -
        random(this.paddlePos.y - 75, random(this.paddlePos.y + 75));
      let maxBounceAngle = (5 * 3.14) / 12;
      let normalizedRelativeIntersectionY = delta / (150 / 2);
      let bounceAngle = normalizedRelativeIntersectionY * maxBounceAngle;
      this.velocity.y = 10 * Math.sin(bounceAngle);
      this.velocity.x *= -1;
      this.velocity.mult(1.01);
    }
  }
  borders() {
    if (this.position.x <= this.r) {
      this.position = createVector(width / 2, height / 2);
      this.velocity = createVector(random(4, 8));
      this.velocity.mult(2.5);
      if (random(1) > 0.5) this.velocity.mult(-1);
      this.score = 0;
      this.compScore += 1;
    }
    if (this.position.y < this.r) this.velocity.y *= -1;

    if (this.position.y > height - this.r) this.velocity.y *= -1;
  }
  show() {
    for (let i = 0; i < this.history.length; i++) {
      let pos = this.history[i];
      ellipse(pos.x, pos.y, i * 6, i * 6);
    }
    ellipse(this.position.x, this.position.y, this.r);
    fill(255);
    text(this.score, width / 4, height / 4);
    text(this.compScore, width / 1.333, height / 4);
    rect(this.paddlePos.x, this.paddlePos.y - 75, this.r, 150);
    rect(10, this.mouse.y - 75, this.r, 150);
    textSize(40);
  }
}
