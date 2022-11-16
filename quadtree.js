/*
QTLOD class (QuadTree LoD)

*/

import * as THREE          from 'three';
import {getRandomColor}    from './utils'
import {levelColor}        from './utils'
import {hexToRgbA}         from './utils'
import {norm}              from './utils'

export default class QuadTreeLoD {

constructor(instaMesh,dim,levels) {
  this.levels        = levels
  this.instaMesh     = instaMesh
  this.instaData     = [new THREE.Object3D()]
  this.numberOfQuads = (Math.pow(4,levels+1)-1)/3
  this.count         = 0
  this.dim           = dim
  this.uvs           = []
  this.uvs_          = []
  this.colors        = []
  this.buildQuadTree(dim,this.levels,this.instaData,this.instaMesh,this.uvs,this.uvs_,this.colors)
  instaMesh.geometry.setAttribute('uvOffsets',       new THREE.InstancedBufferAttribute( new Float32Array( this.uvs ),    2 ) );
  instaMesh.geometry.setAttribute('uvOffsets_',      new THREE.InstancedBufferAttribute( new Float32Array( this.uvs_ ),   2 ) );
  instaMesh.geometry.setAttribute('uInstanceColors', new THREE.InstancedBufferAttribute( new Float32Array( this.colors ), 3 ) );
  instaMesh.instanceMatrix.needsUpdate = true
  }

  buildQuadTree(startingDim,levels,parent,instaMesh,uvs,uvs_,colors){
    if (levels == 0){
      return 'Done'
    }else {
        if(parent.length == 1){
          parent[0].userData= {id:this.count,oringinalScale:startingDim,level:levels}
          parent[0].scale.set(startingDim,startingDim,0)
          parent[0].position.set(0,0,0)
          parent[0].updateMatrix(true);
          instaMesh.setMatrixAt( this.count, parent[0].matrix );
          var w = startingDim/2
          var h = startingDim/2
          uvs. push(1,1)
          uvs_.push(0,0)
          colors.push(...hexToRgbA(getRandomColor()))
          if (levels==1){
            return
          }else{
            var children = this.makeCildren(parent[0],w,h,instaMesh,uvs,uvs_,colors,levels)
            this.buildQuadTree(w,levels-1,children,instaMesh,uvs,uvs_,colors)
          }
        }else{
          var w = startingDim/2
          var h = startingDim/2
          var children1 = this.makeCildren(parent[0],w,h,instaMesh,uvs,uvs_,colors,levels)
          this.buildQuadTree(w,levels-1,children1,instaMesh,uvs,uvs_,colors)
          var children2 = this.makeCildren(parent[1],w,h,instaMesh,uvs,uvs_,colors,levels)
          this.buildQuadTree(w,levels-1,children2,instaMesh,uvs,uvs_,colors)
          var children3 = this.makeCildren(parent[2],w,h,instaMesh,uvs,uvs_,colors,levels)
          this.buildQuadTree(w,levels-1,children3,instaMesh,uvs,uvs_,colors)
          var children4 = this.makeCildren(parent[3],w,h,instaMesh,uvs,uvs_,colors,levels)
          this.buildQuadTree(w,levels-1,children4,instaMesh,uvs,uvs_,colors)
        }
      }

  }


