const P5 = require('p5');

module.exports = new P5((sketch) => {
  const width = 600;
  const height = 600;
  const radius = 4;
  const cos = sketch.cos.bind(sketch);
  const sin = sketch.sin.bind(sketch);
  const G = 6.674 * (10 ** -11);
  const L = 2.663 * (10 ** 40);
  const m = 5.9742 * (10 ** 24);
  const M = 1.9891 * (10 ** 30);
  const a = G * M * m;
  const e = 0.0167;

  const metricToPixelSystem = d => d / (10 ** 9);


  let angle = 0;

  sketch.setup = function setup() {
    sketch.createCanvas(width, height);

    sketch.background(0);
  };

  sketch.draw = function draw() {
    sketch.background(0);
    sketch.translate(width / 2, height / 2);

    const r = metricToPixelSystem((L * L) / (m * a * (1 + e * cos(angle))));
    const x = r * cos(angle);
    const y = r * sin(angle);

    sketch.stroke('#6BE1EA');
    sketch.fill('#0541B4');
    sketch.ellipse(x, y, radius, radius); // black the projectile itself!
    sketch.stroke('#FEFF00');
    sketch.fill('#FEFF00');
    sketch.ellipse(0, 0, 20, 20);

    angle += 0.001;
  };
});
