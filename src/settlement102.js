/* Nocteverde remains occupied by its enemies; friendly human services live elsewhere. */
const __v102Nocteverde={removed:[],enemyCount:0};
function __v102RemoveNocteverde(){
 const site=_1h.findIndex(s=>s.name==='Nocteverde'),removed=new Set(_2h.filter(n=>!n.hostile&&(n.site===site||n.homeSite===site)));if(!removed.size)return;
 for(const n of removed){if(!__v102Nocteverde.removed.includes(n.id))__v102Nocteverde.removed.push(n.id);if(_2i===n)_2i=null;n.g?.removeFromParent();}
 for(let i=_b0.length-1;i>=0;i--)if(removed.has(_b0[i].owner)){_cq(_b0[i],false);_b0.splice(i,1);}
 _2h=_2h.filter(n=>!removed.has(n));__v78NightVendors.length=0;__v88Life.active=__v88Life.active.filter(n=>!removed.has(n));__v93.records=__v93.records.filter(r=>!removed.has(r.owner));
}
__v78NightMarket=function(){const site=_1h.findIndex(s=>s.name==='Nocteverde');if(!__v56Schools.has(site))__v56Schools.set(site,{site,name:'Artes de la Noche Serena',master:'Maestra Nerea',color:'#b19ad4',spells:[]});__v78NightVendors.length=0;__v102RemoveNocteverde();};
function __v102NightCommerce(){
 const night=_1h.findIndex(s=>s.name==='Nocteverde'),forge=_1h.findIndex(s=>s.name==='Forjabrasa'),stock=__v78Stocks.get(forge),school=__v56Schools.get(forge),oldSchool=__v56Schools.get(night);if(!stock||!school)return;
 for(const item of __v78Stocks.get(night)||[]){if(!stock.some(i=>i.id===item.id))stock.push(item);item.city=forge;__v78GearHome.set(item.id,forge);}
 __v78Stocks.set(night,[]);for(const id of oldSchool?.spells||[]){if(!school.spells.includes(id))school.spells.push(id);const homes=__v78SpellHomes.get(id)||[];__v78SpellHomes.set(id,[...new Set(homes.map(site=>site===night?forge:site))]);const req=__v78SpellReq.get(night+':'+id);if(req!==undefined)__v78SpellReq.set(forge+':'+id,req);}
 if(oldSchool)oldSchool.spells=[];for(const t of [..._7u,..._7v])if(t.site===forge)t.spells=[...school.spells];
}
const __v102Commerce=__v78AssignCommerce;__v78AssignCommerce=function(){const result=__v102Commerce();__v102NightCommerce();return result;};
const __v102SettlementWorld=_bj;_bj=function(...args){__v102Nocteverde.removed=[];const result=__v102SettlementWorld(...args);__v102RemoveNocteverde();__v102NightCommerce();const site=_1h.findIndex(s=>s.name==='Nocteverde');__v102Nocteverde.enemyCount=_m.filter(c=>c.hostile&&c.site===site).length;return result;};
window.__AURELIA_SETTLEMENT102__={audit:()=>({nocteverdeFriendlyHumans:_2h.filter(n=>!n.hostile&&(_1h[n.site]?.name==='Nocteverde'||_1h[n.homeSite]?.name==='Nocteverde')).length,removed:[...__v102Nocteverde.removed],equipmentAndSpells:'Forjabrasa'})};
