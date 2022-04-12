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

let earth = Bodies.circle(600, 300, 5, 5);
Matter.Body.setDensity(earth, 1408);
Matter.Body.setMass(earth, 5514);

//create sun
let sun = Matter.Bodies.circle(400, 300, 50, 50);
Matter.Body.setDensity(sun, 1408);
Matter.Body.setMass(sun, 1988500);
Matter.Body.setStatic(sun, true);

// add all of the bodies to the world
Composite.add(engine.world, [sun, earth]);

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

Matter.Events.on(runner, "tick", () => {
  let targetAngle = Matter.Vector.angle(earth.position, sun.position);
  let force = 0.03;

  Matter.Body.applyForce(earth, earth.position, {
    x: Math.cos(targetAngle) * force,
    y: Math.sin(targetAngle) * force,
  });

  let horizontalForce = 0.07;
  Matter.Body.applyForce(
    earth,
    earth.position,
    Matter.Vector.perp({
      x: Math.cos(targetAngle) * horizontalForce,
      y: Math.sin(targetAngle) * horizontalForce,
    })
  );
});
