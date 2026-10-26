/* Spatial residency, not deletion: quests, collisions, furniture and saves retain their identities.
   The outer ring crosses biome borders deliberately, avoiding holes while approaching a border. */
const __v123={ready:false,busy:false,records:null,count:0,grid:new Map(),loaded:new Set(),actors:[],npcs:[],creatures:[],npcSet:new Set(),npcSource:null,reindex:false,nearNPCs:new Set(),last:-Infinity,x:Infinity,z:Infinity,area:null,sweep:0,roots:[],rootGrid:new Map(),rootLoaded:new Set(),geometryRefs:new Map(),protectedGeometry:new Set(),released:0,refreshes:0,sleepingDead:new Set()};
function __v123Cell(x,z){return Math.floor(x/64)+','+Math.floor(z/64);}
function __v123Track(r){
 const p=r.g.position,key=__v123Cell(p.x,p.z);if(r.__stream123===__v123.grid&&r.__cell123===key)return;
 if(r.__stream123===__v123.grid)__v123.grid.get(r.__cell123)?.delete(r);
 let cell=__v123.grid.get(key);if(!cell)__v123.grid.set(key,cell=new Set());cell.add(r);r.__stream123=__v123.grid;r.__cell123=key;
}
function __v123Query(grid,radius){const out=new Set();for(let x=Math.floor((_14.x-radius)/64);x<=Math.floor((_14.x+radius)/64);x++)for(let z=Math.floor((_14.z-radius)/64);z<=Math.floor((_14.z+radius)/64);z++)for(const r of grid.get(x+','+z)||[])out.add(r);return out;}
function __v123Distance(p){return Math.hypot(p.x-_14.x,p.z-_14.z);}
function __v123Sim(o){return !__v123.ready||__v123Distance(o.g?.position||o)<=225;}
function __v123NPCPool(){if(!__v123.ready)return _2h;__v123Refresh();return __v123.npcs;}
function __v123Reconcile(n){
 if(!n.__v101||n.__v88Dead||n.__v88Controlled||n.__v89Sheltered&&__v88War.phase!=='idle')return;
 if(n.__v120){__v120Reconcile([n],false);return;}
 const s=__v114ResetRoutine(n);s.zone='home';s.serial++;
 let action=__v101Choose(n,s),point=__v100Destination(n,s,action);
 if(!point){__v100Release(n,s);action='walk';point=s.zone==='outside'?__v101OutdoorGoal(n,s):__v101HomeGoal(n,s);}
 if(!point||!Number.isFinite(point.x+point.y+point.z))return;
 __v114MoveNPC(n,point);Object.assign(s,{action,phase:'perform',target:{...point},route:[],index:0,lastHour:Math.floor(_x),until:__v98AI.clock+(action==='sleep'?30:2),next:0,blocked:0});
 n.sleeping=action==='sleep'&&__v101ValidStation(n,s);n.__v88Moving=false;n.activity=__v100Tasks[action]?.label||'Recorriendo su hogar';__v100Pose(n,__v98NPCBrain(n),s,false,0);
}
function __v123Refresh(force=false){
 const s=__v123;if(!s.ready||s.busy)return;s.busy=true;
 try{
  if(s.reindex){force=true;s.reindex=false;}if(s.npcSource&&s.npcSet.size!==s.npcSource.length)s.npcSet=new Set(s.npcSource);
  const area=__v75At()?.key||null;
  if(!force&&s.records===_b0&&s.count===_b0.length&&_10-s.last<.1&&__v123Distance({x:s.x,z:s.z})<4&&area===s.area)return;
  if(s.records!==_b0||_b0.length<s.count){s.records=_b0;s.count=0;s.grid=new Map();s.loaded.clear();s.npcSet=new Set(_2h);}
  for(let i=s.count;i<_b0.length;i++){_b0[i].owner.__record123=_b0[i];__v123Track(_b0[i]);if(_b0[i].loaded)s.loaded.add(_b0[i]);}
  s.count=_b0.length;
  // Moving residents update their cell directly; a bounded sweep catches legacy scripted moves.
  for(const r of s.actors)__v123Track(r);
  if(force)for(const r of _b0)__v123Track(r);
  else for(let i=0;i<128&&_b0.length;i++)__v123Track(_b0[(s.sweep++)%_b0.length]);
  const near=__v123Query(s.grid,290);for(const r of s.loaded)near.add(r);
  s.actors=[...near];s.npcs=[];s.creatures=[];const activeNPCs=new Set();
  for(const r of s.actors){const o=r.owner,d=__v123Distance(r.g.position);if(d>290)continue;
   if(s.npcSet.has(o)){
    if(d<=225){if(!s.nearNPCs.has(o)&&o.__sleepHour123!==undefined&&o.__sleepHour123!==Math.floor(_x)){__v123Reconcile(o);__v123Track(r);}activeNPCs.add(o);}
    s.npcs.push(o);
   }else if(o.spec){s.creatures.push(o);if(__v123TimedRespawn(o))s.sleepingDead.add(o);}
  }
  for(const n of s.nearNPCs)if(!activeNPCs.has(n)){n.__sleepHour123=Math.floor(_x);if(n.__v101)__v114ResetRoutine(n);}
  s.nearNPCs=activeNPCs;s.last=_10;s.x=_14.x;s.z=_14.z;s.area=area;s.refreshes++;__v114Perf.candidates=s.actors.length;
 }finally{s.busy=false;}
}
const __v123Actors=__v114StreamActors;__v114StreamActors=function(force=false){if(!__v123.ready)return __v123Actors(force);__v123Refresh(force);return __v123.actors;};
const __v123NPCs=__v114StreamNPCs;__v114StreamNPCs=function(){return __v123.ready?__v123NPCPool():__v123NPCs();};
const __v123Creatures=__v114StreamCreatures;__v114StreamCreatures=function(){if(!__v123.ready)return __v123Creatures();__v123Refresh();return __v123.creatures;};
const __v123LoadActor=_cq;_cq=function(r,on){
 if(on&&__v123.ready){const radius=_he(_14.x,_14.z).id==='candy'?210:225;if(__v123Distance(r.g.position)>radius)on=false;}
 const result=__v123LoadActor(r,on);if(r.loaded)__v123.loaded.add(r);else{__v123.loaded.delete(r);r.g.visible=false;if(__v123TimedRespawn(r.owner))__v123.sleepingDead.add(r.owner);}return result;
};
const __v123EnemyPool=__v68Pool;__v68Pool=function(){
 if(!__v123.ready)return __v123EnemyPool();__v123Refresh();const key=__v75At()?.key||null;
 const local=new Set(__v123.creatures.filter(c=>__v123Distance(c.g.position)<=225&&(!c.__v83Area?!key:c.__v83Area===key)));
 // In-flight effects finish against the same objects; streaming must not cancel a hit.
 for(const c of __v118Slots.active.keys())if(__v118Pending(c))local.add(c);
 for(const p of _ct)if(p.c)local.add(p.c);
 for(const f of __v58Flights)if(f.target92&&!f.target92.dead)local.add(f.target92);
 return [...local];
};
__v54CombatPool=__v68Pool;__v114LocalEnemies=__v68Pool;
const __v123Speech=__v114SpeechCandidates;__v114SpeechCandidates=function(){if(!__v123.ready)return __v123Speech();__v123Refresh();return __v123.creatures.filter(c=>c.dialogue);};
const __v123Sense=__v88Sense;__v88Sense=function(){if(!__v123.ready)return __v123Sense();__v123Refresh();__v88Life.threats=__v123.creatures.filter(c=>c.hostile&&!c.dead&&!c.__v83Area&&!c.__v88Raid&&__v123Distance(c.g.position)<180);__v88Life.active=__v123.npcs.filter(n=>!n.__v88Dead&&!n.__v88Controlled&&__v123Distance(n.g.position)<155);};
function __v123TimedRespawn(c){return c.dead&&!c.boss&&!c.elite&&!c.questElite&&!c.__v83Retired&&!__v87CanRespawn(c)&&Number.isFinite(c.respawn);}
const __v123Combat=_d7;_d7=function(dt){
 if(__v123.ready&&_u&&!_74()){
  const local=new Set(__v68Pool());for(const c of __v123.sleepingDead){
   if(!__v123TimedRespawn(c)){__v123.sleepingDead.delete(c);continue;}
   if(local.has(c)||!__v92SameFloor(c))continue;c.respawn-=dt;
   if(c.respawn<=0&&Math.hypot(_14.x-c.x,_14.z-c.z)>(c.marine?100:70)){c.dead=false;c.hp=c.maxHp;c.ai='patrol';c.g.position.set(c.x,c.marine?-3.2:c.homeY,c.z);c.g.visible=false;__v123.sleepingDead.delete(c);if(c.__record123)__v123Track(c.__record123);}
  }
 }
 return __v123Combat(dt);
};
const __v123Interior=__v99InteriorTick;__v99InteriorTick=function(n,...args){if(__v123Sim(n))return __v123Interior(n,...args);};
const __v123LifeTick=__v101Tick;__v101Tick=function(n,...args){if(__v123Sim(n))return __v123LifeTick(n,...args);};
const __v123Traveler=__v120Tick;__v120Tick=function(n,dt){
 if(__v123Sim(n)){n.__travelPeriod123=null;n.__travelAcc123=0;return __v123Traveler(n,dt);}
 const r=n.__v120,g=r.group,mode=__v120Night()?'inn':_x>=16?'return':g.travel&&_x>=7&&_x<15.5&&g.track?'road':'plaza',period=[__v120Travel.day,g.from,g.to,mode,mode==='road'?'':Math.floor(_x)].join(':');
 if(n.__travelPeriod123!==period){
  const distance=r.mode==='road'?r.roadD:null;__v120Reconcile([n],false);if(mode==='road'&&distance!==null)r.roadD=distance;
  if(mode==='return'){const p=n.__v101.dining||__v114ServicePoint(n);if(p)__v114MoveNPC(n,p);}
  n.__travelPeriod123=period;n.__travelAcc123=0;
 }
 // Route distance follows simulation time even when the day/night clock is frozen.
 // No distant animation, collision stepping, crowd avoidance or pathfinding is executed.
 if(mode==='road'){
  const speed=Math.max(3.1,g.track.length/(8.5*40));r.roadD=Math.min(g.track.length,(r.roadD??0)+speed*dt);n.__travelAcc123=(n.__travelAcc123||0)+dt;
  if(n.__travelAcc123>=1){n.__travelAcc123=0;const p=__v120At(g.track,r.roadD);p.y=__v101Floor(p.x,p.z,_2r(p.x,p.z));const free=__v120Free(n,p);if(free)__v114MoveNPC(n,free);}
 }
 n.activity=mode==='inn'?'Descansando en la posada':mode==='return'?'Regresando a la posada':mode==='road'?'Viajando por el camino':'Conversando con viajeros';
};
const __v123Move=__v114MoveNPC;__v114MoveNPC=function(n,p){const r=__v123Move(n,p);const a=n.__record123;if(__v123.ready&&a)__v123Track(a);return r;};
function __v123RootDistance(r){return Math.hypot(Math.max(r.minX-_14.x,0,_14.x-r.maxX),Math.max(r.minZ-_14.z,0,_14.z-r.maxZ));}
function __v123RootSet(r,on){
 if(r.loaded===on)return;
 if(on){r.parent.add(r.g);for(const g of r.geometries)__v123.geometryRefs.set(g,(__v123.geometryRefs.get(g)||0)+1);__v123.rootLoaded.add(r);}
 else{r.g.removeFromParent();for(const mesh of r.instances)mesh.dispose();for(const g of r.geometries){const refs=(__v123.geometryRefs.get(g)||1)-1;__v123.geometryRefs.set(g,refs);if(!refs&&!__v123.protectedGeometry.has(g)){g.dispose();__v123.released++;}}__v123.rootLoaded.delete(r);}
 r.loaded=on;
}
// Whole-grove instance batches retain every matrix/color and destructible owner when split.
function __v123SplitInstances(source){
 const cells=new Map(),matrix=new _0.Matrix4(),world=new _0.Matrix4(),p=new _0.Vector3();
 for(let i=0;i<source.count;i++){source.getMatrixAt(i,matrix);world.multiplyMatrices(source.matrixWorld,matrix);p.setFromMatrixPosition(world);const key=__v123Cell(p.x,p.z);if(!cells.has(key))cells.set(key,[]);cells.get(key).push(i);}
 if(cells.size<2)return null;
 const root=new _0.Group();root.name=source.name+' · sectores 123';root.position.copy(source.position);root.quaternion.copy(source.quaternion);root.scale.copy(source.scale);root.visible=source.visible;root.layers.mask=source.layers.mask;source.parent.add(root);
 const replacement=new Map();
 for(const indices of cells.values()){
  const mesh=new _0.InstancedMesh(source.geometry,source.material,indices.length);mesh.name='Instancias originales por sector 123';mesh.castShadow=source.castShadow;mesh.receiveShadow=source.receiveShadow;mesh.renderOrder=source.renderOrder;mesh.layers.mask=source.layers.mask;mesh.userData={...source.userData};if(source.userData.destruct108)mesh.userData.destruct108=indices.map(i=>source.userData.destruct108[i]);
  for(const [j,i]of indices.entries()){source.getMatrixAt(i,matrix);mesh.setMatrixAt(j,matrix);if(source.instanceColor){const color=new _0.Color();source.getColorAt(i,color);mesh.setColorAt(j,color);}replacement.set(i,{mesh,index:j});}
  mesh.computeBoundingBox();mesh.computeBoundingSphere();root.add(mesh);
 }
 for(const o of __v108Scenery.objects.values())for(const r of o.instances)if(r.mesh===source){const to=replacement.get(r.index);r.mesh=to.mesh;r.index=to.index;}
 source.removeFromParent();source.dispose();root.updateWorldMatrix(true,true);return root;
}
function __v123RootsBuild(){
 const s=__v123;s.roots=[];s.rootGrid=new Map();s.rootLoaded=new Set();s.geometryRefs=new Map();s.protectedGeometry=new Set();
 const actors=new Set([..._b0.map(r=>r.g),...__v104Ship.fleet.map(s=>s.g),__aurWorldFx.sky?.root,_4n,_g5,_5q]),areas=new Set(__v83.areas.flatMap(a=>[a.root,...a.groups]));
 _8.updateMatrixWorld(true);
 function add(g){
  if(actors.has(g)||g===_j||g.userData.sector||g.userData.animated&&!areas.has(g)&&g!==__v108Frontier.root&&!/Yermo del Eclipse|Ruinas detalladas y arboleda/.test(g.name))return;
  const box=g===__v103.embers||g===__v103.smoke?new _0.Box3(new _0.Vector3(_go.x-70,250,_go.z-70),new _0.Vector3(_go.x+70,500,_go.z+70)):new _0.Box3().setFromObject(g);if(box.isEmpty()||!Number.isFinite(box.min.x+box.max.z))return;
  const width=box.max.x-box.min.x,depth=box.max.z-box.min.z;
  if(width>512||depth>512){if(g.isInstancedMesh){const root=__v123SplitInstances(g);if(root)for(const c of root.children)add(c);}else if(g.isGroup)for(const c of [...g.children])add(c);return;}
  const geometries=new Set(),instances=new Set();g.traverse(o=>{if(o.geometry)geometries.add(o.geometry);if(o.isInstancedMesh)instances.add(o);});if(!geometries.size)return;
  const r={g,parent:g.parent,loaded:true,geometries,instances,minX:box.min.x,maxX:box.max.x,minZ:box.min.z,maxZ:box.max.z};s.roots.push(r);s.rootLoaded.add(r);
  for(const geometry of geometries)s.geometryRefs.set(geometry,(s.geometryRefs.get(geometry)||0)+1);
  for(let x=Math.floor(r.minX/64);x<=Math.floor(r.maxX/64);x++)for(let z=Math.floor(r.minZ/64);z<=Math.floor(r.maxZ/64);z++){const key=x+','+z;let cell=s.rootGrid.get(key);if(!cell)s.rootGrid.set(key,cell=[]);cell.push(r);}
 }
 for(const g of [..._8.children])add(g);
 // Geometry shared with actors, sky, water or another unstreamed object stays valid.
 const roots=new Set(s.roots.map(r=>r.g));function protect(o){if(roots.has(o))return;if(o.geometry)s.protectedGeometry.add(o.geometry);for(const c of o.children)protect(c);}protect(_6);
 for(const r of _b0)for(const p of r.parts)s.protectedGeometry.add(p.template);
}
function __v123Scenery(){
 if(!__v123.ready)return;const s=__v123,near=__v123Query(s.rootGrid,440);
 for(const r of [...s.rootLoaded]){
  if(!r.g.parent){r.retired=true;s.rootLoaded.delete(r);continue;}
  if(__v123RootDistance(r)>472)__v123RootSet(r,false);
 }
 for(const r of near)if(!r.retired&&__v123RootDistance(r)<=440)__v123RootSet(r,true);
}
function __v123Reset(){
 const s=__v123;s.ready=false;s.records=null;s.count=0;s.grid=new Map();s.loaded=new Set();s.actors=[];s.npcs=[];s.creatures=[];s.nearNPCs=new Set();s.npcSource=_2h;s.npcSet=new Set(_2h);s.last=-Infinity;s.sweep=0;s.sleepingDead=new Set(_m.filter(__v123TimedRespawn));
 for(const r of _b0){r.owner.__record123=r;if(s.npcSet.has(r.owner))r.owner.__sleepHour123=Math.floor(_x);}
 __v123RootsBuild();s.ready=true;__v123Refresh(true);__v123Scenery();_b3.set(Infinity,Infinity);_bg(true);
}
const __v123Invalidate=__v114PerfReset;__v114PerfReset=function(){const result=__v123Invalidate();__v123.reindex=true;return result;};
const __v123Stream=_bg;_bg=function(force=false){
 const result=__v123Stream(force);if(__v123.ready){__v123Refresh(force);const radius=_he(_14.x,_14.z).id==='candy'?210:225;for(const r of [...__v123.loaded])if(__v123Distance(r.g.position)>radius||r.owner.dead||r.owner.got)_cq(r,false);__v123Scenery();}return result;
};
const __v123World=_bj;_bj=function(...args){__v123.ready=false;const r=__v123World(...args);__v123Reset();return r;};
const __v123Load=_dn;_dn=function(...args){__v123.ready=false;for(const r of __v123.roots)if(!r.retired&&!r.loaded)__v123RootSet(r,true);const result=__v123Load(...args);__v123Reset();return result;};
window.__AURELIA_STREAMING123__={audit:()=>({terrainRadius:_he(_14.x,_14.z).id==='candy'?180:_aw,actorRadius:225,sceneryRadius:440,releaseRadius:472,biome:_he(_14.x,_14.z).id,area:__v75At()?.key||null,totalActors:_b0.length,candidates:__v123.actors.length,loadedActors:__v123.loaded.size,npcs:__v123.nearNPCs.size,creatureCandidates:__v123.creatures.length,totalSceneryGroups:__v123.roots.length,loadedSceneryGroups:__v123.rootLoaded.size,releasedBuffers:__v123.released,terrainSectors:_az.size,pendingTerrain:_b4.length,refreshes:__v123.refreshes,resolution:[_5.domElement.width,_5.domElement.height],preservesWorldState:true})};
