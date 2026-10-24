/* Keep raw costs behind a single getter, including later regional recalibration. */
const __v114Mana=new WeakMap();
function __v114QuarterMana(){
 for(const spell of [..._5n,...Object.values(__v88MapSpells)]){
  if(__v114Mana.has(spell)||!Number.isFinite(spell.cost)||spell.cost<0)continue;
  const state={base:spell.cost};__v114Mana.set(spell,state);
  Object.defineProperty(spell,'cost',{configurable:true,enumerable:true,get(){return state.base/4;},set(value){if(Number.isFinite(value)&&value>=0)state.base=value;}});
 }
}
__v114QuarterMana();
__v75Light.textContent='☀ Luz Divina · '+_5n.find(s=>s.id==='luz_divina').cost+' MP';
function __v114MPDisplay(){return Math.floor(Math.max(0,rpg.mp)*4)/4;}
function __v114TeleportCost(){return _5n.find(s=>s.id==='teletransporte').cost;}
const __v114ManaWorld=_bj;_bj=function(...args){const r=__v114ManaWorld(...args);__v114QuarterMana();return r;};
const __v114ManaLoad=_dn;_dn=function(...args){const r=__v114ManaLoad(...args);__v114QuarterMana();return r;};
window.__AURELIA_MANA114__={audit:()=>({factor:.25,spells:_5n.length,teleport:__v114TeleportCost(),minimum:Math.min(..._5n.map(s=>s.cost)),maximum:Math.max(..._5n.map(s=>s.cost))})};
