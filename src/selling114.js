/* Selling never removes equipped gear; saved buyback stock makes accidental sales reversible. */
const __v114Sales=new Map(),__v114SellTab=document.createElement('button');__v114SellTab.id='ag-tab-sell114';__v114SellTab.type='button';__v114SellTab.textContent='Vender';__v114SellTab.hidden=true;$('panel-tabs').append(__v114SellTab);
function __v114SellPrice(item){return Math.floor(Math.max(0,Number(item.price)||0)*.75);}
function __v114Sell(id){
 const i=_5l.find(i=>i.id===id);if(_6x!=='shop'||!i||!__v105Slots.includes(i.slot)||!rpg.owned.has(id)||Object.values(rpg.equipped).includes(id))return false;
 const gold=__v114SellPrice(i);if(gold<=0)return false;rpg.owned.delete(id);rpg.gold+=gold;__v114Sales.set(id,{id,site:_6z,price:i.price});_9u();$('panel-message').textContent=i.name+' vendida · +'+gold+' oro (75%)';_6s('coin');_iv();_fl();return true;
}
function __v114BuyBack(id){
 const entry=__v114Sales.get(id),i=_5l.find(i=>i.id===id);if(_6x!=='shop'||!entry||entry.site!==_6z||!i||rpg.owned.has(id)||rpg.gold<entry.price)return false;
 rpg.gold-=entry.price;rpg.owned.add(id);__v114Sales.delete(id);_9u();$('panel-message').textContent=i.name+' recuperada.';_6s('coin');_iv();_fl();return true;
}
__v114SellTab.onclick=()=>{_6y='sell114';_9u();$('item-list').scrollTop=0;};
const __v114SalePanel=_9t;_9t=function(...args){const r=__v114SalePanel(...args);__v114SellTab.hidden=_6x!=='shop';return r;};
const __v114SaleRender=_9u;_9u=function(...args){
 __v114SellTab.hidden=_6x!=='shop';if(_6x!=='shop'||_6y!=='sell114')return __v114SaleRender(...args);
 $('item-list').replaceChildren();$('panel-info').textContent='Oro '+rpg.gold+' · Vende equipo sin equipar por el 75% de su precio.';$('panel-message').textContent='El equipo que llevas puesto se conserva. Puedes recomprar aquí lo vendido.';
 const unequipped=_5l.filter(i=>__v105Slots.includes(i.slot)&&rpg.owned.has(i.id)&&!Object.values(rpg.equipped).includes(i.id));
 if(!unequipped.length)_7c('Sin equipo para vender','Desequipa primero el arma o armadura que quieras vender.','Volver a comprar',()=>{$('tab-weapons').click();});
 for(const i of unequipped)__v110Card(i,i.name,'Nivel '+i.minLevel+' · '+(i.slot==='weapon'?'ATK +'+i.atk:'DEF +'+i.def)+' · Precio '+i.price+' oro','Vender · '+__v114SellPrice(i)+' oro',()=>__v114Sell(i.id),__v114SellPrice(i)<=0);
 for(const entry of __v114Sales.values())if(entry.site===_6z){const i=_5l.find(i=>i.id===entry.id);if(i)__v110Card(i,i.name,'Equipo vendido · recompra al precio original','Recomprar · '+entry.price+' oro',()=>__v114BuyBack(i.id),rpg.gold<entry.price);}
 __v110SortPanel();
};
const __v114SalesWrite=__v96WriteSave;__v96WriteSave=function(value){try{const s=JSON.parse(value);s.market114={version:1,buyback:[...__v114Sales.values()]};return __v114SalesWrite(JSON.stringify(s));}catch{return __v114SalesWrite(value);}};
const __v114SalesLoad=_dn;_dn=function(s,...args){const r=__v114SalesLoad(s,...args);__v114Sales.clear();for(const entry of Array.isArray(s?.market114?.buyback)?s.market114.buyback:[]){const i=_5l.find(i=>i.id===entry?.id);if(i&&Number.isInteger(entry.site)&&_1h[entry.site]&&!rpg.owned.has(i.id))__v114Sales.set(i.id,{id:i.id,site:entry.site,price:Math.max(0,Number(entry.price)||i.price)});}return r;};
const __v114SalesReset=_5v;_5v=function(...args){__v114Sales.clear();return __v114SalesReset(...args);};
window.__AURELIA_SELLING114__={audit:()=>({rate:.75,rounding:'floor',equippedProtected:true,buyback:__v114Sales.size})};
