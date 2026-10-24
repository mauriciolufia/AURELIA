/* Exact-query reuse and a spatial streaming broad phase. No graphics setting is reduced. */
const __v114Perf={building:false,source:null,grid:new Map(),loaded:new Set(),tick:-1,x:Infinity,z:Infinity,size:0,actors:[],npcs:[],creatures:[],queries:0,hits:0,walkQueries:0,walkHits:0,groundTick:-1,ground:new Map(),walkTick:-1,walk:new WeakMap(),candidates:0,floorGrids:new WeakMap(),rings:new WeakMap(),ringQueries:0,edgesTested:0,speechSource:null,speechCount:0,speech:[]};
function __v114Text(el,value){if(document.documentElement.dataset.aureliaDevice!=='mobile'||el.textContent!==value)el.textContent=value;}
function __v114SpeechCandidates(){
 if(!__v60Mobile)return _m;const s=__v114Perf;
 if(s.speechSource!==_m||s.speechCount!==_m.length){s.speechSource=_m;s.speechCount=_m.length;s.speech=_m.filter(c=>c.dialogue);}
 return s.speech;
}
function __v114LocalEnemies(){return __v60Mobile?__v68Pool():_m;}
function __v114FloorItems(items,x,z){
 if(!__v60Mobile||__v114Perf.building)return items;
 let index=__v114Perf.floorGrids.get(items);
 if(!index||index.length!==items.length){
  index={length:items.length,grid:new Map()};
  for(const p of items){const stair=p.x0!==undefined,cx=stair?(p.x0+p.x1)/2:p.x,cz=stair?(p.z0+p.z1)/2:p.z,r=stair?Math.hypot(p.x1-p.x0,p.z1-p.z0)/2+p.w+.35:Math.hypot(p.w,p.d);
   for(let ix=Math.floor((cx-r)/32);ix<=Math.floor((cx+r)/32);ix++)for(let iz=Math.floor((cz-r)/32);iz<=Math.floor((cz+r)/32);iz++){const key=ix+','+iz;let cell=index.grid.get(key);if(!cell)index.grid.set(key,cell=[]);cell.push(p);}
  }__v114Perf.floorGrids.set(items,index);
 }return index.grid.get(Math.floor(x/32)+','+Math.floor(z/32))||[];
}
function __v114Track(a){
 const p=a.g?.position;if(!p||!Number.isFinite(p.x+p.z))return;
 const ix=Math.floor(p.x/64),iz=Math.floor(p.z/64);if(a.__v114Source===__v114Perf.grid&&ix===a.__v114IX&&iz===a.__v114IZ)return;
 if(a.__v114Source===__v114Perf.grid)__v114Perf.grid.get(a.__v114Key)?.delete(a);
 const key=ix+','+iz;let cell=__v114Perf.grid.get(key);if(!cell)__v114Perf.grid.set(key,cell=new Set());cell.add(a);
 a.__v114Source=__v114Perf.grid;a.__v114Key=key;a.__v114IX=ix;a.__v114IZ=iz;
}
function __v114StreamActors(force=false){
 if(!__v60Mobile||__v114Perf.building||!_b2)return _b0;
 const s=__v114Perf;
 if(s.source!==_b0||_b0.length<s.size){s.source=_b0;s.grid=new Map();s.loaded=new Set();s.tick=-1;}
 if(!force&&s.tick===_10&&s.x===_14.x&&s.z===_14.z&&s.size===_b0.length)return s.actors;
 // Every position is checked once, including far birds, respawns and late scripted relocations.
 for(const a of _b0){__v114Track(a);if(a.loaded)s.loaded.add(a);else s.loaded.delete(a);}
 s.tick=_10;s.x=_14.x;s.z=_14.z;s.size=_b0.length;const near=new Set(s.loaded),radius=Math.max(_aw,290);
 for(let x=Math.floor((_14.x-radius)/64);x<=Math.floor((_14.x+radius)/64);x++)for(let z=Math.floor((_14.z-radius)/64);z<=Math.floor((_14.z+radius)/64);z++)for(const a of s.grid.get(x+','+z)||[])near.add(a);
 s.actors=[...near];s.npcs=s.actors.filter(a=>!a.owner.spec&&a.owner.__v101).map(a=>a.owner);s.creatures=s.actors.filter(a=>a.owner.spec).map(a=>a.owner);s.candidates=s.actors.length;return s.actors;
}
function __v114StreamNPCs(){if(!__v60Mobile)return _2h;__v114StreamActors();return __v114Perf.npcs;}
function __v114StreamCreatures(){if(!__v60Mobile)return _m;__v114StreamActors();return __v114Perf.creatures;}
if(__v60Mobile){
 const inRing=__v84PointInRing;__v84PointInRing=function(p,ring){
  const s=__v114Perf;if(s.building||ring.length<12)return inRing(p,ring);s.ringQueries++;let index=s.rings.get(ring);
  if(!index||index.length!==ring.length){index={length:ring.length,bands:new Map(),minX:Infinity,maxX:-Infinity,minY:Infinity,maxY:-Infinity};
   for(let i=0,j=ring.length-1;i<ring.length;j=i++){const a=ring[i],b=ring[j];index.minX=Math.min(index.minX,a[0]);index.maxX=Math.max(index.maxX,a[0]);index.minY=Math.min(index.minY,a[1]);index.maxY=Math.max(index.maxY,a[1]);if(a[1]===b[1])continue;for(let band=Math.floor(Math.min(a[1],b[1])/8);band<=Math.floor(Math.max(a[1],b[1])/8);band++){let edges=index.bands.get(band);if(!edges)index.bands.set(band,edges=[]);edges.push([a[0],a[1],b[0],b[1]]);}}
   s.rings.set(ring,index);
  }
  if(p[0]<index.minX||p[0]>index.maxX||p[1]<index.minY||p[1]>index.maxY)return false;
  let inside=false;for(const [ax,ay,bx,by]of index.bands.get(Math.floor(p[1]/8))||[]){s.edgesTested++;if((ay>p[1])!==(by>p[1])&&p[0]<(bx-ax)*(p[1]-ay)/(by-ay)+ax)inside=!inside;}return inside;
 };
 const ground=_ei;_ei=function(x,z){
  const s=__v114Perf;if(s.building||!_b2)return ground(x,z);s.queries++;
  if(s.groundTick!==_10){s.groundTick=_10;s.ground.clear();}
  // Observer height and live quicksand depth are part of floor selection.
  const key=x+','+z+','+_14.y+','+__v95Sand.depth+','+__v95Sand.surface+','+__v95Sand.physics+','+(__v95Sand.field?.id||'');
  if(s.ground.has(key)){s.hits++;return s.ground.get(key);}const y=ground(x,z);s.ground.set(key,y);return y;
 };
 const walkable=__v83Walkable;__v83Walkable=function(a,x,z,pad=0){
  const s=__v114Perf;if(s.building||!_b2)return walkable(a,x,z,pad);s.walkQueries++;
  if(s.walkTick!==_10){s.walkTick=_10;s.walk=new WeakMap();}let entry=s.walk.get(a);
  if(!entry||entry.design!==a.design){entry={design:a.design,points:new Map()};s.walk.set(a,entry);}
  const key=x+','+z+','+pad;if(entry.points.has(key)){s.walkHits++;return entry.points.get(key);}const result=walkable(a,x,z,pad);entry.points.set(key,result);return result;
 };
}
function __v114PerfReset(){const s=__v114Perf;s.source=null;s.speechSource=null;s.grid=new Map();s.loaded.clear();s.tick=s.groundTick=s.walkTick=-1;s.ground.clear();s.walk=new WeakMap();s.floorGrids=new WeakMap();s.rings=new WeakMap();}
const __v114PerfWorld=_bj;_bj=function(...args){__v114Perf.building=true;__v114PerfReset();try{const r=__v114PerfWorld(...args);__v95XPBuild();return r;}finally{__v114Perf.building=false;__v114PerfReset();}};
const __v114PerfLoad=_dn;_dn=function(...args){__v114Perf.building=true;try{const r=__v114PerfLoad(...args);__v95XPBuild();return r;}finally{__v114Perf.building=false;__v114PerfReset();}};
window.__AURELIA_PERFORMANCE114__={audit:()=>({mobile:__v60Mobile,totalActors:_b0.length,streamCandidates:__v114Perf.candidates,groundQueries:__v114Perf.queries,groundCacheHits:__v114Perf.hits,walkQueries:__v114Perf.walkQueries,walkCacheHits:__v114Perf.walkHits,resolutionPreserved:true,texturesPreserved:true,elementsPreserved:true,buffer:[_5.domElement.width,_5.domElement.height]})};
if(__v60Mobile){
 const drawMini=__v87MiniDraw;__v87MiniDraw=function(){if(!_4.classList.contains('hud101'))return drawMini();};
 const health={actors:null,cursor:0,npcs:null,npcCursor:0};
 __v15ActorHealthCheck=function(){if(!health.actors){health.actors=_m;health.cursor=0;health.npcs=_2h;health.npcCursor=0;}};
 const update=_iu;_iu=function(dt){
  const r=update(dt);if(!health.actors)return r;let count=0;
  while(health.cursor<health.actors.length&&count++<128){const c=health.actors[health.cursor++];if(!c?.g)continue;const p=c.g.position;if(!Number.isFinite(p.x+p.y+p.z)){const x=Number.isFinite(c.x)?c.x:0,z=Number.isFinite(c.z)?c.z:0;p.set(x,c.marine?-3.2:_ei(x,z),z);c.ai='patrol';c.specialAction=null;}if(!c.marine&&!c.dead)__v14NormalizeEnemy(c);}
  if(health.cursor>=health.actors.length){count=0;while(health.npcCursor<health.npcs.length&&count++<128){const n=health.npcs[health.npcCursor++];if(n?.g&&!Number.isFinite(n.x+n.z)){const s=_1h[n.site??n.homeSite??0]||_1h[0];n.x=s.x;n.z=s.z;n.homeY=_ei(n.x,n.z);n.g.position.set(n.x,n.homeY,n.z);}}if(health.npcCursor>=health.npcs.length)health.actors=null;}
  return r;
 };
}
