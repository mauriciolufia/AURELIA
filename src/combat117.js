/* A horizontal cut in both views, timed to the existing single damage window. */
const __v117Sword={active:false,contact:false,hit:0,swings:0,hits:0,sounds:0,noise:null,context:null};
function __v117Blend(a,b,k){k=_18(k,0,1);k=k*k*(3-2*k);const p={};for(const key in a)p[key]=a[key]+(b[key]-a[key])*k;return p;}
function __v117Cut(t,combo,third=false){
 const side=combo===1?-1:1;
 const poses=third?[
  {ax:0,ay:0,az:.12,px:0,py:-.72,pz:-.02,wx:.16,wy:0,wz:-.16},
  {ax:-.9,ay:side*1.1,az:-.3,px:0,py:-.72,pz:-.02,wx:.35,wy:side*.15,wz:-side*1.15},
  {ax:-.85,ay:-side*1.3,az:.15,px:0,py:-.72,pz:-.08,wx:.35,wy:-side*.15,wz:-side*1.15}
 ]:[
  {x:.30,y:-.30,z:-.90,rx:-.10,ry:-.04,rz:-.24},
  {x:side*.52,y:-.18,z:-.88,rx:.15,ry:side*.9,rz:-side*1.35},
  {x:-side*.48,y:-.16,z:-.94,rx:.12,ry:-side*.9,rz:-side*1.25}
 ];
 if(t<.18)return __v117Blend(poses[0],poses[1],t/.18);
 if(t<.52)return __v117Blend(poses[1],poses[2],(t-.18)/.34);
 if(t<.64)return poses[2];
 return __v117Blend(poses[2],poses[0],(t-.64)/.36);
}
__v49SwordPose3D=(t,combo)=>__v117Cut(t,combo);
__v45SwordPose=(t,combo)=>__v117Cut(t,combo,true);
function __v117SwordSound(impact=false){
 if(!_6d)return;_6p();if(!_3d||!_6i)return;
 const s=__v117Sword,ctx=_3d,t=ctx.currentTime;
 if(s.context!==ctx||!s.noise){s.context=ctx;s.noise=ctx.createBuffer(1,Math.ceil(ctx.sampleRate*.24),ctx.sampleRate);const samples=s.noise.getChannelData(0);for(let i=0;i<samples.length;i++)samples[i]=Math.random()*2-1;}
 const source=ctx.createBufferSource(),filter=ctx.createBiquadFilter(),gain=ctx.createGain(),pan=ctx.createStereoPanner?.(),duration=impact?.13:.21,side=_85===1?-1:1;
 source.buffer=s.noise;filter.type=impact?'bandpass':'highpass';filter.Q.value=impact?.9:.6;
 filter.frequency.setValueAtTime(impact?1250:6500,t);filter.frequency.exponentialRampToValueAtTime(impact?350:700,t+duration);
 gain.gain.setValueAtTime(.001,t);gain.gain.exponentialRampToValueAtTime(impact?.8:.6,t+.008);gain.gain.exponentialRampToValueAtTime(.001,t+duration);
 source.connect(filter);filter.connect(gain);if(pan){pan.pan.setValueAtTime(side*.6,t);pan.pan.linearRampToValueAtTime(-side*.6,t+duration);gain.connect(pan);pan.connect(_6i);}else gain.connect(_6i);
 source.onended=()=>{source.disconnect();filter.disconnect();gain.disconnect();pan?.disconnect();};source.start(t);source.stop(t+duration);
 if(impact){_6rb(155,52,.15,.42,'sine');_6q(1550,.075,.17,'triangle');}else _6rb(590,140,.18,.22,'triangle');s.sounds++;
}
const __v117Sfx=_6s;_6s=function(kind){if(kind==='swing'){__v117Sword.swings++;return __v117SwordSound();}if(kind==='impact'&&__v117Sword.active)return;return __v117Sfx(kind);};
const __v117SwordStrike=_8e;_8e=function(){const s=__v117Sword,old=s.active;s.active=true;s.contact=false;try{return __v117SwordStrike();}finally{s.active=old;}};
const __v117SwordDamage=_fd;_fd=function(c,amount,kind='physical'){
 const hp=c?.hp,r=__v117SwordDamage(c,amount,kind),s=__v117Sword;
 if(s.active&&kind==='physical'&&c?.hp<hp&&!s.contact){s.contact=true;s.hit=.12;s.hits++;__v117SwordSound(true);__v68Burst(__v92AimPoint(c),'#fff0ad','impact',1.1,.22);if(__v60Mobile)navigator.vibrate?.(24);}
 return r;
};
const __v117SwordFrame=_8g;_8g=function(dt){const r=__v117SwordFrame(dt),s=__v117Sword;if(_u&&!_74())s.hit=Math.max(0,s.hit-dt);if(_4n&&__aurCameraMode!=='third'&&s.hit>0){const punch=Math.sin(s.hit/.12*Math.PI);_4n.position.z+=punch*.065;}return r;};

