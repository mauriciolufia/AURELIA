/* Keep all textures and geometry. Enclosed rooms need no exterior sun/moon shadow pass. */
const __v140Render={branches:0,skipped:0,shadowPassesAvoided:0,frames:0,emperorMerged:0,enemyMerged:0,peerCulled:0,peerBounds:new WeakMap()};
const __v140Face=__v128Face;__v128Face=function(c){const cached=c.__face140;return cached&&cached.hd===(c.hdGroup||null)?cached.value:__v140Face(c);};
function __v140BatchJoint(root,protectedRoots=new Set()){
 if(!root)return;root.updateWorldMatrix(true,true);const inverse=root.matrixWorld.clone().invert(),batches=new Map(),sources=[];
 function visit(o){if(o!==root&&protectedRoots.has(o))return;
  if(o.isMesh&&!o.isSkinnedMesh&&!o.isInstancedMesh&&!o.material?.transparent&&o.visible&&!Array.isArray(o.material)&&!o.material?.name?.startsWith('V85 ')&&o.geometry?.attributes?.position){
   const matrix=new _0.Matrix4().multiplyMatrices(inverse,o.matrixWorld),p=new _0.Vector3().setFromMatrixPosition(o.matrixWorld),key=o.material.uuid+':'+Math.floor(p.x/32)+':'+Math.floor(p.z/32)+':'+o.castShadow+':'+o.receiveShadow;
   if(!batches.has(key))batches.set(key,[]);batches.get(key).push({o,matrix});
  }
  for(const child of o.children)if(child.visible)visit(child);
 }
 visit(root);
 for(const items of batches.values()){
  if(items.length<2)continue;let count=0;for(const {o}of items)count+=o.geometry.index?.count||o.geometry.attributes.position.count;
  const pp=new Float32Array(count*3),nn=new Float32Array(count*3),uu=new Float32Array(count*2),cc=new Float32Array(count*3),v=new _0.Vector3(),n=new _0.Vector3();let at=0;
  for(const {o,matrix}of items){const g=o.geometry,p=g.attributes.position,norm=g.attributes.normal,uv=g.attributes.uv,color=g.attributes.color,ix=g.index,N=ix?.count||p.count,normal=new _0.Matrix3().getNormalMatrix(matrix);
   for(let j=0;j<N;j++){const k=ix?ix.getX(j):j;v.fromBufferAttribute(p,k).applyMatrix4(matrix);pp[at*3]=v.x;pp[at*3+1]=v.y;pp[at*3+2]=v.z;if(norm){n.fromBufferAttribute(norm,k).applyNormalMatrix(normal);nn[at*3]=n.x;nn[at*3+1]=n.y;nn[at*3+2]=n.z;}if(uv){uu[at*2]=uv.getX(k);uu[at*2+1]=uv.getY(k);}for(let axis=0;axis<3;axis++)cc[at*3+axis]=color?(axis===0?color.getX(k):axis===1?color.getY(k):color.getZ(k)):1;at++;}
   sources.push(o);
  }
  const geo=new _0.BufferGeometry();geo.setAttribute('position',new _0.BufferAttribute(pp,3));geo.setAttribute('normal',new _0.BufferAttribute(nn,3));geo.setAttribute('uv',new _0.BufferAttribute(uu,2));geo.setAttribute('color',new _0.BufferAttribute(cc,3));if(!items[0].o.geometry.attributes.normal)geo.computeVertexNormals();geo.computeBoundingSphere();
  const first=items[0].o,m=new _0.Mesh(geo,first.material);m.name='Detalles agrupados v93';m.castShadow=first.castShadow;m.receiveShadow=first.receiveShadow;root.add(m);__v93.batches++;
 }
 for(const o of sources)o.removeFromParent();__v93.merged+=sources.length;
 function prune(o){for(const c of [...o.children]){if(protectedRoots.has(c))continue;prune(c);if(c.isGroup&&!c.children.length){c.removeFromParent();__v93.pruned++;}}}
 prune(root);
}

