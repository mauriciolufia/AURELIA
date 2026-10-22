/* New combat scale, with four simultaneous armor pieces and stable, per-item levels. */
function __v105Damage(atk,def){return __v105Scale.damage(atk,def);}
__v87Base=__v105Scale.hero;
const __v105Slots=['weapon','head','body','feet','shield'];
function __v105GearLevel(i){return __v105Scale.level(i.requiredLevel87||__v78GearReq.get(i.id)||i.minLevel);}
function __v105Gear(){
 for(let j=0;j<_5l.length;j++){
  let i=_5l[j];i.minLevel=i.catalogLevel87=__v105GearLevel(i);if(i.__v105Gear)continue;
  if(!Object.getOwnPropertyDescriptor(i,'atk')?.configurable||!Object.getOwnPropertyDescriptor(i,'def')?.configurable){
   const old=i;i={...old};_5l[j]=i;
   for(const stock of __v78Stocks.values()){const at=stock.indexOf(old);if(at>=0)stock[at]=i;}
  }
  // Legacy gloves become an alternative body piece; owned IDs remain usable, with no fifth bonus.
  if(i.slot==='hands'){i.slot='body';i.__v105LegacyGloves=true;}
  Object.defineProperty(i,'atk',{configurable:true,enumerable:true,get(){return __v105Scale.gear(__v105GearLevel(this),this.slot).atk;}});
  Object.defineProperty(i,'def',{configurable:true,enumerable:true,get(){return __v105Scale.gear(__v105GearLevel(this),this.slot).def;}});
  i.__v105Gear=true;
 }
}
function __v105MigrateEquipment(){
 const e=rpg.equipped;if(e.hands&&!e.body)e.body=e.hands;delete e.hands;
 for(const slot of Object.keys(e))if(!__v105Slots.includes(slot))delete e[slot];
}
_g4=function(){
 const b=__v105Scale.hero(rpg.level),e=rpg.equipped,v=Object.values(__v75Save.blessings),items=[];
 for(const slot of __v105Slots){const i=_5l.find(i=>i.id===e[slot]&&i.slot===slot);if(i&&i.minLevel<=rpg.level)items.push(i);}
 const w=items.find(i=>i.slot==='weapon');
 return{maxHp:Math.round(b.maxHp*(1+v.filter(s=>s==='hp').length*.05)),
  atk:Math.round((b.atk+(w?.atk||0))*(rpg.buff>0?1+(rpg.buffPct||.2):1)*(1+v.filter(s=>s==='atk').length*.03)),
  def:Math.round((b.def+items.reduce((n,i)=>n+i.def,0))*(rpg.shield>0?1+(rpg.defPct||.2):1)*(1+v.filter(s=>s==='def').length*.03)),
  maxMp:65+(__v105Scale.level(rpg.level)-1)*9,reach:w?.reach||10};
};
__v87Reference=function(level){const b=__v105Scale.hero(level);return{level:__v105Scale.level(level),...b,armor:[]};};
__v87EnemyStats=function(c){
 if(!c?.hostile)return;
 const fraction=c.maxHp>0?Math.max(0,Math.min(1,c.hp/c.maxHp)):1;
 const id=c.boss==='azrakh'?'supreme_emperor':c.spec?.id||c.id||'unknown';
 const rank=c.boss?'boss':c.elite||c.questElite?'elite':'normal',s=__v105Scale.enemy(c.level,id,rank);
 c.maxHp=s.maxHp;c.hp=c.dead?0:Math.max(fraction>0?1:0,Math.round(s.maxHp*fraction));
 c.atk=c.damage=c.previousAtk=s.atk;c.def=c.__v87BaseDef=s.def;
 if(c.__v87DefTime>0)c.def=Math.round(s.def*1.35);
 if(c.boss){
  const offensive=s=>Number.isFinite(s?.power)&&s.power>0&&!/heal|guard|buff/i.test(s.type||'');
  const copies=new Map();for(const key of ['__v68Skills','__v85IndoorSkills','__v85OutdoorSkills']){
   const kit=c[key];if(!kit?.some(offensive))continue;if(copies.has(kit)){c[key]=copies.get(kit);continue;}
   const max=Math.max(...kit.filter(offensive).map(s=>s.power));
   c[key]=kit.map(s=>offensive(s)?{...s,power:s.power===max?1.5:Math.min(1.4,s.power)}:s);copies.set(kit,c[key]);
  }
  if(offensive(c.art)){const named=c.__v68Skills?.find(s=>s.name===c.art.name);c.art=named||{...c.art,power:1.5};}
 }
 c.__v87Reference=__v87Reference(c.level);c.__v87Balanced=true;c.__v92StatsApplied=true;c.__v92OriginalHP=s.maxHp;c.__v105Level=c.level;
};
__v87HeroDamage=function(c,amount,kind){
 let damage=__v105Damage(amount,(c.def||1)*(c.guardTime>0?2.5:1));
 if(c.__v87BarrierTime>0&&c.__v87BarrierHP>0){const absorbed=Math.min(damage,c.__v87BarrierHP);c.__v87BarrierHP-=absorbed;damage-=absorbed;if(c.__v87BarrierHP<=0)c.__v87BarrierTime=0;}
 return damage;
};
__v87EnemyDamage=function(c,power=1){return __v105Damage(c.damage*power,_g4().def);};
// Levels affect actual attributes, never an additional hidden incoming damage multiplier.
_cz=function(c,amount,kind='physical'){if(c.dead)return;_c8(c,amount,kind);if(c.dead&&c.specialAction)_d3(c);};
function __v105Spells(){
 for(const s of _5n){
  if(!(__v58Offensive.has(s.element)&&s.range>0))continue;
  // Supreme elemental techniques have level 60 power, and keep their level 55 learning requirement.
  s.__v105PowerLevel=__v87SupremeArts.some(a=>a[0]===s.id)?60:__v105Scale.level(s.level);
  Object.defineProperty(s,'power',{configurable:true,enumerable:true,get(){return __v105Scale.magic(__v87SupremeArts.some(a=>a[0]===this.id)?60:this.level);}});
  s.__v105Balanced=true;
 }
 __v92.calibration={formula:'(poder elemental / DEF) × 8',minPower:8,maxPower:70000,version:105};
}
const __v105OldSpellBalance=__v92BalanceSpells;
__v92BalanceSpells=function(){__v105OldSpellBalance();__v105Spells();};
function __v105Refresh(){__v105Gear();__v105MigrateEquipment();for(const c of _m)if(c.hostile)__v87EnemyStats(c);__v105Spells();}
// Model registration also covers creatures spawned after initial world generation.
const __v105Register=_cp;_cp=function(owner,...args){if(owner?.hostile)__v87EnemyStats(owner);return __v105Register(owner,...args);};
const __v105Think=_d4;_d4=function(c,...args){if(c?.hostile&&c.__v105Level!==c.level)__v87EnemyStats(c);return __v105Think(c,...args);};
const __v105World=_bj;_bj=function(...args){const result=__v105World(...args);__v105Refresh();_2l=_g4().maxHp;return result;};
const __v105Reset=_5v;_5v=function(...args){const r=__v105Reset(...args);__v105MigrateEquipment();_2l=_g4().maxHp;return r;};
const __v105Load=_dn;_dn=function(s){
 if(s?.equipped?.hands){s={...s,equipped:{...s.equipped}};if(!s.equipped.body)s.equipped.body=s.equipped.hands;delete s.equipped.hands;}
 const result=__v105Load(s);if(s?.seed!==_f)return result;
 __v105Refresh();
 if(s.balance105?.version===105){_2l=Math.min(_g4().maxHp,Math.max(0,_2l));}
 else{const oldMax=130*Math.pow(1.10,Math.max(0,rpg.level-1))*(1+Object.values(__v75Save.blessings).filter(v=>v==='hp').length*.05);_2l=Math.max(0,Math.min(_g4().maxHp,Math.round((Number.isFinite(s.health)?s.health:oldMax)/Math.round(oldMax)*_g4().maxHp)));}
 return result;
};
const __v105Save=_iv;_iv=function(...args){const r=__v105Save(...args);if(_u)try{const s=JSON.parse(__v96ReadSave());s.balance105={version:105};__v96WriteSave(JSON.stringify(s));}catch(e){}return r;};
const __v105Fighter=__v88MakeFighter;
__v88MakeFighter=function(n,index,p){
 const d=__v105Fighter(n,index,p),level=45+index%4,s=__v105Scale.enemy(level,'forjabrasa-defender-'+index,'elite');
 Object.assign(d,{level,atk:s.atk,def:s.def,hp:s.maxHp,maxHp:s.maxHp});Object.assign(n,{level,atk:s.atk,damage:s.atk,def:s.def,hp:s.maxHp,maxHp:s.maxHp});return d;
};
const __v105HitNPC=__v88HitNPC;
__v88HitNPC=function(d,power,source){if(!d)return;const damage=__v105Damage((source?.c?.damage||source?.damage||0)*power,d.def);const r=__v105HitNPC(d,damage,source);d.n.hp=d.hp;return r;};
__v105Gear();__v105Spells();
window.__AURELIA_BALANCE105__={hero:__v105Scale.hero,standard:__v105Scale.standard,enemy:__v105Scale.enemy,gear:__v105Scale.gear,magic:__v105Scale.magic,damage:__v105Damage,variation:__v105Scale.variation,slots:__v105Slots};
