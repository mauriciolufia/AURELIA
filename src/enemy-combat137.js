/* Archetype modifiers are applied from freshly computed stats, never compounded on reload. */
function __v137Role(c){return c?.hostile?__v137Roles.role(__v109Techniques.family(__v109Context(c))):'balanced';}
function __v137Profile(c){return __v137Roles.roles[__v137Role(c)];}
const __v137Stats=__v87EnemyStats;
__v87EnemyStats=function(c){
 const result=__v137Stats(c);if(!c?.hostile)return result;
 const p=__v137Profile(c),fraction=c.maxHp>0?c.hp/c.maxHp:1;
 c.__role137=__v137Role(c);c.maxHp=Math.max(1,Math.round(c.maxHp*p.hp));c.hp=c.dead?0:Math.max(fraction>0?1:0,Math.round(c.maxHp*fraction));
 const raging=c.__iraUntil124>__v68CombatTime,baseAttack=raging?Math.round(c.damage/1.5):c.damage,roleAttack=c.boss==='azrakh'?__v105Scale.enemyAttack.emperor:Math.max(1,Math.min(__v105Scale.enemyAttack.max,Math.round(baseAttack*p.atk)));
 c.atk=c.damage=c.previousAtk=raging?Math.round(roleAttack*1.5):roleAttack;
 c.__v87BaseDef=Math.max(1,Math.round(c.__v87BaseDef*p.def));c.def=Math.round(c.__v87BaseDef*(c.__v87DefTime>0?1.35:1));
 return result;
};
const __v137Move=__v109MoveRate;
__v109MoveRate=function(c){return __v137Move(c)*__v137Profile(c).speed;};
const __v137Schedule=__v68Schedule;
__v68Schedule=function(c){const r=__v137Schedule(c);c.__v68NextAction=__v68CombatTime+(c.__v68NextAction-__v68CombatTime)/__v137Profile(c).cadence;return r;};
function __v137Kit(c){
 const kit=c.__v68Skills;if(!kit?.length||c.__kit137===kit)return;
 const role=__v137Role(c),family=c.__v109Family,level=c.level,tier=__v119ElementLevels.filter(n=>n<=level).at(-1)||1;
 const inside=__v85Indoor(c),range=inside?12+level*.08:22+level*.16;
 const source=__v109Techniques.profiles[family]||[],count=level<=40?2:3;
 let skills=kit.map(s=>({...s,role137:role,tier137:tier,level137:level}));
 if(role==='assault'){
  skills=source.filter(s=>['charge','ring','projectile'].includes(s.type)).slice(0,count).map((s,i)=>({...kit[0],...s,range:s.type==='ring'?__v117MeleeReach(c):Math.max(__v117MeleeReach(c)+2,kit[0].range),radius:s.type==='ring'?__v117MeleeReach(c):kit[0].radius,power:Math.min(1.5,1.05+level/180+i*.06),windup:Math.max(.85,1.3-level*.005),color:kit[0].color,role137:role,tier137:tier,level137:level}));
  if(!skills.length)skills=kit.map(s=>({...s,windup:Math.max(.85,s.windup*.8)}));
 }else if(role==='tank'){
  const attack=skills.find(s=>s.power>0)||skills[0];
  const defense={...kit[0],id:'bastion137',name:level<=40?'Bastión y auxilio de aliados':'Bastión protector',type:'buffDefense',element:'earth',status:null,power:0,range:18,radius:12,windup:1.4,color:'#a8c9ff',mend137:level<=40,role137:role,tier137:tier,level137:level};
  const mend={...defense,id:'mend137',name:'Auxilio de aliados',type:'healAllies',mend137:true,color:'#91efb0'};
  skills=level<=40?[attack,defense]:[attack,defense,mend];
 }else if(['ranged','mage','afflicter'].includes(role)&&!['emperor','raid'].includes(family)){
  // Select the full species repertoire before its old two-skill truncation, so low-level
  // casters get two attacks rather than one attack and a generic guard.
  const attacks=source.filter(s=>!/^heal|buff|guard/.test(s.type));
  skills=Array.from({length:count},(_,i)=>{
   const s=source.find(s=>s.id===kit[i]?.id&&!/^heal|buff|guard/.test(s.type))||attacks[i%Math.max(1,attacks.length)]||kit[i%kit.length];
   let element=s.element||'physical',status=s.status;
   if(family==='medusa')status=i===0?'stone':'poison';
   if(family==='basilisk'&&s.type==='gaze')status='stone';
   if(element==='ice')status='freeze';
   if(element==='fire')status='burn';
   if(status==='dizzy')status='confusion';
   if(family==='mallow'){element='nature';status=i%2?'sleep':'poison';}
   if(family==='sphinx')status='sleep';
   status=__v137Roles.status(status,level)||(status?'slow':null);
   const school=element==='water'?'ice':__v119ElementNames[element]?element:'shadow';
   const spell=__v119Canonical.get(__v119Tier(school,level));
   return{...kit[i%kit.length],...s,type:s.type==='gaze'?'gaze':s.type==='pool'&&i>0?'pool':'projectile',element,status,range,radius:s.type==='pool'?2.3+level*.025:s.type==='gaze'?3:.75+level*.006,windup:Math.max(1,1.6-tier*.006),power:role==='mage'?Math.min(1.5,1+ tier/120):.8+tier/150,color:__v119Colors[element]||kit[0].color,name:s.name+(role==='mage'?' · '+spell.name:''),role137:role,tier137:tier,level137:level};
  });
  // Retain the signature recovery/rage of infernal species and royal support.
  const signature=kit.find(s=>s.healFraction124||s.id==='ira124'||s.type==='healAllies');
  if(signature)skills[Math.min(skills.length-1,kit.indexOf(signature))]={...signature,role137:role,tier137:tier,level137:level};
 }
 for(const s of skills){s.status=__v137Roles.status(s.status,level);s.technique109=true;s.v68=true;}
 c.__v68Skills=c.__v109Kit=c.__v99Limited=c.__kit137=skills;c.art=skills[0];
 c.__v85OutdoorSkills=inside?skills.map(s=>({...s,range:s.range*3,radius:s.radius*3})):skills;c.__v85IndoorSkills=inside?skills:null;
 const brain=__v98AI.enemy.get(c);if(brain){brain.role=['ranged','mage','afflicter'].includes(role)?'ranged':'melee';brain.skill=null;brain.skillAt=0;}
}
const __v137Ensure=__v109Ensure;
__v109Ensure=function(c){const r=__v137Ensure(c);if(c?.hostile&&!__v99Life.building&&!__v107WorldState.choosing)__v137Kit(c);return r;};
__v99Limit=__v109Ensure;__v107Limit=__v109Ensure;
const __v137Choose=__v68Choose;
__v68Choose=function(c){
 __v109Ensure(c);const kit=c.__v68Skills||[];
 if(kit.some(s=>s.healFraction124||s.id==='ira124'||s.type==='healAllies'&&__v137Role(c)!=='tank'))return __v137Choose(c);
 if(__v137Role(c)==='tank'&&__v68CombatTime>=(c.__v68SupportReady||0)){
  const hurt=__v68Allies(c,12).some(n=>n.hp<n.maxHp*.7&&(n.__v68Heals||0)<2);
  if(hurt){const mend=kit.find(s=>s.mend137);if(mend)return mend;}
  if(c.hp<c.maxHp*.8&&!(c.__v87DefTime>0))return kit.find(s=>s.type==='buffDefense')||kit[0];
 }
 if(['ranged','mage','afflicter','assault'].includes(__v137Role(c))){
  const attacks=kit.filter(s=>s.power>0);if(attacks.length)return attacks[(c.__v68Cursor||0)%attacks.length];
 }
 return __v137Choose(c);
};
const __v137Release=_d5;
_d5=function(c){
 const a=c.specialAction,s=a?.art;if(!s?.role137||!['buffDefense','healAllies'].includes(s.type))return __v137Release(c);
 if(__v119Disabled(c)||!__v92SameFloor(c)||__v85Indoor(c)&&!__v85CanEngage(c)){_d3(c);return;}
 if(s.type==='buffDefense'){c.__v87DefTime=8;c.def=Math.round(c.__v87BaseDef*1.35);__v68Burst(c.g.position,s.color,'buff',2,.7);}
 if(s.mend137){
  const amount=.12+.08*Math.min(60,c.level)/60;
  for(const n of[c,...__v68Allies(c,s.radius)])if(n.__v83Area===c.__v83Area&&n.hp<n.maxHp&&(n.__v68Heals||0)<2){n.hp=Math.min(n.maxHp,Math.round(n.hp+n.maxHp*amount));n.__v68Heals=(n.__v68Heals||0)+1;__v68Burst(n.g.position,'#91efb0','heal',1.5,.7);}
 }
 c.__v68SupportReady=__v68CombatTime+10;a.phase='fade';a.time=.7;a.rune.m.opacity=.9;_6s('magic');
};
function __v137Ranged(c){return ['ranged','mage','afflicter'].includes(__v137Role(c))&&!c.__v88Raid&&c.boss!=='azrakh';}
const __v137Decision=__v98EnemyDecision;
__v98EnemyDecision=function(c){
 const r=__v137Decision(c);
 if(!__v137Ranged(c)||c.dead||c.stun>0||__v119Disabled(c)||c.specialAction||['windup','recover'].includes(c.ai)||!__v118Slot(c)||!__v92LOS(c))return r;
 const b=__v98EnemyBrain(c),p=c.g.position,d=Math.hypot(p.x-_14.x,p.z-_14.z)||1,range=c.__v68Skills?.find(s=>s.type==='projectile')?.range||18,desired=Math.min(17,range*.72);
 const target=d<desired*.85?{x:p.x+(p.x-_14.x)/d*2.5,z:p.z+(p.z-_14.z)/d*2.5,mode:'keepDistance'}:d>range*.9?{x:_14.x+(p.x-_14.x)/d*desired,z:_14.z+(p.z-_14.z)/d*desired,mode:'keepDistance'}:{x:p.x,z:p.z,mode:'keepDistance'};
 if(__v97SafeTarget(c,target)){b.role='ranged';b.action='keepDistance';b.target=target;b.updated=__v98AI.clock;}return r;
};
// Basic ranged turns also launch physical projectiles; they never inflict an instant remote hit.
const __v137CombatFrame=_d6;
_d6=function(dt){
 if(_u&&!_74())for(const c of __v68Pool()){
  if(!__v137Ranged(c)||c.dead||__v119Disabled(c)||c.stun>0||c.specialAction||c.cooldown>0||['windup','recover'].includes(c.ai)||!__v118Slot(c))continue;
  __v109Ensure(c);const shot=c.__v68Skills?.find(s=>s.type==='projectile');if(!shot)continue;
  const p=c.g.position,d=Math.hypot(p.x-_14.x,p.z-_14.z);
  if(d<=__v117MeleeReach(c)||d>shot.range||!__v92LOS(c)||__v85Indoor(c)&&!__v85CanEngage(c)||__v70AttackChoice(c)!=='normal')continue;
  const art={...shot,id:'basic-shot137',name:'Disparo de '+(c.name||c.spec.name),type:'projectile',element:'physical',status:null,power:.85,windup:.9,normal137:true};
  c.specialAction={art,time:.9,phase:'windup',target:__v113Aim(c,art),rune:_d2(p.x,p.y,p.z,1.2,art.color),hit:false};c.ai='special';__v68Schedule(c);
 }
 return __v137CombatFrame(dt);
};
const __v137Incoming=_d0;
_d0=function(c,power=1,status=null){
 const native=['freeze','stone','confusion'].includes(status)?null:status,result=__v137Incoming(c,power,native);
 if(result&&status)__v137HeroAffect(status,c?.damage||0);return result;
};
function __v137Refresh(){for(const c of _m)if(c.hostile){__v87EnemyStats(c);__v109Ensure(c);}}
const __v137World=_bj;_bj=function(...args){const r=__v137World(...args);__v137Refresh();return r;};
const __v137Load=_dn;_dn=function(...args){const r=__v137Load(...args);__v137Refresh();return r;};
const __v137Info=_gl;_gl=function(c){__v137Info(c);$('panel-info').textContent+=' · '+__v137Profile(c).name;$('panel-message').textContent+=' · Rol: '+__v137Profile(c).name;};
window.__AURELIA_ROLES137__={audit:()=>({roles:__v137Roles.roles,enemies:_m.filter(c=>c.hostile).map(c=>({id:c.spawnId,species:c.spec.id,family:c.__v109Family,role:__v137Role(c),level:c.level,hp:c.maxHp,atk:c.damage,def:c.def,skills:c.__v68Skills?.map(s=>({id:s.id,name:s.name,type:s.type,status:s.status,tier:s.tier137}))}))})};
