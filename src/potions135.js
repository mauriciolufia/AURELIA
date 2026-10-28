/* Percentage recovery uses the current equipment-adjusted maximum, with no flat extra heal. */
const __v135Order=['hp','hpSuper','hpMega','hpUltra','mp','mpSuper','mpMega','mpUltra','panacea'];
const __v135={quick:{hp:'hp',mp:'mp'},vendors:null,vendorKey:null};
for(const[resource,names]of[['hp',['Poción','Súper poción','Mega poción','Ultra poción']],['mp',['Elixir','Súper elixir','Mega elixir','Ultra elixir']]]){
 for(const[index,suffix]of['','Super','Mega','Ultra'].entries()){
  const ratio=[.3,.5,.75,1][index],id=resource+suffix;
  _9j[id]={name:names[index],price:[20,200,750,2000][index],resource,ratio,detail:'Recupera el '+Math.round(ratio*100)+' % de tu '+(resource==='hp'?'salud máxima (HP).':'maná máximo (MP).')};
 }
}
function __v135Normalize(){for(const id of __v135Order)_9e[id]=Number.isFinite(_9e[id])?_18(Math.floor(_9e[id]),0,999):0;}
__v135Normalize();
function __v135Vendors(){
 const towns=_1h.flatMap((town,site)=>town.type==='ciudad'&&!town.hostile&&town.name!=='Nocteverde'?[{site,...__v78Range(site)}]:[]).sort((a,b)=>a.max-b.max||a.min-b.min||a.site-b.site),key=towns.map(t=>[t.site,t.min,t.max].join(':')).join('|');
 if(__v135.vendorKey===key&&__v135.vendors)return __v135.vendors;
 const result=new Map(),used=new Set(),n=towns.length,indices=[0,1,Math.floor((n-1)*.25),Math.floor((n-1)*.375),Math.floor((n-1)*.5),Math.floor((n-1)*.625),n-1,n-2];
 for(const[i,id]of['hp','mp','hpSuper','mpSuper','hpMega','mpMega','hpUltra','mpUltra'].entries()){
  let town=towns[Math.max(0,Math.min(n-1,indices[i]))];if(town&&used.has(town.site))town=towns.find(t=>!used.has(t.site))||town;
  if(town){result.set(id,town.site);used.add(town.site);}
 }
 __v135.vendorKey=key;return __v135.vendors=result;
}
function __v135Labels(){
 const wait=_9f>0?' · '+Math.ceil(_9f)+' s':'';
 for(const resource of['hp','mp']){const id=__v135.quick[resource],p=_9j[id],b=$(resource+'-item');__v114Text(b,p.name+' · '+(_9e[id]||0)+wait);b.disabled=!_u||!(_9e[id]>0)||_9f>0;b.setAttribute('aria-label',p.name+' · '+Math.round(p.ratio*100)+' % '+resource.toUpperCase()+' · Cantidad '+(_9e[id]||0));}
}
const __v135Use=_9r;
_9r=function(id){
 const p=_9j[id];if(!p?.resource){const r=__v135Use(id);if(r&&id==='panacea'){_9f=3;__v135Labels();_iv();}return r;}
 if(!_u||_74()||!(_9e[id]>0)||_9f>0)return false;
 const s=_g4(),hp=p.resource==='hp',maximum=hp?s.maxHp:s.maxMp,current=hp?_2l:rpg.mp;
 if(current>=maximum){_3a(hp?'Tu salud ya está completa.':'Tu maná ya está completo.');return false;}
 const next=Math.min(maximum,current+Math.round(maximum*p.ratio));
 _9e[id]--;_9f=3;if(hp)_2l=next;else rpg.mp=next;
 _6s('chime');_3a(p.name+' · +'+Math.round(next-current)+' '+(hp?'HP':'MP'));_fl();__v135Labels();_iv();return true;
};
_9s=function(id){
 const p=_9j[id];if(!_u||_6x!=='shop'||!p||!_1h[_6z]||_1h[_6z].hostile||p.resource&&__v135Vendors().get(id)!==_6z||rpg.gold<p.price||(_9e[id]||0)>=999)return false;
 rpg.gold-=p.price;_9e[id]=(_9e[id]||0)+1;_6s('coin');_9u();_fl();__v135Labels();_iv();return true;
};
function __v135Select(resource,id){if(!['hp','mp'].includes(resource)||_9j[id]?.resource!==resource)return false;__v135.quick[resource]=id;__v135Labels();_iv();return true;}
function __v135Quick(resource){const id=__v135.quick[resource];if(!(_9e[id]>0)){_3a('No tienes '+_9j[id].name.toLowerCase()+'. Cambia el objeto asignado en Inventario · Objetos.');return false;}if(_9f>0){_3a('Espera '+Math.ceil(_9f)+' s para usar otro objeto.');return false;}return _9r(id);}
$('hp-item').onclick=()=>__v135Quick('hp');$('mp-item').onclick=()=>__v135Quick('mp');
const __v135Key=window.__AURELIA76_KEY__;window.__AURELIA76_KEY__=function(e){
 const editing=e.target?.isContentEditable||/INPUT|SELECT|TEXTAREA/.test(e.target?.tagName),match=/^(?:Digit|Numpad)([89])$/.exec(e.code);
 if(_u&&!editing&&!e.ctrlKey&&!e.metaKey&&!e.altKey&&match&&!_74()){
  e.preventDefault();e.stopImmediatePropagation();if(!e.repeat)__v135Quick(match[1]==='8'?'hp':'mp');return;
 }
 return __v135Key(e);
};
const __v135HUD=_aa;_aa=function(...args){const r=__v135HUD(...args);if(_u)__v135Labels();return r;};
const __v135Items=_9u;_9u=function(...args){
 if(_6y!=='items'||!['inventory','shop'].includes(_6x))return __v135Items(...args);
 __v110OrderBar.hidden=true;__v114SellTab.hidden=_6x!=='shop';const list=$('item-list'),s=_g4();list.replaceChildren();
 $('panel-info').textContent='Oro '+rpg.gold+' · HP '+Math.ceil(_2l)+' / '+s.maxHp+' · MP '+__v114MPDisplay()+' / '+s.maxMp;
 $('panel-message').textContent='Normal 30 % · Súper 50 % · Mega 75 % · Ultra 100 %. Recarga: 3 s. 8: '+_9j[__v135.quick.hp].name+' · 9: '+_9j[__v135.quick.mp].name+' · 0: Panacea.';
 if(_6x==='inventory')for(const resource of['hp','mp']){
  const row=document.createElement('label');row.className='v135-quick';row.textContent=resource==='hp'?'Atajo 8 · salud':'Atajo 9 · maná';const select=document.createElement('select');select.id='ag-potion135-quick-'+resource;select.setAttribute('aria-label',row.textContent);
  for(const id of __v135Order.filter(id=>_9j[id]?.resource===resource)){const p=_9j[id];select.add(new Option(p.name+' · '+Math.round(p.ratio*100)+' % · '+(_9e[id]||0)+' en inventario',id));}
  select.value=__v135.quick[resource];select.onchange=()=>{__v135Select(resource,select.value);_9u();};row.append(select);list.append(row);
 }
 const vendors=__v135Vendors();for(const id of __v135Order){const p=_9j[id];if(!p)continue;const shop=_6x==='shop',site=vendors.get(id);if(shop&&p.resource&&site!==_6z)continue;const maximum=p.resource==='hp'?s.maxHp:s.maxMp,detail=p.detail+(p.ratio?' Recuperación: '+Math.round(maximum*p.ratio)+' '+p.resource.toUpperCase()+'.':'')+' Espera entre usos: 3 s.'+(!shop&&p.resource?' Tienda: '+(_1h[site]?.name||'sin proveedor')+' · '+p.price+' oro.':'');
  _7c(p.name+' · '+(_9e[id]||0)+' en la mochila',detail,shop?'Comprar · '+p.price+' oro':'Usar',()=>{if(shop)_9s(id);else{$('rpg-panel').hidden=true;if(_9r(id)){_fl();_iv();}}},shop?rpg.gold<p.price||(_9e[id]||0)>=999:!(_9e[id]>0)||_9f>0);
  const row=list.lastElementChild;row.dataset.potion135=id;row.setAttribute('aria-label',p.name);if(p.ratio)row.dataset.recovery135=String(p.ratio);
 }
};
const __v135Style=document.createElement('style');__v135Style.textContent='#aurelia-game .v135-quick{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin:8px 0 12px;font:600 13px system-ui;color:#dfd4b9}#aurelia-game .v135-quick select{box-sizing:border-box;flex:1 1 220px;min-width:0;max-width:100%;min-height:44px;padding:8px;border:1px solid #b6a474;border-radius:8px;background:#163643;color:#fff3d1;font:inherit}#aurelia-game [data-potion135="hpSuper"],#aurelia-game [data-potion135="mpSuper"]{border-color:#81bace}#aurelia-game [data-potion135="hpMega"],#aurelia-game [data-potion135="mpMega"]{border-color:#b794d8}#aurelia-game [data-potion135="hpUltra"],#aurelia-game [data-potion135="mpUltra"]{border-color:#d7b768}';document.head.append(__v135Style);
const __v135Save=_iv;_iv=function(...args){const r=__v135Save(...args);if(_u)try{const s=JSON.parse(__v96ReadSave());s.supplies={..._9e};s.potions135={version:1,quick:{...__v135.quick}};__v96WriteSave(JSON.stringify(s));}catch{}return r;};
const __v135Load=_dn;_dn=function(s,...args){const r=__v135Load(s,...args);if(s?.seed!==_f)return r;for(const id of['hpSuper','hpMega','hpUltra','mpSuper','mpMega','mpUltra'])_9e[id]=Number.isFinite(s.supplies?.[id])?_18(Math.floor(s.supplies[id]),0,999):0;__v135Normalize();for(const resource of['hp','mp']){const id=s.potions135?.quick?.[resource];__v135.quick[resource]=_9j[id]?.resource===resource?id:resource;}__v135Labels();return r;};
function __v135Reset(){for(const id of['hpSuper','hpMega','hpUltra','mpSuper','mpMega','mpUltra'])_9e[id]=0;__v135.quick={hp:'hp',mp:'mp'};__v135Normalize();}
const __v135New=_5v;_5v=function(...args){const r=__v135New(...args);__v135Reset();return r;};
const __v135Supplies=_9z;_9z=function(...args){const r=__v135Supplies(...args);__v135Reset();return r;};
window.__AURELIA_POTIONS135__={use:id=>_9r(id),buy:id=>_9s(id),select:__v135Select,quick:__v135Quick,audit:()=>({items:__v135Order.filter(id=>_9j[id]?.ratio).map(id=>({id,name:_9j[id].name,resource:_9j[id].resource,percent:Math.round(_9j[id].ratio*100),quantity:_9e[id],price:_9j[id].price,shop:_1h[__v135Vendors().get(id)]?.name,site:__v135Vendors().get(id)})),selected:{...__v135.quick},cooldown:_9f})};
