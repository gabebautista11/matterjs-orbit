const { Matter } = require("matter-js");

// module aliases
var Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
  element: document.body,
  engine: engine,
});

//create sun
let sun = Bodies.circle(400, 300, 50, 50);
Matter.Body.setDensity(sun, 1408);
Matter.Body.setMass(sun, 1988500);

let earth = Bodies.circle(600, 300, 5, 5);
Matter.Body.setDensity(earth, 1408);
Matter.Body.setMass(earth, 5514);

Matter.Body.applyForce(
  earth,
  Matter.Vector.create(earth.position.x, earth.position.y),
  Matter.Vector
);

// add all of the bodies to the world
Composite.add(engine.world, [sun, earth]);

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);

engine.gravity.y = 0;
