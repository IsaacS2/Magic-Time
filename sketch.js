function setup() {
    createCanvas(windowWidth, windowHeight);
  }

  let clickValue = 0;
  mouseXDiff = 25;
  mouseYDiff = 30;
  ellipseHoriSpeed = 5;
  ellipseVertSpeed = 5;
  // let ellipseX = windowWidth - 100;
  // let ellipseY = windowHeight - 100;
  rectX = 10;
  rectY = 10;
  
  function draw() {
    //ellipseX = windowWidth * (1/5);
    //ellipseY = windowHeight * (4/5);
      
    background(220);

    // fill(127, 127, 127);
    // ellipse(ellipseX, ellipseY, 50, 60);

    fill(255,190,200);
    if (clickValue === 0) {
        rect(10, 10, mouseX - mouseXDiff, mouseY - mouseYDiff);
        rectX = mouseX - mouseXDiff;
        rectY = mouseY - mouseYDiff;
    } else {
        rect(10, 10, rectX, rectY);
    }

    fill(75,75,10);
    beginShape();
    vertex(mouseX, mouseY);
    vertex(mouseX - 20, mouseY - 20);
    vertex(mouseX - 15, mouseY - 25);
    vertex(mouseX + 5, mouseY - 5);
    endShape(CLOSE);

    //fill(127);
    //ellipse(ellipseX, ellipseY, 100, 120);
  }

  function mouseClicked() {
    if (clickValue === 0) {
      clickValue = 1;
    } else {
      clickValue = 0;
    }
  }