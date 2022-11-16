/*
Quad class

 */


 import * as THREE          from 'three';
 import ShaderTemplate      from './shader'
 import QuadTreeLoD         from './quadtree'
 import {hexToRgbA}         from './utils'
 import {getRandomColor}    from './utils'


 export default class Quad {

  constructor(dim,resolution,texture,levels,setNumberOfquads){
    const instaMesh = this.initInstanceMesh(dim,resolution,texture,levels,setNumberOfquads)
    this. quadTree  = new QuadTreeLoD(instaMesh,dim,levels)
  }

  initInstanceMesh(dim,resolution,texture,levels,setNumberOfquads){
    const geometry = new THREE.PlaneGeometry( 1, 1,resolution,resolution);
    const shader   = new ShaderTemplate(texture)
    shader.buildUniform(false,{color:hexToRgbA(getRandomColor())})
    shader.buildShaders()
    const shaderMaterial = new THREE.ShaderMaterial({
          uniforms:       shader.uniforms,
          vertexShader:   shader.vS,
          fragmentShader: shader.fS,
          wireframe:      false,

        })
    if(setNumberOfquads){
      var numberOfQuads = setNumberOfquads
    }else {
      var  numberOfQuads = (Math.pow(4,levels+1)-1)/3
    }
    const instaMesh     = new THREE.InstancedMesh(geometry,shaderMaterial , numberOfQuads);
    return instaMesh
  }



  createLodChildQuads(params,quadrent,color) {}

 }
