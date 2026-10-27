/* Sparse, persistent garrisons in every Eclipse chamber. Suppression never awards a kill. */
function __v126Interior(a){return !!a&&__v83.areas.includes(a);}
const __v126={rosters:new WeakMap(),rooms:[],matrixVisits:0,interiorRoots:new Set()};
__v124ThinEclipse=function(){};
function __v126Room(a,c){const p=__v83Local(a,c.g.position.x,c.g.position.z),fills=a.design.room_fills;const inside=fills.findIndex(f=>__v84PointInRing(p,f.polygon));if(inside>=0)return inside;let best=0,dist=Infinity;for(const[i,q]of a.design.centers.entries()){const d=Math.hypot(p[0]-q[0],p[1]-q[1]);if(d<dist){dist=d;best=i;}}return Math.min(best,fills.length-1);}
function __v126Population(){
 __v126.rooms=[];
 for(const a of __v88Eclipse.areas){
  let roster=__v126.rosters.get(a);
  if(!roster){
   const all=_m.filter(c=>c.hostile&&c.__v83Area===a.key&&!c.__v83Retired),groups=a.design.room_fills.map(()=>[]),keep=new Set();
   for(const c of all)groups[__v126Room(a,c)].push(c);
   for(const[i,list]of groups.entries()){
    list.sort((x,y)=>Number(!!(y.boss||y.questElite||y.__v52KeyArea||y.__v76KeyDrops?.length||y.__v87SecretGuard))-Number(!!(x.boss||x.questElite||x.__v52KeyArea||x.__v76KeyDrops?.length||x.__v87SecretGuard))||String(x.spawnId).localeCompare(String(y.spawnId)));
    const limit=i%2?4:3;
    for(let j=list.length;j<limit;j++){
     const ref={...all[0],__v83Area:a.key,g:new _0.Group()};ref.g.position.y=a.y;let point=null;
     for(let k=0;k<100;k++){const center=a.design.centers[i],angle=k*2.399,rad=6+Math.floor(k/10)*1.5,q=__v83Point(a,[center[0]+Math.cos(angle)*rad,center[1]+Math.sin(angle)*rad]);if(!__v84PointInRing(__v83Local(a,q.x,q.z),a.design.room_fills[i].polygon)||a.traps.some(t=>Math.abs(q.x-t.x)<t.w/2+2&&Math.abs(q.z-t.z)<t.d/2+2)||list.some(c=>Math.hypot(c.x-q.x,c.z-q.z)<2.5))continue;point=__v91SpawnFree(ref,q.x,q.z);if(point)break;}
     if(!point)throw Error('No safe Eclipse garrison cell '+a.key+'/'+i);
     const c=__v88SpawnAbyss(a,point,126000+i*4+j);__v109Ensure(c);__v91Remember(c);all.push(c);list.push(c);
    }
    for(const c of list.slice(0,limit))keep.add(c);
   }
   roster={all,keep,groups};__v126.rosters.set(a,roster);
  }
  for(const c of roster.all){if(roster.keep.has(c))continue;c.__suppressed126=true;c.dead=true;c.hp=0;c.respawn=Infinity;if(c.specialAction)_d3(c);c.g.visible=false;if(c.warning)c.warning.visible=false;for(const r of _b0)if(r.owner===c)_cq(r,false);}
  a.members=roster.all.filter(c=>roster.keep.has(c));
  for(const[i,list]of roster.groups.entries())__v126.rooms.push({floor:a.key,room:i,allocated:list.filter(c=>roster.keep.has(c)).length,alive:list.filter(c=>roster.keep.has(c)&&!c.dead).length});
 }
 __v114PerfReset();
}
// Batch late static decorations as well; keep every interactive or animated subtree independent.
function __v126Static(){
 __v126.interiorRoots=new Set(__v88Eclipse.areas.flatMap(a=>[a.root,...a.groups]));
 for(const a of __v88Eclipse.areas){
  const protectedRoots=new Set([...a.traps.map(t=>t.g),...a.doors.flatMap(d=>[d.g,d.leaf,d.pivot].filter(Boolean)),...__v75.objects.filter(o=>o.area===a).map(o=>o.g)]);
  a.root.traverse(o=>{if(o.userData.animated||o.isSprite||o.isInstancedMesh)protectedRoots.add(o);});
  __v93Batch(a.root,protectedRoots);
  function freeze(o){if(protectedRoots.has(o))return true;let dynamic=false;for(const child of o.children)if(freeze(child))dynamic=true;if(!dynamic){o.updateMatrix();o.matrixAutoUpdate=false;}return dynamic;}
  a.root.updateMatrixWorld(true);freeze(a.root);
 }
}
const __v126World=_bj;_bj=function(...args){const r=__v126World(...args);__v126Population();__v126Static();if(__v123.ready)__v123RootsBuild();return r;};
const __v126Load=_dn;_dn=function(...args){const r=__v126Load(...args);__v126Population();return r;};
// Three.js normally updates matrices even beneath invisible floors and distant scenery.
// During an interior draw update visible branches only. Re-entry updates them before their first draw.
function __v126VisibleMatrices(o,force=false){
 if(!o.visible&&!o.isLight)return;__v126.matrixVisits++;
 if(o.matrixAutoUpdate)o.updateMatrix();
 if(o.matrixWorldNeedsUpdate||force){if(o.matrixWorldAutoUpdate!==false){if(o.parent===null)o.matrixWorld.copy(o.matrix);else o.matrixWorld.multiplyMatrices(o.parent.matrixWorld,o.matrix);}o.matrixWorldNeedsUpdate=false;force=true;}
 for(const child of o.children)__v126VisibleMatrices(child,force);
}
const __v126Render=_5.render.bind(_5);_5.render=function(scene,camera){
 const a=__v75At();if(scene!==_6||!__v126Interior(a))return __v126Render(scene,camera);
 const hidden=[],enclosed=true;
 if(enclosed){for(const r of __v123.rootLoaded)if(r.g.visible&&!__v126.interiorRoots.has(r.g)&&__v123RootDistance(r)>96){hidden.push(r.g);r.g.visible=false;}for(const c of __v93.chunks||[])if(c.mesh.visible&&Math.hypot(Math.max(c.minX-_14.x,0,_14.x-c.maxX),Math.max(c.minZ-_14.z,0,_14.z-c.maxZ))>96){hidden.push(c.mesh);c.mesh.visible=false;}}
 const update=scene.updateMatrixWorld;__v126.matrixVisits=0;scene.updateMatrixWorld=function(force){__v126VisibleMatrices(this,force);};try{return __v126Render(scene,camera);}finally{scene.updateMatrixWorld=update;for(const g of hidden)g.visible=true;}
};
window.__AURELIA_ECLIPSE126__={audit:()=>({rooms:__v126.rooms.map(r=>({...r})),matrixVisits:__v126.matrixVisits,drawCalls:_5.info.render.calls,triangles:_5.info.render.triangles,targetFPS:60,resolution:[_5.domElement.width,_5.domElement.height]})};
// Reuse identical line-of-sight queries within a frame, never across movement or door ticks.
const __v126Sight=new WeakMap(),__v126LOS=__v92LOS;
__v92LOS=function(c,strict=false){if(!c?.g||!__v126Interior(__v75At()))return __v126LOS(c,strict);const p=c.g.position,key=[_10,__v75.clock,p.x,p.y,p.z,_14.x,_14.y,_14.z,strict].join('|'),old=__v126Sight.get(c);if(old?.key===key)return old.value;const value=__v126LOS(c,strict);__v126Sight.set(c,{key,value});return value;};
// Visibility checks need resident actors only. Static distance culling changes on movement, not animation.
const __v126Visibility=__v93Visibility;let __v126CullAt=-Infinity,__v126CullPos=null;
__v93Visibility=function(){const a=__v75At();if(!__v123.ready||!__v126Interior(a))return __v126Visibility();const records=__v93.records,groups=__v93.cullGroups,chunks=__v93.chunks,repeat=__v126CullPos?.area===a&&_10-__v126CullAt<.1&&Math.hypot(_14.x-__v126CullPos.x,_14.z-__v126CullPos.z)<2;__v93.records=[...__v123.loaded];if(repeat){__v93.cullGroups=[];__v93.chunks=[];}else{__v126CullAt=_10;__v126CullPos={area:a,x:_14.x,z:_14.z};}try{return __v126Visibility();}finally{__v93.records=records;__v93.cullGroups=groups;__v93.chunks=chunks;}};
