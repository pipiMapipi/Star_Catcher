var angle = 0;
var speedM = 0;
var inProcess = true;
var distance;
var score = 0;
let me, guest;

let winner;

let shared;
let screen = 1;
let start = false;
let screenChange = false;
let expand = 0;

let fade = 255;
let star = [];

let sky;
let bottle, liquid, starCatcher, end;
let title = [];
let titleAnimation = [];

let count = 0;
let gameEnd = false;
let fadeIn = 0;

const maxPlayerNum = 4;

const initPlayers = [
  {
    x: 75, //A
    y: 450,
  },
  {
    x: 225, //B
    y: 450,
  },
  {
    x: 375, //C
    y: 450,
  },
  {
    x: 525, //D
    y: 450,
  },
];

function preload() {
  partyConnect(
    "wss://deepstream-server-1.herokuapp.com",
    "Gold_Miner_Ver2_Zhuoran",
    "main2"
  );
  shared = partyLoadShared("globals");
  guests = partyLoadGuestShareds();
  me = partyLoadMyShared({
    role: "OBSERVER",
    opacity: 0,
    pos: { x: 100, y: 450 },
    setPos: { x: 100, y: 450 },
    speedM: 0,
    angle: 0,
    score: 0,
    basket: { x: 100, y: 10 },
    speedF: 0,
    pointer: true,
    catcher: false,
  });

  img = loadImage("assets/star_catcher.jpg");
  bottle = loadImage("assets/bottle.png");
  liquid = loadImage("assets/bottle2.png");
  starCatcher = loadImage("assets/catcher.png");
  end = loadImage("assets/end.jpg");

  for (let i = 0; i <= 5; i++) {
    title[i] = loadImage("assets/title/" + i + ".png");
  }

  for (let i = 0; i <= 3; i++) {
    star[i] = loadImage("assets/stars/" + i + ".png");
  }
}

