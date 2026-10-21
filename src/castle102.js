/* Castle services remain in public rooms from 06:00 to 23:00 and sleep in their own beds. */
const __v102Court={npcs:[],residents:[],nav:new Map(),period:null,nextSchedule:0};
const __v102CourtActions=['serve','work','inspect','greet','read','walk','tidy','talk','work','inspect','pray','read','serve','talk','stretch'];
const __v102CourtLabels={king:['Dar audiencia','Firmar decretos','Inspeccionar la guardia','Saludar a los visitantes','Leer informes del reino','Pasear junto al trono','Acomodar el manto real','Conversar con la corte','Revisar órdenes reales','Inspeccionar estandartes','Orar por el reino','Consultar las cartas del reino','Escuchar una petición','Hablar con sus consejeros','Estirar las piernas'],merchant:['Atender la armería','Afilar un sable','Revisar armaduras','Saludar a un cliente','Leer el inventario','Recorrer el mostrador','Ordenar herramientas','Hablar con la guardia','Pulir una coraza','Inspeccionar escudos','Honrar a los caídos','Revisar encargos','Ofrecer equipo','Comentar reparaciones','Estirar los brazos'],sorcerer:['Atender la tienda de magia','Practicar glifos','Revisar cristales','Saludar a un aprendiz','Leer un grimorio','Pasear junto al atril','Ordenar pergaminos','Hablar de hechizos','Preparar una inscripción','Inspeccionar runas','Meditar sobre la luz','Consultar fórmulas','Explicar una técnica','Conversar con la corte','Estirar las manos'],priest:['Atender el santuario','Preparar una bendición','Revisar el altar','Saludar a los fieles','Leer las escrituras','Recorrer el santuario','Ordenar los libros','Escuchar a un visitante','Preparar una ofrenda','Inspeccionar las velas','Orar junto al altar','Consultar el calendario','Ofrecer consejo','Conversar con la corte','Estirar los brazos']};
function __v102CourtDay(){return _x>=6&&_x<23;}
function __v102CourtPrivate(p){return __v101Life.castleHomes.some(h=>Math.abs(p.y-h.y)<.85&&__v101Inside(h,p,.2));}
// Public doorways and the exterior gate form a shared graph. A resident behind
// the castle must walk around its walls instead of exhausting a global search.
function __v102CastleGraph(n){
 const id=n.homeSite??n.site;if(__v102Court.nav.has(id))return __v102Court.nav.get(id);const site=_1h[id],points=[],add=(x,z,height=.12)=>{const p={x:site.x+x,z:site.z+z,y:site.level+height};if(__v101Ground(n,p.x,p.z,p.y)!==null&&!__v102CourtPrivate(p))points.push(p);};
 for(const side of[-1,1]){for(const t of[-110,-55,0,55,110]){add(side*110,t);add(t,side*110);}for(const z of[-80,-40,0,40,86])add(side*85,z);}
 for(const x of[-55,0,55]){add(x,86);add(x,-80);}
 for(const x of[-12,.6,12])for(const z of[44,58,70])add(x,z);
 for(const x of[-12,.6,12])for(const z of[14,24,38])add(x,z);
 for(const x of[25,40,55,65])for(const z of[0,14,30])add(x,z);
 for(const z of[1,11.9,12.8,26,37])for(const x of[-48.95,-47.05])add(x,z);
 add(-25,12.8);add(-25,14);add(.6,12.8);add(.6,-23.8,12.12);
 for(const x of[-12,.6,12])for(const z of[-30,-50,-66])add(x,z,12.12);
 for(const x of[-5,5])for(const z of[-61,-72])add(x,z,12.12);
 const edges=points.map(()=>[]);for(let i=0;i<points.length;i++)for(let j=i+1;j<points.length;j++){const distance=Math.hypot(points[i].x-points[j].x,points[i].z-points[j].z);if(distance<.01||distance>72||__v101Segment(n,points[i],points[j],false,true)===null)continue;edges[i].push([j,distance]);edges[j].push([i,distance]);}
 const graph={points,edges};__v102Court.nav.set(id,graph);return graph;
}
const __v102OldCastleRoute=__v101CastleRoute;__v101CastleRoute=function(n,target){
 const original=__v102OldCastleRoute(n,target);if(original||!n.__v101.home.castle)return original;
 const graph=__v102CastleGraph(n),start={x:n.x,z:n.z,y:n.homeY},points=[...graph.points,start,target],edges=[...graph.edges.map(e=>[...e]),[],[]],first=points.length-2,last=first+1;
 for(const endpoint of[first,last])for(let i=0;i<first;i++){const distance=Math.hypot(points[endpoint].x-points[i].x,points[endpoint].z-points[i].z);if(distance>85||__v101Segment(n,points[endpoint],points[i],false,true)===null)continue;edges[endpoint].push([i,distance]);edges[i].push([endpoint,distance]);}
 const distances=new Map([[first,0]]),previous=new Map(),closed=new Set();while(true){let next=null,best=Infinity;for(const[i,distance]of distances)if(!closed.has(i)&&distance<best){best=distance;next=i;}if(next===null)return null;if(next===last){const route=[];for(let i=last;i!==first;i=previous.get(i))route.unshift(points[i]);return route;}closed.add(next);for(const[i,length]of edges[next])if(best+length<(distances.get(i)??Infinity)){distances.set(i,best+length);previous.set(i,next);}}
};
function __v102CourtGoal(n,s){
 const c=n.__v102Court;if(!c)return null;const anchor=c.anchor;
 for(let i=0;i<40;i++){const angle=(i/20+s.serial*.173+(n.phase||0))*Math.PI*2,r=1.2+(i%7)*.65,p={x:anchor.x+Math.cos(angle)*r,z:anchor.z+Math.sin(angle)*r};p.y=__v101Ground(n,p.x,p.z,anchor.y);if(p.y===null||__v102CourtPrivate(p))continue;return p;}return null;
}
function __v102CourtDining(n){
 const a=n.__v102Court.anchor,site=_1h[n.homeSite??n.site];
 for(let radius=3;radius<=7;radius+=.7)for(let i=0;i<24;i++){
  const angle=i*Math.PI/12,x=a.x+Math.cos(angle)*radius,z=a.z+Math.sin(angle)*radius;let free=true;
  // Keep the stairway and the centre of the public entrances clear.
  if(Math.abs(x-site.x)<6||x>site.x-55&&x<site.x-41&&z>site.z-14&&z<site.z+42||Math.abs(x-site.x+22)<3&&Math.abs(z-site.z-14)<6||_2h.some(o=>Math.abs(o.homeY-a.y)<.6&&Math.abs(o.x-x)<1.9&&Math.abs(o.z-z)<2.1))continue;
  for(const dx of[-1.5,0,1.5])for(const dz of[-1.9,0,1.9]){const p={x:x+dx,z:z+dz,y:a.y};if(__v102CourtPrivate(p)||__v101Ground(n,p.x,p.z,p.y)===null){free=false;break;}}
  if(!free)continue;const g=new _0.Group();g.name='Mesa fija del servicio · '+n.id;g.position.set(x,a.y,z);_8.add(g);const begin=__v100Day.furniture.length;__v53Dining(g,0,0,__v29Palette(site),4,1.7,1.6);for(const p of __v100Day.furniture.slice(begin))if(p.type!=='seat')__v101Collider(p,1.1);__v93Batch(g);__v101Index();_22();return true;
 }return false;
}
function __v102CourtBuild(){
 __v102Court.npcs=[];__v102Court.nav.clear();__v102Court.residents=_2h.filter(n=>n.__v101?.home.castle);__v102Court.period=__v102CourtDay();for(const n of __v102Court.residents){const role=n.rank==='king'?'king':n.castleService;if(!__v102CourtLabels[role])continue;
  const site=_1h[n.homeSite??n.site],anchor=role==='merchant'?{x:site.x-14,z:site.z+28,y:site.level+.12}:{...n.__v101.origin};n.__v102Court={role,anchor,label:'',seat:null};
  if(role==='merchant'){const service=__v20CastleServices.get(n.homeSite??n.site);if(service?.shop)Object.assign(service.shop,anchor);}
  n.__v102Court.diningBuilt=__v102CourtDining(n);
  const a=n.__v102Court.anchor,seats=__v100Day.furniture.filter(p=>p.type==='seat'&&!p.home?.castle&&Math.abs(p.y-a.y)<.6&&Math.hypot(p.x-a.x,p.z-a.z)<8);
  for(const seat of seats){const table=__v100Day.furniture.find(t=>t.type==='table'&&Math.abs(t.y-seat.y)<.3&&Math.hypot(t.x-seat.x,t.z-seat.z)<Math.hypot(t.w,t.d)/2+1);if(!table)continue;const y=__v101Ground(n,seat.x,seat.z,seat.y+.14);if(y!==null){n.__v102Court.seat={x:seat.x,z:seat.z,y,furniture:seat,table};break;}}
  __v102Court.npcs.push(n);if(__v102CourtDay()&&(Math.hypot(n.x-a.x,n.z-a.z)>8||Math.abs(n.homeY-a.y)>.8)){const p=__v102CourtGoal(n,n.__v100Day);if(p){n.x=p.x;n.z=p.z;n.homeY=p.y;n.g.position.set(p.x,p.y,p.z);}}
  if(role==='merchant')for(let i=0;i<16;i++){const angle=i*Math.PI/8,x=a.x+Math.cos(angle)*3,z=a.z+Math.sin(angle)*3;if(_2h.some(o=>Math.abs(o.homeY-a.y)<.6&&Math.abs(o.x-x)<1.9&&Math.abs(o.z-z)<1.2)||[-1.5,0,1.5].some(dx=>[-.7,0,.7].some(dz=>__v101Ground(n,x+dx,z+dz,a.y)===null)))continue;const g=new _0.Group();g.name='Armería pública · '+site.name;g.position.set(x,a.y,z);_8.add(g);const begin=__v100Day.furniture.length;__v29Armor(g,0,0,__v29Palette(site));for(const p of __v100Day.furniture.slice(begin))if(p.type!=='seat')__v101Collider(p,2.7);__v93Batch(g);__v101Index();_22();break;}
 }
 // Castle portcullises lift clear of the corridor. Swinging five-metre leaves
 // could sweep over a walking resident and trap them against an adjacent wall.
 for(const d of __v29Doors){if(d.__v101Slide)continue;const site=_1h.find(s=>s.type==='castillo'&&Math.abs(d.p.x-s.x)<100&&Math.abs(d.p.z-s.z)<100&&Math.min(Math.abs(d.p.y-s.level),Math.abs(d.p.y-s.level-12))<2);if(!site)continue;d.__v101Slide=true;d.slide=0;d.baseY=d.pivot.position.y;d.pivot.rotation.y=0;d.angle=0;__v101Life.doors.push(d);__v73DoorShape(d);}
 // Prepare shared paths before play; no large graph construction at bedtime.
 for(const n of __v102Court.residents)if(!__v102Court.nav.has(n.homeSite??n.site))__v102CastleGraph(n);
}
const __v102CourtChoose=__v101Choose;__v101Choose=function(n,s){
 const c=n.__v102Court;if(!c)return __v102CourtChoose(n,s);const h=Math.floor(_x);if(s.previousHour!==undefined&&s.previousHour>h)s.day=(s.day||0)+1;s.previousHour=h;s.lastHour=h;s.zone=__v102CourtDay()?'court102':'home';
 if(!__v102CourtDay()){c.label='Dormir en su propia cama';return 'sleep';}
 if([8,13,19].includes(h)&&s.mealSlot!==(s.day||0)+':'+h&&c.seat){c.label='Comer en la mesa fija de su puesto';return 'eat';}
 const index=((s.serial||0)+h)%__v102CourtActions.length;c.label=__v102CourtLabels[c.role][index];return __v102CourtActions[index];
};
const __v102CourtHome=__v101HomeGoal;__v101HomeGoal=function(n,s){return n.__v102Court&&__v102CourtDay()?__v102CourtGoal(n,s):__v102CourtHome(n,s);};
const __v102CourtOutside=__v101OutdoorGoal;__v101OutdoorGoal=function(n,s){return n.__v102Court&&__v102CourtDay()?__v102CourtGoal(n,s):__v102CourtOutside(n,s);};
const __v102CourtDestination=__v100Destination;__v100Destination=function(n,s,action){
 const c=n.__v102Court;if(!c||!__v102CourtDay()||action==='sleep')return __v102CourtDestination(n,s,action);
 if(action==='eat'&&c.seat&&!__v100Day.seats.has(c.seat.furniture.id)){s.seat=c.seat.furniture;s.station=c.seat;__v100Day.seats.set(s.seat.id,n);return{...c.seat};}
 if(action==='talk'){const friend=__v88Life.active.filter(o=>o!==n&&!o.sleeping&&o.__v101&&o.__v101.home.castle===n.__v101.home.castle&&Math.abs(o.homeY-c.anchor.y)<.6&&Math.hypot(o.x-c.anchor.x,o.z-c.anchor.z)<6&&!__v102CourtPrivate({x:o.x,y:o.homeY,z:o.z})).sort((a,b)=>Math.hypot(a.x-n.x,a.z-n.z)-Math.hypot(b.x-n.x,b.z-n.z))[0];if(friend)for(let i=0;i<12;i++){const angle=i*Math.PI/6,p={x:friend.x+Math.cos(angle)*1.4,z:friend.z+Math.sin(angle)*1.4};p.y=__v101Ground(n,p.x,p.z,c.anchor.y);if(p.y!==null&&Math.hypot(p.x-c.anchor.x,p.z-c.anchor.z)<8&&!__v102CourtPrivate(p)){__v98NPCBrain(n).partner=friend;return p;}}}
 return __v102CourtGoal(n,s);
};
const __v102CourtStation=__v101ValidStation;__v101ValidStation=function(n,s){const p=s.station;if(n.__v102Court&&__v102CourtDay()&&s.action==='eat')return p===n.__v102Court.seat&&p?.furniture.type==='seat'&&p.table?.type==='table'&&Math.hypot(n.x-p.x,n.z-p.z)<.2&&Math.abs(n.homeY-p.y)<.4;return __v102CourtStation(n,s);};
function __v102CanTalk(n,friend){if(__v101Outdoors(n)&&__v101Outdoors(friend))return true;return !!(n.__v101?.home.castle&&n.__v101.home.castle===friend.__v101?.home.castle&&Math.abs(n.homeY-friend.homeY)<.6&&!__v102CourtPrivate({x:n.x,z:n.z,y:n.homeY})&&!__v102CourtPrivate({x:friend.x,z:friend.z,y:friend.homeY}));}
const __v102CourtPose=__v100Pose;__v100Pose=function(n,b,s,moving,dt){const result=__v102CourtPose(n,b,s,moving,dt);if(n.__v102Court&&__v102CourtDay())n.activity=(moving?'Caminando · ':'')+n.__v102Court.label;return result;};
// Distant residents need the result of an elapsed schedule, rather than yesterday's location.
const __v102CourtFrame=_hr;_hr=function(dt){
 const day=__v102CourtDay();if(_u&&!_74()){
  if(day!==__v102Court.period){__v102Court.period=day;__v102Court.nextSchedule=0;for(const n of __v102Court.residents)n.__v102SchedulePending=true;}
  if(_10>=__v102Court.nextSchedule){__v102Court.nextSchedule=_10+1;for(const n of __v102Court.residents){if(n.__v88Dead||n.__v88Controlled||!n.__v102SchedulePending||Math.hypot(n.x-_14.x,n.z-_14.z)<155)continue;const s=n.__v100Day,p=day?(n.__v102Court?__v102CourtGoal(n,s):__v101OutdoorGoal(n,s)):n.__v101.bed;if(!p)continue;__v100Release(n,s);n.x=p.x;n.z=p.z;n.homeY=p.y;n.g.position.set(p.x,p.y,p.z);Object.assign(s,{phase:day?'new':'perform',action:day?'walk':'sleep',next:0,lastHour:day?null:Math.floor(_x),route:[],index:0,station:day?null:p,bed:day?null:p.furniture});if(!day)__v100Day.seats.set(p.furniture.id,n);n.sleeping=!day;n.__v102SchedulePending=false;__v100Pose(n,__v98NPCBrain(n),s,false,0);}}
 }
 return __v102CourtFrame(dt);
};
window.__AURELIA_CASTLE102__={audit:()=>({sleepHours:[23,6],serviceHours:[6,23],routines:15,residents:__v102Court.residents.map(n=>({id:n.id,bed:n.__v101.bed?.furniture.id,sleeping:n.sleeping})),npcs:__v102Court.npcs.map(n=>({id:n.id,role:n.__v102Court.role,castle:_1h[n.homeSite??n.site].name,distance:Math.hypot(n.x-n.__v102Court.anchor.x,n.z-n.__v102Court.anchor.z),activity:n.activity}))})};
