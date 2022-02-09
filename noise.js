function setup() {
    createCanvas(windowWidth, windowHeight);
    // let ellipseX = windowWidth * (1/5);
    // let ellipseY = windowHeight * (4/5);
  }

clr = 1;

let ran = random(100);

function draw() {
    r = noise(clr+100) * ran;
    g = noise(clr-50) * ran;
    b = noise(clr) * ran;
      
    background(220);
}
