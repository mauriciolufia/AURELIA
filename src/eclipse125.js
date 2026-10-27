/* Damage strips are sensors. Their old E-code walls survived the v124 model move. */
__v88SpikeBarrier=function(){const g=new _0.Group();g.name='Trampa atravesable · sin barrera física';return g;};

// Reuse two complete sculpture templates: their UUIDs now share actual instance batches.
const __v125StatueTemplates=new Map(),__v125StatueFactory=__v124StatueTemplate;
__v124StatueTemplate=function(variant){const key=variant%2;if(!__v125StatueTemplates.has(key))__v125StatueTemplates.set(key,__v125StatueFactory(key));return __v125StatueTemplates.get(key);};

// Preserve the illustrated texture maps while giving each new floor a subtle material tint.
const __v125Materials=new Map(),__v125Material=__v85Mat;
__v85Mat=function(a,role){const base=__v125Material(a,role),level=a.design?.floor88;if(!Number.isInteger(level)||level<3||level>5||!['floor','wall','roof'].includes(role))return base;const key=level+':'+role;if(!__v125Materials.has(key)){const material=base.clone();material.name=base.name+' · Planta '+(level+1);material.color.set(['#eee8ff','#f1e4ee','#e3ecfa'][level-3]);__v125Materials.set(key,material);}return __v125Materials.get(key);};
const __v125={floors:[],casts:{physical:0,energy:0,darkness:0,pulse:0},distance:0,recoveries:0};
function __v125RoofOpening(d,room){const hole=__v88StairHole(d.centers[room]);(d.stairRoof125||=([])).push(hole);for(const poly of d.roofPolygons85)if(hole.every(p=>__v84PointInRing(p,poly.outer))&&!poly.holes.some(h=>__v84PointInRing(hole[0],h)))poly.holes.push(hole);d.roofOpenings85.push({outer:hole,holes:[]});}
const __v125Rim=__v84Wall;__v84Wall=function(a,p,q,...args){const tag=args[3];if(tag==='roofRim'&&(a.design.stairRoof125||[]).some(h=>[p,q].every(v=>v[0]>=h[0][0]-.01&&v[0]<=h[1][0]+.01&&v[1]>=h[0][1]-.01&&v[1]<=h[2][1]+.01)))return null;return __v125Rim(a,p,q,...args);};
// Prepare the original third floor's outgoing stair before its roof is meshed.
const __v125Clone=__v88ClonePlan;__v88ClonePlan=function(level){const d=__v125Clone(level);if(level===2)__v125RoofOpening(d,4);return d;};
const __v125FloorHole=__v91FloorHole;__v91FloorHole=function(a){if(a.design.floor88<3)return __v125FloorHole(a);const c=a.design.centers[a.design.stairEntryRoom125];return[[c[0]+2.75,c[1]-9.1],[c[0]+7.25,c[1]-9.1],[c[0]+7.25,c[1]+9.1],[c[0]+2.75,c[1]+9.1]];};
const __v125Sequential=__v92SequentialBuild;
__v92SequentialBuild=function(){
 const result=__v125Sequential(),source=__v88Eclipse.areas[2];if(!source)return result;__v125.floors=[];
 for(let level=3;level<6;level++){
  const d=JSON.parse(JSON.stringify(source.design)),incoming=level%2?4:0,outgoing=level%2?0:4;
  d.key='eclipse-floor-'+level;d.floor88=level;d.stairEntryRoom125=incoming;d.name='Trono del Eclipse · Planta '+(level+1);d.stairHoles88=[__v88StairHole(d.centers[incoming])];
  // Keep the third floor's layout and detailed materials with restrained colour variations.
  const tones=['#615b78','#655773','#535970'];d.floor=tones[level-3];d.accent=['#987d9d','#9c748e','#7f86a0'][level-3];d.colors={...d.colors,floor:d.floor,accent:d.accent};
  for(const f of d.room_fills)f.color=new _0.Color(f.color).lerp(new _0.Color(d.floor),.28).getStyle();
  d.roofPolygons85=JSON.parse(JSON.stringify(source.design.roofPolygons85));d.roofOpenings85=JSON.parse(JSON.stringify(source.design.roofOpenings85));
  if(level<5)__v125RoofOpening(d,outgoing);
  for(const s of d.secretRooms85){s.id=s.id.replace(/eclipse(?:92|-floor-2)/g,d.key);delete s.legendary87;}
  for(const t of d.arrowTraps85||[])if(t.id)t.id=d.key+'-'+t.id;
  const a=__v88GrandFloor(d);a.__v92Regions=source.__v92Regions.map(r=>[...r]);a.design.rects=a.__v92Regions;__v88RaiseArea(a);a.boss=source.boss;__v88Eclipse.areas.push(a);__v125.floors.push(a);
  const positions=d.guardPositions86;for(let i=0;i<24;i++){const p=__v83Point(a,positions[i%positions.length].center);p.y=a.y;__v88SpawnAbyss(a,p,i);}
  __v88Staircase(__v88Eclipse.areas[level-1],a,incoming);
 }
 const final=__v88Eclipse.areas[5],boss=source.boss;
 source.members=source.members.filter(c=>c!==boss);__v83Relocate(boss,final,{...__v83Point(final,final.design.markers.J[0]),y:final.y},5);final.members.push(boss);boss.__v88FinalFloor=5;__v91Remember(boss);
 __v86BuildExit(final);__v83IndexDoors();_22();__v75.grid.clear();for(const o of __v75.objects)__v75Index(o);__v91RepairAll();__v68Local.source=null;
 return result;
};
// Keep the previous population reduction on floor three; added floors have a bounded roster.
const __v125Thin=__v124ThinEclipse;
__v124ThinEclipse=function(){const areas=__v88Eclipse.areas;if(areas.length<6)return __v125Thin();__v88Eclipse.areas=areas.slice(0,3);try{return __v125Thin();}finally{__v88Eclipse.areas=areas;}};
const __v125Guide=__v86Goal;__v86Goal=function(a){if(a.floor88>=2&&a.floor88<5){const s=__v88Eclipse.stairs.find(s=>s.lower===a);if(s)return{point:__v83Local(a,s.start.x,s.start.z),stage:'Sube a la planta '+(a.floor88+2)};}return __v125Guide(a);};

