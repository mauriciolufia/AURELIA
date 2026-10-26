/* Travellers share road itineraries; residents keep their existing daily controller. */
const __v120Travel={npcs:[],groups:[],towns:[],graph:new Map(),paths:new Map(),day:0,lastHour:null,clock:0,next:0,source:null,errors:[],routes:0};
function __v120Forbidden(x,z){const s=__v120Travel.forge;return __v108Infernal(x,z)||!!s&&Math.hypot(x-s.x,z-s.z)<s.radius+18;}
function __v120Night(hour=_x){return hour>=18||hour<6;}
function __v120Key(p){return p.x.toFixed(2)+','+p.z.toFixed(2);}
function __v120Roads(){
 const v=__v120Travel;v.graph.clear();v.paths.clear();
 const node=p=>{const k=__v120Key(p);if(!v.graph.has(k))v.graph.set(k,{...p,key:k,edges:[]});return v.graph.get(k);};
 for(const line of _1q){for(let i=1;i<line.length;i++){const p={x:line[i-1][0],z:line[i-1][1]},q={x:line[i][0],z:line[i][1]},d=Math.hypot(q.x-p.x,q.z-p.z);let safe=true;for(let j=0;j<=Math.ceil(d/6);j++){const t=j/Math.max(1,Math.ceil(d/6));if(__v120Forbidden(p.x+(q.x-p.x)*t,p.z+(q.z-p.z)*t)){safe=false;break;}}if(!safe)continue;const a=node(p),b=node(q);a.edges.push({to:b.key,d});b.edges.push({to:a.key,d});}}
 for(const town of v.towns){const s=_1h[town.site];town.node=[...v.graph.values()].sort((a,b)=>Math.hypot(a.x-s.x-5.5,a.z-s.z)-Math.hypot(b.x-s.x-5.5,b.z-s.z))[0]?.key;}
}
function __v120RoadPath(from,to){
 const v=__v120Travel,key=from+':'+to;if(v.paths.has(key))return v.paths.get(key);
 const a=v.towns.find(t=>t.site===from),b=v.towns.find(t=>t.site===to),open=new Set([a.node]),cost=new Map([[a.node,0]]),came=new Map();
 while(open.size){let k=null;for(const n of open)if(k===null||cost.get(n)<cost.get(k))k=n;open.delete(k);if(k===b.node){const path=[];for(let n=k;n;n=came.get(n)){const p=v.graph.get(n);path.push({x:p.x,z:p.z});}path.reverse();v.paths.set(key,path);return path;}for(const e of v.graph.get(k).edges){const d=cost.get(k)+e.d;if(d<(cost.get(e.to)??Infinity)){cost.set(e.to,d);came.set(e.to,k);open.add(e.to);}}}
 v.errors.push('Sin camino entre '+_1h[from].name+' y '+_1h[to].name);return null;
}
function __v120Track(points){let length=0;return{points:points.map((p,i)=>{if(i)length+=Math.hypot(p.x-points[i-1].x,p.z-points[i-1].z);return{...p,d:length};}),length};}
function __v120At(track,d){d=Math.max(0,Math.min(track.length,d));const ps=track.points;let lo=1,hi=ps.length-1;while(lo<hi){const m=(lo+hi)>>1;if(ps[m].d<d)lo=m+1;else hi=m;}const b=ps[lo]||ps[0],a=ps[lo-1]||b,t=(d-a.d)/(b.d-a.d||1);return{x:a.x+(b.x-a.x)*t,z:a.z+(b.z-a.z)*t};}
function __v120Free(n,p){const y=__v101Ground(n,p.x,p.z,p.y??n.homeY,false,true);return y===null||__v120Forbidden(p.x,p.z)?null:{x:p.x,z:p.z,y};}
function __v120Plazas(town){
 const s=_1h[town.site],n=__v120Travel.npcs[0],points=__v88TownPoints(town.site).points.filter(p=>Math.hypot(p.x-s.x,p.z-s.z)<48&&!__v101Life.homes.some(h=>__v101Inside(h,p,-1))),centres=[];
 for(const p of points.sort((a,b)=>Math.hypot(a.x-s.x,a.z-s.z-18)-Math.hypot(b.x-s.x,b.z-s.z-18))){if(centres.some(c=>Math.hypot(c.x-p.x,c.z-p.z)<10))continue;const trio=[];for(let i=0;i<3;i++){const a=i*Math.PI*2/3,q=__v120Free(n,{x:p.x+Math.cos(a)*1.7,z:p.z+Math.sin(a)*1.7,y:p.y});if(!q||trio.some(o=>Math.hypot(o.x-q.x,o.z-q.z)<1.8))break;trio.push(q);}if(trio.length===3){centres.push({...p,trio});if(centres.length===2)break;}}
 town.plazas=centres;if(centres.length!==2)__v120Travel.errors.push('Faltan grupos de plaza en '+s.name);
}
function __v120Bind(n,town,slot){
 const a=n.__v101,old=a.home,h=town.inn;if(old!==h){old.members=old.members.filter(o=>o!==n);}if(!h.members.includes(n))h.members.push(n);
 a.home=n.home=h;n.site=n.homeSite=town.site;const bed=town.beds[slot%town.beds.length];a.bed=bed?__v101Station(n,bed):null;if(bed)bed.owner=n.id;
 const seats=town.seats;a.dining=seats.length?__v101Station(n,seats[slot%seats.length]):null;
 a.nav={x:h.x,z:h.z,w:5000,d:5000,cos:1,sin:0,y:n.homeY,house:false,anchor:{x:h.x,z:h.z}};n.__v99Area=a.nav;
}
function __v120Dialog(n,advance=false){
 const r=n.__v120;if(!r)return n.dialogue||'Estoy preparando mi siguiente viaje.';if(advance)r.story++;
 const g=r.group,origin=_1h[g.from].name,destination=_1h[g.to].name,place=_1h[n.site].name,stories={
 'Puerto del Sur':['sal, conchas pulidas y cartas de navegación','Un marinero del Puerto del Sur me enseñó a leer el viento mirando las cintas de los mástiles. Dice que una vela remendada cuenta más historias que una nueva.'],
 'Floravalle':['semillas de flores, miel y telas bordadas','En Floravalle intercambian semillas en vez de discutir de quién es el jardín más bonito. Traigo unas para la ventana de una posada.'],
 'Valdoria':['libros, hierbas del bosque y tinta','Una encuadernadora de Valdoria encontró notas de tres viajeros distintos en el mismo margen. Ahora conserva los libros usados como si fueran mapas de vidas.'],
 'Vado del Sol':['especias, mosaicos y mapas del desierto','En Vado del Sol un sabio compara armas y armaduras antes de recomendarte nada. Yo le llevé un mapa manchado de arena: resultó más útil que mi espada.'],
 'Selvaria':['frutas de la selva, fibras y remedios de plantas','En Selvaria aprendí a esperar después de la lluvia: el sonido de las hojas te avisa de qué senderos siguen anegados. No todo atajo ahorra tiempo.'],
 'Brumaclara':['lana, resina y provisiones para el frío','Una costurera de Brumaclara me cosió un bolsillo dentro del abrigo para guardar las cartas secas. Desde entonces entrego mensajes incluso bajo la nieve.'],
 'Auroramar':['cristales tallados, pescado salado y amuletos','Los artesanos de Auroramar giran sus cristales hacia la aurora antes de pulirlos. Llevé uno al sur y un niño pensó que había guardado un trozo del cielo.'],
 'Dulcecorona':['caramelos, chocolate y cajas de dulces','En Dulcecorona me enseñaron a envolver las golosinas lejos del sol. La parte difícil del negocio es llegar con la misma cantidad con la que saliste.']};
 const cities=__v120Travel.towns,other=_1h[cities[(r.story+r.index+g.id)%cities.length].site].name,data=stories[other],cargo=stories[origin]?.[0]||data[0],lines=[data[1],'Llevo '+cargo+' desde '+origin+'. En '+destination+' cambiaré parte de la carga por provisiones y noticias para el camino.','En '+place+' hemos comparado nuestras rutas. '+g.members[(r.index+1)%3].name+' busca encargos y '+g.members[(r.index+2)%3].name+' guarda las cartas de los pueblos que visitamos.'];
 return lines[(r.story+r.index)%lines.length]+' '+(__v120Night()?'De seis de la tarde a seis de la mañana nos encontrarás en esta posada. Mañana volveremos al camino.':'Nos reunimos de tres en tres en las plazas para compartir noticias. Antes de anochecer regresamos a una posada.');
}
function __v120DayPlan(){
 const v=__v120Travel,N=v.towns.length,visitors=new Map(v.towns.map(t=>[t.site,[]]));
 for(const g of v.groups){const parity=g.id>=N?1:0,base=g.id%N,steps=Math.floor((v.day+1-parity)/2);g.travel=v.day%2===parity;g.from=v.towns[(base+steps)%N].site;g.to=v.towns[(base+steps+(g.travel?1:0))%N].site;g.road=g.travel?__v120RoadPath(g.from,g.to):null;g.track=g.road?__v120Track(g.road):null;for(const n of g.members)visitors.get(g.to).push(n);}
 for(const town of v.towns){const ns=visitors.get(town.site);ns.sort((a,b)=>a.__v120.group.id-b.__v120.group.id||a.__v120.index-b.__v120.index);for(const [slot,n]of ns.entries()){n.__v120.slot=slot;n.__v120.town=town;n.__v120.origin=__v120Travel.towns.find(t=>t.site===n.__v120.group.from);__v120Bind(n,_x>=6&&_x<7?n.__v120.origin:town,slot);__v114ResetRoutine(n);n.dialogue=__v120Dialog(n);}}
}
function __v120Plaza(n,source=false){const r=n.__v120,g=r.group,t=__v120Travel.towns.find(t=>t.site===(source?g.from:g.to));return t.plazas[g.id>=__v120Travel.towns.length?1:0]?.trio[r.index];}
function __v120ResetAt(n,p){if(!p)return;__v114MoveNPC(n,p);__v114ResetRoutine(n);n.__v120.roadD=null;n.__v120.detour=null;n.g.rotation.x=n.g.rotation.z=0;}
function __v120Reconcile(npcs=__v120Travel.npcs,refresh=true){
 for(const n of npcs){const r=n.__v120,g=r.group;r.mode=null;let p;
  if(__v120Night()){p=_x<6||_x>=23?n.__v101.bed:n.__v101.dining;p=p||__v114ServicePoint(n);}
  else if(g.travel&&_x>=7&&_x<15.5&&g.track){const d=g.track.length*(_x-7)/8.5-r.index*2.2,q=__v120At(g.track,d);q.y=__v101Floor(q.x,q.z,_2r(q.x,q.z));p=__v120Free(n,q);r.roadD=Math.max(0,d);}
  else p=__v120Plaza(n,_x<7);
  if(p){const d=r.roadD;__v120ResetAt(n,p);r.roadD=d;}n.dialogue=__v120Dialog(n);
 }
 if(refresh){__v114PerfReset();__v88Sense();}
}
function __v120Build(){
 const v=__v120Travel;v.npcs=_2h.filter(n=>n.kind==='traveler');v.groups=[];v.errors=[];v.lastHour=_x;v.clock=0;v.source=_2h;v.forge=_1h.find(s=>/forja\s?brasa/i.test(s.name));
 v.towns=[...__v20TownServices].filter(([site,s])=>s.inn&&_1h[site]?.type==='ciudad'&&!_1h[site].hostile&&!__v120Forbidden(_1h[site].x,_1h[site].z)).map(([site,s])=>({site,inn:s.inn,beds:[],seats:[],plazas:[]}));
 // Arrange a loop through every accessible town, keeping close neighbours adjacent.
 const order=['Puerto del Sur','Floravalle','Dulcecorona','Vado del Sol','Auroramar','Brumaclara','Valdoria','Selvaria'];v.towns.sort((a,b)=>order.indexOf(_1h[a.site].name)-order.indexOf(_1h[b.site].name));
 const ids=new Set(v.npcs.map(n=>n.id));for(const h of __v101Life.homes){h.members=h.members.filter(n=>!ids.has(n.id));for(const p of h.items)if(ids.has(p.owner))delete p.owner;}
 for(const n of v.npcs){__v100Release(n,__v100Brain(n));__v100Day.jobs.delete(n);__v95.pending.delete(n);n.__v98Active=true;n.visiting=n.leaving=false;}
 for(const [i,n]of v.npcs.entries()){const id=Math.floor(i/3);let g=v.groups[id];if(!g)v.groups[id]=g={id,members:[]};g.members.push(n);n.__v120={group:g,index:i%3,story:0,slot:0,mode:null,roadD:null,visited:new Set()};}
 for(const t of v.towns){let beds=t.inn.items.filter(p=>p.type==='bed'&&Math.abs(p.y-t.inn.y)<.8&&!p.owner);if(beds.length<6)__v101AddFurniture(t.inn,'bed',6-beds.length);t.beds=t.inn.items.filter(p=>p.type==='bed'&&Math.abs(p.y-t.inn.y)<.8&&!p.owner).slice(0,6);t.seats=t.inn.items.filter(p=>p.type==='seat'&&p.context==='dining'&&Math.abs(p.y-t.inn.y)<.8&&!t.inn.members.some(n=>n.__v101?.dining?.furniture===p));if(t.beds.length<6)v.errors.push('Faltan camas en '+_1h[t.site].name);}
 __v101Index();_22();__v120Roads();for(const t of v.towns)__v120Plazas(t);__v120DayPlan();__v120Reconcile();
}
const __v120Ground=__v101Ground;__v101Ground=function(n,x,z,...args){if(n.__v120){if(__v120Forbidden(x,z))return null;const h=n.__v101.home;if(n.__v120.mode==='inn'&&__v120Night()&&__v101Inside(h,n,.2)&&!__v101Inside(h,{x,z},.2))return null;}return __v120Ground(n,x,z,...args);};
// Select only real inn furniture at night; never reuse a resident's old household schedule.
const __v120Choose=__v101Choose;__v101Choose=function(n,s){if(!n.__v120)return __v120Choose(n,s);s.lastHour=s.previousHour=Math.floor(_x);if(n.__v120.mode==='plaza'){s.zone='outside';return'talk';}s.zone='home';if(_x<6||_x>=23)return n.__v101.bed?'sleep':'read';if(_x>=19&&_x<20&&n.__v101.dining)return'eat';return['walk','talk','read','inspect','tidy'][s.serial%5];};
const __v120Destination=__v100Destination;__v100Destination=function(n,s,action){if(n.__v120?.mode==='plaza'&&n.__v120.plazaGoal){s.station=s.bed=s.seat=null;s.zone='outside';return n.__v120.plazaGoal;}return __v120Destination(n,s,action);};
const __v120OldInterior=__v99InteriorTick;__v99InteriorTick=function(n,b,dt){if(n.__v120)return;return __v120OldInterior(n,b,dt);};
// The former shelter-only traveller routine must not overwrite the itinerary.
_8l=function(){};
const __v120CanTalk=__v102CanTalk;__v102CanTalk=function(a,b){if(a.__v120||b.__v120)return !!a.__v120&&a.__v120.group===b.__v120?.group;return __v120CanTalk(a,b);};
function __v120Walk(n,target,dt,speed=3.1){
 const before={x:n.x,z:n.z,y:n.homeY},d=Math.hypot(target.x-n.x,target.z-n.z);if(d<.18)return false;const step=Math.min(d,speed*dt),a=Math.atan2(target.x-n.x,target.z-n.z);
 for(const turn of[0,.35,-.35,.7,-.7,1.2,-1.2]){const q={x:n.x+Math.sin(a+turn)*step,z:n.z+Math.cos(a+turn)*step},near=Math.hypot(n.x-_14.x,n.z-_14.z)<180,y=__v101Segment(n,before,q,near,!near);if(y===null||__v120Forbidden(q.x,q.z)||__v114NPCBlocked(n,q.x,q.z))continue;q.y=y;__v114MoveNPC(n,q);n.g.rotation.y=a+turn+Math.PI;__v100Brain(n).traveled+=step;return true;}return false;
}
function __v120Tick(n,dt){
 const r=n.__v120,g=r.group,b=__v98NPCBrain(n),s=__v100Brain(n);let mode=__v120Night()?'inn':_x>=16?'return':g.travel&&_x>=7&&_x<15.5&&g.track?'road':'plaza';
 if(mode!==r.mode){__v114ResetRoutine(n);r.mode=mode;__v120Bind(n,_x>=6&&_x<7?r.origin:r.town,r.slot);r.blocked=0;
  if(Math.hypot(n.x-_14.x,n.z-_14.z)>180){let p;if(mode==='plaza')p=__v120Plaza(n,_x<7);else if(mode==='road'){const d=g.track.length*(_x-7)/8.5-r.index*2.2,q=__v120At(g.track,d);q.y=__v101Floor(q.x,q.z,_2r(q.x,q.z));p=__v120Free(n,q);r.roadD=Math.max(0,d);}if(p){const d=r.roadD;__v120ResetAt(n,p);r.roadD=d;}}
if(mode==='return'){s.zone='home';__v100Start(n,s,'walk');}if(mode==='inn'&&!__v101Inside(n.home,n,.3)&&Math.hypot(n.x-_14.x,n.z-_14.z)>155)__v120ResetAt(n,n.__v101.bed||n.__v101.dining);}
 if(mode==='inn'||mode==='return'){
  if(mode==='return'){s.zone='home';if(s.phase==='new'){__v100Start(n,s,'walk');}}
  if(Math.hypot(n.x-_14.x,n.z-_14.z)>155){if(!__v101Inside(n.home,n,.4)||s.lastHour!==Math.floor(_x)){const p=(_x<6||_x>=23?n.__v101.bed:n.__v101.dining)||__v114ServicePoint(n);if(p)__v120ResetAt(n,p);s.lastHour=Math.floor(_x);} }
  __v101Tick(n,b,dt);__v114CrowdPut(n);__v114Separate(n,dt);return;
 }
 let target,moving=false;
 if(mode==='road'){
  b.action='patrol';b.partner=null;
  if(r.roadD===null)r.roadD=Math.max(0,g.track.length*(_x-7)/8.5-r.index*2.2);const speed=Math.max(3.1,g.track.length/(8.5*40));
  const point=__v120At(g.track,Math.min(g.track.length,r.roadD+speed*dt));
  if(r.detour){const q=s.route[s.index];if(q){moving=__v120Walk(n,q,dt,speed);if(Math.hypot(n.x-q.x,n.z-q.z)<.4)s.index++;}if(!__v100Day.jobs.has(n)&&s.index>=s.route.length){if(Math.hypot(n.x-r.detour.x,n.z-r.detour.z)<1)r.roadD=r.resumeD;r.detour=null;r.blocked=0;}}
  else{moving=__v120Walk(n,point,dt,speed);if(moving||Math.hypot(n.x-point.x,n.z-point.z)<.2)r.roadD=Math.min(g.track.length,r.roadD+speed*dt);r.blocked=moving?0:(r.blocked||0)+dt;
   if(r.blocked>.5&&!__v100Day.jobs.has(n)){r.resumeD=Math.min(g.track.length,r.roadD+16);const q=__v120At(g.track,r.resumeD);q.y=__v101Floor(q.x,q.z,n.homeY);const end=__v120Free(n,q);if(end){r.detour=end;s.route=[];s.index=0;s.pathTarget=end;__v100Day.jobs.set(n,{generator:__v101Path(n,end),state:s});}}}
  target=point;n.activity='Viajando por el camino · '+_1h[g.from].name+' → '+_1h[g.to].name;
 }else{
  r.plazaGoal=__v120Plaza(n,_x<7);b.partner=g.members[(r.index+1)%3];__v101Tick(n,b,dt);__v114CrowdPut(n);__v114Separate(n,dt);
  n.activity=n.__v88Moving?'Caminando hacia la plaza':'Conversando con viajeros · '+_1h[_x<7?g.from:g.to].name;return;

 }
 s.action=moving?'walk':'talk';s.phase=moving?'travel':'perform';s.station=null;s.target=target;s.zone='outside';n.sleeping=false;n.__v88Moving=moving;n.goal=target;__v98NPCPose(n,b,moving,dt);__v114CrowdPut(n);r.visited.add(_x<7?g.from:g.to);
}
const __v120Frame=_hr;_hr=function(dt){const r=__v120Frame(dt),v=__v120Travel;if(!_u||_74()||!v.npcs.length)return r;v.clock+=dt;if(v.lastHour<6&&_x>=6&&_x<7){v.day++;__v120DayPlan();}v.lastHour=_x;for(const n of v.npcs)if(!n.__v88Dead&&!n.__v88Controlled)__v120Tick(n,dt);return r;};
const __v120World=_bj;_bj=function(...args){const r=__v120World(...args);__v120Travel.day=0;__v120Build();return r;};
const __v120Load=_dn;_dn=function(s,...args){const r=__v120Load(s,...args);__v120Travel.day=s?.seed===_f?Math.max(0,Math.floor(Number(s.travelers120?.day)||0)):0;if(__v120Travel.source!==_2h)__v120Build();else{__v120DayPlan();__v120Reconcile();}return r;};
const __v120Save=__v96WriteSave;__v96WriteSave=function(value){try{const s=JSON.parse(value);if(s?.seed===_f){s.travelers120={day:__v120Travel.day};value=JSON.stringify(s);}}catch(e){}return __v120Save(value);};
const __v120Time=__v115ApplyTime;__v115ApplyTime=function(...args){const r=__v120Time(...args);if(__v120Travel.npcs.length){if(__v120Travel.lastHour<6&&_x>=6&&_x<7){__v120Travel.day++;__v120DayPlan();}__v120Travel.lastHour=_x;__v120Reconcile();}return r;};
$('time').removeEventListener('change',__v120Time);$('time').addEventListener('change',__v115ApplyTime);
const __v120Talk=_gk;_gk=function(...args){if(_2i?.__v120)_2i.dialogue=__v120Dialog(_2i,true);return __v120Talk(...args);};
window.__AURELIA_TRAVELERS120__={audit:()=>({nightHours:[18,6],day:__v120Travel.day,errors:[...__v120Travel.errors],towns:__v120Travel.towns.map(t=>({site:t.site,name:_1h[t.site].name,beds:t.beds.length,plazas:t.plazas.length})),groups:__v120Travel.groups.map(g=>({id:g.id,from:_1h[g.from].name,to:_1h[g.to].name,travel:g.travel,members:g.members.map(n=>n.id),length:g.track?.length||0})),npcs:__v120Travel.npcs.map(n=>({id:n.id,activity:n.activity,mode:n.__v120.mode,city:_1h[n.site].name,insideInn:__v101Inside(n.home,n,.2),sleeping:n.sleeping,dialogue:n.dialogue,traveled:n.__v100Day?.traveled||0}))})};
