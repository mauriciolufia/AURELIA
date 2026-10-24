/* One committed 30/70 choice per attack turn, shared by ordinary and private controllers. */
__v109Combat.aggression*=2;
const __v113Combat={turns:new WeakMap(),choices:0,techniques:0,leads:0};
function __v113Telegraph(c,opacity){
 if(!c.warning?.material){
  const old=c.warning,radius=__v85EnemyRange(c,(c.defn?.range||4)*1.3*1.5*.7*1.5);
  const ring=new _0.Mesh(new _0.RingGeometry(Math.max(.1,radius-.16),radius,48),new _0.MeshBasicMaterial({color:'#ee9d69',transparent:true,opacity,side:_0.DoubleSide,depthWrite:false}));
  ring.rotation.x=-Math.PI/2;(old?.parent||_8).add(ring);old?.removeFromParent();c.warning=ring;
 }
 c.warning.position.set(c.g.position.x,c.g.position.y+.12,c.g.position.z);c.warning.visible=true;
 for(const material of Array.isArray(c.warning.material)?c.warning.material:[c.warning.material])material.opacity=opacity;
}
function __v113Turn(actor){
 let bag=__v113Combat.turns.get(actor);
 if(!bag?.length){bag=['special','special','special',...Array(7).fill('normal')];for(let i=bag.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[bag[i],bag[j]]=[bag[j],bag[i]];}__v113Combat.turns.set(actor,bag);}
 const choice=bag.pop();__v113Combat.choices++;if(choice==='special')__v113Combat.techniques++;return choice;
}
const __v113Detect=__v92Detect;__v92Detect=function(c){return __v113Detect(c)*(c?.hostile?1.15:1);};
__v70AttackChoice=function(c){
 if(!c?.hostile||c.dead||c.specialAction||['windup','recover'].includes(c.ai)||c.stun>0||c.cooldown>0||__v68CombatTime<(c.__v68NextAction||0))return null;
 const d=Math.hypot(c.g.position.x-_14.x,c.g.position.z-_14.z);
 if(d>=__v92Detect(c)||!__v92LOS(c))return null;
 if(!c.__v70AttackChoice){c.__v70AttackChoice=__v113Turn(c);c.__v68DecisionAt=0;}
 if(c.__v70AttackChoice==='special'){const art=__v68Choose(c);if(art)c.art=art;}
 return c.__v70AttackChoice;
};
const __v113Decision=__v98EnemyDecision;__v98EnemyDecision=function(c){
 const r=__v113Decision(c),b=__v98EnemyBrain(c),p=c.g.position,d=Math.hypot(p.x-_14.x,p.z-_14.z);
 if(d>=__v92Detect(c)||!__v92LOS(c))return r;
 b.next=Math.min(b.next,__v98AI.clock+.1+(b.slot%3)*.015);
 const choice=__v70AttackChoice(c);
 if(choice==='normal'&&['ranged','support'].includes(b.role)&&['keepDistance','pursue','intercept','encircle','flankLeft','flankRight','support'].includes(b.action)&&d>__v98Reach(c)*.75){
  // Bounded interception retains collision checks; a ranged monster must still close for a basic hit.
  const lead=Math.min(.18,d/Math.max(1,c.speed||4)*.08),target={x:_14.x+__v98AI.velocity.x*lead,z:_14.z+__v98AI.velocity.z*lead,mode:'intercept'};
  if(__v97SafeTarget(c,target)){b.action='intercept';b.target=target;}
 }
 if(choice==='special'&&c.art?.power>0&&['keepDistance','pursue','intercept','encircle','flankLeft','flankRight'].includes(b.action)){
  const art=c.art,range=art.type==='ring'?Math.min(art.range,art.radius):art.range;
  if(d>range*.85){const offset=range*.65,target={x:_14.x+(p.x-_14.x)/(d||1)*offset,z:_14.z+(p.z-_14.z)/(d||1)*offset,mode:'pursue'};if(__v97SafeTarget(c,target)){b.action='pursue';b.target=target;}}
 }
 return r;
};
function __v113Aim(c,art){
 const p=c.g.position,d=Math.hypot(_14.x-p.x,_14.z-p.z),speed=art.type==='projectile'?73.71:45;
 const time=Math.min(.35,d/speed),v=__v98AI.velocity,mag=Math.hypot(v.x,v.z),scale=mag>20?20/mag:1;
 const target=new _0.Vector3(_14.x+v.x*scale*time,_14.y-.4,_14.z+v.z*scale*time);
 if(Math.hypot(target.x-p.x,target.z-p.z)>art.range||!_77(p.x,p.y+1.7,p.z,target.x,target.y,target.z))return new _0.Vector3(_14.x,_14.y-.4,_14.z);
 __v113Combat.leads++;return target;
}
const __v113Release=_d5;_d5=function(c){const a=c.specialAction;if(a?.phase==='windup'&&['projectile','charge'].includes(a.art.type)&&__v92LOS(c))a.target.copy(__v113Aim(c,a.art));return __v113Release(c);};
// Only the projectile/charge follows the new aim. Ground danger markers remain fixed and dodgeable.
function __v113RaidChoice(r){r.__v113Choice??=__v113Turn(r);return r.__v113Choice;}
function __v113RaidAttack(r){const choice=__v113RaidChoice(r);r.__v113Choice=null;return choice==='normal'?'normal':['claw','fire','pulse'][(r.__v113Art=(r.__v113Art||0)+1)%3];}
// Raiders used to clear player aggro unconditionally, making their claw attacks ignore the hero.
const __v113RaidTargets=new WeakMap(),__v113RaidTick=__v88DemonTick;
__v88DemonTick=function(r,dt,fighters,crowd){
 const c=r.c,p=c.g.position,distance=Math.hypot(_14.x-p.x,_14.z-p.z);
 const closest=Math.min(Infinity,...fighters.filter(d=>!d.wounded&&!d.n.__v88Dead).map(d=>Math.hypot(d.n.x-p.x,d.n.z-p.z)));
 const attackHero=!c.dead&&_2l>0&&distance<Math.min(24,__v92Detect(c))&&(distance<closest+2||__v88War.clock<(c.__v113PlayerUntil||0))&&__v92LOS(c);
 const think=r.think;
 if(attackHero){
  let target=__v113RaidTargets.get(r);if(!target){target={__v113Hero:true,n:{g:{position:new _0.Vector3()},__v88Dead:false},wounded:false};__v113RaidTargets.set(r,target);}
  target.n.x=_14.x;target.n.z=_14.z;target.n.g.position.set(_14.x,_14.y-1.85,_14.z);target.hp=_2l;target.maxHp=_g4().maxHp;r.target=target;r.think=Infinity;
 }else if(r.target?.__v113Hero){r.target=null;r.think=0;}
 try{return __v113RaidTick(r,dt,fighters,crowd);}finally{if(attackHero)r.think=think;}
};
const __v113HitNPC=__v88HitNPC;__v88HitNPC=function(d,power,source){if(d?.__v113Hero)return _d0(source.c||source,power);return __v113HitNPC(d,power,source);};
const __v113RaidDamage=_fd;_fd=function(c,...args){if(c?.__v88Raid)c.__v113PlayerUntil=__v88War.clock+6;return __v113RaidDamage(c,...args);};
const __v113World=_bj;_bj=function(...args){__v113Combat.turns=new WeakMap();return __v113World(...args);};
const __v113Audit=window.__AURELIA_COMBAT102__.audit;window.__AURELIA_COMBAT102__.audit=()=>({...__v113Audit(),attackRate:__v102CombatRate({hostile:true}),attackFrequencyRelativeTo112:2,techniqueFraction:.3,normalFraction:.7,attackChoices:__v113Combat.choices,techniqueChoices:__v113Combat.techniques,aimPredictions:__v113Combat.leads});
