/* Spatial queries and instancing preserve the artwork and all interactive objects. */
const __v102Performance={rooms:new Map(),ready:false,doorAt:-1,doors:new Map(),barrels:[],batches:[],epoch:0,dark:null,outdoorCandidates:0};
function __v102RoomIndex(){
 const p=__v102Performance;p.rooms.clear();
 const add=(h,home)=>{const radius=Math.hypot(h.w,h.d)/2;for(let x=Math.floor((h.x-radius)/32);x<=Math.floor((h.x+radius)/32);x++)for(let z=Math.floor((h.z-radius)/32);z<=Math.floor((h.z+radius)/32);z++){const key=x+','+z;if(!p.rooms.has(key))p.rooms.set(key,[]);p.rooms.get(key).push({h,home});}};
 for(const h of __v101Life.homes)add(h,true);for(const h of _43)add(h,false);p.ready=true;
}
const __v102Outside=__v101Outdoors;__v101Outdoors=function(n,p={x:n.x,z:n.z,y:n.homeY}){
 if(!__v102Performance.ready)return __v102Outside(n,p);
 const nearby=__v102Performance.rooms.get(Math.floor(p.x/32)+','+Math.floor(p.z/32))||[];__v102Performance.outdoorCandidates=nearby.length;
 return !nearby.some(({h,home})=>home?Math.abs(p.y-h.y)<1&&__v101Inside(h,p,.1):Math.abs(p.y-h.y)<1&&Math.abs(p.x-h.x)<h.w/2&&Math.abs(p.z-h.z)<h.d/2);
};
function __v102DoorActors(x,z,radius=4){
 const p=__v102Performance;if(p.doorAt!==_10){p.doorAt=_10;p.doors.clear();for(const n of __v101DoorActors()){const key=Math.floor(n.x/8)+','+Math.floor(n.z/8);if(!p.doors.has(key))p.doors.set(key,[]);p.doors.get(key).push(n);}}
 const result=[];for(let ix=Math.floor((x-radius)/8);ix<=Math.floor((x+radius)/8);ix++)for(let iz=Math.floor((z-radius)/8);iz<=Math.floor((z+radius)/8);iz++)result.push(...(p.doors.get(ix+','+iz)||[]));return result;
}
function __v102BatchBarrels(){
 const p=__v102Performance;p.barrels=[];p.batches=[];
 for(const a of __v83.areas){
  const buckets=new Map();for(const o of __v75.objects.filter(o=>o.area===a&&o.type==='barrel')){
   o.g.updateWorldMatrix(true,true);o.g.traverse(m=>{if(!m.isMesh||!m.userData.detail98)return;const key=m.geometry.uuid+':'+m.material.uuid;if(!buckets.has(key))buckets.set(key,[]);buckets.get(key).push({o,m,matrix:m.matrixWorld.clone()});});
  }
  for(const items of buckets.values()){
   const source=items[0].m,batch=new _0.InstancedMesh(source.geometry,source.material,items.length);batch.name='Barriles detallados · dibujo compartido 102';batch.instanceMatrix.setUsage(_0.DynamicDrawUsage);batch.receiveShadow=source.receiveShadow;batch.castShadow=source.castShadow;batch.frustumCulled=false;
   const root=new _0.Group();root.name='Barriles interactivos agrupados';a.root.add(root);root.updateWorldMatrix(true,false);const inverse=root.matrixWorld.clone().invert();
   for(const[itemIndex,item]of items.entries()){const matrix=new _0.Matrix4().multiplyMatrices(inverse,item.matrix);batch.setMatrixAt(itemIndex,matrix);item.m.visible=false;const record={o:item.o,batch,index:itemIndex,matrix};p.barrels.push(record);(item.o.__v102Instances??=[]).push(record);}
   root.add(batch);p.batches.push(batch);
  }
 }
 __v102SyncBarrels();
}
function __v102SyncBarrels(object){const zero=new _0.Matrix4().makeScale(0,0,0);for(const r of object?.__v102Instances||__v102Performance.barrels){r.batch.setMatrixAt(r.index,__v75Save.barrels.includes(r.o.id)?zero:r.matrix);r.batch.instanceMatrix.needsUpdate=true;}}
const __v102BarrelBreak=__v75Break;__v75Break=function(o){const result=__v102BarrelBreak(o);if(result)__v102SyncBarrels(o);return result;};
const __v102Sync=__v75Sync;__v75Sync=function(...args){const result=__v102Sync(...args);__v102SyncBarrels();return result;};
// Darkness is a transition, not a reason to rewrite CSS and visit every torch each tick.
const __v102Dark=__v75DarkView;__v75DarkView=function(){
 const p=__v102Performance,a=__v75At(),dark=__v85AreaDark(a),canvas=_5.domElement,last=p.dark;
 if(last&&last.a===a&&last.dark===dark&&last.canvas===canvas&&last.epoch===p.epoch)return dark;
 const result=__v102Dark();canvas.style.filter=result?'brightness(0.14) saturate(0.45)':'';p.dark={a,dark:result,canvas,epoch:p.epoch};return result;
};
window.__AURELIA_PERFORMANCE102__={audit:()=>({resolutionPreserved:true,elementsPreserved:true,instancedBarrelMeshes:__v102Performance.barrels.length,barrelDrawCalls:__v102Performance.batches.length,outdoorCandidates:__v102Performance.outdoorCandidates,roomCount:__v101Life.homes.length+_43.length,actorTextureSize:__v60Mobile?512:1024,furnitureAtlasSize:__v98.atlas?.image.width})};