/* Recruit two nearby allies per leader; reinforcements cannot recruit a chain. */
const __v117Escorts={groups:new Map(),owners:new WeakMap(),at:-Infinity};
function __v117Leader(c){return !!c?.hostile&&(c.boss||c.elite||c.questElite||__v109Context(c).boss);}
function __v117EscortClear(c,leader){
 const p=c.g.position,q=leader.g.position;
 return !c.dead&&!leader.dead&&c.__v83Area===leader.__v83Area&&Math.abs(p.y-q.y)<3&&p.distanceToSquared(q)<=22*22&&_5w(q.x,q.z,p.x,p.z,q.y+1.85);
}
function __v117Recruit(leader,pool){
 const e=__v117Escorts;let group=e.groups.get(leader);if(!group)e.groups.set(leader,group=new Set());
 for(const c of group)if(!__v117EscortClear(c,leader)){group.delete(c);e.owners.delete(c);}
 if(!leader.dead&&leader.ai==='chase'){
  const candidates=pool.filter(c=>c!==leader&&!__v117Leader(c)&&!e.owners.has(c)&&__v117EscortClear(c,leader)).sort((a,b)=>a.g.position.distanceToSquared(leader.g.position)-b.g.position.distanceToSquared(leader.g.position));
  for(const c of candidates){if(group.size>=2)break;group.add(c);e.owners.set(c,leader);}
  for(const c of group){c.__v54Aggro=true;c.__v75AlertUntil=__v75.clock+1;}
 }
 return group;
}
__v96AlertAllies=function(a){for(const c of a.members)if(__v117Leader(c))__v117Recruit(c,a.members);};
function __v117Alarm(a,c){if(__v117Leader(c))__v117Recruit(c,a.members);else{const leader=__v117Escorts.owners.get(c);if(leader)__v117Recruit(leader,a.members);} }
const __v117EscortTick=__v98EnemySense;__v98EnemySense=function(dt){const r=__v117EscortTick(dt),e=__v117Escorts;if(__v98AI.clock<e.at)return r;e.at=__v98AI.clock+.25;for(const c of __v98AI.near)if(__v117Leader(c))__v117Recruit(c,__v98AI.near);for(const[leader,group]of e.groups)if(leader.dead||!group.size){for(const c of group)e.owners.delete(c);e.groups.delete(leader);}return r;};

/* Aim assistance requires looking at the body, a clear ray and the spell's real range. */
const __v117Magic={flight:null,evades:0,hits:0};
__v92Nearest=function(spell,origin){
 const range=Number(spell.range)||0,view=_7.position,direction=_7.getWorldDirection(new _0.Vector3()),candidates=[];
 for(const c of __v114LocalEnemies()){
  if(!c.hostile||c.dead||!c.g||!__v92SameFloor(c))continue;
  const point=__v92AimPoint(c),distance=point.distanceTo(origin);if(distance>range||distance<.1)continue;
  const look=point.clone().sub(view),length=look.length(),dot=look.dot(direction)/(length||1);if(dot<Math.cos(12*Math.PI/180))continue;
  candidates.push({c,point,distance,score:dot-distance*.00005});
 }
 candidates.sort((a,b)=>b.score-a.score);for(const t of candidates)if(__v92Ray(origin,t.point)&&__v92Ray(view,t.point))return t;return null;
};
__v92TrackFlight=function(f,dt){
 const c=f.target92;if(!c||c.dead||!__v92SameFloor(c))return;
 const point=__v92AimPoint(c);if(point.distanceTo(f.origin92)>f.range92||!__v92Ray(f.g.position,point))return;
 // Use today's body position, not a lagging interpolated endpoint that misses mobile targets.
 f.end.copy(point);f.dir.copy(point).sub(f.g.position).normalize();
};
function __v117Evade(c,f){
 f.__v117Outcomes??=new WeakMap();if(f.__v117Outcomes.has(c))return f.__v117Outcomes.get(c);
 const evade=Math.random()<.3;f.__v117Outcomes.set(c,evade);
 if(evade){__v117Magic.evades++;const p=c.g.position,dir=f.dir;
  for(const sign of[1,-1]){const x=p.x+dir.z*sign*1.8,z=p.z-dir.x*sign*1.8,y=_h7(c,x,z);if(y!==false){p.set(x,y,z);break;}}
  __v68Burst(__v92AimPoint(c),'#a9e8ff','impact',.7,.18);_5p=.45;$('damage-text').textContent='MAGIA EVADIDA';$('damage-text').style.color='#a9e8ff';
 }
 return evade;
}
const __v117MagicDamage=_fd;_fd=function(c,amount,kind='physical'){
 const f=__v117Magic.flight;if(f&&__v58Offensive.has(kind)&&c?.hostile&&!c.dead&&__v117Evade(c,f))return false;
 const hp=c?.hp,r=__v117MagicDamage(c,amount,kind);if(f&&c?.hp<hp)__v117Magic.hits++;return r;
};
const __v117MagicImpact=__v92FlightImpact;__v92FlightImpact=function(f){const old=__v117Magic.flight;__v117Magic.flight=f;try{return __v117MagicImpact(f);}finally{__v117Magic.flight=old;}};
const __v117CombatWorld=_bj;_bj=function(...args){__v117Escorts.groups.clear();__v117Escorts.owners=new WeakMap();__v117Escorts.at=-Infinity;__v117Sword.hit=0;return __v117CombatWorld(...args);};
window.__AURELIA_COMBAT117__={audit:()=>({sword:{swings:__v117Sword.swings,hits:__v117Sword.hits,sounds:__v117Sword.sounds,horizontal:true},magic:{hits:__v117Magic.hits,evades:__v117Magic.evades,evadeChance:.3,lookConeDegrees:12},escorts:[...__v117Escorts.groups].map(([c,group])=>({leader:c.spawnId,allies:[...group].map(c=>c.spawnId)}))})};
