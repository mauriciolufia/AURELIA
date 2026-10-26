/* Ten equipped defenders, five champions, and a third of the final throne-floor garrison. */
const __v124Battle={arrows:[],mesh:null,arrowShots:0,arrowHits:0,eclipse:null};
function __v124FighterGear(n,champion){
 if(n.__gear124)return n.__gear124;
 const root=new _0.Group();root.name='Armadura y equipo de Forjabrasa';n.g.add(root);const steel=champion?'#d6b26a':'#8fa8b8';
 __v97Model(root,[['bevel',steel,0,1.76,.02,1.05,.88,.68],['bevel',steel,0,2.92,.02,.82,.54,.74],['box','#dac28e',0,2.71,-.38,.87,.1,.08],['box','#dac28e',0,1.43,-.35,1.06,.12,.08],['bevel',steel,-.66,2.05,.02,.34,.30,.55],['bevel',steel,.66,2.05,.02,.34,.30,.55],['box','#604738',.37,1.85,.48,.28,1.0,.32]]);
 for(let i=0;i<5;i++)__v97Model(root,[['box','#bda16c',.24+i*.065,2.48+i%2*.07,.48,.035,.8,.035],['cone','#e8e0c7',.24+i*.065,2.77+i%2*.07,.48,.08,.22,.08]]);
 const bow=()=>{const g=new _0.Group();for(let i=0;i<10;i++){const a=(i/9-.5)*Math.PI*.9;__v97Model(g,[['bevel','#9e704e',Math.cos(a)*.38,Math.sin(a)*.82,0,.09,.24,.10]]);}__v97Model(g,[['box','#eadbbb',.06,0,0,.022,1.65,.022]]);return g;};
 const held=bow(),stowed=bow();held.position.set(-.5,1.95,-.62);held.rotation.y=-Math.PI/2;held.visible=false;n.g.add(held);stowed.position.set(-.34,1.9,.49);stowed.rotation.z=.35;root.add(stowed);
 n.__gear124={root,held,stowed,champion};return n.__gear124;
}
const __v124MakeFighter=__v88MakeFighter;__v88MakeFighter=function(n,index,p){
 const d=__v124MakeFighter(n,index,p),factor=index<5?3:1;d.champion124=index<5;d.archer124=index%2===1;
 d.atk*=factor;d.hp*=factor;d.maxHp*=factor;Object.assign(n,{atk:d.atk,damage:d.atk,previousAtk:d.atk,hp:d.hp,maxHp:d.maxHp});__v124FighterGear(n,d.champion124);
 // Equipment added after resident creation must participate in the existing GPU residency record.
 const record=_b0.find(r=>r.owner===n);if(record){const loaded=record.loaded;if(loaded)_cq(record,false);const seen=new Set(record.parts.map(p=>p.o));n.g.traverse(o=>{if(o.isMesh&&!seen.has(o))record.parts.push({o,template:o.geometry,tier:'base',using:false});});if(loaded)_cq(record,true);}
 return d;
};
function __v124ArrowMesh(){
 if(!__v124Battle.mesh){const mesh=new _0.InstancedMesh(__v85ArrowGeometry(),new _0.MeshStandardMaterial({vertexColors:true,roughness:.7}),24);mesh.name='Flechas de los defensores de Forjabrasa';mesh.frustumCulled=false;mesh.count=0;_6.add(mesh);__v124Battle.mesh=mesh;}return __v124Battle.mesh;
}
function __v124Shoot(d,r){
 if(__v124Battle.arrows.length>=24||r.c.dead)return;
 const origin=new _0.Vector3(d.n.x,d.n.homeY+2.1,d.n.z),end=r.c.g.position.clone().add(new _0.Vector3(0,1.5,0));
 if(!_77(origin.x,origin.y,origin.z,end.x,end.y,end.z))return;
 __v124Battle.arrows.push({p:origin,dir:end.sub(origin).normalize(),remaining:36,atk:d.atk,target:r});__v124Battle.arrowShots++;__v124ArrowMesh();__v88Sfx('swing');
}
const __v124FighterTick=__v88FighterTick;__v88FighterTick=function(d,dt,demons,crowd){
 const n=d.n,gear=n.__gear124,w=__v88War;let r=d.target;if(!r||r.c.dead)r=demons.filter(r=>!r.c.dead).sort((a,b)=>a.c.g.position.distanceToSquared(n.g.position)-b.c.g.position.distanceToSquared(n.g.position))[0];
 const p=r?.c.g.position,distance=p?Math.hypot(p.x-n.x,p.z-n.z):Infinity;
 const ranged=d.archer124&&!n.__v88Dead&&!d.wounded&&r&&distance>4.5&&distance<=28&&(!d.action||d.action.type==='bow')&&_77(n.x,n.homeY+2.1,n.z,p.x,p.y+1.5,p.z);
 if(gear){gear.held.visible=!!ranged;gear.stowed.visible=!ranged;}
 if(!ranged){if(!n.__v88Dead&&!d.wounded)n.__v88Sword.visible=true;return __v124FighterTick(d,dt,demons,crowd);}
 d.target=r;n.__v88Moving=false;n.__v88Sword.visible=false;__v88Face(n,p,dt);__v88Pose(n,w.clock,false);n.activity='Defendiendo Forjabrasa con arco y flechas';
 if(!d.action&&w.clock>=d.next){d.action={type:'bow',start:w.clock,hit:false,target:r};d.next=w.clock+1.6;}
 if(d.action){const elapsed=w.clock-d.action.start;if(elapsed>=.28&&!d.action.hit){d.action.hit=true;__v124Shoot(d,d.action.target);}if(elapsed>=.65)d.action=null;}
 n.arms.forEach((a,i)=>a.rotation.x=i?-.95:-1.25);d.hit=Math.max(0,d.hit-dt);
};
function __v124ArrowStep(dt){
 const keep=[];for(const arrow of __v124Battle.arrows){
  const old=arrow.p.clone(),step=Math.min(arrow.remaining,42*dt),next=old.clone().addScaledVector(arrow.dir,step);arrow.remaining-=step;
  if(!_77(old.x,old.y,old.z,next.x,next.y,next.z))continue;
  const r=arrow.target,c=r.c,centre=c.g.position.clone().add(new _0.Vector3(0,1.5,0)),t=Math.max(0,Math.min(step,centre.clone().sub(old).dot(arrow.dir))),nearest=old.clone().addScaledVector(arrow.dir,t);
  if(!c.dead&&nearest.distanceTo(centre)<Math.max(.65,__v91Radius(c)*.7)){
   c.hp=Math.max(0,c.hp-__v105Damage(arrow.atk,c.def));r.hit=.18;__v124Battle.arrowHits++;__v88Spark(c.g.position,'#ffe4a1',1);__v88Sfx('impact');if(!c.hp)__v88DemonFall(r);continue;
  }
  arrow.p.copy(next);if(arrow.remaining>0)keep.push(arrow);
 }
 __v124Battle.arrows=keep;const mesh=__v124Battle.mesh;if(mesh){const matrix=new _0.Matrix4(),q=new _0.Quaternion(),axis=new _0.Vector3(0,0,1);mesh.count=keep.length;keep.forEach((a,i)=>{q.setFromUnitVectors(axis,a.dir);matrix.compose(a.p,q,new _0.Vector3(1,1,1));mesh.setMatrixAt(i,matrix);});mesh.instanceMatrix.needsUpdate=true;}
}
const __v124Projectiles=__v88ProjectileTick;__v88ProjectileTick=function(dt){const r=__v124Projectiles(dt);__v124ArrowStep(dt);return r;};
function __v124ClearArrows(){__v124Battle.arrows=[];if(__v124Battle.mesh)__v124Battle.mesh.count=0;for(const d of __v88War.fighters)if(d.n.__gear124)d.n.__gear124.held.visible=false;}
const __v124Retreat=__v88BeginRetreat;__v88BeginRetreat=function(...args){__v124ClearArrows();return __v124Retreat(...args);};
const __v124Cleanup=__v88Cleanup;__v88Cleanup=function(...args){__v124ClearArrows();return __v124Cleanup(...args);};
const __v124RaidStart=__v87RaidStart;__v87RaidStart=function(...args){const result=__v124RaidStart(...args);if(result){for(const d of __v88War.fighters)d.n.hp=d.hp;__v114PerfReset();}return result;};
function __v124ThinEclipse(){
 const a=__v88Eclipse.areas.at(-1);if(!a)return;
 if(__v124Battle.eclipse?.area!==a){
  const all=_m.filter(c=>c.hostile&&c.__v83Area===a.key&&!c.__v83Retired),protectedActor=c=>c.boss||c.questElite||c.__v52KeyArea||c.__v76KeyDrops?.length||c.__v87SecretGuard;
  const kept=new Set(all.filter(protectedActor)),target=Math.max(kept.size,Math.ceil(all.length/3)),rooms=new Map();
  for(const c of all)if(!kept.has(c)){const room=c.__v75Room;if(!rooms.has(room))rooms.set(room,[]);rooms.get(room).push(c);}
  while(kept.size<target){let added=false;for(const list of rooms.values())if(list.length&&kept.size<target){kept.add(list.shift());added=true;}if(!added)break;}
  __v124Battle.eclipse={area:a,before:all.length,kept:kept.size,suppressed:all.filter(c=>!kept.has(c))};
 }
 // Keep accounting records, so reducing this floor cannot recalibrate EXP elsewhere or award kills.
 for(const c of __v124Battle.eclipse.suppressed){c.__suppressed124=true;c.dead=true;c.hp=0;c.respawn=Infinity;if(c.specialAction)_d3(c);c.g.visible=false;if(c.warning)c.warning.visible=false;for(const r of _b0)if(r.owner===c||r.g===c.warning)_cq(r,false);}
 a.members=a.members.filter(c=>!c.__suppressed124);__v114PerfReset();
}
const __v124BattleWorld=_bj;_bj=function(...args){__v124ClearArrows();const r=__v124BattleWorld(...args);__v124ThinEclipse();return r;};
const __v124BattleLoad=_dn;_dn=function(...args){const r=__v124BattleLoad(...args);__v124ThinEclipse();return r;};
window.__AURELIA_BATTLE124__={audit:()=>({fighters:__v88War.fighters.map(d=>({id:d.n.id,index:d.index,champion:d.champion124,archer:d.archer124,level:d.level,atk:d.atk,hp:d.hp,maxHp:d.maxHp,armored:!!d.n.__gear124})),arrows:__v124Battle.arrows.length,arrowShots:__v124Battle.arrowShots,arrowHits:__v124Battle.arrowHits,eclipse:__v124Battle.eclipse?{floor:__v124Battle.eclipse.area.key,before:__v124Battle.eclipse.before,kept:__v124Battle.eclipse.kept,suppressed:__v124Battle.eclipse.suppressed.length}:null})};
