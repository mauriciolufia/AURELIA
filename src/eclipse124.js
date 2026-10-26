/* Final-zone atmosphere: batched wall sculptures and readable, raster-lit darkness. */
const __v124RayMaterial=new _0.MeshBasicMaterial({color:'#21122f'}),__v124RayCore=new _0.MeshBasicMaterial({color:'#ad78c9'});
const __v124EyeGeometry=new _0.SphereGeometry(.085,8,6);
const __v124EyeMaterial=new _0.MeshBasicMaterial({color:'#d39bca'});
const __v124Eclipse={statues:[],traps:[],rooms:0};
function __v124StatueTemplate(variant){const g=new _0.Group(),stone=variant%2?'#423d51':'#514252',trim='#ad90b3';__v97Model(g,[['bevel',stone,0,0,0,1.7,.4,1.0],['bevel',stone,0,1.4,0,1.1,1.8,.6],['sphere',stone,0,2.7,-.08,.53,.66,.42],['bevel',trim,0,2.27,-.42,.58,.28,.18],['gem','#ae7399',-.21,2.82,-.45,.10,.06,.04],['gem','#ae7399',.21,2.82,-.45,.10,.06,.04],['box','#272331',0,2.57,-.48,.31,.07,.04]]);for(const side of[-1,1]){__v97Model(g,[['cone',trim,side*.45,3.35,0,.19,1.0,.18,0,0,-side*.4],['bevel',stone,side*.78,1.8,0,.44,1.3,.48,0,0,side*.25],['cone',trim,side*.78,1.12,-.25,.17,.52,.17,0,0,Math.PI],['cone',stone,side*1.23,2.0,.12,.5,2.5,.24,0,0,-side*.85],['bevel',stone,side*.33,.57,0,.38,.95,.52]]);}for(let i=0;i<4;i++)__v97Model(g,[['cone','#d2bdc5',-.22+i*.145,2.45,-.51,.045,.16,.055,0,0,Math.PI],['gem','#80628f',0,1.0+i*.27,-.35,.13,.18,.06]]);
 for(const side of[-1,1])for(let i=0;i<3;i++)__v97Model(g,[['box',trim,side*(.95+i*.12),2.1-i*.2,-.08,.06,1.35-i*.15,.07,0,0,-side*(.65+i*.19)],['box',trim,side*.3,1.8-i*.23,-.35,.44,.055,.04,0,0,side*.2]]);
 const eyes=new _0.Mesh(__v124EyeGeometry,__v124EyeMaterial);eyes.position.set(-.21,2.82,-.49);eyes.scale.y=.5;g.add(eyes);const other=eyes.clone();other.position.x=.21;g.add(other);return g;}
