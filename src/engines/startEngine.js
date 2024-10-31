export default function startEngine(element, options) {
  var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Composite = Matter.Composite,
    Composites = Matter.Composites,
    Common = Matter.Common,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Bounds = Matter.Bounds,
    Bodies = Matter.Bodies

  // create engine
  var engine = Engine.create(),
    world = engine.world

  options = {
    width: element.offsetWidth,
    height: element.offsetHeight,
    showAngleIndicator: false,
    wireframes: false,
    background: 'rgb(255,255,255)',
    ...options,
  }

  // create renderer
  var render = Render.create({
    element,
    engine,
    options,
  })

  Render.run(render)

  // create runner
  var runner = Runner.create()
  Runner.run(runner, engine)

  // add mouse control
  var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    })

  Composite.add(world, mouseConstraint)

  // keep the mouse in sync with rendering
  render.mouse = mouse

  // fit the render viewport to the scene
  //Render.lookAt(render, Composite.allBodies(world))

  // context for MatterTools.Demo
  return {
    engine: engine,
    runner: runner,
    render: render,
    canvas: render.canvas,
    world: engine.world,
    bodies: engine.world.bodies,
    stop: function () {
      Matter.Render.stop(render)
      Matter.Runner.stop(runner)
    },
  }
}
