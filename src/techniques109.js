/* Keep the actual combat kits, AI selection and late spawns consistent with the audited catalogue. */
const __v109Combat={changes:0,movement:.6,aggression:.6};
// Apply relative to v108's existing attack pacing. Keep perception and tactical thinking intact.
const __v109PreviousRate=__v102CombatRate;
__v102CombatRate=function(c){return __v109PreviousRate(c)*(c?.hostile?__v109Combat.aggression:1);};
function __v109MoveRate(c){return c?.hostile?__v109Combat.movement:1;}
const __v109HUD=_d8;_d8=function(...args){const r=__v109HUD(...args),e=$('enemy-threat');if(e)e.textContent=e.textContent.replace(' · Ritmo de ataque 40%',' · Ritmo de ataque reducido un 40%');return r;};
const __v109OldAudit=window.__AURELIA_COMBAT102__.audit;
window.__AURELIA_COMBAT102__.audit=()=>({...__v109OldAudit(),attackRate:__v102CombatRate({hostile:true}),attackIntervalMultiplier:1/__v102CombatRate({hostile:true}),enemyPoisonInterval:2/__v102CombatRate({hostile:true}),movementRelativeTo108:__v109Combat.movement,attackFrequencyRelativeTo108:__v109Combat.aggression});
function __v109Context(c){
 let role=null;if(c.boss==='azrakh')role='emperor';else if(c.__v88Raid)role='raid';else if(c===__v94Candy.boss)role='candyKing';else if(c===__v94Ice.boss)role='winterKing';
 const sideBoss=c===__v94Candy.boss||c===__v94Ice.boss||c===__v95North.king||c===__v95North.yeti||c===__v88Island.dragon||c===__v92Maya.boss;
 return{id:c.spec?.id||'unknown',name:c.name||c.spec?.name,spawnId:c.spawnId,level:c.level,biome:c.biome,boss:!!c.boss||sideBoss,spiked:!!c.__v102Guard,role};
}
function __v109Ensure(c){
 if(!c?.hostile||__v99Life.building||__v107WorldState.choosing)return;
 const context=__v109Context(c),inside=__v85Indoor(c),key=[context.id,context.level,context.role,context.boss,context.spiked,context.spawnId?.startsWith('polar95-')?'polar':context.spawnId?.startsWith('yeti95-')?'yeti':'',context.biome,inside].join('|');
 if(c.__v109Stamp===key&&c.__v68Skills===c.__v109Kit&&c.__v68Skills.includes(c.art))return;
 const plan=__v109Techniques.build(context),scale=inside&&!['emperor','raid'].includes(plan.family)?1/3:1;
 const kit=plan.skills.map(s=>({...s,range:s.range*scale,radius:s.radius*scale,v68:true,technique109:true,family109:plan.family,level109:plan.level}));
 if(c.specialAction)_d3(c);
 c.__v68Skills=kit;c.art=kit[0];c.__v109Kit=kit;c.__v109Stamp=key;c.__v109Family=plan.family;c.__v99Limited=kit;
 if(inside){c.__v85IndoorSkills=kit;c.__v85OutdoorSkills=kit.map(s=>({...s,range:s.range*3,radius:s.radius*3}));c.__v85IndoorTuned=true;}
 else{c.__v85IndoorSkills=null;c.__v85OutdoorSkills=kit;}
 const brain=__v98AI.enemy.get(c);if(brain){brain.skill=null;brain.skillAt=0;brain.role=kit.some(a=>a.type==='healAllies')?'support':kit.some(a=>a.type==='projectile')?'ranged':'melee';}
 __v109Combat.changes++;
}
__v99Limit=__v109Ensure;__v107Limit=__v109Ensure;
const __v109Cast=_d4;_d4=function(c){__v109Ensure(c);return __v109Cast(c);};
// Exterior projectiles previously lived for two seconds regardless of their stated range.
const __v109Release=_d5;_d5=function(c){const before=new Set(_ct),r=__v109Release(c);for(const p of _ct)if(!before.has(p)&&p.art?.technique109){p.remaining=p.art.range;p.life=Math.min(p.life,p.art.range/73.71+.1);}return r;};
const __v109World=_bj;_bj=function(...args){const r=__v109World(...args);for(const c of _m)__v109Ensure(c);return r;};
const __v109Load=_dn;_dn=function(s,...args){const r=__v109Load(s,...args);
 // Preserve the health proportion of pre-109 saves, once. Older legacy formats migrate in v105.
 if(s?.seed===_f&&s.balance105?.version===105&&!s.balance109){const blessings=Object.values(__v75Save.blessings).filter(v=>v==='hp').length,oldMax=Math.round(__v105Scale.curve(75,7500,rpg.level)*(1+blessings*.05));_2l=Math.round(Math.min(1,Math.max(0,(Number.isFinite(s.health)?s.health:oldMax)/oldMax))*_g4().maxHp);}
 for(const c of _m)__v109Ensure(c);return r;};
const __v109Save=_iv;_iv=function(...args){const r=__v109Save(...args);if(_u)try{const s=JSON.parse(__v96ReadSave());s.balance109={version:109,heroMultiplier:1.2};__v96WriteSave(JSON.stringify(s));}catch(e){}return r;};
const __v109Respawn=__v87RespawnBiome;__v87RespawnBiome=function(...args){const r=__v109Respawn(...args);for(const c of __v87Respawns.groups.get(args[0])||[])__v109Ensure(c);return r;};
window.__AURELIA_TECHNIQUES109__={audit:()=>{const groups=new Map();for(const c of _m.filter(c=>c.hostile)){const id=[c.spec.id,c.__v109Family,c.level,!!__v109Context(c).boss].join('|');if(!groups.has(id))groups.set(id,{species:c.spec.id,name:c.name||c.spec.name,family:c.__v109Family,level:c.level,boss:__v109Context(c).boss,enemies:0,skills:c.__v68Skills.map(s=>({name:s.name,id:s.id,type:s.type,element:s.element,status:s.status,power:s.power,range:s.range,radius:s.radius}))});groups.get(id).enemies++;}return{hostiles:_m.filter(c=>c.hostile).length,changes:__v109Combat.changes,groups:[...groups.values()]};}};