   makeCildren(parent,w,h,instamesh,uvs,uvs_,colors,levels){


    var nw = new THREE.Object3D();
      this.count++
      var emptyMatrix = new THREE.Matrix4();
      nw.userData={id:this.count,oringinalScale:w,level:levels}
      nw.scale.set(w,h,0)
      nw.position.set((-w/2)+parent.position.x,(h/2)+parent.position.y,0)
    	nw.updateMatrixWorld(true);
      instamesh.setMatrixAt( this.count, emptyMatrix );
      var wp = nw.position
      var n = w/this.dim
      var n2 = n/2
      var nxj = norm(wp.x,(this.dim/2),-(this.dim/2))
      var nyj = norm(wp.y,(this.dim/2),-(this.dim/2))
      uvs.push(w/this.dim,h/this.dim)
      uvs_.push((nxj-n2),(nyj-n2))
      colors.push(...hexToRgbA(getRandomColor()))


    var ne = new THREE.Object3D();
      this.count++
      ne.userData={id:this.count,oringinalScale:w,level:levels}
      ne.scale.set(w,h,0)
      ne.position.set((w/2)+parent.position.x,(h/2)+parent.position.y, 0)
      ne.updateMatrixWorld();
      instamesh.setMatrixAt( this.count, emptyMatrix );
      var wp = ne.position
      var n = w/this.dim
      var n2 = n/2
      var nxj = norm(wp.x,(this.dim/2),-(this.dim/2))
      var nyj = norm(wp.y,(this.dim/2),-(this.dim/2))
      uvs.push(w/this.dim,h/this.dim)
      uvs_.push((nxj-n2),(nyj-n2))
      colors.push(...hexToRgbA(getRandomColor()))


    var sw = new THREE.Object3D();
      this.count++
      sw.userData={id:this.count,oringinalScale:w,level:levels}
      sw.scale.set(w,h,0)
      sw.position.set((-w/2)+parent.position.x,(-h/2)+parent.position.y,0)
      sw.updateMatrixWorld();
      instamesh.setMatrixAt( this.count, emptyMatrix);
      var wp = sw.position
      var n = w/this.dim
      var n2 = n/2
      var nxj = norm(wp.x,(this.dim/2),-(this.dim/2))
      var nyj = norm(wp.y,(this.dim/2),-(this.dim/2))
      uvs.push(w/this.dim,h/this.dim)
      uvs_.push((nxj-n2),(nyj-n2))
      colors.push(...hexToRgbA(getRandomColor()))



    var se = new THREE.Object3D();
      this.count++
      se.userData={id:this.count,oringinalScale:w,level:levels}
      se.scale.set(w,h,0)
      se.position.set((w/2)+parent.position.x,(-h/2)+parent.position.y,0)
      se.updateMatrixWorld();
      instamesh.setMatrixAt( this.count, emptyMatrix );
      var wp = se.position
      var n = w/this.dim
      var n2 = n/2
      var nxj = norm(wp.x,(this.dim/2),-(this.dim/2))
      var nyj = norm(wp.y,(this.dim/2),-(this.dim/2))
      uvs.push(w/this.dim,h/this.dim)
      uvs_.push((nxj-n2),(nyj-n2))
      colors.push(...hexToRgbA(getRandomColor()))

    parent.add(nw)
    parent.add(ne)
    parent.add(sw)
    parent.add(se)

    return [nw,ne,sw,se]
  }

  active(q,a){
    if (a == true){
      q.userData['active'] = a

      var x = q.userData.oringinalScale
      var y = q.userData.oringinalScale

      q.updateMatrixWorld(true);
      this.instaMesh.setMatrixAt( q.userData.id, q.matrix);
      if(q.children.length != 0){
        var emptyMatrix = new THREE.Matrix4();

        q.children[0].updateMatrixWorld(true);
        this.instaMesh.setMatrixAt( q.children[0].userData.id, emptyMatrix );

        q.children[1].updateMatrixWorld(true);
        this.instaMesh.setMatrixAt( q.children[1].userData.id, emptyMatrix );

        q.children[2].updateMatrixWorld(true);
        this.instaMesh.setMatrixAt( q.children[2].userData.id, emptyMatrix );

        q.children[3].updateMatrixWorld(true);
        this.instaMesh.setMatrixAt( q.children[3].userData.id, emptyMatrix );
        this.instaMesh.instanceMatrix.needsUpdate = true
      }
    }else if (a == false) {
      q.userData['active'] = a

      var emptyMatrix = new THREE.Matrix4();
      q.updateMatrixWorld(true);
      this.instaMesh.setMatrixAt( q.userData.id, emptyMatrix );

      if(q.children.length != 0){
      var x = q.children[0].userData.oringinalScale
      var y = q.children[0].userData.oringinalScale
      q.children[0].updateMatrixWorld(true);
      this.instaMesh.setMatrixAt( q.children[0].userData.id, q.children[0].matrix );

      var x = q.children[1].userData.oringinalScale
      var y = q.children[1].userData.oringinalScale
      q.children[1].updateMatrixWorld(true);
      this.instaMesh.setMatrixAt( q.children[1].userData.id, q.children[1].matrix );

      var x = q.children[2].userData.oringinalScale
      var y = q.children[2].userData.oringinalScale
      q.children[2].updateMatrixWorld(true);
      this.instaMesh.setMatrixAt( q.children[2].userData.id, q.children[2].matrix );

      var x = q.children[3].userData.oringinalScale
      var y = q.children[3].userData.oringinalScale
      q.children[3].updateMatrixWorld(true);
      this.instaMesh.setMatrixAt( q.children[3].userData.id, q.children[3].matrix );
      this.instaMesh.instanceMatrix.needsUpdate = true
      }
    }
  }


  update(player,quad){
  this.insert(player,quad)
}


insert(player,quad){
  this.active(quad,true)
  var distance = quad.position.distanceTo(player.position) //get distance from player to Quad
  if ((distance/4) < quad.userData.oringinalScale &&  quad.userData.level > 1){ //check if distance is less then the quads width
    let childList = this.createChildren(quad) //create 4 children
    for (let i = 0; i < childList.length; i++){//loop the children
      this.insert(player,childList[i])//run the algorithm recursively
      }
    }
}

createChildren(quad){
  this.active(quad,false)
  return [quad.children[0],quad.children[1],quad.children[2],quad.children[3]]
}
}
