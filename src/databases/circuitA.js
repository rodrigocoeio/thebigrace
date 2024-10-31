export default {
  name: 'circuitA',
  obstacles: [
    {
      name: 'Plataform',
      form: 'rectangle',
      position: {
        x: 300,
        y: 350,
      },
      size: {
        width: 700,
        height: 20,
      },
      options: {
        isStatic: true,
        angle: -Math.PI * 0.06,
        render: { fillStyle: '#060a19' },
      },
    },
    {
      name: 'Plataform',
      form: 'rectangle',
      position: {
        x: 100,
        y: 580,
      },
      size: {
        width: 700,
        height: 20,
      },
      options: {
        isStatic: true,
        angle: Math.PI * 0.04,
        render: { fillStyle: '#060a19' },
      },
    },
    {
      name: 'Plataform',
      form: 'rectangle',
      position: {
        x: 0,
        y: 900,
      },
      size: {
        width: 900,
        height: 20,
      },
      options: {
        isStatic: true,
        angle: Math.PI * 0.07,
        render: { fillStyle: '#060a19' },
      },
    },
    {
      name: 'Plataform',
      form: 'rectangle',
      position: {
        x: 200,
        y: 1200,
      },
      size: {
        width: 900,
        height: 20,
      },
      options: {
        isStatic: true,
        angle: -Math.PI * 0.04,
        render: { fillStyle: '#060a19' },
      },
    },
    {
      name: 'Plataform',
      form: 'rectangle',
      position: {
        x: -100,
        y: 1500,
      },
      size: {
        width: 900,
        height: 20,
      },
      options: {
        isStatic: true,
        angle: Math.PI * 0.04,
        render: { fillStyle: '#060a19' },
      },
    },
    {
      name: 'Circle',
      form: 'circle',
      position: {
        x: -100,
        y: 1100,
      },
      radius: 30,
      options: {
        isStatic: true,
        angle: Math.PI * 0.04,
        render: { fillStyle: '#060a19' },
      },
    },
    {
      name: 'Polygon',
      form: 'polygon',
      position: {
        x: -100,
        y: 1300,
      },
      sides: 3,
      radius: 30,
      options: {
        isStatic: true,
        angle: Math.PI * 0.04,
        render: { fillStyle: '#060a19' },
      },
    },
  ],
}
