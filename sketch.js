let bg, plansza1, plansza2;
let showSecond = false;
let loadPct = 0;
let redirected = false;
const X = 200, Y = 75, W = 560, H = 390;
let lastUpdateTime = 0;
let buttonArea = { x: 380, y: 400, w: 200, h: 50 }; // obszar klikalny na planszy

function preload() {
  bg       = loadImage('assets/backgroundblur.jpg');
  plansza1 = loadImage('assets/PLANSZA 1.png');
  plansza2 = loadImage('assets/PLANSZA 2.png');
}

function setup() {
  createCanvas(960, 540);
  textFont('Arial');
  noStroke();
}

function draw() {
  background(0);
  image(bg, 0, 0, width, height);

  if (showSecond) {
    fill(0, 76); // overlay
    rect(0, 0, width, height);
    image(plansza2, X, Y, W, H);

    if (millis() - lastUpdateTime > 100 && loadPct < 100) {
      loadPct += 2;
      lastUpdateTime = millis();
    }

    const pct = floor(loadPct);
    push();
      translate(X + W / 2 + 100, Y + H / 2);
      noFill();
      stroke(200); strokeWeight(6);
      ellipse(0, 0, 80);
      stroke('#E9943A');
      arc(0, 0, 80, 80, -HALF_PI, -HALF_PI + TWO_PI * (pct / 100));
      noStroke(); fill(255);
      textAlign(CENTER, CENTER); textSize(20);
      text(pct + '%', 0, 0);
    pop();

    if (pct >= 100 && !redirected) {
      redirected = true;
      window.location.href = 'https://michaelskl.github.io/Temu/';
    }

  } else {
    image(plansza1, X, Y, W, H);
    // NIC NIE RYSUJEMY NA WIERZCH
  }
}

function mousePressed() {
  if (!showSecond) {
    // kliknięcie w obszar graficznego przycisku na planszy 1
    if (mouseX >= buttonArea.x && mouseX <= buttonArea.x + buttonArea.w &&
        mouseY >= buttonArea.y && mouseY <= buttonArea.y + buttonArea.h) {
      showSecond = true;
    }
  }
}
