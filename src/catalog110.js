/* Sort visible catalogue copies, keeping item identities, callbacks and magic slots intact. */
const __v110Order={mode:'level',names:new Intl.Collator('es',{sensitivity:'base',numeric:true})};
try{if(localStorage.getItem('aurelia-catalog110')==='alpha')__v110Order.mode='alpha';}catch(e){}
function __v110Compare(a,b){
 const names=__v110Order.names.compare(a.name,b.name);
 return (__v110Order.mode==='level'?(a.minLevel??a.level??1)-(b.minLevel??b.level??1):names)||names||String(a.id).localeCompare(String(b.id));
}
function __v110OrderControl(id,text){
 const label=document.createElement('label');label.id=id;label.className='catalog-order110';label.textContent=text;
 const select=document.createElement('select');select.id=id+'-select';select.setAttribute('aria-label',text);
 select.add(new Option('Nivel: menor a mayor','level'));select.add(new Option('Alfabético: A–Z','alpha'));select.value=__v110Order.mode;
 select.onchange=()=>{__v110Order.mode=select.value==='alpha'?'alpha':'level';try{localStorage.setItem('aurelia-catalog110',__v110Order.mode);}catch(e){}if(!$('rpg-panel').hidden){_9u();$('item-list').scrollTop=0;}__v110SortPicker();};
 label.append(select);return label;
}
const __v110OrderBar=__v110OrderControl('ag-catalog-order','Ordenar por');
$('item-list').before(__v110OrderBar);__v110OrderBar.hidden=true;
const __v110OrderStyle=document.createElement('style');__v110OrderStyle.textContent='.catalog-order110{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin:10px 0;font:600 14px system-ui}.catalog-order110[hidden]{display:none}.catalog-order110 select{box-sizing:border-box;min-height:44px;max-width:100%;flex:1 1 180px;width:auto!important;padding:8px;font:inherit;color:#fff3ce;background:#163643;border:1px solid #d8c895;border-radius:8px}';document.head.append(__v110OrderStyle);
function __v110SortPanel(){
 const active=['inventory','shop','magic'].includes(_6x)&&['weapon','armor','magic','spellBook76','sell114'].includes(_6y);
 __v110OrderBar.hidden=!active;if(!active)return;
 __v110OrderBar.querySelector('select').value=__v110Order.mode;
 const list=$('item-list'),rows=[...list.children].filter(row=>row.classList.contains('item-row')).map(row=>({row,item:row.__v110Item})).filter(p=>p.item);
 // Move existing nodes instead of rebuilding them, preserving their actions and disabled states.
 const markers=rows.map(({row,item})=>{row.dataset.catalogId110=item.id;row.dataset.catalogLevel110=item.minLevel??item.level??1;const marker=document.createComment('catalogue position');row.replaceWith(marker);return marker;});
 rows.sort((a,b)=>__v110Compare(a.item,b.item));markers.forEach((marker,i)=>marker.replaceWith(rows[i].row));
 for(const select of list.querySelectorAll('.v76-slot select')){
  const value=select.value,options=[...select.options],empty=options.filter(o=>!o.value),known=options.filter(o=>o.value),byId=new Map(_5n.map(s=>[s.id,s]));
  known.sort((a,b)=>__v110Compare(byId.get(a.value),byId.get(b.value)));select.replaceChildren(...empty,...known);select.value=value;
 }
}
// Some different items share a display name; retain the actual object at card creation.
function __v110Card(item,...args){const r=_7c(...args),row=$('item-list').lastElementChild;if(row)row.__v110Item={id:item.id,name:item.name,minLevel:item.minLevel??item.level??1};return r;}
const __v110CatalogueRender=_9u;_9u=function(...args){const context=_6x+'|'+_6y,changed=__v110Order.context!==context;__v110Order.context=context;const r=__v110CatalogueRender(...args);__v110SortPanel();if(changed)$('item-list').scrollTop=0;return r;};
// Other RPG panels share the list: hide the order control until their own renderer opts in.
const __v110Panel=_9t;_9t=function(...args){__v110OrderBar.hidden=true;return __v110Panel(...args);};
function __v110SortPicker(){
 const tray=$('mobile-picker');if(!tray||tray.hidden||!tray.querySelector('button[id^="ag-choose-"]'))return;
 let control=document.getElementById('ag-mobile-catalog-order');if(!control){control=__v110OrderControl('ag-mobile-catalog-order','Ordenar magias por');tray.querySelector('h2')?.after(control);}control.querySelector('select').value=__v110Order.mode;
 const byId=new Map(_5n.map(s=>[s.id,s])),buttons=[...tray.querySelectorAll('button[id^="ag-choose-"]')];buttons.sort((a,b)=>__v110Compare(byId.get(a.id.slice('ag-choose-'.length)),byId.get(b.id.slice('ag-choose-'.length))));control.after(...buttons);
}
const __v110Picker=$('mobile-picker');if(__v110Picker)new MutationObserver(__v110SortPicker).observe(__v110Picker,{attributes:true,attributeFilter:['hidden']});