function __v124EclipseBuild(){
 __v124Eclipse.statues=[];__v124Eclipse.traps=[];__v124Eclipse.rooms=0;
 for(const a of __v88Eclipse.areas){
  const root=new _0.Group();root.name='Guardianes demoníacos de los muros · Eclipse';a.root.add(root);a.statues124=root;const batches=new Map();
  for(const [room,fill]of a.design.room_fills.entries()){
   __v124Eclipse.rooms++;const poly=fill.polygon,center=a.design.centers[room]||poly[0],placed=[];
   for(let j=0;j<poly.length;j++){
    const u=poly[j],v=poly[(j+1)%poly.length],len=Math.hypot(v[0]-u[0],v[1]-u[1]);if(len<7)continue;
    for(const t of[.33,.67,.5]){const q=[u[0]+(v[0]-u[0])*t,u[1]+(v[1]-u[1])*t],inward=[center[0]-q[0],center[1]-q[1]],l=Math.hypot(...inward)||1,p=__v83Point(a,[q[0]+inward[0]/l*.65,q[1]+inward[1]/l*.65]);
     if(a.doors.some(d=>Math.hypot(d.x-p.x,d.z-p.z)<4.5)||placed.some(o=>Math.hypot(o.x-p.x,o.z-p.z)<5))continue;
     const target=__v83Point(a,center),g=__v124StatueTemplate(room+j);g.position.set(p.x,a.y+1.1,p.z);g.rotation.y=Math.atan2(-(target.x-p.x),-(target.z-p.z));g.updateMatrixWorld(true);g.traverse(m=>{if(!m.isMesh)return;const key=m.geometry.uuid+'|'+m.material.uuid;if(!batches.has(key))batches.set(key,{geometry:m.geometry,material:m.material,matrices:[]});batches.get(key).matrices.push(m.matrixWorld.clone());});
     placed.push(p);__v124Eclipse.statues.push({area:a.key,room,...p});break;
    }
    if(placed.length>=2)break;
   }
  }
  for(const b of batches.values()){const mesh=new _0.InstancedMesh(b.geometry,b.material,b.matrices.length);b.matrices.forEach((m,i)=>mesh.setMatrixAt(i,m));mesh.instanceMatrix.needsUpdate=true;mesh.computeBoundingSphere();mesh.receiveShadow=true;root.add(mesh);}
  const spots=__v108CorridorSpots(a);for(let i=0;i<4;i++){const p=spots[Math.min(spots.length-1,i*2+1)]||a.rooms[Math.min(a.rooms.length-1,i+1)];if(!p)continue;const t=__v108NewBand(a,{x:p.x,z:p.z,axis:p.axis||{x:1,z:0}},i%2?'dark':'blackray124',12400+i);t.damage=.12;t.period=7.5;t.eclipse124=true;__v108BandModel(t);__v124Eclipse.traps.push(t);}
 }
}
Object.assign(__v75TrapNames,{blackray124:'Rayos negros'});__v108BandTypes.add('blackray124');
const __v124BlackModel=__v108BandModel;__v108BandModel=function(t,...args){const r=__v124BlackModel(t,...args);if(t.type==='blackray124'){t.pad.visible=false;t.h.visible=false;let beam=t.ray124;if(!beam){beam=t.ray124=new _0.Group();beam.name='Rayos negros · descarga de muro a muro';t.g.add(beam);}for(const child of [...beam.children]){child.geometry?.dispose();child.removeFromParent();}const across=t.w>t.d,span=across?t.w:t.d;
 for(const height of[.7,1.65,2.7,3.65]){const points=[];for(let i=0;i<=14;i++){const u=(i/14-.5)*span,jitter=i===0||i===14?0:Math.sin(i*11.7+height*8)*.17;points.push(new _0.Vector3(across?u:jitter,height+jitter,across?jitter:u));}const curve=new _0.CatmullRomCurve3(points);for(const [radius,material]of[[.10,__v124RayMaterial],[.025,__v124RayCore]]){const m=new _0.Mesh(new _0.TubeGeometry(curve,28,radius,5,false),material);beam.add(m);}}
 beam.visible=false;}return r;};
const __v124BlackHit=__v75Activate;__v75Activate=function(t,...args){if(t.type==='blackray124')return __v43TrapImmune()?false:__v75Damage(.12,'Rayos negros',null);return __v124BlackHit(t,...args);};
const __v124EclipseTick=__v75Tick;__v75Tick=function(dt){const r=__v124EclipseTick(dt);if(_u&&!_74()){const a=__v75At();for(const t of __v124Eclipse.traps)if(t.ray124)t.ray124.visible=t.area===a&&t.active;}return r;};
const __v124EclipseLight=__v106InteriorLight;__v106InteriorLight=function(){const r=__v124EclipseLight(),a=__v75At();if(a&&__v88Eclipse.areas.includes(a)){_9.intensity*=.84;sun.intensity*=.72;_a.intensity*=.85;_5.toneMappingExposure*=.94;}return r;};
const __v124EclipseWorld=_bj;_bj=function(...args){const r=__v124EclipseWorld(...args);__v124EclipseBuild();return r;};
window.__AURELIA_ECLIPSE124__={audit:()=>({rooms:__v124Eclipse.rooms,statues:__v124Eclipse.statues,traps:__v124Eclipse.traps.map(t=>({area:t.area.key,type:t.type,x:t.x,z:t.z})),hemisphereFactor:.84,exposureFactor:.94,extraLights:0})};