function setup() {
  createCanvas(600, 500);

  if (partyIsHost()) {
    partySetShared(shared, {
      winner: { name: "PLAYER1", score: 0 },
      players: initPlayers,
      stars: [
        {
          x: random(40, 90),
          y: random(80, 200),
          r: random(8, 15),
          move: false,
          img: int(random(3)),
        },
        {
          x: random(80, 140),
          y: random(80, 200),
          r: random(8, 15),
          move: false,
          img: int(random(3)),
        },
        // {
        //   x: random(130, 190),
        //   y: random(80, 200),
        //   r: random(8, 15),
        //   move: false,
        //   img: int(random(3)),
        // },
        // {
        //   x: random(180, 260),
        //   y: random(80, 200),
        //   r: random(8, 15),
        //   move: false,
        //   img: int(random(3)),
        // },
        // {
        //   x: random(240, 290),
        //   y: random(80, 200),
        //   r: random(8, 15),
        //   move: false,
        //   img: int(random(3)),
        // },
        // {
        //   x: random(280, 360),
        //   y: random(80, 200),
        //   r: random(8, 15),
        //   move: false,
        //   img: int(random(3)),
        // },
        // {
        //   x: random(340, 390),
        //   y: random(80, 200),
        //   r: random(8, 15),
        //   move: false,
        //   img: int(random(3)),
        // },
        // {
        //   x: random(380, 440),
        //   y: random(80, 200),
        //   r: random(8, 15),
        //   move: false,
        //   img: int(random(3)),
        // },
        // {
        //   x: random(430, 490),
        //   y: random(80, 200),
        //   r: random(8, 15),
        //   move: false,
        //   img: int(random(3)),
        // },
        // {
        //   x: random(480, 550),
        //   y: random(80, 200),
        //   r: random(8, 15),
        //   move: false,
        //   img: int(random(3)),
        // },
        // {
        //   x: random(40, 90),
        //   y: random(210, 350),
        //   r: random(8, 15),
        //   move: false,
        //   img: int(random(3)),
        // },
        // {
        //   x: random(80, 140),
        //   y: random(210, 350),
        //   r: random(8, 15),
        //   move: false,
        //   img: int(random(3)),
        // },
        // {
        //   x: random(130, 190),
        //   y: random(210, 350),
        //   r: random(8, 15),
        //   move: false,
        //   img: int(random(3)),
        // },
        // {
        //   x: random(180, 260),
        //   y: random(210, 350),
        //   r: random(8, 15),
        //   move: false,
        //   img: int(random(3)),
        // },
        // {
        //   x: random(240, 290),
        //   y: random(210, 350),
        //   r: random(8, 15),
        //   move: false,
        //   img: int(random(3)),
        // },
        // {
        //   x: random(280, 360),
        //   y: random(210, 350),
        //   r: random(8, 15),
        //   move: false,
        //   img: int(random(3)),
        // },
        // {
        //   x: random(340, 390),
        //   y: random(210, 350),
        //   r: random(8, 15),
        //   move: false,
        //   img: int(random(3)),
        // },
        // {
        //   x: random(380, 440),
        //   y: random(210, 350),
        //   r: random(8, 15),
        //   move: false,
        //   img: int(random(3)),
        // },
        // {
        //   x: random(430, 490),
        //   y: random(210, 350),
        //   r: random(8, 15),
        //   move: false,
        //   img: int(random(3)),
        // },
        // {
        //   x: random(480, 550),
        //   y: random(210, 350),
        //   r: random(8, 15),
        //   move: false,
        //   img: int(random(3)),
        // },
      ],
    });
  }

  playerPosition();

  starCatcher.resize(50, 50);

  titleAnimation = new animation(title, width / 2, height / 2, 0.03);

  // info is hidden by default
  // show it
  partyToggleInfo(true);

  const toggleButton = createButton("Toggle Info").mousePressed(() => {
    partyToggleInfo(); // pass nothing to toggle
  });
  toggleButton.parent(document.querySelector("main"));

  const showButton = createButton("Show Info").mousePressed(() => {
    partyToggleInfo(true); // pass true to show
  });
  showButton.parent(document.querySelector("main"));

  const hideButton = createButton("Hide Info").mousePressed(() => {
    partyToggleInfo(false); // pass false to hide
  });
  hideButton.parent(document.querySelector("main"));
}

function playerPosition() {
  for (let i = 0; i < maxPlayerNum; i++) {
    if (i < guests.length) {
      guests[i].pos.x = shared.players[i].x;
      guests[i].pos.y = shared.players[i].y;
      guests[i].setPos.x = guests[i].pos.x;
      guests[i].setPos.y = guests[i].pos.y;
      guests[i].basket.x = guests[i].pos.x;
    }
  }
}

function playerQueue() {
  for (let i = 0; i < maxPlayerNum; i++) {
    if (!guests.find((p) => p.role === "PLAYER" + (i + 1))) {
      // find the first observer
      const observer = guests.find((p) => p.role === "OBSERVER");
      // if thats me, take the role
      if (observer === me) {
        observer.role = "PLAYER" + (i + 1);
      }
    }
  }
}

