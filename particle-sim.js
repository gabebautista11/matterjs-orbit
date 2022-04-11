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

// add all of the bodies to the world
Composite.add(engine.world, [sun, earth]);

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);

engine.gravity.y = 0;

Matter.Events.on(runner, "tick", () => {
  // let angleBetweenEarthAndSun = () => {
  //   angle = Math.atan(
  //     earth.position.y - sun.position.y,
  //     earth.position.x - sun.position.x
  //   );
  //   console.log(angle);
  // };
  // angleBetweenEarthAndSun();
  //runs every tick or frame
  Matter.Body.applyForce(
    earth,
    Matter.Vector.sub(sun.position, earth.position),
    Matter.Vector.create(
      -calculateForceOfGravity() * 10,
      -calculateForceOfGravity() * 10
    )
  );

  console.log(calculateForceOfGravity());
});

let calculateRadius = () => {
  //calculate distance
  let distance = Math.sqrt(
    Math.abs(
      ((earth.position.x - sun.position.x) ^ 2) +
        ((earth.position.y - sun.position.y) ^ 2)
    )
  );

  return distance;
};

let calculateForceOfGravity = () => {
  return Math.sqrt(((6.67 / 1e11) * sun.mass) / calculateRadius());
};
