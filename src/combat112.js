/* Faster hostile attacks and prompt visual recognition; movement, geometry and strategy stay shared. */
__v109Combat.aggression*=2;
const __v112Combat={awareness:new WeakMap(),alerts:0,checks:0};
const __v112Damage=__v87EnemyDamage;
__v87EnemyDamage=function(c,power=1){const damage=__v112Damage(c,power);return c?.hostile?Math.round(damage*1.5):damage;};
const __v112HitNPC=__v88HitNPC;__v88HitNPC=function(d,power,source){return __v112HitNPC(d,power*((source?.c||source)?.hostile?1.5:1),source);};
const __v112Detect=__v92Detect;__v92Detect=function(c){return __v112Detect(c)*(c?.hostile?1.2:1);};
__v85EnemySight=function(c,d){
 if(!c?.hostile||c.dead)return false;
 const now=__v68CombatTime,p=c.g.position,b=__v98EnemyBrain(c);let s=__v112Combat.awareness.get(c);
 if(!s){s={at:-Infinity,seen:-Infinity,visible:false,px:Infinity,pz:Infinity,cx:Infinity,cz:Infinity,y:Infinity,alerted:false};__v112Combat.awareness.set(c,s);}
 if(now>=s.at||Math.hypot(_14.x-s.px,_14.z-s.pz)>1||Math.hypot(p.x-s.cx,p.z-s.cz)>1||Math.abs(_14.y-s.y)>.5){
  s.visible=d<__v92Detect(c)&&__v92LOS(c);s.at=now+.1;s.px=_14.x;s.pz=_14.z;s.cx=p.x;s.cz=p.z;s.y=_14.y;__v112Combat.checks++;
 }
 if(s.visible){
  if(!s.alerted&&!c.specialAction&&!['windup','recover'].includes(c.ai)&&!(c.stun>0)){
   c.cooldown=Math.min(c.cooldown||0,.35);c.__v68NextAction=Math.min(c.__v68NextAction||0,now+.35);b.next=0;b.skillAt=0;s.alerted=true;__v112Combat.alerts++;
  }
  c.__v54Aggro=true;s.seen=now;b.lastSeen={x:_14.x,z:_14.z};b.seenAt=__v98AI.clock;return true;
 }
 return now-s.seen<3&&d<__v92Detect(c)&&__v92SameFloor(c);
};
function __v112Offensive(c){return(c.__v68Skills||[]).filter(s=>s.power>0&&!/^heal|buff|guard/.test(s.type));}
const __v112Choose=__v68Choose;__v68Choose=function(c){
 const chosen=__v112Choose(c);if(!c?.hostile||!chosen||!/^heal|buff|guard/.test(chosen.type)||c.hp<c.maxHp*.5)return chosen;
 const canHeal=/^heal/.test(chosen.type)&&((c.hp<c.maxHp*.55&&(c.__v68Heals||0)<2)||(chosen.type==='healAllies'&&__v68Allies(c,chosen.radius||18).some(a=>a.hp<a.maxHp*.55&&(a.__v68Heals||0)<2)));
 if(canHeal)return chosen;
 const d=Math.hypot(c.g.position.x-_14.x,c.g.position.z-_14.z),skills=__v112Offensive(c);
 return skills.filter(s=>d<=(s.type==='ring'?Math.min(s.range,s.radius):s.range)).sort((a,b)=>b.range-a.range)[0]||skills.sort((a,b)=>b.range-a.range)[0]||chosen;
};
const __v112Choice=__v70AttackChoice;__v70AttackChoice=function(c){
 const result=__v112Choice(c);if(!c?.hostile||c.dead||c.specialAction||c.stun>0||c.cooldown>0||['windup','recover'].includes(c.ai)||__v68CombatTime<(c.__v68NextAction||0)||!__v92LOS(c))return result;
 const d=Math.hypot(c.g.position.x-_14.x,c.g.position.z-_14.z);if(d>=__v92Detect(c))return result;
 const art=__v68Choose(c);if(art)c.art=art;
 if(art&&art.power>0&&c.specialCooldown<=0&&d<=(art.type==='ring'?Math.min(art.range,art.radius):art.range)&&d>__v98Reach(c))return c.__v70AttackChoice='special';
 if(d<=__v98Reach(c)&&(!art||art.power===0&&c.hp>=c.maxHp*.5))return c.__v70AttackChoice='normal';
 return result;
};
const __v112Decision=__v98EnemyDecision;__v98EnemyDecision=function(c){
 const r=__v112Decision(c),b=__v98EnemyBrain(c),s=__v112Combat.awareness.get(c);
 if(!s?.visible)return r;b.next=Math.min(b.next,__v98AI.clock+.16+(b.slot%3)*.02);
 if(['ranged','support'].includes(b.role)&&b.action==='keepDistance'&&c.hp>=c.maxHp*.3){
  const arts=__v112Offensive(c),range=Math.max(0,...arts.map(a=>a.type==='ring'?Math.min(a.range,a.radius):a.range)),p=c.g.position,d=Math.hypot(p.x-_14.x,p.z-_14.z);
  if(range>0&&d>range*.85){const distance=range*.7,target={x:_14.x+(p.x-_14.x)/(d||1)*distance,z:_14.z+(p.z-_14.z)/(d||1)*distance,mode:'pursue'};if(__v97SafeTarget(c,target)){b.action='pursue';b.target=target;}}
 }
 return r;
};
const __v112World=_bj;_bj=function(...args){__v112Combat.awareness=new WeakMap();return __v112World(...args);};
const __v112HUD=_d8;_d8=function(...args){const r=__v112HUD(...args),e=$('enemy-threat');if(e)e.textContent=e.textContent.replace('Ritmo de ataque reducido un 40%','Ritmo de ataque ×2');return r;};
const __v112Audit=window.__AURELIA_COMBAT102__.audit;window.__AURELIA_COMBAT102__.audit=()=>({...__v112Audit(),damagePerHitMultiplier:1.5,attackFrequencyRelativeTo111:2,enemyDamageMultiplier:1.5,alerts:__v112Combat.alerts,sightChecks:__v112Combat.checks});
