const P5 = require('p5');

module.exports = new P5((sketch) => {
  const {
    windowWidth,
    windowHeight,
    createVector,
    pow,
  } = sketch;

  const cos = sketch.cos.bind(sketch);
  const sin = sketch.sin.bind(sketch);

  let pos;
  let vel;
  let v0;
  let acc;
  const radius = 2;
  let CM;
  let m;
  const Const = 1000;

  sketch.setup = function setup() {
    sketch.createCanvas(600, 600);

    const { width, height } = sketch;

    sketch.background(0);
    // sketch.smooth();

    pos = createVector(150.0, 150.0); //initial position
    v0 = createVector(1.8, 0.2); //initial velocity
    vel = createVector(v0.x, v0.y); //velocity
    acc = createVector(0, 0);
    CM = createVector(height / 2, width / 2);
  };

  sketch.draw = function draw() {
    sketch.background(0);

    const r = P5.Vector.sub(pos, CM);
    m = r.mag();

    acc.x = Const * cos(r.heading()) / pow(m, 2); // 1 < cos(r.heading()) < -1
    acc.y = Const * sin(r.heading()) / pow(m, 2);
    vel.x -= acc.x;
    pos.x += vel.x;
    vel.y -= acc.y;
    pos.y += vel.y;

    sketch.stroke('#6BE1EA');
    sketch.fill('#0541B4');
    sketch.ellipse(pos.x, pos.y, radius, radius); // black the projectile itself!
    sketch.stroke('#FEFF00');
    sketch.fill('#FEFF00');
    sketch.ellipse(CM.x, CM.y, 20, 20);
  };
});
