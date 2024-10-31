<template>
  <div id="game"></div>
</template>

<script>
import startEngine from "../engines/startEngine";
import useStore from "$/store.js";

export default {
  data() {
    return {
      Engine: false,
      options: {

      }
    };
  },
  mounted() {
    this.gameCanvasElement = document.getElementById("game");
    this.Engine = startEngine(this.gameCanvasElement, this.options);
    window.Engine = this.Engine;

    this.mountBounderies();
    this.mountCircuit();
    //this.addStackBalls();
    this.lookAt();
  },
  methods: {
    mountBounderies() {
      var Composite = Matter.Composite,
        Bodies = Matter.Bodies,
        world = Engine.world

      // Walls
      Composite.add(world, [
        // top          long, lati, width, height
        Bodies.rectangle(0, 0, 2300, 50, { isStatic: true }),
        // bottom
        Bodies.rectangle(0, 1800, 2300, 50, { isStatic: true }),
        // left
        Bodies.rectangle(-1150, 900, 50, 1800, { isStatic: true }),
        // right
        Bodies.rectangle(1150, 900, 50, 1800, { isStatic: true }),
      ])
    },

    mountCircuit() {
      const store = useStore();
      const obstacles = store.obstacles;

      obstacles.forEach(obstacle => {
        switch (obstacle.form) {
          case "rectangle":
            this.addRectangle(obstacle);
            break;

          case "circle":
            this.addCircle(obstacle);
            break;

          case "polygon":
            this.addPolygon(obstacle);
            break;
        }
      });
    },

    // Add Rectangle
    addRectangle(object) {
      var Composite = Matter.Composite,
        Bodies = Matter.Bodies,
        world = Engine.world

      object.body = Bodies.rectangle(object.position.x, object.position.y,
        object.size.width, object.size.height,
        object.options);

      Composite.add(world, object.body);
    },

    // Add Circle
    addCircle(object) {
      var Composite = Matter.Composite,
        Bodies = Matter.Bodies,
        world = Engine.world

      object.body = Bodies.circle(object.position.x, object.position.y,
        object.radius,
        object.options);

      Composite.add(world, object.body);
    },

    // Add Polygon
    addPolygon(object) {
      var Composite = Matter.Composite,
        Bodies = Matter.Bodies,
        world = Engine.world

      object.body = Bodies.polygon(object.position.x, object.position.y,
        object.sides,
        object.radius,
        object.options);

      Composite.add(world, object.body);
    },

    addStackBalls() {
      var Composite = Matter.Composite,
        Composites = Matter.Composites,
        Common = Matter.Common,
        Bodies = Matter.Bodies,
        world = Engine.world,
        render = Engine.render

      // add bodies
      var stack = Composites.stack(450, 0, 1, 5, 0, 0, function (x, y) {
        Common._seed = new Date().getMilliseconds()
        return Bodies.circle(x, y, Common.random(10, 20), {
          friction: 0.00001,
          restitution: 0.5,
          density: 0.001,
          render: {
            //fillStyle: 'red',
            strokeStyle: 'black',
            lineWidth: 1,
          },
        })
      })

      Composite.add(world, stack)

      // wrapping using matter-wrap plugin
      for (var i = 0; i < stack.bodies.length; i += 1) {
        stack.bodies[i].plugin.wrap = {
          min: { x: render.bounds.min.x, y: render.bounds.min.y },
          max: { x: render.bounds.max.x, y: render.bounds.max.y },
        }
      }
    },

    lookAt() {
      var Composite = Matter.Composite,
        Render = Matter.Render,
        world = Engine.world,
        render = Engine.render

      Render.lookAt(render, Composite.allBodies(world))
    }
  }
}
</script>

<style scoped>
#game {
  width: 700px;
  height: 100%;
}
</style>
