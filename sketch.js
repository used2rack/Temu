let bg, plansza1, plansza2;
let showSecond = false;
let loadPct = 0;
let redirected = false;
const X = 200, Y = 75, W = 560, H = 390;

function preload() {
  bg       = loadImage('assets/backgroundblur.jpg');
  plansza1 = loadImage('assets/PLANSZA 1.png');
  plansza2 = loadImage('assets/PLANSZA 2.png');
}

function setup() {
  createCanvas(960, 540);
}

function draw() {
  // tło + blur
  image(bg, 0, 0, width, height);
  filter(BLUR, 6);

  if (showSecond) {
    // przyciemnienie całego ekranu
    fill(0, 0.3 * 255);
    rect(0, 0, width, height);
    // rysuj drugą planszę
    image(plansza2, X, Y, W, H);

    // animacja ładowania
    if (loadPct < 100) loadPct += 0.5;
    const pct = floor(loadPct);
    push();
      // przesunięte nieco w prawo
      translate(X + W / 2 + 100, Y + H / 2);
      noFill();
      stroke(200);
      strokeWeight(8);
      ellipse(0, 0, 120);
      stroke('#E9943A');
      arc(0, 0, 120, 120,
          -HALF_PI,
          -HALF_PI + TWO_PI * (pct / 100)
      );
      noStroke();
      fill(255);
      textAlign(CENTER, CENTER);
      textSize(32);
      text(pct + '%', 0, 0);
    pop();

    // po osiągnięciu 100% przekieruj tylko raz
    if (pct >= 100 && !redirected) {
      redirected = true;
      window.location.href = 'https://michaelskl.github.io/Temu/';
    }
  } else {
    // pierwsza plansza
    image(plansza1, X, Y, W, H);
  }
}

function mousePressed() {
  showSecond = true;
}
