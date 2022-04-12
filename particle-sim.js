// module aliases
var Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite;

// create an engine
var engine = Engine.create();

engine.gravity.y = 0;
// create a renderer
var render = Render.create({
  element: document.body,
  engine: engine,
});
// Matter.Render.setPixelRatio(render, 20);

let earth = Bodies.circle(600, 300, 5, 5);
Matter.Body.setDensity(earth, 1408);
Matter.Body.setMass(earth, 5514);

//create sun
let sun = Matter.Bodies.circle(400, 300, 50, 50);
Matter.Body.setDensity(sun, 1408);
Matter.Body.setMass(sun, 1988500);
Matter.Body.setStatic(sun, true);

let mars = Matter.Bodies.circle(800, 300, 4, 4);
Matter.Body.setDensity(mars, 589.998);

// add all of the bodies to the world
Composite.add(engine.world, [sun, earth, mars]);

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);

let calculateRadius = () => {
  //calculate distance
  let radius = Math.sqrt(
    Math.abs(
      ((earth.position.x - sun.position.x) ^ 2) +
        ((earth.position.y - sun.position.y) ^ 2)
    )
  );

  return radius;
};

let calculateForceOfGravity = () => {
  return Math.sqrt(((6.67 / 1e11) * sun.mass) / calculateRadius());
};

let renderCanvas = document.getElementsByTagName("canvas")[0];
let context = renderCanvas.getContext("2d");

Matter.Events.on(runner, "tick", () => {
  let targetAngleEarth = Matter.Vector.angle(earth.position, sun.position);
  let targetAngleMars = Matter.Vector.angle(mars.position, sun.position);
  let marsForce = 0.15;
  let earthForce = 0.03;

  Matter.Body.applyForce(earth, earth.position, {
    x: Math.cos(targetAngleEarth) * earthForce,
    y: Math.sin(targetAngleEarth) * earthForce,
  });

  Matter.Body.applyForce(mars, mars.position, {
    x: Math.cos(targetAngleMars) * marsForce,
    y: Math.sin(targetAngleMars) * marsForce,
  });

  let horizontalForceEarth = 0.07;
  Matter.Body.applyForce(
    earth,
    earth.position,
    Matter.Vector.perp({
      x: Math.cos(targetAngleEarth) * horizontalForceEarth,
      y: Math.sin(targetAngleEarth) * horizontalForceEarth,
    })
  );
  let horizontalForceMars = 0.4;
  Matter.Body.applyForce(
    mars,
    mars.position,
    Matter.Vector.perp({
      x: Math.cos(targetAngleMars) * horizontalForceMars,
      y: Math.sin(targetAngleMars) * horizontalForceMars,
    })
  );

  //draw lines between circles
  // context.beginPath();
  // context.lineWidth = 5;
  // context.strokeStyle = "green"; // Green path
  // context.moveTo(earth.position.x, earth.position.y);
  // context.lineTo(sun.position.x, sun.position.y);
  // context.stroke();
});