function draw() {
  noSmooth();
  // Start page
  if (screen == 1) {
    playerQueue();

    titleAnimation.display();
    titleAnimation.move();
    noStroke();

    if (dist(mouseX, mouseY, 220, 260) < 40) {
      for (let i = 0; i < 4; i++) {
        fill(0, 200);
        ellipse(220, 270 + i * 10 + sin(millis() / 800) * 3, 5);
      }
    }

    if (expand > 890) {
      screen = 2;
    }

    if (screenChange) {
      expand += 10;
    }

    fill(255, 215, 0, 50);
    ellipse(220, 260, 50 + sin(millis() / 1000) * 3);
    fill(255, 215, 0, 80);
    ellipse(220, 260, 35 + sin(millis() / 700) * 3);
    fill(255, 215, 0);
    ellipse(220, 260, 20 + sin(millis() / 500) * 3 + expand);
  }

  // Game page
  if (screen == 2) {
    imageMode(CORNER);
    image(img, 0, 0);
    checkMovement();
    for (let j = 0; j < guests.length; j++) {
      textStyle(BOLD);
      textSize(15);
      textAlign(CENTER);
      noStroke();
      if (me == guests[j]) {
        fill(0);
      } else {
        fill(0, 105);
      }

      text(
        guests[j].role + ": " + guests[j].score,
        guests[j].setPos.x,
        guests[j].setPos.y + 30
      );

      // Bottle
      imageMode(CORNER);
      if (me == guests[j]) {
        tint(255, guests[j].opacity);
        image(liquid, guests[j].basket.x - 30, guests[j].basket.y);
        noTint();
        image(bottle, guests[j].basket.x - 30, guests[j].basket.y);
      } else {
        tint(255, guests[j].opacity - 150);
        image(liquid, guests[j].basket.x - 30, guests[j].basket.y);
        tint(255, 105);
        image(bottle, guests[j].basket.x - 30, guests[j].basket.y);
        noTint();
      }

      for (let i = 0; i < shared.stars.length; i++) {
        distance = dist(
          shared.stars[i].x,
          shared.stars[i].y,
          guests[j].pos.x,
          guests[j].pos.y
        );
        noStroke();
        fill(255, 215, 0);
        imageMode(CENTER);
        tint(255, abs(sin(millis() / 1000 + i * 100)) * 255);
        image(
          star[shared.stars[i].img],
          shared.stars[i].x,
          shared.stars[i].y,
          shared.stars[i].r * 2,
          shared.stars[i].r * 2
        );
        noTint();

        if (distance > shared.stars[i].r && inProcess) {
          inProcess = true;
          guests[j].speedF = 0;
        } else if (distance <= shared.stars[i].r) {
          inProcess = false;
          me.speedM *= -1;

          guests[j].speedF = 3.0;

          shared.stars[i].move = true;
        }

        if (shared.stars.length - 1 == 0) {
          for (let j = 0; j < guests.length; j++) {
            if (guests[j].score > shared.winner.score) {
              shared.winner.score = guests[j].score;
              shared.winner.name = guests[j].role;
            }
          }
          gameEnd = true;
        } else {
          if (shared.stars[i].y <= -shared.stars[i].r) {
            shared.stars.splice(i, 1);
          } else if (shared.stars[i].y <= 50) {
            if (abs(guests[j].basket.x - shared.stars[i].x) <= 20) {
              if (shared.stars[i].r <= 9) {
                guests[j].score += 15;
              } else if (shared.stars[i].r > 9 && shared.stars[i].r <= 12) {
                guests[j].score += 10;
              } else {
                guests[j].score += 5;
              }
              if (guests[j].opacity <= 255) {
                guests[j].opacity += 50;
              }
              shared.stars.splice(i, 1);
            } else {
              shared.stars[i].y -= guests[j].speedF;
            }
          } else if (
            shared.stars[i].y > -shared.stars[i].r &&
            shared.stars[i].move
          ) {
            shared.stars[i].y -= guests[j].speedF;
          }
        }

        if (me.pos.x < 0) {
          me.pos.x = 0;
          me.speedM *= -1;
        } else if (me.pos.x > width) {
          me.pos.x = width;
          me.speedM *= -1;
        } else if (me.pos.y < 20) {
          me.pos.y = 20;
          me.speedM *= -1;
        } else if (me.pos.y > height) {
          me.pos.y = height;
          me.speedM *= -1;
        } else if (me.pos.y > me.setPos.y) {
          me.speedM = 0;
          me.pos.x = me.setPos.x;
          me.pos.y = me.setPos.y;
          me.pointer = true;
          me.catcher = false;
        }
      }
      stroke(0);
      strokeWeight(5);
      fill(255, 215, 0, 100);

      // Catcher
      if (me == guests[j]) {
        stroke(0, 200);
      } else {
        stroke(0, 50);
      }

      if (guests[j].catcher) {
        let catcherLength = dist(
          guests[j].setPos.x,
          guests[j].setPos.y,
          guests[j].pos.x,
          guests[j].pos.y
        );

        for (let k = 0; k < int(catcherLength / 15); k++) {
          point(
            lerp(
              guests[j].setPos.x,
              guests[j].pos.x,
              k / int(catcherLength / 15)
            ),
            lerp(
              guests[j].setPos.y,
              guests[j].pos.y,
              k / int(catcherLength / 15)
            )
          );
        }
      }
      push();
      translate(guests[j].pos.x, guests[j].pos.y);
      rotate(guests[j].angle);

      noStroke();
      if (guests[j].pointer) {
        if (me == guests[j]) {
          fill(0);
        } else {
          fill(105);
        }

        triangle(-5, 10, 5, 10, 0, -10);
      }
      if (guests[j].catcher) {
        fill(255, 215, 0, 50);
        ellipse(0, 0, 50 + sin(millis() / 1000) * 3);
        fill(255, 215, 0, 80);
        ellipse(0, 0, 35 + sin(millis() / 700) * 3);
        fill(255, 215, 0);
        ellipse(0, 0, 20 + sin(millis() / 500) * 3);
      }

      guests[j].pos.x += guests[j].speedM * sin(guests[j].angle);
      guests[j].pos.y -= guests[j].speedM * cos(guests[j].angle);

      pop();
    }

    // Fade away
    noStroke();
    rectMode(CORNER);
    fill(255, 215, 0, fade);
    if (fade > 0) {
      fade -= 5;
    } else {
      fade = 0;
    }
    rect(0, 0, width, height);

    // Change to screen 3
    if (gameEnd) {
      fill(255, 215, 0);
      noStroke();
      ellipse(width / 2, height / 2, fadeIn, fadeIn);
      if (fadeIn < width * 2) {
        fadeIn += 10;
      } else {
        screen = 3;
        fadeIn = 255;
        fade = 255;
      }
    }
  }

  if (screen == 3) {
    gameEnd = false;
    imageMode(CORNER);
    noStroke();
    image(end, 0, 0);
    textSize(25);
    fill(0);
    textAlign(CENTER);
    text(shared.winner.name + " WON", 300, 320);
    fill(0, 150);
    textSize(18);
    text("Score: " + shared.winner.score, 300, 345);

    // Fade away
    noStroke();
    rectMode(CORNER);
    fill(255, 215, 0, fade);
    if (fade > 0) {
      fade -= 5;
    } else {
      fade = 0;
    }
    rect(0, 0, width, height);
  }
}

function checkMovement() {
  if (
    (keyIsDown(LEFT_ARROW) || keyIsDown(65 /*a*/)) &&
    me.angle > -1.3 &&
    me.speedM == 0
  ) {
    me.angle -= 0.01;
  }
  if (
    (keyIsDown(RIGHT_ARROW) || keyIsDown(68 /*d*/)) &&
    me.angle < 1.3 &&
    me.speedM == 0
  ) {
    me.angle += 0.01;
  }
  if ((keyIsDown(UP_ARROW) || keyIsDown(87 /*w*/)) && me.speedM == 0) {
    me.speedM = 4.0;
    me.pointer = false;
    me.catcher = true;
  }
}

function keyPressed() {
  if (key == "S" || key == "s") {
    count++;
    save("screenshot" + count + ".jpg");
  }
}

function mousePressed() {
  if (screen == 1) {
    start = dist(mouseX, mouseY, 220, 260);
    if (start < 20) {
      screenChange = true;
    }
  } else if (screen == 2) {
    me.basket.x = mouseX;
  }
}

function pick(array) {
  return array[Math.floor(Math.random() * array.length)];
}
