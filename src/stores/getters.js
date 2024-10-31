export default {
  circuit() {
    var circuitName = this.game.circuit
    return this.circuits.find(circuit => circuit.name === circuitName)
  },

  obstacles() {
    var circuit = this.circuit

    return circuit ? circuit.obstacles : []
  },
}
