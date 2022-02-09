function setup() {
    createCanvas(windowWidth, windowHeight);
    window.alert("Magic Time; This piece is based on magic and turning average, ordinary shapes into colorful pieces of art. There are 3 shapes that move around the screen that the user can interact with to make more lively.");
    window.alert("Press/hold the left mouse button to add magic sparkles from the tip of the wand. Pressing on or near the circle, triangle, or square when they are grey will cause them to become colorful and release sparkles. Depending on the shapes activated, their movements or forms may change as well.");
    noCursor();
    hatty = new hat(windowWidth * (1/2), windowHeight * (9/10), 500, 200);
    magicCircle = new megaCircle(-62, random(62, windowHeight - 62), 124, 233, 32, 0, 0);
    mysticalTriangle = new superTriangle(random(62, windowWidth - 62), windowHeight + 62, 124, 124, 23, 230, 32);
    mysteriousSquare = new ultraSquare(random(63, windowWidth - 61), random(63, windowHeight - 61), 124, 124, 127, 127, 255);
  }

  let sprinkleArray = [];
  
  function draw() {
    angleMode(DEGREES);
    
    background(250, 150, 250);
    hatty.display();

    magicCircle.return();
    magicCircle.display();
    magicCircle.clickActivate();
    magicCircle.dropSprinkle();
    
    mysticalTriangle.return();
    mysticalTriangle.display();
    mysticalTriangle.clickActivate();
    mysticalTriangle.dropSprinkle();
    
    mysteriousSquare.dropSprinkle();
    mysteriousSquare.changeDirection();
    mysteriousSquare.display();
    mysteriousSquare.clickActivate();

    if (mouseIsPressed === true && mouseButton === LEFT) {
      let sprinkle = new sprinkles(mouseX - 15, mouseY - 25, 10, 10, mouseX/5, mouseY/5, (mouseX+mouseY)/10);
      sprinkleArray.push(sprinkle);
      console.log(1);
      fill(225, 225, 200);
      beginShape();
      vertex(mouseX + 10, mouseY - 18);
      vertex(mouseX + 10, mouseY - 25);
      vertex(mouseX - 15, mouseY - 25);
      vertex(mouseX - 15, mouseY - 18);
      endShape(CLOSE);
    } else {
      fill(75,75,10);
      beginShape();
      vertex(mouseX, mouseY);
      vertex(mouseX - 20, mouseY - 20);
      vertex(mouseX - 15, mouseY - 25);
      vertex(mouseX + 5, mouseY - 5);
      endShape(CLOSE);
    }

    for (let i = 0; i < sprinkleArray.length; i++) {
      sprinkleArray[i].display();
      sprinkleArray[i].move();
      let sprinkle2 = sprinkleArray[i];
      if (sprinkle2.y > windowHeight + 40) {
        sprinkleArray.splice(i, 1);
      }
    }
  }




  class hat {
    constructor(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.color = 50;
      this.revert = 0;
    }

    display() {
      if (this.revert === 0) {
        this.color+=5;
      } else if (this.revert === 1) {
        this.color-=5;
      } if (this.color > 255) {
        this.revert = 1;
      } else if (this.color < 30) {
        this.revert = 0;
      }
      fill(this.color);
      ellipse(this.x, this.y, this.width/2, this.height/4);
      noStroke();
      rect(this.x - this.width/4, this.y - this.height/2, this.width/2, this.height/2);
      stroke(0);
      line(this.x - this.width/4, this.y - this.height/2, this.x - this.width/4, this.y);
      line(this.x + this.width/4, this.y - this.height/2, this.x + this.width/4, this.y);
      ellipse(this.x, this.y - this.height/2, this.width, this.height/2);
      fill(this.color - 30);
      ellipse(this.x, this.y - this.height/2, this.width/2, this.height/4);
    }
  }




  class sprinkles {
    constructor(x, y, width, height, r, g, b) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.r = r;
      this.g = g;
      this.b = b;
      this.brigthen = 1;
      this.rando = random(0, 1);
    }

    display() {
      push();
      translate(this.x, this.y);
      if (this.rando >= 0.5) {
        rotate(-1*millis() / 10 * PI / 2);
      } else if (this.rando < 0.5) {
        rotate(1*millis() / 10 * PI / 2);
      }
      fill(this.r, this.g, this.b);
      triangle(/*this.x*/-this.width/4, /*this.y*/+this.height/4, /*this.x*/+this.width/4, /*this.y*/+this.height/4, /*this.x*/0, /*this.y*/-this.height/4);
      triangle(/*this.x*/-this.width/4, /*this.y*/+this.height/4, /*this.x*/0, /*this.y*/-this.height/4, /*this.x*/-(this.width * .75), /*this.y*/-(this.height * .75));
      triangle(/*this.x*/+this.width/4, /*this.y*/+this.height/4, /*this.x*/0, /*this.y*/-this.height/4, /*this.x*/+(this.width * .75), /*this.y*/-(this.height * .75));
      triangle(/*this.x*/-this.width/4, /*this.y*/+this.height/4, /*this.x*/+this.width/4, /*this.y*/+this.height/4, /*this.x*/0, /*this.y*/+(this.height * .75));
      
      pop();
      if (this.r < 255 && this.brigthen === 1) {
        this.r+=1;
      } else if (this.r > 0 && this.brigthen === 0) {
        this.r-=1;
      }
      if (this.g < 255 && this.brigthen === 1) {
        this.g+=1;
      } else if (this.g > 0 && this.brigthen === 0) {
        this.g-=1;
      }
      if (this.g >= 255 && this.r >=255) {
        this.brigthen = 0;
      } else if (this.g <= 0 && this.r <= 0) {
        this.brigthen = 1;
      }
    }

    move() {
      let n = random(-4, 4) /* * noise(this.i) */;
      let m = random(1, 4) /* * noise(this.j) */;
      this.x = this.x + n ;
      this.y = this.y + m;
    }
  }




  class ultraSquare {
    constructor(x, y, width, height, r, g, b) {
      this.x = x - width/2;
      this.y = y - height/2;
      this.sprinkleList = [];
      this.width = width;
      this.height = height;
      this.clicked = 0;
      this.r = r;
      this.g = g;
      this.b = b;
      this.randr = random(r);
      this.randg = random(g);
      this.randb = random(b);
      this.vert = 0;
      this.hori = 0;
      this.sparkleActivate = 0;
    }

    clickActivate() {
      if (mouseIsPressed === true) {
        if (mouseX - 15 > this.x && mouseX - 15 < this.x + this.width) {
          if (mouseY - 25 < this.y + this.height && mouseY - 25 > this.y) {
            this.clicked = 1;
          }
        }
      }
    }

    changeDirection() {
      if (this.y - 2 < 0 && this.vert === 1) {
        this.vert = 0;
        this.clicked = 0;
        this.randr = random(this.r);
        this.randg = random(this.g);
        this.randb = random(this.b);
      } else if (this.y + 2 > windowHeight - this.height && this.vert === 0) {
        this.vert = 1;
        this.clicked = 0;
        this.randr = random(this.r);
        this.randg = random(this.g);
        this.randb = random(this.b);
      }
      if (this.x - 2 < 0 && this.hori === 1) {
        this.hori = 0;
        this.clicked = 0;
        this.randr = random(this.r);
        this.randg = random(this.g);
        this.randb = random(this.b);
      } else if (this.x + 2 > windowWidth - this.width && this.hori === 0) {
        this.hori = 1;
        this.clicked = 0;
        this.randr = random(this.r);
        this.randg = random(this.g);
        this.randb = random(this.b);
      }
    }
    
    display() {
      console.log(this.vert);
      if (this.sparkleActivate <= 30) {
        this.sparkleActivate++;
      } else if (this.sparkleActivate > 30) {
        this.sparkleActivate = 0;
      }

      if (this.vert === 1) {
        this.y-=3;
      } else if (this.vert === 0) {
        this.y+=3;
      }
      if (this.hori === 0) {
        this.x+=3;
      } else if (this.hori === 1) {
        this.x-=3;
      }
      
      if (this.clicked === 0) {
        fill(120);
      } else if (this.clicked === 1) {
        fill(this.randr, this.randg, this.randb);
      }
      rect(this.x, this.y, this.width, this.height);
    }
    
    /* change to make sprinkle appearances more interesting */
    dropSprinkle() {
      if (this.clicked === 1 && this.sparkleActivate > 30) {
        let sprinklei = new sprinkles(this.x, this.y, 10, 10, this.r, this.g, this.b);
        this.sprinkleList.push(sprinklei);
        let sprinklej = new sprinkles(this.x + this.width, this.y + this.height, 10, 10, this.r, this.g, this.b);
        this.sprinkleList.push(sprinklej);
        let sprinklek = new sprinkles(this.x, this.y + this.height, 10, 10, this.r, this.g, this.b);
        this.sprinkleList.push(sprinklek);
        let sprinklel = new sprinkles(this.x + this.width, this.y, 10, 10, this.r, this.g, this.b);
        this.sprinkleList.push(sprinklel);
      }
      for (let i = 0; i < this.sprinkleList.length; i++) {
          this.sprinkleList[i].display();
          this.sprinkleList[i].move();

          let sprinkle2 = this.sprinkleList[i];
          if (sprinkle2.y > windowHeight + this.height) {
            this.sprinkleList.splice(i, 1);
          }
      }
    }
  }




  class superTriangle {
    constructor(x, y, width, height, r, g, b) {
      this.x = x;
      this.y = y;
      this.sprinkleList = [];
      this.width = width;
      this.height = height;
      this.revert = 0;
      this.clicked = 0;
      this.r = r;
      this.g = g;
      this.b = b;
    }

    return() {
      if (this.y < -this.height) {
        this.x = random(this.width/2, windowWidth-this.width/2);
        this.y = windowHeight + this.height/2;
        this.clicked = 0;
      }
    }

    display() {
      if (this.clicked === 0) {
        fill(120);
        triangle(this.x - this.width/2, this.y + this.height/2, this.x + this.width/2, this.y + this.height/2, this.x, this.y - this.height/2);
        this.y-=3;
      } else if (this.clicked === 1) {
        fill(this.r, this.g, this.b);
        triangle(this.x - this.width / 4, this.y + this.height/2, this.x + this.width / 4, this.y + this.height/2, this.x, this.y - this.height);
        this.y-=12;
      }
    }

    clickActivate() {
      if (mouseIsPressed === true) {
        if (mouseX - 15 > this.x - this.width/2 && mouseX - 15 < this.x + this.width/2) {
          if (mouseY - 25 < this.y + this.height/2 && mouseY - 25 > this.y - this.height/2) {
            this.clicked = 1;
          }
        }
      }
    }

    dropSprinkle() {
      if (this.clicked === 1 &&  (this.y % 3 === 0 || this.y % 3 === 1 || this.y % 3 === 2) ) {
        let sprinkle = new sprinkles(this.x, this.y + 2 * this.height / 3 , 10, 10, this.r, this.g, this.b);
        this.sprinkleList.push(sprinkle);
      }
      for (let i = 0; i < this.sprinkleList.length; i++) {
          this.sprinkleList[i].display();
          this.sprinkleList[i].move();

          let sprinkle2 = this.sprinkleList[i];
          if (sprinkle2.y > windowHeight + this.height) {
            this.sprinkleList.splice(i, 1);
          }
      }
    }
  }




  class megaCircle {
    constructor(x, y, diameter, r, g, b, direction) {
      this.x = x;
      this.y = y;
      this.sprinkleList = [];
      this.diameter = diameter;
      this.width1 = diameter;
      this.width2 = diameter;
      this.height1 = diameter;
      this.height2 = diameter;
      this.revert = 0;
      this.clicked = 0;
      this.r = r;
      this.g = g;
      this.b = b;
      this.direction = direction;
    }

    clickActivate() {
      if (mouseIsPressed === true) {
        if (mouseX - 15 > this.x - this.diameter/2 && mouseX - 15 < this.x + this.diameter/2) {
          if (mouseY - 25 < this.y + this.diameter/2 && mouseY - 25 > this.y - this.diameter/2) {
            this.clicked = 1;
          }
        }
      }
    }

    display() {
      if (this.clicked === 0) {
        fill(120);
        circle(this.x, this.y, this.diameter);
      } else if (this.clicked === 1) {
        fill(this.r, this.g, this.b);
        if (this.revert === 0) {
          this.width1-=3;
          this.height1+=3;
          this.width2+=3;
          this.height2-=3;
        } else {
          this.width1+=3;
          this.height1-=3;
          this.width2-=3;
          this.height2+=3;
        }
        if (this.width1 < this.diameter / 4) {
          this.revert = 1;
        } 
        if (this.width1 > this.diameter * (7/4) ) {
          this.revert = 0;
        }
        ellipse(this.x, this.y, this.width1, this.height1);
        ellipse(this.x, this.y, this.width2, this.height2);
      }
      if (this.direction === 1) {
        this.x-=5;
      } else {
        this.x+=5;
      }
    }

    dropSprinkle() {
      if (this.clicked === 1 && ( (this.width1 > (this.diameter * (7/4)) - 5) || (this.width1 < (this.diameter / 4) + 5) ) ) {
        let sprinkle = new sprinkles(this.x, this.y, 10, 10, this.r, this.g, this.b);
        this.sprinkleList.push(sprinkle);
      }
      for (let i = 0; i < this.sprinkleList.length; i++) {
          this.sprinkleList[i].display();
          this.sprinkleList[i].move();

          let sprinkle2 = this.sprinkleList[i];
          if (sprinkle2.y > windowHeight + this.height) {
            this.sprinkleList.splice(i, 1);
          }
        }
    }

    return() {
      if (this.x > windowWidth + this.diameter/2) {
        this.direction = 1;
        this.y = random(this.diameter/2, windowHeight-(this.diameter/2));
        this.clicked = 0;
      }
      if (this.x < -this.diameter/2) {
        this.direction = 0;
        this.y = random(this.diameter/2, windowHeight-(this.diameter/2));
        this.clicked = 0;
      }
    }
  }