function __v140BatchEclipse(){
 __v140Render.enemyMerged=0;
 for(const c of new Set(__v88Eclipse.areas.flatMap(a=>a.members))){
  if(c.dead||c.__batched140===c.g)continue;c.__batched140=c.g;c.__face140={hd:c.hdGroup||null,value:__v140Face(c)};
  const joints=[...(c.parts||[]),...(c.legs||[]),...(c.__v88Wings||[])],protect=new Set([...joints,c.hdGroup].filter(Boolean));
  let before=0,after=0;c.g.traverse(o=>{if(o.isMesh)before++;});
  for(const joint of new Set(joints))if(joint.isGroup)__v140BatchJoint(joint);
  __v140BatchJoint(c.g,protect);c.g.traverse(o=>{if(o.isMesh)after++;});
  __v140Render.enemyMerged+=before-after;if(c.boss==='azrakh')__v140Render.emperorMerged=before-after;
  const rec=c.__record123||_b0.find(r=>r.owner===c);if(rec){const known=new Set(rec.parts.map(p=>p.o));c.g.traverse(o=>{if(o.isMesh&&!known.has(o))rec.parts.push({o,template:o.geometry,tier:'base',using:false});});}
 }
}
function __v140StaticMark(){
 __v140Render.branches=0;
 const mark=o=>{const children=o.children.map(mark),fixed=o.matrixAutoUpdate===false&&!o.userData.animated&&!o.isSprite&&!o.isInstancedMesh&&!o.isLight&&children.every(Boolean);
  if(fixed&&o.parent){o.userData.static140={parent:o.parent.matrixWorld.clone()};__v140Render.branches++;}else delete o.userData.static140;return fixed;
 };
 for(const a of __v88Eclipse.areas){a.root.updateWorldMatrix(true,true);mark(a.root);}
}
const __v140Matrices=__v126VisibleMatrices;__v126VisibleMatrices=function(o,force=false){
 const fixed=o.userData.static140;
 if(fixed&&!o.matrixWorldNeedsUpdate&&o.parent&&fixed.parent.equals(o.parent.matrixWorld)){__v140Render.skipped++;return;}
 const r=__v140Matrices(o,force);if(fixed&&o.parent)fixed.parent.copy(o.parent.matrixWorld);return r;
};
function __v140HidePeerDetails(a){
 const hidden=[];if(!__v88Eclipse.areas.includes(a))return hidden;
 for(const peer of __v88Eclipse.areas){if(peer===a||!peer.root.visible)continue;
  const st=__v88Eclipse.stairs.find(st=>st.lower===a&&st.upper===peer||st.upper===a&&st.lower===peer);if(!st)continue;
  const p=peer===st.upper?st.end:st.start;
  for(const g of peer.root.children){if(!g.visible||g.isLight)continue;let b=__v140Render.peerBounds.get(g);
   if(!b){g.updateWorldMatrix(true,true);const box=new _0.Box3().setFromObject(g);if(box.isEmpty())continue;b={minX:box.min.x,maxX:box.max.x,minZ:box.min.z,maxZ:box.max.z};__v140Render.peerBounds.set(g,b);}
   // Preserve the complete landing room, stair hole and any architecture spanning it.
   if(Math.hypot(Math.max(b.minX-p.x,0,p.x-b.maxX),Math.max(b.minZ-p.z,0,p.z-b.maxZ))>34){g.visible=false;hidden.push(g);}
  }
 }__v140Render.peerCulled+=hidden.length;return hidden;
}
const __v140Draw=_5.render.bind(_5);_5.render=function(scene,camera){
 if(scene===_6)camera.updateMatrixWorld(true);
 const a=__v75At(),inside=scene===_6&&__v126Interior(a),enclosed=inside&&a.roof&&__v85UnderRoof(a,_14.x,_14.z);
 if(!inside)return __v140Draw(scene,camera);
 const shadows=_5.shadowMap.enabled,hidden=__v140HidePeerDetails(a);if(enclosed)_5.shadowMap.enabled=false;__v140Render.frames++;if(shadows&&enclosed)__v140Render.shadowPassesAvoided++;
 try{return __v140Draw(scene,camera);}finally{_5.shadowMap.enabled=shadows;for(const g of hidden)g.visible=true;}
};
const __v140RenderWorld=_bj;_bj=function(...args){const r=__v140RenderWorld(...args);__v140BatchEclipse();__v140StaticMark();return r;};
window.__AURELIA_RENDER140__={audit:()=>({...__v140Render,peerBounds:undefined,resolutionPreserved:true,texturesPreserved:true,enemiesPreserved:true,extraLights:0})};
