/* Stable regional items and complete five-level elemental progression. Existing saves keep their IDs. */
const __v114Market={gear:new Map(),spells:new Map(),elements:[...__v58Offensive],tiers:[1,...Array.from({length:12},(_,i)=>(i+1)*5)]};
const __v114ElementNames={fire:'Fuego',ice:'Hielo',storm:'Rayo',wind:'Viento',earth:'Tierra',nature:'Naturaleza',light:'Luz',shadow:'Sombra'};
const __v114ElementColors={fire:'#ff994a',ice:'#95e5ff',storm:'#c8b4ff',wind:'#b9f4de',earth:'#dfb77f',nature:'#91e27d',light:'#fff2ae',shadow:'#ca8ce9'};
function __v114AddSpell(spell){let s=_5n.find(s=>s.id===spell.id);if(!s){s=spell;_5n.push(s);}__v114Market.spells.set(s.id,s);return s;}
for(const level of __v114Market.tiers)for(const element of __v114Market.elements){
 const grade=level===1?'Inicial':String(level/5),id='elemental114-'+element+'-'+level;
 const s=__v114AddSpell({id,name:__v114ElementNames[element]+' · Grado '+grade,element,level,cost:Math.round(8+__v105Scale.mana(level)*.045),power:__v105Scale.magic(level),range:12+level*.3,price:Math.round(70+level*45+level*level*1.3),cooldown:1.1+level*.008,color:__v114ElementColors[element],elemental114:true});
 Object.defineProperty(s,'power',{configurable:true,enumerable:true,get(){return __v105Scale.magic(this.level);}});s.__v105Balanced=true;
}
function __v114CreateGear(site,slot,index){
 const range=__v78Range(site),n=slot==='weapon'?15:16,level=Math.round(range.min+(range.max-range.min)*index/(n-1)),base=slot==='weapon'?_5k.filter(t=>t.slot==='weapon')[index%5]:_5k.find(t=>t.slot===slot),id='regional114-'+site+'-'+slot+'-'+index;
 let item=_5l.find(i=>i.id===id);const adjective=['del Alba','de Guardia','del Camino','de Maestría'][Math.floor(index/(slot==='weapon'?5:4))%4];
 if(!item){item={id,name:base.name+' '+adjective+' de '+_1h[site].name,type:base.id,slot,tier:Math.max(1,Math.ceil(level/8)),city:site,minLevel:level,catalogLevel87:level,price:Math.round(60+level*level*(slot==='weapon'?5:3)+index*13),color:__v114ElementColors[__v114Market.elements[site%8]],reach:base.reach||0,__v114Level:level,__v114Site:site,__v114Index:index,__v105Gear:true};
  Object.defineProperty(item,'atk',{configurable:true,enumerable:true,get(){return __v105Scale.gear(this.__v114Level,this.slot).atk;}});Object.defineProperty(item,'def',{configurable:true,enumerable:true,get(){return __v105Scale.gear(this.__v114Level,this.slot).def;}});_5l.push(item);
 }
 item.__v114Name??=item.name;__v114Market.gear.set(id,item);return item;
}
function __v114RegionalCatalog(){
 for(let site=0;site<_1h.length;site++){const town=_1h[site];if(town.type!=='ciudad'||town.hostile||town.name==='Nocteverde')continue;
  for(let i=0;i<15;i++)__v114CreateGear(site,'weapon',i);
  for(let i=0;i<16;i++)__v114CreateGear(site,['head','body','feet','shield'][i%4],i);
  const range=__v78Range(site),templates=['cura','sanar','guardia_ligera','fuerza','celeridad','barrera','aegis'];
  for(let i=0;i<7;i++){const t=_5n.find(s=>s.id===templates[i]),level=range.min+Math.round((range.max-range.min)*i/6),id='apoyo114-'+site+'-'+i;
   const s=__v114AddSpell({...t,id,name:t.name+' de '+town.name,level,cost:Math.round(8+__v105Scale.mana(level)*.04),price:Math.round(70+level*level*1.2+i*30),regional114:site,range:0});
   if(s.element==='heal')Object.defineProperty(s,'power',{configurable:true,enumerable:true,get(){return Math.max(1,Math.round(__v105Scale.hero(rpg.level).maxHp*(i===0?.22:.38))-rpg.level*4);}});
  }
 }
}
// Register before the initial save is read, so purchased regional IDs validate on a new visit.
__v114RegionalCatalog();
function __v114Commerce(){
 for(const[site,stock]of __v78Stocks)__v78Stocks.set(site,stock.filter(i=>!__v114Market.gear.has(i.id)));
 const towns=_1h.map((s,site)=>({s,site})).filter(({s})=>s.type==='ciudad'&&!s.hostile&&s.name!=='Nocteverde'),highest=towns.slice().sort((a,b)=>__v78Range(b.site).max-__v78Range(a.site).max)[0]?.site;
 for(const{s:town,site}of towns){
  const range=__v78Range(site),stock=__v78Stocks.get(site)||[];
  for(const spell of __v114Market.spells.values())if(spell.regional114===site){const index=Number(spell.id.split('-').at(-1));spell.level=range.min+Math.round((range.max-range.min)*index/6);spell.cost=Math.round(8+__v105Scale.mana(spell.level)*.04);spell.price=Math.round(70+spell.level*spell.level*1.2+index*30);}
  for(const item of __v114Market.gear.values())if(item.__v114Site===site){item.__v114Level=Math.round(range.min+(range.max-range.min)*item.__v114Index/(item.slot==='weapon'?14:15));item.price=Math.round(60+item.__v114Level**2*(item.slot==='weapon'?5:3)+item.__v114Index*13);item.city=site;item.name=item.__v114Name;item.minLevel=item.catalogLevel87=item.__v114Level;__v78GearReq.set(item.id,item.__v114Level);__v78GearHome.set(item.id,site);stock.push(item);}__v78Stocks.set(site,stock);
  const school=__v56Schools.get(site);if(!school)continue;const spells=new Set(school.spells);
  for(const s of __v114Market.spells.values())if(s.regional114===site||s.elemental114&&(s.level>=range.min&&s.level<=range.max||site===highest&&s.level>=range.min)){
   spells.add(s.id);__v78SpellReq.set(site+':'+s.id,s.level);const homes=__v78SpellHomes.get(s.id)||[];if(!homes.includes(site))__v78SpellHomes.set(s.id,[...homes,site]);
  }
  school.spells=[...spells];school.master114=site===highest;
  for(const t of [..._7u,..._7v])if(t.site===site)t.spells=[...school.spells];
 }
}
const __v114BalancedRefresh=__v111Refresh;__v111Refresh=function(...args){__v114Commerce();return __v114BalancedRefresh(...args);};
const __v114OldCommerce=__v87Commerce;__v87Commerce=function(...args){const r=__v114OldCommerce(...args);__v114Commerce();return r;};
const __v114CommerceWorld=_bj;_bj=function(...args){const r=__v114CommerceWorld(...args);__v114Commerce();return r;};
const __v114CommerceLoad=_dn;_dn=function(...args){const r=__v114CommerceLoad(...args);__v114Commerce();return r;};
window.__AURELIA_COMMERCE114__={audit:()=>({elements:[...__v114Market.elements],tiers:[...__v114Market.tiers],newGear:__v114Market.gear.size,newSpells:__v114Market.spells.size,towns:_1h.flatMap((s,site)=>{if(s.type!=='ciudad'||s.hostile||s.name==='Nocteverde')return[];const stock=__v78Stocks.get(site)||[],magic=__v56Schools.get(site)?.spells||[];return[{site,name:s.name,range:__v78Range(site),weapons:stock.filter(i=>i.slot==='weapon').length,armor:stock.filter(i=>i.slot!=='weapon').length,magic:magic.length,master:!!__v56Schools.get(site)?.master114}];})})};
