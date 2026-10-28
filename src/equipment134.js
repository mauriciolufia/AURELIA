/* One equipment model for combat, the character sheet, shops and saved games. */
const __v134Slots={weapon:'Arma',head:'Cabeza',body:'Torso',hands:'Manos',legs:'Piernas',feet:'Botas',shield:'Escudo'};
const __v134Levels=[1,10,20,30,40,50,55,60];
const __v134Names=['del Viajero','del Centinela','de Acero Real','del Guardián Arcano','del Soberano Astral','de la Aurora','del Serafín','de la Divinidad'];
const __v134Catalogue=new Map();
function __v134Rank(item){const n=item?__v105GearLevel(item):1;return n>=60?5:n>=50?4:n>=30?3:n>=20?2:n>=10?1:0;}
function __v134RegisterGear(){
 const types=[..._5k.filter(t=>t.slot==='weapon'),{id:'helm',name:'Yelmo',slot:'head'},{id:'cuirass',name:'Coraza',slot:'body'},{id:'gloves',name:'Guanteletes',slot:'hands'},{id:'greaves',name:'Grebas',slot:'legs'},{id:'boots',name:'Botas',slot:'feet'},{id:'shield',name:'Escudo',slot:'shield'}];
 for(const[levelIndex,level]of __v134Levels.entries())for(const type of types){
  const id='equipment134-'+type.id+'-'+level;if(_5l.some(i=>i.id===id))continue;
  const item={id,type:type.id,slot:type.slot,name:type.name+' '+__v134Names[levelIndex],tier:levelIndex+1,minLevel:level,catalogLevel87:level,requiredLevel87:level,city:1,__v134Gear:true,__v105Gear:true,price:Math.round(65+level*level*(type.slot==='weapon'?5:3)),color:['#ac9b83','#aeb8c4','#bbceda','#9795bf','#e7c17d','#fff0c5','#d6ecff','#fff4d8'][levelIndex],reach:type.slot==='weapon'?(type.reach||7):0};
  for(const stat of['atk','def'])Object.defineProperty(item,stat,{configurable:true,enumerable:true,get(){return __v105Scale.gear(level,this.slot)[stat];}});
  item.hp=type.slot==='body'?Math.round(__v105Scale.hero(level).maxHp*.05):type.slot==='legs'?Math.round(__v105Scale.hero(level).maxHp*.02):0;
  item.mp=['head','hands'].includes(type.slot)?Math.round(__v105Scale.mana(level)*(type.slot==='head'?.03:.02)):0;
  _5l.push(item);__v134Catalogue.set(id,item);
 }
 // Old greaves occupied the boot slot. Their IDs and attributes stay valid as boots.
 for(const item of _5l)if(item.slot==='feet')item.name=item.name.replace(/^Grebas\b/,'Botas');
}
__v134RegisterGear();
let __v134ItemCount=-1,__v134ItemIndex=new Map();
function __v134Equipped(){if(__v134ItemCount!==_5l.length){__v134ItemCount=_5l.length;__v134ItemIndex=new Map(_5l.map(i=>[i.id,i]));}return __v105Slots.map(slot=>{const i=__v134ItemIndex.get(rpg.equipped[slot]);return i&&i.slot===slot&&rpg.owned.has(i.id)&&__v105GearLevel(i)<=rpg.level?i:null;}).filter(Boolean);}
function __v134Stats(){
 const hero=__v105Scale.hero(rpg.level),items=__v134Equipped(),blessings=Object.values(__v75Save.blessings),factors={maxHp:1+blessings.filter(v=>v==='hp').length*.05,atk:1+blessings.filter(v=>v==='atk').length*.03,def:1+blessings.filter(v=>v==='def').length*.03,maxMp:1};
 const raw={...hero,maxMp:__v105Scale.mana(rpg.level)},bonuses={maxHp:0,atk:0,def:0,maxMp:0},base={},gear={},tech={},total={};
 for(const item of items){bonuses.maxHp+=item.hp||0;bonuses.maxMp+=item.mp||0;bonuses.atk+=item.atk||0;bonuses.def+=item.def||0;}
 for(const key of['maxHp','atk','def','maxMp']){
  const factor=key==='atk'&&rpg.buff>0?1+(rpg.buffPct||.2):key==='def'&&rpg.shield>0?1+(rpg.defPct||.2):1;
  base[key]=Math.round(raw[key]*factors[key]);const equipped=Math.round((raw[key]+bonuses[key])*factors[key]);
  gear[key]=equipped-base[key];total[key]=Math.round((raw[key]+bonuses[key])*factor*factors[key]);tech[key]=total[key]-equipped;
 }
 total.reach=items.find(i=>i.slot==='weapon')?.reach||2.3;
 return{base,gear,tech,total,items};
}
_g4=function(){return __v134Stats().total;};
const __v134Commerce=__v114Commerce;
__v114Commerce=function(...args){
 const result=__v134Commerce(...args),towns=_1h.flatMap((s,site)=>s.type==='ciudad'&&!s.hostile&&s.name!=='Nocteverde'?[{site,range:__v78Range(site)}]:[]);
 if(!towns.length)return result;
 const highest=towns.slice().sort((a,b)=>b.range.max-a.range.max)[0];
 for(const{site}of towns)__v78Stocks.set(site,(__v78Stocks.get(site)||[]).filter(i=>!i.__v134Gear));
 for(const item of __v134Catalogue.values()){
  const level=item.requiredLevel87,town=towns.find(t=>level>=t.range.min&&level<=t.range.max)||towns.slice().sort((a,b)=>Math.abs(a.range.max-level)-Math.abs(b.range.max-level))[0];
  const site=(level>highest.range.max?highest:town).site;item.city=site;item.minLevel=item.catalogLevel87=level;
  __v78GearHome.set(item.id,site);__v78GearReq.set(item.id,level);__v78Stocks.get(site).push(item);
 }
 for(const item of _5l)if(item.slot==='feet')item.name=item.name.replace(/^Grebas\b/,'Botas');
 return result;
};
function __v134Starter(){const id='equipment134-sword-1';rpg.owned.add(id);if(!rpg.equipped.weapon)rpg.equipped.weapon=id;}
const __v134Reset=_5v;_5v=function(...args){const r=__v134Reset(...args);__v134Starter();_8f();return r;};
const __v134Write=__v96WriteSave;__v96WriteSave=function(value){try{const s=JSON.parse(value);if(s&&s.seed&&s.equipped)s.equipment134={version:1};return __v134Write(JSON.stringify(s));}catch{return __v134Write(value);}};
const __v134Load=_dn;_dn=function(s,...args){
 const result=__v134Load(s,...args);if(s?.seed!==_f)return result;
 if(!s.equipment134&&!rpg.equipped.weapon)__v134Starter();
 for(const slot of Object.keys(rpg.equipped)){const item=_5l.find(i=>i.id===rpg.equipped[slot]);if(!item||item.slot!==slot||!rpg.owned.has(item.id)||__v105GearLevel(item)>rpg.level)delete rpg.equipped[slot];}
 __aureliaSyncAvatarGear(true);_8f();_fl();return result;
};
const __v134Equip=_7e;_7e=function(id){const i=_5l.find(i=>i.id===id);if(!i||!__v105Slots.includes(i.slot)||!rpg.owned.has(id)||__v105GearLevel(i)>rpg.level)return false;const r=__v134Equip(id);if(r){__aureliaSyncAvatarGear(true);if(i.slot==='hands')_8f();if(typeof __v134Refresh==='function')__v134Refresh();_iv();}return r;};
// The old inventory and merchant callbacks use this alias too.
_a5=_7e;
function __v134Unequip(slot){if(!__v105Slots.includes(slot)||!rpg.equipped[slot])return false;delete rpg.equipped[slot];__aureliaSyncAvatarGear(true);if(slot==='weapon'||slot==='hands')_8f();_fl();_9u();if(typeof __v134Refresh==='function')__v134Refresh();_iv();return true;}
window.__AURELIA_EQUIPMENT134__={stats:__v134Stats,equip:id=>_7e(id),unequip:__v134Unequip,slots:__v134Slots,catalog:()=>[...__v134Catalogue.values()].map(i=>({id:i.id,name:i.name,slot:i.slot,level:i.minLevel,city:i.city}))};
