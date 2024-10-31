<template>
  <div id="dev" class="card text-center">
    <div class="card-header">
      <ul class="nav nav-tabs card-header-tabs">
        <li class="nav-item">
          <a :class="['nav-link', page == 'main' ? 'active' : '']" href="#" @click="page = 'main'">Main</a>
        </li>
        <li class="nav-item">
          <a :class="['nav-link', page == 'circuit' ? 'active' : '']" href="#" @click="page = 'circuit'">Circuit</a>
        </li>
      </ul>
    </div>
    <div v-if="page == 'main'" class="card-body">
      <button class="btn btn-info" @click="addBall">Add Ball</button>
      <button class="btn btn-info" @click="info">Info</button>
      <button class="btn btn-info" @click="fullView">Full View</button>
      <button class="btn btn-info" @click="mouseView">Mouse View</button>
      <button class="btn btn-info" @click="followFirst">Follow First</button>

      <div class="card">
        <h1>Info</h1>
      </div>
    </div>
    <div v-if="page == 'circuit'" class="card-body">
      <h1>Circuito</h1>
      <form>
        <div class="row">
          <label for="circuitName">Name</label>
          <input type="text" id="circuitName" class="form-control" v-model="circuit.name">
        </div>
        <div class="row">
          <label for="obstacles">Obstacles</label>
          <select id="obstacles" class="form-control">
            <option value=""></option>
            <option v-for="obstacle, index in circuit.obstacles" :value="index">{{ obstacle.name }}</option>
          </select>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import useStore from "@/stores/store";
import mouseView from "../engines/mouseView";

export default {
  data() {
    var store = useStore();

    return {
      page: 'main',
      circuit: store.circuit,
      balls: []
    }
  },
  methods: {
    info() {
      console.log(Engine);
    },
    mouseView() {
      mouseView(Engine.engine, Engine.render);
    },
    fullView() {
      var Composite = Matter.Composite,
        Render = Matter.Render,
        world = Engine.world,
        render = Engine.render

      Render.lookAt(render, Composite.allBodies(world))
    },
    followFirst() {
      var Composite = Matter.Composite,
        Render = Matter.Render,
        Events = Matter.Events,
        world = Engine.world,
        render = Engine.render,
        balls = this.balls

      Events.on(render, 'beforeRender', function () {
        var bs = balls.filter(ball => {
          return ball.speed > 0.1
        });
        bs.sort(function (a, b) {
          return a.position.y - b.position.y;
        })
        var first = bs[bs.length - 1];

        if (first)
          Render.lookAt(render, first, { x: 500, y: 500 })
      });
    },
    addBall() {
      var Composite = Matter.Composite,
        Common = Matter.Common,
        Bodies = Matter.Bodies,
        world = Engine.world

      // add bodies
      var ball = Bodies.circle(450, 50, 20, {
        friction: 0.00001,
        restitution: 0.5,
        density: 0.001,
        render: {
          //fillStyle: 'red',
          strokeStyle: 'black',
          lineWidth: 1,
        },
      })

      Composite.add(world, ball)

      this.balls.push(ball);
    },
    camera() {
      var
        Bounds = Matter.Bounds,
        render = Engine.render;

      render.bounds.max.x = render.bounds.max.x / 4;
      render.bounds.max.y = render.bounds.max.y / 4;
      //console.log(render);

      // Test View
      /* var translate = {
         x: -0.5,
         y: -0.5
      };
      Bounds.translate(render.bounds, translate); */
    }
  }
}
</script>

<style scoped>
#dev {
  width: 500px;
}

.card-body {
  width: 100%;
}
</style>
