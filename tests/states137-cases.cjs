module.exports=[
['roles progress monotonically from level 1 to 60 with legal spell tiers',`(()=>{
 let cases=0;for(const role of Object.keys(__v137Roles.roles)){
 const original=_m.find(c=>c.hostile&&__v137Role(c)===role&&!c.boss&&!c.__v83Area);let last=[0,0,0];
 for(const level of [1,5,10,20,30,40,50,55,60]){
 const c={...original,level,maxHp:100,hp:50,__v87DefTime:0,__iraUntil124:0,specialAction:null,__v109Stamp:null,__kit137:null};
 __v87EnemyStats(c);__v109Ensure(c);const stats=[c.maxHp,c.damage,c.def];if(stats.some((v,i)=>v<last[i]))throw Error('Nonmonotonic '+role+'/'+level);last=stats;
 for(const s of c.__v68Skills)if(s.tier137>level||s.status&&!__v137Roles.status(s.status,level))throw Error('Illegal unlock');
 if(c.__v68Skills.length>(level<=40?2:3))throw Error('Too many skills');cases++;
 }}return{cases};
})()`],
['every spawned enemy has a species role, legal techniques and stable stats',`(()=>{
 const groups={};for(const c of _m.filter(c=>c.hostile)){
  const role=__v137Role(c);groups[role]=(groups[role]||0)+1;
  if(!c.__kit137||!c.__v68Skills.includes(c.art)||!(c.maxHp>0&&c.damage>0&&c.def>0))throw Error('Invalid enemy '+c.spawnId);
  for(const s of c.__v68Skills)if(s.status&&!__v137Roles.status(s.status,c.level))throw Error('High level status on '+c.spawnId);
  const before=[c.maxHp,c.damage,c.def];__v87EnemyStats(c);__v87EnemyStats(c);if(JSON.stringify(before)!==JSON.stringify([c.maxHp,c.damage,c.def]))throw Error('Stacking stats '+c.spawnId);
  if(role==='tank'&&!c.__v68Skills.some(s=>s.type==='buffDefense'))throw Error('No tank defense');
  if(role==='mage'&&c.boss!=='azrakh'&&!c.__v88Raid&&!c.__v68Skills.some(s=>s.type==='projectile'))throw Error('No magic projectile');
 }
 if(Object.keys(groups).length!==6)throw Error('Missing roles');return groups;
})()`],
['infernal casters retain their unique healing and attack buffs',`(()=>{
 const arch=_m.find(c=>c.__v109Family==='archdevil'&&!c.__v88Raid),devourer=_m.find(c=>c.__v109Family==='devourer');
 const heal=arch.__v68Skills.find(s=>s.healFraction124),rage=devourer.__v68Skills.find(s=>s.id==='ira124');if(!heal||!rage||!['fire','shadow'].every(e=>arch.__v68Skills.some(s=>s.type==='projectile'&&s.element===e)))throw Error('Lost signature technique');
 const hp=arch.hp;arch.hp=Math.floor(arch.maxHp*.2);arch.__v68Heals=0;arch.__v68SupportReady=0;if(__v68Choose(arch)!==heal)throw Error('Will not heal');
 arch.specialAction={art:heal,phase:'windup',rune:_d2(arch.g.position.x,arch.g.position.y,arch.g.position.z,2,heal.color)};const before=arch.hp;_d5(arch);if(arch.hp<=before)throw Error('Healing fails');_d3(arch);arch.hp=hp;
 const base=devourer.damage;__v124Ira(devourer);if(devourer.damage!==Math.round(base*1.5))throw Error('Wrong rage multiplier');__v87EnemyStats(devourer);if(devourer.damage!==Math.round(base*1.5))throw Error('Stacked rage');devourer.__iraUntil124=0;__v124Raging.delete(devourer);__v87EnemyStats(devourer);return{archdevilHeal:heal.healFraction124,devourerRage:rage.attackFactor124};
})()`],
['tank defense and healing change actual ally HP without stacking defense',`(()=>{
 const c=_m.find(c=>__v137Role(c)==='tank'&&!c.marine&&!c.__v83Area&&!c.boss),ally=_m.find(n=>n!==c&&n.hostile&&!n.marine&&!n.__v83Area&&!n.boss),old=ally.g.position.clone(),random=Math.random,hero=_14.clone();
 try{_14.set(c.g.position.x,c.g.position.y+1.85,c.g.position.z+3);__v123Refresh(true);ally.g.position.copy(c.g.position);ally.g.position.x+=1;__v123Refresh(true);__v68Local.source=null;__v114PerfReset();ally.hp=Math.floor(ally.maxHp*.2);ally.__v68Heals=0;c.__v68Heals=0;c.__v68SupportReady=0;c.__v87DefTime=0;c.hp=c.maxHp;
 const s=__v68Choose(c);if(!s.mend137)throw Error('Ignores wounded ally '+JSON.stringify({species:c.spec.id,kit:c.__v68Skills,neighbors:__v68Allies(c,12).map(n=>n.spawnId),ally:ally.spawnId,marine:[c.marine,ally.marine]}));const before=ally.hp,def=c.__v87BaseDef;
 c.specialAction={art:s,phase:'windup',rune:_d2(c.g.position.x,c.g.position.y,c.g.position.z,2,s.color)};_d5(c);
 if(ally.hp<=before||c.def!==Math.round(def*1.35)||c.__v87DefTime!==8)throw Error('Support failed');
 __v87EnemyStats(c);if(c.def!==Math.round(def*1.35))throw Error('Defense stacked');_d3(c);return{healed:ally.hp-before,baseDef:def,buffedDef:c.def};
 }finally{ally.g.position.copy(old);_14.copy(hero);Math.random=random;}
})()`],
['stone and freeze last ten seconds, suppress actions, lock geometry and restore materials',`(()=>{
 const c=_m.find(c=>c.spec.id==='wolf'&&c.hostile&&!c.__v83Area),random=Math.random,pos=_14.clone(),results=[];
 try{_14.set(c.g.position.x,c.g.position.y+1.85,c.g.position.z+3);__v123Refresh(true);c.g.visible=true;Math.random=()=>0;
 for(const kind of ['stone','freeze']){__v119EffectsClear();__v137VisualClear();__v119Affect(c,kind,_5n.find(s=>s.status119===kind));
 __v137VisualTick();const v=__v137Status.visuals.get(c);if(!v||!v.materials.size)throw Error('Missing finish '+kind);
 const [mesh,entry]=[...v.materials][0];if(mesh.material===entry.original)throw Error('Shared finish');
 if(kind==='stone'&&!(Array.isArray(mesh.material)?mesh.material:[mesh.material]).every(m=>m.map===__v137Status.stoneTexture&&m.vertexColors===false))throw Error('Not stone');
 if(kind==='freeze'&&!v.shell?.visible)throw Error('No ice shell');
 const p=c.g.position.clone(),q=c.g.quaternion.clone();c.g.position.x+=2;c.g.rotation.z+=.3;__v137VisualTick();if(!c.g.position.equals(p)||!c.g.quaternion.equals(q))throw Error('Not immobilized');
 if(__v109MoveRate(c)!==0||_d4(c)!==false||__v70AttackChoice(c)!==null)throw Error('Can act while '+kind);
 __v119EffectsTick(9.99);if(!__v119Disabled(c))throw Error('Expired early');__v119EffectsTick(.011);__v137VisualTick();
 if(__v119Disabled(c)||mesh.material!==entry.original)throw Error('Did not recover '+kind);results.push(kind);
 }return{seconds:10,states:results};}finally{_14.copy(pos);Math.random=random;__v119EffectsClear();__v137VisualClear();}
})()`],
['burn and poison have visible particles and exactly one damage pulse per two seconds',`(()=>{
 const c=_m.find(c=>c.spec.id==='wolf'&&c.hostile&&!c.__v83Area),random=Math.random,pos=_14.clone(),snapshot={...c},result=[];
 try{_14.set(c.g.position.x,c.g.position.y+1.85,c.g.position.z+3);__v123Refresh(true);c.g.visible=true;Math.random=()=>0;
 for(const kind of ['burn','poison']){__v119EffectsClear();c.hp=c.maxHp=100000;c.dead=false;c.guardTime=c.__v87BarrierTime=0;
 const s={power:60,color:__v119Afflictions[kind].color};__v119Affect(c,kind,s);__v137VisualTick();if(!__v137Status.batches.get(kind)?.mesh.count)throw Error('Invisible '+kind);
 const e=__v119Effects.enemies.get(c).get(kind),before=c.hp;__v119EffectsTick(1.99);if(c.hp!==before)throw Error('Early pulse');
 const damage=__v105Damage(60*_fy(c,kind==='burn'?'fire':'nature'),c.def);__v119EffectsTick(.01);if(before-c.hp!==damage)throw Error('Wrong damage');
 if(__v119Effects.enemies.get(c).get(kind)!==e||e.remaining>10.01)throw Error('Recursive refresh');
 const next=c.hp;__v119EffectsTick(2);if(next-c.hp!==damage)throw Error('Duplicated pulse');result.push({kind,damage});}
 return result;}finally{Object.assign(c,snapshot);_14.copy(pos);Math.random=random;__v119EffectsClear();__v137VisualClear();}
})()`],
['hero statuses stop movement and attacks, render in third person and remain subtle in first person',`(()=>{
 const random=Math.random,old=_14.clone(),results=[];try{
 __aurSetCameraMode('third');__aurUpdatePlayerAvatar(.016);
 for(const kind of ['stone','freeze','burn','poison','sleep']){
 __v56ClearStatuses(false);if(kind==='poison')__v87ApplyPoison();else if(kind==='burn'){_cu.burn=8;_cu.burnDamage=1;}else __v137HeroAffect(kind);
 __aurUpdatePlayerAvatar(.016);__v137VisualTick();if(!__v137Status.visuals.has('hero'))throw Error('Invisible hero '+kind);
 if(['stone','freeze','sleep'].includes(kind)){
 const p=_14.clone();_15.KeyW=true;_3m(.2);_15.KeyW=false;if(!_14.equals(p)||_8d()!==false||_gd()!==false||_3c()!==false)throw Error('Hero can act '+kind);
 const velocity=_12,swing=_84;$('jump').click();$('attack').click();if(_12!==velocity||_84!==swing)throw Error('Buttons bypass immobilization');
 }
 if(kind==='sleep'&&!__v137Status.batches.get('sleep')?.mesh.count)throw Error('No sleeping Zs');
 __aurSetCameraMode('first');__aurUpdatePlayerAvatar(.016);__v137VisualTick();const overlay=__v137Status.overlay;
 if(overlay.hidden||Number(overlay.style.opacity)>.2||overlay.style.pointerEvents!=='none'||__v137Status.visuals.has('hero'))throw Error('First-person obstruction');
 __aurSetCameraMode('third');__aurUpdatePlayerAvatar(.016);results.push(kind);
 }
 __v56ClearStatuses(false);__v137VisualTick();if(__v137Status.visuals.has('hero')||!__v137Status.overlay.hidden||__v137HeroDisabled())throw Error('Panacea did not clear');
 for(const kind of ['stone','freeze']){__v137HeroAffect(kind);_ge(9.99);if(!__v137HeroDisabled())throw Error('Early recovery');_ge(.011);if(__v137HeroDisabled())throw Error('No recovery');}
 return results;
 }finally{Math.random=random;_14.copy(old);_15.KeyW=false;__v56ClearStatuses(false);}
})()`],
['native enemy impact applies stone and freeze only after a successful hit',`(()=>{
 const c=_m.find(c=>c.hostile&&!c.__v83Area&&!c.boss&&!c.marine),random=Math.random,pos=_14.clone(),level=rpg.level;
 try{rpg.level=60;_2l=_g4().maxHp;_14.set(c.g.position.x,c.g.position.y+1.85,c.g.position.z+1);__v123Refresh(true);__v118SlotsClear();__v118Slots.active.set(c,{seen:performance.now()});Math.random=()=>.99;
 for(const kind of ['stone','freeze']){__v56ClearStatuses(false);c.__v68ImpactAt=0;__v68RespawnUntil=0;_2m=0;
 if(!__v117RangedHit(c,.1,kind)||__v137Status.hero[kind]!==10)throw Error('Real impact failed '+kind);}
 return {realIncoming:true};}finally{Math.random=random;_14.copy(pos);rpg.level=level;__v56ClearStatuses(false);}
})()`],
['ranged basic turns launch dodgeable projectiles and keep their distance',`(()=>{
 const c=_m.find(c=>__v137Role(c)==='ranged'&&!c.__v83Area&&!c.marine&&!c.boss),pos=_14.clone(),old=c.g.position.clone(),random=Math.random;
 try{_14.set(c.g.position.x,c.g.position.y+1.85,c.g.position.z+12);__v123Refresh(true);__v68Local.source=null;__v114PerfReset();__v118SlotsClear();__v118Slots.active.set(c,{seen:performance.now()});
 c.stun=c.cooldown=0;c.ai='patrol';c.specialCooldown=0;c.__v68NextAction=0;c.__v70AttackChoice='normal';__v68RespawnUntil=0;Math.random=()=>.99;
 const hp=_2l;_d6(.01);if(!c.specialAction?.art.normal137||_2l!==hp)throw Error('No telegraphed normal shot');
 _d5(c);const shot=_ct.find(p=>p.c===c&&p.art.normal137);if(!shot||!Number.isFinite(shot.remaining)||shot.art.status!==null)throw Error('No physical projectile');
 _d3(c);c.ai='patrol';c.cooldown=0;__v98EnemyDecision(c);if(__v98EnemyBrain(c).action!=='keepDistance')throw Error('Charges into melee');
 return{projectile:true,range:shot.remaining,action:__v98EnemyBrain(c).action};
 }finally{for(const p of [..._ct])if(p.c===c){p.g.removeFromParent();p.g.geometry.dispose();p.m.dispose();_ct.splice(_ct.indexOf(p),1);}_14.copy(pos);c.g.position.copy(old);Math.random=random;}
})()`],
['pause retains status duration and load clears transient visuals without stacking roles',`(()=>{
 __v137HeroAffect('freeze');const paused=_74;try{_74=()=>true;_ge(20);if(__v137Status.hero.freeze!==10)throw Error('Timer advanced while paused');}finally{_74=paused;}
 __v56ClearStatuses(false);const c=_m.find(c=>c.hostile&&!c.boss),before=[c.maxHp,c.damage,c.__v87BaseDef];_iv();const save=JSON.parse(__v96ReadSave());_dn(save);_dn(save);
 if(JSON.stringify(before)!==JSON.stringify([c.maxHp,c.damage,c.__v87BaseDef])||__v137Status.visuals.size)throw Error('Load stacks roles or retains finish');return{reloadStable:true};
})()`]
];
