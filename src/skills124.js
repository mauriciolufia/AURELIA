/* Explicit species support skills use simulation time, never wall-clock time. */
const __v124Raging=new Set();
function __v124Ira(c){c.__iraUntil124=__v68CombatTime+600;__v124Raging.add(c);__v87EnemyStats(c);}
const __v124Stats=__v87EnemyStats;__v87EnemyStats=function(c){const r=__v124Stats(c);if(c?.hostile&&c.__iraUntil124>__v68CombatTime)c.atk=c.damage=c.previousAtk=Math.round(c.atk*1.5);return r;};
const __v124Choose=__v68Choose;__v68Choose=function(c){
 const kit=c.__v68Skills||[],ready=__v68CombatTime>=(c.__v68SupportReady||0);
 const heal=kit.find(s=>s.healFraction124);if(heal&&ready&&c.hp<c.maxHp*.55&&(c.__v68Heals||0)<2)return heal;
 const ira=kit.find(s=>s.id==='ira124');if(ira&&ready&&!(c.__iraUntil124>__v68CombatTime))return ira;
 const chosen=__v124Choose(c);return chosen?.id==='ira124'&&c.__iraUntil124>__v68CombatTime?kit.find(s=>s.type==='projectile')||kit[0]:chosen;
};
const __v124SupportRelease=_d5;_d5=function(c){
 const a=c.specialAction,s=a?.art;if(!s||s.id!=='ira124'&&!s.healFraction124)return __v124SupportRelease(c);
 if(s.id==='ira124')__v124Ira(c);else if((c.__v68Heals||0)<2){c.hp=Math.min(c.maxHp,c.hp+c.maxHp*s.healFraction124);c.__v68Heals=(c.__v68Heals||0)+1;}
 c.__v68SupportReady=__v68CombatTime+8;_6s('magic');__v68Burst(c.g.position.clone().add(new _0.Vector3(0,1.5,0)),s.color,'buff',1.5,.6);if(a.rune)a.rune.m.opacity=.95;a.phase='fade';a.time=.7;
};
const __v124SkillTick=_d6;_d6=function(dt){const r=__v124SkillTick(dt);if(_u&&!_74())for(const c of __v124Raging)if(c.dead||c.__iraUntil124<=__v68CombatTime){c.__iraUntil124=0;__v124Raging.delete(c);__v87EnemyStats(c);}return r;};
// The Forjabrasa battle has its own action controller, but uses these same three arts.
const __v124RaidAttack=__v113RaidAttack;__v113RaidAttack=function(r){if(r.c.__v109Family!=='archdevil')return __v124RaidAttack(r);const choice=__v113RaidChoice(r);r.__v113Choice=null;if(choice==='normal')return'normal';return r.c.hp<r.c.maxHp*.55&&(r.c.__v68Heals||0)<2?'heal124':((r.__orb124=(r.__orb124||0)+1)%2?'shadow124':'fire124');};
function __v124RaidRelease(r,d){if(r.action.type==='heal124'){r.c.hp=Math.min(r.c.maxHp,r.c.hp+r.c.maxHp*.3);r.c.__v68Heals=(r.c.__v68Heals||0)+1;__v88Spark(r.c.g.position,'#96ead2',1.5);return;}const start=__v88War.projectiles.length;__v88Spit(r,d);for(const p of __v88War.projectiles.slice(start)){p.element124=r.action.type==='shadow124'?'shadow':'fire';p.power124=(r.c.__v68Skills||[]).find(s=>s.element===p.element124&&s.type==='projectile')?.power||1.4;}}
const __v124RaidFX=__v88FXTick;__v88FXTick=function(dt){const r=__v124RaidFX(dt),fx=__v88War.fx;if(fx){fx.flameMat.color.set('#ffffff');fx.coreMat.color.set('#ffffff');for(let i=0;i<fx.flame.count;i++)fx.flame.setColorAt(i,new _0.Color('#ff902f'));for(let i=0;i<fx.core.count;i++)fx.core.setColorAt(i,new _0.Color('#ffe4a2'));for(const [i,p]of __v88War.projectiles.entries()){if(i<48)fx.core.setColorAt(i,new _0.Color(p.element124==='shadow'?'#59308d':'#ffd079'));for(let j=0;j<3;j++)if(i*3+j<48)fx.flame.setColorAt(i*3+j,new _0.Color(p.element124==='shadow'?'#372146':'#ff813a'));}if(fx.core.instanceColor)fx.core.instanceColor.needsUpdate=true;if(fx.flame.instanceColor)fx.flame.instanceColor.needsUpdate=true;}return r;};
const __v124SkillSave=_iv;_iv=function(...args){const r=__v124SkillSave(...args);if(_u)try{const s=JSON.parse(__v96ReadSave());s.combat124={ira:[...__v124Raging].filter(c=>!c.dead&&c.spawnId&&c.__iraUntil124>__v68CombatTime).map(c=>({id:c.spawnId,remaining:Math.min(600,c.__iraUntil124-__v68CombatTime)}))};__v96WriteSave(JSON.stringify(s));}catch(e){}return r;};
const __v124SkillLoad=_dn;_dn=function(s,...args){for(const c of __v124Raging)c.__iraUntil124=0;__v124Raging.clear();const r=__v124SkillLoad(s,...args);if(s?.seed===_f){const byId=new Map(_m.map(c=>[c.spawnId,c]));for(const entry of s.combat124?.ira||[]){const c=byId.get(entry.id);if(c&&!c.dead&&c.__v109Family==='devourer'&&Number.isFinite(entry.remaining)&&entry.remaining>0){c.__iraUntil124=__v68CombatTime+Math.min(600,entry.remaining);__v124Raging.add(c);__v87EnemyStats(c);}}}return r;};

const __v124SkillWorld=_bj;_bj=function(...args){for(const c of __v124Raging)c.__iraUntil124=0;__v124Raging.clear();return __v124SkillWorld(...args);};
