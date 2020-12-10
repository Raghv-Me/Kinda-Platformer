function Sigmoid(i) {
  return Math.exp(i) / (Math.exp(i) + 1)
}

function DSigmoid(i) {
  return i * (1 - i)
}
class Layer {

  constructor(i, j) {
    this.n_inputs = i
    this.n_outputs = j
    this.outputs = []
    this.inputs = []
    this.weights = []
    this.weightsDeltas = []
    this.gamma = []
    this.error = []

    for (let i = 0; i < this.n_outputs; i++) {
      this.weights[i] = []
      this.weightsDeltas[i] = []
      for (let j = 0; j < this.n_inputs; j++) {
        this.weights[i][j] = random() - 0.5
        this.weightsDeltas[i][j] = 0
      }
    }

  }
  predict(inputs) {
    this.inputs = inputs.slice()

    for (let i = 0; i < this.n_outputs; i++) {
      this.outputs[i] = 0
      for (let j = 0; j < this.n_inputs; j++) {
        this.outputs[i] += this.inputs[j] * this.weights[i][j]
      }

      this.outputs[i] = Sigmoid(this.outputs[i])
    }
    return this.outputs
  }
  BackOutput(targets) {
    for (let i = 0; i < this.n_outputs; i++) {
      this.error[i] = this.outputs[i] - targets[i]
    }
    for (let i = 0; i < this.n_outputs; i++) {
      this.gamma[i] = DSigmoid(this.outputs[i]) * this.error[i]
    }
    for (let i = 0; i < this.n_outputs; i++) {
      for (let j = 0; j < this.n_inputs; j++) {
        this.weightsDeltas[i][j] = this.inputs[j] * this.gamma[i]
      }

    }
  }
  BackHidden(Gamma, Weights) {
    for (let i = 0; i < this.n_outputs; i++) {
      this.gamma[i] = 0
      for (let j = 0; j < Gamma.length; j++) {
        this.gamma[i] += Gamma[j] * Weights[j][i]
      }
      this.gamma[i] *= DSigmoid(this.outputs[i])
    }
    for (let i = 0; i < this.n_outputs; i++) {
      for (let j = 0; j < this.n_inputs; j++) {
        this.weightsDeltas[i][j] = this.inputs[j] * this.gamma[i]
      }

    }

  }
  updateWeights(lr) {
    for (let i = 0; i < this.n_outputs; i++) {
      for (let j = 0; j < this.n_inputs; j++) {
        this.weights[i][j] -= this.weightsDeltas[i][j] * lr
      }

    }
  }
  mutate(rate){
      for (let i = 0; i < this.n_outputs; i++) {
        for (let j = 0; j < this.n_inputs; j++) {
            if(random()<rate){
          this.weights[i][j]+=randomGaussian(0,0.3)}
        }

      }

  }
}

class NeuralNetwork {
  constructor(list,layers,lr = 0.05) {
    this.layer = list.slice()
    this.layers = []
    this.lr = lr;
    for (let i = 0; i < this.layer.length - 1; i++) {
      this.layers[i] = new Layer(list[i], list[i + 1])
    }
    if(layers){
        for(let i = 0;i<this.layers.length;i++){
            this.layers[i].weights = layers[i].weights.slice()
        }
    }
  }
  predict(inputs){
    this.layers[0].predict(inputs)
    for(let i = 1;i<this.layers.length;i++)
    {
      this.layers[i].predict(this.layers[i-1].outputs)
    }
    return this.layers[this.layers.length-1].outputs
  }
  train(inputs,target){
      this.predict(inputs)
      for (let i = this.layers.length-1;i>=0;i--)
      {
          if (i == this.layers.length-1)
          this.layers[i].BackOutput(target)
          else{
              this.layers[i].BackHidden(this.layers[i+1].gamma,this.layers[i+1].weights)
          }
      }
      for(let i = 0;i<this.layers.length;i++)
      {
        this.layers[i].updateWeights(this.lr)
      }

  }
  mutate(rate){
      for(let l of this.layers)
        l.mutate(rate)
  }
  copy()
  {
      return new NeuralNetwork(this.layer,JSON.parse(JSON.stringify(this.layers)))
  }

}
