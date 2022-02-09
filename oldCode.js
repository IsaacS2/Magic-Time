/*
    // In draw function
    fill(127);
    ellipseXChange = windowW + ellipseHoriSpeed * i;
    ellipse(ellipseXChange, windowH, 100, 120);
    if (ellipseXChange >= windowWidth - 50) {
      rt = -1;
    } else if (ellipseXChange <= 50) {
      rt = 1;
    }
    if (rt == 1) {
      i+=1;
    } else {
      i-=1;
    }



function mouseMoved() {
  if (mouseIsPressed === true) {
    if (mouseButton === LEFT) {
      let sprinkle = new sprinkles(mouseX - 15, mouseY - 25, 10, 10);
      sprinkleArray.push(sprinkle);
      console.log(1);
    }
    console.log(5);
  }
}

  function mouseMoved() {
    if (mouseIsPressed === true) {
      if (mouseButton === LEFT) {
        let sprinkle = new sprinkles(mouseX - 15, mouseY - 25, 10, 10);
        sprinkleArray.push(sprinkle);
        console.log(1);
      }
      console.log(5);
    }
  }

*/