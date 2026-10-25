/* Three hero attackers in the whole encounter, shared by every combat controller. */
const __v118Slots={active:new Map(),waiting:new Set(),next:-Infinity,x:Infinity,y:Infinity,z:Infinity};
function __v118WantsHero(c){return !!c?.hostile&&!c.dead&&!c.__v83Retired&&__v92SameFloor(c)&&Math.hypot(c.g.position.x-_14.x,c.g.position.z-_14.z)<__v92Detect(c)&&__v92LOS(c);}
function __v118Pending(c){return !!c.specialAction||c.ai==='windup'||_ct.some(p=>p.c===c)||(c===__v94Emperor.boss&&!!(__v94Emperor.action||__v94Emperor.balls.length||__v94Emperor.waves.length))||__v88War.projectiles.some(p=>p.owner.c===c&&p.life>0);}
function __v118StopWaiting(c){
 c.__v54Aggro=false;c.__v75AlertUntil=0;c.__v70AttackChoice=null;
 if(c.ai==='windup'){c.ai='patrol';c.attackTimer=0;if(c.warning)c.warning.visible=false;}
 if(c.specialAction)_d3(c);
 const b=__v98AI.enemy.get(c);if(b){b.action='wait';b.target=null;b.lastSeen=null;b.seenAt=-Infinity;}
}
function __v118SlotsUpdate(force=false){
 const s=__v118Slots,now=performance.now();
 if(!force&&now<s.next&&Math.hypot(_14.x-s.x,_14.z-s.z)<3&&Math.abs(_14.y-s.y)<1)return;
 s.next=now+120;s.x=_14.x;s.y=_14.y;s.z=_14.z;
 for(const[c,lease]of s.active){
  if(c.dead||_2l<=0||!__v92SameFloor(c)){s.active.delete(c);continue;}
  if(__v118WantsHero(c))lease.seen=now;
  else if(now-lease.seen>1500&&!__v118Pending(c))s.active.delete(c);
 }
 const candidates=__v68Pool().filter(__v118WantsHero).sort((a,b)=>a.g.position.distanceToSquared(_14)-b.g.position.distanceToSquared(_14));
 s.waiting.clear();
 for(const c of candidates){
  if(!s.active.has(c)&&s.active.size<3)s.active.set(c,{seen:now});
  if(!s.active.has(c)){s.waiting.add(c);__v118StopWaiting(c);}
 }
}
function __v118Slot(c){
 if(!c?.hostile)return true;if(c.dead||_2l<=0)return false;
 __v118SlotsUpdate();const s=__v118Slots;
 // Late spawns may join a free slot without waiting for the next sensing pass.
 if(!s.active.has(c)&&s.active.size<3&&__v118WantsHero(c))s.active.set(c,{seen:performance.now()});
 return s.active.has(c)&&__v92SameFloor(c);
}
function __v118SlotsClear(){const s=__v118Slots;s.active.clear();s.waiting.clear();s.next=-Infinity;s.x=s.y=s.z=Infinity;}
const __v118SlotsFrame=_d7;_d7=function(dt){if(_u&&!_74())__v118SlotsUpdate();return __v118SlotsFrame(dt);};
const __v118SlotSight=__v85EnemySight;__v85EnemySight=function(c,d){if(c?.hostile&&!__v118Slot(c)){c.__v54Aggro=false;return false;}return __v118SlotSight(c,d);};
const __v118SlotChoice=__v70AttackChoice;__v70AttackChoice=function(c){return c?.hostile&&!__v118Slot(c)?null:__v118SlotChoice(c);};
const __v118SlotStart=_d4;_d4=function(c){return c?.hostile&&!__v118Slot(c)?false:__v118SlotStart(c);};
const __v118SlotHit=_d0;_d0=function(c,...args){return c?.hostile&&!__v118Slot(c)?false:__v118SlotHit(c,...args);};
const __v118SlotDecision=__v98EnemyDecision;__v98EnemyDecision=function(c){if(c?.hostile&&!__v118Slot(c)){__v118StopWaiting(c);return;}return __v118SlotDecision(c);};
const __v118SlotTactics=__v68Tactics;__v68Tactics=function(c,d){return c?.hostile&&!__v118Slot(c)?null:__v118SlotTactics(c,d);};
const __v118SlotMovement=__v109MoveRate;__v109MoveRate=function(c){return __v118Slots.waiting.has(c)?0:__v118SlotMovement(c);};
const __v118SlotEmperor=__v94EmperorTick;__v94EmperorTick=function(dt){const c=__v94Emperor.boss;if(c&&!c.dead&&__v92SameFloor(c)&&!__v118Slot(c)){__v94EmperorClear();return;}return __v118SlotEmperor(dt);};
const __v118SlotWorld=_bj;_bj=function(...args){__v118SlotsClear();return __v118SlotWorld(...args);};
const __v118SlotLoad=_dn;_dn=function(...args){__v118SlotsClear();return __v118SlotLoad(...args);};
const __v118SlotsAudit=window.__AURELIA_COMBAT118__.audit;window.__AURELIA_COMBAT118__.audit=()=>({...__v118SlotsAudit(),attackers:{limit:3,active:[...__v118Slots.active.keys()].map(c=>c.spawnId),waiting:__v118Slots.waiting.size}});
