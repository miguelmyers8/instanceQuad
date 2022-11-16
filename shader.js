import * as THREE from 'three';



class ShaderTemplate{
      constructor(canvasURLS,scale=255.0){
        this.canvasURLS = canvasURLS
        this.scale = scale
    }




  buildUniform(isQtLoD=false,options){
    if(isQtLoD){
      var texture = this.canvasURLS
    }else{
      var texture = new THREE.CanvasTexture(this.canvasURLS)
    }
    this.uniforms ={}
    this.uniforms['uTerrain'] = {
      type:"t",
      value:texture
    }
    this.uniforms['uColors']   = {
      type:'vec3',
      value: new THREE.Vector3(...options['color'])
    }

  }



buildShaders(){
this.vS = `
  varying vec2 vUv;
  varying vec3 vViewPosition;
  uniform sampler2D uTerrain;
  varying vec3 vNorTerrain;
  varying vec4 HeightData;
  attribute vec2 uvOffsets;
  attribute vec2 uvOffsets_;
  attribute vec3 uInstanceColors;
  varying vec3 uInstanceColors_;

  varying vec2 vUUv;

  void main() {
          vUv = uv;
          mat4 im = instanceMatrix;
          vec4 mvPosition = vec4( position + normal, 1.0 );

         vUUv =( uv *  uvOffsets) + uvOffsets_;
          vec2 texelSize = vec2(1.0 / 500.0, 1.0 / 500.0);

          vNorTerrain =  normalize(vec3((texture2D(uTerrain, vUUv + vec2(-texelSize.x, 0)).r - texture2D(uTerrain,vUUv + vec2(texelSize.x, 0)).r),
         (texture2D(uTerrain,  vUUv + vec2(0,-texelSize.y)).r - texture2D(uTerrain, vUUv + vec2(0, texelSize.y)).r),
              0.09));

          vec4 HeightData = texture2D(uTerrain,vUUv);
          im[3].z += float(1000.0) * HeightData.r;
          mvPosition = im * mvPosition;
          uInstanceColors_ = uInstanceColors;
          mvPosition = modelViewMatrix * mvPosition;
          gl_Position = projectionMatrix * mvPosition;

      }
  `

  this.fS =`
  uniform sampler2D uTerrain;
  varying vec3 vNorTerrain;
  varying vec2 vUv;
  uniform vec3 uColors;
  varying vec2 vUUv;
  varying vec3 uInstanceColors_;

  void main() {
    vec4  HeightData = texture2D(uTerrain,vUUv);
    gl_FragColor = vec4(HeightData.rgb*uInstanceColors_.rgb,1.0);
  }
  `
}


  print(v,f){
    console.log(v,f)
  }

updateUniform (value){
  this.uniforms.uTerrain.value = this.canvasURLS.texture
}
}



export default ShaderTemplate