// A dedicated controller keeps walking during windups and picks a different useful art.
const __v125Setup=__v94EmperorSetup;__v94EmperorSetup=function(...args){const r=__v125Setup(...args),e=__v94Emperor;if(!e.boss)return r;e.area=__v88Eclipse.areas.at(-1);e.room=e.area.__v92Regions[5];e.clock=0;e.next=1.2;e.action=e.pending=null;e.move125=0;e.goal125=null;e.last125=null;e.recent125=[];return r;};
__v94EmperorTick=function(dt){
 const e=__v94Emperor,c=e.boss;if(!c||!_u||_74())return;dt=Math.max(0,Math.min(dt,.06));
 const local=__v83Local(e.area,_14.x,_14.z),r=e.room,inside=local[0]>r[0]&&local[0]<r[2]&&local[1]>r[1]&&local[1]<r[3];
 if(c.dead||!__v92SameFloor(c)||!inside){__v94EmperorClear();return;}
 __v94EmperorFX(dt);if(!__v118Slot(c))return;
 c.stun=Math.max(0,c.stun-dt);if(c.stun>0||__v119Disabled(c))return;e.clock+=dt;
 const p=c.g.position,dist=Math.hypot(_14.x-p.x,_14.z-p.z);e.move125-=dt;
 if(!e.goal125||e.move125<=0||Math.hypot(e.goal125.x-p.x,e.goal125.z-p.z)<2){
  const hero=__v83Local(e.area,_14.x,_14.z),me=__v83Local(e.area,p.x,p.z),heading=Math.atan2(me[0]-hero[0],me[1]-hero[1]),radius=dist<8?17:dist>32?11:18,side=e.cursor++%2?1:-1;
  const angle=heading+side*(.9+(e.cursor%3)*.35),target=[_18(hero[0]+Math.sin(angle)*radius,r[0]+7,r[2]-7),_18(hero[1]+Math.cos(angle)*radius,r[1]+7,r[3]-7)];
  e.goal125=__v83Point(e.area,target);e.move125=1.6;
 }
 const angle=Math.atan2(e.goal125.x-p.x,e.goal125.z-p.z),step=Math.min(Math.hypot(e.goal125.x-p.x,e.goal125.z-p.z),dt*(c.hp<c.maxHp*.4?12:10));let moved=false;
 for(const turn of[0,.4,-.4,.8,-.8,1.2,-1.2,1.6,-1.6,2.2,-2.2]){
  const x=p.x+Math.sin(angle+turn)*step,z=p.z+Math.cos(angle+turn)*step,q=__v83Local(e.area,x,z);if(q[0]<r[0]+3||q[0]>r[2]-3||q[1]<r[1]+3||q[1]>r[3]-3)continue;
  const y=_9b(c,x,z);if(y===false)continue;const before=p.clone();p.set(x,y,z);__v91Guard(c);const travel=before.distanceTo(p);if(travel>.001){__v125.distance+=travel;e.audit.moved+=travel;moved=true;break;}
 }
 if(!moved){e.move125=0;__v125.recoveries++;}c.g.rotation.y=Math.atan2(p.x-_14.x,p.z-_14.z);
 if(e.action){e.action.time-=dt;for(const arm of c.parts||[])arm.rotation.x=-Math.sin(Math.max(0,e.action.time)*4)*.9;if(e.action.time<=0){const kind=e.action.kind;__v94EmperorRelease(kind);__v125.casts[kind]++;e.recent125.push(kind);if(e.recent125.length>3)e.recent125.shift();e.action=null;e.next=e.clock+1.1;}return;}
 if(e.clock<e.next||!__v92LOS(c))return;
 // Every four decisions cover all four techniques; distance changes their order.
 const options=['energy','darkness','pulse','physical'].filter(k=>!e.recent125.includes(k));
 let kind=dist<__v117MeleeReach(c)*1.2&&options.includes('physical')?'physical':dist<13&&options.includes('pulse')?'pulse':options.includes('energy')?'energy':options[0];
 if((kind==='physical'&&dist>__v117MeleeReach(c)*.9)||(kind==='pulse'&&dist>10)){e.goal125={x:_14.x,z:_14.z};e.move125=.5;return;}
 e.action={kind,time:kind==='physical'?.5:kind==='energy'?.75:1};__v68Burst(p.clone().add(new _0.Vector3(0,2,0)),kind==='pulse'?'#efbb78':'#b184dc','buff',1.2,.45);
};
// Expose four techniques in the same catalogue used for normal species.
const __v125Plan=__v109Techniques.build;
__v109Techniques.build=function(ctx){const plan=__v125Plan(ctx);if(plan.family!=='emperor')return plan;return{...plan,skills:[...plan.skills,{id:'imperialstrike125',name:'Tajo del Emperador Supremo',type:'melee',element:'physical',range:8,radius:3,windup:.5,power:1,color:'#e9bf7a'}]};};
window.__AURELIA_ECLIPSE125__={audit:()=>({floors:__v88Eclipse.areas.length,stairs:__v88Eclipse.stairs.length,casts:{...__v125.casts},moved:__v125.distance,recoveries:__v125.recoveries,statueTemplates:__v125StatueTemplates.size,barriers:_q.filter(c=>c.spikes88).length})};

