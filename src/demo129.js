/* Contextual demo travel follows the runtime floor lists rather than a fixed pair of Eclipse buttons. */
const __v129={groups:null,context:null,buttons:new Map()};
function __v129Groups(){
 if(__v129.groups)return __v129.groups;
 const groups=[],used=new Set();
 function add(id,name,floors){const list=[...new Set(floors||[])].filter(a=>a&&__v83.areas.includes(a));if(list.length<2||list.every(a=>used.has(a)))return;groups.push({id,name,floors:list});list.forEach(a=>used.add(a));}
 add('eclipse','Trono del Eclipse',__v88Eclipse.areas);
 for(const t of __v94.towers||[])add(t.id,t.name,t.areas);
 add('sun',__v102Solar.name,__v102Solar.areas);add('jade','Pirámide de Jade',__v92Maya.areas);
 add('cave','Caverna volcánica',__v103.areas);
 // Additional connected multi-floor plans join the menu without needing another fixed list.
 const unseen=new Set(__v83.areas.filter(a=>!used.has(a)));
 while(unseen.size){const first=unseen.values().next().value,component=[first];unseen.delete(first);for(let i=0;i<component.length;i++){const a=component[i],keys=new Set((a.plan95?.stairs||[]).flatMap(s=>[s.lower,s.upper]));for(const b of unseen)if(keys.has(b.key)||(b.plan95?.stairs||[]).some(s=>s.lower===a.key||s.upper===a.key)){unseen.delete(b);component.push(b);}}component.sort((a,b)=>a.y-b.y);add(first.key,first.name.replace(/\s*·\s*(Planta|Nivel)\s*\d+.*/i,''),component);}
 __v129.groups=groups;return groups;
}
function __v129Context(){if(!_u||!__v85Demo.active)return null;const a=__v75At(),feet=_14.y-1.85;if(!a||feet<a.y-1.1||feet>=a.y+(a.ceilingHeight88||(a.plan103?8:12)))return null;const group=__v129Groups().find(g=>g.floors.includes(a));return group?{group,area:a}:null;}
function __v129Landing(a){
 const seeds=a.plan103?[a.plan103.point(a.plan103.source),...a.plan103.rooms.map(r=>a.plan103.point(r.cell))].map(p=>({x:a.x+p.x,z:a.z+p.z})): [a.entry,...a.design.centers.map(p=>__v83Point(a,p))].filter(Boolean);
 const safe=(x,z)=>__v75At(x,z,a.y)===a&&__v83Walkable(a,x,z,.55)&&!_i7(x,z,a.y+1.85)&&!(a.traps||[]).some(t=>Math.abs(x-t.x)<t.w/2+1&&Math.abs(z-t.z)<t.d/2+1)&&!(a.hazards||[]).some(t=>Math.abs(x-a.x-t.x)<(t.w||t.radius*2||2)/2+1&&Math.abs(z-a.z-t.z)<(t.d||t.radius*2||2)/2+1)&&!a.members.some(c=>!c.dead&&Math.hypot(c.g.position.x-x,c.g.position.z-z)<2.5);
 for(const seed of seeds)for(let ring=0;ring<9;ring++)for(let k=0;k<(ring?12:1);k++){const x=seed.x+Math.cos(k*Math.PI/6)*ring*1.5,z=seed.z+Math.sin(k*Math.PI/6)*ring*1.5;if(safe(x,z))return{x,y:a.y,z};}return null;
}
function __v129Go(key){
 const context=__v129Context(),a=context?.group.floors.find(a=>a.key===key);if(!a)return false;const p=__v129Landing(a);if(!p){_3a('No hay un punto de llegada libre en esta planta.');return false;}
 _dp(false);__v118SlotsClear();__v94EmperorClear();_14.set(p.x,p.y+1.85,p.z);_12=0;_13=true;_v=false;_9d=null;__v75.area=a;__v75.grace=2;_b3.set(Infinity,Infinity);__v68Local.source=null;__v93.poolBase=null;__v93.areaCache=null;__v123Refresh(true);_bg(true);_bl();__v81OrientCamera();__v93Visibility();_75();__v64EndLook();__v65ReleaseJoy();__v91DemoButtons();__v87Cursor();_iv();_3a('Modo demo · '+context.group.name+' · Planta '+(context.group.floors.indexOf(a)+1));return true;
}
__v91DemoButtons=function(){
 const context=__v129Context(),row=__v91DemoRow;row.hidden=!context;row.style.display=context?'flex':'none';if(!context)return;
 const signature=context.group.floors.map(a=>a.key).join('|');
 if(__v129.context!==signature){__v129.context=signature;__v129.buttons.clear();row.replaceChildren();const heading=document.createElement('strong');heading.textContent='Modo demo · '+context.group.name;heading.style.cssText='flex-basis:100%;font-size:14px';row.append(heading);
  for(const[i,a]of context.group.floors.entries()){const button=document.createElement('button');button.type='button';button.id=context.group.id==='eclipse'?'ag-eclipse-demo-'+i:'ag-demo-floor-'+a.key;button.dataset.demoFloor=a.key;button.style.cssText='flex:1 1 120px;min-height:44px;padding:10px;border:1px solid #bf9ad3;background:#392c49;color:#fff;border-radius:8px;font:inherit';button.onclick=()=>__v129Go(a.key);row.append(button);__v129.buttons.set(a.key,{button,index:i});}
 }
 for(const[key,{button,index}]of __v129.buttons){const current=context.area.key===key,text='Planta '+(index+1)+(current?' · actual':'');if(button.textContent!==text)button.textContent=text;if(current)button.setAttribute('aria-current','location');else button.removeAttribute('aria-current');}
};
__v91DemoFloor=function(index){return __v129Go(__v88Eclipse.areas[index]?.key);};
window.__AURELIA_ECLIPSE91__.go=index=>__v91DemoFloor(index);
const __v129World=_bj;_bj=function(...args){__v129.groups=null;__v129.context=null;const r=__v129World(...args);__v129.groups=null;__v91DemoButtons();return r;};
const __v129Load=_dn;_dn=function(...args){const r=__v129Load(...args);__v129.groups=null;__v91DemoButtons();return r;};
window.__AURELIA_DEMO129__={groups:()=>__v129Groups().map(g=>({id:g.id,name:g.name,floors:g.floors.map(a=>a.key)})),go:__v129Go};
__v91DemoButtons();
