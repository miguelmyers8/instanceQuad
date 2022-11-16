
import Quad from'./quad'

class DimensionalQuad {
  constructor(size,resolution,canvasTexture,levels,dimensions) {

  }

  makeDimensions(size,resolution,canvasTexture,levels,dimensions){
    this.quads = []
    for (var i = 0; i < dimensions; i++) {
      this.quads[i] = new Quad(size,resolution,canvasTexture,levels)
    }
  }
}