const __v125SlotsUpdate=__v118SlotsUpdate;__v118SlotsUpdate=function(force=false){
 const e=__v94Emperor,c=e.boss;if(c&&!c.dead&&__v92SameFloor(c)&&__v118WantsHero(c)){const p=__v83Local(e.area,_14.x,_14.z),r=e.room;if(p[0]>r[0]&&p[0]<r[2]&&p[1]>r[1]&&p[1]<r[3]&&!__v118Slots.active.has(c)){
  if(__v118Slots.active.size>=3){const victim=[...__v118Slots.active.keys()].filter(n=>n!==c&&!__v118Pending(n)).at(-1);if(victim){__v118Slots.active.delete(victim);__v118StopWaiting(victim);}}
  if(__v118Slots.active.size<3)__v118Slots.active.set(c,{seen:performance.now()});
 }}return __v125SlotsUpdate(force);
};
// Old saves may contain the Emperor's former third-floor position. Preserve his health/death state.
const __v125Load=_dn;_dn=function(...args){const result=__v125Load(...args),c=__v94Emperor.boss,a=__v88Eclipse.areas.at(-1);if(c&&a&&(c.__v83Area!==a.key||Math.abs(c.g.position.y-a.y)>6)){__v83Relocate(c,a,{...__v83Point(a,a.design.markers.J[0]),y:a.y},5);c.__v88FinalFloor=a.floor88;__v91Remember(c);}return result;};
