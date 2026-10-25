/* Shared costs and cooldowns for combat, support, travel and exploration spell objects. */
const __v119Mana={dirty:true,table:[],canonical:new Map(),cooldowns:new WeakSet(),timed:new WeakSet(),builds:0,supreme:new Set(__v87SupremeArts.map(s=>s[0]))};
function __v119TimedSpell(s){return ['buff','shield','haste','trapguard','divinelight','guidance','cartography','treasureSight','elementalBuff119'].includes(s.element)||['luz_divina','pasos_guia'].includes(s.id);}
function __v119ManaLevel(spell){const s=__v119Mana.canonical.get(spell.id)||spell;return __v119Mana.supreme.has(s.id)?60:__v105Scale.level(s.level);}
function __v119RebuildMana(){
 const all=[..._5n,...Object.values(__v88MapSpells)];__v119Mana.canonical=new Map(_5n.map(s=>[s.id,s]));
 const records=all.map(s=>{const state=__v114Mana.get(s),level=__v119ManaLevel(s);if(state)state.level119=level;return{level,raw:state?.base};});
 __v119Mana.table=__v119ManaPlan(records);__v119Mana.dirty=false;__v119Mana.builds++;
 const light=_5n.find(s=>s.id==='luz_divina'),label='☀ Luz Divina · '+__v119Mana.table[__v119ManaLevel(light)]+' MP';if(__v75Light.textContent!==label)__v75Light.textContent=label;
}
function __v119SpellCost(spell,state){
 const level=__v119ManaLevel(spell);if(__v119Mana.dirty||state.level119!==level)__v119RebuildMana();return __v119Mana.table[__v119ManaLevel(spell)];
}
function __v119Cooldown(spell){
 if(__v119TimedSpell(spell)&&!__v119Mana.timed.has(spell)){
  Object.defineProperty(spell,'duration',{configurable:true,enumerable:true,get(){return 900;},set(value){}});
  if(spell.element==='trapguard')Object.defineProperty(spell,'trapDuration',{configurable:true,enumerable:true,get(){return 900;},set(value){}});
  __v119Mana.timed.add(spell);
 }
 if(__v119Mana.cooldowns.has(spell))return;
 Object.defineProperty(spell,'cooldown',{configurable:true,enumerable:true,get(){return 2.5;},set(value){/* Legacy world recalibration cannot change the fixed cooldown. */}});
 __v119Mana.cooldowns.add(spell);
}
window.__AURELIA_MANA119__={audit:()=>{if(__v119Mana.dirty)__v119RebuildMana();return{minimum:15,maximum:500,previousCostMultiplier:3,cooldown:2.5,effectDuration:900,byLevel:__v119Mana.table.slice(1),heroMP:Array.from({length:60},(_,i)=>__v105Scale.mana(i+1)),spells:_5n.map(s=>({id:s.id,name:s.name,level:s.level,powerLevel:__v119ManaLevel(s),cost:s.cost,cooldown:s.cooldown,duration:__v119TimedSpell(s)?s.duration:null}))};}};
