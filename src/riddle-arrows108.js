/* Solving a statue reveals permanent floor arrows at the newly opened passage. */
const __v108Arrows={items:[],geometry:null,material:null};
function __v108ArrowAssets(){if(__v108Arrows.geometry)return;const s=new _0.Shape();s.moveTo(-.23,-1.45);s.lineTo(.23,-1.45);s.lineTo(.23,.25);s.lineTo(.85,.25);s.lineTo(0,1.35);s.lineTo(-.85,.25);s.lineTo(-.23,.25);s.closePath();const g=new _0.ShapeGeometry(s);g.rotateX(Math.PI/2);__v108Arrows.geometry=g;__v108Arrows.material=new _0.MeshBasicMaterial({color:'#7effd5',side:_0.DoubleSide,depthTest:true,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-2,polygonOffsetUnits:-2,toneMapped:false});}
function __v108Arrow(id,a,x,z,dx,dz){__v108ArrowAssets();const mesh=new _0.Mesh(__v108Arrows.geometry,__v108Arrows.material);mesh.name='Enigma resuelto · dirección del acceso';mesh.position.set(x,a.y+.19,z);mesh.rotation.y=Math.atan2(dx,dz);mesh.visible=false;mesh.userData.animated=true;a.root.attach(mesh);__v108Arrows.items.push({id,a,mesh,x,z,dx,dz});return mesh;}
function __v108SealArrows(){
 __v108Arrows.items=[];for(const {o,a,door}of __v102Riddles.seals){const dx=door.x-o.x,dz=door.z-o.z,len=Math.max(.01,Math.hypot(dx,dz)),axis=door.w<door.d?{x:Math.sign(dx)||1,z:0}:{x:0,z:Math.sign(dz)||1};
  for(const d of[-3,-.6,2])__v108Arrow(o.id,a,door.x+axis.x*d,door.z+axis.z*d,axis.x,axis.z);
 }
 for(const a of __v103.areas)for(const p of a.plan103.props.filter(p=>p.type==='riddle')){const [from,to]=p.seal,q=a.plan103.point(from),r=a.plan103.point(to),len=Math.max(.01,Math.hypot(r.x-q.x,r.z-q.z)),dx=(r.x-q.x)/len,dz=(r.z-q.z)/len,x=a.x+(q.x+r.x)/2,z=a.z+(q.z+r.z)/2;
  for(const d of[-2.5,0,2.5])__v108Arrow(p.id,a,x+dx*d,z+dz*d,dx,dz);
 }__v108ArrowSync();
}
function __v108ArrowSync(){const a=__v75At(),solved=new Set(__v75Save.riddles);for(const p of __v108Arrows.items)p.mesh.visible=p.a===a&&solved.has(p.id)&&Math.hypot(_14.x-p.x,_14.z-p.z)<65;}
const __v108ArrowAnswer=__v75Answer;__v75Answer=function(o,i){const result=__v108ArrowAnswer(o,i);if(result){__v108ArrowSync();_3a('Enigma resuelto · sigue las flechas del suelo hacia el acceso abierto.');}return result;};
const __v108ArrowCave=__v103Sync;__v103Sync=function(...args){const r=__v108ArrowCave(...args);__v108ArrowSync();return r;};
const __v108ArrowTick=__v75Tick;__v75Tick=function(dt){const r=__v108ArrowTick(dt);if(_u&&!_74())__v108ArrowSync();return r;};
const __v108ArrowWorld=_bj;_bj=function(...args){const r=__v108ArrowWorld(...args);__v108SealArrows();return r;};
const __v108ArrowLoad=_dn;_dn=function(...args){const r=__v108ArrowLoad(...args);__v108ArrowSync();return r;};
window.__AURELIA_RIDDLE_ARROWS108__={audit:()=>({arrows:__v108Arrows.items.length,solved:[...new Set(__v108Arrows.items.filter(p=>__v75Save.riddles.includes(p.id)).map(p=>p.id))],visible:__v108Arrows.items.filter(p=>p.mesh.visible).length})};
