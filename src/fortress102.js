/* Seeded optional chambers, physical traps and extra scenery share the existing fortress floors. */
const __v102Fort={groups:[],rooms:[],mazes:[],decorations:0,barrels:0,epoch:0};
const __v102Shuffle=(items,random)=>{const list=[...items];for(let i=list.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[list[i],list[j]]=[list[j],list[i]];}return list;};
// Rebuilt floors no longer inherit clusters of secret walls at their first room.
__v95MakeSecret=function(){return null;};
const __v102OldFort=__v95FortBuild;__v95FortBuild=function(){const spot=__v95RoomSpot;__v95RoomSpot=()=>null;try{return __v102OldFort();}finally{__v95RoomSpot=spot;}};
function __v102Rects(a){return(a.design.rects||a.design.room_fills.map(f=>{const p=f.polygon||f.outer;return[Math.min(...p.map(v=>v[0])),Math.min(...p.map(v=>v[1])),Math.max(...p.map(v=>v[0])),Math.max(...p.map(v=>v[1]))];})).filter(r=>r[2]-r[0]>=15&&r[3]-r[1]>=15);}
function __v102Point(a,x,z){return{...__v83Point(a,[x,z]),y:a.y};}
function __v102Free(a,x,z,pad=.65){const p=__v102Point(a,x,z);return __v83Walkable(a,p.x,p.z,pad)&&!_i7(p.x,p.z,a.y+1.85);}
function __v102KeepClear(a,x,z,r=4){const p=__v102Point(a,x,z);return Math.hypot(p.x-a.entry.x,p.z-a.entry.z)>18&&!(a.doors||[]).some(d=>Math.hypot(p.x-d.x,p.z-d.z)<r+2)&&!__v75.objects.some(o=>o.area===a&&['fountain','exit95','shortcut','blessing','riddle'].includes(o.type)&&Math.hypot(o.x-p.x,o.z-p.z)<r+3)&&!(a.plan95?.stairs||[]).some(st=>Math.abs(x-st.x)<r+3&&z>st.z0-r-2&&z<st.z1+r+2);}
function __v102Attach(a,start,name){const root=new _0.Group();root.name=name;_8.add(root);for(const g of a.groups.slice(start))root.attach(g);__v85MergeArchitecture({...a,root});a.root.attach(root);a.groups.splice(start);return root;}
function __v102Wall(a,p,q,tag){__v84Wall(a,p,q,11.4,0,.5,tag);const line=[...p,...q];if(a.plan95)a.plan95.walls.push(line);else{a.design.walls.push(line);a.design.constructionWalls85.push(line);}}
function __v102Mazes(a,random){
 let zones=0;for(const r of __v102Shuffle(__v102Rects(a),random)){
  if(zones>=2)break;const x=(r[0]+r[2])/2,z=(r[1]+r[3])/2,halfX=Math.min(8,(r[2]-r[0])/2-3.2),halfZ=Math.min(5,(r[3]-r[1])/2-3.2);if(halfX<5||halfZ<3||!__v102KeepClear(a,x,z,3))continue;
  const lines=[[[x-halfX,z-halfZ],[x+halfX-4,z-halfZ]],[[x-halfX+4,z+halfZ],[x+halfX,z+halfZ]]];
  let free=true;for(const[p,q]of lines){const count=Math.ceil(Math.hypot(q[0]-p[0],q[1]-p[1])/.6);for(let i=0;i<=count&&free;i++)for(const side of[-1,0,1])if(!__v102Free(a,p[0]+(q[0]-p[0])*i/count,p[1]+side*1.15,.8)){free=false;break;}}
  if(!free)continue;const start=a.groups.length;for(const[p,q]of lines)__v102Wall(a,p,q,'labyrinth102');__v102Attach(a,start,'Desvíos en zigzag · '+a.key);_22();__v102Fort.mazes.push({area:a.key,rect:r,lines});zones++;
 }
}
function __v102Candidates(a,random){
 const candidates=[];for(const[room,r]of __v102Rects(a).entries()){
  const cx=(r[0]+r[2])/2,cz=(r[1]+r[3])/2;
  for(const x of[r[0]+4.1,r[2]-4.1])for(const z of[r[1]+4.1,r[3]-4.1])candidates.push({a,x,z,front:z<cz?1:-1,room});
  if(r[2]-r[0]>28)for(const x of[cx-5,cx+5])for(const z of[r[1]+4.1,r[3]-4.1])candidates.push({a,x,z,front:z<cz?1:-1,room});
 }
 return __v102Shuffle(candidates,random);
}
function __v102ChamberFree(spot,used){
 const{a,x,z}=spot;if(!__v102KeepClear(a,x,z,3.2)||used.some(o=>o.a===a&&Math.hypot(o.x-x,o.z-z)<8.4))return false;
 // Check the whole footprint and doorway, rather than just a centre point.
 for(let dx=-3.2;dx<=3.21;dx+=.8)for(let dz=-3.2;dz<=3.21;dz+=.8)if(!__v102Free(a,x+dx,z+dz,.6))return false;
 for(const dx of[-1,0,1])for(const dz of[3.2,4.2,5])if(!__v102Free(a,x+dx,z+spot.front*dz,.6))return false;
 const p=__v102Point(a,x,z);if(a.traps.some(t=>Math.abs(t.x-p.x)<t.w/2+3.3&&Math.abs(t.z-p.z)<t.d/2+3.3))return false;
 return !a.members.some(c=>!c.dead&&Math.hypot(c.g.position.x-p.x,c.g.position.z-p.z)<4);
}
function __v102Chamber(spot,index,level,site){
 const{a,x:cx,z:cz,front:direction}=spot,h=2.7,gap=1.6,front=cz+direction*h,back=cz-direction*h,id='secret102-'+site+'-'+index,kind=index<2?'guard':'gold';
 const def={id,kind87:kind==='guard'?'enemy':'treasure',polygons:[{outer:__v95Ring([cx-h,cz-h,cx+h,cz+h]),holes:[]}],treasure:[cx,cz],wall:{center:[cx,front],axis:[0,1],width:gap*2},hp:2};a.design.secretRooms85.push(def);
 const start=a.groups.length;for(const[p,q]of[[[cx-h,back],[cx+h,back]],[[cx-h,back],[cx-h,front]],[[cx+h,back],[cx+h,front]],[[cx-h,front],[cx-gap,front]],[[cx+gap,front],[cx+h,front]]])__v102Wall(a,p,q,'secret102');
 __v102Attach(a,start,'Cámara oculta · '+id);const before=a.groups.length,wall=__v85SecretWall(a,def);wall.hp=wall.maxHp=Math.max(2,Math.round(__v87Base(1).atk*2));wall.__v102=true;
 if(kind==='guard'){const c=__v95SpikedGuard(a,spot,level,id);c.__v102Guard=id;__v99Limit(c);}
 else{const chest=__v85SecretChest(a,def);chest.__v95GoldXP=true;chest.reward95={gold:__v87Gold(120+level*8),xp:80+level*10};}
 // Keep the breakable mesh outside static architecture batches.
 for(const g of a.groups.slice(before))a.root.attach(g);a.groups.splice(before);
 if(a.plan95)a.plan95.secrets.push({id,point:[cx,cz],wall:def.wall,kind:def.kind87});
 const record={...spot,id,kind,level,wall};__v102Fort.rooms.push(record);__v95Fort.rooms.push(record);return record;
}
function __v102RetireOldWalls(){
 // Old passages stay accessible and keep their treasure and stone artwork.
 for(const w of __v85Secrets.walls){w.g.name='Restos de muro antiguo · '+w.id;w.g.scale.y=.012;w.g.visible=true;w.g.userData.animated=false;const i=_q.indexOf(w.c);if(i>=0)_q.splice(i,1);const j=w.area.colliders.indexOf(w.c);if(j>=0)w.area.colliders.splice(j,1);}
 __v85Secrets.walls=[];for(const o of __v85Secrets.chests)if(!o.__v94Royal&&!o.__v92MayaReward)o.__v102OpenRelic=true;
 for(const a of __v83.areas){const d=a.design;a.design={...d,walls:a.plan95?a.plan95.walls:[...d.walls],constructionWalls85:a.plan95?a.plan95.walls:[...d.constructionWalls85],secretRooms85:[],arrowTraps85:[...(d.arrowTraps85||[])],trap_info:[...(d.trap_info||[])],props:{...d.props,barrels:[...(d.props?.barrels||[])]}};if(a.plan95)a.plan95.secrets=[];}
 _22();
}
const __v102Relic=__v85ClaimSecret;__v85ClaimSecret=function(o){if(o?.__v102OpenRelic&&!__v85SecretState().secretWalls85.includes(o.secretId))__v85SecretState().secretWalls85.push(o.secretId);return __v102Relic(o);};
// Sweep to the visible face of a wall. Its centre can sit behind its own collision plane.
const __v102Sword=_8e;_8e=function(){
 const result=__v102Sword();if(!_u||_74())return result;const a=__v75At();if(!a)return result;let best=null,bestDistance=Math.min(4.8,_g4().reach);
 for(const w of __v85Secrets.walls){if(!w.__v102||w.area!==a||__v85SecretState().secretWalls85.includes(w.id))continue;const dx=w.x-_14.x,dz=w.z-_14.z,d=Math.hypot(dx,dz);if(d>=bestDistance||(-Math.sin(yaw)*dx-Math.cos(yaw)*dz)/Math.max(.01,d)<.55)continue;
  __v85Secrets.ignore=w.id;let clear=false;try{clear=__v83Ray(_14.x,_14.z,w.x,w.z,_14.y);}finally{__v85Secrets.ignore=null;}if(clear){best=w;bestDistance=d;}
 }
 // The native sword hook already handles these walls; a fallback is only needed for a missed face.
 if(best&&best.__v102LastHit!==_10)__v85BreakWall(best,_g4().atk);return result;
};
const __v102Break=__v85BreakWall;__v85BreakWall=function(w,damage){w.__v102LastHit=_10;return __v102Break(w,damage);};
Object.assign(__v75TrapNames,{vapor102:'Vapor tóxico'});
const __v102CloudGeometry=new _2.SphereGeometry(1,10,7),__v102CloudUniform={value:0},__v102CloudMaterial=new _0.MeshBasicMaterial({color:'#a7ca72',transparent:true,opacity:.25,depthWrite:false});
__v102CloudMaterial.onBeforeCompile=shader=>{shader.uniforms.cloudTime102=__v102CloudUniform;shader.vertexShader='uniform float cloudTime102;\n'+shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\n transformed.x += sin(cloudTime102 * 1.4 + position.y * 2.0) * 0.10; transformed.y += sin(cloudTime102 + position.x * 2.5) * 0.16;');};
function __v102Trap(a,point,type,id){
 const rect=__v102Rects(a).find(r=>point[0]>=r[0]&&point[0]<=r[2]&&point[1]>=r[1]&&point[1]<=r[3]),p=__v102Point(a,rect?(rect[0]+rect[2])/2:point[0],point[1]),width=rect?rect[2]-rect[0]-.3:4,cfg=a.design.elementalTrap85;let trap;try{a.design.elementalTrap85=null;trap=__v75Trap(a,p.x,p.z,width,2.2,type,1200+id);}finally{a.design.elementalTrap85=cfg;}
 Object.assign(trap,{__v102:true,damage:type==='dark'?0:type==='vapor102'?.06:.1,phase:id*1.37,period:7.5,location:'sala',permanent:false,__v83:true});for(const o of [...trap.g.children])if(o.isSprite)o.removeFromParent();__v75Label(trap.g,type==='vapor102'?'VAPOR TÓXICO · 6% HP':type==='dark'?'PENUMBRA · LUZ DIVINA':'PICOS · 10% HP',3.6,4);
 if(type==='vapor102'){trap.h.geometry=__v102CloudGeometry;trap.h.material=__v102CloudMaterial;const m=new _0.Matrix4(),p=new _0.Vector3(),q=new _0.Quaternion(),s=new _0.Vector3();for(let i=0;i<trap.h.count;i++){trap.h.getMatrixAt(i,m);m.decompose(p,q,s);p.y=.6+(i%3)*.35;s.set(.55,.8,.55);m.compose(p,q,s);trap.h.setMatrixAt(i,m);}trap.h.instanceMatrix.needsUpdate=true;}
 a.root.attach(trap.g);return trap;
}
const __v102Activate=__v75Activate;__v75Activate=function(t){return t.type==='vapor102'?__v75Damage(.06,'Vapor tóxico',null):__v102Activate(t);};
function __v102FloorDetails(a,random,dark){
 let barrels=0,decor=0,traps=0,arrows=0;const rects=__v102Shuffle(__v102Rects(a),random),reserved=[];
 const free=(x,z,r)=>__v102Free(a,x,z,r)&&__v102KeepClear(a,x,z,r)&&!reserved.some(p=>Math.hypot(p[0]-x,p[1]-z)<r+1.5);
 for(const r of rects){
  const cx=(r[0]+r[2])/2,cz=(r[1]+r[3])/2;
  for(const[x,z]of __v102Shuffle([[r[0]+2,r[1]+2],[r[2]-2,r[1]+2],[r[0]+2,r[3]-2],[r[2]-2,r[3]-2],[cx-3,r[1]+2],[cx+3,r[3]-2]],random)){
   if(barrels>=12||!free(x,z,1.1))continue;const o=__v75.objects.length;__v75Barrel(a,__v102Point(a,x,z),2000+barrels);const object=__v75.objects[o];if(!object)continue;a.root.attach(object.g);reserved.push([x,z]);a.design.props.barrels.push({center:[x,z]});if(a.plan95)a.plan95.barrels.push([x,z]);barrels++;
  }
  // Hanging diamond banners were removed at the player's request.
  const spots=[[cx-4,cz],[cx+4,cz],[cx,cz+5],[cx,cz-5]];
  for(const point of __v102Shuffle(spots,random)){
   if(traps>=3||!free(...point,2.5))continue;const type=dark&&traps===0?'dark':traps%2?'vapor102':'spikes';__v102Trap(a,point,type,traps);reserved.push(point);traps++;
  }
  if(arrows<2&&random()<.75){
   const zz=cz+(random()<.5?-5:5),wall=[r[0],zz],origin=[r[0]+.9,zz],target=[r[2]-1,zz],trigger=[cx,zz],physical=__v102Point(a,...wall);
   if(_23(physical.x,physical.z,a.y+1.85)&&free(...trigger,1.4)&&[origin,[cx-2,zz],[cx+2,zz]].every(p=>__v102Free(a,...p,.25))){const start=a.groups.length,def={id:'arrow102-'+a.key+'-'+arrows,wall,origin,target,trigger,normal:[1,0]};__v85ArrowTrap(a,def);for(const g of a.groups.slice(start))a.root.attach(g);a.groups.splice(start);a.design.arrowTraps85.push(def);reserved.push(trigger);arrows++;}
  }
 }
 __v102Fort.decorations+=decor;__v102Fort.barrels+=barrels;a.__v102Details={barrels,decor,traps,arrows};
}
function __v102Build(){
 __v102Fort.groups=[];__v102Fort.rooms=[];__v102Fort.mazes=[];__v102Fort.decorations=0;__v102Fort.barrels=0;__v95Fort.rooms=[];__v95Fort.guards=[];__v102RetireOldWalls();
 const groups=new Map();for(const a of __v83.areas){if(!groups.has(a.site))groups.set(a.site,[]);groups.get(a.site).push(a);}
 const darkSites=new Set(__v102Shuffle([...groups.keys()],rng(_f+102004)).slice(0,Math.round(groups.size*.4)));
 for(const[site,areas]of groups){
  const random=rng(_f+site*701+102003),desired=4+Math.floor(random()*3),levels=areas.flatMap(a=>a.members.filter(c=>!c.boss&&!c.questElite).map(c=>c.level)).sort((a,b)=>a-b),level=_18(Math.round(levels[Math.floor(levels.length*.65)]||areas[0].level||20),15,50),used=[];
  for(const a of areas)__v102Mazes(a,random);
  const candidates=__v102Shuffle(areas.flatMap(a=>__v102Candidates(a,random)),random);
  for(const spot of candidates){if(used.length>=desired)break;if(!__v102ChamberFree(spot,used))continue;const room=__v102Chamber(spot,used.length,_18(level+(used.length===1?2:0),15,50),site);used.push(room);_22();}
  if(used.length<4)throw Error('No caben cuatro cámaras seguras en '+_1h[site].name+' ('+used.length+')');
  for(const a of areas){for(const t of a.traps)if(t.type==='dark'&&!darkSites.has(site)){t.type='spikes';t.damage=.1;t.h.geometry=__v75Geo('cone');t.h.material=__v75Mat('#cbd7e3');for(const o of [...t.g.children])if(o.isSprite)o.removeFromParent();__v75Label(t.g,'PICOS · 10% HP',3.6,4);}__v102FloorDetails(a,random,darkSites.has(site));}
  __v102Fort.groups.push({site,name:_1h[site].name,walls:used.length,desired,guardLevel:level,guards:used.filter(r=>r.kind==='guard').length,dark:darkSites.has(site),areas:areas.map(a=>a.key)});
 }
 __v83IndexDoors();_22();__v75.grid.clear();for(const o of __v75.objects)__v75Index(o);for(const c of __v95Fort.guards)__v91Repair(c,true);__v50BuildActorGrid();__v68Local.source=null;__v86NavCache.clear();__v95XPBuild();
 __v102KingCandy(__v94Candy.boss);__v102MountainBuild();__v102CorsairBuild();__v102CourtBuild();__v102SolarFinish();__v102RiddleBuild();__v102RoomIndex();__v102BatchBarrels();__v75Sync();
}
const __v102World=_bj;_bj=function(...args){
 const p=__v102Performance;p.ready=false;p.epoch++;p.dark=null;p.doorAt=-1;p.barrels=[];for(const batch of p.batches)batch.dispose();p.batches=[];
 const result=__v102World(...args);__v102Build();return result;
};
const __v102Load=_dn;_dn=function(...args){
 const result=__v102Load(...args),darkSites=new Set(__v102Fort.groups.filter(g=>g.dark).map(g=>g.site));
 __v75Save.dark=__v75Save.dark.filter(key=>{const a=__v83.areas.find(a=>a.key===key);return a&&darkSites.has(a.site);});__v102Performance.dark=null;__v75DarkView();__v102SyncBarrels();
 const a=__v75At();if(a&&_i7(_14.x,_14.z,_14.y)){const p=__v75Spot(a,_14.x,_14.z,12,a.y);if(p){_14.set(p.x,p.y+1.85,p.z);_12=0;_bl();}}
 return result;
};
const __v102HazardFrame=__v75Tick;__v75Tick=function(dt){const result=__v102HazardFrame(dt);if(_u&&!_74())__v102CloudUniform.value=__v75.clock;return result;};
window.__AURELIA_FORTRESSES102__={audit:()=>({groups:__v102Fort.groups.map(g=>({...g})),rooms:__v102Fort.rooms.map(r=>({id:r.id,area:r.a.key,site:r.a.site,point:[r.x,r.z],kind:r.kind,level:r.level})),mazes:__v102Fort.mazes.length,extraBarrels:__v102Fort.barrels,decorations:__v102Fort.decorations,darkBrightness:.14,details:__v83.areas.map(a=>({key:a.key,...a.__v102Details}))})};
