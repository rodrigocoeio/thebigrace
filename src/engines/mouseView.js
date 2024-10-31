export default function mouseView(engine, render) {
  var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Events = Matter.Events,
    Composites = Matter.Composites,
    Common = Matter.Common,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Composite = Matter.Composite,
    Vector = Matter.Vector,
    Bounds = Matter.Bounds,
    Bodies = Matter.Bodies

  var world = engine.world

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

  // get the centre of the viewport
  var viewportCentre = {
    x: render.options.width * 0.5,
    y: render.options.height * 0.5,
  }

  // create limits for the viewport
  var extents = {
    min: { x: -2000, y: -2000 },
    max: { x: 10000, y: 10000 },
  }

  // keep track of current bounds scale (view zoom)
  var boundsScaleTarget = 1,
    boundsScale = {
      x: 1,
      y: 1,
    }

  // use a render event to control our view
  Events.on(render, 'beforeRender', function () {
    var world = engine.world,
      mouse = mouseConstraint.mouse,
      translate

    // mouse wheel controls zoom
    var scaleFactor = mouse.wheelDelta * -0.1
    if (scaleFactor !== 0) {
      if (
        (scaleFactor < 0 && boundsScale.x >= 0.6) ||
        (scaleFactor > 0 && boundsScale.x <= 1.4)
      ) {
        boundsScaleTarget += scaleFactor
      }
    }

    // if scale has changed
    if (Math.abs(boundsScale.x - boundsScaleTarget) > 0.01) {
      // smoothly tween scale factor
      scaleFactor = (boundsScaleTarget - boundsScale.x) * 0.2
      boundsScale.x += scaleFactor
      boundsScale.y += scaleFactor

      // scale the render bounds
      render.bounds.max.x =
        render.bounds.min.x + render.options.width * boundsScale.x
      render.bounds.max.y =
        render.bounds.min.y + render.options.height * boundsScale.y

      // translate so zoom is from centre of view
      translate = {
        x: render.options.width * scaleFactor * -0.5,
        y: render.options.height * scaleFactor * -0.5,
      }

      //console.log(translate);

      Bounds.translate(render.bounds, translate)

      // update mouse
      Mouse.setScale(mouse, boundsScale)
      Mouse.setOffset(mouse, render.bounds.min)
    }

    // get vector from mouse relative to centre of viewport
    var deltaCentre = Vector.sub(mouse.absolute, viewportCentre),
      centreDist = Vector.magnitude(deltaCentre)

    // translate the view if mouse has moved over 50px from the centre of viewport
    if (centreDist > 50) {
      // create a vector to translate the view, allowing the user to control view speed
      var direction = Vector.normalise(deltaCentre),
        speed = Math.min(10, Math.pow(centreDist - 50, 2) * 0.0002)

      translate = Vector.mult(direction, speed)

      // prevent the view moving outside the extents
      if (render.bounds.min.x + translate.x < extents.min.x)
        translate.x = extents.min.x - render.bounds.min.x

      if (render.bounds.max.x + translate.x > extents.max.x)
        translate.x = extents.max.x - render.bounds.max.x

      if (render.bounds.min.y + translate.y < extents.min.y)
        translate.y = extents.min.y - render.bounds.min.y

      if (render.bounds.max.y + translate.y > extents.max.y)
        translate.y = extents.max.y - render.bounds.max.y

      // move the view
      Bounds.translate(render.bounds, translate)
      //console.info(translate);

      // we must update the mouse too
      Mouse.setOffset(mouse, render.bounds.min)
    }
  })
}
