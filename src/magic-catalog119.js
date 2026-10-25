/* A finite, level-based spellbook. Legacy learned IDs migrate before save validation. */
const __v119ElementLevels=[1,5,10,20,30,40,50,55,60],__v119SupportLevels=[1,10,20,40,60];
const __v119ElementNames={
 fire:['Ascua','Llama','Lanza ígnea','Incendio','Infierno','Erupción solar','Meteoro carmesí','Sol del apocalipsis','Génesis ígnea'],
 ice:['Escarcha','Aguja de hielo','Lanza glacial','Ráfaga polar','Ventisca','Prisión boreal','Cero absoluto','Invierno eterno','Edad del hielo'],
 storm:['Chispa','Descarga','Rayo certero','Tormenta','Tempestad','Juicio del trueno','Furia celeste','Cataclismo eléctrico','Juicio del firmamento'],
 wind:['Brisa cortante','Ráfaga','Filo del vendaval','Torbellino','Huracán','Ciclón celeste','Tifón ancestral','Ojo del mundo','Viento primordial'],
 earth:['Guijarro rúnico','Púa de roca','Lanza pétrea','Fractura','Terremoto','Furia tectónica','Ruptura continental','Corazón del mundo','Renacer de la tierra'],
 nature:['Espina','Zarza','Lanza de raíces','Enredadera','Bosque voraz','Furia silvestre','Juicio del bosque','Juicio de Gaia','Ira de la creación'],
 light:['Destello','Haz del alba','Lanza radiante','Nova de luz','Aurora','Juicio solar','Alba soberana','Apoteosis luminosa','Juicio divino'],
 shadow:['Sombra','Orbe sombrío','Lanza umbría','Noche voraz','Eclipse','Abismo','Ruina de las estrellas','Eclipse eterno','Fin de las estrellas']
};
const __v119Colors={fire:'#ff994a',ice:'#95e5ff',storm:'#c8b4ff',wind:'#b9f4de',earth:'#dfb77f',nature:'#91e27d',light:'#fff2ae',shadow:'#ca8ce9'};
const __v119Legacy=new Map(_5n.filter(s=>s.element==='heal'||s.element==='buff'||s.element==='shield'||__v58Offensive.has(s.element)&&s.range>0).map(s=>[s.id,{element:s.element,level:s.level}]));
// These are the learning levels of the last published support catalogue.
for(const[id,level]of Object.entries({cura:1,sanar:4,renovar:42,barrera:2,aegis:44,fuerza:5,vigor:1,valor:15,furia:28,poder:40,apoteosis:55,muralla:12,baluarte:26,bastion:38,guardia_ligera:1}))if(__v119Legacy.has(id))__v119Legacy.get(id).level=level;
for(const[id]of __v87SupremeArts)if(__v119Legacy.has(id))__v119Legacy.get(id).level=60;
const __v119Support=new Map(),__v119Canonical=new Map();
for(const[element,ids,values,label]of[
 ['heal',['cura','sanar','curacion_iii119','renovar','curacion_v119'],[100,300,500,1500,9999],'Curación'],
 ['buff',['fuerza','valor','furia','poder','apoteosis'],[.15,.40,.65,1,1.5],'Poder'],
 ['shield',['guardia_ligera','muralla','baluarte','bastion','aegis'],[.15,.40,.65,1,1.5],'Protección']
])for(let i=0;i<5;i++){
 const id=ids[i],level=__v119SupportLevels[i],data={id,element,level,value:values[i]},existing=_5n.findIndex(s=>s.id===id);
 // Native balance getters have no setter; convert the retained catalogue record before assigning.
 if(existing>=0)_5n[existing]={..._5n[existing]};
 const spell=__v56AddSpell({id,name:label+' '+['I','II','III','IV','V'][i],element,level,cost:10+level*2,power:element==='heal'?values[i]:0,percent:element==='heal'?undefined:values[i],range:0,price:Math.round(80+level*level*1.3),cooldown:2.5,color:element==='heal'?'#8cffb2':element==='buff'?'#ffe9ad':'#e7cf91',duration:900,support119:true});
 __v119Support.set(id,data);__v119Canonical.set(id,spell);
 const name=spell.name;Object.defineProperty(spell,'name',{configurable:true,enumerable:true,get(){return name;},set(value){}});
 Object.defineProperty(spell,'level',{configurable:true,enumerable:true,get(){return level;},set(value){}});
 if(element!=='heal')Object.defineProperty(spell,'percent',{configurable:true,enumerable:true,get(){return values[i];},set(value){}});
}
function __v119ElementSpell(element,level){
 const i=__v119ElementLevels.indexOf(level);if(i<0)throw Error('Nivel elemental fuera del catálogo.');
 return{id:'elemental114-'+element+'-'+level,name:__v119ElementNames[element][i],element,level,cost:Math.round(8+__v105Scale.mana(level)*.045),power:__v105Scale.magic(level),range:12+level*.3,price:Math.round(70+level*45+level*level*1.3),cooldown:2.5,color:__v119Colors[element],elemental114:true,elemental119:true,area119:level>=30,areaRadius119:level>=30?Math.min(5.4,2+level*.06):0};
}
for(const element of __v58Offensive)for(const level of __v119ElementLevels){
 const s=__v56AddSpell(__v119ElementSpell(element,level));__v119Canonical.set(s.id,s);
 const name=s.name;Object.defineProperty(s,'name',{configurable:true,enumerable:true,get(){return name;},set(value){}});
 Object.defineProperty(s,'level',{configurable:true,enumerable:true,get(){return level;},set(value){}});
}
const __v119Removed=_5n.filter(s=>(s.element==='heal'||s.element==='buff'||s.element==='shield'||__v58Offensive.has(s.element)&&s.range>0)&&!__v119Canonical.has(s.id));
for(const s of __v119Removed)_5n.splice(_5n.indexOf(s),1);
function __v119Tier(element,level){
 const levels=__v58Offensive.has(element)?__v119ElementLevels:__v119SupportLevels,target=levels.filter(n=>n<=level).at(-1)||1;
 return __v58Offensive.has(element)?'elemental114-'+element+'-'+target:[...__v119Support.values()].find(s=>s.element===element&&s.level===target)?.id;
}
function __v119SpellID(id,legacy=false){
 if(!id)return id;if(!legacy&&_5n.some(s=>s.id===id))return id;
 const old=__v119Legacy.get(id);if(old)return __v119Tier(old.element,old.level)||id;
 const elemental=/^elemental114-(fire|ice|storm|wind|earth|nature|light|shadow)-(\d+)$/.exec(id);if(elemental)return __v119Tier(elemental[1],Number(elemental[2]));
 const regional=/^apoyo114-(\d+)-([0-6])$/.exec(id);
 if(regional){const i=Number(regional[2]),element=['heal','heal','shield','buff','haste','shield','shield'][i];if(element==='haste')return id;const range=__v78Range(Number(regional[1])),level=range.min+Math.round((range.max-range.min)*i/6);return __v119Tier(element,level);}
 return id;
}
function __v119Known(){
 rpg.known=[...new Set(rpg.known.map(id=>__v119SpellID(id)).filter(id=>_5n.some(s=>s.id===id)))];rpg.spell=__v119SpellID(rpg.spell);
 if(__v76Save?.slots)__v76Save.slots=__v76Save.slots.map(id=>__v119SpellID(id));
}
function __v119HealHP(s){return __v119Support.get(s.id)?.value||Math.max(0,Number(s.power)||0);}
function __v119ElementPower(s){return Math.round(__v105Scale.magic(s.level)*(rpg.elementalBoost119>0?1.5:1));}
function __v119SupportPower(){for(const[id,data]of __v119Support){const s=__v119Canonical.get(id);Object.defineProperty(s,'power',{configurable:true,enumerable:true,get(){return data.element==='heal'?data.value:0;}});}}
const __v119BalanceSpells=__v105Spells;__v105Spells=function(...args){const r=__v119BalanceSpells(...args);__v119SupportPower();return r;};
__v105Spells();
function __v119Schools(){
 const valid=new Set(_5n.map(s=>s.id));
 for(const[site,school]of __v56Schools){
  const ids=new Set(school.spells.map(id=>__v119SpellID(id)).filter(id=>valid.has(id)&&!__v119Canonical.get(id)?.reward119)),range=__v78Range(site),town=_1h[site];
  if(town&&!town.hostile){
   const tiers=new Set([1,...__v119ElementLevels.filter(n=>n<=range.max).slice(-2)]),supportTiers=new Set([1,...__v119SupportLevels.filter(n=>n<=range.max).slice(-2)]);
   for(const s of __v119Canonical.values())if(!s.reward119&&s.level<=range.max&&(s.status119||school.master114||(s.elemental119?tiers:supportTiers).has(s.level)))ids.add(s.id);
  }
  school.spells=[...ids];
  for(const id of ids)if(__v119Canonical.has(id))__v78SpellReq.set(site+':'+id,__v119Canonical.get(id).level);
  for(const t of[..._7u,..._7v])if(t.site===site)t.spells=[...ids];
 }
 for(const[id]of __v78SpellHomes)if(!valid.has(id))__v78SpellHomes.delete(id);
 for(const s of __v119Canonical.values())__v78SpellHomes.set(s.id,[...__v56Schools].filter(([site,school])=>school.spells.includes(s.id)).map(([site])=>site));
}
const __v119SpellInfo=__v75SpellInfo;__v75SpellInfo=function(s){
 const data=__v119Support.get(s.id);if(data)return data.element==='heal'?'Recupera '+data.value+' HP, hasta tu vida máxima.':(data.element==='buff'?'ATK':'DEF')+' +'+Math.round(data.value*100)+'% durante 15 minutos.';
 if(s.elemental119)return 'Poder elemental '+s.power+' · '+_fw(s.element)+' · Alcance '+s.range+' m'+(s.area119?' · Área '+s.areaRadius119.toFixed(1)+' m':' · Un objetivo')+(['ice','nature'].includes(s.element)?' · Inmovilización breve; los jefes la resisten mejor.':'');
 return __v119SpellInfo(s);
};
const __v119CatalogCast=_gd;_gd=function(...args){__v119Known();return __v119CatalogCast(...args);};
const __v119CatalogMenu=_9u;_9u=function(...args){__v119Known();return __v119CatalogMenu(...args);};
const __v119CatalogLoad=_dn;_dn=function(s,...args){
 if(s?.seed===_f){const legacy=s.magicCatalog119!==119,map=id=>__v119SpellID(id,legacy);s={...s,known:[...new Set((s.known||[]).map(map))],spell:map(s.spell),adventure76:s.adventure76?{...s.adventure76,slots:(s.adventure76.slots||[]).map(map)}:s.adventure76};}
 const r=__v119CatalogLoad(s,...args);__v119Known();__v119Schools();return r;
};
const __v119CatalogSave=_iv;_iv=function(...args){__v119Known();const r=__v119CatalogSave(...args);if(_u&&!_72)try{const s=JSON.parse(__v96ReadSave());if(s){s.magicCatalog119=119;__v96WriteSave(JSON.stringify(s));}}catch(e){}return r;};
window.__AURELIA_MAGIC119__={audit:()=>({elementLevels:[...__v119ElementLevels],supportLevels:[...__v119SupportLevels],elemental:_5n.filter(s=>s.elemental119).map(s=>({id:s.id,name:s.name,level:s.level,element:s.element,power:s.power,range:s.range,cost:s.cost,cooldown:s.cooldown,area:s.areaRadius119})),healing:_5n.filter(s=>s.element==='heal').map(s=>({id:s.id,level:s.level,hp:s.power})),attack:_5n.filter(s=>s.element==='buff').map(s=>({id:s.id,level:s.level,percent:s.percent})),defense:_5n.filter(s=>s.element==='shield').map(s=>({id:s.id,level:s.level,percent:s.percent}))})};
